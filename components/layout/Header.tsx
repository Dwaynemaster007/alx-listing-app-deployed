import React, { useState } from 'react';
import { Search, Calendar, User } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import Link from 'next/link';
const Header: React.FC<{ onSearch: (data: { location: string; checkIn: string; checkOut: string; guests: number }) => void }> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

   const [showAuth, setShowAuth] = useState<'signin' | 'signup' | null>(null);
  
  const { user, isAuthenticated, signOut } = useAuth();

  const handleSearch = () => {
    onSearch({ location, checkIn, checkOut, guests });
  };

const closeAuth = (): void => setShowAuth(null);

  return (
    <header className="w-full">
      <div className="bg-teal-600 text-white py-2 px-4 flex justify-center items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm p-2">Overseas trip? Get the latest information on travel guides</span>
          <button className="bg-black text-white  rounded-full text-md px-4 py-2 sm:w-32">More Info</button>
        </div>
      </div>

      <div className="bg-white shadow-sm py-4 px-4 sm:px-6 flex items-center justify-between flex-col gap-4 lg:flex-row">
  <h1 className="text-3xl sm:text-4xl font-bold text-black"><Link href={"/"}>alx</Link></h1>

  <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl gap-3 sm:gap-2 md:gap-4 px-2 sm:px-4 py-2">
    <div className="flex flex-col w-full sm:w-auto px-2 sm:px-4">
      <label className="text-sm font-semibold">Location</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Search for destination"
        className="text-sm placeholder-gray-400 focus:outline-none border-2 p-2 rounded-2xl border-gray-300 w-full"
      />
    </div>
    <div className="flex flex-col w-full sm:w-auto px-2 sm:px-4">
      <label className="text-sm font-semibold">Check in</label>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="text-sm placeholder-gray-400 border-2 p-2 rounded-2xl border-gray-300 focus:outline-none w-full"
      />
    </div>
    <div className="flex flex-col w-full sm:w-auto px-2 sm:px-4">
      <label className="text-sm font-semibold">Check out</label>
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="text-sm placeholder-gray-400 focus:outline-none border-2 p-2 rounded-2xl border-gray-300 w-full"
      />
    </div>
    <div className="flex flex-col w-full sm:w-auto px-2 sm:px-4">
      <label className="text-sm font-semibold">People</label>
      <input
        type="number"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        min="1"
        className="text-sm placeholder-gray-400 focus:outline-none border-2 p-2 rounded-2xl border-gray-300 w-full"
      />
    </div>
    <button
      onClick={handleSearch}
      className="bg-orange-500 text-white rounded-full p-3 sm:p-4 mt-2 sm:mt-0 hover:bg-orange-600 transition duration-300 flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto"
    >
      <Search className="h-5 w-5" />
    </button>
  </div>
<div className="flex items-center space-x-3 sm:space-x-4">
  {!isAuthenticated ? (
    <>

      <button
        onClick={() => setShowAuth('signin')}
        className="bg-teal-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-teal-700 transition duration-300 text-sm sm:text-base min-w-20 sm:min-w-24"
      >
        Sign in
      </button>
      <button
        onClick={() => setShowAuth('signup')}
        className="bg-white border border-gray-300 text-black px-4 py-2 rounded-full cursor-pointer hover:bg-teal-600 hover:text-white transition duration-300 text-sm sm:text-base min-w-20 sm:min-w-24"
      >
        Sign up
      </button>

      <Link 
        href="/booking" 
        className="text-gray-700 hover:text-gray-900 px-4 py-2 border-2 border-gray-200 rounded-full hover:border-gray-300 transition duration-300 text-sm sm:text-base whitespace-nowrap"
      >
        My Bookings
      </Link>
    </>
  ) : (
    // Authenticated User Section
    <div className="flex items-center space-x-3 sm:space-x-4">
      <div className="flex items-center space-x-2 bg-teal-50 px-3 py-2 rounded-2xl">
        <User className="h-4 w-4 text-teal-600" />
        <span className="text-sm font-medium text-teal-800 whitespace-nowrap">
          Hi, {user?.firstName}
          {user?.isGuest && ' (Guest)'}
        </span>
      </div>
      <Link 
        href="/booking" 
        className="text-gray-700 hover:text-gray-900 px-4 py-2 border-2 border-gray-200 rounded-full hover:border-gray-300 transition duration-300 text-sm sm:text-base whitespace-nowrap"
      >
        My Bookings
      </Link>
      
      <button
        onClick={signOut}
        className="bg-teal-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-teal-700 transition duration-300 text-sm sm:text-base min-w-20 sm:min-w-24"
      >
        Sign out
      </button>
    </div>
  )}
</div>

{/* Auth Modals */}
{showAuth === 'signin' && (
  <SignIn 
    onClose={closeAuth} 
    switchToSignUp={() => setShowAuth('signup')} 
  />
)}

{showAuth === 'signup' && (
  <SignUp 
    onClose={closeAuth} 
    switchToSignIn={() => setShowAuth('signin')} 
  />
)}



  </div>
      <nav className="bg-white px-6 py-4 overflow-x-auto whitespace-nowrap border-t border-gray-200">
        <div className="flex space-x-8">
          {[
            { icon: <Search className="h-6 w-6" />, label: 'Rooms' },
            { icon: <Calendar className="h-6 w-6" />, label: 'Mansion' },
            { icon: <User className="h-6 w-6" />, label: 'Countryside' },
            { icon: <Search className="h-6 w-6" />, label: 'Villa' },
            { icon: <Calendar className="h-6 w-6" />, label: 'Tropical' },
            { icon: <User className="h-6 w-6" />, label: 'New' },
            { icon: <Search className="h-6 w-6" />, label: 'Amazing pool' },
            { icon: <Calendar className="h-6 w-6" />, label: 'Beach house' },
            { icon: <User className="h-6 w-6" />, label: 'Island' },
            { icon: <Search className="h-6 w-6" />, label: 'Camping' },
            { icon: <Calendar className="h-6 w-6" />, label: 'Apartment' },
            { icon: <User className="h-6 w-6" />, label: 'House' },
            { icon: <Search className="h-6 w-6" />, label: 'Lakefront' },
            { icon: <Calendar className="h-6 w-6" />, label: 'Farm house' },
            { icon: <User className="h-6 w-6" />, label: 'Treehouse' },
            { icon: <Search className="h-6 w-6" />, label: 'Cabins' },
            { icon: <Calendar className="h-6 w-6" />, label: 'Castles' },
            { icon: <User className="h-6 w-6" />, label: 'Lakeside' },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-gray-600 cursor-pointer">
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </nav> 
    </header>
  );
};

export default Header;
