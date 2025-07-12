'use client';

import { useState, useEffect, useRef } from 'react';
import { searchCities } from '../utils/data';

interface CityAutocompleteProps {
  value: string;
  onChange: (city: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

export default function CityAutocomplete({
  value,
  onChange,
  onBlur,
  error,
  placeholder = "Enter city name",
  className = ""
}: CityAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    
    // Always call onChange to update parent state, even when clearing
    onChange(query);
    
    if (query.trim()) {
      const filteredCities = searchCities(query);
      setSuggestions(filteredCities);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    const currentValue = inputValue.trim();
    if (currentValue) {
      const filteredCities = searchCities(currentValue);
      setSuggestions(filteredCities);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setInputValue(city);
    onChange(city);
    setShowSuggestions(false);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      onBlur?.();
    }, 200);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
      />
      <p className={`text-xs mt-1 min-h-[28px] ${error ? 'text-red-500' : 'invisible'}`}>{error || 'placeholder'}</p>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-0 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((city, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(city)}
              className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 