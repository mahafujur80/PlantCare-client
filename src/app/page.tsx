import Hero from "@/Components/Home/Hero";
import Features from "@/Components/Home/Features";
import Categories from "@/Components/Home/Categories";
import Trending from "@/Components/Home/Trending";
import Statistics from "@/Components/Home/Statistics";
import Testimonials from "@/Components/Home/Testimonials";
import FaqNewsletter from "@/Components/Home/FaqNewsletter";
import SeasonalTips from "@/Components/Home/SeasonalTips";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION 1: Hero Showcase Section */}
      <Hero />

      {/* SECTION 2: Key Diagnostic & Tech Features */}
      <Features />

      {/* SECTION 3: Habitats & Category Links */}
      <Categories />

      {/* SECTION 4: Reusable Card Grid of Trending Plants */}
      <Trending />

      {/* SECTION 5: SVG Metric Chart & Community Numbers */}
      <Statistics />
    
      {/* SECTION 6: User Reviews & Testimonials Grid */}
      <Testimonials />

     {/* seasonal tips section */}
     <SeasonalTips/>

      {/* SECTION 7: FAQ Accordion & Premium Newsletter */}
      <FaqNewsletter />
    </div>
  );
}
