import HeroSection from "./_components/HomePageComponents/Hero";
import CategorySection from "./_components/HomePageComponents/CategorySection";
import CoursesGrid from "./components/HomePageComponents/CoursesGrid";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <CoursesGrid />
    </div>
  );
}
