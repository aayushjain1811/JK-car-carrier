import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useQuote } from '../../context/QuoteContext'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { useWhatsAppChat, WHATSAPP_NOT_CONFIGURED_TEXT } from './useWhatsAppChat'

export function WhatsAppFloat() {
  const { href, onClick, notice } = useWhatsAppChat()
  const { isOpen } = useQuote()
  const [hover, setHover] = useState(false)
  const tip = notice ? WHATSAPP_NOT_CONFIGURED_TEXT : 'Chat with us'
  const showTip = hover || notice

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] sm:right-6 sm:bottom-6"
        >
          <AnimatePresence>
            {showTip && (
              <motion.span
                role={notice ? 'status' : undefined}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className={`absolute top-1/2 right-[calc(100%+0.75rem)] -translate-y-1/2 rounded-xl bg-navy-900 px-3.5 py-2 text-sm font-medium text-white shadow-lift ${
                  notice ? 'w-60 whitespace-normal' : 'whitespace-nowrap'
                }`}
              >
                {tip}
              </motion.span>
            )}
          </AnimatePresence>
          <motion.a
            href={href ?? '#'}
            onClick={onClick}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with JK Car Carrier on WhatsApp"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_-8px_rgb(37_211_102/0.7)]"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 [animation-duration:2.8s]" aria-hidden="true" />
            <WhatsAppIcon className="relative h-7 w-7" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
