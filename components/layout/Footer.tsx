import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h1 className="text-white font-bold text-xl mb-4">alx</h1>
          <p className="text-gray-400 text-sm">
            ALX is a platform where travelers can discover and book unique,
            comfortable, and affordable lodging options worldwide. From cozy city
            apartments and tranquil countryside retreats to exotic beachside
            villas, ALX connects you with the perfect place to stay for any trip.
          </p>
        </div>

        <div>
          <h2 className="text-white font-semibold mb-4">Explore</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="#">Apartments in Dubai</Link></li>
            <li><Link href="#">Hotels in New York</Link></li>
            <li><Link href="#">Villa in Spain</Link></li>
            <li><Link href="#">Mansion in Indonesia</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-white font-semibold mb-4">Company</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="#">About us</Link></li>
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Career</Link></li>
            <li><Link href="#">Customers</Link></li>
            <li><Link href="#">Brand</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-white font-semibold mb-4">Help</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="#">Support</Link></li>
            <li><Link href="#">Cancel booking</Link></li>
            <li><Link href="#">Refunds Process</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-gray-400 text-sm">
          <p>
            Some hotel requires you to cancel more than 24 hours before check-in.
            Details <Link href="#" className="text-teal-500">here</Link>
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="#">Terms of Service</Link>
            <Link href="#">Policy service</Link>
            <Link href="#">Cookies Policy</Link>
            <Link href="#">Partners</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
