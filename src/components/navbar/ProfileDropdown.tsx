
import React, { useState } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileDropdownProps {
  enableHover?: boolean;
}

const ProfileDropdown = ({ enableHover = false }: ProfileDropdownProps) => {
  const { user, logout, hasPurchasedCourses } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAccountSettings = () => {
    if (hasPurchasedCourses) {
      navigate('/settings');
    } else {
      navigate('/account');
    }
  };

  if (!user) return null;

  const triggerProps = enableHover ? {
    onMouseEnter: () => setIsOpen(true),
    onMouseLeave: () => setIsOpen(false),
  } : {};

  const contentProps = enableHover ? {
    onMouseEnter: () => setIsOpen(true),
    onMouseLeave: () => setIsOpen(false),
  } : {};

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div 
          className={`flex items-center space-x-2 cursor-pointer ${
            enableHover ? 'group' : ''
          }`}
          {...triggerProps}
        >
          <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-transparent">
            <User className="h-6 w-6 text-yutime-navy" />
          </Button>
          {enableHover && (
            <ChevronDown 
              size={16} 
              className="text-yutime-navy group-hover:text-yutime-blue transition-colors" 
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-white" 
        align="end" 
        forceMount
        {...contentProps}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        {!hasPurchasedCourses && (
          <DropdownMenuItem onClick={handleAccountSettings} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
