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
    <div className="min-h-dvh bg-app flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 pt-12 pb-24 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mx-auto w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-display text-[var(--text-primary)]">
              Create Account
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="glass rounded-input p-4 min-h-tap">
              <div className="flex items-center gap-3">
                <User size={20} className="text-[var(--text-secondary)] shrink-0" />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] placeholder:opacity-70 text-sm"
                />
              </div>
            </div>
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
              className="w-full py-3 rounded-input border-2 border-dashed border-secondary/40 text-secondary text-sm font-medium"
            >
              Forgot Password?
            </button>

            <button
              type="submit"
              className="w-full py-3.5 rounded-pill bg-gradient-to-r from-surface-light to-accent text-primary font-semibold active:scale-[0.98] transition-transform"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary font-medium">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
