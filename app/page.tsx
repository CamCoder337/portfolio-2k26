import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import NavigationDock from "./components/NavigationDock";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <main className="relative bg-white selection:bg-[#dd5608] selection:text-white">
      <SmoothScroll />
      <NavigationDock />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
