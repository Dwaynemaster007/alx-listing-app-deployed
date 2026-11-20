import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Pill from "@/components/common/Pill";
import PropertyCard from "@/components/property/PropertyCard";
import { PropertyProps } from "@/interfaces";
import { apiService } from "@/services/api";

const FILTERS = ["All", "Self Checkin", "Pool", "Free Parking", "Pet Friendly", "City View"];

export default function Home() {
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    apiService
      .getProperties()
      .then((result) => {
        if (result.success) setProperties(result.data);
        else setError(result.message || "Could not load properties.");
      })
      .catch(() => setError("Could not load properties."))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(
    () =>
      activeFilter === "All"
        ? properties
        : properties.filter((p) => p.category.some((c) => c.toLowerCase().includes(activeFilter.toLowerCase()))),
    [properties, activeFilter]
  );

  return (
    <>
      <Head>
        <title>ALX Listings | Find your next stay</title>
      </Head>
      <div className="max-w-screen-xl mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold text-gray-900">Featured Properties</h1>

        <div className="flex gap-3 mt-6 flex-wrap">
          {FILTERS.map((label) => (
            <button key={label} type="button" onClick={() => setActiveFilter(label)} aria-pressed={activeFilter === label}>
              <Pill label={label} className={activeFilter === label ? "!bg-blue-600 !text-white" : ""} />
            </button>
          ))}
        </div>

        {loading && <p className="text-xl mt-10 text-center">Loading properties...</p>}
        {error && <p className="text-red-600 mt-10 text-center">{error}</p>}
        {!loading && !error && visible.length === 0 && (
          <p className="text-gray-600 mt-10 text-center">No properties match this filter.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {visible.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </>
  );
}
