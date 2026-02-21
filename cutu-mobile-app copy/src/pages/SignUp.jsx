import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Mail, User, Lock, ArrowRight } from "lucide-react";

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
    <div className="min-h-dvh bg-gradient-to-br from-cutu-sky/40 via-white to-cutu-primary-soft/30 flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 pt-12 pb-24 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 flex items-center justify-center">
              <Bot className="w-7 h-7 text-cutu-primary" strokeWidth={1.5} />
            </div>
            <span className="text-lg font-bold font-display text-cutu-text">
              CUTU Bot
            </span>
          </Link>
          <h1 className="text-2xl font-bold font-display text-cutu-text">
            Create account
          </h1>
          <p className="text-cutu-text-secondary text-sm mt-2">
            Join CUTU Bot and unlock all features
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="bg-white/72 backdrop-blur-xl rounded-2xl border border-white/60 p-4 shadow-glass">
            <div className="flex items-center gap-3">
              <User size={20} className="text-cutu-muted shrink-0" />
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent outline-none text-cutu-text placeholder:text-cutu-muted text-sm"
              />
            </div>
          </div>
          <div className="bg-white/72 backdrop-blur-xl rounded-2xl border border-white/60 p-4 shadow-glass">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-cutu-muted shrink-0" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none text-cutu-text placeholder:text-cutu-muted text-sm"
              />
            </div>
          </div>
          <div className="bg-white/72 backdrop-blur-xl rounded-2xl border border-white/60 p-4 shadow-glass">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-cutu-muted shrink-0" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-cutu-text placeholder:text-cutu-muted text-sm"
              />
            </div>
          </div>

          <button
            type="button"
            className="w-full py-3 rounded-2xl border-2 border-dashed border-cutu-primary/40 text-cutu-primary text-sm font-medium flex items-center justify-center gap-2"
          >
            Continue with Google
          </button>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cutu-primary to-cutu-accent text-white font-semibold flex items-center justify-center gap-2 shadow-soft active:scale-[0.98] transition-transform"
          >
            Create account
            <ArrowRight size={18} />
          </button>
        </motion.form>

        <p className="text-center text-sm text-cutu-text-secondary mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cutu-primary font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
