import SkillCard from './SkillCard';

type SkillsProps = {
  filter: string;
};

const skillsData = [
  { id: 1, title: 'Программирование', desc: 'Python, JavaScript, Java', category: 'languages' },
  { id: 2, title: 'Веб-разработка', desc: 'React, Django', category: 'frameworks' },
  { id: 3, title: 'Системное администрирование', desc: 'Linux, Docker', category: 'tools' },
  { id: 4, title: 'Базы данных', desc: 'MySQL, MongoDB', category: 'tools' },
  { id: 5, title: 'Контроль версий', desc: 'Git', category: 'tools' },
  { id: 6, title: 'API', desc: 'REST, GraphQL', category: 'frameworks' },
];

const categories = [
  { key: 'all', label: 'Все' },
  { key: 'languages', label: 'Языки' },
  { key: 'frameworks', label: 'Фреймворки' },
  { key: 'tools', label: 'Инструменты' },
];

export { categories };

export default function Skills({ filter }: SkillsProps) {
  const filteredSkills = filter === 'all'
    ? skillsData
    : skillsData.filter(skill => skill.category === filter);

  return (
    <section id="skills">
      <h2>Навыки</h2>
      <div className="skills-grid">
        {filteredSkills.map(skill => (
          <SkillCard
            key={skill.id}
            title={skill.title}
            description={skill.desc}
          />
        ))}
      </div>
    </section>
  );
}