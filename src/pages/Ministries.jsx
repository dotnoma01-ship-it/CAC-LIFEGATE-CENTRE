import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const API_URL = "https://cac-lifegate-backend.onrender.com/api";

function Ministries() {
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMinistries();
  }, []);

  const fetchMinistries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/ministries`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load ministries."
        );
      }

      // Only display ministries marked as active.
      const activeMinistries = data.filter(
        (ministry) => ministry.isActive !== false
      );

      setMinistries(activeMinistries);
    } catch (err) {
      console.error(
        "Failed to fetch ministries:",
        err
      );

      setError(
        "Unable to load ministries right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inner-page">
      <Navbar />

      <PageHero
        label="SERVE & GROW"
        title="Our Ministries"
        description="There is a place for everyone to connect, grow and serve."
      />

      <section className="ministries-section">
        <div className="section-heading">
          <span>FIND YOUR PLACE</span>

          <h2>Grow With Us</h2>

          <p>
            Discover a ministry where you can build
            relationships, develop your gifts and serve
            others.
          </p>
        </div>

        {loading && (
          <div className="ministries-status">
            <p>Loading ministries...</p>
          </div>
        )}

        {!loading && error && (
          <div className="ministries-status ministries-error">
            <p>{error}</p>

            <button
              className="primary-btn"
              type="button"
              onClick={fetchMinistries}
            >
              Try Again →
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          ministries.length === 0 && (
            <div className="ministries-status">
              <p>
                Ministry information will be available
                here soon. Please check back later.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          ministries.length > 0 && (
            <div className="ministries-grid">
              {ministries.map((ministry, index) => (
                <div
                  className="ministry-card"
                  key={ministry._id}
                >
                  {ministry.imageUrl ? (
                    <img
                      className="ministry-image"
                      src={ministry.imageUrl}
                      alt={ministry.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="ministry-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  )}

                  <h3>{ministry.name}</h3>

                  <p>{ministry.description}</p>

                  {ministry.leader && (
                    <p className="ministry-leader">
                      <strong>Leader:</strong>{" "}
                      {ministry.leader}
                    </p>
                  )}

                  {ministry.meetingDay && (
                    <p>
                      <strong>Meeting day:</strong>{" "}
                      {ministry.meetingDay}
                    </p>
                  )}

                  {ministry.meetingTime && (
                    <p>
                      <strong>Meeting time:</strong>{" "}
                      {ministry.meetingTime}
                    </p>
                  )}

                  {ministry.location && (
                    <p>
                      <strong>Location:</strong>{" "}
                      {ministry.location}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
      </section>

      <section className="cta-section">
        <div>
          <span>READY TO SERVE?</span>

          <h2>
            Your gifts can
            <br />
            make a difference.
          </h2>

          <p>
            Find a place where you can use your gifts
            for God's work.
          </p>

          <button
            className="primary-btn"
            type="button"
            onClick={() => {
              window.location.href = "/contact";
            }}
          >
            Get Connected →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Ministries;