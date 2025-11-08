// _app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/components/auth/AuthContext";
type SearchData = {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
};

export default function App({ Component, pageProps }: AppProps) {
  const handleSearch = (data: SearchData) => {
    console.log("Search triggered from _app:", data);
    // I can add logic here, like redirecting to a search page
    // or fetching results.
  };
  return (
    <AuthProvider>
       <Layout onSearch={handleSearch}>
      <Component {...pageProps} />
    </Layout> 
    </AuthProvider>
    
  );
}
