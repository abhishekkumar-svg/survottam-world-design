import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Portfolio.css";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll();
type Project = {
  id: number;
  status: string;
  brand: string;
  title: string;
  location: string;
  price: string;
  type: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    status: "ONGOING",
    brand: "SARVOTTAM WORLD",
    title: "Galactic Cyber City",
    location: "Plot No. 6, Knowledge Park V",
    price: "On Request",
    type: "Premium Development",
    image: "https://sarvottamworld.in/Projects/Galactic-City.jpg",
  },
  {
    id: 2,
    status: "ONGOING",
    brand: "SARVOTTAM WORLD",
    title: "Galactic City",
    location: "Plot No. 19, Knowledge Park V",
    price: "On Request",
    type: "Luxury Residences",
    image: "https://sarvottamworld.in/Projects/JainX-Automoile.jpg",
  },
  {
    id: 3,
    status: "ONGOING",
    brand: "SARVOTTAM WORLD",
    title: "JainX City",
    location: "Shivpuri Range, Rishikesh",
    price: "On Request",
    type: "Luxury Villas & Hospitality",
    image: "https://sarvottamworld.in/Projects/Galactic-City.jpg",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".portfolio-item");

      if (!cards.length) return;

      // Every card gets its own vertical scroll distance.
      // Cards stay pinned and visually stack one over another.
      cards.forEach((card, index) => {
        gsap.set(card, {
          zIndex: index + 1,
        });

        if (index === 0) return;

        gsap.fromTo(
          card,
          {
            yPercent: 100 * index,
          },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Keep the whole project stack pinned while the cards arrive.
      ScrollTrigger.create({
        trigger: section,
        start: "top 14%",
        end: () => `+=${window.innerHeight * cards.length}`,
        pin: true,
        pinSpacing: true,
        scrub: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section  className="portfolio-section">
      <div className="portfolio-shell">
        <header className="portfolio-header">
          <div>
            <span className="portfolio-eyebrow">Portfolio</span>
            <h2>
              Our Signature
              <br />
              <em>Developments</em>
            </h2>
          </div>

          <div className="portfolio-header-right">
            <p>
              Each project is a statement of intent — a bold declaration of
              what luxury real estate can and should be.
            </p>

            <a href="/projects" className="portfolio-all-link">
              View All Projects <span>↗</span>
            </a>
          </div>
        </header>

        <div ref={sectionRef} className="portfolio-list">
          {projects.map((project, index) => (
            <article
              className={`portfolio-item ${
                index % 2 ? "portfolio-item-reverse" : ""
              }`}
              key={project.id}
            >
              <a
                className="portfolio-image-link"
                href={`/projects/${project.title.toLowerCase().replaceAll(" ", "-")}`}
              >
                <div className="portfolio-image-wrap">
                  <img
                    className="portfolio-image"
                    src={project.image}
                    alt={project.title}
                    loading={index === 0 ? "eager" : "lazy"}
                  />

                  <div className="portfolio-image-overlay" />

                  <div className="portfolio-image-top">
                    <span className="portfolio-status">{project.status}</span>
                    <span className="portfolio-number">0{project.id}</span>
                  </div>

                  <span className="portfolio-image-arrow">↗</span>
                </div>
              </a>

              <div className="portfolio-content">
                <div className="portfolio-meta">
                  <span>{project.brand}</span>
                  <span>{project.type}</span>
                </div>

                <h3 className="portfolio-title">{project.title}</h3>

                <div className="portfolio-details">
                  <div>
                    <span className="portfolio-detail-label">Location</span>
                    <span>{project.location}</span>
                  </div>

                  <div>
                    <span className="portfolio-detail-label">Price</span>
                    <span>{project.price}</span>
                  </div>
                </div>

                <a
                  href={`/projects/${project.title.toLowerCase().replaceAll(" ", "-")}`}
                  className="portfolio-link"
                >
                  View Project <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <footer className="portfolio-footer">
          <p>
            Crafted with vision.
            <br />
            Built for generations.
          </p>

          <a href="/projects">
            Explore All <span>→</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
