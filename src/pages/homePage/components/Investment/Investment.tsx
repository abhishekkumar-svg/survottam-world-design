import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Investment.css";

gsap.registerPlugin(ScrollTrigger);

const Investment = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    const ctx = gsap.context(() => {
      /* =========================================
         IMAGE REVEAL
      ========================================= */

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
          },
        }
      );

      /* =========================================
         CONTENT REVEAL
      ========================================= */

      const reveals = content.querySelectorAll(
        ".investment-reveal"
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
          toggleActions: "play none none reverse",
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
      className="investment-section"
    >
      <div className="investment-container">

        {/* =====================================
            CONTENT
        ====================================== */}

        <div
          ref={contentRef}
          className="investment-content"
        >

          <div className="investment-eyebrow investment-reveal">
            <span className="investment-eyebrow-line" />
            INVESTMENT OPPORTUNITIES
          </div>

          <h2 className="investment-title investment-reveal">
            Where Luxury Meets
            <br />
            <em>Exceptional Returns</em>
          </h2>

          <p className="investment-description investment-reveal">
            Investing in Sarvottam real estate is not merely a
            financial decision — it is a strategic choice to
            participate in India's most prestigious and
            high-performing asset class. Our properties are
            designed to deliver both a superlative lifestyle
            and superior long term returns.
          </p>

          {/* =====================================
              BENEFITS
          ====================================== */}

          <div className="investment-benefits">

            <div className="investment-benefit investment-reveal">
              <div className="investment-icon">
                ↗
              </div>

              <div className="investment-benefit-content">
                <h3>12–18% CAGR</h3>

                <p>
                  Consistent capital appreciation across all
                  Sarvottam properties over the past decade.
                </p>
              </div>
            </div>

            <div className="investment-benefit investment-reveal">
              <div className="investment-icon">
                $
              </div>

              <div className="investment-benefit-content">
                <h3>Rental Yield</h3>

                <p>
                  Premium rental yields of 4–6% p.a. driven
                  by our strategic locations and quality
                  positioning.
                </p>
              </div>
            </div>

            <div className="investment-benefit investment-reveal">
              <div className="investment-icon">
                ◇
              </div>

              <div className="investment-benefit-content">
                <h3>Safe & Transparent</h3>

                <p>
                  RERA-registered, legally clear titles, and
                  complete documentation support from our
                  expert team.
                </p>
              </div>
            </div>

          </div>
        </div>


        {/* =====================================
            IMAGE
        ====================================== */}

        <div className="investment-visual">

          <div
            ref={imageRef}
            className="investment-image"
          >
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=85"
              alt="Real estate investment"
            />
          </div>

          {/* =====================================
              ROI CARD
          ====================================== */}

          <div className="investment-roi-card">

            <span className="investment-roi-label">
              AVG. ROI
            </span>

            <strong>
              15.3%
            </strong>

            <small>
              5 Year CAGR across portfolio
            </small>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Investment;