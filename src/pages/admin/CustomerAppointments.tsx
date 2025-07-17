import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, DollarSign, User } from 'lucide-react';
import { Customer, Appointment, Service, Caregiver } from '../../data/mockData';
import { getCustomers, getAppointments, getServices, getCaregivers, getPackageServices } from '../../services/dataService';

const CustomerAppointments: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const customers: Customer[] = getCustomers();
  const customer = customers.find(c => c.id === id);
  const appointments: Appointment[] = getAppointments();
  const customerAppointments = appointments.filter(a => a.customerId === id);
  const services: Service[] = getServices();
  const caregivers: Caregiver[] = getCaregivers();

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Customer Not Found</h1>
          <Link to="/admin/customers" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  const getServiceName = (packageId: string) => {
    const packageServices = getPackageServices().filter(ps => ps.packageId === packageId);
    const serviceNames = packageServices.map(ps => {
      const service = services.find(s => s.id === ps.serviceId);
      return service ? service.name : 'Unknown Service';
    });
    return serviceNames.join(', ') || 'Unknown Service';
  };

  const getCaregiverName = (caregiverId: string) => {
    const caregiver = caregivers.find(c => c.id === caregiverId);
    return caregiver ? `${caregiver.firstName} ${caregiver.lastName}` : 'Unknown Caregiver';
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Rescheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/admin/customers"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Appointments for {customer.firstName} {customer.lastName}
          </h1>
          <p className="text-gray-600">View all appointments for this customer</p>
        </div>

        {/* Customer Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {customer.firstName} {customer.lastName}
              </h2>
              <p className="text-gray-600">Phone: {customer.phoneNumber}</p>
              <p className="text-gray-600">DOB: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Appointments ({customerAppointments.length})</h3>
          </div>
          
          {customerAppointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Appointment ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Caregiver
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerAppointments.map((appointment) => {
                    const dateTime = formatDateTime(appointment.appointmentDatetimeStart);
                    return (
                      <tr key={appointment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{appointment.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getServiceName(appointment.packageId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getCaregiverName(appointment.caregiverId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                              {dateTime.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              {dateTime.time}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                            {appointment.totalCost.toFixed(2)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-500 mb-2">No appointments found</p>
              <p className="text-gray-400">This customer hasn't booked any appointments yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerAppointments;