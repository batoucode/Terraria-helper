'use client';
import { ItemCategory } from '@/lib/types';

const categories: ItemCategory[] = ['Armure', 'Arme', 'Outil', 'Station de craft'];

interface CategoryFilterProps {
  active: string | null;
  onSelect: (cat: ItemCategory | null) => void;
}

const categoryColorMap: Record<ItemCategory, string> = {
  Armure: 'bg-blue-600',
  Arme: 'bg-red-600',
  Outil: 'bg-emerald-600',
  'Station de craft': 'bg-violet-600',
};

export default function CategoryFilter({ active, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          active === null
            ? 'bg-blue-600 text-white ring-2 ring-blue-400'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        Tous
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(active === cat ? null : cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            active === cat
              ? `${categoryColorMap[cat]} text-white ring-2 ring-white/30`
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}