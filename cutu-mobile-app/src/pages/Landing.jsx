import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-app flex flex-col items-center justify-center px-10 pb-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] aspect-square bg-emerald-500/10 blur-[150px] rounded-full" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <div className="text-8xl font-black text-[--text-primary] tracking-tightest mb-10 drop-shadow-2xl opacity-90">
          AI
        </div>
        
        <h1 className="text-4xl font-bold text-[--text-primary] tracking-tighter mb-4 leading-none">
          Next-Gen AI <br /> Experience
        </h1>
        
        <p className="text-sm font-bold text-[--text-secondary] opacity-40 max-w-[240px] leading-relaxed mb-16 tracking-tight">
          Your intelligent companion for a <br /> seamless digital lifestyle.
        </p>

        <div className="w-full max-w-xs space-y-4">
          <Link
            to="/signup"
            className="btn-primary w-full py-5 text-base font-bold flex items-center justify-center gap-3 shadow-2xl group"
          >
            <span>Get Started</span>
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
          </Link>
          
          <Link
            to="/login"
            className="w-full py-5 glass rounded-3xl text-sm font-bold text-[--text-primary] border-white/10 flex items-center justify-center gap-2 hover:bg-white/5 active:scale-95 transition-all shadow-xl"
          >
            Sign In
            <ArrowRight size={16} className="opacity-40" />
          </Link>
        </div>
      </motion.div>

      <div className="fixed bottom-12 text-[10px] font-black tracking-[0.4em] uppercase opacity-20 text-[--text-secondary]">
        Vroom ambient occlusion
      </div>
    </div>
  );
}
