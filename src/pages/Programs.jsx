import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const events = [
  {
    month: "COMING",
    day: "SOON",
    title: "Awakening God's People",
    category: "Special Program",
    description:
      "A powerful gathering of worship, prayer, teaching and fellowship."
  },
  {
    month: "SUN",
    day: "01",
    title: "Sunday Worship Service",
    category: "Weekly Service",
    description:
      "Join us for worship, the Word and fellowship."
  },
  {
    month: "WED",
    day: "05",
    title: "Midweek Service",
    category: "Weekly Service",
    description:
      "A time of prayer, teaching and spiritual growth."
  }
];

function Programs() {
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

        <div className="events-list">

          {events.map((event) => (
            <article className="event-card" key={event.title}>

              <div className="event-date">
                <span>{event.month}</span>
                <strong>{event.day}</strong>
              </div>

              <div className="event-content">

                <span>{event.category}</span>

                <h3>{event.title}</h3>

                <p>{event.description}</p>

                <button className="text-btn">
                  View Details →
                </button>

              </div>

            </article>
          ))}

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Programs;