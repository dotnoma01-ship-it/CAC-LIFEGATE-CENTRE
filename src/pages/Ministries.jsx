import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const ministries = [
  {
    title: "Youth Ministry",
    text: "Helping young people grow in faith, purpose and leadership."
  },
  {
    title: "Children's Ministry",
    text: "Creating a strong foundation of faith for the next generation."
  },
  {
    title: "Men's Ministry",
    text: "Building godly men who lead, serve and influence their families and communities."
  },
  {
    title: "Women's Ministry",
    text: "Equipping women to grow spiritually and make an impact."
  },
  {
    title: "Choir & Music",
    text: "Leading the church into worship through music and praise."
  },
  {
    title: "Prayer Ministry",
    text: "Standing together in prayer and seeking God's direction."
  }
];

function Ministries() {
  return (
    <div className="inner-page">

      <Navbar />

      <PageHero
        label="SERVE & GROW"
        title="Our Ministries"
        description="There is a place for everyone to connect, grow and serve."
      />

      <section className="ministries-section">

        <div className="section-heading">
          <span>FIND YOUR PLACE</span>
          <h2>Grow With Us</h2>

          <p>
            Discover a ministry where you can build relationships,
            develop your gifts and serve others.
          </p>
        </div>

        <div className="ministries-grid">

          {ministries.map((ministry, index) => (
            <div className="ministry-card" key={ministry.title}>

              <div className="ministry-number">
                0{index + 1}
              </div>

              <h3>{ministry.title}</h3>

              <p>{ministry.text}</p>

              <button className="text-btn">
                Learn More →
              </button>

            </div>
          ))}

        </div>

      </section>

      <section className="cta-section">
        <div>
          <span>READY TO SERVE?</span>

          <h2>
            Your gifts can
            <br />
            make a difference.
          </h2>

          <p>
            Find a place where you can use your gifts for God's work.
          </p>

          <button className="primary-btn">
            Get Connected →
          </button>
        </div>
      </section>

      <Footer />

    </div>
  );
}

export default Ministries;