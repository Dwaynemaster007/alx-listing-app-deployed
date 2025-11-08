import BookingSection from "@/components/property/BookingSection";
import ReviewSection from "@/components/property/ReviewSection";

function Property() {
  return (
    <div>
      <BookingSection price={0} />
      <ReviewSection propertyId="0" />
    </div>
  );
}

export default Property;
