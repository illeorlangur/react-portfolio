type SkillCardProps = {
  title: string;
  description: string;
  skillId: number;
  onDelete: (id: number) => void;
};

export default function SkillCard({ title, description, skillId, onDelete }: SkillCardProps) {
  return (
    <div className="skill-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button
        className="delete-btn"
        onClick={() => onDelete(skillId)}
      >
        ✕
      </button>
    </div>
  );
}