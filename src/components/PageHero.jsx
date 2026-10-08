function PageHero({ label, title, description }) {
  return (
    <section className="page-hero">
      <div className="page-hero-overlay"></div>

      <div className="page-hero-content">
        <span>{label}</span>

        <h1>{title}</h1>

        <p>{description}</p>
      </div>
    </section>
  );
}

export default PageHero;