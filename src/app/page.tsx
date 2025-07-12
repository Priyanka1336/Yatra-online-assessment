'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CityAutocomplete from '../components/CityAutocomplete';
import { validateSearchForm } from '../utils/validation';
import { SearchFormData } from '../types';

export default function HomePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SearchFormData>({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof SearchFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateSearchForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // Navigate to hotels page with query parameters
    const params = new URLSearchParams({
      city: formData.city,
      checkin: formData.checkIn,
      checkout: formData.checkOut,
      guests: formData.guests.toString()
    });

    router.push(`/hotels?${params.toString()}`);
  };

  const getMinCheckOutDate = () => {
    if (!formData.checkIn) return '';
    const checkInDate = new Date(formData.checkIn);
    const nextDay = new Date(checkInDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  };

  const getMinCheckInDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header Bar */}
      <header className="w-full border-b border-gray-200 py-4 flex items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center space-x-2 ml-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plane h-8 w-8 text-blue-600"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
          <span className="text-xl font-bold text-gray-900">YatraBooking</span>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        {/* Main Headline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">Stay</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing hotels and create unforgettable memories with our curated selection of accommodations.
          </p>
        </div>
        {/* Search Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* City Input */}
              <div className="flex flex-col w-full">
                <label htmlFor="city" className="block text-xs font-medium text-gray-700 mb-1">
                  <span className="inline-flex items-center"><svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>City</span>
                </label>
                <CityAutocomplete
                  value={formData.city}
                  onChange={(city) => handleInputChange('city', city)}
                  error={errors.find(e => e.includes('City'))}
                  placeholder="Enter city name"
                  className="h-12 text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                />
              </div>
              {/* Check-in */}
              <div className="flex flex-col w-full">
                <label htmlFor="checkIn" className="block text-xs font-medium text-gray-700 mb-1">
                  <span className="inline-flex items-center"><svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>Check-in</span>
                </label>
                <input
                  type="date"
                  id="checkIn"
                  value={formData.checkIn}
                  onChange={(e) => handleInputChange('checkIn', e.target.value)}
                  min={getMinCheckInDate()}
                  className={`h-12 text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm ${errors.find(e => e.includes('Check-in')) ? 'border-red-500' : 'border-gray-300'}`}
                />
                <p className={`text-xs mt-1 min-h-[28px] ${errors.find(e => e.includes('Check-in')) ? 'text-red-500' : 'invisible'}`}>{errors.find(e => e.includes('Check-in')) || 'placeholder'}</p>
              </div>
              {/* Check-out */}
              <div className="flex flex-col w-full">
                <label htmlFor="checkOut" className="block text-xs font-medium text-gray-700 mb-1">
                  <span className="inline-flex items-center"><svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>Check-out</span>
                </label>
                <input
                  type="date"
                  id="checkOut"
                  value={formData.checkOut}
                  onChange={(e) => handleInputChange('checkOut', e.target.value)}
                  min={getMinCheckOutDate()}
                  className={`h-12 text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm ${errors.find(e => e.includes('Check-out')) ? 'border-red-500' : 'border-gray-300'}`}
                />
                <p className={`text-xs mt-1 min-h-[28px] ${errors.find(e => e.includes('Check-out')) ? 'text-red-500' : 'invisible'}`}>{errors.find(e => e.includes('Check-out')) || 'placeholder'}</p>
              </div>
              {/* Guests */}
              <div className="flex flex-col w-full">
                <label htmlFor="guests" className="block text-xs font-medium text-gray-700 mb-1">
                  <span className="inline-flex items-center"><svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" /></svg>Guests</span>
                </label>
                <select
                  id="guests"
                  value={formData.guests}
                  onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-black text-sm ${errors.find(e => e.toLowerCase().includes('guest')) ? 'border-red-500' : 'border-gray-300'}`}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num} >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
                <p className={`text-xs mt-1 min-h-[28px] ${errors.find(e => e.toLowerCase().includes('guest')) ? 'text-red-500' : 'invisible'}`}>{errors.find(e => e.toLowerCase().includes('guest')) || 'placeholder'}</p>
              </div>
              {/* Search Button */}
              <div className="md:col-span-4 flex justify-center mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 px-8 rounded-lg font-semibold text-base shadow-md hover:from-blue-600 hover:to-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
                  {isSubmitting ? 'Searching...' : 'Search Hotels'}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Features Section */}
        <div className="mt-24 bg-white py-16 shadow-sm rounded-xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-black">
            Why Choose <span className="font-extrabold text-black">YatraBooking</span>?
          </h2>
          <p className="text-xl text-center text-gray-500 mb-12">Experience hassle-free hotel booking with our premium features</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-gray-600">Find the perfect hotel with our intelligent search and filtering system</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2z" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={2} />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Prime Locations</h3>
              <p className="text-gray-600">Discover hotels in the best locations across major cities</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H6m6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">Get the best deals and competitive prices for your stay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
