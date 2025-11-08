// components/property/PropertyDetail.tsx
import { PropertyProps } from "@/interfaces";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Star, 
  MapPin, 
  Bed, 
  ShowerHead, 
  Users, 
  CheckCircle,
  Home,
  Calendar
} from 'lucide-react';
import ReviewSection from './ReviewSection';
import Image from 'next/image';

// FIXED: No props needed — we're fetching inside
const PropertyDetail = () => {
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id || Array.isArray(id)) {
        setError('Invalid property ID');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching property:', id);
        const response = await fetch(`/api/properties/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
          setProperty(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch property');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading property details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-red-600">Property not found</div>
      </div>
    );
  }

  const discountedPrice = property.discount 
    ? property.price * (1 - parseInt(property.discount) / 100) 
    : property.price;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Property Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.name}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <div className="flex items-center mr-4">
            <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
            <span className="font-semibold">{property.rating}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
            <span>{property.address.city}, {property.address.state}, {property.address.country}</span>
          </div>
        </div>
      </div>

      {/* Property Image */}
      <div className="mb-8">
        <Image
          src={property.image}
          alt={property.name}
          width={700}
          height={500}
          className="w-full h-96 object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Home className="h-6 w-6 mr-2 text-blue-600" />
              About this property
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {property.description || "Luxurious and modern property with stunning views and premium amenities."}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Bed className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-800">
                    {property.offers.bed} bed{property.offers.bed !== '1' ? 's' : ''}
                  </div>
                  <div className="text-sm text-gray-600">Comfortable sleeping</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <ShowerHead className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-800">
                    {property.offers.shower} shower{property.offers.shower !== '1' ? 's' : ''}
                  </div>
                  <div className="text-sm text-gray-600">Private bathrooms</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Users className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-800">{property.offers.occupants} guests</div>
                  <div className="text-sm text-gray-600">Maximum occupancy</div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                What this place offers
              </h3>
              <div className="flex flex-wrap gap-3">
                {property.category.map((cat: string, index: number) => (
                  <span
                    key={index}
                    className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200 flex items-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6 border border-gray-200">
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-3">
                {property.discount ? (
                  <span className="text-2xl text-red-600 font-bold">
                    ${discountedPrice.toFixed(2)}
                  </span>
                ) : null}
                <span className={`text-2xl font-bold ${property.discount ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                  ${property.price}
                </span>
                <span className="text-gray-600">/ night</span>
              </div>
              {property.discount && (
                <div className="text-green-600 font-semibold text-sm bg-green-50 px-3 py-1 rounded-full inline-block">
                  Save {property.discount}% with this special offer!
                </div>
              )}
            </div>

            <button
              onClick={() => router.push(`/booking?id=${id}`)}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold mb-4 flex items-center justify-center"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Now
            </button>
          </div>
        </div>
      </div>
      <ReviewSection propertyId={property.id!} />
    </div>
  );
};

export default PropertyDetail;