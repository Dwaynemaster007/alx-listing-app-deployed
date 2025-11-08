// components/booking/OrderSummary.tsx
import { Star } from 'lucide-react';
import Image from 'next/image';
interface OrderSummaryProps {
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  price: number;
  discount?: string;
  rating: number;
  reviews: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  propertyId,
  propertyName, 
  propertyImage, 
  price, 
  discount,
  rating,
  reviews
}) => {
  const discountedPrice = discount ? price * (1 - parseInt(discount) / 100) : price;
  const bookingFee = 25;
  const totalPrice = discountedPrice + bookingFee;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg sticky top-8">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      {/* Property Info */}
      <div className="flex items-start space-x-4 mb-6">
        <Image 
          src={propertyImage} 
          alt={propertyName}
          width={700}
          height={500}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{propertyName}</h3>
          <p className='text-center'>Id : {propertyId}</p>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
            <span className="text-sm text-gray-600">{rating} • {reviews} reviews</span>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-700">Price Details</h4>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Base Price</span>
          <span>${price.toFixed(2)}</span>
        </div>
        
        {discount && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Discount ({discount}%)</span>
            <span className="text-green-600">-${(price - discountedPrice).toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Booking Fee</span>
          <span>${bookingFee.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex justify-between">
            <span>Check-in</span>
            <span>After 3:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Check-out</span>
            <span>Before 11:00 AM</span>
          </div>
          <div className="flex justify-between">
            <span>Cancellation</span>
            <span className="text-green-600">Free cancellation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
