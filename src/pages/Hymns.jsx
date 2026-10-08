import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Hymns() {
  const [search, setSearch] = useState("");

  const hymns = [
    {
      number: 1,
      title: "All Hail the Power of Jesus' Name",
      category: "Praise",
    },
    {
      number: 2,
      title: "Amazing Grace",
      category: "Grace",
    },
    {
      number: 3,
      title: "How Great Thou Art",
      category: "Worship",
    },
    {
      number: 4,
      title: "Great Is Thy Faithfulness",
      category: "Faith",
    },
    {
      number: 5,
      title: "Blessed Assurance",
      category: "Assurance",
    },
    {
      number: 6,
      title: "Holy, Holy, Holy",
      category: "Worship",
    },
  ];

  const filteredHymns = hymns.filter((hymn) =>
    `${hymn.number} ${hymn.title} ${hymn.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="page-hero-overlay"></div>

        <div className="page-hero-content">
          <span>WORSHIP THROUGH SONG</span>

          <h1>Hymns</h1>

          <p>
            Explore hymns of faith, worship, praise and
            devotion.
          </p>
        </div>
      </section>

      <main className="hymns-section">

        <div className="section-heading centered">

          <span className="section-label">
            HYMN LIBRARY
          </span>

          <h2>
            Sing With Us
          </h2>

          <p>
            Find a hymn by number, title or category.
          </p>

        </div>


        <div className="hymn-search">

          <input
            type="text"
            placeholder="Search hymns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <div className="hymns-grid">

          {filteredHymns.length > 0 ? (
            filteredHymns.map((hymn) => (

              <Link
                to={`/hymns/${hymn.number}`}
                className="hymn-card"
                key={hymn.number}
              >

                <div className="hymn-number">
                  {hymn.number}
                </div>

                <div className="hymn-info">

                  <span>
                    {hymn.category}
                  </span>

                  <h3>
                    {hymn.title}
                  </h3>

                </div>

                <div className="hymn-arrow">
                  →
                </div>

              </Link>

            ))
          ) : (

            <div className="no-hymns">
              <h3>No hymns found</h3>

              <p>
                Try searching for another hymn.
              </p>
            </div>

          )}

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Hymns;