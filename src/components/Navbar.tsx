'use client';

import { useTheme } from '@/context/ThemeContext';

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
            <li><a href="#about">Обо мне</a></li>
            <li><a href="#skills">Навыки</a></li>
            <li><a href="#contacts">Контакты</a></li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
}