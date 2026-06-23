'use client';

import { useState, useCallback } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Skills from '@/components/Skills';
import FilterBar from '@/components/FilterBar';
import Projects from '@/components/Projects';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';
import BodyThemeSync from '@/context/BodyThemeSync';
import { AuthProvider } from '@/context/AuthContext';

const categories = [
  { key: 'all', label: 'Все' },
  { key: 'languages', label: 'Языки' },
  { key: 'frameworks', label: 'Фреймворки' },
  { key: 'tools', label: 'Инструменты' },
];

export default function Home() {
  const [filter, setFilter] = useState('all');

  const handleFilter = useCallback((key: string) => {
    setFilter(key);
    console.log('Фильтр изменён:', key);
  }, []);

  return (
    <AuthProvider>
    <ThemeProvider>
      <BodyThemeSync />
      <Navbar />
      <main className="container">
        <About />
        <section id="skills-section">
          <FilterBar
            categories={categories}
            currentFilter={filter}
            onFilterChange={handleFilter}
          />
          <Skills filter={filter} />
        </section>
        <Projects />
        <Contacts />
      </main>
      <Footer />
    </ThemeProvider>
    </AuthProvider>
  );
}