# Prompt Claude Code — Planification PNJ Terraria (page HTML interactive)

Tu trouveras les données exactes des PNJ, villages et biomes dans :
➡️ `lib/npcData.ts` (fichier Next.js/typescript — tu peux t'en inspirer pour les data)

## Objectif

Génère un fichier HTML unique et autonome (ou un petit projet Next.js si tu préfères) qui sert d'outil de **planification des villages PNJ dans Terraria**.

Le but : aider le joueur à placer ses PNJ dans les bons biomes, avec les bons voisins, pour optimiser le **bonheur** et débloquer les **pylônes**.

## Fonctionnalités demandées

### 1. Page "Accueil" (ou section en haut)
- Présentation rapide du système de bonheur
- Les 3 facteurs : biome, voisins (&le;25 blocs), surpeuplement
- Rappel : 120+ blocs entre villages, duos de 2 PNJ par biome

### 2. Section "Villages recommandés"
Afficher ces 8 groupes sous forme de **cartes** :

| Biome | PNJ | Pylône |
|-------|-----|--------|
| 🌲 Forêt | Guide + Zoologiste | Forêt |
| 🏜️ Désert | Infirmière + Marchand d'armes | Désert |
| 🌴 Jungle | Dryade + Sorcier vaudou | Jungle |
| ❄️ Neige | Mécano + Gobelin bricoleur | Neige |
| 🌊 Océan | Marchand + Pêcheur | Océan |
| ⛏️ Cavernes | Démolisseur + Tavernkeep | Cavernes |
| ✨ Hallow | Party Girl + Magicien | Hallow |
| 🍄 Champignon | Truffle + Flexible | Champignon |

### 3. Section "Tous les PNJ" (tableau/grille filtrable)
- Filtre par phase (Pre-Hardmode / Hardmode / Flexible / Tous)
- Filtre par biome
- Recherche texte
- Chaque PNJ affiche : nom, biome, partenaire, rôle, phase, priorité, statut bonheur

### 4. Checklist interactive
- Cases à cocher par village construit
- Tâches : maison valide, pylône acheté, distance vérifiée, etc.
- Barre de progression
- Sauvegarde localStorage

### 5. Ordre conseillé de placement
1. 🏜️ Désert (Infirmière + Marchand d'armes)
2. ❄️ Neige (Mécano + Gobelin bricoleur)
3. 🌴 Jungle (Dryade + Sorcier vaudou)
4. 🌲 Forêt (Guide + Zoologiste)
5. 🌊 Océan (Marchand + Pêcheur)
6. ⛏️ Cavernes (Démolisseur + Tavernkeep)
7. ✨ Hallow (Party Girl + Magicien)
8. 🍄 Champignon (Truffle + Flexible)

### 6. Conseils de construction
- 25+ blocs entre voisins non désirés
- 120+ blocs entre villages
- Éviter les grosses villes
- Privilégier les duos utiles
- Pylônes dès le début

### 7. Design / UI
- Propre, responsive mobile/PC
- Français uniquement
- Mode clair/sombre
- Couleurs douces par biome
- Badges biome et phase

## Données complètes des PNJ

**Forêt (🌲) :**
- Guide (📖) — Conseils craft, indispensable. Partenaire: Zoologiste. Phase: Pre-Hardmode. Priorité: 1
- Zoologiste (🐾) — Montures/animaux, 10% bestiaire. Partenaire: Guide. Phase: Pre-Hardmode. Priorité: 2
- Golfeur (🏌️) — Golf, trouvé désert souterrain. Phase: Pre-Hardmode. Priorité: 18

**Désert (🏜️) :**
- Infirmière (❤️) — Soins, essentiel. Partenaire: Marchand d'armes. Priorité: 3 ⭐
- Marchand d'armes (🔫) — Armes/munitions. Partenaire: Infirmière. Priorité: 4 ⭐
- Duende à cuire (💪) — Stuff Hardmode. Partenaire: Marchand d'armes. Phase: Hardmode. Priorité: 17

**Jungle (🌴) :**
- Dryade (🌿) — Buff/détection. Partenaire: Sorcier vaudou. Priorité: 5 ⭐
- Sorcier vaudou (🪄) — Invocation. Partenaire: Dryade. Priorité: 6 ⭐

**Neige (❄️) :**
- Mécano (🔧) — Wiring. Partenaire: Gobelin bricoleur. Priorité: 7 ⭐
- Gobelin bricoleur (⚒️) — Reforge, INDISPENSABLE. Partenaire: Mécano. Priorité: 8 ⭐

**Océan (🌊) :**
- Marchand (💰) — Shop basique. Partenaire: Pêcheur. Priorité: 9
- Pêcheur (🎣) — Quêtes pêche. Partenaire: Marchand. Priorité: 10

**Cavernes (⛏️) :**
- Démolisseur (💣) — Explosifs. Partenaire: Tavernkeep. Priorité: 11
- Tavernkeep (🍺) — Sentinelles. Phase: Hardmode. Priorité: 12
- Percepteur (🧾) — Taxes. Phase: Hardmode. Priorité: 24

**Hallow (✨) :**
- Party Girl (🎉) — Fête/déco. Partenaire: Magicien. Priorité: 13
- Magicien (🔮) — Sorts magiques. Phase: Hardmode. Priorité: 14

**Champignon (🍄) :**
- Truffle (🍄) — Équipement champignon. Partenaire: Flexible. Phase: Hardmode. Priorité: 15 ⭐

**Flexible (🟡) :**
- Steampunker (⚙️) — Clentaminator. Phase: Hardmode. Priorité: 16 ⭐
- Coiffeur (💇) — Coiffures. Priorité: 20
- Peintre (🎨) — Déco. Priorité: 21
- Diablesse (😈) — Armures démoniaques. Priorité: 22
- Santa (🎅) — Noël (décembre). Phase: Hardmode. Priorité: 23
- Cyborg (🤖) — High-tech. Phase: Hardmode. Priorité: 20
- Princesse (👑) — Dernier PNJ, aime tout. Phase: Hardmode. Priorité: 25
- Marchand squelette (💀) — Itinérant cavernes. Priorité: 26

## Format de sortie attendu

Un fichier HTML unique (`terraria-pnj-planner.html`) avec :
- CSS intégré dans une balise `<style>`
- JavaScript dans une balise `<script>`
- Aucune dépendance externe (pas de CDN)
- Design responsive
- Prêt à ouvrir dans un navigateur

**Bonus si tu fais du Next.js :** Donne l'arborescence complète des fichiers et le code de chaque fichier.