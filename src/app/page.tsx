import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container">
        <About />
        <Skills />
        <Projects />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}