import { useCallback, useState, type MouseEvent } from 'react'
import { buildWhatsAppUrl, GREETING_MESSAGE, isWhatsAppConfigured, openWhatsApp } from '../../lib/whatsapp'

/**
 * Shared behaviour for every "Chat on WhatsApp" button.
 * When the number is not configured, it never opens a broken link —
 * it flags `notice` so the button can explain instead.
 */
export function useWhatsAppChat() {
  const [notice, setNotice] = useState(false)
  const configured = isWhatsAppConfigured()
  const href = buildWhatsAppUrl(GREETING_MESSAGE) ?? undefined

  const onClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      const url = buildWhatsAppUrl(GREETING_MESSAGE)
      if (!url) {
        setNotice(true)
        window.setTimeout(() => setNotice(false), 4000)
        return
      }
      if (!openWhatsApp(url)) window.location.href = url // popup blocked → same tab
    },
    [],
  )

  return { configured, href, onClick, notice }
}

export const WHATSAPP_NOT_CONFIGURED_TEXT = 'WhatsApp chat is not available yet — the business number is still being set up.'
