export const isDateValid = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const isDateInFuture = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

export const isCheckOutAfterCheckIn = (checkIn: string, checkOut: string): boolean => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  return checkOutDate > checkInDate;
};

export const validateSearchForm = (formData: {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.city.trim()) {
    errors.push('City is required');
  }

  if (!formData.checkIn) {
    errors.push('Check-in date is required');
  } else if (!isDateInFuture(formData.checkIn)) {
    errors.push('Check-in date must be in the future');
  }

  if (!formData.checkOut) {
    errors.push('Check-out date is required');
  } else if (!isDateInFuture(formData.checkOut)) {
    errors.push('Check-out date must be in the future');
  }

  if (formData.checkIn && formData.checkOut && !isCheckOutAfterCheckIn(formData.checkIn, formData.checkOut)) {
    errors.push('Check-out date must be after check-in date');
  }

  if (formData.guests < 1 || formData.guests > 5) {
    errors.push('Number of guests must be between 1 and 5');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}; 