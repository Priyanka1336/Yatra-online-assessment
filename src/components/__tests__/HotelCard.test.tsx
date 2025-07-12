import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HotelCard from '../HotelCard';

const mockHotel = {
  id: 'hotel-1',
  name: 'The Royal Palace',
  city: 'Delhi',
  rating: 4.5,
  price: 3500,
  facilities: ['Free WiFi', 'AC', 'Breakfast'],
  description: 'Elegant stay with all modern amenities.',
  image: '/test-image.jpg'
};

describe('HotelCard', () => {
  it('renders hotel information correctly', () => {
    render(<HotelCard hotel={mockHotel} />);
    
    expect(screen.getByText('The Royal Palace')).toBeInTheDocument();
    expect(screen.getByText('Delhi')).toBeInTheDocument();
    expect(screen.getByText('₹3,500')).toBeInTheDocument();
    expect(screen.getByText('Elegant stay with all modern amenities.')).toBeInTheDocument();
  });

  it('renders facilities correctly', () => {
    render(<HotelCard hotel={mockHotel} />);
    
    expect(screen.getByText('Free WiFi')).toBeInTheDocument();
    expect(screen.getByText('AC')).toBeInTheDocument();
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
  });

  it('renders rating correctly', () => {
    render(<HotelCard hotel={mockHotel} />);
    
    expect(screen.getByText('(4.5)')).toBeInTheDocument();
  });

  it('renders view details button', () => {
    render(<HotelCard hotel={mockHotel} />);
    
    expect(screen.getByText('View Details')).toBeInTheDocument();
  });

  it('renders hotel image with correct alt text', () => {
    render(<HotelCard hotel={mockHotel} />);
    
    const image = screen.getByAltText('The Royal Palace');
    expect(image).toBeInTheDocument();
    // Next.js Image component transforms the src, so we check it contains the original path
    expect(image).toHaveAttribute('src');
    const src = image.getAttribute('src');
    expect(src).toContain('test-image.jpg');
  });

  it('renders default image when no image is provided', () => {
    const hotelWithoutImage = { ...mockHotel, image: undefined };
    render(<HotelCard hotel={hotelWithoutImage} />);
    
    // When no image is provided, it renders a div with SVG, not an img element
    // So we check for the SVG element instead
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    
    // Verify the hotel name is still displayed
    expect(screen.getByText('The Royal Palace')).toBeInTheDocument();
  });

  it('renders star rating correctly', () => {
    render(<HotelCard hotel={mockHotel} />);
    
    // Check for full stars (4 stars for 4.5 rating)
    const fullStars = document.querySelectorAll('.text-yellow-400');
    expect(fullStars.length).toBeGreaterThan(0);
  });

  it('displays total price for multiple nights', () => {
    render(<HotelCard hotel={mockHotel} nights={3} />);
    
    expect(screen.getByText('Total: ₹10,500 for 3 nights')).toBeInTheDocument();
  });

  it('does not display total price for single night', () => {
    render(<HotelCard hotel={mockHotel} nights={1} />);
    
    expect(screen.queryByText(/Total:/)).not.toBeInTheDocument();
  });

  it('does not display total price for single night by default', () => {
    render(<HotelCard hotel={mockHotel} />);
    
    expect(screen.queryByText(/Total:/)).not.toBeInTheDocument();
  });

  it('renders location icon', () => {
    render(<HotelCard hotel={mockHotel} />);
    
    // Check for the SVG icon (location icon)
    const locationIcon = document.querySelector('svg');
    expect(locationIcon).toBeInTheDocument();
  });

  it('renders view details link with correct href', () => {
    render(<HotelCard hotel={mockHotel} />);
    
    const link = screen.getByText('View Details').closest('a');
    expect(link).toHaveAttribute('href', '/hotels/hotel-1');
  });

  it('renders price with proper formatting', () => {
    const expensiveHotel = { ...mockHotel, price: 15000 };
    render(<HotelCard hotel={expensiveHotel} />);
    
    expect(screen.getByText('₹15,000')).toBeInTheDocument();
  });

  it('renders facilities as badges', () => {
    render(<HotelCard hotel={mockHotel} />);
    
    const facilityBadges = screen.getAllByText(/Free WiFi|AC|Breakfast/);
    expect(facilityBadges).toHaveLength(3);
    
    facilityBadges.forEach(badge => {
      expect(badge).toHaveClass('px-3', 'py-1', 'bg-gray-100', 'text-gray-800', 'text-xs', 'rounded-full');
    });
  });

  it('renders with responsive classes', () => {
    const { container } = render(<HotelCard hotel={mockHotel} />);
    
    const mainCard = container.firstChild as HTMLElement;
    expect(mainCard).toHaveClass('flex', 'flex-col', 'md:flex-row');
  });

  it('renders per night text', () => {
    render(<HotelCard hotel={mockHotel} />);
    
    expect(screen.getByText('per night')).toBeInTheDocument();
  });

  it('handles hotel with no facilities', () => {
    const hotelWithoutFacilities = { ...mockHotel, facilities: [] };
    render(<HotelCard hotel={hotelWithoutFacilities} />);
    
    expect(screen.queryByText('Free WiFi')).not.toBeInTheDocument();
  });

  it('handles hotel with decimal rating', () => {
    const hotelWithDecimalRating = { ...mockHotel, rating: 3.7 };
    render(<HotelCard hotel={hotelWithDecimalRating} />);
    
    expect(screen.getByText('(3.7)')).toBeInTheDocument();
  });
}); 