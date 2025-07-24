'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Item, ItemCategory, GiftReaction } from '@/lib/types/items';
import { getItems, purchaseItem, giveGift } from '@/lib/api/items';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, ShoppingBag, Gift, Sparkles, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface ItemShopProps {
  userId: string;
  characterId: string;
  characterName: string;
  userBalance?: number;
  onPurchase?: (item: Item) => void;
  onGift?: (reaction: GiftReaction) => void;
}

const categories: { value: ItemCategory; label: string; icon: string }[] = [
  { value: 'clothing', label: 'Clothing', icon: '👗' },
  { value: 'accessory', label: 'Accessories', icon: '💎' },
  { value: 'gift', label: 'Gifts', icon: '🎁' },
  { value: 'food', label: 'Food', icon: '🍰' },
  { value: 'background', label: 'Backgrounds', icon: '🌅' }
];

const rarityColors = {
  common: 'border-gray-300 bg-gray-50',
  rare: 'border-blue-300 bg-blue-50',
  epic: 'border-purple-300 bg-purple-50',
  legendary: 'border-yellow-300 bg-yellow-50'
};

const rarityBadgeColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500'
};

export function ItemShop({
  userId,
  characterId,
  characterName,
  userBalance = 0,
  onPurchase,
  onGift
}: ItemShopProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('clothing');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [giftReaction, setGiftReaction] = useState<GiftReaction | null>(null);

  useEffect(() => {
    loadItems(selectedCategory);
  }, [selectedCategory]);

  const loadItems = async (category: ItemCategory) => {
    setLoading(true);
    try {
      const data = await getItems(category);
      setItems(data);
    } catch (error) {
      toast.error('Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (item: Item, asGift: boolean = false) => {
    if (item.price > userBalance) {
      toast.error('Insufficient balance');
      return;
    }

    setPurchasing(true);
    try {
      // Purchase the item
      await purchaseItem(userId, characterId, item.id);
      
      if (asGift) {
        // Give as gift and get reaction
        const reaction = await giveGift(userId, characterId, item.id);
        setGiftReaction(reaction);
        onGift?.(reaction);
      } else {
        toast.success(`Purchased ${item.name}!`);
        onPurchase?.(item);
      }
    } catch (error) {
      toast.error('Purchase failed');
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Item Shop</CardTitle>
              <CardDescription>Buy items for {characterName}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Balance:</span>
              <Badge variant="secondary" className="text-lg">
                ${userBalance.toFixed(2)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as ItemCategory)}>
            <TabsList className="grid grid-cols-5 w-full">
              {categories.map(cat => (
                <TabsTrigger key={cat.value} value={cat.value} className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span className="hidden sm:inline">{cat.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={selectedCategory} className="mt-6">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map(item => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      userBalance={userBalance}
                      onSelect={() => setSelectedItem(item)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Item Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-md">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItem.name}</DialogTitle>
                <DialogDescription>{selectedItem.description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {selectedItem.image_url && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={selectedItem.image_url}
                      alt={selectedItem.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <Badge className={rarityBadgeColors[selectedItem.rarity]}>
                    {selectedItem.rarity}
                  </Badge>
                  <span className="text-2xl font-bold">${selectedItem.price}</span>
                </div>
                
                {selectedItem.relationship_boost > 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span>+{selectedItem.relationship_boost} affection</span>
                  </div>
                )}
                
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => handlePurchase(selectedItem, false)}
                    disabled={purchasing || selectedItem.price > userBalance}
                  >
                    {purchasing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Buy
                      </>
                    )}
                  </Button>
                  
                  {selectedItem.category === 'gift' && (
                    <Button
                      className="flex-1"
                      variant="secondary"
                      onClick={() => handlePurchase(selectedItem, true)}
                      disabled={purchasing || selectedItem.price > userBalance}
                    >
                      {purchasing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Gift className="h-4 w-4 mr-2" />
                          Give as Gift
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Gift Reaction Dialog */}
      <Dialog open={!!giftReaction} onOpenChange={() => setGiftReaction(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              {characterName}'s Reaction
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-lg italic">"{giftReaction?.reaction_text}"</p>
            
            {giftReaction?.affection_change && (
              <div className="flex items-center justify-center gap-2 text-lg">
                <Heart className="h-5 w-5 text-pink-500 animate-pulse" />
                <span className="font-semibold text-pink-500">
                  +{giftReaction.affection_change} Affection
                </span>
              </div>
            )}
            
            {giftReaction?.special_dialogue && (
              <Badge variant="secondary" className="w-full justify-center">
                Special moment unlocked!
              </Badge>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface ItemCardProps {
  item: Item;
  userBalance: number;
  onSelect: () => void;
}

function ItemCard({ item, userBalance, onSelect }: ItemCardProps) {
  const canAfford = item.price <= userBalance;
  
  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all hover:shadow-lg hover:scale-105',
        rarityColors[item.rarity],
        !canAfford && 'opacity-60'
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="relative w-full h-32 mb-3">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
              <span className="text-4xl">🎁</span>
            </div>
          )}
          
          {item.relationship_boost > 0 && (
            <Badge className="absolute top-1 right-1 text-xs">
              <Heart className="h-3 w-3 mr-1" />
              +{item.relationship_boost}
            </Badge>
          )}
        </div>
        
        <h3 className="font-semibold text-sm truncate">{item.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <Badge variant="outline" className="text-xs">
            {item.rarity}
          </Badge>
          <span className={cn(
            'font-bold',
            canAfford ? 'text-green-600' : 'text-red-600'
          )}>
            ${item.price}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}