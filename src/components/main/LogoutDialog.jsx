'use client';


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const LogoutDialog = ({ open, setOpen, onConfirm }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] text-center">
        <DialogHeader>
          <DialogTitle className="text-white font-semibold">Confirm Logout</DialogTitle>
          <DialogDescription className="font-unbounded text-white">
            Are you sure you want to logout from your account?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button className="text-white" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            className="bg-red-700 hover:bg-[#a06c00] text-white"
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;