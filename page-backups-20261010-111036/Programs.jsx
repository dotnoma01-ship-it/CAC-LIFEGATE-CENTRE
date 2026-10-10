import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const API_URL = "https://cac-lifegate-backend.onrender.com/api";

function Programs() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/events`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load events."
        );
      }

      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events:", err);

      setError(
        "Unable to load events right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatMonth = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date)
      .toLocaleDateString("en-US", {
        month: "short",
      })
      .toUpperCase();
  };

  const formatDay = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
    });
  };

  return (
    <div className="inner-page">
      <Navbar />

      <PageHero
        label="WHAT'S HAPPENING"
        title="Programs & Events"
        description="Stay connected with what's happening at CAC Lifegate Centre."
      />

      <section className="events-section">
        <div className="section-heading">
          <span>UPCOMING</span>
          <h2>Events & Programs</h2>
        </div>

        {loading && (
          <div className="events-status">
            <p>Loading events...</p>
          </div>
        )}

        {!loading && error && (
          <div className="events-status events-error">
            <p>{error}</p>

            <button
              className="text-btn"
              onClick={fetchEvents}
            >
              Try Again →
            </button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="events-status">
            <p>
              There are no upcoming events at the moment.
            </p>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="events-list">
            {events.map((event) => (
              <article
                className="event-card"
                key={event._id}
              >
                <div className="event-date">
                  <span>
                    {formatMonth(event.date)}
                  </span>

                  <strong>
                    {formatDay(event.date)}
                  </strong>
                </div>

                <div className="event-content">
                  <span>
                    {event.category || "Church Event"}
                  </span>

                  <h3>{event.title}</h3>

                  <p>{event.description}</p>

                  {event.time && (
                    <p>
                      <strong>Time:</strong>{" "}
                      {event.time}
                    </p>
                  )}

                  {event.location && (
                    <p>
                      <strong>Location:</strong>{" "}
                      {event.location}
                    </p>
                  )}

                  <button
                    className="text-btn"
                    type="button"
                  >
                    View Details →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Programs;