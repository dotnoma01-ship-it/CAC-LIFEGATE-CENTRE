import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const images = [
  {
    src: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=80",
    title: "Worship"
  },
  {
    src: "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=900&q=80",
    title: "Church Gathering"
  },
  {
    src: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=900&q=80",
    title: "Prayer"
  },
  {
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
    title: "Fellowship"
  },
  {
    src: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=900&q=80",
    title: "Community"
  },
  {
    src: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=900&q=80",
    title: "Celebration"
  }
];

function Gallery() {
  return (
    <div className="inner-page">

      <Navbar />

      <PageHero
        label="MOMENTS"
        title="Gallery"
        description="A glimpse into life, worship and fellowship at Lifegate Centre."
      />

      <section className="gallery-section">

        <div className="section-heading">
          <span>OUR MEMORIES</span>
          <h2>Life At Lifegate</h2>
        </div>

        <div className="gallery-grid">

          {images.map((image) => (
            <div className="gallery-item" key={image.title}>

              <img
                src={image.src}
                alt={image.title}
              />

              <div className="gallery-caption">
                {image.title}
              </div>

            </div>
          ))}

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Gallery;