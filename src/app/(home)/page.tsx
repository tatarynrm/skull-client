import HomeHeroSection from "./sections/HomeHeroSection";
import HomeSloganSection from "./sections/HomeSloganSection";
import HomeBenefitsSection from "./sections/HomeBenefitsSection";
import HomeStatisticSection from "./sections/HomeStatisticSection";
import HomeTarifSection from "./sections/HomeTarifSection";

import TikTokPremiumBanner from "@/components/banners/TikTokPremiumBanner";
import Head from "next/head";

export default function Home() {
  return (
    <div className="homepage pt-2">

      <TikTokPremiumBanner />
      <HomeHeroSection />
      <HomeSloganSection />
      <HomeStatisticSection />
      <HomeBenefitsSection />
      <HomeTarifSection />
    </div>
  );
}
