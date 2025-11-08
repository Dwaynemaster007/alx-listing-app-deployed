import { NextApiRequest, NextApiResponse } from 'next';
import { PROPERTYLISTINGSAMPLE } from '@/constants';
import { PropertyProps } from '@/interfaces';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { location, minPrice, maxPrice, category } = req.query;
    
    let filteredProperties: PropertyProps[] = [...PROPERTYLISTINGSAMPLE];
    
    if (location) {
      const locationStr = (location as string).toLowerCase();
      filteredProperties = filteredProperties.filter(property =>
        property.address.city.toLowerCase().includes(locationStr) ||
        property.address.state.toLowerCase().includes(locationStr) ||
        property.address.country.toLowerCase().includes(locationStr)
      );
    }
    
    if (minPrice) {
      filteredProperties = filteredProperties.filter(property =>
        property.price >= parseInt(minPrice as string)
      );
    }
    
    if (maxPrice) {
      filteredProperties = filteredProperties.filter(property =>
        property.price <= parseInt(maxPrice as string)
      );
    }
    
    if (category) {
      const categories = (category as string).split(',');
      filteredProperties = filteredProperties.filter(property =>
        categories.some(cat => property.category.includes(cat))
      );
    }
    
    res.status(200).json({
      success: true,
      data: filteredProperties,
      total: filteredProperties.length
    });
    
  } else if (req.method === 'POST') {
    try {
      const newProperty: PropertyProps = {
        id: Date.now().toString(),
        ...req.body
      };
      
      // In real app, I would save to database
      // PROPERTYLISTINGSAMPLE.push(newProperty);
      
      res.status(201).json({
        success: true,
        data: newProperty,
        message: 'Property created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error creating property',
        error
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`
    });
  }
}
