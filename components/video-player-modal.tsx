/* components/video-player-modal.tsx */
"use client"

import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import screenfull from "screenfull";
import { addToHistory } from "@/lib/watching-history";

/* ---------- Props ---------- */
interface VideoPlayerModalProps {
  src:        string;
  isOpen:     boolean;
  onClose:    () => void;
  /** id контента, чтобы записать в историю */
  contentId?: number;
}

export default function VideoPlayerModal({
  src,
  isOpen,
  onClose,
  contentId,
}: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasSent   = useRef(false);      // чтобы не дублировать запросы

  /* авто-fullscreen при открытии */
  useEffect(() => {
    if (isOpen && screenfull.isEnabled && videoRef.current) {
      screenfull.request(videoRef.current);
    }
  }, [isOpen]);

  /* POST /content-views — ровно один раз, когда пользователь
     действительно нажал «Play» (а не просто увидел постер). */
  const handlePlay = async () => {
    if (hasSent.current || !contentId) return;
    try   { await addToHistory(contentId); }
    catch (e) { console.warn("addToHistory:", e); }
    finally   { hasSent.current = true; }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        {/* close */}
        <Button
          variant="outline" size="icon"
          className="absolute top-4 right-4 z-10 bg-neutral-800/80 border-neutral-600 hover:bg-neutral-700"
          onClick={onClose}
        >
          <X className="h-6 w-6 text-neutral-200" />
        </Button>

        {/* video */}
        <motion.div
          className="w-full h-full flex items-center justify-center p-4"
          initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <video
            ref={videoRef}
            src={src}
            controls
            autoPlay
            onPlay={handlePlay}
            className="max-h-full max-w-full outline-none"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
