'use client';
import { useState, useMemo } from 'react';
import { itemsData } from '@/lib/data';
import { ItemCategory } from '@/lib/types';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import TierFilter from '@/components/TierFilter';
import ItemCard from '@/components/ItemCard';
import ItemDetailModal from '@/components/ItemDetailModal';
import Link from 'next/link';

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ItemCategory | null>(null);
  const [activeTier, setActiveTier] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const TIER_TO_GROUP: Record<string, string> = {
    'Début': 'Débutant', 'Bois': 'Débutant', 'Cactus': 'Débutant', 'Minage': 'Débutant', 'Achat': 'Débutant',
    'Cuivre': 'Métaux de base', 'Étain': 'Métaux de base', 'Fer': 'Métaux de base', 'Plomb': 'Métaux de base',
    'Argent': 'Métaux de base', 'Tungstène': 'Métaux de base', 'Or': 'Métaux de base', 'Platine': 'Métaux de base',
    'Corruption': 'Pré-Hardmode', 'Crimson': 'Pré-Hardmode', 'Météore': 'Pré-Hardmode',
    'Jungle': 'Pré-Hardmode', 'Donjon': 'Pré-Hardmode', 'Enfer': 'Pré-Hardmode', 'Spécial': 'Pré-Hardmode',
    'Avancé': 'Pré-Hardmode', 'Désert': 'Pré-Hardmode', 'Ombre': 'Pré-Hardmode',
    'Hardmode': 'Hardmode',
    'Fin': 'Fin de jeu',
    'Butin': 'Butin',
  };

  const filteredItems = useMemo(() => {
    return itemsData.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory ? item.category === activeCategory : true;
      const matchTier = activeTier ? TIER_TO_GROUP[item.tier || ''] === activeTier : true;
      return matchSearch && matchCategory && matchTier;
    });
  }, [search, activeCategory, activeTier]);

  const selectedItem = selectedItemId
    ? itemsData.find((i) => i.id === selectedItemId)
    : null;

  return (
    <main className="min-h-screen pb-16">
      {/* Sticky parchment header */}
      <div className="sticky top-0 z-20 border-b-2 border-brown-lt shadow-craft" style={{ background: '#E8D8B4' }}>
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-patrick text-[11px] text-brown-lt uppercase tracking-widest">guide de craft</p>
              <h1 className="font-kalam font-bold text-2xl text-brown-dk leading-tight">⚒ Terraria Craft</h1>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="font-patrick text-[11px] px-2.5 py-1 rounded-craft-pill border"
                style={{ background: 'rgba(45,90,61,0.12)', borderColor: '#2D5A3D', color: '#2D5A3D' }}
              >
                {itemsData.length} objets
              </span>
              <Link
                href="/comparateur"
                className="font-caveat text-sm px-3 py-1.5 rounded-craft-sm border-2 border-craft-red text-craft-red hover:bg-craft-red hover:text-paper transition"
                style={{ background: 'rgba(139,58,58,0.07)' }}
              >
                ⚔ Comparer
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        <SearchBar onSearch={setSearch} />
        <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
        <TierFilter activeTier={activeTier} onSelect={setActiveTier} />

        <div className="mt-3 mb-2 flex items-center gap-2 text-xs font-caveat text-brown-md">
          <span>
            <strong className="font-kalam text-green-dk">{filteredItems.length}</strong>
            {' '}objet{filteredItems.length > 1 ? 's' : ''} trouvé{filteredItems.length > 1 ? 's' : ''}
          </span>
          {(activeCategory || activeTier) && (
            <button
              onClick={() => { setActiveCategory(null); setActiveTier(null); }}
              className="px-2.5 py-0.5 rounded-craft-pill border border-brown-lt text-brown-md hover:bg-parchment transition font-caveat"
            >
              ✕ Réinitialiser
            </button>
          )}
        </div>

        <div className="mt-2 space-y-3">
          {filteredItems.length === 0 ? (
            <p className="text-center font-caveat text-brown-lt py-10">
              Aucun objet trouvé.
            </p>
          ) : (
            filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItemId(item.id)}
              />
            ))
          )}
        </div>
      </div>

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItemId(null)}
        />
      )}
    </main>
  );
}
