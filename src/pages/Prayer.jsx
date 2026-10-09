import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const API_URL = "http://localhost:5001/api";

function Prayer() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    request: "",
    wantsContact: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch(`${API_URL}/prayers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          email: formData.email.trim(),
          phone: formData.wantsContact
            ? formData.phone.trim()
            : "",
          request: formData.request.trim(),
          isPrivate: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit your prayer request."
        );
      }

      setMessage(
        "Your prayer request has been submitted successfully. Our prayer team will remember you in prayer."
      );

      setMessageType("success");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        request: "",
        wantsContact: false,
      });
    } catch (error) {
      console.error("Prayer request submission error:", error);

      setMessage(
        error.message ||
          "Something went wrong. Please check your connection and try again."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

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

        <form className="prayer-form" onSubmit={handleSubmit}>
          {message && (
            <div
              role="status"
              aria-live="polite"
              style={{
                padding: "14px 16px",
                marginBottom: "20px",
                borderRadius: "8px",
                background:
                  messageType === "success" ? "#e8f7ee" : "#fdecec",
                color:
                  messageType === "success" ? "#176b38" : "#a12626",
                border:
                  messageType === "success"
                    ? "1px solid #b8e5c7"
                    : "1px solid #f3bcbc",
                lineHeight: "1.6",
              }}
            >
              {message}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Your first name"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Your last name"
                value={formData.lastName}
                onChange={handleChange}
                autoComplete="family-name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
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
            <label htmlFor="request">Prayer Request</label>

            <textarea
              id="request"
              name="request"
              rows="7"
              placeholder="Tell us how we can pray for you..."
              value={formData.request}
              onChange={handleChange}
              required
            />
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="wantsContact"
              checked={formData.wantsContact}
              onChange={handleChange}
            />

            <span>
              I would like someone from the church to contact me.
            </span>
          </label>

          {formData.wantsContact && (
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Prayer Request →"}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}

export default Prayer;