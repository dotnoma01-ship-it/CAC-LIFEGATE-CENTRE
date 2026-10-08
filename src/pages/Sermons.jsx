import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const sermons = [
  {
    title: "Walking in God's Purpose",
    speaker: "CAC Lifegate Centre",
    category: "Faith & Purpose"
  },
  {
    title: "The Power of Prayer",
    speaker: "CAC Lifegate Centre",
    category: "Prayer"
  },
  {
    title: "Growing in Faith",
    speaker: "CAC Lifegate Centre",
    category: "Spiritual Growth"
  }
];

function Sermons() {
  return (
    <div className="inner-page">

      <Navbar />

      <PageHero
        label="WATCH & LISTEN"
        title="Sermons"
        description="Be encouraged, challenged and strengthened through God's Word."
      />

      <section className="sermons-section">

        <div className="section-heading">
          <span>MESSAGES</span>
          <h2>Latest Sermons</h2>
        </div>

        <div className="sermons-grid">

          {sermons.map((sermon) => (
            <article className="sermon-page-card" key={sermon.title}>

              <div className="sermon-page-thumbnail">
                <div className="play-circle">
                  ▶
                </div>
              </div>

              <div className="sermon-page-content">

                <span>{sermon.category}</span>

                <h3>{sermon.title}</h3>

                <p>
                  {sermon.speaker}
                </p>

                <button className="primary-btn">
                  Watch Sermon →
                </button>

              </div>

            </article>
          ))}

        </div>

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