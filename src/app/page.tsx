'use client';

import { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Skills from '@/components/Skills';
import FilterBar from '@/components/FilterBar';
import Projects from '@/components/Projects';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';

const categories = [
  { key: 'all', label: 'Все' },
  { key: 'languages', label: 'Языки' },
  { key: 'frameworks', label: 'Фреймворки' },
  { key: 'tools', label: 'Инструменты' },
];

export default function Home() {
  const [filter, setFilter] = useState('all');

  return (
    <ThemeProvider>
      <Navbar />
      <main className="container">
        <About />
        <section id="skills-section">
          <FilterBar
            categories={categories}
            currentFilter={filter}
            onFilterChange={setFilter}
          />
          <Skills filter={filter} />
        </section>
        <Projects />
        <Contacts />
      </main>
      <Footer />
    </ThemeProvider>
  );
}