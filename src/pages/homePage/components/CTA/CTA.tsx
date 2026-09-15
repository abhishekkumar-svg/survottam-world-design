import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CTA.css";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const ctx = gsap.context(() => {
      const reveals = section.querySelectorAll(
        ".cta-reveal"
      );

      const sideLetters = section.querySelectorAll(
        ".cta-side-word"
      );

      /* =========================================
         INITIAL STATES
      ========================================== */

      gsap.set(reveals, {
        y: 45,
        opacity: 0,
      });

      gsap.set(sideLetters, {
        y: 25,
        opacity: 0,
      });

      gsap.set(image, {
        clipPath: "inset(0% 50% 0% 50%)",
        scale: 1.08,
      });


      /* =========================================
         MAIN REVEAL
      ========================================== */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });


      /* IMAGE */

      tl.to(
        image,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
        },
        0
      );


      /* LEFT CONTENT */

      tl.to(
        reveals,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.11,
          ease: "power3.out",
        },
        0.15
      );


      /* RIGHT MESSAGE */

      tl.to(
        sideLetters,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
        },
        0.55
      );


      /* =========================================
         SUBTLE IMAGE PARALLAX
      ========================================== */

      gsap.to(image.querySelector("img"), {
        yPercent: -5,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);


  return (
    <section
      ref={sectionRef}
      className="cta-section"
    >

      <div className="cta-inner">

        {/* =====================================
            LEFT
        ====================================== */}

        <div className="cta-content">

          <div className="cta-eyebrow cta-reveal">
            <span>BEGIN YOUR JOURNEY</span>
            <i />
          </div>


          <h2 className="cta-title cta-reveal">
            Find Your Perfect
            <br />
            <em>Sarvottam Address</em>
          </h2>


          <p className="cta-description cta-reveal">
            Connect with our luxury real estate consultants
            for a personalized, no obligation consultation
            tailored to your lifestyle aspirations and
            investment goals.
          </p>


          <div className="cta-actions cta-reveal">

            <a
              href="#"
              className="cta-button cta-button-primary"
            >
              REQUEST A CALL BACK
            </a>

            <a
              href="#"
              className="cta-button cta-button-secondary"
            >
              SCHEDULE A MEETING
            </a>

          </div>

        </div>


        {/* =====================================
            IMAGE
        ====================================== */}

        <div
          ref={imageRef}
          className="cta-image"
        >
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=90"
            alt="Luxury Sarvottam residence"
          />
        </div>


        {/* =====================================
            RIGHT MESSAGE
        ====================================== */}

        <div className="cta-side-message">

          <div className="cta-side-text">

            <span className="cta-side-word">
              MORE
            </span>

            <span className="cta-side-word">
              THAN
            </span>

            <span className="cta-side-word">
              HOMES.
            </span>

            <span className="cta-side-word">
              A BETTER
            </span>

            <span className="cta-side-word">
              TOMORROW.
            </span>

          </div>


          <span className="cta-side-line" />

        </div>

      </div>

    </section>
  );
};

export default CTA;