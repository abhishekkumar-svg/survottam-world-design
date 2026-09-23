const careerValues = [
  {
    title: "Competitive Compensation",
    text: "Market-leading salaries, performance bonuses, and ESOPs for senior roles.",
  },
  {
    title: "Growth & Learning",
    text: "Access to global training programmes, mentorship, and leadership development.",
  },
  {
    title: "Health & Wellness",
    text: "Premium medical insurance for you and your family, plus wellness allowances.",
  },
  {
    title: "Work-Life Balance",
    text: "Flexible work arrangements, generous leave policies, and support for a healthy work-life balance.",
  },
  {
    title: "Prestige & Recognition",
    text: "Be part of a respected organisation where your contributions and achievements are recognised.",
  },
  {
    title: "Collaborative Culture",
    text: "Work alongside talented people in an environment built on collaboration, trust, and shared success.",
  },
];

const Perks = () => {
  return (
    <section className="careers-life">
      <div className="careers-container">
        <div className="careers-life-heading">
          <span className="careers-eyebrow">WHY WORK WITH US</span>

          <h2>
            Benefits &
            {/* <br /> */}
            <span> Perks</span>
          </h2>
        </div>

        <div className="careers-life-layout">
          {/* Image */}
          <div className="careers-life-image">
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80"
              alt="Sarvottam World workplace"
            />
          </div>

          {/* Stacked values */}
          <div className="careers-values">
            {careerValues.map((item, index) => (
              <div className="careers-value" key={item.title}>
                <span className="careers-value-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="careers-value-content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perks;