// Item system types

export type ItemCategory = 'clothing' | 'accessory' | 'gift' | 'food' | 'background';
export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type ItemSlot = 'head' | 'body' | 'accessory' | 'background' | 'handheld' | 'shoes';

export interface Item {
  id: string;
  name: string;
  description?: string;
  category: ItemCategory;
  rarity: ItemRarity;
  price: number;
  image_url?: string;
  layer_order: number;
  slot?: ItemSlot;
  relationship_boost: number;
  metadata?: Record<string, any>;
}

export interface InventoryItem {
  id: string;
  user_id: string;
  character_id: string;
  item_id: string;
  item?: Item; // Populated with JOIN
  quantity: number;
  equipped: boolean;
  acquired_at: string;
}

export interface CharacterRelationship {
  id: string;
  user_id: string;
  character_id: string;
  affection_level: number; // 0-100
  happiness: number; // 0-100
  last_interaction: string;
  total_gifts_given: number;
  total_spent: number;
  metadata?: {
    favorite_items?: string[];
    special_moments?: Array<{
      date: string;
      event: string;
      description: string;
    }>;
    achievements?: string[];
  };
}

export interface GiftReaction {
  item_id: string;
  character_id: string;
  reaction_text: string;
  affection_change: number;
  happiness_change?: number;
  special_dialogue?: boolean;
}

export interface CharacterAppearance {
  base_image: string;
  equipped_items: {
    [slot in ItemSlot]?: {
      item_id: string;
      image_url: string;
      layer_order: number;
    };
  };
  mood?: 'happy' | 'neutral' | 'sad' | 'excited' | 'love';
}