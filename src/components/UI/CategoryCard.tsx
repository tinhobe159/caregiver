import React from 'react';
import { Link } from 'react-router-dom';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { ServiceCategory } from '../../data/mockData';

interface CategoryCardProps {
  category: ServiceCategory;
  icon: LucideIcon;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, icon: Icon }) => {
  return (
    <Link 
      to={`/services?category=${category.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 group"
    >
      <div className="flex items-center mb-4">
        <Icon className="h-12 w-12 text-blue-600 group-hover:text-blue-700 transition-colors" />
        <h3 className="text-xl font-semibold text-gray-900 ml-4">{category.name}</h3>
      </div>
      <p className="text-gray-600">{category.description}</p>
      <div className="mt-4">
        <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
          View Services →
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;