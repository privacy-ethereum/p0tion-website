'use client'

import { useState, useCallback } from 'react'

interface UseClipboardOptions {
  timeout?: number
}

interface UseClipboardReturn {
  onCopy: () => Promise<void>
  hasCopied: boolean
}

export function useClipboard(
  text: string,
  options: UseClipboardOptions = {}
): UseClipboardReturn {
  const { timeout = 2000 } = options
  const [hasCopied, setHasCopied] = useState(false)

  const onCopy = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        
        try {
          document.execCommand('copy')
        } catch (error) {
          throw new Error('Failed to copy text')
        } finally {
          document.body.removeChild(textArea)
        }
      }

      setHasCopied(true)
      setTimeout(() => setHasCopied(false), timeout)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }, [text, timeout])

  return { onCopy, hasCopied }
}