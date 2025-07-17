import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserCheck,
  Heart,
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react";
import {
  getCustomers,
  getCaregivers,
  getServices,
  getAppointments,
} from "../../services/dataService";
import { Customer, Caregiver, Service, Appointment } from "../../data/mockData";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalCaregivers: 0,
    totalServices: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const customers: Customer[] = getCustomers();
    const caregivers: Caregiver[] = getCaregivers();
    const services: Service[] = getServices();
    const appointments: Appointment[] = getAppointments();

    setStats({
      totalCustomers: customers.length,
      totalCaregivers: caregivers.length,
      totalServices: services.filter((s) => s.isActive).length,
      totalAppointments: appointments.length,
      pendingAppointments: appointments.filter((a) => a.status === "Pending")
        .length,
      completedAppointments: appointments.filter(
        (a) => a.status === "Completed"
      ).length,
      totalRevenue: appointments.reduce((sum, apt) => sum + apt.totalCost, 0),
    });
  }, []);

  const quickActions = [
    {
      title: "Customer Management",
      description: "View and manage customer profiles",
      icon: Users,
      link: "/admin/customers",
      color: "bg-blue-500",
    },
    {
      title: "Caregiver Management",
      description: "Manage caregiver profiles and availability",
      icon: UserCheck,
      link: "/admin/caregivers",
      color: "bg-green-500",
    },
    {
      title: "Service Management",
      description: "Manage services and packages",
      icon: Heart,
      link: "/admin/services",
      color: "bg-purple-500",
    },
    {
      title: "All Appointments",
      description: "View and manage all appointments",
      icon: Calendar,
      link: "/admin/appointments",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Overview of your homecare service</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Customers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalCustomers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Caregivers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalCaregivers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Services
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalServices}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Appointments
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalAppointments}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Appointments
                </p>
                <p className="text-xl font-bold text-yellow-600">
                  {stats.pendingAppointments}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Completed Appointments
                </p>
                <p className="text-xl font-bold text-green-600">
                  {stats.completedAppointments}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-xl font-bold text-blue-600">
                  ${stats.totalRevenue.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={action.title}
                  to={action.link}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 group"
                >
                  <div
                    className={`inline-flex p-3 rounded-lg ${action.color} mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
