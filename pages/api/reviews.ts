/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/api/reviews.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Mock reviews data
const reviewsData: { [key: string]: any[] } = {
  '1': [
    {
      id: '1',
      userId: 'user1',
      userName: 'Ebisa M.',
      rating: 5,
      comment: 'Amazing villa with breathtaking ocean views! The pool was fantastic and the staff were incredibly helpful. Would definitely stay again!',
      date: '2025-10-15',
      userAvatar: ''
    },
    {
      id: '2', 
      userId: 'user2',
      userName: 'Laloo D.',
      rating: 4,
      comment: 'Great location and amenities. The villa was clean and well-maintained. The only downside was the wifi was a bit slow.',
      date: '2025-11-10',
      userAvatar: ''
    }
  ],
  '2': [
    {
      id: '3',
      userId: 'user3',
      userName: 'Michael R.',
      rating: 5,
      comment: 'Perfect mountain getaway! The fireplace was so cozy and the views were incredible. Very peaceful and relaxing.',
      date: '2024-01-08',
      userAvatar: ''
    }
  ]
  // Add more properties as needed
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { propertyId } = req.query;

  console.log('=== REVIEWS API DEBUG ===');
  console.log('Full query:', req.query);
  console.log('propertyId received:', propertyId);
  console.log('Type of propertyId:', typeof propertyId);
  console.log('========================');

  if (!propertyId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid property ID - propertyId is required'
    });
  }

  if (Array.isArray(propertyId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid property ID - propertyId should be a single value'
    });
  }

  if (req.method === 'GET') {
    try {
      const propertyReviews = reviewsData[propertyId] || [];
      
      // Calculate average rating
      const averageRating = propertyReviews.length > 0 
        ? propertyReviews.reduce((acc, review) => acc + review.rating, 0) / propertyReviews.length 
        : 0;
      
      res.status(200).json({
        success: true,
        data: propertyReviews,
        total: propertyReviews.length,
        averageRating: parseFloat(averageRating.toFixed(1))
      });
      
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`
    });
  }
}
