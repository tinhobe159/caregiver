export interface Package {
  id: string;
  code: string;
  name: string;
  description: string;
  totalCost: number;
}

export interface PackageService {
  id: string;
  packageId: string;
  serviceId: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  basePricePerHour: number;
  defaultDurationMinutes: number;
  isActive: boolean;
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

export interface MedicalInfo {
  allergies: string;
  medications: string;
  medicalConditions: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalInfo: MedicalInfo;
}

export interface Appointment {
  id: string;
  customerId: string;
  caregiverId: string;
  packageId: string;
  appointmentDatetimeStart: string;
  appointmentDatetimeEnd: string;
  durationMinutes: number;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Rescheduled' | 'Cancelled';
  bookingNotes: string;
  totalCost: number;
}

export interface RecurringSchedule {
  id: string;
  customerId: string;
  packageId: string;
  caregiverId: string;
  startDate: string;
  endDate: string | null;
  recurrencePattern: string;
  startTimeOfDay: string;
  durationMinutes: number;
  isActive: boolean;
}

export interface AppointmentException {
  id: string;
  recurringScheduleId: string;
  originalAppointmentDatetime: string;
  exceptionType: 'Cancelled' | 'Rescheduled';
  reason: string;
  newAppointmentId?: string;
}

export interface CaregiverAvailability {
  id: string;
  caregiverId: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface CarePlan {
  id: string;
  customerId: string;
  overallGoal: string;
  startDate: string;
  status: string;
}

export interface CarePlanTask {
  id: string;
  carePlanId: string;
  description: string;
  frequency: string;
  isCritical: boolean;
}

export interface EvvRecord {
  id: string;
  appointmentId: string;
  caregiverId: string;
  checkInTime: string;
  checkOutTime: string | null;
  status: 'Completed' | 'In Progress';
  caregiverNotes: string;
}

export interface Payment {
  id: string;
  appointmentId: string;
  customerId: string;
  amount: number;
  paymentDate: string | null;
  paymentMethod: string;
  status: 'Completed' | 'Pending';
}

export interface Review {
  id: string;
  appointmentId: string;
  customerId: string;
  caregiverId: string;
  rating: number;
  comment: string;
  reviewDate: string;
  isPublished: boolean;
}

export interface Address {
  id: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  userType: 'Admin' | 'Customer' | 'Caregiver';
  isActive: boolean;
}