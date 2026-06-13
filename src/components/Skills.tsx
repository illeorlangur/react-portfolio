import { useMemo, useState } from 'react';
import SkillCard from './SkillCard';
import AddSkillForm from './AddSkillForm';
import useFetch from '@/hooks/useFetch';

type Skill = {
  id: number;
  title: string;
  desc: string;
  category: string;
};

type SkillsProps = { filter: string; };

export default function Skills({ filter }: SkillsProps) {
  const [refreshKey, setRefreshKey] = useState(0);       // ← Ключ обновления
  const { data: skills, loading, error } = useFetch<Skill[]>(
    `http://localhost:3001/api/skills?t=${refreshKey}`    // ← URL меняется = новый запрос
  );

  const filtered = useMemo(() => {
    if (!skills) return [];
    if (filter === 'all') return skills;
    return skills.filter(s => s.category === filter);
  }, [skills, filter]);

  const handleSkillAdded = () => {
    setRefreshKey(prev => prev + 1);   // ← Меняем ключ → useFetch перезапускается
  };

  if (loading) return <p>Загрузка навыков...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <AddSkillForm onSkillAdded={handleSkillAdded} />
      <div className="skills-grid">
        {filtered.map(skill => (
          <SkillCard key={skill.id} title={skill.title} description={skill.desc} />
        ))}
      </div>
    </div>
  );
}