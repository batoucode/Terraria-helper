# Terraria Craft Helper

Application web mobile-first pour consulter les recettes de craft, les statistiques et les paliers des objets de Terraria.

## Fonctionnalités

- Recherche en temps réel
- Filtrage par catégorie (Armure, Arme, Outil, Station de craft)
- Fiche détaillée avec statistiques, ingrédients et station requise
- Sauvegarde locale des favoris (⭐)
- Interface adaptée aux smartphones
- Design sombre thème Terraria

## Déploiement sur Vercel

1. Clonez ce dépôt
2. Exécutez `npm install` ou `yarn`
3. Lancez le développement avec `npm run dev`
4. Pour déployer sur Vercel, connectez votre dépôt GitHub à Vercel

## Ajout de données

Les objets sont stockés dans `lib/data.ts`. Vous pouvez y ajouter de nouveaux objets suivant l'interface `CraftingItem`.

## Licence

Code sous MIT. Les données et images proviennent du [Terraria Wiki](https://terraria.wiki.gg/fr/) (CC BY-NC-SA).
