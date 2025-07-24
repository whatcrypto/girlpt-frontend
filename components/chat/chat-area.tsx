"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChatAreaProps {
  children: ReactNode;
  maxWidth?: string;
  className?: string;
  backgroundBlur?: boolean;
  borderRadius?: string;
}

export function ChatArea({
  children,
  maxWidth = "42rem",
  className = "",
  backgroundBlur = true,
  borderRadius = "rounded-lg"
}: ChatAreaProps) {
  return (
    <div
      className={cn(
        "relative box-border flex h-full flex-col overflow-hidden",
        backgroundBlur && "backdrop-blur-sm",
        borderRadius,
        className
      )}
      style={{
        ["--thread-max-width" as string]: maxWidth,
      }}
    >
      {children}
    </div>
  );
}

interface ChatViewportProps {
  children: ReactNode;
  className?: string;
  padding?: string;
}

export function ChatViewport({
  children,
  className = "",
  padding = "px-4 pt-8"
}: ChatViewportProps) {
  return (
    <div className={cn(
      "flex h-full flex-col items-center overflow-y-scroll scroll-smooth",
      padding,
      className
    )}>
      {children}
    </div>
  );
}

interface ChatFooterProps {
  children: ReactNode;
  className?: string;
  spacing?: string;
}

export function ChatFooter({
  children,
  className = "",
  spacing = "mt-3 pb-4"
}: ChatFooterProps) {
  return (
    <div className={cn(
      "sticky bottom-0 flex w-full max-w-[var(--thread-max-width)] flex-col items-center justify-end rounded-t-lg",
      spacing,
      className
    )}>
      {children}
    </div>
  );
}
