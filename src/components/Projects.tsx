'use client';

import useFetch from '@/hooks/useFetch';

type Repo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
};

export default function Projects() {
  const { data: repos, loading, error } = useFetch<Repo[]>(
    'https://api.github.com/users/illeorlangur/repos?sort=updated'
  );

  if (loading) return <section id="projects"><h2>Проекты</h2><p>Загрузка...</p></section>;
  if (error) return <section id="projects"><h2>Проекты</h2><p>Ошибка: {error}</p></section>;
  if (!repos) return null;

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