"use client"

import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface TabsProps {
  className?: string
}

export function CharacterTabs({ className }: TabsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleTabClick = (type: "realistic" | "anime") => {
    router.push(`/characters?type=${type}`)
  }

  const isActiveTab = (type: string) => {
    return pathname.includes(type) || (pathname === "/characters" && type === "realistic")
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-center border-b border-border">
        <button
          onClick={() => handleTabClick("realistic")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            isActiveTab("realistic")
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Realistic
        </button>
        <button
          onClick={() => handleTabClick("anime")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            isActiveTab("anime")
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Anime
        </button>
      </div>
    </div>
  )
}
