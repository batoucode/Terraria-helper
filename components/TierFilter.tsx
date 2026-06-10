'use client';

interface TierFilterProps {
  activeTier: string | null;
  onSelect: (tier: string | null) => void;
}

const TIER_GROUPS: { group: string; color: string; textColor: string; tiers: string[] }[] = [
  { group: 'Débutant', color: 'bg-gray-600', textColor: 'text-gray-100', tiers: ['Début', 'Bois', 'Cactus', 'Minage', 'Achat'] },
  { group: 'Métaux de base', color: 'bg-blue-700', textColor: 'text-blue-100', tiers: ['Cuivre', 'Étain', 'Fer', 'Plomb', 'Argent', 'Tungstène', 'Or', 'Platine'] },
  { group: 'Pré-Hardmode', color: 'bg-purple-700', textColor: 'text-purple-100', tiers: ['Corruption', 'Crimson', 'Météore', 'Jungle', 'Donjon', 'Enfer', 'Spécial', 'Avancé', 'Désert', 'Ombre'] },
  { group: 'Hardmode', color: 'bg-red-700', textColor: 'text-red-100', tiers: ['Hardmode'] },
  { group: 'Fin de jeu', color: 'bg-yellow-600', textColor: 'text-yellow-900', tiers: ['Fin'] },
  { group: 'Butin', color: 'bg-orange-800', textColor: 'text-orange-100', tiers: ['Butin'] },
];

const TIER_STYLE: Record<string, { bg: string; text: string; group: string }> = {};
for (const g of TIER_GROUPS) {
  for (const t of g.tiers) {
    TIER_STYLE[t] = { bg: g.color, text: g.textColor, group: g.group };
  }
}

export function getTierStyle(tier: string): { bg: string; text: string } | null {
  return TIER_STYLE[tier] || null;
}

const TIER_CHIP_STYLE: Record<string, { border: string; color: string; activeBg: string; activeText: string }> = {
  'Débutant':       { border: '#9ca3af', color: '#6b7280', activeBg: '#4b5563', activeText: '#f3f4f6' },
  'Métaux de base': { border: '#3b82f6', color: '#2563eb', activeBg: '#1d4ed8', activeText: '#dbeafe' },
  'Pré-Hardmode':   { border: '#8b5cf6', color: '#7c3aed', activeBg: '#6d28d9', activeText: '#ede9fe' },
  'Hardmode':       { border: '#ef4444', color: '#dc2626', activeBg: '#b91c1c', activeText: '#fee2e2' },
  'Fin de jeu':     { border: '#d97706', color: '#b45309', activeBg: '#92400e', activeText: '#fef3c7' },
  'Butin':          { border: '#c2410c', color: '#9a3412', activeBg: '#7c2d12', activeText: '#ffedd5' },
};

export default function TierFilter({ activeTier, onSelect }: TierFilterProps) {
  return (
    <div className="my-3">
      <p className="text-xs text-brown-lt mb-2 font-patrick uppercase tracking-wider">Paliers</p>
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => onSelect(null)}
          className="flex-shrink-0 px-3 py-1 rounded-full font-patrick text-[11px] border-2 transition"
          style={{
            borderColor: activeTier === null ? '#2D5A3D' : '#C4956A',
            color: activeTier === null ? '#FFFEF8' : '#7B4F2E',
            background: activeTier === null ? '#2D5A3D' : 'transparent',
          }}
        >
          Tous
        </button>
        {TIER_GROUPS.map((g) => {
          const cs = TIER_CHIP_STYLE[g.group];
          const isActive = activeTier === g.group;
          return (
            <button
              key={g.group}
              onClick={() => onSelect(activeTier === g.group ? null : g.group)}
              className="flex-shrink-0 px-3 py-1 rounded-full font-patrick text-[11px] border-2 transition"
              style={{
                borderColor: cs.border,
                color: isActive ? cs.activeText : cs.color,
                background: isActive ? cs.activeBg : 'transparent',
              }}
            >
              {g.group}
            </button>
          );
        })}
      </div>
    </div>
  );
}
