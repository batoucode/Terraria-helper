'use client';

import { useState, useMemo, useCallback } from 'react';
import { itemsData } from '@/lib/data';
import { CraftingItem } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

const TIERS = ['Débutant', 'Métaux de base', 'Pré-Hardmode', 'Hardmode', 'Fin de jeu', 'Butin'];

const TIER_MAP: Record<string, string> = {
  'Début': 'Débutant', 'Bois': 'Débutant', 'Cactus': 'Débutant', 'Minage': 'Débutant', 'Achat': 'Débutant', 'Abeille': 'Débutant',
  'Cuivre': 'Métaux de base', 'Étain': 'Métaux de base', 'Fer': 'Métaux de base', 'Plomb': 'Métaux de base',
  'Argent': 'Métaux de base', 'Tungstène': 'Métaux de base', 'Or': 'Métaux de base', 'Platine': 'Métaux de base',
  'Corruption': 'Pré-Hardmode', 'Crimson': 'Pré-Hardmode', 'Météore': 'Pré-Hardmode',
  'Jungle': 'Pré-Hardmode', 'Donjon': 'Pré-Hardmode', 'Enfer': 'Pré-Hardmode', 'Spécial': 'Pré-Hardmode',
  'Avancé': 'Pré-Hardmode', 'Désert': 'Pré-Hardmode', 'Ombre': 'Pré-Hardmode',
  'Cobalt': 'Hardmode', 'Palladium': 'Hardmode', 'Mythril': 'Hardmode', 'Orichalcum': 'Hardmode',
  'Adamantite': 'Hardmode', 'Titanium': 'Hardmode', 'Chlorophyte': 'Hardmode',
  'Hardmode': 'Hardmode',
  'Fin': 'Fin de jeu',
  'Butin': 'Butin',
};

const CATEGORY_COLORS: Record<string, string> = {
  'Armure': '#3b82f6', 'Arme': '#ef4444', 'Outil': '#10b981', 'Station de craft': '#8b5cf6',
  'Ressource': '#d97706', 'Accessoire': '#ec4899', 'Potion': '#06b6d4', 'Munition': '#f97316',
};

// Build a lookup from name → item
const itemsByName = new Map<string, CraftingItem>();
itemsData.forEach(i => itemsByName.set(i.name, i));

// Get what an item is USED IN (reverse lookup)
function getUsedIn(itemName: string): CraftingItem[] {
  return itemsData.filter(i => i.ingredients?.some(ing => ing.name === itemName));
}

