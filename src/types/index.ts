export interface Hotel {
  id: string;
  name: string;
  city: string;
  rating: number;
  price: number;
  facilities: string[];
  description: string;
  image?: string;
}

export interface SearchFormData {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface SearchParams {
  city?: string;
  checkin?: string;
  checkout?: string;
  guests?: string;
} 