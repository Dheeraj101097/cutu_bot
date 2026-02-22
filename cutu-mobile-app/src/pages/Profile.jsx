import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  ChevronRight,
  Shield,
  Globe,
  Lock,
  Edit,
  Power,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Profile() {
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();
  
  const sections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Account Overview" },
        { icon: Bell, label: "Notifications", toggle: true, value: true },
        { icon: Globe, label: "Dark Mode", toggle: true, value: dark, action: toggleTheme },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: Globe, label: "Language" },
        { icon: Shield, label: "Privacy and security" },
      ],
    },
    {
      title: "Security",
      items: [
        { icon: Lock, label: "Change Password" },
        { icon: Shield, label: "Passcode and touch id" },
      ],
    },
  ];

  return (
    <div className="min-h-screen pb-36 px-6">
      <header className="pt-16 pb-12 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[--text-primary] tracking-tight">Settings</h1>
      </header>

      <div className="max-w-lg mx-auto space-y-10">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="glass-card p-6 flex items-center gap-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
               <Edit size={14} className="text-[--text-primary]" />
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                alt="Profile" 
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-xl"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-[3px] border-white dark:border-forest-dark shadow-sm" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[--text-primary] tracking-tight">Dheeraj</h2>
              <p className="text-xs font-bold text-[--text-secondary] opacity-50 tracking-wide">ID: 101097</p>
            </div>
          </div>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-[11px] font-bold text-[--text-secondary] opacity-40 tracking-[0.2em] uppercase pl-2">
                {section.title}
              </h3>
              <div className="glass-card overflow-hidden shadow-xl border-white/5">
                {section.items.map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-5 px-6 py-5 cursor-pointer active:bg-white/[0.03] transition-all ${
                      i < section.items.length - 1 ? "border-b border-white/[0.02] dark:border-white/[0.01]" : ""
                    }`}
                    onClick={() => !item.toggle && navigate("#")}
                  >
                    <div className="w-10 h-10 rounded-2xl glass flex items-center justify-center text-[--text-primary] shrink-0 border-white/10 shadow-sm group-hover:shadow-md transition-shadow">
                      <item.icon size={18} strokeWidth={2.5} />
                    </div>
                    <span className="flex-1 text-sm font-bold text-[--text-primary] tracking-tight">
                      {item.label}
                    </span>
                    {item.toggle ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          item.action?.();
                        }}
                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                          item.value ? "bg-emerald-500/30" : "bg-white/10"
                        } shadow-inner`}
                      >
                        <motion.div
                          className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-lg"
                          animate={{ x: item.value ? 24 : 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      </button>
                    ) : (
                      <ChevronRight size={18} className="text-[--text-secondary] opacity-20" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logout Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <button
            onClick={() => navigate("/")}
            className="w-full py-5 text-sm font-bold text-[--text-primary] rounded-3xl glass border-white/10 flex items-center justify-center gap-3 hover:bg-rose-500/5 hover:border-rose-500/20 active:scale-95 transition-all shadow-lg"
          >
            <Power size={18} className="text-rose-500/70" />
            <span>Logout</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
