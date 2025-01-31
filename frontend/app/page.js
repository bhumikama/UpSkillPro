import InvestSection from "@/components/InvestSection";
import HeroSection from "./_components/HomePageComponents/Hero";
import ClientLogo from "./_components/HomePageComponents/ClientLogo";
import InstructorSection from "./_components/HomePageComponents/InstructorSection";
import FAQ from "./_components/HomePageComponents/FAQ";
import Testimonial from "./_components/HomePageComponents/Testimonial";
import CategoryTabs from "./_components/HomePageComponents/CategoryTabs";
import CoursesGrid from "./_components/HomePageComponents/CoursesGrid";
import Tabselector from "./_components/HomePageComponents/Tabselector";
import Navbar from "./_components/HomePageComponents/Navbar";
import HomePageNavbar from "./_components/HomePageComponents/HomePageNavbar";

export default function Home() {
  return (
    <div>
      <HomePageNavbar />
      <HeroSection />
      <CategoryTabs />
      <CoursesGrid />
      <InstructorSection />
      <InvestSection />
      <Tabselector />
      <ClientLogo />
      <Testimonial />
      <FAQ />
    </div>
  );
}
