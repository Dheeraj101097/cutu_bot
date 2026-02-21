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
      className={`bg-[var(--bg-card)] backdrop-blur-[20px] border border-[var(--bg-card-border)] rounded-card shadow-glass dark:shadow-[inset_0_1px_0_0_rgba(74,103,91,0.15)] ${onClick ? "cursor-pointer active:scale-[0.98] transition-transform duration-200" : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Wrapper>
  );
}
