// components/layout/Layout.tsx
import React from 'react';
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">ALX Listings</h1>
          <nav>
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-white border-t mt-12">
        <div className="max-w-screen-xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          © 2025 ALX Listing App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;