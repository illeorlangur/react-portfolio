'use client';

import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <div className="navbar">
        <div className="logo-area">
          <span className="logo">ЯД</span>
          <h1>Дудник Ярослав Вячеславович</h1>
        </div>
        <nav>
          <ul>
            <Link href="/about">Обо мне</Link>
            {/* <li><Link href="#about">Обо мне</Link></li> */}
            <li><Link href="#skills">Навыки</Link></li>
            <li><Link href="#contacts">Контакты</Link></li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
}