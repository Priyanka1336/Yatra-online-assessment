import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders loading text', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders spinner element', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByText('Loading...').previousElementSibling;
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  it('has correct container styling', () => {
    render(<LoadingSpinner />);
    
    const container = screen.getByText('Loading...').parentElement;
    expect(container).toHaveClass('flex', 'justify-center', 'items-center', 'py-8');
  });

  it('has correct spinner styling', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByText('Loading...').previousElementSibling;
    expect(spinner).toHaveClass(
      'animate-spin',
      'rounded-full',
      'h-8',
      'w-8',
      'border-b-2',
      'border-blue-600'
    );
  });

  it('has correct text styling', () => {
    render(<LoadingSpinner />);
    
    const text = screen.getByText('Loading...');
    expect(text).toHaveClass('ml-3', 'text-gray-600');
  });

  it('renders with proper structure', () => {
    const { container } = render(<LoadingSpinner />);
    
    // Check that the structure is correct
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.tagName).toBe('DIV');
    expect(mainDiv.children).toHaveLength(2); // spinner + text
  });
}); 