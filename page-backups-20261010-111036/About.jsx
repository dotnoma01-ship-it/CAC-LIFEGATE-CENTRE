import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

function About() {
  return (
    <div className="inner-page">

      <Navbar />

      <PageHero
        label="WHO WE ARE"
        title="About CAC Lifegate Centre"
        description="A family of believers committed to knowing God, growing in faith and serving His purpose."
      />

      <section className="content-section">

        <div className="content-grid">

          <div>
            <span className="section-label">WELCOME HOME</span>

            <h2>
              A church where
              <span> people belong.</span>
            </h2>
          </div>

          <div>
            <p>
              CAC Lifegate Centre is a Christ-centered church
              committed to helping people encounter God and grow
              in their relationship with Him.
            </p>

            <p>
              We believe that the church is more than a building.
              It is a family where people can worship, learn,
              serve, build relationships and discover their purpose.
            </p>

            <p>
              Whether you are new to the Christian faith, returning
              to church or searching for a church family, you are
              welcome at Lifegate Centre.
            </p>
          </div>

        </div>

      </section>

      <section className="values-section">

        <div className="section-heading">
          <span>WHAT GUIDES US</span>
          <h2>Our Values</h2>
        </div>

        <div className="values-grid">

          <div className="value-card">
            <div className="value-number">01</div>
            <h3>Faith</h3>
            <p>
              We trust God and build our lives around His Word.
            </p>
          </div>

          <div className="value-card">
            <div className="value-number">02</div>
            <h3>Love</h3>
            <p>
              We demonstrate Christ's love through how we treat
              and serve one another.
            </p>
          </div>

          <div className="value-card">
            <div className="value-number">03</div>
            <h3>Service</h3>
            <p>
              We believe every believer has something valuable
              to contribute to God's work.
            </p>
          </div>

          <div className="value-card">
            <div className="value-number">04</div>
            <h3>Purpose</h3>
            <p>
              We help people discover and live out God's purpose
              for their lives.
            </p>
          </div>

        </div>

      </section>

      <section className="scripture-section">
        <div>
          <span>OUR HEART</span>

          <h2>
            "One fold, one shepherd."
          </h2>

          <p>
            John 10:16
          </p>
        </div>
      </section>

      <Footer />

    </div>
  );
}

export default About;