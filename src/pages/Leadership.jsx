import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const leaders = [
  {
    name: "Senior Pastor",
    role: "Lead Pastor",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Church Leadership",
    role: "Ministry Leadership",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Ministry Team",
    role: "Service & Administration",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=80"
  }
];

function Leadership() {
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
            Our leaders are committed to serving the church and
            helping people grow in their relationship with God.
          </p>
        </div>

        <div className="leaders-grid">

          {leaders.map((leader) => (
            <article className="leader-card" key={leader.name}>

              <img
                src={leader.image}
                alt={leader.name}
              />

              <div className="leader-info">

                <span>{leader.role}</span>

                <h3>{leader.name}</h3>

                <p>
                  Serving the Lifegate Centre family.
                </p>

              </div>

            </article>
          ))}

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Leadership;