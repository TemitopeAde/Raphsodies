'use client';

import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";

export function DialogCustomAnimation({ open, setOpen, content }) {
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        
      >
        <DialogHeader className="flex justify-center">
          {/* <h2 className="font-unbounded text-primary lg:text-[36px] text-xl text-center lg:text-left">
            Cart Summary
          </h2> */}
        </DialogHeader>
        
        <DialogBody className="max-h-[100vh] overflow-y-auto">
          {content}
        </DialogBody>
      </Dialog>
    </>
  );
}
