import React from 'react';
import { PropertyProps } from '@/interfaces';
import Image from 'next/image';

const PropertyCard: React.FC<{ property: PropertyProps | undefined }> = ({ property }) => {
  if (!property) {
    return <div>Loading...</div>; 
  }
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Image src={property.image} alt={property.name} width={300} height={200} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{property.name}</h3>
        <p className="text-gray-600 text-sm">{`${property.address.city}, ${property.address.country}`}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">{'★'.repeat(Math.round(property.rating))}</span>
          <span className="text-gray-600 ml-1 text-sm">{property.rating}</span>
        </div>
        <p className="text-lg font-bold mt-2">${property.price}/night</p>
        {property.discount && <p className="text-green-600 text-sm">{property.discount}</p>}
        <p className="text-sm text-gray-500 mt-1">{`${property.offers.bed}, ${property.offers.shower} shower, ${property.offers.occupants} occupants`}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
