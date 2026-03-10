import { createServerFn } from "@tanstack/react-start"
import { getCookie, setCookie } from '@tanstack/react-start/server'
export type Theme = 'light' | 'dark' | null

const storageKey = 'app-theme'

export const getTheme = createServerFn({ method: 'GET' }).handler(async () => {
  const theme = getCookie(storageKey) as Theme | undefined
  return theme ?? null
})

export const setTheme = createServerFn({ method: 'POST' }).inputValidator((data: Theme) => data)
  .handler(async ({ data: theme }) => {
    if (theme === null) {
      setCookie(storageKey, '', {
        path: '/',
        maxAge: -1,
        sameSite: 'lax',
      })
    } else {
      setCookie(storageKey, theme, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      })
    }
  })

/**
 * Resolve the actual theme to apply
 * If theme is null (system preference), return 'light' or 'dark' based on system
 * Otherwise return the explicit theme choice
 */
export const resolveTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme === null) {
    // Use system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    // Server-side: assume light (or you could pass this from request headers)
    return 'light'
  }
  return theme
}
