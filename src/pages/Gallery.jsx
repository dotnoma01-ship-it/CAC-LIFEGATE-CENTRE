import HeroSlider from "../components/HeroSlider";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "https://cac-lifegate-backend.onrender.com/api";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/gallery`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load gallery."
        );
      }

      setImages(data);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);

      setError(
        "Unable to load the gallery right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inner-page">
      <Navbar />

      <HeroSlider
      title="OUR GALLERY"
      description="Explore moments of worship, fellowship, and celebration at CAC Lifegate Centre."
      showButtons={false}
/>

      <section className="gallery-section">
        <div className="section-heading">
          <span>OUR MEMORIES</span>
          <h2>Life At Lifegate</h2>
        </div>

        {loading && (
          <div className="gallery-status">
            <p>Loading gallery...</p>
          </div>
        )}

        {!loading && error && (
          <div className="gallery-status gallery-error">
            <p>{error}</p>

            <button
              className="primary-btn"
              type="button"
              onClick={fetchGallery}
            >
              Try Again &#8594;
            </button>
          </div>
        )}

        {!loading && !error && images.length === 0 && (
          <div className="gallery-status">
            <p>
              No gallery images are available at the moment.
            </p>
          </div>
        )}

        {!loading && !error && images.length > 0 && (
          <div className="gallery-grid">
            {images.map((image) => (
              <div
                className="gallery-item"
                key={image._id}
              >
                <img
                  src={image.imageUrl}
                  alt={
                    image.title ||
                    "CAC Lifegate Centre"
                  }
                  loading="lazy"
                />

                <div className="gallery-caption">
                  {image.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Gallery;

