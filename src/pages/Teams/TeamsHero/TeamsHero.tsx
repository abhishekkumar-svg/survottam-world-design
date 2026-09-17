import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TeamsHero.css";

gsap.registerPlugin(ScrollTrigger);

const TeamsHero = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const storyRef = useRef<HTMLElement>(null);
  const storyBuildingRef = useRef<HTMLDivElement>(null);
  const storyYearsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================================
         HERO INTRO
      ========================================= */

      const heroTl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTl
        .from(".about-hero-eyebrow span", {
          y: 25,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
        })
        .from(
          ".about-hero-title .line",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1.2,
            stagger: 0.12,
          },
          "-=0.45"
        )
        .from(
          ".about-hero-meta",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.55"
        )
        .from(
          ".about-hero-scroll",
          {
            y: 15,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        );

      /* =========================================
         HERO IMAGE PARALLAX
      ========================================= */

      gsap.fromTo(
        heroImageRef.current,
        {
          scale: 1.12,
          yPercent: -4,
        },
        {
          scale: 1,
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      /* =========================================
         HERO CONTENT PARALLAX
      ========================================= */

      gsap.to(heroContentRef.current, {
        yPercent: -22,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".about-hero-overlay", {
        opacity: 0.72,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =========================================
         OUR STORY — EDITORIAL REVEAL
      ========================================= */

      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 72%",
          once: true,
        },
      });

      storyTl
        .from(".story-eyebrow span", {
          y: 18,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
        })
        .from(
          ".story-heading .story-line",
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.95,
            stagger: 0.1,
          },
          "-=0.25"
        )
        .from(
          ".story-copy p",
          {
            y: 24,
            opacity: 0,
            duration: 0.75,
            stagger: 0.12,
          },
          "-=0.35"
        )
        .from(
          ".story-quote",
          {
            y: 28,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.35"
        )
        .from(
          ".story-signature",
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.35"
        );

      /* =========================================
         ARCHITECTURAL LINE DRAWING
      ========================================= */

      gsap.from(".story-architecture-lines", {
        opacity: 0,
        scale: 0.94,
        y: 35,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 72%",
          once: true,
        },
      });

      /* =========================================
         40+ BUILDING IMAGE REVEAL
      ========================================= */

      gsap.from(".story-building-frame", {
        clipPath: "inset(12% 0 12% 0)",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: storyBuildingRef.current,
          start: "top 82%",
          once: true,
        },
      });

      /* =========================================
         BUILDING IMAGE PARALLAX
      ========================================= */

      gsap.fromTo(
        storyBuildingRef.current,
        {
          scale: 1.12,
          yPercent: -5,
        },
        {
          scale: 1,
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: storyBuildingRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.25,
          },
        }
      );

      /* =========================================
         40+ TYPE PARALLAX
      ========================================= */

      gsap.fromTo(
        storyYearsRef.current,
        {
          xPercent: -10,
          opacity: 0.25,
        },
        {
          xPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: storyBuildingRef.current,
            start: "top 85%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      /* =========================================
         GOLD DETAILS
      ========================================= */

      gsap.from(".story-gold-line", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 72%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-us-page" ref={pageRef}>
      {/* =========================================
          HERO
      ========================================= */}

      <section className="about-hero" ref={heroRef}>
        <div
          className="about-hero-image"
          ref={heroImageRef}
          aria-hidden="true"
        />

        <div className="about-hero-overlay" />
        <div className="about-hero-grain" />

        <div className="about-hero-content" ref={heroContentRef}>
          <div className="about-hero-eyebrow">
             <span>ONE TEAM</span>
  <span>SHARED VISION</span>
  <span>BUILT TOGETHER</span>
          </div>

          <h1 className="about-hero-title">
            <span className="title-line-wrap">
              <span className="line"> Behind Every Vision,</span>
            </span>

            <span className="title-line-wrap">
              <span className="line gold"> There Are People.</span>
            </span>
          </h1>

          <div className="about-hero-bottom">
            <div className="about-hero-meta">
           <span>LEADERSHIP</span>
    <i />
    <span>CREATIVITY</span>
    <i />
    <span>COMMITMENT</span>
            </div>

           
          </div>
        </div>

       
      </section>

    </div>
  );
};

export default TeamsHero;
