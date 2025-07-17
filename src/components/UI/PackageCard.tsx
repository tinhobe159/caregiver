import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Package } from 'lucide-react';

interface PackageCardProps {
  package: {
    package_id: string;
    code: string;
    name: string;
    total_cost: number;
    description: string;
  };
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="flex items-center mb-4">
        <Package className="h-8 w-8 text-blue-600 mr-3" />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{pkg.name}</h3>
          <p className="text-sm text-gray-500">{pkg.code}</p>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{pkg.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1 text-green-600">
          <DollarSign className="h-5 w-5" />
          <span className="text-xl font-bold">{pkg.total_cost.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Link 
          to={`/services?package=${pkg.package_id}`}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200 text-center text-sm font-medium"
        >
          View Services
        </Link>
        <Link 
          to={`/booking?package=${pkg.package_id}`}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-center text-sm font-medium"
        >
          Book Package
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;