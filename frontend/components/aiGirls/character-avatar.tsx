'use client';

import React from 'react';
import Image from 'next/image';
import { CharacterAppearance, ItemSlot } from '@/lib/types/items';
import { cn } from '@/lib/utils';

interface CharacterAvatarProps {
  characterId: string;
  baseImage: string;
  equippedItems: CharacterAppearance['equipped_items'];
  mood?: CharacterAppearance['mood'];
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showRelationshipBadge?: boolean;
  affectionLevel?: number;
}

const sizeMap = {
  sm: 'w-32 h-32',
  md: 'w-48 h-48',
  lg: 'w-64 h-64',
  xl: 'w-96 h-96'
};

const moodEffects = {
  happy: 'brightness-105',
  neutral: '',
  sad: 'brightness-90 saturate-50',
  excited: 'brightness-110 contrast-105',
  love: 'brightness-110 hue-rotate-15'
};

// Define render order for layers
const layerOrder: ItemSlot[] = [
  'background',
  'shoes',
  'body',
  'head',
  'accessory',
  'handheld'
];

export function CharacterAvatar({
  characterId,
  baseImage,
  equippedItems,
  mood = 'neutral',
  size = 'md',
  className,
  showRelationshipBadge,
  affectionLevel = 0
}: CharacterAvatarProps) {
  const containerSize = sizeMap[size];
  const moodEffect = moodEffects[mood];

  // Sort equipped items by layer order
  const sortedItems = layerOrder
    .map(slot => equippedItems[slot])
    .filter(Boolean)
    .sort((a, b) => (a?.layer_order || 0) - (b?.layer_order || 0));

  return (
    <div className={cn('relative overflow-hidden rounded-lg', containerSize, className)}>
      {/* Background layer */}
      {equippedItems.background ? (
        <Image
          src={equippedItems.background.image_url}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100" />
      )}

      {/* Base character image */}
      <div className={cn('absolute inset-0', moodEffect)}>
        <Image
          src={baseImage}
          alt="Character"
          fill
          className="object-contain z-10"
          priority
        />
      </div>

      {/* Equipped items layers */}
      {sortedItems.map((item, index) => (
        item && (
          <div 
            key={item.item_id} 
            className="absolute inset-0"
            style={{ zIndex: 20 + index }}
          >
            <Image
              src={item.image_url}
              alt="Equipped item"
              fill
              className="object-contain"
            />
          </div>
        )
      ))}

      {/* Mood effects overlay */}
      {mood === 'love' && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute inset-0 bg-gradient-to-t from-pink-400/20 to-transparent animate-pulse" />
          {/* Floating hearts animation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <span className="text-pink-500 animate-float-up">💕</span>
          </div>
        </div>
      )}

      {/* Relationship badge */}
      {showRelationshipBadge && (
        <div className="absolute top-2 right-2 z-40">
          <RelationshipBadge level={affectionLevel} />
        </div>
      )}

      {/* Interactive sparkle effect on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
        <Sparkles />
      </div>
    </div>
  );
}

function RelationshipBadge({ level }: { level: number }) {
  const getHeartIcon = () => {
    if (level >= 80) return '💖'; // Full heart
    if (level >= 60) return '💕'; // Two hearts
    if (level >= 40) return '💗'; // Growing heart
    if (level >= 20) return '💓'; // Beating heart
    return '🤍'; // Empty heart
  };

  const getBgColor = () => {
    if (level >= 80) return 'bg-red-500';
    if (level >= 60) return 'bg-pink-500';
    if (level >= 40) return 'bg-pink-400';
    if (level >= 20) return 'bg-pink-300';
    return 'bg-gray-300';
  };

  return (
    <div className={cn(
      'flex items-center gap-1 px-2 py-1 rounded-full text-white text-sm font-medium',
      getBgColor()
    )}>
      <span>{getHeartIcon()}</span>
      <span>{level}</span>
    </div>
  );
}

function Sparkles() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      {[...Array(5)].map((_, i) => (
        <circle
          key={i}
          cx={20 + i * 15}
          cy={20 + i * 10}
          r="1"
          fill="white"
          opacity="0.8"
          className="animate-sparkle"
          style={{
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </svg>
  );
}

// Add to your global CSS
const sparkleAnimation = `
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}

@keyframes float-up {
  0% { transform: translateY(0) scale(0); opacity: 0; }
  50% { transform: translateY(-20px) scale(1); opacity: 1; }
  100% { transform: translateY(-40px) scale(0); opacity: 0; }
}

.animate-sparkle {
  animation: sparkle 2s ease-in-out infinite;
}

.animate-float-up {
  animation: float-up 2s ease-out infinite;
}
`;