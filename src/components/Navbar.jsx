import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({ variant = "" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const getLinkClass = ({ isActive }) =>
    isActive ? "active" : "";

  return (
    <header className={`navbar ${variant}`}>
      <div className="nav-container">
        {/* LOGO */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <div className="logo-mark">
            <img
              src="/CAC%20LOGO.jpg"
              alt="CAC Lifegate Centre logo"
            />
          </div>

          <div className="logo-text">
            <strong>LIFEGATE</strong>
            <span>CENTRE</span>
          </div>
        </Link>

        {/* DESKTOP AND MOBILE NAVIGATION */}
        <nav
          className={`nav-links ${menuOpen ? "open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink to="/" end className={getLinkClass} onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/about" className={getLinkClass} onClick={closeMenu}>
            About
          </NavLink>

          <NavLink
            to="/ministries"
            className={getLinkClass}
            onClick={closeMenu}
          >
            Ministries
          </NavLink>

          <NavLink
            to="/programs"
            className={getLinkClass}
            onClick={closeMenu}
          >
            Programs
          </NavLink>

          <NavLink
            to="/sermons"
            className={getLinkClass}
            onClick={closeMenu}
          >
            Sermons
          </NavLink>

          <NavLink
            to="/hymns"
            className={getLinkClass}
            onClick={closeMenu}
          >
            Hymns
          </NavLink>

          <NavLink
            to="/gallery"
            className={getLinkClass}
            onClick={closeMenu}
          >
            Gallery
          </NavLink>

          <NavLink
            to="/leadership"
            className={getLinkClass}
            onClick={closeMenu}
          >
            Leadership
          </NavLink>

          <NavLink
            to="/contact"
            className={getLinkClass}
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          <NavLink
            to="/give"
            className={({ isActive }) =>
              `nav-button ${isActive ? "active" : ""}`
            }
            onClick={closeMenu}
          >
            Give
          </NavLink>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="mobile-menu"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;