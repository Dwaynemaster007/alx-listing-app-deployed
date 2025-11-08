/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE = '/api';

export const apiService = {
  // Properties
  async getProperties(filters?: { location?: string; minPrice?: number; maxPrice?: number; category?: string }) {
    const params = new URLSearchParams();
    if (filters?.location) params.append('location', filters.location);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.category) params.append('category', filters.category);
    
    const response = await fetch(`${API_BASE}/properties?${params}`);
    return response.json();
  },
  
  async getPropertyById(id: string) {
    const response = await fetch(`${API_BASE}/properties/${id}`);
    return response.json();
  },
  
  // Bookings
  async createBooking(bookingData: any) {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    return response.json();
  },
  
  async getBookings(userId?: string) {
    const params = userId ? `?userId=${userId}` : '';
    const response = await fetch(`${API_BASE}/bookings${params}`);
    return response.json();
  }
};
