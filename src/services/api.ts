import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Packages
export const packagesApi = {
  getAll: () => api.get('/packages'),
  getById: (id: string) => api.get(`/packages/${id}`),
  create: (data: any) => api.post('/packages', data),
  update: (id: string, data: any) => api.put(`/packages/${id}`, data),
  delete: (id: string) => api.delete(`/packages/${id}`),
};

// Package Services
export const packageServicesApi = {
  getAll: () => api.get('/packageServices'),
  getByPackageId: (packageId: string) => api.get(`/packageServices?package_id=${packageId}`),
  create: (data: any) => api.post('/packageServices', data),
  delete: (packageId: string, serviceId: string) => 
    api.delete(`/packageServices?package_id=${packageId}&service_id=${serviceId}`),
};

// Services
export const servicesApi = {
  getAll: () => api.get('/services'),
  getById: (id: string) => api.get(`/services/${id}`),
  create: (data: any) => api.post('/services', data),
  update: (id: string, data: any) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`),
};

// Customers
export const customersApi = {
  getAll: () => api.get('/customers'),
  getById: (id: string) => api.get(`/customers/${id}`),
  create: (data: any) => api.post('/customers', data),
  update: (id: string, data: any) => api.put(`/customers/${id}`, data),
  delete: (id: string) => api.delete(`/customers/${id}`),
};

// Appointments
export const appointmentsApi = {
  getAll: () => api.get('/appointments'),
  getById: (id: string) => api.get(`/appointments/${id}`),
  getByCustomerId: (customerId: string) => api.get(`/appointments?customer_id=${customerId}`),
  create: (data: any) => api.post('/appointments', data),
  update: (id: string, data: any) => api.put(`/appointments/${id}`, data),
  delete: (id: string) => api.delete(`/appointments/${id}`),
};

// Caregivers
export const caregiversApi = {
  getAll: () => api.get('/caregivers'),
  getById: (id: string) => api.get(`/caregivers/${id}`),
  create: (data: any) => api.post('/caregivers', data),
  update: (id: string, data: any) => api.put(`/caregivers/${id}`, data),
  delete: (id: string) => api.delete(`/caregivers/${id}`),
};

// Skills
export const skillsApi = {
  getAll: () => api.get('/skills'),
  create: (data: any) => api.post('/skills', data),
  delete: (id: string) => api.delete(`/skills/${id}`),
};

// Caregiver Availability
export const availabilityApi = {
  getAll: () => api.get('/caregiverAvailability'),
  getByCaregiverId: (caregiverId: string) => api.get(`/caregiverAvailability?caregiver_id=${caregiverId}`),
  create: (data: any) => api.post('/caregiverAvailability', data),
  update: (id: string, data: any) => api.put(`/caregiverAvailability/${id}`, data),
  delete: (id: string) => api.delete(`/caregiverAvailability/${id}`),
};

// Recurring Schedules
export const recurringSchedulesApi = {
  getAll: () => api.get('/recurringSchedules'),
  create: (data: any) => api.post('/recurringSchedules', data),
  update: (id: string, data: any) => api.put(`/recurringSchedules/${id}`, data),
  delete: (id: string) => api.delete(`/recurringSchedules/${id}`),
};

// Care Plans
export const carePlansApi = {
  getAll: () => api.get('/carePlans'),
  create: (data: any) => api.post('/carePlans', data),
  update: (id: string, data: any) => api.put(`/carePlans/${id}`, data),
  delete: (id: string) => api.delete(`/carePlans/${id}`),
};

// Care Plan Tasks
export const carePlanTasksApi = {
  getAll: () => api.get('/carePlanTasks'),
  getByCarePlanId: (carePlanId: string) => api.get(`/carePlanTasks?care_plan_id=${carePlanId}`),
  create: (data: any) => api.post('/carePlanTasks', data),
  update: (id: string, data: any) => api.put(`/carePlanTasks/${id}`, data),
  delete: (id: string) => api.delete(`/carePlanTasks/${id}`),
};

// EVV Records
export const evvRecordsApi = {
  getAll: () => api.get('/evvRecords'),
  create: (data: any) => api.post('/evvRecords', data),
  update: (id: string, data: any) => api.put(`/evvRecords/${id}`, data),
};

// Payments
export const paymentsApi = {
  getAll: () => api.get('/payments'),
  getByCustomerId: (customerId: string) => api.get(`/payments?customer_id=${customerId}`),
  create: (data: any) => api.post('/payments', data),
  update: (id: string, data: any) => api.put(`/payments/${id}`, data),
};

// Reviews
export const reviewsApi = {
  getAll: () => api.get('/reviews'),
  getByCustomerId: (customerId: string) => api.get(`/reviews?customer_id=${customerId}`),
  create: (data: any) => api.post('/reviews', data),
  update: (id: string, data: any) => api.put(`/reviews/${id}`, data),
  delete: (id: string) => api.delete(`/reviews/${id}`),
};

// Users
export const usersApi = {
  getAll: () => api.get('/users'),
  create: (data: any) => api.post('/users', data),
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};

// Addresses
export const addressesApi = {
  getAll: () => api.get('/addresses'),
  create: (data: any) => api.post('/addresses', data),
  update: (id: string, data: any) => api.put(`/addresses/${id}`, data),
  delete: (id: string) => api.delete(`/addresses/${id}`),
};

export default api;