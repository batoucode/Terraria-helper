'use client';
import { useState, useMemo } from 'react';
import { itemsData } from '@/lib/data';
import Link from 'next/link';

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
    <main className="min-h-screen pb-16">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 border-b-2 border-brown-lt shadow-craft" style={{ background: '#E8D8B4' }}>
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-caveat text-sm text-brown-md hover:text-brown-dk transition"
            >
              ← Retour
            </Link>
            <div>
              <p className="font-patrick text-[11px] text-brown-lt uppercase tracking-widest">guide de craft</p>
              <h1 className="font-kalam font-bold text-2xl text-brown-dk leading-tight">⚔ Comparateur / Armes</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-4">
        <p className="font-caveat text-brown-md mb-4 text-sm">
          Sélectionne 2 à 4 armes pour les comparer côte à côte
        </p>

        {/* Selection panel */}
        <div className="bg-paper border-2 border-brown-lt rounded-craft shadow-craft p-4 mb-5">
          <input
            type="text"
            placeholder="Chercher une arme à ajouter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2.5 rounded-craft-input bg-cream border-2 border-brown-md text-craft-ink placeholder-brown-lt font-caveat text-[16px] shadow-craft mb-3 focus:outline-none focus:border-green-dk transition"
          />
          <div className="flex flex-wrap gap-2">
            {filtered.slice(0, 20).map((w) => (
              <button
                key={w.id}
                onClick={() => toggleWeapon(w.id)}
                className="px-3 py-1.5 bg-cream border border-brown-lt rounded-craft-sm text-sm font-caveat text-brown-dk hover:bg-parchment hover:border-brown-md transition"
              >
                {w.name}
              </button>
            ))}
            {filtered.length > 20 && (
              <span className="text-xs text-brown-lt self-center font-caveat">
                +{filtered.length - 20} autres...
              </span>
            )}
            {filtered.length === 0 && search && (
              <span className="font-caveat text-brown-lt text-sm">Aucune arme trouvée</span>
            )}
          </div>

          {/* Selected weapons */}
          {selected.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {selected.map((id) => {
                const w = weapons.find((x) => x.id === id);
                return w ? (
                  <span
                    key={id}
                    className="px-3 py-1.5 rounded-craft-sm text-sm font-caveat text-paper flex items-center gap-2"
                    style={{ background: '#2D5A3D' }}
                  >
                    {w.name}
                    <button
                      onClick={() => setSelected(selected.filter((s) => s !== id))}
                      className="hover:opacity-70 transition"
                    >
                      ✕
                    </button>
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Comparison Table */}
        {compared.length >= 2 ? (
          <div className="bg-paper border-2 border-brown-lt rounded-craft shadow-craft overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#E8D8B4' }}>
                  <th className="p-3 text-left text-brown-md font-kalam font-bold border-b-2 border-brown-lt">Caractéristique</th>
                  {compared.map((w, i) => (
                    <th
                      key={w.id}
                      className="p-3 text-center font-kalam font-bold border-b-2 border-brown-lt"
                      style={{ color: i === 0 ? '#2D5A3D' : '#3D2B1F' }}
                    >
                      {w.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Dégâts', field: 'damage' as const },
                  { label: "Vitesse d'attaque", field: 'speed' as const },
                  { label: 'Cadence (coups/s)', field: 'speed' as const, special: 'rate' },
                  { label: 'DPS estimé', field: 'damage' as const, special: 'dps' },
                  { label: 'Palier', field: 'tier' as const },
                  { label: 'Catégorie', field: 'category' as const },
                ].map((row) => (
                  <tr key={row.label} className="border-t border-dashed border-brown-lt">
                    <td className="p-3 text-brown-md font-caveat font-semibold">{row.label}</td>
                    {compared.map((w, i) => {
                      if (row.special === 'rate') {
                        const val = w.stats?.speed;
                        return (
                          <td key={w.id} className="p-3 text-center font-kalam" style={{ color: i === 0 ? '#2D5A3D' : '#3D2B1F', fontWeight: i === 0 ? 700 : 400 }}>
                            {val ? `${(60 / val).toFixed(1)}/s` : '—'}
                          </td>
                        );
                      }
                      if (row.special === 'dps') {
                        const dmg = w.stats?.damage;
                        const spd = w.stats?.speed;
                        return (
                          <td key={w.id} className="p-3 text-center font-kalam" style={{ color: i === 0 ? '#2D5A3D' : '#3D2B1F', fontWeight: i === 0 ? 700 : 400 }}>
                            {dmg && spd ? Math.round(dmg * 60 / spd) : '—'}
                          </td>
                        );
                      }
                      const val = row.field === 'tier' ? w.tier : row.field === 'category' ? w.category : w.stats?.[row.field];
                      return (
                        <td key={w.id} className="p-3 text-center font-kalam" style={{ color: i === 0 ? '#2D5A3D' : '#3D2B1F', fontWeight: i === 0 ? 700 : 400 }}>
                          {val ?? '—'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Speed visualization */}
            <div className="p-4 border-t-2 border-dashed border-brown-lt">
              <h3 className="font-kalam font-bold text-brown-dk text-sm mb-3">⚡ Échelle de vitesse</h3>
              <div className="space-y-2">
                {compared.map((w, i) => (
                  <div key={w.id} className="flex items-center gap-3">
                    <span className="font-caveat text-sm w-36 truncate text-brown-md">{w.name}</span>
                    <div className="flex-1 bg-parchment rounded-craft-pill h-3 overflow-hidden border border-brown-lt">
                      <div
                        className="h-full rounded-craft-pill transition-all"
                        style={{
                          background: i === 0 ? '#4A7A50' : '#C4956A',
                          width: w.stats?.speed
                            ? `${Math.max(5, Math.min(100, (1 - (w.stats.speed - 8) / 50) * 100))}%`
                            : '0%',
                        }}
                      />
                    </div>
                    <span className="font-patrick text-[11px] text-brown-md w-20 text-right">
                      {w.stats?.speed ? `${w.stats.speed}f` : '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 font-caveat text-brown-lt">
            <p className="text-4xl mb-4">⚔️</p>
            <p className="text-brown-md">Sélectionne au moins <strong className="font-kalam">2 armes</strong> pour les comparer</p>
            <p className="text-sm mt-2">Tu peux en sélectionner jusqu'à 4</p>
          </div>
        )}
      </div>
    </main>
  );
}
