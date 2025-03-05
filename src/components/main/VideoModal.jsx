// components/VideoModal.jsx
"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const VideoModal = ({ videoId, triggerButton }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[640px] p-0">
        {/* Add VisuallyHidden DialogTitle for accessibility */}
        <VisuallyHidden>
          <DialogTitle>Video Player</DialogTitle>
        </VisuallyHidden>
        <div className="relative w-full">
          <iframe
            width="100%"
            height="360"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${
              isMuted ? 1 : 0
            }`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button variant="secondary" size="icon" onClick={handleMuteToggle}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleFullscreenToggle}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;