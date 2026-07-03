# Terraria Helper 🗺️⚒️

Application web Next.js pour Terraria — outils de craft ET planification des villages PNJ.

## Fonctionnalités

### ⚒️ Craft Helper
- Recherche en temps réel d'objets
- Filtrage par catégorie (Armure, Arme, Outil, Station)
- Fiche détaillée avec statistiques, ingrédients et station
- Arbre de craft récursif
- Comparateur d'armes
- Sauvegarde locale des favoris (⭐)

### 🗺️ Planificateur PNJ
- **Villages recommandés** par biome (8 groupes)
- **Grille complète des PNJ** avec filtres (phase, biome, recherche)
- **Checklist interactive** avec barre de progression (sauvegardée)
- **Conseils de construction** (25 blocs, 120 blocs, duos)
- **Ordre conseillé de placement** étape par étape
- Fiche détaillée pour chaque PNJ
- Mode clair/sombre
- Sauvegarde localStorage de la checklist

## Déploiement sur Vercel

```bash
npm install
npm run dev      # dev local
npm run build    # prod
```

Connecte le dépôt GitLab à Vercel pour le déploiement automatique.

## Structure

```
app/
  page.tsx          # Accueil Craft
  layout.tsx        # Layout global
  pnj/page.tsx      # Planificateur PNJ
  comparateur/      # Comparateur d'armes
  arbre/            # Arbre de craft
lib/
  data.ts           # Données objets craft
  npcData.ts        # Données PNJ, villages, checklists
  types.ts          # Types TypeScript
components/         # Composants réutilisables
```

## Ajout de données

- Objets craft → `lib/data.ts` (interface `CraftingItem`)
- PNJ / villages → `lib/npcData.ts` (interfaces `NpcData`, `VillageGroup`)

## Licence

Code sous MIT. Données du [Terraria Wiki](https://terraria.wiki.gg/fr/) (CC BY-NC-SA).
