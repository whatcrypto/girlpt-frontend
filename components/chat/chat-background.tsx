"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface ChatBackgroundProps {
  character?: {
    id: string;
    name: string;
    imageUrl: string;
  };
  children: ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
  blurAmount?: number;
  className?: string;
}

export function ChatBackground({
  character,
  children,
  overlay = true,
  overlayOpacity = 0.7,
  blurAmount = 0,
  className = ""
}: ChatBackgroundProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Background Image */}
      {character?.imageUrl && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
                      <Image
              src={character.imageUrl}
              alt={character.name || "Character"}
              height={300}
              width={300}
              className="w-fit min-h-screen object-fill"
              priority
              sizes="(max-width: 768px) 100vw, 70vw"
            style={{
              filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined
            }}
          />

          {/* Customizable Overlay */}
          {overlay && (
            <div
              className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40"
              style={{
                opacity: overlayOpacity
              }}
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
