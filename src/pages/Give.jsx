import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

function Give() {
  return (
    <div className="inner-page">

      <Navbar />

      <PageHero
        label="GIVE"
        title="Give With Purpose"
        description="Your generosity helps support the work of God and the people we serve."
      />

      <section className="give-section">

        <div className="give-intro">

          <span className="section-label">
            GENEROSITY
          </span>

          <h2>
            Giving is an act
            <span> of worship.</span>
          </h2>

          <p>
            Everything we have comes from God. Through giving,
            we participate in His work and help create opportunities
            for people to encounter Christ.
          </p>

        </div>

        <div className="giving-options">

          <div className="giving-card">
            <span>01</span>
            <h3>Tithe</h3>
            <p>
              Give your tithe as an expression of obedience and gratitude.
            </p>
            <button className="primary-btn">
              Give Online →
            </button>
          </div>

          <div className="giving-card">
            <span>02</span>
            <h3>Offering</h3>
            <p>
              Support the work of the church through your freewill offering.
            </p>
            <button className="primary-btn">
              Give Online →
            </button>
          </div>

          <div className="giving-card">
            <span>03</span>
            <h3>Special Giving</h3>
            <p>
              Support special programs, missions and church projects.
            </p>
            <button className="primary-btn">
              Give Online →
            </button>
          </div>

        </div>

      </section>

      <section className="scripture-section">

        <div>
          <span>SCRIPTURE</span>

          <h2>
            "God loves a cheerful giver."
          </h2>

          <p>
            2 Corinthians 9:7
          </p>
        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Give;