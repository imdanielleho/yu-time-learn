
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Book, Settings, LogOut } from 'lucide-react';
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
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

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
      title: "Courses",
      url: "/courses",
      icon: Book,
      tourId: "courses-nav"
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
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <span className="font-heading text-xl font-bold text-yutime-richBrown">
            YŪ<span className="text-yutime-forestGreen">TIME</span>
          </span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
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
                          ? 'bg-yutime-forestGreen text-yutime-mainBg hover:bg-yutime-forestGreen/90' 
                          : 'hover:bg-yutime-lightCream text-yutime-softBrown hover:text-yutime-richBrown'
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
      
      <SidebarFooter className="p-4">
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
