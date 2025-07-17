import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import AdminNavbar from './components/Layout/AdminNavbar';
import Footer from './components/Layout/Footer';
import Homepage from './pages/Homepage';
import ServicesPage from './pages/ServicesPage';
import CaregiversPage from './pages/CaregiversPage';
import CaregiverDetailsPage from './pages/CaregiverDetailsPage';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CustomerManagement from './pages/admin/CustomerManagement';
import CustomerAppointments from './pages/admin/CustomerAppointments';
import CaregiverManagement from './pages/admin/CaregiverManagement';
import CaregiverAvailability from './pages/admin/CaregiverAvailability';
import ServiceManagement from './pages/admin/ServiceManagement';
import AppointmentManagement from './pages/admin/AppointmentManagement';

const AppContent: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {isAdmin ? <AdminNavbar /> : <Navbar />}
      <main>
        <Routes>
          {isAdmin ? (
            // Admin Routes
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/customers" element={<CustomerManagement />} />
              <Route path="/admin/customers/:id/appointments" element={<CustomerAppointments />} />
              <Route path="/admin/caregivers" element={<CaregiverManagement />} />
              <Route path="/admin/caregivers/:id/availability" element={<CaregiverAvailability />} />
              <Route path="/admin/services" element={<ServiceManagement />} />
              <Route path="/admin/appointments" element={<AppointmentManagement />} />
              <Route path="*" element={<AdminDashboard />} />
            </>
          ) : (
            // Customer Routes
            <>
              <Route path="/" element={<Homepage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/caregivers" element={<CaregiversPage />} />
              <Route path="/caregivers/:id" element={<CaregiverDetailsPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="*" element={<Homepage />} />
            </>
          )}
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;