
type SkillCardProps = {
  title: string;
  description: string;
};

export default function SkillCard({ title, description }: SkillCardProps) {
  return (
    <div className="skill-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}