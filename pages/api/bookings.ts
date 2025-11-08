/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/api/bookings.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Mock bookings data
// eslint-disable-next-line prefer-const
let bookings: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Bookings API called:', req.method);

  if (req.method === 'GET') {
    const { userId, propertyId } = req.query;
    
    let filteredBookings = [...bookings];
    
    if (userId) {
      filteredBookings = filteredBookings.filter(booking => booking.userId === userId);
    }
    
    if (propertyId) {
      filteredBookings = filteredBookings.filter(booking => booking.propertyId === propertyId);
    }
    
    res.status(200).json({
      success: true,
      data: filteredBookings,
      total: filteredBookings.length
    });
    
  } else if (req.method === 'POST') {
    try {
      const { 
        userId, 
        userName, 
        userEmail,
        userPhone,
        propertyId, 
        propertyName,
        propertyImage,
        price, 
        bookingFee,
        totalPrice,
        rating,
        reviews,
        billingAddress,
        paymentInfo
      } = req.body;
      
      if (!userId || !propertyId || !totalPrice) {
        return res.status(400).json({
          success: false,
          message: 'Missing required booking fields'
        });
      }

      const newBooking = {
        id: Date.now().toString(),
        userId,
        userName: userName || 'Guest',
        userEmail: userEmail || '',
        userPhone: userPhone || '',
        propertyId,
        propertyName: propertyName || 'Unknown Property',
        propertyImage: propertyImage || '',
        price: parseFloat(price) || 0,
        bookingFee: parseFloat(bookingFee) || 0,
        totalPrice: parseFloat(totalPrice) || 0,
        rating: rating || 0,
        reviews: reviews || 0,
        status: 'confirmed',
        billingAddress: billingAddress || {},
        paymentInfo: paymentInfo || {},
        bookedAt: new Date().toISOString(),
        bookingNumber: `BK${Date.now().toString().slice(-8)}`
      };

      bookings.unshift(newBooking);
      
      console.log('New booking created for user:', userId);
      console.log('Booking details:', newBooking);
      
      res.status(201).json({
        success: true,
        data: newBooking,
        message: 'Booking created successfully'
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating booking'
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`
    });
  }
}
