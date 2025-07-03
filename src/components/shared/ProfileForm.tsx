
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from '@/hooks/useProfile';

const ProfileForm = () => {
  const { profileData, setProfileData, saveProfile, isLoading } = useProfile();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h2 className="text-xl font-semibold text-yutime-navy mb-4">Profile Settings</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            value={profileData.fullName}
            onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
            className="mt-1" 
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            value={profileData.email}
            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            className="mt-1" 
          />
        </div>
        <Button 
          onClick={saveProfile}
          disabled={isLoading}
          className="bg-yutime-blue hover:bg-yutime-blue/90"
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
