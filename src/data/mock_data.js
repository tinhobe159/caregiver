export const serviceCategories = [
  { category_id: "1", category_name: "Personal Care", description: "Daily living assistance" },
  { category_id: "2", category_name: "Medical Support", description: "Health-related services" },
  { category_id: "3", category_name: "Companionship", description: "Social and emotional support" }
];

export const services = [
  { service_id: "1", service_name: "Bathing Assistance", description: "Help with bathing and grooming", base_price_per_hour: 20.0, category_id: "1", default_duration_minutes: 60, is_active: true },
  { service_id: "2", service_name: "Medication Reminders", description: "Assistance with medication schedules", base_price_per_hour: 15.0, category_id: "2", default_duration_minutes: 30, is_active: true },
  { service_id: "3", service_name: "Meal Preparation", description: "Prepare meals for patients", base_price_per_hour: 18.0, category_id: "1", default_duration_minutes: 60, is_active: true },
  { service_id: "4", service_name: "Physical Therapy", description: "Support with mobility exercises", base_price_per_hour: 25.0, category_id: "2", default_duration_minutes: 45, is_active: true },
  { service_id: "5", service_name: "Companionship Visit", description: "Social engagement and activities", base_price_per_hour: 12.0, category_id: "3", default_duration_minutes: 120, is_active: true },
  { service_id: "6", service_name: "Wound Care", description: "Basic wound dressing and care", base_price_per_hour: 22.0, category_id: "2", default_duration_minutes: 30, is_active: false }
];

