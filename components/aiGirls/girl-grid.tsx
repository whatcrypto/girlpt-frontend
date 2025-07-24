"use client"

import { useRouter } from "next/navigation"
import { AnimeCharacters, RealisticCharacters, Character } from "@/lib/types/types"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface GirlGridProps {
  type: "realistic" | "anime"
  className?: string
}

export function GirlGrid({ type, className }: GirlGridProps) {
  const router = useRouter()
  const characters = type === "realistic" ? RealisticCharacters : AnimeCharacters

  const handleCharacterClick = (character: Character) => {
    router.push(`/chat?character=${character.id}`)
  }

  return (
    <section className={cn("pb-12 px-4", className)}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {characters.map((character) => (
            <div
              key={character.id}
              onClick={() => handleCharacterClick(character)}
              className="group cursor-pointer overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-bold text-lg mb-1">{character.name}</h3>
                  <p className="text-white/90 text-sm line-clamp-2">{character.description}</p>
                </div>
              </div>
              
              <div className="p-4 bg-card">
                <h3 className="font-semibold text-foreground text-center group-hover:text-primary transition-colors">
                  {character.name}
                </h3>
                <p className="text-muted-foreground text-sm text-center mt-1 line-clamp-1">
                  {character.description}
                </p>
              </div>
              
              <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/30 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function RealisticGirlGrid() {
  return <GirlGrid type="realistic" />
}

export function AnimeGirlGrid() {
  return <GirlGrid type="anime" />
}