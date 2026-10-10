import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HeroSlider.css";

const heroImages = [
  "/images/church-family.jpeg",
  "/images/pastor.jpeg",
];

function HeroSlider({
  title = "CAC LIFEGATE CENTRE",
  description = "A place where faith grows, lives are transformed, and people encounter God.",
  showButtons = true,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((previousSlide) =>
        (previousSlide + 1) % heroImages.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const previousSlide = () => {
    setCurrentSlide(
      (currentSlide - 1 + heroImages.length) % heroImages.length
    );
  };

  const nextSlide = () => {
    setCurrentSlide(
      (currentSlide + 1) % heroImages.length
    );
  };

  return (
    <section className="hero-slider">
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`hero-slider-image ${
            currentSlide === index ? "active" : ""
          }`}
          style={{ backgroundImage: `url("${image}")` }}
          aria-hidden="true"
        />
      ))}

      <div className="hero-slider-overlay" />

      <div className="hero-slider-content">
        <span className="hero-slider-eyebrow">
          CHRIST APOSTOLIC CHURCH
        </span>

        <h1>{title}</h1>

        <p>{description}</p>

        {showButtons && (
          <div className="hero-slider-buttons">
            <Link to="/contact" className="hero-slider-primary">
              Join Us <span>→</span>
            </Link>

            <Link to="/sermons" className="hero-slider-secondary">
              <span>▶</span> Watch Sermon
            </Link>
          </div>
        )}
      </div>

      <button
        type="button"
        className="hero-slider-arrow hero-slider-prev"
        onClick={previousSlide}
        aria-label="Previous image"
      >
        &#10094;
      </button>

      <button
        type="button"
        className="hero-slider-arrow hero-slider-next"
        onClick={nextSlide}
        aria-label="Next image"
      >
        &#10095;
      </button>

      <div className="hero-slider-dots">
        {heroImages.map((image, index) => (
          <button
            key={image}
            type="button"
            className={`hero-slider-dot ${
              currentSlide === index ? "active" : ""
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to image ${index + 1}`}
            aria-pressed={currentSlide === index}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;