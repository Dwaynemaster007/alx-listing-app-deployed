import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";
import CancellationPolicy from "@/components/booking/CancellationPolicy";

export default function BookingPage() {
  const bookingDetails = {
    propertyName: "Villa Arrecife Beach House",
    price: 7500,
    bookingFee: 65,
    totalNights: 3,
    startDate: "24 August 2024",
  };

  return (
    <div className="container mx-auto p-6">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BookingForm />
        <OrderSummary bookingDetails={bookingDetails} />
      </div>

      {/* Cancellation Policy Section */}
      <CancellationPolicy />
      <div>
        <h2 className="text-xl font-semibold mt-6">Ground Rules</h2>
        <ul className="mt-2 text-gray-600 list-disc list-inside">
        <li>Follow the house rules</li>
        <li>Treat your Host’s home like your own</li>
      </ul>
      </div>

    </div>

  );
}
