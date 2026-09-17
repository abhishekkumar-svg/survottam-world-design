
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Philosophy.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   DATA
========================================================= */

type PhilosophyCard = {
  number: string;
  title: string;
  description: string;
  image: string;
};

const philosophyCards: PhilosophyCard[] = [
  {
    number: "01",
    title: "Uncompromising Quality",
    description:
      "Every material chosen, every joint crafted, every surface finished — reflects our obsession with excellence and lasting quality.",
    image: "https://sarvottamworld.in/_next/image?url=%2FProjects%2FJainX-Automoile.jpg&w=1920&q=75",
  },
  {
    number: "02",
    title: "Timeless Design",
    description:
      "We create spaces that transcend trends — thoughtful architecture designed to remain beautiful, relevant and enduring over time.",
    image:       "https://sarvottamworld.in/_next/image?url=%2FProjects%2FJainX-SCO-Low-Rise.jpg&w=1920&q=75",
  },
  {
    number: "03",
    title: "Absolute Trust",
    description:
      "Our promise is built on transparency, commitment and delivering on what we say — creating relationships that last beyond possession.",
    image:  "https://sarvottamworld.in/_next/image?url=%2FProjects%2FCyberHub-10-7-8-Galactic.jpg&w=1920&q=75",
  },
];


/* =========================================================
   COMPONENT
========================================================= */

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /* =====================================================
         ELEMENTS
      ===================================================== */

      const cards = gsap.utils.toArray<HTMLElement>(
        ".philosophy-card"
      );

      const imageWrappers = gsap.utils.toArray<HTMLElement>(
        ".philosophy-image-wrap"
      );

      const innerImages = gsap.utils.toArray<HTMLImageElement>(
        ".philosophy-image"
      );

      const titles = gsap.utils.toArray<HTMLElement>(
        ".philosophy-card-title"
      );

      const descriptions = gsap.utils.toArray<HTMLElement>(
        ".philosophy-card-description"
      );

      const numbers = gsap.utils.toArray<HTMLElement>(
        ".philosophy-card-number"
      );

      const marquee = section.querySelector(
        ".philosophy-marquee-track"
      ) as HTMLElement | null;

      /* =====================================================
         INITIAL STATES
      ===================================================== */

      /*
       * Every card occupies the exact same viewport.
       *
       * This is the important stacking mechanism:
       *
       * CARD 01
       * CARD 02
       * CARD 03
       *
       * all sit on top of one another.
       */

      cards.forEach((card, index) => {
        gsap.set(card, {
          position: "absolute",
          inset: 0,
          autoAlpha: 1,

          /*
           * Later cards are above earlier cards.
           */
          zIndex: 10 + index,
        });
      });

      /* =====================================================
         CARD 01 INITIAL IMAGE
      ===================================================== */

      /*
       * This matches the small rounded image from your
       * reference animation.
       */

      gsap.set(imageWrappers[0], {
        width: "52vw",
        height: "56vh",

        left: "50%",
        top: "50%",

        xPercent: -50,
        yPercent: -50,

        borderRadius: "400px",

        scale: 1,

        transformOrigin: "center center",
      });

      /*
       * Inner image starts zoomed.
       */

      gsap.set(innerImages[0], {
        scale: 1.5,

        transformOrigin: "center center",
      });

      /* =====================================================
         OTHER CARDS INITIAL STATE
      ===================================================== */

      /*
       * IMPORTANT:
       *
       * Card 02 and Card 03 are NOT hidden.
       *
       * They are positioned below the viewport.
       *
       * They will physically travel upward over the
       * previous card.
       */

      for (let index = 1; index < cards.length; index++) {
        gsap.set(cards[index], {
          yPercent: 100,
        });

        gsap.set(imageWrappers[index], {
          width: "100vw",
          height: "100vh",

          left: "50%",
          top: "50%",

          xPercent: -50,
          yPercent: -50,

          borderRadius: "0px",

          scale: 1,

          transformOrigin: "center center",
        });

        gsap.set(innerImages[index], {
          scale: 1,
        });
      }

      /* =====================================================
         CONTENT INITIAL STATES
      ===================================================== */

      /*
       * Card 01 content is initially visible.
       */

      gsap.set(numbers[0], {
        autoAlpha: 1,
      });

      gsap.set(descriptions[0], {
        autoAlpha: 1,
        x: 0,
      });

      /*
       * Card 01 title characters start in place.
       */

      gsap.set(
        titles[0],
        {
          x: 0,
          autoAlpha: 1,
        }
      );

      /*
       * Other card content starts hidden/offscreen.
       */

      for (let index = 1; index < cards.length; index++) {
        gsap.set(numbers[index], {
          autoAlpha: 0,
        });

        gsap.set(descriptions[index], {
          autoAlpha: 0,
          x: 40,
        });

        gsap.set(
          titles[index],
          {
            x: "100%",
            autoAlpha: 0,
          }
        );
      }

      /* =====================================================
         MASTER SCROLL TIMELINE
      ===================================================== */

      /*
       * ONE PIN.
       *
       * This is the same architecture as your Hero.
       *
       * We DO NOT pin individual cards.
       */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top top",

          /*
           * Longer scroll distance gives each card enough
           * physical travel.
           */
         end: () => `+=${window.innerHeight * cards.length * 1}`,

          pin: true,

          scrub: 2,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      /* =====================================================
         CARD 01
      ===================================================== */

      /*
       * Small rounded image
       *
       *       ↓
       *
       * viewport-sized image
       */

      tl.to(
        imageWrappers[0],
        {
          width: "100vw",
          height: "100vh",

          borderRadius: "28px",

          duration: 1,

          ease: "none",
        },
        0
      );

      /*
       * Inner image settles from 1.5 → 1.
       */

      tl.to(
        innerImages[0],
        {
          scale: 1,

          duration: 1,

          ease: "none",
        },
        0
      );

      /* =====================================================
         BACKGROUND MARQUEE
      ===================================================== */

      if (marquee) {
        tl.to(
          marquee,
          {
            xPercent: -15,

            duration: 1,

            ease: "none",
          },
          0
        );
      }

      /* =====================================================
         CARD 01 CONTENT
      ===================================================== */

      tl.fromTo(
        titles[0],
        {
          opacity: 0,
          // x: "100%",
        },
        {
          opacity: 1,
          x: 0,
          autoAlpha: 1,

          duration: 0.4,

          stagger: 0.015,

          ease: "power4.in",
        },
        0.3
      );

      tl.fromTo(
        descriptions[0], {
          opacity: 0,
        },
        {
          opacity: 1,
          x: 0,
          autoAlpha: 1,

          duration: 0.35,

          ease: "power3.out",
        },
        0.78
      );

      tl.to(
        numbers[0],
        {
          autoAlpha: 1,

          duration: 0.25,
        },
        0.72
      );

      /* =====================================================
         CARD 02 / CARD 03 TRANSITIONS
      ===================================================== */

      cards.forEach((_, index) => {
        if (index === 0) return;

        const previousIndex = index - 1;

        const currentCard = cards[index];
        const currentWrapper = imageWrappers[index];
        const currentImage = innerImages[index];

        const previousWrapper =
          imageWrappers[previousIndex];

        const previousTitle = titles[previousIndex];
        const previousDescription =
          descriptions[previousIndex];
        const previousNumber = numbers[previousIndex];

        const currentTitle = titles[index];
        const currentDescription =
          descriptions[index];
        const currentNumber = numbers[index];

        /*
         * Timeline location.
         *
         * Every new card gets its own section of the master
         * timeline.
         */

        const start =
          index === 1
            ? 1.25
            : 1.25 + (index - 1) * 1.65;

        /* ===================================================
           RESET CURRENT CARD
        =================================================== */

        /*
         * Make sure the incoming card starts below the
         * viewport.
         */

        tl.set(
          currentCard,
          {
            yPercent: 100,
            autoAlpha: 1,
            zIndex: 10 + index,
          },
          start
        );
 
        /* ===================================================
           PREVIOUS CARD STAYS WHERE IT IS
        =================================================== */

        /*
         * There is deliberately NO animation here.
         *
         * Previous card remains fixed.
         *
         * Current card will physically move over it.
         */

        /* ===================================================
           CURRENT CARD COMES FROM BOTTOM
        =================================================== */

        tl.to(
          currentCard,
          {
            yPercent: -20,

            duration: 2,

            ease: "none",
          },
          start
        );

        /* ===================================================
           CURRENT IMAGE
        =================================================== */

        /*
         * It is already 100vw × 100vh.
         *
         * So the image covers the complete viewport as soon
         * as the card reaches it.
         */

        tl.to(
          currentWrapper,
          {
            borderRadius: "28px",

            duration: 0.3,

            ease: "power2.out",
          },
          start + 0.72
        );

        /* ===================================================
           CURRENT INNER IMAGE
        =================================================== */

        tl.to(
          currentImage,
          {
            scale: 1,

            duration: 0.9,

            ease: "none",
          },
          start
        );

        /* ===================================================
           PREVIOUS CARD DEPTH EFFECT
        =================================================== */

        /*
         * IMPORTANT:
         *
         * This happens ONLY after the incoming card has
         * covered most of the previous card.
         *
         * This gives the stacked-card depth effect.
         */

        tl.to(
          previousWrapper,
          {
            scale: 0.4,
          
           backdropFilter: "blur(4px)",
            borderRadius: "42px",

            duration: 1,

            ease: "power2.inOut",
          },
          start + 0.82
        );

        /* ===================================================
           PREVIOUS CONTENT EXITS
        =================================================== */

        tl.to(
          previousTitle,
          {
            x: "-100%",

            autoAlpha: 0,

            duration: 0.25,

            stagger: 0.01,

            ease: "power4.in",
          },
          start + 0.78
        );

        tl.to(
          previousDescription,
          {
            x: -40,

            autoAlpha: 0,

            duration: 0.2,

            ease: "power3.in",
          },
          start + 0.78
        );

        tl.to(
          previousNumber,
          {
            autoAlpha: 0,

            duration: 0.18,
          },
          start + 0.78
        );

        /* ===================================================
           CURRENT CONTENT
        =================================================== */

        const currentChars =
          currentTitle

        /*
         * Title enters after image is mostly in place.
         */

        tl.to(
          currentChars,
          {
            x: "0%",

            autoAlpha: 1,

            duration: 0.48,

            stagger: 0.018,

            ease: "power4.out",
          },
          start + 0.88
        );

        /*
         * Number.
         */

        tl.to(
          currentNumber,
          {
            autoAlpha: 1,

            duration: 0.25,

            ease: "power2.out",
          },
          start + 0.86
        );

        /*
         * Description.
         */

        tl.to(
          currentDescription,
          {
            x: 0,

            autoAlpha: 1,

            duration: 0.3,

            ease: "power3.out",
          },
          start + 1.02
        );

        /* ===================================================
           BACKGROUND MARQUEE
        =================================================== */

        if (marquee) {
          tl.to(
            marquee,
            {
              xPercent: -(15 + index * 12),

              duration: 1.05,

              ease: "none",
            },
            start
          );
        }

        /* ===================================================
           HOLD CURRENT CARD
        =================================================== */

        /*
         * This is important.
         *
         * The card doesn't immediately disappear after
         * entering.
         *
         * It stays visible before the next card begins.
         */

        tl.to(
            currentWrapper,
          {
        //      width: "52vw",
        // height: "56vh",

        // left: "50%",
        // top: "50%",

        // xPercent: -50,
        // yPercent: -50,
            scale: 0.9,
          
           backdropFilter: "blur(4px)",
            borderRadius: "42px",

            duration: 0.7,

            ease: "power2.Out",
          },
  
        );
      });

      /* =====================================================
         FINAL CARD HOLD
      ===================================================== */

      /*
       * Nothing else happens here.
       *
       * ScrollTrigger remains pinned until this point.
       */

      tl.to(
        {},
        {
          duration: 0.75,
        }
      );

      /* =====================================================
         IMAGE LOAD REFRESH
      ===================================================== */

      const images =
        section.querySelectorAll("img");

      images.forEach((image) => {
        if (image.complete) {
          ScrollTrigger.refresh();
        } else {
          image.addEventListener(
            "load",
            () => {
              ScrollTrigger.refresh();
            },
            {
              once: true,
            }
          );
        }
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <section
      ref={sectionRef}
      className="sarvottam-philosophy"
    >
      <div className="philosophy-stage">

        {/* =================================================
            GIANT BACKGROUND TYPOGRAPHY
        ================================================= */}

        <div className="philosophy-marquee">
          <div className="philosophy-marquee-track">
            <span>SURVOTTAM</span>
          
          </div>
        </div>

        {/* =================================================
            INTRO HEADING
        ================================================= */}

        <div className="philosophy-intro">
          <span className="philosophy-eyebrow">
            Our Philosophy
          </span>

          <h2 className="philosophy-intro-title">
            We Do Not Simply
            <br />
            Build Properties.
          </h2>

          <p className="philosophy-intro-description">
            We Create Legacies.
          </p>
        </div>

        {/* =================================================
            CARDS
        ================================================= */}

        <div className="philosophy-cards">

          {philosophyCards.map((card, index) => (
            <article
              key={card.number}
              className={`philosophy-card philosophy-card-${index + 1}`}
            >

              {/* ==========================================
                  IMAGE
              =========================================== */}

              <div className="philosophy-image-wrap">
                <img
                  className="philosophy-image"
                  src={card.image}
                  alt={card.title}
                  draggable={false}
                />

                <div className="philosophy-image-overlay" />
              </div>

              {/* ==========================================
                  CONTENT
              =========================================== */}

              <div className="philosophy-card-content">

                <div className="philosophy-card-number">
                  {card.number}
                </div>

                <div className="philosophy-card-copy">

                  <h3 className="philosophy-card-title">
                    {/* {splitCharacters()} */}
                    {card.title}
                  </h3>

                  <p className="philosophy-card-description">
                    {card.description}
                  </p>

                </div>

              </div>

            </article>
          ))}

        </div>



        <div className="philosophy-footer">
          <span>
            Sarvottam World — Since 1989
          </span>

          <span>
            Philosophy
          </span>
        </div>

      </div>
    </section>
  );
}