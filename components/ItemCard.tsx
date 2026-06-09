'use client';
import Image from 'next/image';
import { CraftingItem } from '@/lib/types';
import { useFavorites } from '@/contexts/FavoritesContext';

interface ItemCardProps {
  item: CraftingItem;
  onClick: () => void;
}

const categoryBorderColor: Record<string, string> = {
  Armure: 'border-blue-500',
  Arme: 'border-red-500',
  Outil: 'border-emerald-500',
  'Station de craft': 'border-violet-500',
};

export default function ItemCard({ item, onClick }: ItemCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(item.id);

  return (
    <div
      onClick={onClick}
      className={`bg-gray-800 rounded-xl p-3 border-l-8 ${categoryBorderColor[item.category] || 'border-gray-500'} shadow-md hover:bg-gray-750 transition cursor-pointer`}
      style={{ '--hover-bg': '#1e293b' } as React.CSSProperties}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 flex-shrink-0 bg-gray-700 rounded-lg overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-contain p-1"
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/fallback.png';
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white truncate">{item.name}</h3>
          <p className="text-xs text-gray-400">{item.category}</p>
          {item.tier && (
            <span className="text-xs bg-gray-700 px-2 py-0.5 rounded mt-1 inline-block text-gray-300">
              📈 {item.tier}
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          className="text-2xl hover:scale-110 transition shrink-0"
          title={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          {liked ? '⭐' : '☆'}
        </button>
      </div>
    </div>
  );
}