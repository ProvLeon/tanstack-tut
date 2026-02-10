import { Link } from "@tanstack/react-router"

const Header = () => {
  return <header className="p-4 bg-slate-900/10 backdrop-blur-xs sticky top-0 z-50">
    <div className="flex justify-between">
      <h1 className="text-3xl font-bold">AppLogo</h1>
      <div>
        <ul className="flex space-x-4">
          <li>Menu</li>
          <li>Pricing</li>
          <li>About</li>
          <li>Testimonial</li>
        </ul>
      </div>
      <Link to='/'>
        Sign Up
      </Link>
    </div>
  </header>
}

export default Header
