import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../api/config';

const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPackage, setSelectedPackage] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [services, setServices] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [packageServices, setPackageServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, packagesRes, packageServicesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/services`),
          axios.get(`${API_BASE_URL}/packages`),
          axios.get(`${API_BASE_URL}/packageServices`)
        ]);
        
        setServices(servicesRes.data);
        setPackages(packagesRes.data);
        setPackageServices(packageServicesRes.data);
        
        const packageFromUrl = searchParams.get('package');
        if (packageFromUrl) {
          setSelectedPackage(packageFromUrl);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    let filtered = services.filter(service => service.is_active);
    
    if (selectedPackage !== 'all') {
      const serviceIdsInPackage = packageServices
        .filter(ps => ps.package_id === selectedPackage)
        .map(ps => ps.service_id);
      filtered = filtered.filter(service => serviceIdsInPackage.includes(service.service_id));
    }
    
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredServices(filtered);
  }, [selectedPackage, searchTerm, services, packageServices]);

  const handlePackageChange = (packageId: string) => {
    setSelectedPackage(packageId);
    if (packageId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ package: packageId });
    }
  };

  const getServicePackages = (serviceId: string) => {
    const servicePackageIds = packageServices
      .filter(ps => ps.service_id === serviceId)
      .map(ps => ps.package_id);
    return packages.filter(pkg => servicePackageIds.includes(pkg.package_id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  const ServiceCardWithPackages: React.FC<{ service: any }> = ({ service }) => {
    const servicePackages = getServicePackages(service.service_id);
    
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.service_name}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">{service.description}</p>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Price per hour:</span>
            <span className="text-green-600 font-semibold">${service.base_price_per_hour}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Default duration:</span>
            <span className="text-gray-900">{service.default_duration_minutes} min</span>
          </div>
        </div>
        
        {servicePackages.length > 0 && (
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-600">Available in packages:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {servicePackages.map((pkg) => (
                <span
                  key={pkg.package_id}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {pkg.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600">
            Professional homecare services available in our packages
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Services</h2>
          </div>
          
          {/* Package Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Package</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handlePackageChange('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPackage === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Services
              </button>
              {packages.map((pkg) => (
                <button
                  key={pkg.package_id}
                  onClick={() => handlePackageChange(pkg.package_id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPackage === pkg.package_id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pkg.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Search Bar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Services</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by service name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCardWithPackages key={service.service_id} service={service} />
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              No services found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;