
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AppSidebar from './AppSidebar';
import BottomNavigation from './BottomNavigation';
import CustomerServiceButton from './CustomerServiceButton';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          {!isMobile && <AppSidebar />}
          
          <SidebarInset className="flex-1">
            <div className="flex flex-col min-h-screen">
              
              <main className={cn(
                "flex-1 bg-gray-50",
                isMobile ? "pb-16" : ""
              )}>
                {children}
              </main>
            </div>
          </SidebarInset>
          
          {isMobile && <BottomNavigation />}
          <CustomerServiceButton />
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default AppLayout;
