import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CityAutocomplete from '../CityAutocomplete';

// Mock the searchCities function
jest.mock('../../utils/data', () => ({
  searchCities: jest.fn()
}));

import { searchCities } from '../../utils/data';

describe('CityAutocomplete', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (searchCities as jest.Mock).mockReturnValue([]);
  });

  it('renders with default placeholder', () => {
    render(<CityAutocomplete {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('Enter city name')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<CityAutocomplete {...defaultProps} placeholder="Search for a city" />);
    
    expect(screen.getByPlaceholderText('Search for a city')).toBeInTheDocument();
  });

  it('displays the initial value', () => {
    render(<CityAutocomplete {...defaultProps} value="Mumbai" />);
    
    expect(screen.getByDisplayValue('Mumbai')).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<CityAutocomplete {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Delhi' } });
    
    expect(input).toHaveValue('Delhi');
  });

  it('shows suggestions when typing', async () => {
    (searchCities as jest.Mock).mockReturnValue(['Delhi', 'Mumbai', 'Bangalore']);
    
    render(<CityAutocomplete {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'D' } });
    
    await waitFor(() => {
      expect(screen.getByText('Delhi')).toBeInTheDocument();
      expect(screen.getByText('Mumbai')).toBeInTheDocument();
      expect(screen.getByText('Bangalore')).toBeInTheDocument();
    });
  });

  it('calls onChange and hides suggestions when suggestion is clicked', async () => {
    (searchCities as jest.Mock).mockReturnValue(['Delhi', 'Mumbai']);
    
    render(<CityAutocomplete {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'D' } });
    
    await waitFor(() => {
      expect(screen.getByText('Delhi')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Delhi'));
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('Delhi');
    expect(screen.queryByText('Delhi')).not.toBeInTheDocument();
  });

  it('hides suggestions when input is empty', () => {
    render(<CityAutocomplete {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onBlur when input loses focus', async () => {
    render(<CityAutocomplete {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.blur(input);
    
    // Wait for the timeout in handleInputBlur
    await waitFor(() => {
      expect(defaultProps.onBlur).toHaveBeenCalled();
    }, { timeout: 300 });
  });

  it('displays error message when error prop is provided', () => {
    render(<CityAutocomplete {...defaultProps} error="Please enter a valid city" />);
    
    expect(screen.getByText('Please enter a valid city')).toBeInTheDocument();
  });

  it('applies error styling when error is present', () => {
    render(<CityAutocomplete {...defaultProps} error="Error message" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
  });

  it('applies custom className', () => {
    render(<CityAutocomplete {...defaultProps} className="custom-class" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('hides suggestions when clicking outside', async () => {
    (searchCities as jest.Mock).mockReturnValue(['Delhi']);
    
    render(<CityAutocomplete {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'D' } });
    
    await waitFor(() => {
      expect(screen.getByText('Delhi')).toBeInTheDocument();
    });
    
    // Simulate clicking outside
    fireEvent.mouseDown(document.body);
    
    expect(screen.queryByText('Delhi')).not.toBeInTheDocument();
  });

  it('shows suggestions on focus if input has value and suggestions exist', async () => {
    (searchCities as jest.Mock).mockReturnValue(['Delhi']);
    
    render(<CityAutocomplete {...defaultProps} value="D" />);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    
    await waitFor(() => {
      expect(screen.getByText('Delhi')).toBeInTheDocument();
    });
  });

  it('does not show suggestions on focus if input is empty', () => {
    render(<CityAutocomplete {...defaultProps} value="" />);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('does not show suggestions on focus if no suggestions exist', () => {
    (searchCities as jest.Mock).mockReturnValue([]);
    
    render(<CityAutocomplete {...defaultProps} value="D" />);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
}); 