import Head from "next/head";
import PropertyDetail from "@/components/property/PropertyDetail";

// PropertyDetail reads the id from the URL and fetches /api/properties/[id] itself
export default function PropertyDetailPage() {
  return (
    <>
      <Head>
        <title>Property details | ALX Listings</title>
      </Head>
      <PropertyDetail />
    </>
  );
}
