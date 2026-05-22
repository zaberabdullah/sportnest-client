import ClientFacilities from "@/components/ClientFacilities";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";

async function getFacilities() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/facility`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.facilities || [];
  } catch (error) {
    console.error("Server fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const allFacilities = await getFacilities();

  return (
    <div className="w-full bg-[#121212] antialiased text-white min-h-screen">
      <HeroSection />
      <ClientFacilities initialFacilities={allFacilities} />
      <HowItWorks />
      <WhyChooseUs />
    </div>
  );
}