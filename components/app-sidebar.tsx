"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  CreditCard,
  FileText,
  Key,
  Settings,
  type LucideIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { iconMap, type DocItem } from "@/lib/docs";

const settingsItems = [
  {
    title: "API Keys",
    url: "/settings/api-keys",
    icon: Key,
  },
  {
    title: "Billing",
    url: "/settings/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [rootDocs, setRootDocs] = useState<DocItem[]>([]);
  const [endpoints, setEndpoints] = useState<DocItem[]>([]);

  useEffect(() => {
    fetch("/api/docs-structure")
      .then((res) => res.json())
      .then((data) => {
        setRootDocs(data.rootDocs);
        setEndpoints(data.endpoints);
      })
      .catch(console.error);
  }, []);

  const getIcon = (iconName: string): LucideIcon => {
    return iconMap[iconName] || FileText;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/docs/quickstart" />} className="group-data-[collapsible=icon]:!justify-center">
              <Image
                src="/datastack_logomark.svg"
                alt="DataStack"
                width={20}
                height={20}
                className="size-5 shrink-0"
              />
              <span className="font-bold text-lg truncate group-data-[collapsible=icon]:hidden">
                <span style={{ color: '#7931F4' }}>Data</span>
                <span style={{ color: '#2225C4' }}>Stack</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex justify-end px-2 group-data-[collapsible=icon]:justify-center">
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Documentation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {rootDocs.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <SidebarMenuItem key={item.slug}>
                    <SidebarMenuButton render={<Link href={item.url} />} isActive={pathname === item.url}>
                      <Icon className="size-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger className="w-full">
                    <SidebarMenuButton render={<div />}>
                      <FileText className="size-4" />
                      <span>API Endpoints</span>
                      <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {endpoints.map((item) => {
                        const Icon = getIcon(item.icon);
                        return (
                          <SidebarMenuSubItem key={item.slug}>
                            <SidebarMenuSubButton render={<Link href={item.url} />} isActive={pathname === item.url}>
                              <Icon className="size-4" />
                              <span>{item.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />} isActive={pathname === item.url}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="https://avatar.vercel.sh/janesmith" alt="Jane Smith" />
                <AvatarFallback className="rounded-lg">JS</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Jane Smith</span>
                <span className="truncate text-xs text-muted-foreground">Pro Plan</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
