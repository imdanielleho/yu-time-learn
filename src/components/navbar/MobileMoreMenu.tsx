import React from 'react';
import { Settings, LogOut, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
const MobileMoreMenu = () => {
  const {
    logout,
    hasPurchasedCourses
  } = useAuth();
  const navigate = useNavigate();
  const handleAccountSettings = () => {
    if (hasPurchasedCourses) {
      navigate('/settings');
    } else {
      navigate('/account');
    }
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-yutime-blue transition-colors">
          <MoreHorizontal className="h-5 w-5" />
          <span className="text-xs font-medium">更多</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white mb-2" align="end" side="top" sideOffset={8}>
        {!hasPurchasedCourses && <DropdownMenuItem onClick={handleAccountSettings} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>}
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>登出</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>;
};
export default MobileMoreMenu;