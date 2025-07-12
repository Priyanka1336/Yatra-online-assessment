import { NextRequest } from 'next/server';
import { getHotelById } from '../../../../utils/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const hotel = getHotelById(id);
  if (!hotel) {
    return Response.json(
      { 
        success: false, 
        error: 'Hotel not found' 
      },
      { status: 404 }
    );
  }
  return Response.json({
    success: true,
    data: hotel
  });
} 