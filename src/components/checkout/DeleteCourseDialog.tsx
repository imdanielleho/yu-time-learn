
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteDialog } from './types';

interface DeleteCourseDialogProps {
  deleteDialog: DeleteDialog;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteCourseDialog = ({ deleteDialog, onOpenChange, onConfirm }: DeleteCourseDialogProps) => {
  return (
    <Dialog open={deleteDialog.open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Course</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this course from your order? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm}
          >
            Remove Course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCourseDialog;
