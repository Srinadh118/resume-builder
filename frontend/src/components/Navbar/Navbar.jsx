import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { MoonStar, Sun } from "lucide-react"

function Navbar() {
  const { user, logout, loading: authLoading } = useAuth();
  console.log('Dashboard user:', user);
  console.log('Navbar user:', user);
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  const isActive = (path) => location.pathname === path ? 'navbar__link navbar__link--active' : 'navbar__link'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav className={`navbar ${!visible ? 'navbar--hidden' : ''}`}>
      <div className="navbar__brand">
        <Link to="/" className="navbar__logo">ResumeBuilder</Link>
      </div>

      <button
        className="navbar__toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span className="navbar__toggle-icon" />
      </button>

      <div className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
        {user ? (
          <>
            <Link to="/dashboard" className={isActive('/dashboard')} onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to="/templates" className={isActive('/templates')} onClick={() => setMenuOpen(false)}>Templates</Link>
            <Link to="/editor" className={isActive('/editor')} onClick={() => setMenuOpen(false)}>Editor</Link>
            <Link to="/settings" className={isActive('/settings')} onClick={() => setMenuOpen(false)}>Settings</Link>
            <span className="navbar__user">{user?.firstName ?? ''}</span>
            <button onClick={handleLogout} className="navbar__logout">Logout</button>
            <button onClick={toggleTheme} className="navbar__theme-toggle" aria-label="Toggle Theme">
              {theme === 'light' ? <MoonStar /> : <Sun />}
            </button>
          </>
        ) : (
          <>
            <Link to="/templates" className={isActive('/templates')} onClick={() => setMenuOpen(false)}>Templates</Link>
            <Link to="/login" className={isActive('/login')} onClick={() => setMenuOpen(false)}>Log In</Link>
            <Link to="/register" className="navbar__link navbar__link--cta" onClick={() => setMenuOpen(false)}>Get Started</Link>
            <button onClick={toggleTheme} className="navbar__theme-toggle" aria-label="Toggle Theme">
              {theme === 'light' ? <MoonStar /> : <Sun />}
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar
