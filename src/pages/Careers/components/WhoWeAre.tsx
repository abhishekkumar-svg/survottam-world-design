const teamImages = [
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80",
];

const WhoWeAre = () => {
  return (
    <section className="careers-who">
      <div className="careers-container careers-who-grid">
        <div className="careers-photo-grid">
          {teamImages.map((image, index) => (
            <div
              className={`careers-photo careers-photo-${index + 1}`}
              key={image}
            >
              <img src={image} alt="Sarvottam World team" />
            </div>
          ))}
        </div>

        <div className="careers-who-content">
          <span className="careers-eyebrow">WHO WE ARE</span>

          <h2>
            Building places.
            <br />
            <span>Building people.</span>
          </h2>

          <p>
            At Sarvottam World, we believe great places are created by
            thoughtful people working together. Our team brings together
            diverse experiences, ideas and perspectives.
          </p>

          <p>
            From architecture and construction to sales, marketing and
            customer experience, every role contributes to creating
            meaningful spaces and experiences.
          </p>

          <p>
            We value curiosity, ownership, collaboration and the courage to
            think differently.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;