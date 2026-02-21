import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showClose = true,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md glass rounded-t-[1.5rem] sm:rounded-card max-h-[85dvh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {showClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 -m-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] active:scale-95 transition-all z-10"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}
            {title && (
              <div className="px-6 pt-6 pb-2">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] font-display">
                  {title}
                </h2>
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-6 pb-6 safe-bottom">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
