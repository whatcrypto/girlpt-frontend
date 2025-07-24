-- Sample items for the AI Girlfriend shop

-- Clothing Items
INSERT INTO items (name, description, category, rarity, price, image_url, layer_order, slot, relationship_boost) VALUES
('Cute Pink Dress', 'A lovely pink dress that shows off her feminine side', 'clothing', 'common', 15.00, '/items/pink-dress.png', 10, 'body', 2),
('Elegant Black Dress', 'A sophisticated evening dress for special occasions', 'clothing', 'rare', 45.00, '/items/black-dress.png', 10, 'body', 5),
('School Uniform', 'Classic Japanese school uniform', 'clothing', 'common', 20.00, '/items/school-uniform.png', 10, 'body', 3),
('Bikini Set', 'Beach-ready swimwear for summer fun', 'clothing', 'rare', 35.00, '/items/bikini.png', 10, 'body', 8),
('Maid Outfit', 'Traditional maid costume with frills', 'clothing', 'epic', 60.00, '/items/maid-outfit.png', 10, 'body', 10),
('Wedding Dress', 'A stunning white wedding gown', 'clothing', 'legendary', 200.00, '/items/wedding-dress.png', 10, 'body', 25);

-- Accessories
INSERT INTO items (name, description, category, rarity, price, image_url, layer_order, slot, relationship_boost) VALUES
('Cat Ears Headband', 'Adorable cat ears that wiggle', 'accessory', 'common', 10.00, '/items/cat-ears.png', 20, 'head', 3),
('Flower Crown', 'Beautiful crown made of roses', 'accessory', 'rare', 25.00, '/items/flower-crown.png', 20, 'head', 5),
('Diamond Necklace', 'Sparkling diamond pendant', 'accessory', 'epic', 100.00, '/items/diamond-necklace.png', 15, 'accessory', 15),
('Heart Choker', 'Black choker with heart charm', 'accessory', 'common', 8.00, '/items/heart-choker.png', 15, 'accessory', 2),
('Angel Wings', 'Ethereal white wings', 'accessory', 'legendary', 150.00, '/items/angel-wings.png', 5, 'accessory', 20);

-- Gifts
INSERT INTO items (name, description, category, rarity, price, image_url, layer_order, slot, relationship_boost) VALUES
('Red Roses', 'A dozen beautiful red roses', 'gift', 'common', 20.00, '/items/roses.png', 0, NULL, 5),
('Chocolate Box', 'Premium assorted chocolates', 'gift', 'common', 15.00, '/items/chocolates.png', 0, NULL, 3),
('Teddy Bear', 'Soft and cuddly teddy bear', 'gift', 'common', 25.00, '/items/teddy-bear.png', 0, NULL, 4),
('Love Letter', 'Handwritten romantic letter', 'gift', 'rare', 30.00, '/items/love-letter.png', 0, NULL, 8),
('Diamond Ring', 'Engagement ring with large diamond', 'gift', 'legendary', 500.00, '/items/diamond-ring.png', 0, NULL, 50),
('Music Box', 'Plays your special song', 'gift', 'epic', 75.00, '/items/music-box.png', 0, NULL, 12);

-- Food
INSERT INTO items (name, description, category, rarity, price, image_url, layer_order, slot, relationship_boost) VALUES
('Strawberry Cake', 'Sweet strawberry shortcake', 'food', 'common', 8.00, '/items/strawberry-cake.png', 0, NULL, 2),
('Bento Box', 'Homemade Japanese lunch', 'food', 'common', 12.00, '/items/bento.png', 0, NULL, 3),
('Bubble Tea', 'Refreshing milk tea with pearls', 'food', 'common', 5.00, '/items/bubble-tea.png', 0, NULL, 1),
('Fancy Dinner', 'Five-course romantic dinner', 'food', 'epic', 80.00, '/items/fancy-dinner.png', 0, NULL, 15),
('Homemade Cookies', 'Heart-shaped cookies made with love', 'food', 'rare', 10.00, '/items/cookies.png', 0, NULL, 5);

-- Backgrounds
INSERT INTO items (name, description, category, rarity, price, image_url, layer_order, slot, relationship_boost) VALUES
('Beach Sunset', 'Romantic beach at sunset', 'background', 'rare', 30.00, '/items/beach-bg.png', 0, 'background', 0),
('Cherry Blossoms', 'Beautiful sakura garden', 'background', 'rare', 35.00, '/items/sakura-bg.png', 0, 'background', 0),
('Cozy Bedroom', 'Intimate bedroom setting', 'background', 'common', 20.00, '/items/bedroom-bg.png', 0, 'background', 0),
('Starry Night', 'Romantic night sky', 'background', 'epic', 50.00, '/items/stars-bg.png', 0, 'background', 0),
('Paris Cafe', 'Charming Parisian cafe', 'background', 'epic', 60.00, '/items/paris-bg.png', 0, 'background', 0);