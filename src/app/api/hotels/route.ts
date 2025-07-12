import { NextResponse } from 'next/server';
import { getAllHotels, getHotelsByCity } from '../../../utils/data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    
    let hotels;
    if (city) {
      hotels = getHotelsByCity(city);
    } else {
      hotels = getAllHotels();
    }
    
    return NextResponse.json({
      success: true,
      data: hotels,
      count: hotels.length
    });
  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch hotels' 
      },
      { status: 500 }
    );
  }
} 