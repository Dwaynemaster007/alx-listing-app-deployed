// pages/404.tsx
import { Home, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';

const Custom404 = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-around px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-9xl font-bold text-gray-800 opacity-10">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-gray-700">404</div>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Oops! The page you&apos;re looking for seems to have wandered off.
          It might have been moved, deleted, or you entered the wrong URL.
           do you want booking? go to booking. 
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm"
          >
            <ArrowLeft className='h-5 w-5 mr-2' />
            
            Go Back to Home <Home className="h-5 w-5 ml-2" />
          </Link>

          <Link
            href="/properties"
            className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold shadow-sm"
          >
            <Search className="h-5 w-5 mr-2" />
            Browse Properties
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">
            Need help finding something?
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/contact" className="text-green-600 hover:text-green-700 hover:underline">
              Contact Support
            </Link>
            <Link href="/help" className="text-green-600 hover:text-green-700 hover:underline">
              Help Center
            </Link>
            <Link href="/sitemap" className="text-green-600 hover:text-green-700 hover:underline">
              Sitemap
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Try using the search bar to find what you&apos;re looking for
          </p>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
