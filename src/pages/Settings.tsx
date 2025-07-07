
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ProfileForm from '@/components/shared/ProfileForm';
import PasswordModal from '@/components/shared/PasswordModal';
import DeleteAccountModal from '@/components/shared/DeleteAccountModal';

const Settings = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yutime-navy mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and notifications</p>
      </div>

      <div className="space-y-8">
        {/* Profile Settings - using shared component */}
        <ProfileForm />

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

        {/* Account Actions - using shared modals */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold text-yutime-navy mb-4">Account</h2>
          <div className="flex gap-2">
            <Button 
              className="bg-[#264653] hover:bg-[#1e3a42] text-white py-3 px-6 rounded-xl font-medium text-base transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md w-full sm:w-auto"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Change Password
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-medium text-base transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md w-full sm:w-auto"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Shared Modals */}
      <PasswordModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      <DeleteAccountModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Settings;