export const caregivers = [
  { caregiver_id: "1", first_name: "Jane", last_name: "Doe", bio: "Experienced caregiver with 5 years in personal care", profile_picture_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", background_check_status: "Completed", hire_date: "2023-01-15", status: "Active", skills: ["1", "2"] },
  { caregiver_id: "2", first_name: "John", last_name: "Smith", bio: "Specialized in medical support", profile_picture_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", background_check_status: "Completed", hire_date: "2022-06-01", status: "Active", skills: ["1", "3"] },
  { caregiver_id: "3", first_name: "Emma", last_name: "Brown", bio: "Compassionate companion caregiver", profile_picture_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9", background_check_status: "Pending", hire_date: "2024-03-10", status: "On Leave", skills: ["2"] },
  { caregiver_id: "4", first_name: "Michael", last_name: "Lee", bio: "Expert in physical therapy", profile_picture_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", background_check_status: "Completed", hire_date: "2021-09-01", status: "Active", skills: ["1", "4"] }
];

export const skills = [
  { skill_id: "1", skill_name: "CPR Certified", description: "Certified in cardiopulmonary resuscitation" },
  { skill_id: "2", skill_name: "Dementia Care", description: "Specialized in dementia patient care" },
  { skill_id: "3", skill_name: "Wound Care", description: "Trained in basic wound dressing" },
  { skill_id: "4", skill_name: "Physical Therapy", description: "Skilled in mobility exercises" },
  { skill_id: "5", skill_name: "Medication Management", description: "Experienced in managing patient medications" }
];

export const customers = [
  { customer_id: "1", first_name: "Alice", last_name: "Johnson", date_of_birth: "1945-03-12", phone_number: "555-0101", emergency_contact_name: "Bob Johnson", emergency_contact_phone: "555-0102", medical_info: { allergies: "Penicillin", medications: "Metformin 500mg", medical_conditions: "Diabetes" } },
  { customer_id: "2", first_name: "Robert", last_name: "Smith", date_of_birth: "1950-07-19", phone_number: "555-0103", emergency_contact_name: "Mary Smith", emergency_contact_phone: "555-0104", medical_info: { allergies: "None", medications: "Aspirin 81mg", medical_conditions: "Hypertension" } },
  { customer_id: "3", first_name: "Susan", last_name: "Davis", date_of_birth: "1960-11-02", phone_number: "555-0105", emergency_contact_name: "Tom Davis", emergency_contact_phone: "555-0106", medical_info: { allergies: "Shellfish", medications: "None", medical_conditions: "Arthritis" } },
  { customer_id: "4", first_name: "James", last_name: "Wilson", date_of_birth: "1938-04-25", phone_number: "555-0107", emergency_contact_name: "Lisa Wilson", emergency_contact_phone: "555-0108", medical_info: { allergies: "None", medications: "Donepezil 10mg", medical_conditions: "Dementia" } },
  { customer_id: "5", first_name: "Linda", last_name: "Moore", date_of_birth: "1955-09-15", phone_number: "555-0109", emergency_contact_name: "Mark Moore", emergency_contact_phone: "555-0110", medical_info: { allergies: "Latex", medications: "Ibuprofen 200mg", medical_conditions: "Chronic Pain" } }
];

export const appointments = [
  { appointment_id: "1", customer_id: "1", caregiver_id: "1", service_id: "1", appointment_datetime_start: "2025-07-20T09:00:00Z", appointment_datetime_end: "2025-07-20T10:00:00Z", duration_minutes: 60, status: "Confirmed", booking_notes: "Needs assistance with shower", total_cost: 20.0 },
  { appointment_id: "2", customer_id: "2", caregiver_id: "2", service_id: "2", appointment_datetime_start: "2025-07-21T10:30:00Z", appointment_datetime_end: "2025-07-21T11:00:00Z", duration_minutes: 30, status: "Pending", booking_notes: "", total_cost: 7.5 },
  { appointment_id: "3", customer_id: "3", caregiver_id: "3", service_id: "5", appointment_datetime_start: "2025-07-22T14:00:00Z", appointment_datetime_end: "2025-07-22T16:00:00Z", duration_minutes: 120, status: "Completed", booking_notes: "Prefers board games", total_cost: 24.0 },
  { appointment_id: "4", customer_id: "4", caregiver_id: "4", service_id: "4", appointment_datetime_start: "2025-07-23T11:00:00Z", appointment_datetime_end: "2025-07-23T11:45:00Z", duration_minutes: 45, status: "Confirmed", booking_notes: "Focus on leg exercises", total_cost: 18.75 },
  { appointment_id: "5", customer_id: "5", caregiver_id: "1", service_id: "1", appointment_datetime_start: "2025-07-24T08:00:00Z", appointment_datetime_end: "2025-07-24T09:00:00Z", duration_minutes: 60, status: "Cancelled", booking_notes: "Cancelled due to hospital visit", total_cost: 0.0 },
  { appointment_id: "6", customer_id: "1", caregiver_id: "2", service_id: "2", appointment_datetime_start: "2025-07-25T09:30:00Z", appointment_datetime_end: "2025-07-25T10:00:00Z", duration_minutes: 30, status: "Pending", booking_notes: "", total_cost: 7.5 },
  { appointment_id: "7", customer_id: "2", caregiver_id: "4", service_id: "4", appointment_datetime_start: "2025-07-26T10:00:00Z", appointment_datetime_end: "2025-07-26T10:45:00Z", duration_minutes: 45, status: "Confirmed", booking_notes: "Mobility support needed", total_cost: 18.75 },
  { appointment_id: "8", customer_id: "3", caregiver_id: "3", service_id: "5", appointment_datetime_start: "2025-07-27T13:00:00Z", appointment_datetime_end: "2025-07-27T15:00:00Z", duration_minutes: 120, status: "Rescheduled", booking_notes: "Rescheduled from 07-26", total_cost: 24.0 },
  { appointment_id: "9", customer_id: "4", caregiver_id: "1", service_id: "1", appointment_datetime_start: "2025-07-28T09:00:00Z", appointment_datetime_end: "2025-07-28T10:00:00Z", duration_minutes: 60, status: "Confirmed", booking_notes: "", total_cost: 20.0 },
  { appointment_id: "10", customer_id: "5", caregiver_id: "2", service_id: "2", appointment_datetime_start: "2025-07-29T11:00:00Z", appointment_datetime_end: "2025-07-29T11:30:00Z", duration_minutes: 30, status: "Pending", booking_notes: "", total_cost: 7.5 }
];

export const caregiverAvailability = [
  { availability_id: "1", caregiver_id: "1", date: "2025-07-20", start_time: "08:00:00", end_time: "12:00:00", is_available: true },
  { availability_id: "2", caregiver_id: "1", date: "2025-07-24", start_time: "08:00:00", end_time: "14:00:00", is_available: true },
  { availability_id: "3", caregiver_id: "2", date: "2025-07-21", start_time: "09:00:00", end_time: "15:00:00", is_available: true },
  { availability_id: "4", caregiver_id: "3", date: "2025-07-22", start_time: "12:00:00", end_time: "16:00:00", is_available: true },
  { availability_id: "5", caregiver_id: "4", date: "2025-07-23", start_time: "10:00:00", end_time: "14:00:00", is_available: true }
];