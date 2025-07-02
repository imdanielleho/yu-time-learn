
import React from 'react';
import { Settings, LogOut, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const MobileMoreMenu = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-yutime-blue transition-colors">
          <Menu className="h-5 w-5" />
          <span className="text-xs font-medium">More</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-white" align="end" sideOffset={8}>
        <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileMoreMenu;
