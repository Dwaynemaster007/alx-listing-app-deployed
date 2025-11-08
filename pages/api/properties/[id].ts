// pages/api/properties/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PROPERTYLISTINGSAMPLE } from '../../../constants'; // Use your actual constants

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  console.log('API called with ID:', id);
  console.log('Available IDs:', PROPERTYLISTINGSAMPLE.map(p => p.id));

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid property ID'
    });
  }

  try {
    const property = PROPERTYLISTINGSAMPLE.find(p => p.id === id);
    
    console.log('Found property:', property ? property.name : 'NOT FOUND');
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property with ID ${id} not found. Available IDs: ${PROPERTYLISTINGSAMPLE.map(p => p.id).join(', ')}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: property
    });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
