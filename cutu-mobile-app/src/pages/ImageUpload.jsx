import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Upload, Send, X } from "lucide-react";

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
    <div className="min-h-dvh bg-app pb-24">
      <header className="sticky top-0 z-10 glass border-b border-[var(--glass-border)] safe-top">
        <div className="px-5 py-4">
          <h1 className="text-lg font-semibold font-display text-[var(--text-primary)]">Upload Image</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Tap or drag to upload
          </p>
        </div>
      </header>

      <div className="px-5 py-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <label className="block glass-card overflow-hidden cursor-pointer">
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
                <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 py-8 text-[var(--text-secondary)]">
                  <div className="w-16 h-16 rounded-card bg-gradient-to-br from-secondary/30 to-accent/30 flex items-center justify-center">
                    <ImageIcon size={28} className="text-[var(--text-primary)]" />
                  </div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Tap or drag to upload</p>
                  <p className="text-xs">JPG, PNG, WebP</p>
                  <span className="flex items-center gap-1.5 text-xs"><Upload size={14} /> Gallery or Camera</span>
                </div>
              )}
          </label>
        </motion.div>

        {preview && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="glass-card p-4 space-y-4">
              <p className="text-xs text-[var(--text-secondary)]">Sample uploaded inner image</p>
              <div className="rounded-card overflow-hidden aspect-video bg-[var(--glass-bg)]">
                <img src={preview} alt="Preview" className="w-full h-full object-contain" />
              </div>
              <button
                onClick={handleSend}
                className="w-full py-3.5 rounded-pill bg-gradient-to-r from-surface-light to-accent text-primary font-semibold flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Send size={18} />
                Send to Bot
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
