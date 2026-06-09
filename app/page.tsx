'use client';
import { useState, useMemo } from 'react';
import { itemsData } from '@/lib/data';
import { ItemCategory } from '@/lib/types';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import ItemCard from '@/components/ItemCard';
import ItemDetailModal from '@/components/ItemDetailModal';
import Link from 'next/link';

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ItemCategory | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return itemsData.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory ? item.category === activeCategory : true;
      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

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
          Recettes, objets et paliers
        </p>

        <Link
          href="/comparateur"
          className="block w-full mb-4 p-3 bg-gradient-to-r from-gray-800 to-gray-750 border border-orange-700/50 rounded-xl text-center text-orange-400 hover:bg-orange-900/20 transition font-medium"
        >
          ⚔️ Comparateur d'armes → DPS, vitesse, dégâts
        </Link>

        <SearchBar onSearch={setSearch} />
        <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />

        <div className="mt-6 space-y-3">
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
