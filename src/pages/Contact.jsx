import HeroSlider from "../components/HeroSlider";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "https://cac-lifegate-backend.onrender.com/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    type: "",
    text: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setFeedback({ type: "", text: "" });

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to send your message. Please try again."
        );
      }

      setFeedback({
        type: "success",
        text: "Your message has been sent successfully! Thank you for contacting CAC Lifegate Centre. We appreciate hearing from you.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form submission error:", error);

      setFeedback({
        type: "error",
        text:
          error.message ||
          "Something went wrong. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="inner-page">
      <Navbar />

      <HeroSlider
      title="CONTACT US"
      description="We would love to hear from you. Connect with CAC Lifegate Centre."
      showButtons={false}
/>

      <section className="contact-section">
        <div className="contact-info">
          <span className="section-label">COME VISIT US</span>

          <h2>
            We'd love to
            <span> meet you.</span>
          </h2>

          <p>
            Have a question, need directions or want to learn more
            about CAC Lifegate Centre? Get in touch with us.
          </p>

          <div className="contact-item">
            <div className="contact-icon">ðŸ“</div>

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
            <div className="contact-icon">&#9742;</div>

            <div>
              <strong>Phone</strong>
              <p>Phone number coming soon</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">&#9993;</div>

            <div>
              <strong>Email</strong>
              <p>Email address coming soon</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send Us A Message</h3>

          {feedback.text && (
            <div
              role="status"
              aria-live="polite"
              style={{
                padding: "14px 16px",
                marginBottom: "20px",
                borderRadius: "8px",
                lineHeight: "1.6",
                background:
                  feedback.type === "success" ? "#e8f7ee" : "#fdecec",
                color:
                  feedback.type === "success" ? "#176b38" : "#a12626",
                border:
                  feedback.type === "success"
                    ? "1px solid #b8e5c7"
                    : "1px solid #f3bcbc",
              }}
            >
              {feedback.text}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="contact-name">Your Name</label>

            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">Email Address</label>

            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-subject">Subject</label>

            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="How can we help?"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">Message</label>

            <textarea
              id="contact-message"
              name="message"
              rows="6"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message &#8594;"}
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

          <p>Our exact location will be added here.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;

