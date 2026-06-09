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

  // Tier group mapping (same as TierFilter)
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
    <main className="min-h-screen bg-gray-900 pb-16">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
          ⚒ Terraria Craft Helper
        </h1>
        <p className="text-center text-gray-400 mb-6">
          {itemsData.length} objets — Recettes, stats et paliers
        </p>

        <Link
          href="/comparateur"
          className="block w-full mb-4 p-3 bg-gradient-to-r from-gray-800 to-gray-750 border border-orange-700/50 rounded-xl text-center text-orange-400 hover:bg-orange-900/20 transition font-medium"
        >
          ⚔️ Comparateur d'armes → DPS, vitesse, dégâts
        </Link>

        <SearchBar onSearch={setSearch} />
        <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
        <TierFilter activeTier={activeTier} onSelect={setActiveTier} />

        <div className="mt-4 mb-2 text-xs text-gray-500">
          {filteredItems.length} objet{filteredItems.length > 1 ? 's' : ''} trouvé{filteredItems.length > 1 ? 's' : ''}
          {(activeCategory || activeTier) && (
            <button
              onClick={() => { setActiveCategory(null); setActiveTier(null); }}
              className="ml-2 text-orange-400 hover:text-orange-300 underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        <div className="mt-2 space-y-3">
          {filteredItems.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
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