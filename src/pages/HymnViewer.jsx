import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HymnViewer() {
  const { number } = useParams();
  const navigate = useNavigate();
  const [hymn, setHymn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHymn = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5001/api/hymns/${number}`
        );

        if (!response.ok) {
          throw new Error("Hymn not found");
        }

        const data = await response.json();
        setHymn(data);
      } catch (error) {
        console.error(error);
        setError("Hymn not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchHymn();
  }, [number]);

  const changeHymn = (newNumber) => {
    navigate(`/hymns/${newNumber}`);
  };

  if (loading) {
    return (
      <>
        <Navbar variant="hymn-navbar" />

        <main className="hymn-viewer">
          <div className="hymn-viewer-message">
            <h2>Loading hymn...</h2>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  if (error || !hymn) {
    return (
      <>
        <Navbar variant="hymn-navbar" />

        <main className="hymn-viewer">
          <div className="hymn-viewer-message">
            <h2>Hymn not found</h2>
            <p>
              The hymn you're looking for doesn't exist.
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar variant="hymn-navbar" />

      <main className="hymn-viewer">
        <div className="hymn-viewer-top">
          <span>
            HYMN {hymn.number}
          </span>
        </div>

        <section className="hymn-content">
          <div className="hymn-category">
            {hymn.category}
          </div>

          <h1>{hymn.title}</h1>

          <div className="hymn-divider"></div>

          <div className="hymn-lyrics">
            {hymn.lyrics.split("\n").map((line, index) => (
              <p key={index}>
                {line || "\u00A0"}
              </p>
            ))}
          </div>

          {hymn.audioUrl && (
            <div className="hymn-audio">
              <audio controls src={hymn.audioUrl}>
                Your browser does not support audio playback.
              </audio>
            </div>
          )}
        </section>

        <div className="hymn-navigation">
          <button
            onClick={() =>
              changeHymn(Math.max(1, hymn.number - 1))
            }
            disabled={hymn.number <= 1}
          >
            ← Previous
          </button>

          <Link to="/hymns">
            All Hymns
          </Link>

          <button
            onClick={() =>
              changeHymn(hymn.number + 1)
            }
          >
            Next →
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default HymnViewer;