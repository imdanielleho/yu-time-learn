
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from './AppSidebar';
import BottomNavigation from './BottomNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {!isMobile && <AppSidebar />}
        
        <SidebarInset className="flex-1">
          <div className="flex flex-col min-h-screen">
            {!isMobile && (
              <div className="flex items-center gap-2 px-4 py-2 border-b">
                <SidebarTrigger />
              </div>
            )}
            
            <main className={cn(
              "flex-1 bg-gray-50",
              isMobile ? "pb-16" : ""
            )}>
              {children}
            </main>
          </div>
        </SidebarInset>
        
        {isMobile && <BottomNavigation />}
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
