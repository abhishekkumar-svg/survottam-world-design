import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Portfolio.css";

gsap.registerPlugin(ScrollTrigger);

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
    title: "Sarvottam Crown Residency",
    location: "Plot No. 19, Knowledge Park V",
    price: "On Request",
    type: "Luxury Residences",
    image: "	https://sarvottamworld.in/Projects/JainX-Automoile.jpg",
  },

  {
    id: 3,
    status: "ONGOING",
    brand: "SARVOTTAM WORLD",
    title: "Atmosphere",
    location: "Shivpuri Range, Rishikesh",
    price: "On Request",
    type: "Luxury Villas & Hospitality",
    image:"https://sarvottamworld.in/Projects/Galactic-City.jpg",
  },



];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(
        ".portfolio-item"
      );

      items.forEach((item) => {
        const image = item.querySelector<HTMLElement>(
          ".portfolio-image"
        );

        const imageWrap = item.querySelector<HTMLElement>(
          ".portfolio-image-wrap"
        );

        const title = item.querySelector<HTMLElement>(
          ".portfolio-title"
        );

        const meta = item.querySelector<HTMLElement>(
          ".portfolio-meta"
        );

        const number = item.querySelector<HTMLElement>(
          ".portfolio-number"
        );

        if (
          !image ||
          !imageWrap ||
          !title ||
          !meta ||
          !number
        ) {
          return;
        }

        /*
         * ==========================================
         * INCOMING IMAGE
         *
         * This is the exact idea from the
         * YouTube code you attached.
         * ==========================================
         */

        gsap.fromTo(
          imageWrap,
          {
            clipPath:
              "polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)",
          },
          {
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

            ease: "none",

            scrollTrigger: {
              trigger: item,

              start: "top bottom",

              end: "top top",

              scrub: 0.5,

              invalidateOnRefresh: true,
            },
          }
        );

        /*
         * ==========================================
         * IMAGE SCALE
         * ==========================================
         */

        gsap.fromTo(
          image,
          {
            scale: 1.18,
          },
          {
            scale: 1,

            ease: "none",

            scrollTrigger: {
              trigger: item,

              start: "top bottom",

              end: "top top",

              scrub: 0.7,
            },
          }
        );

        /*
         * ==========================================
         * OUTGOING IMAGE
         *
         * This follows the second screenshot
         * from your YouTube reference.
         * ==========================================
         */

        gsap.fromTo(imageWrap,
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
            },
            {
          clipPath:
            "polygon(0% 0%, 100% 0%, 75% 60%, 25% 75%)",

          ease: "none",

          scrollTrigger: {
            trigger: item,

            start: "bottom bottom",

            end: "bottom top",

            scrub: 0.5,

            invalidateOnRefresh: true,
          },
        });

        /*
         * ==========================================
         * TITLE REVEAL
         *
         * Same concept as the SplitText code
         * from your screenshots.
         * ==========================================
         */

        const titleText = title.textContent || "";

        title.innerHTML = "";

        [...titleText].forEach((character) => {
          const mask = document.createElement("span");

          mask.className =
            "portfolio-char-mask";

          const char = document.createElement("span");

          char.className =
            "portfolio-char";

          char.textContent =
            character === " "
              ? "\u00A0"
              : character;

          mask.appendChild(char);

          title.appendChild(mask);
        });

        const chars =
          title.querySelectorAll<HTMLElement>(
            ".portfolio-char"
          );

        gsap.set(chars, {
          y: "125%",
        });

        chars.forEach((char, index) => {
          gsap.fromTo(
            char,
            {
              y: "125%",
            },
            {
              y: "0%",

              ease: "none",

              scrollTrigger: {
                trigger: item,

                start: `top+=${index * 12 - 120} top`,

                end: `top+=${index * 12 - 40} top`,

                scrub: 1,

                invalidateOnRefresh: true,
              },
            }
          );
        });

        /*
         * ==========================================
         * PROJECT META REVEAL
         * ==========================================
         */

        gsap.fromTo(
          meta,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,

            ease: "power3.out",

            scrollTrigger: {
              trigger: item,

              start: "top 70%",

              end: "top 45%",

              scrub: 0.8,
            },
          }
        );

        /*
         * ==========================================
         * PROJECT NUMBER
         * ==========================================
         */

        gsap.fromTo(
          number,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,

            ease: "power3.out",

            scrollTrigger: {
              trigger: item,

              start: "top 75%",

              end: "top 55%",

              scrub: 0.8,
            },
          }
        );
      });

      /*
       * ==========================================
       * SECTION HEADER
       * ==========================================
       */

      const header = section.querySelector(
        ".portfolio-header"
      );

      if (header) {
        gsap.fromTo(
          header,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,

            duration: 1,

            ease: "power3.out",

            scrollTrigger: {
              trigger: section,

              start: "top 80%",

              toggleActions:
                "play none none reverse",
            },
          }
        );
      }

      /*
       * Refresh once everything is ready.
       */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="portfolio-section"
    >
      {/* ==========================================
          SECTION HEADER
      =========================================== */}

      <div className="portfolio-header">
        <div className="portfolio-header-left">
          <span className="portfolio-eyebrow">
            Portfolio
          </span>

          <h2>
            Our Signature
            <br />
            <em>Developments</em>
          </h2>
        </div>

        <div className="portfolio-header-right">
          <p>
            Each project is a statement of intent —
            a bold declaration of what luxury real
            estate can and should be.
          </p>

          <a href="/projects">
            View All Projects
            <span>↗</span>
          </a>
        </div>
      </div>


      {/* ==========================================
          PROJECT LIST
      =========================================== */}

      <div className="portfolio-list">

        {projects.map((project) => (
          <article
            className="portfolio-item"
            key={project.id}
          >

            {/* ====================================
                IMAGE
            ===================================== */}

            <div className="portfolio-image-wrap bg-gradient-to-r from-[#1C1712]/55 via-transparent to-transparent">

              <img
                className="portfolio-image"
                src={project.image}
                alt={project.title}
              />

              <div className="portfolio-image-overlay" />

            </div>


            {/* ====================================
                TOP INFO
            ===================================== */}

            <div className="portfolio-top">

              <span className="portfolio-status">
                {project.status}
              </span>

              <span className="portfolio-number">
                0{project.id}
              </span>

            </div>


            {/* ====================================
                PROJECT CONTENT
            ===================================== */}

            <div className="portfolio-content">

              <div className="portfolio-meta">

                <span>
                  {project.brand}
                </span>

                <span>
                  {project.type}
                </span>

              </div>


              <h3 className="portfolio-title">
                {project.title}
              </h3>


              <div className="portfolio-details">

                <span>
                  {project.location}
                </span>

                <span>
                  {project.price}
                </span>

              </div>


              <a
                href={`/projects/${project.title
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
                className="portfolio-link"
              >
                View Project

                <span>
                  ↗
                </span>
              </a>

            </div>

          </article>
        ))}

      </div>


      {/* ==========================================
          FOOTER
      =========================================== */}

      <div className="portfolio-footer">
{/* 
        <span>
          01 — 06
        </span> */}

        <p>
          Crafted with vision.
          <br />
          Built for generations.
        </p>

        <a href="/projects">
          Explore All
          <span>→</span>
        </a>

      </div>

    </section>
  );
}