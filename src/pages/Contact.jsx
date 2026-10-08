import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

function Contact() {
  return (
    <div className="inner-page">

      <Navbar />

      <PageHero
        label="GET IN TOUCH"
        title="Contact Us"
        description="We would love to hear from you and welcome you to CAC Lifegate Centre."
      />

      <section className="contact-section">

        <div className="contact-info">

          <span className="section-label">
            COME VISIT US
          </span>

          <h2>
            We'd love to
            <span> meet you.</span>
          </h2>

          <p>
            Have a question, need directions or want to learn more
            about CAC Lifegate Centre? Get in touch with us.
          </p>

          <div className="contact-item">
            <div className="contact-icon">📍</div>

            <div>
              <strong>Address</strong>
              <p>
                CAC Lifegate Centre
                <br />
                Church address coming soon
              </p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">☎</div>

            <div>
              <strong>Phone</strong>
              <p>
                Phone number coming soon
              </p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">✉</div>

            <div>
              <strong>Email</strong>
              <p>
                Email address coming soon
              </p>
            </div>
          </div>

        </div>

        <form className="contact-form">

          <h3>Send Us A Message</h3>

          <div className="form-group">
            <label>Your Name</label>

            <input
              type="text"
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label>Subject</label>

            <input
              type="text"
              placeholder="How can we help?"
            />
          </div>

          <div className="form-group">
            <label>Message</label>

            <textarea
              rows="6"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="primary-btn"
          >
            Send Message →
          </button>

        </form>

      </section>

      <section className="map-section">

        <div>
          <span>FIND US</span>

          <h2>
            Your church
            <br />
            family awaits.
          </h2>

          <p>
            Our exact location will be added here.
          </p>
        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Contact;