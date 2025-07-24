'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CharacterAvatar } from '@/components/aiGirls/character-avatar';
import { ItemShop } from '@/components/aiGirls/item-shop';
import { getUserInventory, getCharacterRelationship, equipItem } from '@/lib/api/items';
import { InventoryItem, CharacterRelationship, CharacterAppearance } from '@/lib/types/items';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, Gift, ShoppingBag, Sparkles, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function CharacterProfilePage() {
  const params = useParams();
  const characterId = params.id as string;
  
  // Mock data - replace with actual user/character data
  const userId = 'current-user-id';
  const characterName = 'Sakura';
  const baseImage = '/girlfriend/anime/Asuna.jpg';
  const userBalance = 100;
  
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [relationship, setRelationship] = useState<CharacterRelationship | null>(null);
  const [equippedItems, setEquippedItems] = useState<CharacterAppearance['equipped_items']>({});
  const [loading, setLoading] = useState(true);
  const [mood, setMood] = useState<CharacterAppearance['mood']>('neutral');

  useEffect(() => {
    loadCharacterData();
  }, [characterId]);

  const loadCharacterData = async () => {
    try {
      const [inv, rel] = await Promise.all([
        getUserInventory(userId, characterId),
        getCharacterRelationship(userId, characterId)
      ]);
      
      setInventory(inv);
      setRelationship(rel);
      
      // Build equipped items from inventory
      const equipped: CharacterAppearance['equipped_items'] = {};
      inv.filter(item => item.equipped && item.item?.slot).forEach(item => {
        if (item.item?.slot) {
          equipped[item.item.slot] = {
            item_id: item.item.id,
            image_url: item.item.image_url || '',
            layer_order: item.item.layer_order
          };
        }
      });
      setEquippedItems(equipped);
      
      // Set mood based on affection level
      if (rel.affection_level >= 80) setMood('love');
      else if (rel.affection_level >= 60) setMood('happy');
      else if (rel.affection_level < 20) setMood('sad');
      else setMood('neutral');
      
    } catch (error) {
      toast.error('Failed to load character data');
    } finally {
      setLoading(false);
    }
  };

  const handleEquipItem = async (itemId: string, equip: boolean) => {
    try {
      await equipItem(userId, characterId, itemId, equip);
      await loadCharacterData(); // Reload to update UI
      toast.success(equip ? 'Item equipped!' : 'Item unequipped!');
    } catch (error) {
      toast.error('Failed to equip item');
    }
  };

  const getRelationshipLevel = () => {
    if (!relationship) return 'Stranger';
    if (relationship.affection_level >= 90) return 'Soulmate';
    if (relationship.affection_level >= 70) return 'Lover';
    if (relationship.affection_level >= 50) return 'Girlfriend';
    if (relationship.affection_level >= 30) return 'Close Friend';
    if (relationship.affection_level >= 10) return 'Friend';
    return 'Acquaintance';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Character Display */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{characterName}</CardTitle>
              <CardDescription>{getRelationshipLevel()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Character Avatar */}
              <div className="flex justify-center">
                <CharacterAvatar
                  characterId={characterId}
                  baseImage={baseImage}
                  equippedItems={equippedItems}
                  mood={mood}
                  size="lg"
                  showRelationshipBadge
                  affectionLevel={relationship?.affection_level || 0}
                />
              </div>
              
              {/* Relationship Stats */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Affection
                    </span>
                    <span className="text-sm">{relationship?.affection_level || 0}/100</span>
                  </div>
                  <Progress value={relationship?.affection_level || 0} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Happiness
                    </span>
                    <span className="text-sm">{relationship?.happiness || 50}/100</span>
                  </div>
                  <Progress value={relationship?.happiness || 50} className="h-2" />
                </div>
              </div>
              
              {/* Relationship Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Gifts Given:</span>
                  <span className="font-medium">{relationship?.total_gifts_given || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Spent:</span>
                  <span className="font-medium">${relationship?.total_spent || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for Shop and Inventory */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="shop" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="shop" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Shop
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Inventory
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="shop" className="mt-6">
              <ItemShop
                userId={userId}
                characterId={characterId}
                characterName={characterName}
                userBalance={userBalance}
                onPurchase={() => loadCharacterData()}
                onGift={() => loadCharacterData()}
              />
            </TabsContent>
            
            <TabsContent value="inventory" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Inventory</CardTitle>
                  <CardDescription>
                    Items you own for {characterName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {inventory.map(invItem => (
                        <InventoryItemCard
                          key={invItem.id}
                          item={invItem}
                          onEquip={(equip) => handleEquipItem(invItem.item_id, equip)}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

interface InventoryItemCardProps {
  item: InventoryItem;
  onEquip: (equip: boolean) => void;
}

function InventoryItemCard({ item, onEquip }: InventoryItemCardProps) {
  if (!item.item) return null;
  
  return (
    <Card className={cn(
      'relative',
      item.equipped && 'ring-2 ring-primary'
    )}>
      <CardContent className="p-4">
        {item.equipped && (
          <Badge className="absolute top-2 right-2 gap-1">
            <Crown className="h-3 w-3" />
            Equipped
          </Badge>
        )}
        
        <div className="relative w-full h-24 mb-3">
          {item.item.image_url ? (
            <img
              src={item.item.image_url}
              alt={item.item.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
              <span className="text-2xl">🎁</span>
            </div>
          )}
        </div>
        
        <h4 className="font-medium text-sm truncate">{item.item.name}</h4>
        
        <div className="flex items-center justify-between mt-3">
          <Badge variant="outline" className="text-xs">
            x{item.quantity}
          </Badge>
          
          {item.item.slot && (
            <Button
              size="sm"
              variant={item.equipped ? "secondary" : "default"}
              onClick={() => onEquip(!item.equipped)}
            >
              {item.equipped ? 'Unequip' : 'Equip'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}