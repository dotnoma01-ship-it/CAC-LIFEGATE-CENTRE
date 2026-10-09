import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const API_URL = "http://localhost:5001/api";

function Leadership() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeadership();
  }, []);

  const fetchLeadership = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/leadership`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load leadership."
        );
      }

      // Display only active leaders.
      const activeLeaders = data
        .filter((leader) => leader.isActive !== false)
        .sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        );

      setLeaders(activeLeaders);
    } catch (err) {
      console.error(
        "Failed to fetch leadership:",
        err
      );

      setError(
        "Unable to load our leadership team right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inner-page">
      <Navbar />

      <PageHero
        label="OUR LEADERS"
        title="Leadership"
        description="Serving God's people with faith, humility and purpose."
      />

      <section className="leadership-section">
        <div className="section-heading">
          <span>MEET THE TEAM</span>

          <h2>Our Leadership</h2>

          <p>
            Our leaders are committed to serving the
            church and helping people grow in their
            relationship with God.
          </p>
        </div>

        {loading && (
          <div className="leadership-status">
            <p>Loading our leadership team...</p>
          </div>
        )}

        {!loading && error && (
          <div className="leadership-status leadership-error">
            <p>{error}</p>

            <button
              className="primary-btn"
              type="button"
              onClick={fetchLeadership}
            >
              Try Again →
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          leaders.length === 0 && (
            <div className="leadership-status">
              <p>
                Our leadership information will be
                available here soon. Please check back
                later.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          leaders.length > 0 && (
            <div className="leaders-grid">
              {leaders.map((leader) => (
                <article
                  className="leader-card"
                  key={leader._id}
                >
                  {leader.imageUrl ? (
                    <img
                      src={leader.imageUrl}
                      alt={leader.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="leader-image-placeholder">
                      <span>
                        {leader.name
                          .trim()
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div className="leader-info">
                    <span>{leader.position}</span>

                    <h3>{leader.name}</h3>

                    <p>
                      {leader.bio ||
                        "Serving the Lifegate Centre family."}
                    </p>

                    {leader.email && (
                      <p>
                        <strong>Email:</strong>{" "}
                        <a href={`mailto:${leader.email}`}>
                          {leader.email}
                        </a>
                      </p>
                    )}

                    {leader.phone && (
                      <p>
                        <strong>Phone:</strong>{" "}
                        <a href={`tel:${leader.phone}`}>
                          {leader.phone}
                        </a>
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
      </section>

      <Footer />
    </div>
  );
}

export default Leadership;