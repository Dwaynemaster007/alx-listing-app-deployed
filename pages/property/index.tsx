import { useEffect } from "react";
import { useRouter } from "next/router";

// There is no standalone property index: send visitors to the listings on the home page
export default function PropertyIndex() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return <p className="text-center mt-10">Redirecting to listings...</p>;
}
