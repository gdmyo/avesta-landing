import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Courses from "@/components/Courses";
import Consultations from "@/components/Consultations";
import Certificates from "@/components/Certificates";
import Socials from "@/components/Socials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        <Courses />
        <Consultations />
        <Certificates />
        <Socials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}