import cities from '../data/cities.json';
import hotels from '../data/hotels.json';
import { Hotel } from '../types';

export const getCities = (): string[] => {
  return cities;
};

// Add a set of random hotel images
const HOTEL_IMAGES = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
];

// Use a map to store assigned images by hotel id
const hotelImageMap: Record<string, string> = {};

function assignRandomImage(hotel: Hotel): Hotel {
  if (!hotel.image) {
    if (!hotelImageMap[hotel.id]) {
      // Use a deterministic hash of the hotel ID to assign consistent images
      const hash = hotel.id.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      const imageIndex = Math.abs(hash) % HOTEL_IMAGES.length;
      hotelImageMap[hotel.id] = HOTEL_IMAGES[imageIndex];
    }
    hotel.image = hotelImageMap[hotel.id];
  }
  return hotel;
}

export function getHotelsByCity(city: string): Hotel[] {
  return (hotels as Hotel[]).filter(h => h.city.toLowerCase() === city.toLowerCase()).map(assignRandomImage);
}

export function getAllHotels(): Hotel[] {
  return (hotels as Hotel[]).map(assignRandomImage);
}

export const getHotelById = (id: string): Hotel | undefined => {
  const hotel = hotels.find(hotel => hotel.id === id);
  return hotel ? assignRandomImage(hotel as Hotel) : undefined;
};

export const searchCities = (query: string): string[] => {
  const lowercaseQuery = query.toLowerCase();
  return cities.filter(city => 
    city.toLowerCase().includes(lowercaseQuery)
  );
}; 