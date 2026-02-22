import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, User, Lock } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
        
        <div className="text-center mb-10 relative z-10">
          <h1 className="text-3xl font-bold text-[--text-primary] tracking-tight mb-3">
            Create Account
          </h1>
          <p className="text-xs font-bold text-[--text-secondary] opacity-60 tracking-tight leading-relaxed">
            Create a new signs account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-[--text-secondary] opacity-50 tracking-widest uppercase pl-1">Name</p>
            <div className="relative group">
              <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[--text-secondary]/30 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="glass-input w-full py-5 pl-14 pr-6 text-[--text-primary] placeholder:text-[--text-secondary]/20 font-medium"
              />
            </div>
          </div>

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
            Sign Up
          </button>
        </form>

        <div className="mt-12 text-center text-[10px] font-bold tracking-widest uppercase opacity-40">
           Mesh a mesh gradient
        </div>
      </motion.div>
      
      <div className="mt-12 text-center relative z-10">
        <p className="text-sm font-bold text-[--text-secondary] opacity-80">
          Already have an account?{" "}
          <Link to="/login" className="text-[--text-primary] hover:opacity-100 transition-opacity">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
