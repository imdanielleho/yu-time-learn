
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import Navbar from '@/components/Navbar';
import CustomerServiceButton from '@/components/CustomerServiceButton';
import HomeMobileNavigation from '@/components/HomeMobileNavigation';
import LoginModal from '@/components/LoginModal';
import ProfileForm from '@/components/shared/ProfileForm';
import PasswordModal from '@/components/shared/PasswordModal';
import DeleteAccountModal from '@/components/shared/DeleteAccountModal';

const Account = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { hasPurchasedCourses, login } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Redirect users with courses to Settings page
  useEffect(() => {
    if (hasPurchasedCourses) {
      navigate('/settings', { replace: true });
    }
  }, [hasPurchasedCourses, navigate]);

  // Don't render anything while redirecting
  if (hasPurchasedCourses) {
    return null;
  }

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    setIsLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className={`container mx-auto px-4 py-8 max-w-4xl ${isMobile ? 'pb-20' : ''}`}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-yutime-navy mb-2">Your Account</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>

          <div className="space-y-8">
            {/* Profile Settings */}
            <ProfileForm />

            {/* Account Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-xl font-semibold text-yutime-navy mb-4">Account</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => setIsPasswordModalOpen(true)}
                >
                  Change Password
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>

          {/* Password Change Modal */}
          <PasswordModal 
            isOpen={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)}
          />

          {/* Delete Account Modal */}
          <DeleteAccountModal 
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
          />
        </div>
      </main>

      {/* Desktop Customer Service Button */}
      {!isMobile && <CustomerServiceButton />}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <HomeMobileNavigation 
          onLoginClick={handleLoginClick}
        />
      )}

      {/* Login Modal for mobile navigation */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Account;
