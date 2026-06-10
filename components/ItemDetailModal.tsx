'use client';
import Image from 'next/image';
import { CraftingItem } from '@/lib/types';
import { useFavorites } from '@/contexts/FavoritesContext';

interface ItemDetailModalProps {
  item: CraftingItem;
  onClose: () => void;
}

const categoryBadge: Record<string, { bg: string; color: string; border: string }> = {
  Armure:            { bg: 'rgba(59,130,246,0.12)', color: '#1d4ed8', border: '#3b82f6' },
  Arme:              { bg: 'rgba(239,68,68,0.12)',  color: '#b91c1c', border: '#ef4444' },
  Outil:             { bg: 'rgba(16,185,129,0.12)', color: '#065f46', border: '#10b981' },
  'Station de craft':{ bg: 'rgba(139,92,246,0.12)', color: '#5b21b6', border: '#8b5cf6' },
  Ressource:         { bg: 'rgba(217,119,6,0.12)',  color: '#92400e', border: '#d97706' },
  Accessoire:        { bg: 'rgba(236,72,153,0.12)', color: '#9d174d', border: '#ec4899' },
  Potion:            { bg: 'rgba(6,182,212,0.12)',  color: '#155e75', border: '#06b6d4' },
  Munition:          { bg: 'rgba(249,115,22,0.12)', color: '#9a3412', border: '#f97316' },
};

export default function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(item.id);
  const badge = categoryBadge[item.category];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      style={{ background: 'rgba(61,43,31,0.65)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-paper rounded-craft-modal max-w-md w-full max-h-[90vh] overflow-y-auto animate-slideUp border-2 border-brown-dk shadow-craft-dark"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Binding line */}
        <div
          className="absolute top-0 bottom-0 w-[3px] rounded-full"
          style={{ left: '48px', background: 'rgba(139,58,58,0.25)' }}
        />

        <div className="relative p-5 pl-16">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-brown-lt hover:text-brown-dk text-2xl transition font-kalam leading-none"
          >
            ✕
          </button>

          {/* Header */}
          <div className="flex flex-col items-center gap-3 mb-5">
            <div className="relative w-[70px] h-[70px] bg-cream border-2 border-brown-lt rounded-craft overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-contain p-1.5"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/fallback.png';
                }}
              />
            </div>
            <h2 className="text-2xl font-kalam font-bold text-center text-craft-ink">{item.name}</h2>
            <div className="flex gap-2 flex-wrap justify-center">
              {badge && (
                <span
                  className="text-xs px-3 py-1 rounded-craft-pill border font-patrick"
                  style={{ background: badge.bg, color: badge.color, borderColor: badge.border }}
                >
                  {item.category}
                </span>
              )}
              {item.tier && (
                <span className="text-xs px-3 py-1 rounded-craft-pill border border-dashed border-brown-lt font-patrick text-brown-md">
                  {item.tier}
                </span>
              )}
            </div>
            <button
              onClick={() => toggleFavorite(item.id)}
              className="px-4 py-1.5 rounded-craft-pill border-2 font-caveat text-sm transition"
              style={
                liked
                  ? { background: 'rgba(217,119,6,0.15)', color: '#92400e', borderColor: '#d97706' }
                  : { background: 'transparent', color: '#7B4F2E', borderColor: '#C4956A' }
              }
            >
              {liked ? '★ Favori' : '☆ Ajouter aux favoris'}
            </button>
          </div>

          {/* Dashed divider */}
          <div className="border-t-2 border-dashed border-brown-lt mb-4" />

          <div className="space-y-4">
            {/* Stats */}
            {item.stats && (
              <div>
                <h3 className="font-kalam font-bold text-lg text-brown-dk mb-2">📊 Statistiques</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {item.stats.damage != null && (
                    <div className="flex items-center gap-1.5 bg-cream border border-brown-lt rounded-craft-sm px-3 py-2">
                      <span>💥</span>
                      <span className="font-caveat text-craft-ink">Dégâts : <strong className="font-kalam">{item.stats.damage}</strong></span>
                    </div>
                  )}
                  {item.stats.defense != null && (
                    <div className="flex items-center gap-1.5 bg-cream border border-brown-lt rounded-craft-sm px-3 py-2">
                      <span>🛡️</span>
                      <span className="font-caveat text-craft-ink">Défense : <strong className="font-kalam">{item.stats.defense}</strong></span>
                    </div>
                  )}
                  {item.stats.pickaxePower != null && (
                    <div className="flex items-center gap-1.5 bg-cream border border-brown-lt rounded-craft-sm px-3 py-2">
                      <span>⛏️</span>
                      <span className="font-caveat text-craft-ink">Pioche : <strong className="font-kalam">{item.stats.pickaxePower}</strong></span>
                    </div>
                  )}
                  {item.stats.speed != null && (
                    <div className="flex items-center gap-1.5 bg-cream border border-brown-lt rounded-craft-sm px-3 py-2">
                      <span>⚡</span>
                      <span className="font-caveat text-craft-ink">
                        Vitesse : <strong className="font-kalam">{item.stats.speed}</strong>
                        <span className="text-[10px] ml-1 text-brown-lt">
                          ({item.stats.speed <= 8 ? 'Très rapide' :
                            item.stats.speed <= 15 ? 'Rapide' :
                            item.stats.speed <= 22 ? 'Moyenne' :
                            item.stats.speed <= 28 ? 'Lente' : 'Très lente'})
                        </span>
                      </span>
                    </div>
                  )}
                  {item.stats.damage != null && item.stats.speed != null && (
                    <div className="flex items-center gap-1.5 bg-cream border border-brown-lt rounded-craft-sm px-3 py-2">
                      <span>📈</span>
                      <span className="font-caveat text-craft-ink">DPS : <strong className="font-kalam">{Math.round(item.stats.damage * 60 / item.stats.speed)}</strong></span>
                    </div>
                  )}
                  {item.stats.tooltip && (
                    <div className="col-span-2 font-caveat text-brown-md italic mt-1 pt-2 border-t border-dashed border-brown-lt">
                      &ldquo;{item.stats.tooltip}&rdquo;
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dashed divider */}
            {item.stats && item.ingredients && item.ingredients.length > 0 && (
              <div className="border-t-2 border-dashed border-brown-lt" />
            )}

            {/* Ingredients */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div>
                <h3 className="font-kalam font-bold text-lg text-brown-dk mb-2">🔨 Ingrédients</h3>
                <ul className="space-y-1">
                  {item.ingredients.map((ing, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center py-1.5 border-b border-dashed border-brown-lt last:border-b-0"
                    >
                      <span className="font-caveat text-craft-ink">{ing.name}</span>
                      <span
                        className="font-patrick text-[12px] px-2.5 py-0.5 rounded-full text-paper"
                        style={{ background: '#4A7A50' }}
                      >
                        ×{ing.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
                {item.craftedAt && (
                  <div
                    className="mt-3 px-3 py-2 rounded-craft-sm border font-caveat text-sm"
                    style={{ background: 'rgba(45,90,61,0.08)', borderColor: '#4A7A50', color: '#2D5A3D' }}
                  >
                    🏭 Fabriqué à : <strong className="font-kalam">{item.craftedAt}</strong>
                  </div>
                )}
              </div>
            )}

            {/* Tier */}
            {item.tier && (
              <div className="text-center text-sm border-2 border-dashed border-brown-lt rounded-craft-pill py-2 font-caveat text-brown-md">
                📈 Palier : <strong className="font-kalam">{item.tier}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
