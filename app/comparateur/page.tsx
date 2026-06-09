'use client';
import { useState, useMemo } from 'react';
import { itemsData } from '@/lib/data';
import { CraftingItem } from '@/lib/types';

export default function ComparateurPage() {
  const weapons = useMemo(() =>
    itemsData.filter((i) => i.category === 'Arme' && i.stats?.damage != null),
  []);
  
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const toggleWeapon = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const compared = useMemo(
    () => weapons.filter((w) => selected.includes(w.id)),
    [selected, weapons]
  );

  const filtered = useMemo(
    () =>
      weapons.filter(
        (w) =>
          w.name.toLowerCase().includes(search.toLowerCase()) &&
          !selected.includes(w.id)
      ),
    [search, selected, weapons]
  );

  const useTimeLabel = (speed?: number) => {
    if (!speed) return '—';
    if (speed <= 8) return '⚡ Rapide';
    if (speed <= 20) return '⚡ Normal';
    if (speed <= 25) return '🐢 Lent';
    if (speed <= 30) return '🐢 Très lent';
    return '🐢 Extrêmement lent';
  };

  const dps = (dmg?: number, speed?: number) => {
    if (!dmg || !speed) return '—';
    return Math.round(dmg * (60 / speed));
  };

  return (
    <main className="min-h-screen bg-gray-900 pb-16">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
          ⚔️ Comparateur d'armes
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Sélectionne 2 à 4 armes pour les comparer côte à côte
        </p>

        {/* Selection panel */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Chercher une arme à ajouter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="flex flex-wrap gap-2">
            {filtered.slice(0, 20).map((w) => (
              <button
                key={w.id}
                onClick={() => toggleWeapon(w.id)}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition text-gray-300"
              >
                {w.name}
              </button>
            ))}
            {filtered.length > 20 && (
              <span className="text-xs text-gray-500 self-center">
                +{filtered.length - 20} autres...
              </span>
            )}
            {filtered.length === 0 && search && (
              <span className="text-gray-500 text-sm">Aucune arme trouvée</span>
            )}
          </div>

          {/* Selected weapons */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {selected.map((id) => {
              const w = weapons.find((x) => x.id === id);
              return w ? (
                <span
                  key={id}
                  className="px-3 py-1.5 bg-orange-700 rounded-lg text-sm text-white flex items-center gap-2"
                >
                  {w.name}
                  <button onClick={() => setSelected(selected.filter((s) => s !== id))} className="hover:text-red-300">
                    ✕
                  </button>
                </span>
              ) : null;
            })}
          </div>
        </div>

        {/* Comparison Table */}
        {compared.length >= 2 ? (
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-3 text-left text-gray-400 font-medium">Caractéristique</th>
                  {compared.map((w) => (
                    <th key={w.id} className="p-3 text-center font-bold text-white">
                      {w.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Dégâts', field: 'damage' as const },
                  { label: 'Vitesse d\'attaque', field: 'speed' as const },
                  { label: 'Cadence (coups/s)', field: 'speed' as const, special: 'rate' },
                  { label: 'DPS estimé', field: 'damage' as const, special: 'dps' },
                  { label: 'Palier', field: 'tier' as const },
                  { label: 'Catégorie', field: 'category' as const },
                ].map((row) => (
                  <tr key={row.label} className="border-t border-gray-700">
                    <td className="p-3 text-gray-400 font-medium">{row.label}</td>
                    {compared.map((w, i) => {
                      if (row.special === 'rate') {
                        const val = w.stats?.speed;
                        return <td key={w.id} className={`p-3 text-center ${i === 0 ? 'text-green-400 font-bold' : ''}`}>{val ? `${(60 / val).toFixed(1)}/s` : '—'}</td>;
                      }
                      if (row.special === 'dps') {
                        const dmg = w.stats?.damage;
                        const spd = w.stats?.speed;
                        return <td key={w.id} className={`p-3 text-center ${i === 0 ? 'text-green-400 font-bold' : ''}`}>{dmg && spd ? Math.round(dmg * 60 / spd) : '—'}</td>;
                      }
                      const val = row.field === 'tier' ? w.tier : row.field === 'category' ? w.category : w.stats?.[row.field];
                      return (
                        <td key={w.id} className={`p-3 text-center ${i === 0 ? 'text-green-400 font-bold' : ''}`}>
                          {val ?? '—'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Speed visualization */}
            <div className="p-4 border-t border-gray-700">
              <h3 className="text-gray-400 text-sm mb-2">⚡ Échelle de vitesse</h3>
              <div className="space-y-2">
                {compared.map((w, i) => (
                  <div key={w.id} className="flex items-center gap-3">
                    <span className="text-sm w-36 truncate text-gray-300">{w.name}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${i === 0 ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{
                          width: w.stats?.speed
                            ? `${Math.max(5, Math.min(100, (1 - (w.stats.speed - 8) / 50) * 100))}%`
                            : '0%',
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-20 text-right">
                      {w.stats?.speed ? `${w.stats.speed}f` : '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-4xl mb-4">⚔️</p>
            <p>Sélectionne au moins <strong>2 armes</strong> pour les comparer</p>
            <p className="text-sm mt-2">Tu peux en sélectionner jusqu'à 4</p>
          </div>
        )}
      </div>
    </main>
  );
}