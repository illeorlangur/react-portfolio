'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AuthForm() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);   // true = вход, false = регистрация
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h3>{isLogin ? 'Вход' : 'Регистрация'}</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="auth-email">Email:</label>
        <input
          id="auth-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="auth-password">Пароль:</label>
        <input
          id="auth-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <button type="submit" disabled={loading}>
          {loading ? '...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
        </button>
      </form>

      {error && <p className="auth-error">{error}</p>}

      <button
        className="auth-toggle"
        onClick={() => {
          setIsLogin(!isLogin);
          setError('');
        }}
      >
        {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
      </button>
    </div>
  );
}