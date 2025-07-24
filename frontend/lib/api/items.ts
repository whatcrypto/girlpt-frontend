import { createClient } from '@supabase/supabase-js';
import { Item, InventoryItem, CharacterRelationship, GiftReaction } from '@/lib/types/items';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Item Management
export async function getItems(category?: string) {
  let query = supabase.from('items').select('*');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query.order('price', { ascending: true });
  
  if (error) throw error;
  return data as Item[];
}

export async function getItemById(itemId: string) {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', itemId)
    .single();
    
  if (error) throw error;
  return data as Item;
}

// Inventory Management
export async function getUserInventory(userId: string, characterId: string) {
  const { data, error } = await supabase
    .from('user_inventory')
    .select(`
      *,
      item:items(*)
    `)
    .eq('user_id', userId)
    .eq('character_id', characterId)
    .order('acquired_at', { ascending: false });
    
  if (error) throw error;
  return data as InventoryItem[];
}

export async function purchaseItem(
  userId: string, 
  characterId: string, 
  itemId: string
) {
  // Start a transaction
  const { data: item, error: itemError } = await supabase
    .from('items')
    .select('*')
    .eq('id', itemId)
    .single();
    
  if (itemError) throw itemError;
  
  // Check if user already owns the item
  const { data: existing } = await supabase
    .from('user_inventory')
    .select('*')
    .eq('user_id', userId)
    .eq('character_id', characterId)
    .eq('item_id', itemId)
    .single();
    
  if (existing) {
    // Update quantity
    const { data, error } = await supabase
      .from('user_inventory')
      .update({ quantity: existing.quantity + 1 })
      .eq('id', existing.id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } else {
    // Create new inventory entry
    const { data, error } = await supabase
      .from('user_inventory')
      .insert({
        user_id: userId,
        character_id: characterId,
        item_id: itemId,
        quantity: 1,
        equipped: false
      })
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
}

export async function equipItem(
  userId: string,
  characterId: string,
  itemId: string,
  equip: boolean = true
) {
  // If equipping, first unequip any item in the same slot
  if (equip) {
    const { data: item } = await supabase
      .from('items')
      .select('slot')
      .eq('id', itemId)
      .single();
      
    if (item?.slot) {
      // Unequip items in the same slot
      await supabase
        .from('user_inventory')
        .update({ equipped: false })
        .eq('user_id', userId)
        .eq('character_id', characterId)
        .eq('equipped', true)
        .in('item_id', 
          supabase
            .from('items')
            .select('id')
            .eq('slot', item.slot)
        );
    }
  }
  
  // Equip/unequip the item
  const { data, error } = await supabase
    .from('user_inventory')
    .update({ equipped: equip })
    .eq('user_id', userId)
    .eq('character_id', characterId)
    .eq('item_id', itemId)
    .select()
    .single();
    
  if (error) throw error;
  
  // Update character's equipped_items
  await updateCharacterEquippedItems(characterId);
  
  return data;
}

// Relationship Management
export async function getCharacterRelationship(
  userId: string,
  characterId: string
): Promise<CharacterRelationship> {
  const { data, error } = await supabase
    .from('character_relationships')
    .select('*')
    .eq('user_id', userId)
    .eq('character_id', characterId)
    .single();
    
  if (error && error.code === 'PGRST116') {
    // Create new relationship if it doesn't exist
    const { data: newRel, error: createError } = await supabase
      .from('character_relationships')
      .insert({
        user_id: userId,
        character_id: characterId,
        affection_level: 0,
        happiness: 50
      })
      .select()
      .single();
      
    if (createError) throw createError;
    return newRel;
  }
  
  if (error) throw error;
  return data;
}

export async function giveGift(
  userId: string,
  characterId: string,
  itemId: string
): Promise<GiftReaction> {
  // Get item details
  const item = await getItemById(itemId);
  
  // Get current relationship
  const relationship = await getCharacterRelationship(userId, characterId);
  
  // Calculate affection change based on item rarity and current affection
  let affectionChange = item.relationship_boost;
  if (item.rarity === 'rare') affectionChange *= 1.5;
  if (item.rarity === 'epic') affectionChange *= 2;
  if (item.rarity === 'legendary') affectionChange *= 3;
  
  // Diminishing returns at higher affection levels
  if (relationship.affection_level > 80) affectionChange *= 0.5;
  else if (relationship.affection_level > 60) affectionChange *= 0.75;
  
  // Update relationship
  const newAffection = Math.min(100, relationship.affection_level + affectionChange);
  const newHappiness = Math.min(100, relationship.happiness + 5);
  
  await supabase
    .from('character_relationships')
    .update({
      affection_level: newAffection,
      happiness: newHappiness,
      last_interaction: new Date().toISOString(),
      total_gifts_given: relationship.total_gifts_given + 1,
      total_spent: relationship.total_spent + item.price
    })
    .eq('id', relationship.id);
  
  // Generate AI reaction (this would call your chat API)
  const reaction = await generateGiftReaction(characterId, item, newAffection);
  
  // Record gift history
  await supabase
    .from('gift_history')
    .insert({
      user_id: userId,
      character_id: characterId,
      item_id: itemId,
      reaction_text: reaction.reaction_text,
      affection_change: affectionChange
    });
  
  return {
    item_id: itemId,
    character_id: characterId,
    reaction_text: reaction.reaction_text,
    affection_change: affectionChange,
    happiness_change: 5,
    special_dialogue: newAffection > 50 && relationship.affection_level <= 50
  };
}

// Helper functions
async function updateCharacterEquippedItems(characterId: string) {
  // Get all equipped items for the character
  const { data: equipped } = await supabase
    .from('user_inventory')
    .select(`
      *,
      item:items(*)
    `)
    .eq('character_id', characterId)
    .eq('equipped', true);
    
  if (!equipped) return;
  
  // Build equipped items object
  const equippedItems: Record<string, any> = {};
  equipped.forEach(inv => {
    if (inv.item?.slot) {
      equippedItems[inv.item.slot] = {
        item_id: inv.item.id,
        image_url: inv.item.image_url,
        layer_order: inv.item.layer_order
      };
    }
  });
  
  // Update character
  await supabase
    .from('characters')
    .update({ equipped_items: equippedItems })
    .eq('id', characterId);
}

async function generateGiftReaction(
  characterId: string,
  item: Item,
  newAffection: number
): Promise<{ reaction_text: string }> {
  // This would integrate with your chat API
  // For now, return sample reactions
  const reactions = {
    common: [
      `Thank you for the ${item.name}! That's sweet of you.`,
      `Oh, a ${item.name}! I appreciate the thought.`,
      `You got me a ${item.name}? That's nice!`
    ],
    rare: [
      `Wow, a ${item.name}! This is really special!`,
      `I can't believe you got me a ${item.name}! Thank you so much!`,
      `This ${item.name} is amazing! You really know how to make me happy.`
    ],
    epic: [
      `Oh my god! A ${item.name}?! This is incredible!`,
      `I'm speechless... This ${item.name} is perfect!`,
      `You're amazing! I'll treasure this ${item.name} forever!`
    ],
    legendary: [
      `I... I don't know what to say. This ${item.name} is the most beautiful thing anyone's ever given me.`,
      `*tears up* This ${item.name}... You've made me the happiest girl in the world!`,
      `I love you so much! This ${item.name} shows how much you care about me!`
    ]
  };
  
  const categoryReactions = reactions[item.rarity] || reactions.common;
  const reaction = categoryReactions[Math.floor(Math.random() * categoryReactions.length)];
  
  return { reaction_text: reaction };
}