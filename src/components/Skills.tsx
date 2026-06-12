import { useMemo } from 'react';
import SkillCard from './SkillCard';
import useFetch from '@/hooks/useFetch';

type Skill = {
  id: number;
  title: string;
  desc: string;
  category: string;
};

type SkillsProps = { filter: string; };

export default function Skills({ filter }: SkillsProps) {
  const { data: skills, loading, error } = useFetch<Skill[]>('http://localhost:3001/api/skills');

  const filtered = useMemo(() => {
    if (!skills) return [];
    if (filter === 'all') return skills;
    return skills.filter(s => s.category === filter);
  }, [skills, filter]);

  if (loading) return <p>Загрузка навыков...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="skills-grid">
      {filtered.map(skill => (
        <SkillCard key={skill.id} title={skill.title} description={skill.desc} />
      ))}
    </div>
  );
}