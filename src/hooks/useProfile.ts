
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useProfile = () => {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
  });

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateProfile({
        name: profileData.fullName,
        email: profileData.email,
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profileData,
    setProfileData,
    saveProfile,
    isLoading,
  };
};
