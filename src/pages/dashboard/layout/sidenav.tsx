// components/Sidebar.tsx
import React from 'react';
import { cn } from "@/lib/utils"; // shadcn utility for classNames
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  HelpCircle 
} from "lucide-react"; // Using lucide icons

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 h-screen w-64 border-r", className)}>
      <ScrollArea className="h-full">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Application
            </h2>
            <NavigationMenu orientation="vertical">
              <NavigationMenuList className="flex-col space-y-1 px-2">
                {/* Dashboard */}
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle()}
                    href="/dashboard"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Parties */}
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle()}
                    href="/parties"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Parties
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Inventory with nested routes */}
                <NavigationMenuItem>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="inventory" className="border-none">
                      <AccordionTrigger 
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "hover:no-underline"
                        )}
                      >
                        <div className="flex items-center">
                          <Package className="mr-2 h-4 w-4" />
                          Inventory
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-4 pt-1">
                        <NavigationMenuList className="flex-col space-y-1">
                          <NavigationMenuItem>
                            <NavigationMenuLink 
                              className={navigationMenuTriggerStyle()}
                              href="/inventory/products"
                            >
                              Products
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink 
                              className={navigationMenuTriggerStyle()}
                              href="/inventory/stock"
                            >
                              Stock
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink 
                              className={navigationMenuTriggerStyle()}
                              href="/inventory/categories"
                            >
                              Categories
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </NavigationMenuItem>

                {/* Sales */}
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle()}
                    href="/sales"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Sales
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Help */}
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle()}
                    href="/help"
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// Main layout component
// app/layout.tsx
import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}