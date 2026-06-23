import { useMemo, useState } from 'react';
import SkillCard from './SkillCard';
import AddSkillForm from './AddSkillForm';
import useFetch from '@/hooks/useFetch';
import { useAuth } from '@/context/AuthContext';

type Skill = {
  _id: string;
  title: string;
  desc: string;
  category: string;
};

type SkillsProps = { filter: string; };

export default function Skills({ filter }: SkillsProps) {
  const { user } = useAuth();   // ← Получаем пользователя
  const [refreshKey, setRefreshKey] = useState(0);
  const { data: skills, loading, error } = useFetch<Skill[]>(
    `http://localhost:3001/api/skills?t=${refreshKey}`
  );

  const filtered = useMemo(() => {
    if (!skills) return [];
    if (filter === 'all') return skills;
    return skills.filter(s => s.category === filter);
  }, [skills, filter]);

  const handleSkillAdded = () => setRefreshKey(prev => prev + 1);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/skills/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error('Ошибка удаления');
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id: string, updates: { title: string; desc: string }) => {
    try {
      const res = await fetch(`http://localhost:3001/api/skills/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
        },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Ошибка обновления');
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Загрузка навыков...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      {user ? (
        <AddSkillForm onSkillAdded={handleSkillAdded} />
      ) : (
        <p className="auth-notice">Войдите чтобы добавлять навыки</p>
      )}
      <div className="skills-grid">
        {filtered.map(skill => (
          <SkillCard
            key={skill._id}
            title={skill.title}
            description={skill.desc}
            skillId={skill._id}
            onDelete={handleDelete}
            onEdit={handleEdit}
            canEdit={!!user}              // ← передаём флаг
          />
        ))}
      </div>
    </div>
  );
}