
import React, { useState } from 'react';
import { X, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, name: string) => void;
}

const LoginSignupModal = ({ isOpen, onClose, onLogin, onSignup }: LoginSignupModalProps) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      onLogin(email, password);
    } else {
      onSignup(email, password, name);
    }
    // Reset form
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // TODO: Implement forgot password functionality
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-normal text-yutime-sage">
            {isLoginMode ? 'Login' : 'Sign Up'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={24} />
          </Button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isLoginMode
                ? 'bg-white text-yutime-sage shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isLoginMode
                ? 'bg-white text-yutime-sage shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="First Name"
                value={name.split(' ')[0] || ''}
                onChange={(e) => setName(e.target.value + ' ' + (name.split(' ')[1] || ''))}
                className="py-3"
              />
              <Input
                placeholder="Last Name"
                value={name.split(' ')[1] || ''}
                onChange={(e) => setName((name.split(' ')[0] || '') + ' ' + e.target.value)}
                className="py-3"
              />
            </div>
          )}
          
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="py-3"
          />
          
          <div className="space-y-2">
            <Input
              type="password"
              placeholder={isLoginMode ? "Your password..." : "Create a Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="py-3"
            />
            {isLoginMode && (
              <div className="text-right">
                <Button
                  type="button"
                  variant="link"
                  className="p-0 text-yutime-blue text-sm font-medium"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </Button>
              </div>
            )}
          </div>
          
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full py-4 text-lg bg-yutime-blue hover:bg-yutime-blue/90 text-white rounded-lg"
            >
              {isLoginMode ? 'Login' : 'Create Account'}
            </Button>
          </div>
        </form>
        
        <div className="text-center text-gray-500 my-4 text-sm">or use a social network</div>
        
        <div className="flex justify-center gap-3 my-4">
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0">
            <Twitter className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0">
            <Facebook className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0">
            <Linkedin className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
        
        <div className="text-center border-t border-gray-200 pt-4 mt-4">
          <p className="text-sm">
            {isLoginMode ? "Not a member yet?" : "Already have an account?"}{" "}
            <Button
              variant="link"
              className="p-0 text-yutime-blue font-semibold text-sm"
              onClick={() => setIsLoginMode(!isLoginMode)}
            >
              {isLoginMode ? 'Sign Up' : 'Login'}
            </Button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupModal;
