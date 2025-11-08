// pages/booking/success.tsx
import { useRouter } from 'next/router';
import { CheckCircle, Home, Calendar } from 'lucide-react';

const BookingSuccessPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmed!</h1>
        
        <p className="text-gray-600 mb-6">
          Your booking has been successfully confirmed. You will receive a confirmation email shortly.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          
          <button
            onClick={() => router.push('/booking')}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold flex items-center justify-center"
          >
            <Calendar className="h-5 w-5 mr-2" />
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
