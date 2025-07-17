import db from '../data/db.json';
import { Skill, Customer, Caregiver, Service, Appointment, CaregiverAvailability, PackageService, Package } from '../data/mockData';

export const getSkills = (): Skill[] => {
  return db.skills;
};

export const getCustomers = (): Customer[] => {
  return db.customers;
};

export const getCaregivers = (): Caregiver[] => {
  return db.caregivers.map(c => ({
    ...c,
    backgroundCheckStatus: c.backgroundCheckStatus as 'verified' | 'pending' | 'failed'
  }));
};

export const getServices = (): Service[] => {
  return db.services;
};

export const getAppointments = (): Appointment[] => {
  return db.appointments.map(a => ({
    ...a,
    status: a.status as 'Confirmed' | 'Pending' | 'Completed' | 'Rescheduled' | 'Cancelled'
  }));
};

export const getCaregiverAvailability = (): CaregiverAvailability[] => {
  try {
    return db.caregiverAvailability || [];
  } catch (error) {
    console.error('Error fetching caregiver availability:', error);
    return [];
  }
};

export const getPackageServices = (): PackageService[] => {
  try {
    return db.packageServices || [];
  } catch (error) {
    console.error('Error fetching package services:', error);
    return [];
  }
};

export const getPackages = (): Package[] => {
  try {
    return db.packages || [];
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
};