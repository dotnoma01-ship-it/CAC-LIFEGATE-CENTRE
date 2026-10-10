import HeroSlider from "../components/HeroSlider";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "https://cac-lifegate-backend.onrender.com/api";

function Sermons() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/sermons`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load sermons."
        );
      }

      setSermons(data);
    } catch (err) {
      console.error("Failed to fetch sermons:", err);

      setError(
        "Unable to load sermons right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inner-page">
      <Navbar />

      <HeroSlider
      title="SERMONS"
      description="Listen to God's Word and grow deeper in faith through our sermons and teachings."
      showButtons={false}
/>

      <section className="sermons-section">
        <div className="section-heading">
          <span>MESSAGES</span>
          <h2>Latest Sermons</h2>
        </div>

        {loading && (
          <div className="sermons-status">
            <p>Loading sermons...</p>
          </div>
        )}

        {!loading && error && (
          <div className="sermons-status sermons-error">
            <p>{error}</p>

            <button
              className="primary-btn"
              type="button"
              onClick={fetchSermons}
            >
              Try Again &#8594;
            </button>
          </div>
        )}

        {!loading && !error && sermons.length === 0 && (
          <div className="sermons-status">
            <p>
              No sermons are available at the moment.
            </p>
          </div>
        )}

        {!loading && !error && sermons.length > 0 && (
          <div className="sermons-grid">
            {sermons.map((sermon) => (
              <article
                className="sermon-page-card"
                key={sermon._id}
              >
                <div
                  className="sermon-page-thumbnail"
                  style={
                    sermon.thumbnailUrl
                      ? {
                          backgroundImage: `url(${sermon.thumbnailUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                >
                  <div className="play-circle">
                    &#9654;
                  </div>
                </div>

                <div className="sermon-page-content">
                  <span>
                    {sermon.category || "Sermon"}
                  </span>

                  <h3>{sermon.title}</h3>

                  <p>
                    {sermon.preacher ||
                      "CAC Lifegate Centre"}
                  </p>

                  {sermon.description && (
                    <p>
                      {sermon.description}
                    </p>
                  )}

                  {sermon.videoUrl ? (
                    <a
                      className="primary-btn"
                      href={sermon.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Sermon &#8594;
                    </a>
                  ) : sermon.audioUrl ? (
                    <a
                      className="primary-btn"
                      href={sermon.audioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Listen to Sermon &#8594;
                    </a>
                  ) : (
                    <button
                      className="primary-btn"
                      type="button"
                      disabled
                    >
                      Sermon Available Soon
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="cta-section">
        <div>
          <span>NEVER MISS A MESSAGE</span>

          <h2>
            Stay connected
            <br />
            with God's Word.
          </h2>

          <p>
            Follow our latest messages and teachings.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Sermons;

