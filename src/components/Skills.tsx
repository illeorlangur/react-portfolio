import { useMemo, useState } from 'react';
import SkillCard from './SkillCard';
import AddSkillForm from './AddSkillForm';
import useFetch from '@/hooks/useFetch';

type Skill = {
  _id: string;
  title: string;
  desc: string;
  category: string;
};

type SkillsProps = { filter: string; };

export default function Skills({ filter }: SkillsProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const { data: skills, loading, error } = useFetch<Skill[]>(
    `http://localhost:3001/api/skills?t=${refreshKey}`
  );

  const filtered = useMemo(() => {
    if (!skills) return [];
    if (filter === 'all') return skills;
    return skills.filter(s => s.category === filter);
  }, [skills, filter]);

  const handleSkillAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/skills/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Ошибка удаления');
      setRefreshKey(prev => prev + 1);   // Обновить список
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Загрузка навыков...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <AddSkillForm onSkillAdded={handleSkillAdded} />
      <div className="skills-grid">
        {filtered.map(skill => (
          <SkillCard
            key={skill._id}
            title={skill.title}
            description={skill.desc}
            skillId={skill._id}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}