import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HistoryTimeline.css";

gsap.registerPlugin(ScrollTrigger);

const historyData = [
  {
    year: "1980",
    title: "KSN World",
    description:
      "KSN World was established by C. P. Jain, laying the foundation for a legacy built on trust, vision and excellence.",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=85",
    position: "top",
    number: "01",
  },
  {
    year: "2005",
    title: "Entry into Real Estate",
    description:
      "The World diversified into the real estate sector, embarking on a journey to create landmark residential and commercial developments.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    position: "bottom",
    number: "02",
  },
  {
    year: "2014",
    title: "Sarvottam Takes Shape",
    description:
      "The Sarvottam brand was conceived with a commitment to delivering premium experiences through innovative design and quality construction.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    position: "top",
    number: "03",
  },
  {
    year: "2024",
    title: "Galactic City Launch",
    description:
      "Launched Galactic City, a visionary township development designed to redefine modern urban living.",
    image:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1400&q=85",
    position: "bottom",
    number: "04",
  },
  {
    year: "2025",
    title: "JainX Launch",
    description:
      "Introduced JainX, a forward-looking initiative focused on innovation, growth and next-generation development opportunities.",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=85",
    position: "top",
    number: "05",
  },
  {
    year: "2026",
    title: "Sarvottam Crown Residences",
    description:
      "Unveiled Sarvottam Crown Residences, an exclusive luxury residential development crafted for elevated lifestyles.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85",
    position: "bottom",
    number: "06",
  },
];

const HistoryTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) return;

      const cards = gsap.utils.toArray<HTMLElement>(".history-card");

      /* =========================================
         INITIAL CARD STATES
      ========================================= */

      gsap.set(cards, {
        opacity: 0.35,
        y: 45,
      });

      /* =========================================
         HORIZONTAL DISTANCE
         
         Recalculate because the track width
         depends on viewport/card dimensions.
      ========================================= */

      const getScrollDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth);
      };

      /* =========================================
         MAIN HORIZONTAL SCROLL
         
         Vertical page scroll controls the
         horizontal history movement.
      ========================================= */

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance() + window.innerHeight * 0.65}`,
          pin: true,
          scrub: 1.15,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const progress = self.progress;

            cards.forEach((card, index) => {
              const cardStart = index / cards.length;
              const cardEnd = (index + 1) / cards.length;

              let localProgress =
                (progress - cardStart) /
                (cardEnd - cardStart);

              localProgress = gsap.utils.clamp(
                0,
                1,
                localProgress
              );

              /*
               * Card becomes prominent as the horizontal
               * scroll approaches it.
               */

              const distanceFromCenter = Math.abs(
                localProgress - 0.5
              );

              const opacity = gsap.utils.mapRange(
                0,
                0.5,
                1,
                0.45,
                distanceFromCenter
              );

              const y = gsap.utils.mapRange(
                0,
                0.5,
                0,
                24,
                distanceFromCenter
              );

              gsap.set(card, {
                opacity,
                y,
              });
            });
          },
        },
      });

      /* =========================================
         CARD IMAGE PARALLAX
      ========================================= */

      cards.forEach((card) => {
        const image = card.querySelector(
          ".history-card-image"
        );

        if (!image) return;

        gsap.fromTo(
          image,
          {
            scale: 1.15,
            xPercent: -4,
          },
          {
            scale: 1,
            xPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      /* =========================================
         CARD IMAGE REVEAL
      ========================================= */

      cards.forEach((card) => {
        const imageFrame = card.querySelector(
          ".history-card-image-wrap"
        );

        if (!imageFrame) return;

        gsap.from(imageFrame, {
          clipPath: "inset(10% 8% 10% 8%)",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      /* =========================================
         YEAR / DOT SCALE
      ========================================= */

      cards.forEach((card) => {
        const year = card.querySelector(".history-year");
        const dot = card.querySelector(".history-dot");

        if (!year || !dot) return;

        gsap.fromTo(
          [year, dot],
          {
            opacity: 0.25,
            scale: 0.85,
          },
          {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 70%",
              end: "left 42%",
              scrub: true,
            },
          }
        );
      });

      /* =========================================
         REFRESH AFTER IMAGES LOAD
      ========================================= */

      window.addEventListener("load", () => {
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="history-section"
      ref={sectionRef}
    >
      {/* =========================================
          SECTION HEADER
      ========================================= */}

      <div className="history-header">
        <div className="history-header-left">
          <span className="history-eyebrow">
            OUR JOURNEY
          </span>

          <span className="history-header-line" />
        </div>

        <div className="history-header-right">
    
          <div className="history-scroll-indicator">
            <span />
          </div>
        </div>
      </div>

      {/* =========================================
          TIMELINE
      ========================================= */}

      <div className="history-viewport">
        <div
          className="history-track"
          ref={trackRef}
        >
          {/* STARTING SPACE */}

          <div className="history-intro-space">
            <span>FROM</span>

            <strong>1980</strong>

            <p>
              A journey shaped by
              <br />
              vision and conviction.
            </p>
          </div>

          {/* CENTER TIMELINE */}

        

          {historyData.map((item) => (
            <article
              className={`history-card history-card-${item.position}`}
              key={item.year}
            >
              {/* YEAR */}

              <div className="history-year-wrap">
                <span className="history-dot" />

                <span className="history-year">
                  {item.year}
                </span>
              </div>

              {/* IMAGE */}

              <div className="history-card-image-wrap">
                <div
                  className="history-card-image"
                  style={{
                    backgroundImage: `url("${item.image}")`,
                  }}
                />

                <div className="history-card-gradient" />

                <div className="history-card-number">
                  {item.number}
                </div>

                <div className="history-card-overlay-content">
                  <h3>{item.title}</h3>

                  <span>
                    {item.year}
                  </span>
                </div>
              </div>

              {/* TEXT */}

              <div className="history-card-description">
                <p>{item.description}</p>

                <span className="history-read">
                  DISCOVER THE STORY
                  <i />
                </span>
              </div>
            </article>
          ))}

          {/* END */}

          <div className="history-end">
            <span>AND THE JOURNEY</span>

            <strong>CONTINUES.</strong>

            <div className="history-end-line" />
          </div>
        </div>
      </div>

   
    </section>
  );
};

export default HistoryTimeline;