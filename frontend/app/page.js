import HeroSection from "./_components/HomePageComponents/Hero";
import CategorySection from "./_components/HomePageComponents/CategorySection";

import ClientLogo from "./_components/HomePageComponents/ClientLogo";

import FAQ from "./_components/HomePageComponents/FAQ";
import Testimonial from "./_components/HomePageComponents/Testimonial";
import CategoryTabs from "./_components/HomePageComponents/CategoryTabs";
import CoursesGrid from "./_components/HomePageComponents/CoursesGrid";
import Navbar from "./_components/HomePageComponents/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection />
    <CategoryTabs />
 <CoursesGrid />
      <ClientLogo />      
       <Testimonial />
<FAQ />
    </div>
  );
}
