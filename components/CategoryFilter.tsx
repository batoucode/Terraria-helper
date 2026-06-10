'use client';
import { ItemCategory } from '@/lib/types';

const categories: ItemCategory[] = ['Armure', 'Arme', 'Outil', 'Station de craft', 'Ressource', 'Accessoire', 'Potion', 'Munition'];

interface CategoryFilterProps {
  active: string | null;
  onSelect: (cat: ItemCategory | null) => void;
}

const categoryDot: Record<ItemCategory, string> = {
  Armure: '#3b82f6',
  Arme: '#ef4444',
  Outil: '#10b981',
  'Station de craft': '#8b5cf6',
  Ressource: '#d97706',
  Accessoire: '#ec4899',
  Potion: '#06b6d4',
  Munition: '#f97316',
};

export default function CategoryFilter({ active, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 my-4 overflow-x-auto scrollbar-none pb-1">
      <button
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 px-4 py-1.5 rounded-craft-sm text-sm font-caveat font-semibold border-2 transition ${
          active === null
            ? 'bg-green-dk text-paper border-green-dk shadow-craft'
            : 'bg-paper text-brown-md border-brown-lt hover:border-brown-md'
        }`}
      >
        Tous
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(active === cat ? null : cat)}
          className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-craft-sm text-sm font-caveat font-semibold border-2 transition ${
            active === cat
              ? 'bg-green-dk text-paper border-green-dk shadow-craft'
              : 'bg-paper text-brown-md border-brown-lt hover:border-brown-md'
          }`}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: categoryDot[cat] }}
          />
          {cat}
        </button>
      ))}
    </div>
  );
}
