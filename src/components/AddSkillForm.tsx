'use client';

import { useState } from 'react';

type AddSkillFormProps = {
  onSkillAdded: () => void;   // Колбэк: сообщить родителю обновить данные
};

export default function AddSkillForm({ onSkillAdded }: AddSkillFormProps) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('languages');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !desc.trim()) {
      setMessage('Заполните все поля');
      return;
    }

    setSending(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:3001/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, desc, category }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Ошибка сервера');
      }

      // Очистить форму
      setTitle('');
      setDesc('');
      setCategory('languages');
      setMessage('Навык добавлен! ✅');

      // Сказать родителю обновить список
      onSkillAdded();
    } catch (err: any) {
      setMessage(err.message || 'Ошибка при отправке');
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="add-skill-form" onSubmit={handleSubmit}>
      <h3>Добавить навык</h3>

      <label htmlFor="skill-title">Название:</label>
      <input
        id="skill-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Например: Figma"
        required
      />

      <label htmlFor="skill-desc">Описание:</label>
      <input
        id="skill-desc"
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Например: UI/UX Design"
        required
      />

      <label htmlFor="skill-category">Категория:</label>
      <select
        id="skill-category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="languages">Языки</option>
        <option value="frameworks">Фреймворки</option>
        <option value="tools">Инструменты</option>
      </select>

      <button type="submit" disabled={sending}>
        {sending ? 'Отправка...' : 'Добавить'}
      </button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}