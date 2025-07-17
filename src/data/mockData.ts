export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  basePricePerHour: number;
  defaultDuration: number;
  categoryId: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
}

export interface Caregiver {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  profilePicture: string;
  skillIds: string[];
  backgroundCheckStatus: 'verified' | 'pending' | 'failed';
  yearsOfExperience: number;
}

export interface Booking {
  id: string;
  serviceId: string;
  caregiverId?: string;
  date: string;
  time: string;
  duration: number;
  notes: string;
  totalCost: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'Personal Care',
    description: 'Essential daily living assistance and personal hygiene support',
    icon: 'User'
  },
  {
    id: '2',
    name: 'Medical Support',
    description: 'Professional medical care and health monitoring services',
    icon: 'Heart'
  },
  {
    id: '3',
    name: 'Companionship',
    description: 'Social interaction and emotional support services',
    icon: 'Users'
  }
];

export const services: Service[] = [
  {
    id: '1',
    name: 'Bathing Assistance',
    description: 'Professional help with bathing and personal hygiene',
    basePricePerHour: 25,
    defaultDuration: 1,
    categoryId: '1'
  },
  {
    id: '2',
    name: 'Meal Preparation',
    description: 'Nutritious meal planning and preparation services',
    basePricePerHour: 22,
    defaultDuration: 2,
    categoryId: '1'
  },
  {
    id: '3',
    name: 'Medication Management',
    description: 'Professional medication administration and monitoring',
    basePricePerHour: 35,
    defaultDuration: 1,
    categoryId: '2'
  },
  {
    id: '4',
    name: 'Vital Signs Monitoring',
    description: 'Regular health monitoring and vital signs tracking',
    basePricePerHour: 30,
    defaultDuration: 1,
    categoryId: '2'
  },
  {
    id: '5',
    name: 'Social Companionship',
    description: 'Friendly conversation and social interaction',
    basePricePerHour: 20,
    defaultDuration: 3,
    categoryId: '3'
  },
  {
    id: '6',
    name: 'Activity Assistance',
    description: 'Support with hobbies, games, and recreational activities',
    basePricePerHour: 18,
    defaultDuration: 2,
    categoryId: '3'
  }
];

export const skills: Skill[] = [
  {
    id: '1',
    name: 'CPR Certified',
    description: 'Certified in cardiopulmonary resuscitation'
  },
  {
    id: '2',
    name: 'Dementia Care',
    description: 'Specialized training in dementia and Alzheimer\'s care'
  },
  {
    id: '3',
    name: 'Medication Administration',
    description: 'Licensed to administer medications'
  },
  {
    id: '4',
    name: 'Physical Therapy Assistant',
    description: 'Trained to assist with physical therapy exercises'
  },
  {
    id: '5',
    name: 'Wound Care',
    description: 'Specialized in wound care and dressing changes'
  }
];

export const caregivers: Caregiver[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    bio: 'Compassionate caregiver with 8 years of experience in elderly care. Specializes in dementia care and has a warm, patient approach to helping clients maintain their independence.',
    profilePicture: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    skillIds: ['1', '2', '3'],
    backgroundCheckStatus: 'verified',
    yearsOfExperience: 8
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    bio: 'Licensed nursing assistant with expertise in medical care and physical therapy support. Known for his professional approach and excellent communication skills.',
    profilePicture: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    skillIds: ['1', '3', '4', '5'],
    backgroundCheckStatus: 'verified',
    yearsOfExperience: 6
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Rodriguez',
    bio: 'Dedicated caregiver with a background in social work. Excels at providing emotional support and companionship while maintaining professional boundaries.',
    profilePicture: 'https://images.unsplash.com/photo-1594824388853-8e9b0c15b1e1?w=400&h=400&fit=crop&crop=face',
    skillIds: ['1', '2'],
    backgroundCheckStatus: 'verified',
    yearsOfExperience: 5
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Thompson',
    bio: 'Experienced caregiver with specialized training in wound care and post-surgical support. Committed to providing the highest quality of care with attention to detail.',
    profilePicture: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
    skillIds: ['1', '3', '5'],
    backgroundCheckStatus: 'verified',
    yearsOfExperience: 10
  }
];