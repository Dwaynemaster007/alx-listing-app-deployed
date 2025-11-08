/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/booking/index.tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import BookingForm from '@/components/booking/BookingForm';
import OrderSummary from '@/components/booking/OrderSummary';
import { ArrowLeft } from 'lucide-react';

const BookingPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/properties/${id}`);
        const result = await response.json();
        
        if (result.success) {
          setProperty(result.data);
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleBookingSuccess = (booking: any) => {
    console.log('Booking successful:', booking);
    // You can redirect to a success page or show a confirmation
    router.push('/booking/success');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Property not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Property
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Complete Your Booking</h1>
          <p className="text-gray-600 mt-2">Finalize your reservation for {property.name}</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Booking Form */}
          <div>
            <BookingForm
              propertyId={property.id}
              propertyName={property.name}
              propertyImage={property.image}
              price={property.price}
              discount={property.discount}
              rating={property.rating}
              reviews={124} // You can get this from your property data or API
              onBookingSuccess={handleBookingSuccess}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <OrderSummary
              propertyId={property.id}
              propertyName={property.name}
              propertyImage={property.image}
              price={property.price}
              discount={property.discount}
              rating={property.rating}
              reviews={124}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
