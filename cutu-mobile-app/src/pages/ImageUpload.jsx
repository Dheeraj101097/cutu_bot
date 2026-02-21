import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Camera, Upload, Send, X } from "lucide-react";
import GlassCard from "../components/GlassCard";

export default function ImageUpload() {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearSelection = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setSelectedFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSend = () => {
    if (!selectedFile) return;
    clearSelection();
  };

  return (
    <div className="min-h-dvh bg-cutu-bg pb-20">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 safe-top">
        <div className="px-4 py-4">
          <h1 className="text-lg font-semibold font-display text-cutu-text">Images</h1>
          <p className="text-xs text-cutu-text-secondary mt-0.5">
            Upload or take photos to send to AI
          </p>
        </div>
      </header>

      <div className="px-4 py-6 space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard className="overflow-hidden">
            <label className={preview ? "block aspect-video" : "block min-h-[200px] cursor-pointer"}>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFile}
                className="hidden"
              />
              {preview ? (
                <div className="relative w-full h-full">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => { e.preventDefault(); clearSelection(); }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 text-cutu-muted">
                  <div className="w-16 h-16 rounded-2xl bg-cutu-sky/60 flex items-center justify-center">
                    <ImageIcon size={28} className="text-cutu-primary" />
                  </div>
                  <p className="text-sm font-medium text-cutu-text">Tap to upload or take a photo</p>
                  <p className="text-xs text-cutu-text-secondary">Supports JPG, PNG, WebP</p>
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1.5 text-xs"><Upload size={14} /> Gallery</span>
                    <span className="flex items-center gap-1.5 text-xs"><Camera size={14} /> Camera</span>
                  </div>
                </div>
              )}
            </label>
          </GlassCard>
        </motion.div>

        {preview && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard className="p-4">
              <p className="text-xs text-cutu-text-secondary mb-3">Ready to send to AI bot</p>
              <button
                onClick={handleSend}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cutu-primary to-cutu-accent text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Send size={18} />
                Send to Bot
              </button>
            </GlassCard>
          </motion.div>
        )}

        <GlassCard animate={false} className="p-4">
          <h3 className="text-sm font-semibold text-cutu-text mb-2">Recent uploads</h3>
          <p className="text-xs text-cutu-text-secondary">Your sent images will appear here.</p>
        </GlassCard>
      </div>
    </div>
  );
}
