'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import HotelCard from '../../components/HotelCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getHotelsByCity, getAllHotels } from '../../utils/data';
import { Hotel, SearchParams } from '../../types';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import Image from 'next/image';

function HotelsContent() {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState<SearchParams>({});

  useEffect(() => {
    const params: SearchParams = {
      city: searchParams.get('city') || undefined,
      checkin: searchParams.get('checkin') || undefined,
      checkout: searchParams.get('checkout') || undefined,
      guests: searchParams.get('guests') || undefined,
    };
    setSearchCriteria(params);
    setLoading(true);
    setTimeout(() => {
      let filteredHotels: Hotel[];
      if (params.city) {
        filteredHotels = getHotelsByCity(params.city);
      } else {
        filteredHotels = getAllHotels();
      }
      setHotels(filteredHotels);
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate nights
  let nights = 1;
  if (searchCriteria.checkin && searchCriteria.checkout) {
    try {
      nights = differenceInCalendarDays(parseISO(searchCriteria.checkout), parseISO(searchCriteria.checkin));
      if (nights < 1) nights = 1;
    } catch {}
  }
  const guests = searchCriteria.guests ? parseInt(searchCriteria.guests) : 1;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            ← Back to Search
          </Link>
          <div className="text-gray-700 text-base">
            <Image src="/guests.svg" alt="Guests Icon" width={20} height={20} className="inline-block mr-1 align-text-bottom" />
            {guests} Guest{guests > 1 ? 's' : ''} • {nights} Night{nights > 1 ? 's' : ''}
          </div>
        </div>
        {/* Header Card */}
        <div className="flex justify-center mb-4">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-5xl">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Hotels in {searchCriteria.city || 'India'}</h1>
              <div className="text-gray-600 text-base">
                {searchCriteria.checkin && searchCriteria.checkout && (
                  <span>
                    {formatDate(searchCriteria.checkin)} - {formatDate(searchCriteria.checkout)}
                  </span>
                )}
                {guests && (
                  <span> • <Image src="/guests.svg" alt="Guests Icon" width={16} height={16} className="inline-block mr-1 align-text-bottom" />{guests} Guest{guests > 1 ? 's' : ''}</span>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-8">
              <span className="inline-block bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full">
                {hotels.length} hotel{hotels.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </div>
        {/* Hotels List */}
        <div className="flex flex-col items-center gap-4">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div key={hotel.id} className="w-full max-w-5xl h-72">
                <HotelCard hotel={hotel} nights={nights} guests={guests} />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-600 mb-6">
                  {searchCriteria.city 
                    ? `We couldn't find any hotels in ${searchCriteria.city}. Try searching for a different city.`
                    : 'No hotels available at the moment. Please try again later.'
                  }
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search Again
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    }>
      <HotelsContent />
    </Suspense>
  );
} 