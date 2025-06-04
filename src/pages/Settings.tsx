
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@email.com");
  const { toast } = useToast();

  const handleSaveProfile = () => {
    // Here you would normally update the user data via API
    console.log("Saving profile:", { fullName, email });
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleChangePassword = () => {
    // Here you would implement password change functionality
    console.log("Change password clicked");
    toast({
      title: "Password Change",
      description: "Password change functionality would be implemented here.",
    });
  };

  const handleDeleteAccount = () => {
    // Here you would implement account deletion
    console.log("Delete account clicked");
    toast({
      title: "Account Deletion",
      description: "Account deletion functionality would be implemented here.",
      variant: "destructive"
    });
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yutime-navy mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and notifications</p>
      </div>

      <div className="space-y-8">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold text-yutime-navy mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1" 
              />
            </div>
            <Button 
              onClick={handleSaveProfile}
              className="bg-yutime-blue hover:bg-yutime-blue/90"
            >
              Save Profile
            </Button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold text-yutime-navy mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive course updates and announcements via email</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="course-reminders">Course Reminders</Label>
                <p className="text-sm text-gray-600">Get reminded about upcoming live sessions</p>
              </div>
              <Switch id="course-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="progress-updates">Progress Updates</Label>
                <p className="text-sm text-gray-600">Weekly summary of your learning progress</p>
              </div>
              <Switch id="progress-updates" />
            </div>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold text-yutime-navy mb-4">Learning Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-play">Auto-play Next Lesson</Label>
                <p className="text-sm text-gray-600">Automatically start the next lesson when one finishes</p>
              </div>
              <Switch id="auto-play" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="closed-captions">Closed Captions</Label>
                <p className="text-sm text-gray-600">Show captions by default for video lessons</p>
              </div>
              <Switch id="closed-captions" defaultChecked />
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold text-yutime-navy mb-4">Account</h2>
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto text-red-600 border-red-200 hover:bg-red-50 ml-0 sm:ml-4"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