function CraftTreeNode({ item, depth = 0, onSelect, visited }: {
  item: CraftingItem;
  depth: number;
  onSelect: (id: string) => void;
  visited?: Set<string>;
}) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasIngredients = item.ingredients && item.ingredients.length > 0;
  const branchVisited = visited || new Set<string>();

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 py-1.5 px-2 rounded-craft-sm hover:bg-parchment/50 transition cursor-pointer group"
        style={{ marginLeft: depth * 24 }}
        onClick={() => onSelect(item.id)}
      >
        {/* Expand/collapse */}
        {hasIngredients ? (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="w-4 h-4 flex items-center justify-center text-[10px] text-brown-lt hover:text-brown-dk transition flex-shrink-0"
          >
            {expanded ? '▼' : '▶'}
          </button>
        ) : (
          <span className="w-4 flex-shrink-0" />
        )}

        {/* Image */}
        <div className="relative w-8 h-8 flex-shrink-0 bg-cream border border-brown-lt rounded overflow-hidden">
          <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-0.5" unoptimized
            onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.png'; }}
          />
        </div>

        {/* Name */}
        <span className="font-kalam text-sm text-craft-ink group-hover:text-green-dk transition truncate">
          {item.name}
        </span>

        {/* Badges */}
        <span className="text-[10px] px-1.5 py-0.5 rounded font-patrick flex-shrink-0"
          style={{ background: `${CATEGORY_COLORS[item.category] || '#999'}20`, color: CATEGORY_COLORS[item.category] || '#999' }}
        >
          {item.category}
        </span>
        {item.stats?.defense != null && (
          <span className="text-[10px] text-blue-600 font-patrick flex-shrink-0">🛡️{item.stats.defense}</span>
        )}
        {item.stats?.damage != null && (
          <span className="text-[10px] text-red-600 font-patrick flex-shrink-0">⚔️{item.stats.damage}</span>
        )}

        {/* Station */}
        {item.craftedAt && item.craftedAt !== 'Butin' && item.craftedAt !== 'Achat' && (
          <span className="text-[9px] text-brown-lt font-patrick ml-auto flex-shrink-0 hidden sm:block">
            @ {item.craftedAt}
          </span>
        )}
      </div>

      {/* Ingredients sub-tree (recursive with cycle protection) */}
      {expanded && hasIngredients && (
        <div className="border-l-2 border-dashed border-brown-lt ml-6 pl-2 my-1">
          {item.ingredients!.map((ing, idx) => {
            const ingItem = itemsByName.get(ing.name);
            const isCycle = ingItem && branchVisited.has(ing.name);
            const nextVisited = new Set(branchVisited);
            nextVisited.add(item.name);

            return (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-[10px] text-brown-lt font-patrick w-5 text-right flex-shrink-0">×{ing.quantity}</span>
                {ingItem && !isCycle ? (
                  <div className="flex-1">
                    <CraftTreeNode item={ingItem} depth={0} onSelect={onSelect} visited={nextVisited} />
                  </div>
                ) : ingItem && isCycle ? (
                  <div
                    className="flex-1 flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer hover:bg-parchment/50 transition group"
                    onClick={() => onSelect(ingItem.id)}
                  >
                    <div className="relative w-6 h-6 flex-shrink-0 bg-cream border border-brown-lt rounded overflow-hidden">
                      <Image src={ingItem.imageUrl} alt={ing.name} fill className="object-contain p-0.5" unoptimized
                        onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.png'; }}
                      />
                    </div>
                    <span className="font-caveat text-xs text-craft-ink truncate">{ing.name}</span>
                    <span className="text-[9px] text-amber-600 font-patrick">↺ déjà vu</span>
                  </div>
                ) : (
                  <span className="font-caveat text-xs text-brown-md italic flex-1">{ing.name}</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ArbrePage() {
  const [search, setSearch] = useState('');
  const [activeTier, setActiveTier] = useState<string>('Hardmode');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'tree' | 'usedin'>('tree');

  // Filter items by tier and search
  const filteredItems = useMemo(() => {
    let items = itemsData;

    if (activeTier !== 'all') {
      items = items.filter(i => TIER_MAP[i.tier || ''] === activeTier);
    }

    if (search) {
      const s = search.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(s));
    }

    // Sort: items with ingredients first (crafted), then by name
    return items.sort((a, b) => {
      const aHas = a.ingredients && a.ingredients.length > 0 ? 1 : 0;
      const bHas = b.ingredients && b.ingredients.length > 0 ? 1 : 0;
      if (aHas !== bHas) return bHas - aHas;
      return a.name.localeCompare(b.name);
    });
  }, [activeTier, search]);

  const selectedItem = selectedItemId ? itemsData.find(i => i.id === selectedItemId) : null;

  // Get items that USE the selected item
  const usedInItems = useMemo(() => {
    if (!selectedItem) return [];
    return getUsedIn(selectedItem.name);
  }, [selectedItem]);

  return (
    <main className="min-h-screen pb-16">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 border-b-2 border-brown-lt shadow-craft" style={{ background: '#E8D8B4' }}>
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-caveat text-sm text-brown-md hover:text-brown-dk transition">← Accueil</Link>
            <div className="flex-1">
              <p className="font-patrick text-[11px] text-brown-lt uppercase tracking-widest">guide de craft</p>
              <h1 className="font-kalam font-bold text-2xl text-brown-dk leading-tight">🌳 Arbre de Craft</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Search + Tier filter */}
        <div className="bg-paper border-2 border-brown-lt rounded-craft shadow-craft p-4 mb-4">
          <input
            type="text"
            placeholder="Chercher un objet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2.5 rounded-craft-input bg-cream border-2 border-brown-md text-craft-ink placeholder-brown-lt font-caveat text-[16px] shadow-craft mb-3 focus:outline-none focus:border-green-dk transition"
          />

          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            <button
              onClick={() => setActiveTier('all')}
              className={`flex-shrink-0 px-3 py-1 rounded-full font-patrick text-[11px] border-2 transition ${
                activeTier === 'all' ? 'text-paper border-green-dk' : 'text-brown-md border-brown-lt hover:border-brown-md'
              }`}
              style={activeTier === 'all' ? { background: '#2D5A3D' } : { background: 'transparent' }}
            >
              Tous
            </button>
            {TIERS.map(tier => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`flex-shrink-0 px-3 py-1 rounded-full font-patrick text-[11px] border-2 transition ${
                  activeTier === tier ? 'text-paper border-green-dk' : 'text-brown-md border-brown-lt hover:border-brown-md'
                }`}
                style={activeTier === tier ? { background: '#2D5A3D' } : { background: 'transparent' }}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Two-panel layout */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left: Tree */}
          <div className="flex-1 bg-paper border-2 border-brown-lt rounded-craft shadow-craft p-4 max-h-[70vh] overflow-y-auto">
            <h2 className="font-kalam font-bold text-brown-dk text-sm mb-3">
              {activeTier === 'all' ? '🌳 Tous les objets' : `🌳 ${activeTier}`}
              <span className="font-patrick text-brown-lt ml-2 text-[11px]">({filteredItems.length})</span>
            </h2>

            {filteredItems.length === 0 ? (
              <p className="font-caveat text-brown-lt text-center py-8">Aucun objet trouvé</p>
            ) : (
              <div className="space-y-0.5">
                {filteredItems.map(item => (
                  <CraftTreeNode key={item.id} item={item} depth={0} onSelect={setSelectedItemId} />
                ))}
              </div>
            )}
          </div>

          {/* Right: Detail panel */}
          <div className="w-full lg:w-72 bg-paper border-2 border-brown-lt rounded-craft shadow-craft p-4 max-h-[70vh] overflow-y-auto">
            {selectedItem ? (
              <div>
                {/* Item header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-12 h-12 flex-shrink-0 bg-cream border border-brown-lt rounded overflow-hidden">
                    <Image src={selectedItem.imageUrl} alt={selectedItem.name} fill className="object-contain p-1" unoptimized
                      onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.png'; }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-kalam font-bold text-sm text-craft-ink truncate">{selectedItem.name}</h3>
                    <span className="text-[10px] font-patrick" style={{ color: CATEGORY_COLORS[selectedItem.category] || '#999' }}>
                      {selectedItem.category}
                      {selectedItem.tier ? ` · ${selectedItem.tier}` : ''}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                {selectedItem.stats && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {selectedItem.stats.defense != null && (
                      <span className="text-[10px] px-2 py-0.5 rounded font-patrick" style={{ background: '#3b82f620', color: '#1d4ed8' }}>🛡️ {selectedItem.stats.defense}</span>
                    )}
                    {selectedItem.stats.damage != null && (
                      <span className="text-[10px] px-2 py-0.5 rounded font-patrick" style={{ background: '#ef444420', color: '#b91c1c' }}>⚔️ {selectedItem.stats.damage}</span>
                    )}
                    {selectedItem.stats.setBonus && (
                      <span className="text-[10px] px-2 py-0.5 rounded font-patrick w-full mt-1 text-center" style={{ background: '#d9770620', color: '#92400e' }}>
                        🎯 {selectedItem.stats.setBonus}
                      </span>
                    )}
                  </div>
                )}

                {/* Ingredients */}
                {selectedItem.ingredients && selectedItem.ingredients.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-patrick text-[10px] text-brown-lt uppercase tracking-wider mb-1">🔨 Fabriqué avec</h4>
                    <div className="space-y-1">
                      {selectedItem.ingredients.map((ing, i) => {
                        const ingItem = itemsByName.get(ing.name);
                        return (
                          <div key={i}
                            className="flex items-center gap-2 py-1 px-2 rounded cursor-pointer hover:bg-parchment/50 transition"
                            onClick={() => ingItem && setSelectedItemId(ingItem.id)}
                          >
                            {ingItem ? (
                              <div className="relative w-6 h-6 flex-shrink-0 bg-cream border border-brown-lt rounded overflow-hidden">
                                <Image src={ingItem.imageUrl} alt={ing.name} fill className="object-contain p-0.5" unoptimized
                                  onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.png'; }}
                                />
                              </div>
                            ) : (
                              <div className="w-6 h-6 flex-shrink-0 bg-gray-100 rounded" />
                            )}
                            <span className="font-caveat text-xs text-craft-ink flex-1 truncate">{ing.name}</span>
                            <span className="font-patrick text-[10px] px-1.5 py-0.5 rounded text-paper" style={{ background: '#4A7A50' }}>
                              ×{ing.quantity}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {selectedItem.craftedAt && (
                      <div className="mt-2 text-[10px] font-patrick text-center py-1.5 rounded border border-dashed border-brown-lt text-brown-md">
                        🏭 @ {selectedItem.craftedAt}
                      </div>
                    )}
                  </div>
                )}

                {/* Used in (reverse recipe) */}
                {usedInItems.length > 0 && (
                  <div>
                    <h4 className="font-patrick text-[10px] text-brown-lt uppercase tracking-wider mb-1">⬆ Utilisé dans</h4>
                    <div className="space-y-1">
                      {usedInItems.slice(0, 8).map(item => (
                        <div key={item.id}
                          className="flex items-center gap-2 py-1 px-2 rounded cursor-pointer hover:bg-parchment/50 transition"
                          onClick={() => setSelectedItemId(item.id)}
                        >
                          <div className="relative w-6 h-6 flex-shrink-0 bg-cream border border-brown-lt rounded overflow-hidden">
                            <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-0.5" unoptimized
                              onError={(e) => { (e.target as HTMLImageElement).src = '/fallback.png'; }}
                            />
                          </div>
                          <span className="font-caveat text-xs text-craft-ink truncate">{item.name}</span>
                          <span className="text-[9px] font-patrick flex-shrink-0" style={{ color: CATEGORY_COLORS[item.category] || '#999' }}>
                            {item.category}
                          </span>
                        </div>
                      ))}
                      {usedInItems.length > 8 && (
                        <p className="text-[10px] text-brown-lt font-caveat text-center">
                          + {usedInItems.length - 8} autres...
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Not craftable */}
                {(!selectedItem.ingredients || selectedItem.ingredients.length === 0) && (
                  <p className="font-caveat text-brown-lt text-xs text-center py-4">
                    {selectedItem.craftedAt === 'Butin' ? '🎁 Objet butin' :
                     selectedItem.craftedAt === 'Achat' ? '🛒 Objet acheté' :
                     '⛏️ Ressource naturelle / Minage'}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-12 font-caveat text-brown-lt">
                <p className="text-3xl mb-2">🌳</p>
                <p className="text-sm">Clique sur un objet</p>
                <p className="text-xs mt-1">pour voir son arbre de craft</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}