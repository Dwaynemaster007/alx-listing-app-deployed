// components/property/ReviewSection.tsx
import { useState, useEffect } from "react";
import { Star, User, MessageCircle } from 'lucide-react';
import Image from "next/image";
interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  userAvatar: string;
}

interface ReviewSectionProps {
  propertyId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!propertyId) return;

      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching reviews for property:', propertyId);
        const response = await fetch(`/api/reviews?propertyId=${propertyId}`);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log('API Response:', result);
        
        if (result.success) {
          setReviews(result.data);
          setAverageRating(result.averageRating);
        } else {
          throw new Error(result.message || 'Failed to fetch reviews');
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <MessageCircle className="h-6 w-6 mr-2 text-blue-600" />
          Guest Reviews
        </h2>
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-600">Loading reviews...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <MessageCircle className="h-6 w-6 mr-2 text-blue-600" />
          Guest Reviews
        </h2>
        <div className="text-center py-8">
          <div className="text-red-600 mb-2">Error loading reviews</div>
          <div className="text-gray-600 text-sm">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <MessageCircle className="h-6 w-6 mr-2 text-blue-600" />
          Guest Reviews
        </h2>
        {reviews.length > 0 && (
          <div className="flex items-center space-x-2">
          <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
              <span className="font-semibold text-lg">{averageRating}</span>
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
      
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No reviews yet.</p>
          <p className="text-gray-500 text-sm mt-1">Be the first to review this property!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {review.userAvatar ? (
                      <Image 
                        src={review.userAvatar} 
                        alt={review.userName}
                        width={700}
                        height={500}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{review.userName}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">{review.rating}.0</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
      )}
    </div>
  );
};

export default ReviewSection;
