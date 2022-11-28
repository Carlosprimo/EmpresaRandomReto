import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useWindowSize } from '@/hooks/useWindowResize'
import { ReactComponent as JoystickIcon } from '@/assets/joystick.svg'

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { width } = useWindowSize()

  useEffect(() => {
    if (width > 620) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [width])

  return (
    <header className="top-0 flex justify-between items-center py-2 w-full">
      {/* Logo */}
      <div className="flex items-center gap-4 -ml-4 xs:-ml-0">
        <NavButton to="/">
          <JoystickIcon width={40} />
          <h1 className="text-2xl font-semibold">GameShop</h1>
        </NavButton>
      </div>

      {/* Navigation */}
      <div className="relative flex -mr-3 xs:-mr-0">
        {isOpen && (
          <nav className="absolute xs:relative top-full right-0 flex flex-col xs:flex-row items-center gap-2 mt-1 xs:mt-0 p-2 xs:p-0 w-40 xs:w-fit bg-white dark:bg-dark xs:bg-transparent border-2 xs:border-none drop-shadow-xl xs:drop-shadow-none rounded-md z-10">
            <NavButton to="/games" text="Games" />
            <NavButton to="/customers" text="Customers" />
            <NavButton to="/rentals" text="Rentals" />
            <NavButton to="/metrics" text="Metrics" />
            <NavButton to="/prices" text="Prices" />
          </nav>
        )}
        <button
          className="xs:hidden px-2 py-2 rounded-full hover:bg-gray-600/50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}

interface INavButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  to: string
  text?: string
  className?: string
  children?: React.ReactNode
}
const NavButton = ({ to, text, className, children }: INavButtonProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        'flex justify-center items-center gap-2.5 px-4 py-2 w-full rounded hover:text-red-600 transition-colors ' +
        (isActive
          ? 'border-2 border-red-600 text-red-600 active:bg-red-600 active:text-white'
          : '') +
        (className ?? '')
      }
    >
      {children}
      <span className="text-lg text-center font-medium">{text}</span>
    </NavLink>
  )
}
