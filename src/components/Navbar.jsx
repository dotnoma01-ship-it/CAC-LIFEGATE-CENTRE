import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo" onClick={closeMenu}>
          <div className="logo-mark">
  <img src="/CAC LOGO.jpg" alt="CAC Lifegate Centre logo" />
        </div>
          <div className="logo-text">
            <strong>LIFEGATE</strong>
            <span>CENTRE</span>
          </div>
        </Link>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>

          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/about" onClick={closeMenu}>
            About
          </Link>

          <Link to="/ministries" onClick={closeMenu}>
            Ministries
          </Link>

          <Link to="/programs" onClick={closeMenu}>
            Programs
          </Link>

          <Link to="/sermons" onClick={closeMenu}>
            Sermons
          </Link>

          <Link to="/hymns" onClick={closeMenu}>
            Hymns
          </Link>

          <Link to="/gallery" onClick={closeMenu}>
            Gallery
          </Link>

          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>

          <Link to="/give" className="nav-button" onClick={closeMenu}>
            Give
          </Link>

        </nav>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>
    </header>
  );
}

export default Navbar;