import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-app flex flex-col justify-center px-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 max-w-sm w-full mx-auto shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-500/10 blur-[60px] rounded-full" />
        
        <div className="text-center mb-12 relative z-10">
          <div className="text-5xl font-black text-[--text-primary] tracking-tighter mb-8 drop-shadow-sm">
            AI
          </div>
          <h1 className="text-3xl font-bold text-[--text-primary] tracking-tight mb-3">
            Welcome Back
          </h1>
          <p className="text-xs font-bold text-[--text-secondary] opacity-60 tracking-tight leading-relaxed">
            Enjoy your AI-native mobile <br /> application
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-[--text-secondary] opacity-50 tracking-widest uppercase pl-1">Email</p>
            <div className="relative group">
              <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[--text-secondary]/30 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="email"
                placeholder="Email @gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input w-full py-5 pl-14 pr-6 text-[--text-primary] placeholder:text-[--text-secondary]/20 font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-[--text-secondary] opacity-50 tracking-widest uppercase pl-1">Password</p>
            <div className="relative group">
              <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[--text-secondary]/30 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input w-full py-5 pl-14 pr-6 text-[--text-primary] placeholder:text-[--text-secondary]/20 font-medium"
              />
            </div>
            <div className="flex justify-end pr-1">
              <button type="button" className="text-[10px] font-bold text-[--text-secondary] opacity-50 hover:opacity-100 transition-opacity uppercase tracking-tighter">
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-5 text-base font-bold mt-4 shadow-xl active:scale-95 transition-all"
          >
            Login
          </button>
        </form>

        <div className="mt-12 text-center text-[10px] font-bold tracking-widest uppercase opacity-40">
           Vroom ambient occlusion
        </div>
      </motion.div>
      
      <div className="mt-12 text-center relative z-10">
        <Link to="/signup" className="text-sm font-bold text-[--text-primary] opacity-80 hover:opacity-100 transition-opacity">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
