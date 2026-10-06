import Closing from "@/components/Closing";
import Cost from "@/components/Cost";
import Faq from "@/components/Faq";
import Handles from "@/components/Handles";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Who from "@/components/Who";

export default function Home() {
  return (
    <main id="top" className="relative">
      <Header />
      <Hero />
      <Cost />
      <HowItWorks />
      <Who />
      <Handles />
      <Pricing />
      <Faq />
      <Closing />
    </main>
  );
}
