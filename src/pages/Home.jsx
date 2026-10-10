import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "https://cac-lifegate-backend.onrender.com";

// ADDED: Hero slideshow images
const heroImages = [
  "/images/church-family.jpeg",
  "/images/pastor.jpeg",
];

function Home() {
  const [program, setProgram] = useState(null);
  const [sermon, setSermon] = useState(null);
  const [loadingProgram, setLoadingProgram] = useState(true);
  const [loadingSermon, setLoadingSermon] = useState(true);

  // ADDED: Current hero slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // ADDED: Automatically change the hero image every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((previousSlide) =>
        (previousSlide + 1) % heroImages.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Convert uploaded image URLs to HTTPS and handle relative paths.
  const getImageUrl = (url) => {
    if (!url || typeof url !== "string") return "";

    const imageUrl = url.trim();

    if (!imageUrl) return "";

    if (imageUrl.startsWith("data:")) {
      return imageUrl;
    }

    if (imageUrl.startsWith("http://")) {
      return imageUrl.replace(/^http:\/\//i, "https://");
    }

    if (imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    if (imageUrl.startsWith("/")) {
      return `${API_URL}${imageUrl}`;
    }

    return `${API_URL}/${imageUrl}`;
  };

  // Load the nearest upcoming program.
  useEffect(() => {
    let cancelled = false;

    const loadPrograms = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events`);

        if (!response.ok) {
          throw new Error("Unable to load programs");
        }

        const result = await response.json();

        const events = Array.isArray(result)
          ? result
          : result.value || result.events || [];

        // Compare calendar dates so an event happening today
        // remains eligible even if its date has already passed by hours.
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingEvents = events
          .filter((event) => {
            if (!event.date) return false;

            const eventDate = new Date(event.date);

            if (Number.isNaN(eventDate.getTime())) {
              return false;
            }

            eventDate.setHours(0, 0, 0, 0);

            return eventDate >= today;
          })
          .sort(
            (a, b) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          );

        if (!cancelled) {
          setProgram(upcomingEvents[0] || null);
        }
      } catch (error) {
        console.error("Error loading programs:", error);

        if (!cancelled) {
          setProgram(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingProgram(false);
        }
      }
    };

    loadPrograms();

    return () => {
      cancelled = true;
    };
  }, []);

  // Load the most recently uploaded sermon.
  useEffect(() => {
    let cancelled = false;

    const loadSermons = async () => {
      try {
        const response = await fetch(`${API_URL}/api/sermons`);

        if (!response.ok) {
          throw new Error("Unable to load sermons");
        }

        const result = await response.json();

        const sermons = Array.isArray(result)
          ? result
          : result.value || result.sermons || [];

        const latestSermon = [...sermons].sort((a, b) => {
          const dateA = new Date(
            a.createdAt || a.date || 0
          ).getTime();

          const dateB = new Date(
            b.createdAt || b.date || 0
          ).getTime();

          return dateB - dateA;
        })[0];

        if (!cancelled) {
          setSermon(latestSermon || null);
        }
      } catch (error) {
        console.error("Error loading sermons:", error);

        if (!cancelled) {
          setSermon(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingSermon(false);
        }
      }
    };

    loadSermons();

    return () => {
      cancelled = true;
    };
  }, []);

  // Format dates for display.
  const formatDate = (date) => {
    if (!date) return "Date to be announced";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date to be announced";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ADDED: Move to the previous hero image
  const previousSlide = () => {
    setCurrentSlide(
      (currentSlide - 1 + heroImages.length) % heroImages.length
    );
  };

  // ADDED: Move to the next hero image
  const nextSlide = () => {
    setCurrentSlide(
      (currentSlide + 1) % heroImages.length
    );
  };

  return (
    <div className="home-page">
      <Navbar />

      {/* HERO — slideshow added; existing text and links preserved */}
      <section
        className="hero"
        style={{
          backgroundImage: `url("${heroImages[currentSlide]}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "background-image 0.6s ease-in-out",
        }}
      >
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
            <Link to="/contact" className="primary-btn">
              Join Us <span>→</span>
            </Link>

            <Link to="/sermons" className="secondary-btn">
              <span>▶</span> Watch Sermon
            </Link>
          </div>
        </div>

        {/* ADDED: Previous slide button */}
        <button
          type="button"
          className="hero-arrow hero-arrow-left"
          onClick={previousSlide}
          aria-label="Previous slide"
        >
          &#10094;
        </button>

        {/* ADDED: Next slide button */}
        <button
          type="button"
          className="hero-arrow hero-arrow-right"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#10095;
        </button>

        {/* ADDED: Slide indicators */}
        <div className="hero-dots">
          {heroImages.map((image, index) => (
            <button
              key={image}
              type="button"
              className={`hero-dot ${
                currentSlide === index ? "active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? "true" : undefined}
            />
          ))}
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
          <h2>Our Weekly Services</h2>
          <p>
            Join us every week for God's Word, prayer, fellowship,
            and spiritual growth.
          </p>
        </div>

        <div className="service-grid">
          <div className="service-card">
            <div className="service-icon">📅</div>
            <div>
              <h3>Sunday Worship</h3>
              <p>Every Sunday</p>
              <strong>8:00 AM — 11:30 AM</strong>
            </div>
          </div>

          <div className="service-card">
            <div className="service-icon">📖</div>
            <div>
              <h3>Bible Study</h3>
              <p>Every Tuesday</p>
              <strong>6:00 PM — 8:00 PM</strong>
            </div>
          </div>

          <div className="service-card">
            <div className="service-icon">🙏</div>
            <div>
              <h3>Prayer Connect</h3>
              <p>Every Friday</p>
              <strong>6:00 PM — 8:00 PM</strong>
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

          <Link to="/about" className="text-btn">
            Learn More <span>→</span>
          </Link>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="quick-section">
        <div className="section-heading">
          <span>GET CONNECTED</span>
          <h2>Grow With Us</h2>
        </div>

        <div className="quick-grid">
          <Link to="/ministries" className="quick-card">
            <div className="quick-icon">📖</div>
            <h3>Our Ministries</h3>
            <p>
              Find a ministry where you can serve, grow and
              connect.
            </p>
            <span>→</span>
          </Link>

          <Link to="/programs" className="quick-card">
            <div className="quick-icon">📅</div>
            <h3>Upcoming Programs</h3>
            <p>
              Stay updated with our church programs and events.
            </p>
            <span>→</span>
          </Link>

          <Link to="/prayer" className="quick-card">
            <div className="quick-icon">♡</div>
            <h3>Prayer Request</h3>
            <p>
              Share your prayer request with our prayer team.
            </p>
            <span>→</span>
          </Link>

          <Link to="/contact" className="quick-card">
            <div className="quick-icon">👥</div>
            <h3>Connect With Us</h3>
            <p>
              Become part of the Lifegate Centre family.
            </p>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* DYNAMIC UPCOMING PROGRAM */}
      <section
        className="program-section"
        style={{
          backgroundImage: program?.imageUrl
            ? `linear-gradient(rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.68)), url("${getImageUrl(program.imageUrl)}")`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="program-content">
          <span>UPCOMING PROGRAM</span>

          {loadingProgram ? (
            <h2>Loading upcoming program...</h2>
          ) : program ? (
            <>
              <h2>{program.title}</h2>

              <p>
                {program.description ||
                  "Join us for a time of worship, prayer, teaching and fellowship."}
              </p>

              <div className="program-info">
                <div>
                  <span>📅</span>
                  <span>{formatDate(program.date)}</span>
                </div>

                {program.time && (
                  <div>
                    <span>◷</span>
                    <span>{program.time}</span>
                  </div>
                )}

                {program.location && (
                  <div>
                    <span>📍</span>
                    <span>{program.location}</span>
                  </div>
                )}
              </div>

              <Link to="/programs" className="primary-btn">
                View Programs <span>→</span>
              </Link>
            </>
          ) : (
            <>
              <h2>Stay Connected</h2>

              <p>
                There are no upcoming programs announced at the moment.
                Please check back soon.
              </p>

              <Link to="/programs" className="primary-btn">
                View Programs <span>→</span>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* DYNAMIC LATEST SERMON */}
      <section className="sermon-section">
        <div className="section-heading">
          <span>WATCH & LISTEN</span>
          <h2>Latest Sermon</h2>
          <p>
            Be encouraged and strengthened through God's Word.
          </p>
        </div>

        {loadingSermon ? (
          <div className="sermon-card">
            <div className="sermon-info">
              <h3>Loading latest sermon...</h3>
            </div>
          </div>
        ) : sermon ? (
          <div className="sermon-card">
            <div
              className="sermon-thumbnail"
              style={{
                backgroundImage: sermon.thumbnailUrl
                  ? `url("${getImageUrl(sermon.thumbnailUrl)}")`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {!sermon.thumbnailUrl && (
                <div className="play-circle">▶</div>
              )}
            </div>

            <div className="sermon-info">
              <span>RECENT MESSAGE</span>
              <h3>{sermon.title}</h3>

              {sermon.preacher && (
                <p>By {sermon.preacher}</p>
              )}

              {sermon.description && (
                <p>{sermon.description}</p>
              )}

              <Link to="/sermons" className="text-btn">
                Watch Sermon <span>→</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="sermon-card">
            <div className="sermon-info">
              <h3>No sermon uploaded yet</h3>

              <p>
                Our latest messages will appear here when they are
                uploaded.
              </p>

              <Link to="/sermons" className="text-btn">
                Browse Sermons <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <div>
          <span>YOU ARE WELCOME HERE</span>

          <h2>
            Come as you are.
            <br />
            Leave transformed.
          </h2>

          <p>We would love to worship with you.</p>

          <Link to="/contact" className="primary-btn">
            Plan Your Visit <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;