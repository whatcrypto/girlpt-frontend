"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/assistant-ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ThemeToggle } from "@/components/ui/toggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { RealisticCharacters, AnimeCharacters } from "@/lib/types/types";
import Image from "next/image";
// import { SubscriptionPopup } from "@/components/subscriptions/popUpSub";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getCompanion } from "@/lib/api/companions";
import type { CompanionProfile } from "@/lib/types/companion";

const conversation = {
  date: "Chat Session", // Static text to avoid hydration mismatch
};

export const Assistant = () => {
  const searchParams = useSearchParams();
  const characterId = searchParams?.get("characterId");
  const companionId = searchParams?.get("companionId");
  const [companion, setCompanion] = useState<CompanionProfile | null>(null);
  const [loading, setLoading] = useState(false);

  // Find the character from both arrays
  const allCharacters = [...RealisticCharacters, ...AnimeCharacters];
  const currentCharacter = allCharacters.find(
    (char) => char.id === characterId
  );

  // Load custom companion if companionId is provided
  useEffect(() => {
    if (companionId) {
      setLoading(true);
      getCompanion(companionId)
        .then(setCompanion)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [companionId]);

  const runtime = useChatRuntime({
    api: "/api/chat",
    body: {
      // Pass companion or character info to the API
      ...(companion && {
        companionId: companion.id,
        personality: companion.personality,
        backstory: companion.backstory,
        conversationStyle: companion.conversationStyle,
        greetingMessage: companion.greetingMessage,
      }),
      ...(currentCharacter &&
        !companion && {
          characterId: currentCharacter.id,
          characterName: currentCharacter.name,
          characterDescription: currentCharacter.description,
        }),
    },
  });

  const { user } = useUser();
  const isPremium = user?.publicMetadata?.planType === "premium";
  const messagesUsed = (user?.publicMetadata?.messagesUsedToday as number) ?? 0;

  if (!isPremium && messagesUsed >= 50) {
    return (
      // <SubscriptionPopup>
        <div className="text-center p-6">
          <h3 className="text-lg font-semibold mb-2">
            Daily Message Limit Reached
          </h3>
          <p className="text-muted-foreground mb-4">
            You've used all 50 free messages for today. Upgrade to continue
            chatting with unlimited messages!
          </p>
          <p className="text-sm text-muted-foreground">
            Messages used: {messagesUsed}/50
          </p>
        </div>
      // </SubscriptionPopup>
    );
  }

  // Display loading state for companion
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading companion...</p>
        </div>
      </div>
    );
  }

  // Determine which character info to display
  const displayCharacter = companion
    ? {
        name: companion.name,
        imageUrl: companion.avatarUrl,
        description: companion.personality,
      }
    : currentCharacter;

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />

            {/* Character/Companion Avatar and Name */}
            {displayCharacter && (
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                  <Image
                    src={displayCharacter.imageUrl}
                    alt={displayCharacter.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">
                    {displayCharacter.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate max-w-48">
                    {displayCharacter.description}
                  </p>
                </div>
              </div>
            )}

            <Breadcrumb className="ml-auto">
              <BreadcrumbList>
                <BreadcrumbItem></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2 ml-auto">
              <ThemeToggle />
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <Thread />
        </SidebarInset>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
};
