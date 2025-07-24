import * as React from "react";
import { ArrowLeft, CreditCard, Star, Search, ImageIcon } from "lucide-react";
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
import { ThreadList } from "./assistant-ui/thread-list";
import { APP_NAME } from "@/lib/types/types";
import { Logo } from "./ui/logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
