type FilterBarProps = {
  categories: { key: string; label: string }[];
  currentFilter: string;
  onFilterChange: (key: string) => void;
};

export default function FilterBar({ categories, currentFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="filter-buttons">
      {categories.map(cat => (
        <button
          key={cat.key}
          className={`filter-btn ${currentFilter === cat.key ? 'active' : ''}`}
          onClick={() => onFilterChange(cat.key)}
        >
          {cat.label}
        </button>
        ))}
    </div>
  );
}