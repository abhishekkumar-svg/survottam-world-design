import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./VisionMission.css";

gsap.registerPlugin(ScrollTrigger);

const VisionMission = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================================
         SECTION INTRO
      ========================================= */

      gsap.from(".vision-top-label span", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      /* =========================================
         LEFT CONTENT
      ========================================= */

      const leftTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      leftTl
        .from(".vision-copy-block", {
          y: 45,
          opacity: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
        })
        .from(
          ".vision-philosophy",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.35"
        );

      /* =========================================
         BIG WORDS
      ========================================= */

      const words = gsap.utils.toArray<HTMLElement>(
        ".vision-word"
      );

      words.forEach((word, index) => {
        const mask = word.querySelector(
          ".vision-word-mask"
        );

        const line = word.querySelector(
          ".vision-word-line"
        );

        const sideText = word.querySelector(
          ".vision-word-side"
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: word,
            start: "top 82%",
            once: true,
          },
        });

        tl.from(mask, {
          yPercent: 105,
          duration: 1.05,
          ease: "power4.out",
        })
          .from(
            line,
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.75,
              ease: "power3.inOut",
            },
            "-=0.55"
          )
          .from(
            sideText,
            {
              x: 25,
              opacity: 0,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.45"
          );
      });

      /* =========================================
         SUBTLE WORD PARALLAX
      ========================================= */

      words.forEach((word) => {
        gsap.to(word, {
          yPercent: -8,
          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      /* =========================================
         GOLD VERTICAL DIVIDER
      ========================================= */

      gsap.from(".vision-main-divider", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="vision-mission"
      ref={sectionRef}
    >
      {/* =========================================
          TOP LABEL
      ========================================= */}

      <div className="vision-top-label">
        <span>OUR VISION &amp; MISSION</span>

        <i />

        <span>A BETTER TOMORROW</span>
      </div>

      <div className="vision-layout">

        {/* =========================================
            LEFT CONTENT
        ========================================= */}

        <div className="vision-left">

          {/* VISION */}

          <div className="vision-copy-block">
            <span className="vision-small-label">
              OUR VISION
            </span>

            <p>
              To shape the future of real estate
              through integrity, transparency
              and excellence.
            </p>
          </div>


          {/* MISSION */}

          <div className="vision-copy-block">
            <span className="vision-small-label">
              OUR MISSION
            </span>

            <p>
              To deliver value-driven, ethical and
              customer-first solutions that create
              lasting impact.
            </p>
          </div>


          {/* PHILOSOPHY */}

          <div className="vision-philosophy">
            <span>OUR PHILOSOPHY</span>

            <div className="philosophy-arrow">
              <span>→</span>
            </div>
          </div>

        </div>


        {/* =========================================
            CENTER DIVIDER
        ========================================= */}

        <div
          className="vision-main-divider"
          aria-hidden="true"
        />


        {/* =========================================
            RIGHT TYPOGRAPHY
        ========================================= */}

        <div className="vision-words">

          {/* INTEGRITY */}

          <div className="vision-word">

            <div className="vision-word-main">
              <div className="vision-word-mask">
                <span>INTEGRITY</span>
              </div>

              <span className="vision-word-line" />
            </div>

            <div className="vision-word-side">
              <span>DO WHAT</span>
              <span>IS RIGHT</span>
            </div>

          </div>


          {/* INNOVATION */}

          <div className="vision-word">

            <div className="vision-word-main">
              <div className="vision-word-mask">
                <span>INNOVATION</span>
              </div>

              <span className="vision-word-line" />
            </div>

            <div className="vision-word-side">
              <span>CREATE</span>
              <span>WHAT'S NEXT</span>
            </div>

          </div>


          {/* EXCELLENCE */}

          <div className="vision-word">

            <div className="vision-word-main">
              <div className="vision-word-mask">
                <span>EXCELLENCE</span>
              </div>

              <span className="vision-word-line" />
            </div>

            <div className="vision-word-side">
              <span>RAISE</span>
              <span>THE STANDARD</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default VisionMission;