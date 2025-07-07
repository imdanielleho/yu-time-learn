import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal = ({ isOpen, onClose }: DeleteAccountModalProps) => {
  const { toast } = useToast();

  const handleDeleteAccount = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Deleting user account");
      
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive"
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xs sm:max-w-md lg:max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Account
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-gray-700 mb-2 font-medium">
              Are you sure you want to permanently delete your account?
            </p>
            <p className="text-sm text-gray-600">
              This action cannot be undone and will result in:
            </p>
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Permanent loss of all course progress</li>
              <li>Deletion of personal data and preferences</li>
              <li>Loss of access to purchased courses</li>
            </ul>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="border-2 border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 flex-1 py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteAccount} 
            className="bg-red-600 hover:bg-red-700 text-white flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md"
          >
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
