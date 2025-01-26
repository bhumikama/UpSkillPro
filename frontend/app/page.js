import HeroSection from "./_components/HomePageComponents/Hero";
import CategorySection from "./_components/HomePageComponents/CategorySection";
import TabSelector from "./_components/HomePageComponents/TabSelector";
import ClientLogo from "./_components/HomePageComponents/ClientLogo";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <TabSelector />
      <ClientLogo />
    </div>
  );
}
