-- Create items table
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL, -- 'clothing', 'accessory', 'gift', 'food'
    rarity VARCHAR(20) DEFAULT 'common', -- 'common', 'rare', 'epic', 'legendary'
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    layer_order INT DEFAULT 0, -- For rendering order (higher = on top)
    slot VARCHAR(50), -- 'head', 'body', 'accessory', 'background', etc.
    relationship_boost INT DEFAULT 0, -- How much it improves relationship
    metadata JSONB DEFAULT '{}', -- Additional properties
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user inventory table
CREATE TABLE user_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    quantity INT DEFAULT 1,
    equipped BOOLEAN DEFAULT FALSE,
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, character_id, item_id)
);

-- Create character relationships table
CREATE TABLE character_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    affection_level INT DEFAULT 0, -- 0-100
    happiness INT DEFAULT 50, -- 0-100
    last_interaction TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_gifts_given INT DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0,
    metadata JSONB DEFAULT '{}', -- Store special moments, achievements, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, character_id)
);

-- Create gift history table
CREATE TABLE gift_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    reaction_text TEXT, -- AI's reaction to the gift
    affection_change INT DEFAULT 0,
    gifted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add equipped items to characters table
ALTER TABLE characters
ADD COLUMN equipped_items JSONB DEFAULT '{}',
ADD COLUMN customization_data JSONB DEFAULT '{}';

-- Create indexes
CREATE INDEX idx_user_inventory_user_character ON user_inventory(user_id, character_id);
CREATE INDEX idx_character_relationships_user_character ON character_relationships(user_id, character_id);
CREATE INDEX idx_items_category ON items(category);
CREATE INDEX idx_items_slot ON items(slot);