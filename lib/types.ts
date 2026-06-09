export type ItemCategory = 'Armure' | 'Arme' | 'Outil' | 'Station de craft';

export interface Ingredient {
  name: string;
  quantity: number;
}

export interface CraftingItem {
  id: string;
  name: string;
  category: ItemCategory;
  imageUrl: string;
  stats?: {
    damage?: number;
    defense?: number;
    pickaxePower?: number;
    speed?: number;
    tooltip?: string;
  };
  ingredients?: Ingredient[];
  tier?: string;
  craftedAt?: string;
}