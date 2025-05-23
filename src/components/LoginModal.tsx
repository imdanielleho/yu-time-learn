
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-normal mb-6">Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-6"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-6"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-6 text-lg bg-yutime-blue hover:bg-yutime-blue/90"
          >
            Login
          </Button>
        </form>
        
        <div className="text-center text-gray-500 my-4">or use a social network</div>
        
        <div className="flex justify-center gap-4 my-2">
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
          <p>
            Not a member yet?{" "}
            <Button
              variant="link"
              className="p-0 text-yutime-blue font-semibold"
              onClick={() => {
                // Handle sign up action
                console.log("Sign up clicked");
              }}
            >
              Sign Up
            </Button>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
