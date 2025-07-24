"use client";

import { Children, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { } from "./aiGirls/character-card";

export function AICard(id: string) {
  return (

    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50",

      )}

    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Show GIF on hover if available, otherwise show static image */}
        <Image
          src="{/anime-$`{`id`}.png}"
          alt="true"
          fill={true}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/30 transition-colors duration-300 pointer-events-none" />
      </div>
    </div>
  );
}
