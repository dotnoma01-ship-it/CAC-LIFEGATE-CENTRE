import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-small-text">
            CHRIST APOSTOLIC CHURCH
          </span>

          <h1>
            CAC LIFEGATE
            <br />
            CENTRE
          </h1>

          <p>
            A place where faith grows, lives are transformed,
            and people encounter God.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Join Us
              <span>→</span>
            </button>

            <button className="secondary-btn">
              <span>▶</span>
              Watch Sermon
            </button>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll to explore</span>
          <div></div>
        </div>
      </section>

      {/* SERVICE TIMES */}
      <section className="service-section">
        <div className="section-heading">
          <span>JOIN US</span>
          <h2>Service Times</h2>

          <p>
            Come worship with us and experience God's presence.
          </p>
        </div>

        <div className="service-grid">
          <div className="service-card">
            <div className="service-icon">📅</div>

            <div>
              <h3>Sunday Worship</h3>
              <p>Every Sunday</p>
              <strong>8:00 AM — 11:00 AM</strong>
            </div>
          </div>

          <div className="service-card">
            <div className="service-icon">◷</div>

            <div>
              <h3>Midweek Service</h3>
              <p>Every Wednesday</p>
              <strong>5:00 PM — 7:00 PM</strong>
            </div>
          </div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="welcome-section">
        <div className="welcome-image">
          <div className="image-placeholder">
            <span>CAC LIFEGATE CENTRE</span>
          </div>
        </div>

        <div className="welcome-content">
          <span className="section-label">WELCOME HOME</span>

          <h2>
            More than a church.
            <br />
            <span>A family.</span>
          </h2>

          <p>
            At CAC Lifegate Centre, we believe that church is
            more than a building. It is a community of people
            growing together in faith, love and purpose.
          </p>

          <p>
            Whether you are visiting for the first time or
            looking for a church family, there is a place for you
            here.
          </p>

          <button className="text-btn">
            Learn More
            <span>→</span>
          </button>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="quick-section">
        <div className="section-heading">
          <span>GET CONNECTED</span>
          <h2>Grow With Us</h2>
        </div>

        <div className="quick-grid">

          <div className="quick-card">
            <div className="quick-icon">📖</div>

            <h3>Our Ministries</h3>

            <p>
              Find a ministry where you can serve, grow and
              connect.
            </p>

            <span>→</span>
          </div>

          <div className="quick-card">
            <div className="quick-icon">📅</div>

            <h3>Upcoming Programs</h3>

            <p>
              Stay updated with our church programs and events.
            </p>

            <span>→</span>
          </div>

          <div className="quick-card">
            <div className="quick-icon">♡</div>

            <h3>Prayer Request</h3>

            <p>
              Share your prayer request with our prayer team.
            </p>

            <span>→</span>
          </div>

          <div className="quick-card">
            <div className="quick-icon">👥</div>

            <h3>Connect With Us</h3>

            <p>
              Become part of the Lifegate Centre family.
            </p>

            <span>→</span>
          </div>

        </div>
      </section>

      {/* UPCOMING PROGRAM */}
      <section className="program-section">
        <div className="program-content">

          <span>UPCOMING PROGRAM</span>

          <h2>
            Awakening
            <br />
            <strong>God's People</strong>
          </h2>

          <p>
            Join us for a powerful time of worship, prayer,
            teaching and fellowship.
          </p>

          <div className="program-info">
            <div>
              <span>📅</span>
              <span>Coming Soon</span>
            </div>

            <div>
              <span>📍</span>
              <span>CAC Lifegate Centre</span>
            </div>
          </div>

          <button className="primary-btn">
            View Programs
            <span>→</span>
          </button>

        </div>
      </section>

      {/* SERMON */}
      <section className="sermon-section">
        <div className="section-heading">
          <span>WATCH & LISTEN</span>

          <h2>Latest Sermon</h2>

          <p>
            Be encouraged and strengthened through God's Word.
          </p>
        </div>

        <div className="sermon-card">

          <div className="sermon-thumbnail">
            <div className="play-circle">
              ▶
            </div>
          </div>

          <div className="sermon-info">

            <span>RECENT MESSAGE</span>

            <h3>Walking in God's Purpose</h3>

            <p>
              Discover what it means to live intentionally in
              God's plan for your life.
            </p>

            <button className="text-btn">
              Watch Sermon
              <span>→</span>
            </button>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div>

          <span>YOU ARE WELCOME HERE</span>

          <h2>
            Come as you are.
            <br />
            Leave transformed.
          </h2>

          <p>
            We would love to worship with you.
          </p>

          <button className="primary-btn">
            Plan Your Visit
            <span>→</span>
          </button>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;