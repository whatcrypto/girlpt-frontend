import * as React from "react";
import {
  ArrowLeft,
  CreditCard,
  Star,
  Search,
  ImageIcon,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { APP_NAME } from "@/lib/types/types";
import { Logo } from "@/components/ui/logo";
import { useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const isPremium = user?.publicMetadata?.planType === "premium";
  const messagesUsed = (user?.publicMetadata?.messagesUsedToday as number) || 0;
  const messagesRemaining = isPremium ? "∞" : Math.max(0, 50 - messagesUsed);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" target="_blank">
                <Logo />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{APP_NAME}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {/* Message Usage Counter */}
          <SidebarMenuItem>
            <div className="px-3 py-2 rounded-md bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="size-4 text-primary" />
                  <span className="text-sm font-medium">Messages</span>
                </div>
                <Badge
                  variant={
                    isPremium || messagesRemaining > 10
                      ? "default"
                      : "destructive"
                  }
                >
                  {messagesRemaining} {isPremium ? "" : "left"}
                </Badge>
              </div>
              {!isPremium && (
                <div className="mt-1">
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        messagesUsed > 40
                          ? "bg-red-500"
                          : messagesUsed > 25
                          ? "bg-yellow-500"
                          : "bg-primary"
                      }`}
                      style={{ width: `${(messagesUsed / 50) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {messagesUsed}/50 used today
                  </p>
                </div>
              )}
            </div>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/subscribe" className="flex items-center gap-2">
                <Star className="size-4" />
                <span className="text-sm">Subscribe</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/credits" className="flex items-center gap-2">
                <CreditCard className="size-4" />
                <span className="text-sm">Buy Credits</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center gap-2">
                <Search className="size-4" />
                <span className="text-sm">Explore Models</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/generate-image" className="flex items-center gap-2">
                <ImageIcon className="size-4" />
                <span className="text-sm">Generate Image</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <ThreadList />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
