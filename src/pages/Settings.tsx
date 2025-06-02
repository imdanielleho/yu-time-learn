
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Settings = () => {
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
              <Input id="fullName" defaultValue="John Doe" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john.doe@email.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="mt-1" />
            </div>
            <Button className="bg-yutime-blue hover:bg-yutime-blue/90">Save Profile</Button>
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
            <Button variant="outline" className="w-full sm:w-auto">
              Change Password
            </Button>
            <Button variant="outline" className="w-full sm:w-auto text-red-600 border-red-200 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
