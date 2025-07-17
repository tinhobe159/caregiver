import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { Caregiver, Skill } from '../data/mockData';
import { getCaregivers, getSkills } from '../services/dataService';
import CaregiverCard from '../components/UI/CaregiverCard';

const CaregiversPage: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [filteredCaregivers, setFilteredCaregivers] = useState<Caregiver[]>([]);
  const caregivers: Caregiver[] = getCaregivers();
  const skills: Skill[] = getSkills();

  useEffect(() => {
    if (selectedSkill === 'all') {
      setFilteredCaregivers(caregivers);
    } else {
      setFilteredCaregivers(
        caregivers.filter(caregiver => caregiver.skillIds.includes(selectedSkill))
      );
    }
  }, [selectedSkill, caregivers]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Caregivers
          </h1>
          <p className="text-xl text-gray-600">
            Meet our team of qualified, compassionate healthcare professionals
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Filter by Skill</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSkill('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSkill === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Caregivers
            </button>
            {skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => setSelectedSkill(skill.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSkill === skill.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {skill.name}
              </button>
            ))}
          </div>
        </div>

        {/* Caregivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCaregivers.map((caregiver) => (
            <CaregiverCard key={caregiver.id} caregiver={caregiver} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCaregivers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              No caregivers found with this skill.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaregiversPage;