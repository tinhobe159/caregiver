import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Clock, DollarSign, User, Heart, CheckCircle, X } from 'lucide-react';
import { Service, Caregiver, Package, PackageService } from '../data/mockData';
import { getServices, getCaregivers, getPackages, getPackageServices } from '../services/dataService';

interface BookingForm {
  packageId: string;
  caregiverId: string;
  date: string;
  time: string;
  duration: number;
  notes: string;
}

const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<BookingForm>({
    packageId: searchParams.get('package') || '',
    caregiverId: searchParams.get('caregiver') || '',
    date: '',
    time: '',
    duration: 0,
    notes: ''
  });

  // Memoize data to ensure stable references
  const packages: Package[] = useMemo(() => getPackages(), []);
  const services: Service[] = useMemo(() => getServices(), []);
  const packageServices: PackageService[] = useMemo(() => getPackageServices(), []);
  const caregivers: Caregiver[] = useMemo(() => getCaregivers(), []);

  const selectedPackage = packages.find(p => p.id === formData.packageId);
  const selectedCaregiver = caregivers.find(c => c.id === formData.caregiverId);

  // Get services associated with the selected package
  const getPackageServiceNames = (packageId: string) => {
    const relatedPackageServices = packageServices.filter(ps => ps.packageId === packageId);
    const serviceNames = relatedPackageServices.map(ps => {
      const service = services.find(s => s.id === ps.serviceId);
      return service ? service.name : 'Unknown Service';
    });
    return serviceNames.join(', ') || 'No services';
  };

  // Calculate total duration and cost based on package services
  const calculatePackageDetails = () => {
    if (!selectedPackage) {
      return { totalDuration: 0, totalCost: 0 };
    }
    const relatedPackageServices = packageServices.filter(ps => ps.packageId === selectedPackage.id);
    const totalDuration = relatedPackageServices.reduce((sum, ps) => {
      const service = services.find(s => s.id === ps.serviceId);
      return sum + (service ? service.defaultDurationMinutes / 60 : 0);
    }, 0);
    const totalCost = selectedPackage.totalCost; // Use package's totalCost
    return { totalDuration, totalCost };
  };

  useEffect(() => {
    if (selectedPackage && !formData.duration) {
      const { totalDuration } = calculatePackageDetails();
      setFormData(prev => ({
        ...prev,
        duration: totalDuration || 1 // Default to 1 if no services
      }));
    }
  }, [selectedPackage, formData.duration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const ConfirmationModal = () => {
    const { totalCost } = calculatePackageDetails();
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-bold text-gray-900">Booking Confirmed!</h2>
            </div>
            <button
              onClick={() => setShowConfirmation(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Package:</span>
              <span className="font-medium">{selectedPackage?.name || 'Unknown Package'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Services:</span>
              <span className="font-medium">{getPackageServiceNames(formData.packageId)}</span>
            </div>
            {selectedCaregiver && (
              <div className="flex justify-between">
                <span className="text-gray-600">Caregiver:</span>
                <span className="font-medium">{selectedCaregiver.firstName} {selectedCaregiver.lastName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-medium">{formData.date} at {formData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{formData.duration} hours</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-gray-900">Total Cost:</span>
              <span className="text-green-600">${totalCost.toFixed(2)}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            Your booking has been confirmed. You will receive a confirmation email shortly with all the details.
          </p>
          
          <button
            onClick={() => setShowConfirmation(false)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book Your Service
          </h1>
          <p className="text-xl text-gray-600">
            Schedule your appointment with our professional caregivers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>
              
              {/* Package Selection */}
              <div className="mb-6">
                <label htmlFor="packageId" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Package *
                </label>
                <select
                  id="packageId"
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a package...</option>
                  {packages.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} - ${pkg.totalCost.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Caregiver Selection */}
              <div className="mb-6">
                <label htmlFor="caregiverId" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Caregiver (Optional)
                </label>
                <select
                  id="caregiverId"
                  name="caregiverId"
                  value={formData.caregiverId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any available caregiver</option>
                  {caregivers.map(caregiver => (
                    <option key={caregiver.id} value={caregiver.id}>
                      {caregiver.firstName} {caregiver.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (hours) *
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="1"
                  max="12"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special instructions or requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={!formData.packageId || !formData.date || !formData.time}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                Confirm Booking
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h3>
              
              {selectedPackage ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{selectedPackage.name}</p>
                      <p className="text-sm text-gray-600">{getPackageServiceNames(selectedPackage.id)}</p>
                    </div>
                  </div>
                  
                  {selectedCaregiver && (
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{selectedCaregiver.firstName} {selectedCaregiver.lastName}</p>
                        <p className="text-sm text-gray-600">{selectedCaregiver.yearsOfExperience} years experience</p>
                      </div>
                    </div>
                  )}
                  
                  {formData.date && formData.time && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{formData.date}</p>
                        <p className="text-sm text-gray-600">{formData.time}</p>
                      </div>
                    </div>
                  )}
                  
                  {formData.duration && (
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{formData.duration} hours</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="font-bold text-gray-900">Total Cost:</span>
                      </div>
                      <span className="text-xl font-bold text-green-600">
                        ${calculatePackageDetails().totalCost.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Select a package to see booking details
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showConfirmation && <ConfirmationModal />}
    </div>
  );
};

export default BookingPage;