import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Settings, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "My Courses",
      url: "/my-courses",
      icon: BookOpen,
      tourId: "sidebar-nav"
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Sidebar className="bg-white border-r">
      <SidebarHeader className="p-4 bg-white border-b relative">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-heading text-xl font-bold text-yutime-navy">
            YŪ<span className="text-yutime-blue">TIME</span>
          </span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="absolute top-2 right-2" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Collapse/Expand Menu</p>
          </TooltipContent>
        </Tooltip>
      </SidebarHeader>
      
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={`
                        ${isActive 
                          ? 'bg-yutime-blue text-white hover:bg-yutime-blue/90' 
                          : 'hover:bg-gray-100'
                        }
                      `}
                    >
                      <Link 
                        to={item.url}
                        data-tour={item.tourId}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 bg-white border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
