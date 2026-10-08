import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

function Prayer() {
  return (
    <div className="inner-page">

      <Navbar />

      <PageHero
        label="WE ARE HERE TO PRAY"
        title="Prayer Request"
        description="Whatever you are going through, you don't have to face it alone."
      />

      <section className="prayer-section">

        <div className="prayer-intro">

          <span className="section-label">
            PRAYER CHANGES THINGS
          </span>

          <h2>
            Let us pray
            <span> with you.</span>
          </h2>

          <p>
            Share your prayer request with our prayer team.
            Your request will be treated with care and confidentiality.
          </p>

          <p>
            Whether you are celebrating something wonderful or
            walking through a difficult season, we would be honoured
            to stand with you in prayer.
          </p>

        </div>

        <form className="prayer-form">

          <div className="form-row">

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="Your first name"
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Your last name"
              />
            </div>

          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label>Prayer Request</label>

            <textarea
              rows="7"
              placeholder="Tell us how we can pray for you..."
            ></textarea>
          </div>

          <label className="checkbox-label">
            <input type="checkbox" />

            <span>
              I would like someone from the church to contact me.
            </span>
          </label>

          <button
            type="submit"
            className="primary-btn"
          >
            Submit Prayer Request →
          </button>

        </form>

      </section>

      <Footer />

    </div>
  );
}

export default Prayer;