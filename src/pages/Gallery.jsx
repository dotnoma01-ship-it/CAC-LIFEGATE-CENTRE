import { useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "https://cac-lifegate-backend.onrender.com/api";

function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const [albumResponse, galleryResponse] = await Promise.all([
        fetch(`${API_URL}/albums`),
        fetch(`${API_URL}/gallery`),
      ]);

      const albumData = await albumResponse.json();
      const galleryData = await galleryResponse.json();

      if (!albumResponse.ok) {
        throw new Error("Failed to load photo albums.");
      }

      if (!galleryResponse.ok) {
        throw new Error("Failed to load gallery images.");
      }

      setAlbums(Array.isArray(albumData) ? albumData : []);
      setImages(Array.isArray(galleryData) ? galleryData : []);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
      setError(
        "Unable to load photos right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const closeAlbum = () => {
    setSelectedAlbum(null);
    setSelectedImage(null);
  };

  const allAlbumImages = selectedAlbum?.images || [];

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
          <p>
            Celebrating our worship, fellowship, services, and special events.
          </p>
        </div>

        {loading && (
          <div className="gallery-status">
            <p>Loading our memories...</p>
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

        {!loading && !error && (
          <>
            {/* PHOTO ALBUMS */}
            {albums.length > 0 && (
              <div className="gallery-albums-section">
                <div className="gallery-subheading">
                  <span>EXPLORE OUR EVENTS</span>
                  <h3>Photo Albums</h3>
                  <p>
                    Browse photos from our church services and special events.
                  </p>
                </div>

                <div className="gallery-albums-grid">
                  {albums.map((album) => {
                    const cover =
                      album.coverImage ||
                      album.images?.[0]?.imageUrl;

                    return (
                      <button
                        type="button"
                        className="gallery-album-card"
                        key={album._id}
                        onClick={() => setSelectedAlbum(album)}
                      >
                        <div className="gallery-album-cover">
                          {cover ? (
                            <img
                              src={cover}
                              alt={album.title}
                              loading="lazy"
                            />
                          ) : (
                            <div className="gallery-album-no-cover">
                              CAC Lifegate Centre
                            </div>
                          )}

                          <span className="gallery-album-count">
                            {album.images?.length || 0}{" "}
                            {(album.images?.length || 0) === 1
                              ? "Photo"
                              : "Photos"}
                          </span>
                        </div>

                        <div className="gallery-album-info">
                          <span className="gallery-album-category">
                            {album.category || "Church"}
                          </span>

                          <h4>{album.title}</h4>

                          <p>
                            {album.description ||
                              "Memories from CAC Lifegate Centre."}
                          </p>

                          <span className="gallery-album-link">
                            View Album &#8594;
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* EXISTING GALLERY */}
            {images.length > 0 && (
              <div className="gallery-existing-section">
                <div className="gallery-subheading">
                  <span>CAPTURED MOMENTS</span>
                  <h3>Gallery Highlights</h3>
                </div>

                <div className="gallery-grid">
                  {images.map((image) => (
                    <button
                      type="button"
                      className="gallery-item"
                      key={image._id}
                      onClick={() => setSelectedImage(image)}
                      aria-label={`View ${image.title || "gallery image"}`}
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.title || "CAC Lifegate Centre"}
                        loading="lazy"
                      />

                      {image.title && (
                        <div className="gallery-caption">
                          {image.title}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {albums.length === 0 && images.length === 0 && (
              <div className="gallery-status">
                <p>
                  No gallery photos are available at the moment. Please check
                  back soon.
                </p>
              </div>
            )}
          </>
        )}
      </section>

      {/* ALBUM PHOTO VIEWER */}
      {selectedAlbum && (
        <div
          className="gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selectedAlbum.title}
          onClick={closeAlbum}
        >
          <div
            className="gallery-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gallery-modal-header">
              <div>
                <span className="gallery-album-category">
                  {selectedAlbum.category || "Church"}
                </span>
                <h2>{selectedAlbum.title}</h2>
                {selectedAlbum.description && (
                  <p>{selectedAlbum.description}</p>
                )}
              </div>

              <button
                type="button"
                className="gallery-modal-close"
                onClick={closeAlbum}
                aria-label="Close album"
              >
                &times;
              </button>
            </div>

            {allAlbumImages.length > 0 ? (
              <div className="gallery-modal-grid">
                {allAlbumImages.map((image, index) => (
                  <button
                    type="button"
                    className="gallery-modal-image"
                    key={image._id || image.publicId || image.imageUrl || index}
                    onClick={() => setSelectedImage(image)}
                    aria-label={`View photo ${index + 1}`}
                  >
                    <img
                      src={image.imageUrl}
                      alt={
                        image.caption ||
                        `${selectedAlbum.title} photo ${index + 1}`
                      }
                      loading="lazy"
                    />
                    {image.caption && (
                      <span>{image.caption}</span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="gallery-status">
                <p>This album has no photos yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SINGLE IMAGE VIEWER */}
      {selectedImage && (
        <div
          className="gallery-image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close photo preview"
          >
            &times;
          </button>

          <img
            src={selectedImage.imageUrl}
            alt={selectedImage.caption || selectedImage.title || "Church photo"}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

      <Footer />

      <style>{`
        .gallery-albums-section,
        .gallery-existing-section {
          margin-top: 42px;
        }

        .gallery-subheading {
          margin-bottom: 24px;
        }

        .gallery-subheading > span {
          display: inline-block;
          margin-bottom: 8px;
          color: #126e51;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .gallery-subheading h3 {
          margin: 0 0 8px;
          font-size: clamp(23px, 3vw, 32px);
          color: #17251f;
        }

        .gallery-subheading p {
          color: #68756e;
          line-height: 1.7;
        }

        .gallery-albums-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
          gap: 24px;
        }

        .gallery-album-card {
          padding: 0;
          overflow: hidden;
          border: 1px solid #e5ebe7;
          border-radius: 14px;
          background: #fff;
          color: inherit;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .gallery-album-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(15, 60, 42, 0.1);
        }

        .gallery-album-cover {
          position: relative;
          height: 225px;
          overflow: hidden;
          background: #edf3ef;
        }

        .gallery-album-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .gallery-album-card:hover .gallery-album-cover img {
          transform: scale(1.04);
        }

        .gallery-album-no-cover {
          display: grid;
          place-items: center;
          height: 100%;
          color: #126e51;
          font-weight: 700;
        }

        .gallery-album-count {
          position: absolute;
          right: 12px;
          bottom: 12px;
          padding: 7px 11px;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.75);
          color: #fff;
          font-size: 12px;
        }

        .gallery-album-info {
          padding: 20px;
        }

        .gallery-album-category {
          display: inline-block;
          margin-bottom: 8px;
          color: #126e51;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .gallery-album-info h4 {
          margin: 0 0 10px;
          color: #17251f;
          font-size: 19px;
          line-height: 1.4;
        }

        .gallery-album-info p {
          margin: 0 0 16px;
          color: #68756e;
          font-size: 14px;
          line-height: 1.7;
        }

        .gallery-album-link {
          color: #126e51;
          font-weight: 700;
          font-size: 14px;
        }

        .gallery-modal,
        .gallery-image-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(5, 18, 12, 0.86);
        }

        .gallery-modal-content {
          width: min(100%, 1050px);
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 16px;
          padding: 26px;
          background: #fff;
        }

        .gallery-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .gallery-modal-header h2 {
          margin: 0 0 8px;
          color: #17251f;
          overflow-wrap: anywhere;
        }

        .gallery-modal-header p {
          color: #68756e;
          line-height: 1.7;
        }

        .gallery-modal-close,
        .gallery-lightbox-close {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border: 0;
          border-radius: 50%;
          background: #edf3ef;
          color: #17251f;
          font-size: 30px;
          cursor: pointer;
        }

        .gallery-modal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
          gap: 16px;
        }

        .gallery-modal-image {
          position: relative;
          min-width: 0;
          padding: 0;
          border: 0;
          border-radius: 10px;
          overflow: hidden;
          background: #edf3ef;
          cursor: pointer;
        }

        .gallery-modal-image img {
          display: block;
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .gallery-modal-image > span {
          display: block;
          padding: 10px;
          color: #17251f;
          text-align: left;
        }

        .gallery-image-lightbox {
          z-index: 10000;
        }

        .gallery-image-lightbox > img {
          display: block;
          max-width: 100%;
          max-height: 85vh;
          object-fit: contain;
        }

        .gallery-lightbox-close {
          position: absolute;
          top: 18px;
          right: 18px;
          background: #fff;
        }

        .gallery-item {
          display: block;
          width: 100%;
          padding: 0;
          border: 0;
          background: transparent;
          text-align: left;
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .gallery-modal {
            padding: 10px;
          }

          .gallery-modal-content {
            padding: 16px;
            max-height: 94vh;
          }

          .gallery-album-cover {
            height: 210px;
          }

          .gallery-modal-image img {
            height: 180px;
          }
        }
      `}</style>
    </div>
  );
}

export default Gallery;