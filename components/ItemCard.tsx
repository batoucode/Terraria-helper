'use client';
import Image from 'next/image';
import { CraftingItem } from '@/lib/types';
import { useFavorites } from '@/contexts/FavoritesContext';
import { getTierStyle } from '@/components/TierFilter';

interface ItemCardProps {
  item: CraftingItem;
  onClick: () => void;
}

const tagStyle: Record<string, { bg: string; color: string; border: string }> = {
  Armure:            { bg: 'rgba(59,130,246,0.12)', color: '#1d4ed8', border: '#3b82f6' },
  Arme:              { bg: 'rgba(239,68,68,0.12)',  color: '#b91c1c', border: '#ef4444' },
  Outil:             { bg: 'rgba(16,185,129,0.12)', color: '#065f46', border: '#10b981' },
  'Station de craft':{ bg: 'rgba(139,92,246,0.12)', color: '#5b21b6', border: '#8b5cf6' },
  Ressource:         { bg: 'rgba(217,119,6,0.12)',  color: '#92400e', border: '#d97706' },
  Accessoire:        { bg: 'rgba(236,72,153,0.12)', color: '#9d174d', border: '#ec4899' },
  Potion:            { bg: 'rgba(6,182,212,0.12)',  color: '#155e75', border: '#06b6d4' },
  Munition:          { bg: 'rgba(249,115,22,0.12)', color: '#9a3412', border: '#f97316' },
};

const accentColor: Record<string, string> = {
  Armure:            '#3b82f6',
  Arme:              '#ef4444',
  Outil:             '#10b981',
  'Station de craft':'#8b5cf6',
  Ressource:         '#d97706',
  Accessoire:        '#ec4899',
  Potion:            '#06b6d4',
  Munition:          '#f97316',
};

export default function ItemCard({ item, onClick }: ItemCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(item.id);
  const ts = tagStyle[item.category];
  const tierStyle = item.tier ? getTierStyle(item.tier) : null;

  return (
    <div
      onClick={onClick}
      className="relative bg-paper border-2 border-brown-lt rounded-craft shadow-craft hover:shadow-craft-dark transition cursor-pointer overflow-hidden"
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-full"
        style={{ backgroundColor: accentColor[item.category] || '#C4956A' }}
      />

      <div className="flex items-center gap-3 px-4 py-3 pl-5">
        {/* Image */}
        <div className="relative w-[58px] h-[58px] flex-shrink-0 bg-cream border border-brown-lt rounded-craft overflow-hidden">
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

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-kalam font-bold text-[17px] text-craft-ink truncate">{item.name}</h3>
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            {ts && (
              <span
                className="text-[11px] px-2 py-0.5 rounded-craft-pill border font-patrick"
                style={{ background: ts.bg, color: ts.color, borderColor: ts.border }}
              >
                {item.category}
              </span>
            )}
            {item.tier && (
              <span
                className="text-[11px] px-2 py-0.5 rounded-craft-pill border border-dashed border-brown-lt font-patrick text-brown-md"
              >
                {item.tier}
              </span>
            )}
          </div>
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          className="text-xl hover:scale-110 transition shrink-0"
          title={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          style={{ color: liked ? '#d97706' : '#C4956A' }}
        >
          {liked ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
}
