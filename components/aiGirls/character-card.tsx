"use client"

import { Character } from "@/lib/types/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface CharacterCardProps {
  character: Character
  className?: string
}

export default function CharacterCard({ character, className }: CharacterCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/chat?character=${character.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group cursor-pointer overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content Overlay on Hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-bold text-lg mb-1">{character.name}</h3>
          <p className="text-white/90 text-sm line-clamp-2">{character.description}</p>
        </div>
      </div>

      {/* Bottom Info (Always Visible) */}
      <div className="p-4 bg-card">
        <h3 className="font-semibold text-foreground text-center group-hover:text-primary transition-colors">
          {character.name}
        </h3>
        <p className="text-muted-foreground text-sm text-center mt-1 line-clamp-1">
          {character.description}
        </p>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/30 transition-colors duration-300 pointer-events-none" />
    </div>
  )
}