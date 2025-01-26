import InvestSection from "@/components/InvestSection";
import HeroSection from "./_components/HomePageComponents/Hero";
import InstructorSection from "./_components/HomePageComponents/InstructorSection";
import FAQ from "./_components/HomePageComponents/FAQ";
import Testimonial from "./_components/HomePageComponents/Testimonial";
import CategoryTabs from "./_components/HomePageComponents/CategoryTabs";
import CoursesGrid from "./_components/HomePageComponents/CoursesGrid";



export default function Home() {
  return (
    <div>
       <HeroSection />
        <CategoryTabs />
         <CategoryTabs />
     <CoursesGrid />
     <InstructorSection />
      <InvestSection />     
     <Testimonial />
 <FAQ />
    </div>
  );
}
