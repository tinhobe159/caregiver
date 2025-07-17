import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, DollarSign } from 'lucide-react';
import { Service } from '../../data/mockData';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{service.description}</p>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-green-600">
            <DollarSign className="h-4 w-4" />
            <span className="font-medium">{service.basePricePerHour}/hr</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{service.defaultDuration}h default</span>
          </div>
        </div>
      </div>
      
      <Link 
        to={`/booking?service=${service.id}`}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-center block font-medium"
      >
        Book Now
      </Link>
    </div>
  );
};

export default ServiceCard;