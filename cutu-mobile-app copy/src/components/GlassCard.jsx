import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
  onClick,
  animate = true,
  ...props
}) {
  const Wrapper = animate ? motion.div : "div";
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      }
    : {};

  return (
    <Wrapper
      {...motionProps}
      className={`bg-white/72 backdrop-blur-xl border border-white/60 rounded-2xl shadow-glass ${onClick ? "cursor-pointer active:scale-[0.98] transition-transform" : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Wrapper>
  );
}
