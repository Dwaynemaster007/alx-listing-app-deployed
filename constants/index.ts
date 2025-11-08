import { PropertyProps } from "@/interfaces";

export const PROPERTYLISTINGSAMPLE: PropertyProps []  =  [
  { 
     id: "1",
      name: "Villa Ocean Breeze",
      address: {
          state: "Seminyak",
          city: "Bali",
          country: "Indonesia"
      },
      rating: 4.89,
      category: ["Luxury Villa", "Pool", "Free Parking"],
      price: 3200,
      offers: {
          bed: "3",
          shower: "3",
          occupants: "4-6"
      },
       image: "/assets/image 1.png",
      discount: "",
      description: ""
  },
  {   id: "2",  
      name: "Mountain Escape Chalet",
      address: {
          state: "Aspen",
          city: "Colorado",
          country: "USA"
      },
      rating: 4.70,
      category: ["Mountain View", "Fireplace", "Self Checkin"],
      price: 1800,
      offers: {
          bed: "4",
          shower: "2",
          occupants: "5-7"
      },
      image: "/assets/image 2.png",
      discount: "30",
      description: ""
  },
  { 
      id: "3",
      name: "Cozy Desert Retreat",
      address: {
          state: "Palm Springs",
          city: "California",
          country: "USA"
      },
      rating: 4.92,
      category: ["Desert View", "Pet Friendly", "Self Checkin"],
      price: 1500,
      offers: {
          bed: "2",
          shower: "1",
          occupants: "2-3"
      },
      image: "/assets/image 3.png",
      discount: "",
      description: ""
  },
  {   id: "4",
      name: "City Lights Penthouse",
      address: {
          state: "New York",
          city: "New York",
          country: "USA"
      },
      rating: 4.85,
      category: ["City View", "Free WiFi", "24h Checkin"],
      price: 4500,
      offers: {
          bed: "2",
          shower: "2",
          occupants: "2-4"
      },
      image: "/assets/image 19.png",
      discount: "15",
      description: ""
  },
  {   id: "5",
      name: "Riverside Cabin",
      address: {
          state: "Queenstown",
          city: "Otago",
          country: "New Zealand"
      },
      rating: 4.77,
      category: ["Riverside", "Private Dock", "Free Kayaks"],
      price: 2800,
      offers: {
          bed: "3",
          shower: "2",
          occupants: "4-6"
      },
      image: "/assets/image 21.png",
      discount: "20",
      description: ""
  },
  {   
     id: "6",
      name: "Modern Beachfront Villa",
      address: {
          state: "Sidemen",
          city: "Bali",
          country: "Indonesia"
      },
      rating: 4.95,
      category: ["Beachfront", "Private Pool", "Chef Service"],
      price: 5000,
      offers: {
          bed: "5",
          shower: "4",
          occupants: "8-10"
      },
      image: "/assets/image 22.png",
      discount: "",
      description: ""
  },
  {   id: "7",
      name: "Lakeside Chalet",
      address: {
          state: "Banff",
          city: "Alberta",
          country: "Canada"
      },
      rating: 4.65,
      category: ["Lakeside", "Mountain View", "Hiking Trails"],
      price: 2300,
      offers: {
          bed: "3",
          shower: "3",
          occupants: "4-5"
      },
      image: "/assets/image 24.png",
      discount: "10",
      description: ""
  },
  {  id: "8",
      name: "Tropical Garden Villa",
      address: {
          state: "Koh Samui",
          city: "Surat Thani",
          country: "Thailand"
      },
      rating: 4.80,
      category: ["Garden", "Free Parking", "Self Checkin"],
      price: 2750,
      offers: {
          bed: "3",
          shower: "3",
          occupants: "5-6"
      },
      image: "/assets/images/List 3.png",
      discount: "25",
      description: ""
  },
  {  id: "9",
      name: "Urban Loft",
      address: {
          state: "Berlin",
          city: "Berlin",
          country: "Germany"
      },
      rating: 4.60,
      category: ["City Center", "Free WiFi", "24h Checkin"],
      price: 2000,
      offers: {
          bed: "2",
          shower: "1",
          occupants: "2-3"
      },
       image: "/assets/images/List 4-1.png",
      discount: "",
      description: ""
  },
  { id: "10",
      name: "Secluded Forest Cabin",
      address: {
          state: "Whistler",
          city: "British Columbia",
          country: "Canada"
      },
      rating: 4.72,
      category: ["Secluded", "Hot Tub", "Self Checkin"],
      price: 2600,
      offers: {
          bed: "4",
          shower: "2",
          occupants: "5-7"
      },
       image: "/assets/images/List 4.png",
      discount: "40",
      description: ""
  },
  {   id: "11",
      name: "Cliffside Villa",
      address: {
          state: "Amalfi",
          city: "Salerno",
          country: "Italy"
      },
      rating: 4.93,
      category: ["Cliffside", "Infinity Pool", "Sea View"],
      price: 6000,
      offers: {
          bed: "4",
          shower: "4",
          occupants: "6-8"
      },
       image: "/assets/images/List 6.png",
      discount: "50",
      description: ""
  },
  {   id: "12",
      name: "Coastal Escape Villa",
      address: {
          state: "Noosa",
          city: "Queensland",
          country: "Australia"
      },
      rating: 4.83,
      category: ["Beachfront", "Pet Friendly", "Free Parking"],
      price: 3400,
      offers: {
          bed: "3",
          shower: "3",
          occupants: "4-6"
      },
       image: "/assets/images/List 7.png",
      discount: "",
      description: ""
  },
  {   id: "13",
      name: "Historical Villa",
      address: {
          state: "Florence",
          city: "Tuscany",
          country: "Italy"
      },
      rating: 4.67,
      category: ["Historical", "Free Breakfast", "Self Checkin"],
      price: 2700,
      offers: {
          bed: "2",
          shower: "2",
          occupants: "2-4"
      },
       image: "/assets/images/List 8.png",
      discount: "35",
      description: ""
  },
  {   id: "14",
      name: "Downtown Apartment",
      address: {
          state: "Tokyo",
          city: "Tokyo",
          country: "Japan"
      },
      rating: 4.81,
      category: ["City Center", "Free WiFi", "Public Transport"],
      price: 2200,
      offers: {
          bed: "1",
          shower: "1",
          occupants: "2"
      },
       image: "/assets/images/List 9.png",
      discount: "",
      description: ""
  },
  {   id: "15",
      name: "Luxury Safari Lodge",
      address: {
          state: "Serengeti",
          city: "Mara",
          country: "Tanzania"
      },
      rating: 4.97,
      category: ["Safari", "Guided Tours", "Free Breakfast"],
      price: 4500,
      offers: {
          bed: "4",
          shower: "4",
          occupants: "6-8"
      },
       image: "/assets/images/List 10.png",
      discount: "20",
      description: ""
  },
  {   id: "16",
      name: "Countryside Cottage",
      address: {
          state: "Cotswolds",
          city: "Gloucestershire",
          country: "UK"
      },
      rating: 4.58,
      category: ["Countryside", "Fireplace", "Self Checkin"],
      price: 1800,
      offers: {
          bed: "2",
          shower: "1",
          occupants: "2-4"
      },
       image: "/assets/images/List 11.png",
      discount: "25",
      description: ""
  },
  {
     id: "17",
      name: "Riverfront Mansion",
      address: {
          state: "Paris",
          city: "Île-de-France",
          country: "France"
      },
      rating: 4.86,
      category: ["Riverfront", "Private Garden", "Self Checkin"],
      price: 5000,
      offers: {
          bed: "4",
          shower: "3",
          occupants: "6-8"
      },
       image: "/assets/images/List 12.png",
      discount: "30",
      description: ""
  },
  {  id: "18",
      name: "Ski Chalet",
      address: {
          state: "Zermatt",
          city: "Valais",
          country: "Switzerland"
      },
      rating: 4.75,
      category: ["Mountain View", "Ski Access", "Fireplace"],
      price: 3900,
      offers: {
          bed: "3",
          shower: "3",
          occupants: "4-5"
      },
       image: "/assets/images/List 13.png",
      discount: "",
      description: ""
  },
  {  id: "19",
      name: "Island Paradise Villa",
      address: {
          state: "Mahe",
          city: "Victoria",
          country: "Seychelles"
      },
      rating: 4.98,
      category: ["Beachfront", "Private Pool", "Chef Service"],
      price: 6500,
      offers: {
          bed: "5",
          shower: "5",
          occupants: "8-10"
      },
       image: "/assets/images/List 3.png",
      discount: "60",
      description: ""
  },
  {  id: "20",
      name: "Clifftop Retreat",
      address: {
          state: "Cape Town",
          city: "Western Cape",
          country: "South Africa"
      },
      rating: 4.78,
      category: ["Ocean View", "Private Pool", "Self Checkin"],
      price: 4100,
      offers: {
          bed: "3",
          shower: "3",
          occupants: "4-5"
      },
       image: "/assets/images/List 15.png",
      discount: "",
      description: ""
  }
];