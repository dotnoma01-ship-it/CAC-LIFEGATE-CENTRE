import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "https://cac-lifegate-backend.onrender.com/api";

function Hymns() {
  const [hymns, setHymns] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHymns = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/hymns`);

      if (!response.ok) {
        throw new Error("Failed to fetch hymns.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid hymns response.");
      }

      // Sort hymns numerically.
      const sortedHymns = [...data].sort(
        (a, b) => Number(a.number) - Number(b.number)
      );

      setHymns(sortedHymns);
    } catch (err) {
      console.error("Failed to fetch hymns:", err);
      setError("Unable to load hymns right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHymns();
  }, [fetchHymns]);

  const filteredHymns = hymns.filter((hymn) =>
    `${hymn.number ?? ""} ${hymn.title ?? ""} ${hymn.category ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="page-hero-overlay"></div>

        <div className="page-hero-content">
          <span>WORSHIP THROUGH SONG</span>

          <h1>Hymns</h1>

          <p>
            Explore hymns of faith, worship, praise and devotion.
          </p>
        </div>
      </section>

      <main className="hymns-section">
        <div className="section-heading centered">
          <span className="section-label">
            HYMN LIBRARY
          </span>

          <h2>Sing With Us</h2>

          <p>
            Find a hymn by number, title or category.
          </p>
        </div>

        <div className="hymn-search">
          <input
            type="text"
            placeholder="Search hymns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search hymns by number, title, or category"
          />
        </div>

        {loading && (
          <div className="no-hymns">
            <h3>Loading hymns...</h3>
            <p>Please wait while we load the hymn library.</p>
          </div>
        )}

        {!loading && error && (
          <div className="no-hymns">
            <h3>{error}</h3>

            <p>
              Check your internet connection and make sure the
              CAC Lifegate backend is running.
            </p>

            <button
              type="button"
              className="primary-btn"
              onClick={fetchHymns}
            >
              Try Again →
            </button>
          </div>
        )}

        {!loading && !error && hymns.length === 0 && (
          <div className="no-hymns">
            <h3>No hymns available yet</h3>

            <p>
              New hymns added by the church administrator will
              appear here.
            </p>
          </div>
        )}

        {!loading && !error && hymns.length > 0 && (
          <div className="hymns-grid">
            {filteredHymns.length > 0 ? (
              filteredHymns.map((hymn) => (
                <Link
                  to={`/hymns/${hymn.number}`}
                  className="hymn-card"
                  key={hymn._id}
                >
                  <div className="hymn-number">
                    {hymn.number}
                  </div>

                  <div className="hymn-info">
                    <span>
                      {hymn.category || "General"}
                    </span>

                    <h3>{hymn.title}</h3>
                  </div>

                  <div className="hymn-arrow">
                    →
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-hymns">
                <h3>No hymns found</h3>

                <p>
                  Try searching with another number, title,
                  or category.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Hymns;