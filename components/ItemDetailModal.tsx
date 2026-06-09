'use client';
import Image from 'next/image';
import { CraftingItem } from '@/lib/types';
import { useFavorites } from '@/contexts/FavoritesContext';

interface ItemDetailModalProps {
  item: CraftingItem;
  onClose: () => void;
}

export default function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(item.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-5">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl transition"
          >
            ✕
          </button>

          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="relative w-24 h-24 bg-gray-700 rounded-xl overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-contain p-2"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/fallback.png';
                }}
              />
            </div>
            <h2 className="text-2xl font-bold text-center">{item.name}</h2>
            <span className="text-sm px-3 py-1 bg-gray-700 rounded-full text-gray-300">
              {item.category}
            </span>
            <button
              onClick={() => toggleFavorite(item.id)}
              className={`text-lg px-4 py-1.5 rounded-full transition ${
                liked
                  ? 'bg-yellow-600/30 text-yellow-400 border border-yellow-600'
                  : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              {liked ? '⭐ Favori' : '☆ Ajouter aux favoris'}
            </button>
          </div>

          <div className="space-y-4">
            {item.stats && (
              <div className="bg-gray-700/50 p-3 rounded-xl">
                <h3 className="font-semibold text-lg mb-2">📊 Statistiques</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {item.stats.damage != null && (
                    <div className="flex items-center gap-1">
                      <span>💥</span>
                      <span>Dégâts : <strong>{item.stats.damage}</strong></span>
                    </div>
                  )}
                  {item.stats.defense != null && (
                    <div className="flex items-center gap-1">
                      <span>🛡️</span>
                      <span>Défense : <strong>{item.stats.defense}</strong></span>
                    </div>
                  )}
                  {item.stats.pickaxePower != null && (
                    <div className="flex items-center gap-1">
                      <span>⛏️</span>
                      <span>Puissance pioche : <strong>{item.stats.pickaxePower}</strong></span>
                    </div>
                  )}
                  {item.stats.speed != null && (
                    <div className="flex items-center gap-1">
                      <span>⚡</span>
                      <span>Vitesse : <strong>{item.stats.speed}</strong>
                        <span className="text-xs ml-1 text-gray-400">
                          ({item.stats.speed <= 8 ? 'Très rapide' :
                            item.stats.speed <= 15 ? 'Rapide' :
                            item.stats.speed <= 22 ? 'Moyenne' :
                            item.stats.speed <= 28 ? 'Lente' : 'Très lente'})
                        </span>
                      </span>
                    </div>
                  )}
                  {item.stats.damage != null && item.stats.speed != null && (
                    <div className="flex items-center gap-1">
                      <span>📈</span>
                      <span>DPS : <strong>{Math.round(item.stats.damage * 60 / item.stats.speed)}</strong></span>
                    </div>
                  )}
                  {item.stats.tooltip && (
                    <div className="col-span-2 text-gray-300 italic mt-1 pt-2 border-t border-gray-600">
                      &ldquo;{item.stats.tooltip}&rdquo;
                    </div>
                  )}
                </div>
              </div>
            )}

            {item.ingredients && item.ingredients.length > 0 && (
              <div className="bg-gray-700/50 p-3 rounded-xl">
                <h3 className="font-semibold text-lg mb-2">🔨 Ingrédients</h3>
                <ul className="space-y-1">
                  {item.ingredients.map((ing, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center border-b border-gray-600 py-1.5"
                    >
                      <span>{ing.name}</span>
                      <span className="font-mono bg-gray-900 px-2 py-0.5 rounded text-sm">
                        x{ing.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
                {item.craftedAt && (
                  <p className="text-sm mt-3 text-gray-300 flex items-center gap-1">
                    <span>🏭</span>
                    <span>Fabriqué à : <strong>{item.craftedAt}</strong></span>
                  </p>
                )}
              </div>
            )}

            {item.tier && (
              <div className="text-center text-sm bg-gray-700/50 py-2 rounded-full border border-gray-600">
                📈 Palier : <strong>{item.tier}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}