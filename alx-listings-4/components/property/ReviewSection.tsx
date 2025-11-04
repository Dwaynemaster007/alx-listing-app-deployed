import axios from "axios";
import { useEffect, useState } from "react";

interface Review {
  id: string;
  user?: string;
  name?: string;
  comment: string;
  rating?: number;
}

interface Props {
  propertyId: string;
}

const ReviewSection: React.FC<Props> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) return;

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (err) {
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="mb-4 border p-3 rounded">
            <p><strong>{review.user || review.name || "Anonymous"}:</strong> {review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewSection;
