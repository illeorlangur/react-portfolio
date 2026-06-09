'use client';

import { useState, useEffect } from 'react';

type Repo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  };

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const controller = new AbortController();

  fetch('https://api.github.com/users/illeorlangur/repos?sort=updated', {
    signal: controller.signal
  })
    .then(res => {
      if (res.status === 403) throw new Error('Лимит запросов GitHub. Подожди минуту.');
      if (!res.ok) throw new Error('Не удалось загрузить проекты');
      return res.json();
    })
    .then(data => {
      setRepos(data);
      setLoading(false);
    })
    .catch(err => {
      if (err.name === 'AbortError') return;
      setError(err.message);
      setLoading(false);
    });

    return () => controller.abort();
    }, []);

  if (loading) return <section id="projects"><h2>Проекты</h2><p>Загрузка...</p></section>;
  if (error) return <section id="projects"><h2>Проекты</h2><p>Ошибка: {error}</p></section>;

  return (
    <section id="projects">
      <h2>Проекты</h2>
      <div className="projects-grid">
        {repos.map(repo => (
          <div key={repo.id} className="project-card">
            <h3>{repo.name}</h3>
            <p>{repo.description || 'Описание отсутствует'}</p>
            <div className="project-meta">
              {repo.language && <span className="project-lang">{repo.language}</span>}
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                Открыть на GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}