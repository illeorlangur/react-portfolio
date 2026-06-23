'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import AuthForm from './AuthForm';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);

  return (
    <header>
      <div className="navbar">
        <div className="logo-area">
          <span className="logo">ЯД</span>
          <h1>Дудник Ярослав Вячеславович</h1>
        </div>
        <nav>
          <ul>
            <li><Link href="#about">Обо мне</Link></li>
            <li><Link href="#skills">Навыки</Link></li>
            <li><Link href="#contacts">Контакты</Link></li>
          </ul>
          <div className="auth-info">
            {user ? (
              <>
                <span>{user.email}</span>
                <button className="logout-btn" onClick={logout}>Выйти</button>
              </>
            ) : (
              <button className="login-btn" onClick={() => setShowAuthForm(!showAuthForm)}>
                Войти
              </button>
            )}
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
      {showAuthForm && !user && <AuthForm />}
    </header>
  );
}