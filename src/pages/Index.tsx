import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
// import ScheduleCommission from "@/components/ScheduleCommission";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
        {/* <ScheduleCommission /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
