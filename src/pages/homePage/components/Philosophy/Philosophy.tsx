import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Philosophy.css";

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
  const section = sectionRef.current;
  const image = imageRef.current;
  const content = contentRef.current;

  if (!section || !image || !content) return;

  const ctx = gsap.context(() => {
    /*
     * ---------------------------------------
     * IMAGE REVEAL
     * ---------------------------------------
     *
     * Starts smaller inside the frame
     * and expands outward.
     *
     * Once completed, it stays there.
     */

    gsap.fromTo(
      image,
      {
        clipPath: "inset(30% 20% 30% 20%)",
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "power3.out",

        scrollTrigger: {
          trigger: image,
          start: "top 80%",
          toggleActions: "play none none reverse",
        //   once: true,
        },
      }
    );

    /*
     * ---------------------------------------
     * TEXT REVEAL
     * ---------------------------------------
     */

    const reveals = content.querySelectorAll(
      ".philosophy-reveal"
    );

    gsap.set(reveals, {
      y: 35,
      opacity: 0,
    });

    gsap.to(reveals, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",

      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none none",
        // once: true,
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
      className="philosophy-section"
    >
      <div className="philosophy-container">

        {/* =========================
            IMAGE
        ========================== */}
        <div className="philosophy-visual">
          <div
            ref={imageRef}
            className="philosophy-image"
          >
            <div
              ref={imageInnerRef}
              className="philosophy-image-inner"
            >
              <img
                src="https://sarvottamworld.in/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1600607687939-ce8a6c25118c%3Fw%3D900%26q%3D85&w=1920&q=75"
                alt="Sarvottam World interior"
              />
            </div>
          </div>

          <div className="philosophy-image-corner">
            <div className="philosophy-image-stat">
              <strong>15+ YEARS</strong>
              <span>OF EXCELLENCE</span>
            </div>
          </div>
        </div>

        {/* =========================
            CONTENT
        ========================== */}
        <div
          ref={contentRef}
          className="philosophy-content"
        >

          {/* EYEBROW */}
          <div className="philosophy-eyebrow philosophy-reveal">
            <span className="eyebrow-line" />
            OUR PHILOSOPHY
          </div>

          {/* TITLE */}
          <h2 className="philosophy-title philosophy-reveal">
            We Do Not Simply
            <br />
            Build Properties.
            <br />
            <em>We Create Legacies.</em>
          </h2>

          {/* DESCRIPTION */}
          <div className="philosophy-copy">

            <p className="philosophy-description philosophy-reveal">
              At Sarvottam World, every project is a testament to
              our belief that extraordinary spaces have the power
              to transform lives. We bring together the world's
              finest materials, visionary design, and an unwavering
              commitment to excellence to create homes and
              commercial spaces that stand apart.
            </p>

            <p className="philosophy-description philosophy-reveal">
              For over three decades, we have honoured the trust
              placed in us by delivering not just properties, but
              promises — on time, every time. This is the Sarvottam
              promise, and it is the foundation of everything we build.
            </p>

          </div>

          {/* STATS */}
          <div className="philosophy-stats philosophy-reveal">

            <div className="philosophy-stat">
              <strong>1Cr+</strong>
              <span>SQ. FT. DELIVERED</span>
            </div>

            <div className="philosophy-stat">
              <strong>5000+</strong>
              <span>HAPPY FAMILIES</span>
            </div>

            <div className="philosophy-stat">
              <strong>100%</strong>
              <span>COMMITMENT</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Philosophy;