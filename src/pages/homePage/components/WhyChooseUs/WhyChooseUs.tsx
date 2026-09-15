import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WhyChooseUs.css";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    number: "01",
    title: "Trusted Legacy",
    description:
      "Three decades of integrity, transparency, and unwavering commitment to every promise made to our clients.",
    label: "LEGACY",
  },
  {
    number: "02",
    title: "Award-Winning Excellence",
    description:
      "18+ prestigious national awards recognising our contribution to architecture, sustainability, and luxury living.",
    label: "EXCELLENCE",
  },
  {
    number: "03",
    title: "100% On-Time Delivery",
    description:
      "Our impeccable track record of delivering every project on schedule is our greatest source of pride.",
    label: "DELIVERY",
  },
  {
    number: "04",
    title: "Customer-First Philosophy",
    description:
      "Post-possession support, dedicated relationship managers, and a community ecosystem that lasts a lifetime.",
    label: "CUSTOMER",
  },
  {
    number: "05",
    title: "Superior Returns",
    description:
      "Our properties have consistently outperformed market benchmarks, delivering exceptional value appreciation.",
    label: "RETURNS",
  },
  {
    number: "06",
    title: "End-to-End Excellence",
    description:
      "From land acquisition to interior design, every touchpoint reflects our obsession with quality and detail.",
    label: "EXCELLENCE",
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".why-panel");
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
          ".why-panel-content"
        );

        const number = panel.querySelector(
          ".why-panel-number"
        );

        const title = panel.querySelector(
          ".why-panel-title"
        );

        const description = panel.querySelector(
          ".why-panel-description"
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
        ".why-progress-bar"
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
        ".why-counter"
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
      className="why-section"
    >
      {/* =================================
          TOP LABEL
      ================================== */}

      <div className="why-heading">
        <div className="why-eyebrow">
          <span />
          WHY CHOOSE US
        </div>

        <h2>
          The Sarvottam
          <br />
          <em>Difference</em>
        </h2>

        <p>
          Six compelling reasons why India's most
          discerning homebuyers and investors choose
          Sarvottam World.
        </p>
      </div>

      {/* =================================
          HORIZONTAL TRACK
      ================================== */}

      <div
        ref={trackRef}
        className="why-track"
      >
        {reasons.map((reason) => (
          <article
            className="why-panel"
            key={reason.number}
          >
            {/* Large background number */}

            <div className="why-panel-bg-number">
              {reason.number}
            </div>

            <div className="why-panel-inner">

              {/* <div className="why-panel-top">
                <span className="why-panel-index">
                  {reason.number}
                </span>

                <span className="why-panel-label">
                  {reason.label}
                </span>
              </div> */}

              <div className="why-panel-content">

                <div className="why-panel-number">
                  {reason.number}
                </div>

                <h3 className="why-panel-title">
                  {reason.title}
                </h3>

                <div className="why-panel-line" />

                <p className="why-panel-description">
                  {reason.description}
                </p>

              </div>

       

            </div>
          </article>
        ))}
      </div>

 

      <div className="why-progress">
        <div className="why-progress-bar" />
      </div>
    </section>
  );
};

export default WhyChooseUs;