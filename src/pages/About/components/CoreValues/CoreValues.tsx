import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CoreValues.css";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    number: "01",
    title: "Integrity",
    description:
      "We operate with complete transparency and honesty in every interaction — with clients, partners, and communities.",
    label: "INTEGRITY",
  },
  {
    number: "02",
    title: "Innovation",
    description:
      "We constantly challenge conventions, embracing new materials, technologies, and design philosophies to push boundaries.",
    label: "INNOVATION",
  },
  {
    number: "03",
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards at every stage — from acquisition to architecture to after-sales service.",
    label: "EXCELLENCE",
  },
  {
    number: "04",
    title: "Community",
    description:
      "We see our role as larger than real estate — investing in the communities, environments, and ecosystems we build within.",
    label: "COMMUNITY",
  },
  {
    number: "05",
    title: "Legacy",
    description:
      "We build not for today but for generations — creating homes and spaces that grow more valuable and cherished with time.",
    label: "LEGACY",
  },
   {
    number: "06",
    title: "Responsibility",
    description:
      "We build with purpose, considering the long-term impact of every decision on people, places, and the environment.",
    label: "RESPONSIBILITY",
  },
];
const CoreValues = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".coreValues-panel");
      const totalPanels = panels.length;

      if (!totalPanels) return;


     const horizontalTween = gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: "none",

  scrollTrigger: {
    trigger: section,

    start: "top top",

    end: () =>
      `+=${window.innerHeight * (totalPanels - 1)}`,

    pin: true,

    scrub: 1.5,

    anticipatePin: 1,

    invalidateOnRefresh: true,

   snap: {
  snapTo: 1 / (totalPanels - 1),

  duration: 0.3,

  delay: 0.03,

  inertia: false,

  ease: "power3.out",
},
  },
});

      /*
       * ==========================================
       * PANEL CONTENT ANIMATION
       * ==========================================
       */

      panels.forEach((panel, index) => {
        const content = panel.querySelector(
          ".coreValues-panel-content"
        );

        const number = panel.querySelector(
          ".coreValues-panel-number"
        );

        const title = panel.querySelector(
          ".coreValues-panel-title"
        );

        const description = panel.querySelector(
          ".coreValues-panel-description"
        );

        if (
          !content ||
          !number ||
          !title ||
          !description
        ) {
          return;
        }

        /*
         * First panel is visible initially.
         */
        if (index !== 0) {
          gsap.set(content, {
            opacity: 0,
            x: 80,
          });

          gsap.set(number, {
            opacity: 0,
            y: 30,
          });

          gsap.set(title, {
            opacity: 0,
            y: 50,
          });

          gsap.set(description, {
            opacity: 0,
            y: 35,
          });
        }

        /*
         * Content
         */
        gsap.to(content, {
          x: 0,
          opacity: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalTween,

            start: "left 75%",
            end: "left 35%",

            scrub: 1,
          },
        });

        /*
         * Number
         */
        gsap.to(number, {
          y: 0,
          opacity: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalTween,

            start: "left 75%",
            end: "left 45%",

            scrub: 1,
          },
        });

        /*
         * Title
         */
        gsap.to(title, {
          y: 0,
          opacity: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalTween,

            start: "left 70%",
            end: "left 35%",

            scrub: 1,
          },
        });

        /*
         * Description
         */
        gsap.to(description, {
          y: 0,
          opacity: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalTween,

            start: "left 62%",
            end: "left 30%",

            scrub: 1,
          },
        });
      });

      /*
       * ==========================================
       * ACTIVE PROGRESS LINE
       * ==========================================
       */

      const progress = section.querySelector(
        ".coreValues-progress-bar"
      );

      if (progress) {
        gsap.fromTo(
          progress,
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",

            scrollTrigger: {
              trigger: section,

              start: "top top",

              end: () =>
                `+=${window.innerHeight * (totalPanels - 1)}`,

              scrub: true,
            },
          }
        );
      }

      /*
       * ==========================================
       * COUNTER
       * ==========================================
       */

      const counter = section.querySelector(
        ".coreValues-counter"
      );

      const counterCurrent =
        counter?.querySelector("span:first-child");

      if (counterCurrent) {
        const counterObj = {
          value: 1,
        };

        gsap.to(counterObj, {
          value: totalPanels,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top top",

            end: () =>
              `+=${window.innerHeight * (totalPanels - 1)}`,

            scrub: 0.5,

            onUpdate: (self) => {
              /*
               * Round to the currently visible panel.
               */
              const currentPanel =
                Math.round(
                  self.progress * (totalPanels - 1)
                ) + 1;

              counterCurrent.textContent =
                String(currentPanel).padStart(2, "0");
            },
          },
        });
      }

      /*
       * Refresh after everything has been created.
       */
      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="coreValues-section"
    >
      {/* =================================
          TOP LABEL
      ================================== */}

      <div className="coreValues-heading">
        <div className="coreValues-eyebrow">
          <span />
        WHAT WE STAND FOR
        </div>

        <h2>
          Our Core Values
          <br />
          {/* <em>Difference</em> */}
        </h2>

       
      </div>

      {/* =================================
          HORIZONTAL TRACK
      ================================== */}

      <div
        ref={trackRef}
        className="coreValues-track"
      >
        {reasons.map((reason) => (
          <article
            className="coreValues-panel"
            key={reason.number}
          >
            {/* Large background number */}

            <div className="coreValues-panel-bg-number">
              {reason.number}
            </div>

            <div className="coreValues-panel-inner">

              {/* <div className="coreValues-panel-top">
                <span className="coreValues-panel-index">
                  {reason.number}
                </span>

                <span className="coreValues-panel-label">
                  {reason.label}
                </span>
              </div> */}

              <div className="coreValues-panel-content">

                <div className="coreValues-panel-number">
                  {reason.number}
                </div>

                <h3 className="coreValues-panel-title">
                  {reason.title}
                </h3>

                <div className="coreValues-panel-line" />

                <p className="coreValues-panel-description">
                  {reason.description}
                </p>

              </div>

       

            </div>
          </article>
        ))}
      </div>

 

      <div className="coreValues-progress">
        <div className="coreValues-progress-bar" />
      </div>
    </section>
  );
};

export default CoreValues;