"use client"

import { useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import screenfull from "screenfull"

/* ------------------------------------------------------------
   Props
-------------------------------------------------------------*/
interface VideoPlayerModalProps {
  /** URL видео ‒ trailerUrl или videoUrl */
  src: string
  /** Показывать / скрывать модалку */
  isOpen: boolean
  /** Закрыть модалку */
  onClose: () => void
}

export default function VideoPlayerModal({
  src,
  isOpen,
  onClose,
}: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  /* автофуллскрин при открытии (если доступно) */
  useEffect(() => {
    if (isOpen && screenfull.isEnabled && videoRef.current) {
      screenfull.request(videoRef.current)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* close btn */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-[rgb(18,17,19)] border-gray-600 hover:bg-gray-700"
          onClick={onClose}
        >
          <X className="h-6 w-6 text-gray-200" />
        </Button>

        {/* видео контейнер */}
        <motion.div
          className="w-full h-full flex items-center justify-center p-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <video
            ref={videoRef}
            src={src}
            controls
            autoPlay
            className="max-h-full max-w-full outline-none"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
