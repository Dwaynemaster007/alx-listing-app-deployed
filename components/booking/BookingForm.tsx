/* eslint-disable @typescript-eslint/no-explicit-any */
// components/booking/BookingForm.tsx
import { useState, useEffect } from 'react';
import CancellationPolicy from "./CancellationPolicy";

interface BookingFormProps {
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  price: number;
  discount?: string;
  rating: number;
  reviews: number;
  onBookingSuccess?: (booking: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  propertyId,
  propertyName,
  propertyImage,
  price,
  discount,
  rating,
  reviews,
  onBookingSuccess
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');

  // Generate random user ID on component mount
  useEffect(() => {
    const generateUserId = () => {
      const randomId = 'user_' + Math.random().toString(36).substr(2, 9);
      setUserId(randomId);
    };

    generateUserId();
  }, []);

  const discountedPrice = discount ? price * (1 - parseInt(discount) / 100) : price;
  const bookingFee = 25;
  const totalPrice = discountedPrice + bookingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const bookingData = {
        userId: userId,
        userName: `${formData.firstName} ${formData.lastName}`,
        userEmail: formData.email,
        userPhone: formData.phone,
        propertyId,
        propertyName,
        propertyImage,
        price: discountedPrice,
        bookingFee,
        totalPrice,
        rating,
        reviews,
        status: 'confirmed',
        billingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentInfo: {
          cardLastFour: formData.cardNumber.slice(-4),
          cardType: getCardType(formData.cardNumber)
        },
        bookedAt: new Date().toISOString()
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create booking');
      }

      if (result.success) {
        onBookingSuccess?.(result.data);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        });
        alert('Booking confirmed successfully!');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setError(error instanceof Error ? error.message : 'Booking failed');
    } finally {
      setLoading(false);
    }
  };


  const getCardType = (cardNumber: string): string => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    if (/^4/.test(cleanNumber)) return 'Visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'Mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'American Express';
    if (/^6(?:011|5)/.test(cleanNumber)) return 'Discover';
    return 'Unknown';
  };

  // Format card number as user types
  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  // Format expiry date as user types
  const formatExpiryDate = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData(prev => ({ ...prev, expiryDate: formatted }));
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm mb-4">
          {error}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Contact Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              required 
              placeholder="Laloo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              required 
              placeholder="Hailu"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              required 
              placeholder="laloo@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              required 
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Payment Information */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Payment Details</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <input 
            type="text" 
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            required 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
            <input 
              type="text" 
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              maxLength={5}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input 
              type="text" 
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              maxLength={4}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              required 
            />
          </div>
        </div>

        {/* Billing Address */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Billing Address</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
          <input 
            type="text" 
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            required 
            placeholder="123 Main St"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input 
              type="text" 
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              required 
              placeholder="New York"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input 
              type="text" 
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              required 
              placeholder="NY"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
            <input 
              type="text" 
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              required 
              placeholder="10001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input 
              type="text" 
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              required 
              placeholder="United States"
            />
          </div>
        </div>

        {/* Price Summary */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-lg mb-4">Price Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Property Price</span>
              <span>${discountedPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Booking Fee</span>
              <span>${bookingFee.toFixed(2)}</span>
            </div>
            {discount && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({discount}%)</span>
                <span>-${(price - discountedPrice).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-lg pt-3 mt-2 border-t border-gray-300">
              <span>Total Amount</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={loading}
          className= " w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-lg px-2 py-4.5 my-6 text-center me-2 mb-2"
        >
          {loading ? 'Processing Payment...' : `Confirm & Pay $${totalPrice.toFixed(2)}`}
        </button>
      </form>
      
      <CancellationPolicy />
    </div>
  );
};

export default BookingForm;
