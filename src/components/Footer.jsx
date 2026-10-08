import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* BRAND */}
        <div className="footer-brand">

          <Link to="/" className="footer-logo-wrap">
            <div className="footer-logo">
              <img
                src="/CAC LOGO.jpg"
                alt="CAC Lifegate Centre logo"
              />
            </div>

            <div className="footer-logo-text">
              <strong>CAC LIFEGATE</strong>
              <span>CENTRE</span>
            </div>
          </Link>

          <p>
            A family of believers growing together in faith,
            love and purpose.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="YouTube">▶</a>
            <a href="#" aria-label="WhatsApp">◉</a>
          </div>

        </div>

        {/* EXPLORE */}
        <div className="footer-column">
          <h4>Explore</h4>

          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/ministries">Ministries</Link>
          <Link to="/programs">Programs</Link>
        </div>

        {/* CONNECT */}
        <div className="footer-column">
          <h4>Connect</h4>

          <Link to="/sermons">Sermons</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/prayer">Prayer Request</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* VISIT */}
        <div className="footer-column footer-visit">
          <h4>Visit Us</h4>

          <p>
            CAC Lifegate Centre
          </p>

          <p>
            Church address coming soon
          </p>

          <Link to="/contact" className="footer-contact-link">
            Get Directions →
          </Link>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">

        <p>
          © 2026 CAC Lifegate Centre. All rights reserved.
        </p>

        <p>
          Built with faith & purpose.
        </p>

      </div>

    </footer>
  );
}

export default Footer;