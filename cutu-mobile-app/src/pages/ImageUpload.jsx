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
    <div className="min-h-screen pb-36 px-6">
      <header className="pt-16 pb-12">
        <h1 className="text-3xl font-bold text-[--text-primary] tracking-tight">Upload Image</h1>
        <p className="text-sm font-bold text-[--text-secondary] opacity-40 mt-1">Ready for AI analysis</p>
      </header>

      <div className="max-w-lg mx-auto space-y-10">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <label className="block glass-card overflow-hidden cursor-pointer relative group aspect-[4/3] shadow-2xl">
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
                  className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-[--text-primary] shadow-lg active:scale-95 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-6 border-2 border-dashed border-white/5 group-hover:bg-white/5 transition-all">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400 opacity-20 blur-2xl scale-150 rounded-full" />
                  <div className="w-20 h-20 rounded-2xl glass border-white/20 flex items-center justify-center shadow-inner relative z-10">
                    <Upload size={32} className="text-[--text-primary]" />
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <p className="font-bold text-[--text-primary] text-lg">Choose an image</p>
                  <p className="text-xs font-bold text-[--text-secondary] opacity-30 uppercase tracking-widest">DRAG AND DROP</p>
                </div>
              </div>
            )}
          </label>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="glass-card p-6 flex items-center gap-6 shadow-xl border-white/5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden glass border-white/10 shrink-0 shadow-inner">
              {preview ? (
                <img src={preview} alt="Mini preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[--text-secondary]/20">
                  <ImageIcon size={28} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
               <div className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded-full w-fit mb-2">READY</div>
               <h3 className="text-base font-bold text-[--text-primary] tracking-tight">AI Analysis Ready</h3>
               <p className="text-xs font-bold text-[--text-secondary] opacity-40 mt-1">Processed in vroom engine</p>
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={!selectedFile}
            className="btn-primary w-full py-5 text-base font-bold shadow-2xl disabled:opacity-30 active:scale-95 transition-all"
          >
            <Send size={18} className="mr-3 inline" />
            Process Image
          </button>
        </motion.div>
      </div>
    </div>
  );
}
