// 1. Create components/chat/character-background.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { RealisticCharacters, AnimeCharacters } from "../../../lib/types/types";

export function CharacterBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const characterId = searchParams?.get("characterId");
  const currentCharacter = [...RealisticCharacters, ...AnimeCharacters].find(
    (char: any) => char.id === characterId
  );

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: currentCharacter?.imageUrl
          ? `url(${currentCharacter.imageUrl})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-screen backdrop-blur-sm bg-black/20">
        {children}
      </div>
    </div>
  );
}
