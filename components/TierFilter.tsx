'use client';

interface TierFilterProps {
  activeTier: string | null;
  onSelect: (tier: string | null) => void;
}

// Groupe de paliers avec couleurs
const TIER_GROUPS: { group: string; color: string; textColor: string; tiers: string[] }[] = [
  { group: 'Débutant', color: 'bg-gray-600', textColor: 'text-gray-100', tiers: ['Début', 'Bois', 'Cactus', 'Minage', 'Achat'] },
  { group: 'Métaux de base', color: 'bg-blue-700', textColor: 'text-blue-100', tiers: ['Cuivre', 'Étain', 'Fer', 'Plomb', 'Argent', 'Tungstène', 'Or', 'Platine'] },
  { group: 'Pré-Hardmode', color: 'bg-purple-700', textColor: 'text-purple-100', tiers: ['Corruption', 'Crimson', 'Météore', 'Jungle', 'Donjon', 'Enfer', 'Spécial', 'Avancé', 'Désert', 'Ombre'] },
  { group: 'Hardmode', color: 'bg-red-700', textColor: 'text-red-100', tiers: ['Hardmode'] },
  { group: 'Fin de jeu', color: 'bg-yellow-600', textColor: 'text-yellow-900', tiers: ['Fin'] },
  { group: 'Butin', color: 'bg-orange-800', textColor: 'text-orange-100', tiers: ['Butin'] },
];

// Flat tier lookup
const TIER_STYLE: Record<string, { bg: string; text: string; group: string }> = {};
for (const g of TIER_GROUPS) {
  for (const t of g.tiers) {
    TIER_STYLE[t] = { bg: g.color, text: g.textColor, group: g.group };
  }
}

export function getTierStyle(tier: string): { bg: string; text: string } | null {
  return TIER_STYLE[tier] || null;
}

export default function TierFilter({ activeTier, onSelect }: TierFilterProps) {
  return (
    <div className="my-4">
      <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Paliers</p>
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onSelect(null)}
          className={`px-2.5 py-1 rounded text-xs font-medium transition ${
            activeTier === null
              ? 'bg-gray-600 text-white ring-2 ring-gray-400'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Tous
        </button>
        {TIER_GROUPS.map((g) => (
          <button
            key={g.group}
            onClick={() => onSelect(activeTier === g.group ? null : g.group)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition ${
              activeTier === g.group
                ? `${g.color} ${g.textColor} ring-2 ring-white/30`
                : `${g.color}/50 text-gray-300 hover:${g.color}/80`
            }`}
          >
            {g.group}
          </button>
        ))}
      </div>
    </div>
  );
}