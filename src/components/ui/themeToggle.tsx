import { Button } from "./button"
import { useRouteContext, useRouter } from "@tanstack/react-router"
import { resolveTheme, setTheme } from "@/lib/theme"
import { Sun, Moon } from 'lucide-react'
import { useState } from "react"



const ThemeToggle = () => {
  const { theme: storedTheme } = useRouteContext({ from: "__root__" })
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)

  const currentTheme = resolveTheme(storedTheme)

  const togglethemeFn = () => {

    setIsAnimating(true)
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme({ data: nextTheme }).then(() => {
      router.invalidate()
      setTimeout(() => setIsAnimating(false), 300)
    })
  }

  return (
    // <div>
    <Button
      variant={"link"}
      size="icon"
      className="rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transtion-colors"
      onClick={togglethemeFn}
      aria-label={`Toggle theme to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-slate-100 transition-all duration-300 ${currentTheme === 'dark' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'} ${isAnimating ? 'animate-spin' : ''}`} />

        <Moon className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-slate-700 dark:text-slate-300 transition-all duration-300 ${currentTheme === 'light' ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-0'} ${isAnimating ? 'animate-spin' : ''}`} />

      </div >
    </Button>
  )
}

export default ThemeToggle
