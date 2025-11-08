import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import PropertyDetail from "@/components/property/PropertyDetail";
import Layout from "@/components/layout/Layout";
import { PropertyProps } from "@/interfaces";

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${id}`
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Dummy handler — matches the one in _app.tsx
  const handleSearch = () => {
    // Search logic will come later
  };

  if (loading) {
    return (
      <Layout onSearch={handleSearch}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl">Loading property...</p>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout onSearch={handleSearch}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl">Property not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout onSearch={handleSearch}>
      <PropertyDetail />
    </Layout>
  );
}