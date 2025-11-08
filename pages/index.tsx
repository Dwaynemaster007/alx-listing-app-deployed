import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@/components/common/Card";
import Pill from "@/components/common/Pill";
import Layout from "@/components/layout/Layout";
import { PropertyProps } from "@/interfaces";

const filters = ["Top Villa", "Self Checkin", "Private Pool"];

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties`
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Dummy onSearch – you can use the real one later
  const handleSearch = () => {
    // Placeholder – will be used when you add search bar
  };

  if (loading) {
    return (
      <Layout onSearch={handleSearch}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl">Loading properties...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout onSearch={handleSearch}>
      <div className="max-w-screen-xl mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold text-gray-900">Featured Properties</h1>
        <div className="flex gap-3 mt-6 flex-wrap">
          {filters.map((label, i) => (
            <Pill key={i} label={label} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {properties.map((property: PropertyProps) => (
            <Card key={property.id} {...property} />
          ))}
        </div>
      </div>
    </Layout>
  );
}