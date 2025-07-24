"use client"

import { ReactNode, useState } from "react"
import { cn } from "@/lib/utils"

export interface SliderCharacterCardProps {
  name: string
  id: string
  description?: string
  images: string[] // Array of image URLs
  href: string
  className?: string
  children?: ReactNode
  Image: any // Next.js Image component
  LinkComponent: any // Next.js Link component
  type: string
}

export function SliderCharacterCard({
  name,
  id,
  description,
  images,
  href,
  className,
  children,
  Image,
  LinkComponent,
  type,
}: SliderCharacterCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex(index)
  }

  return (
    <LinkComponent href={href} className="block group">
      <div
        className={cn(
          "relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={images[currentImageIndex]}
            alt={`${name} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Navigation arrows - only show on hover */}
          {isHovered && images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                aria-label="Previous image"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                aria-label="Next image"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          {/* Image dots indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => goToImage(index, e)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/75"
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white font-bold text-lg mb-1">{name}</h3>
            {description && (
              <p className="text-white/90 text-sm line-clamp-2">{description}</p>
            )}
            {images.length > 1 && (
              <p className="text-white/75 text-xs mt-1">
                {currentImageIndex + 1} of {images.length}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Info (Always Visible) */}
        <div className="p-4 bg-card">
          <h3 className="font-semibold text-foreground text-center group-hover:text-primary transition-colors">
            {name}
          </h3>
          {description && (
            <p className="text-muted-foreground text-sm text-center mt-1 line-clamp-1">
              {description}
            </p>
          )}
          {images.length > 1 && (
            <p className="text-muted-foreground text-xs text-center mt-1">
              {images.length} images
            </p>
          )}
        </div>

        {/* Custom children content */}
        {children}

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/30 transition-colors duration-300 pointer-events-none" />
      </div>
    </LinkComponent>
  )
}
