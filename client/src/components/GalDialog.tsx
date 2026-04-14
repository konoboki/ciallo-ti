/**
 * GalDialog - Galgame风格对话框
 * Design: Galgame UI - 半透明玻璃态对话框
 */
import { motion } from "framer-motion";

interface GalDialogProps {
  speaker?: string;
  children: React.ReactNode;
  className?: string;
}

export default function GalDialog({ speaker, children, className = "" }: GalDialogProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`gal-dialog rounded-xl px-6 py-5 ${className}`}
    >
      {speaker && (
        <div className="mb-2">
          <span className="inline-block px-3 py-1 rounded-md text-sm font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30"
            style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
            {speaker}
          </span>
        </div>
      )}
      <div className="text-white/90 leading-relaxed text-[15px]">
        {children}
      </div>
    </motion.div>
  );
}
