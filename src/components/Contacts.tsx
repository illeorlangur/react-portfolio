'use client';

import { useState } from 'react';
import Notification from './Notification';

export default function Contacts() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    if (!name.trim() || !email.trim() || !message.trim()) {
      return; // Пока простая — просто не отправляем
    }

    console.log('Форма валидна!', { name, email, message });

    // Показать уведомление
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);

    // Очистить форму
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contacts">
      <h2>Контакты</h2>
      <p>Email: illeOrlangur@gmail.com</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          value={name}              // ← контролируемый инпут
          onChange={(e) => setName(e.target.value)}  // ← обновляет state
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="message">Сообщение:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
        />

        <button type="submit">Отправить</button>
      </form>

      {showNotification && <Notification message="Сообщение отправлено!" />}

    </section>
  );
}