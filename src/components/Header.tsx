import { Link, useRouteContext } from "@tanstack/react-router"
import { buttonVariants } from "./ui/button"
import ThemeToggle from "./ui/themeToggle"
import { resolveTheme } from "@/lib/theme"
// import { useTheme } from "@/lib/theme"

const headerLinks = [
  { label: "Menu", to: "/menu" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
  { label: "Testimonial", to: "/testimonial" },
]

const Header = () => {
  // const { resolvedTheme } = useTheme()
  const { theme: storedTheme } = useRouteContext({ from: "__root__" })
  const resolvedTheme = resolveTheme(storedTheme)

  return (
    <header className="w-screen glass sticky top-0 z-50">
      <div className="flex justify-between text-foreground">
        {/*<h1 className="text-3xl font-bold"></h1>*/}
        <Link to='/' className="flex items-center justify-center space-x-2">
          <img src={`${resolvedTheme === 'dark' ? '/logo.png' : '/logo.png'}`} alt="Backcode logo" width={92} height={92} />
          {/*<div className=" font-bold">Backcode</div>*/}
        </Link>
        <div>
          <ul className="flex space-x-4">
            {headerLinks.map((link) => (
              <li key={link.to} className={buttonVariants({ variant: "link" })}>
                <Link to={link.to} className="font-bold">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Link to='/' className={buttonVariants({ variant: "default" })}>
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
