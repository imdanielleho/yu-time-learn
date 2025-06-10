
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yutime-sage">
            {isLoginMode ? 'Login' : 'Sign Up'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={24} />
          </Button>
        </div>

        {/* Tab buttons */}
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
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder={isLoginMode ? "Your password..." : "Create a Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
            {isLoginMode && (
              <div className="text-right mt-1">
                <Button
                  type="button"
                  variant="link"
                  className="p-0 text-yutime-blue text-sm font-medium"
                >
                  Forgot Password?
                </Button>
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full bg-yutime-blue hover:bg-yutime-blue/90 text-white py-3 rounded-xl font-medium"
          >
            {isLoginMode ? 'Login' : 'Create Account'}
          </Button>
        </form>
        
        <div className="text-center text-gray-500 my-4 text-sm">or use a social network</div>
        
        <div className="flex justify-center gap-3 mb-6">
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
        
        <div className="text-center border-t border-gray-200 pt-4">
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
