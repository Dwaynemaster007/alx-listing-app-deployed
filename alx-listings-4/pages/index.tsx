import axios from "axios";
import { useState, useEffect } from "react";
import Card from "@/components/common/Card";
import Pill from "@/components/common/Pill";
import { PropertyProps } from "@/interfaces";

const filters = ["Top Villa", "Self Checkin", "Private Pool"];

export default function Home() {
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties");
        setProperties(response.data);
      } catch (err) {
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <main className="p-0 px-2">
      {/* Hero Section */}
      <section
        className="p-0 w-fup-ll h-[60vh] bg-cover bg-center flex items-center justify-center text-white rounded-b-xl"
        style={{ backgroundImage: "url('/assets/franc.jpg')" }}
      >
        <div className="bg-opacity-50 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-2">Find your favorite place here!</h1>
          <p className="text-lg">The best prices for over 2 million properties worldwide</p>
        </div>
      </section>

      {/* Filter Section */}
      <div className="flex gap-3 mt-6 flex-wrap">
        {filters.map((label, i) => (
          <Pill key={i} label={label} />
        ))}
      </div>

      {/* Listings Title */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Property Listings</h1>

      {/* Property Listings Grid */}
      {loading ? (
        <p>Loading properties...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {properties.map((property) => (
            <Card key={property.id} {...property} />
          ))}
        </div>
      )}
    </main>
  );
}
