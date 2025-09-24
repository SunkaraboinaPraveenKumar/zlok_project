import { Footer } from "@/components/layouts/footer";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Pricing />
      <Footer />
    </main>
  );
}