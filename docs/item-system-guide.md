# AI Girlfriend Item & Customization System

This system allows users to purchase items for their AI girlfriends, customize their appearance, and build relationships through gifts and interactions - similar to Neopets but for AI companions.

## Features

### 1. Visual Customization
- **Layered Item System**: Items are rendered in layers (background → body → accessories → etc.)
- **Equipment Slots**: Different slots for different item types (head, body, accessory, etc.)
- **Real-time Updates**: Character appearance updates immediately when items are equipped
- **Mood Visualization**: Character mood affects visual appearance (brightness, effects)

### 2. Item Categories
- **Clothing**: Dresses, uniforms, swimwear, etc.
- **Accessories**: Headwear, jewelry, wings, etc.
- **Gifts**: Flowers, chocolates, special items
- **Food**: Treats and meals to share
- **Backgrounds**: Change the scene/environment

### 3. Relationship System
- **Affection Level**: 0-100 scale that grows with interactions
- **Happiness**: Current mood state
- **Gift Reactions**: AI-generated responses to gifts
- **Relationship Milestones**: Different titles (Friend → Girlfriend → Lover → Soulmate)

### 4. Rarity & Pricing
- **Common**: Basic items, affordable
- **Rare**: Better items with higher relationship boost
- **Epic**: Special items with unique effects
- **Legendary**: Ultra-rare items with maximum impact

## Implementation

### Database Schema

```sql
-- Core tables
items                    -- All available items
user_inventory          -- User's owned items
character_relationships -- Relationship stats
gift_history           -- History of gifts given
```

### Key Components

1. **CharacterAvatar**: Displays character with equipped items
2. **ItemShop**: Browse and purchase items
3. **Character Profile**: View character, manage inventory, track relationship

### API Endpoints

```typescript
// Item Management
getItems(category?)              // Get shop items
purchaseItem(userId, characterId, itemId)
equipItem(userId, characterId, itemId)

// Relationship
getCharacterRelationship(userId, characterId)
giveGift(userId, characterId, itemId)
```

## Usage Example

```typescript
// Display character with items
<CharacterAvatar
  characterId={characterId}
  baseImage="/girlfriend/anime/Asuna.jpg"
  equippedItems={equippedItems}
  mood="happy"
  affectionLevel={75}
/>

// Item shop
<ItemShop
  userId={userId}
  characterId={characterId}
  characterName="Sakura"
  userBalance={100}
  onGift={(reaction) => {
    // Handle gift reaction
  }}
/>
```

## Monetization Integration

The system integrates with your existing Stripe setup:
- Items are purchased with real money
- Different price points for different rarities
- Track total spending per character
- Can implement subscription tiers with item allowances

## AI Integration

When giving gifts, the system can:
1. Generate contextual reactions based on:
   - Item type and rarity
   - Current affection level
   - Character personality
   - Gift history

2. Update chat personality based on:
   - Equipped items ("I love the dress you got me!")
   - Relationship level (more intimate at higher levels)
   - Recent interactions

## Setup Instructions

1. **Run database migrations**:
   ```bash
   npx supabase db push
   npx supabase db seed
   ```

2. **Environment variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

3. **Add item images**:
   - Place item images in `/public/items/`
   - Update image URLs in the items table

4. **Customize items**:
   - Edit `supabase/seed/items_seed.sql` to add your own items
   - Adjust prices, rarities, and relationship boosts

## Future Enhancements

1. **Item Crafting**: Combine items to create new ones
2. **Limited Edition Items**: Time-limited or event items
3. **Item Trading**: Between users (if desired)
4. **Achievements**: Unlock items through milestones
5. **Item Sets**: Bonuses for wearing complete sets
6. **Dynamic Pricing**: Based on demand/rarity
7. **Gacha System**: Random item boxes
8. **Seasonal Events**: Holiday-themed items

## Best Practices

1. **Image Optimization**: 
   - Use WebP format for smaller file sizes
   - Provide multiple resolutions
   - Lazy load images

2. **Performance**:
   - Cache equipped items in state
   - Batch API calls where possible
   - Use optimistic UI updates

3. **User Experience**:
   - Clear visual feedback for actions
   - Preview items before purchase
   - Show relationship impact clearly

4. **Monetization Balance**:
   - Free items for engagement
   - Premium items for revenue
   - Avoid pay-to-win feelings