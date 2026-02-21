import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="min-h-dvh bg-app flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 pt-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mx-auto w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mx-auto mb-4 text-primary">
              <span className="text-lg font-bold">AI</span>
            </div>
            <h1 className="text-2xl font-bold font-display text-[var(--text-primary)]">
              Welcome Back
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="glass rounded-input p-4 min-h-tap">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-[var(--text-secondary)] shrink-0" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] placeholder:opacity-70 text-sm"
                />
              </div>
            </div>
            <div className="glass rounded-input p-4 min-h-tap">
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-[var(--text-secondary)] shrink-0" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] placeholder:opacity-70 text-sm"
                />
              </div>
            </div>

            <button
              type="button"
              className="w-full text-center text-sm text-[var(--text-secondary)] font-medium py-2"
            >
              Forgot Password?
            </button>

            <button
              type="submit"
              className="w-full py-3.5 rounded-pill bg-gradient-to-r from-surface-light to-accent text-primary font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-secondary font-medium">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
