'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getHotelById } from '../../../utils/data';
import { Hotel } from '../../../types';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Image from 'next/image';

export default function HotelDetailPage() {
  const params = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingInitiated, setBookingInitiated] = useState(false);

  useEffect(() => {
    const hotelId = params.id as string;
    
    // Simulate loading
    setLoading(true);
    
    setTimeout(() => {
      const foundHotel = getHotelById(hotelId);
      setHotel(foundHotel || null);
      setLoading(false);
    }, 800);
  }, [params.id]);

  const handleBookNow = () => {
    if (hotel) {
      alert(`Booking initiated for ${hotel.name}!`);
      setBookingInitiated(true);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-2xl">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-2xl">☆</span>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-2xl">☆</span>
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hotel not found</h3>
              <p className="text-gray-600 mb-6">
                The hotel you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
              <Link
                href="/hotels"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse All Hotels
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/hotels"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            ← Back to Hotels
          </Link>
        </div>

        {/* Hotel Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hotel Image Header with Overlay */}
          {hotel.image ? (
            <div className="relative w-full h-72">
              <Image
                src={hotel.image}
                alt={hotel.name}
                width={1200}
                height={288}
                className="w-full h-72 object-cover object-center"
                priority
              />
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              {/* Overlayed hotel info */}
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">{hotel.name}</h1>
                <div className="flex items-center mb-1">
                  <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-white text-lg font-medium mr-4">{hotel.city}</span>
                  <span className="flex items-center">
                    {renderStars(hotel.rating)}
                    <span className="ml-2 text-white text-base font-medium">({hotel.rating})</span>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-72 bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
              <div className="text-center text-white">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{hotel.name}</h1>
                <div className="flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-lg font-medium mr-4">{hotel.city}</span>
                  <span className="flex items-center">
                    {renderStars(hotel.rating)}
                    <span className="ml-2 text-base font-medium">({hotel.rating})</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this hotel</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {hotel.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Facilities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {hotel.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Location</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-700">{hotel.city}, India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 sticky top-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Book your stay</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Price per night:</span>
                      <span className="text-2xl font-bold text-blue-600">₹{hotel.price}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {renderStars(hotel.rating)}
                        </div>
                        <span className="text-gray-700">{hotel.rating}/5</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleBookNow}
                    disabled={bookingInitiated}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                      bookingInitiated
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-green-400 text-white hover:from-blue-600 hover:to-green-500'
                    }`}
                  >
                    {bookingInitiated ? 'Booking Initiated!' : 'Book Now'}
                  </button>

                  {bookingInitiated && (
                    <p className="text-green-600 text-sm text-center mt-3">
                      ✓ Booking request sent successfully
                    </p>
                  )}

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                      Free cancellation • No prepayment needed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Hotels Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Similar hotels in {hotel.city}</h2>
          <div className="bg-white rounded-lg p-6">
            <p className="text-gray-600 text-center py-8">
              More hotels coming soon in {hotel.city}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 