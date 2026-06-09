'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Skills, { categories } from '@/components/Skills';
import FilterBar from '@/components/FilterBar';
import Projects from '@/components/Projects';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';

export default function Home() {
  const [filter, setFilter] = useState('all');

  return (
    <>
      <Navbar />
      <main className="container">
        <About />
        <section id="skills-section">
          <Skills filter={filter} />
          <FilterBar
            categories={categories}
            currentFilter={filter}
            onFilterChange={setFilter}
          />
        </section>
        <Projects />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}