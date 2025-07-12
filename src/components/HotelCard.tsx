'use client';

import { Hotel } from '../types';
import Link from 'next/link';
import Image from 'next/image';

interface HotelCardProps {
  hotel: Hotel;
  nights?: number;
  guests?: number;
}

export default function HotelCard({ hotel, nights = 1, guests = 1 }: HotelCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    console.log(guests)

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">☆</span>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden mb-8 h-72">
      {/* Hotel Image */}
      <div className="md:w-2/5 w-full h-full flex-shrink-0">
        {hotel.image ? (
          <Image
            src={hotel.image}
            alt={hotel.name}
            width={400}
            height={250}
            className="rounded-lg w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
            <svg className="w-12 h-12 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}
      </div>
      {/* Hotel Info */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {hotel.city}
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <div className="flex items-center">
              {renderStars(hotel.rating)}
            </div>
            <span className="text-gray-600 text-sm">({hotel.rating})</span>
          </div>
        </div>
        <p className="text-gray-700 mb-3 text-base line-clamp-2">{hotel.description}</p>
        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.facilities.map((facility, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full flex items-center">
              {/* Optionally add icons here */}
              {facility}
            </span>
          ))}
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-2 md:mb-0">
            <div className="text-2xl font-bold text-gray-900">₹{hotel.price.toLocaleString()}</div>
            <div className="text-sm text-gray-500">per night</div>
            {nights > 1 && (
              <div className="text-sm text-gray-500">Total: ₹{(hotel.price * nights).toLocaleString()} for {nights} night{nights > 1 ? 's' : ''}</div>
            )}
            {/* Optionally show total price if nights prop is passed */}
          </div>
          <Link
            href={`/hotels/${hotel.id}`}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg hover:from-blue-600 hover:to-green-500 transition-colors duration-200 font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
} 