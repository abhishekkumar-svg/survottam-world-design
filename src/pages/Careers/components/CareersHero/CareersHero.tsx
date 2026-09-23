import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CareersHero.css";

gsap.registerPlugin(ScrollTrigger);

const CareersHero = () => {
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
        .from(".careers-hero-eyebrow span", {
          y: 25,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
        })
        .from(
          ".careers-hero-title .line",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1.2,
            stagger: 0.12,
          },
          "-=0.45"
        )
        .from(
          ".careers-hero-meta",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.55"
        )
        .from(
          ".careers-hero-scroll",
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

      gsap.to(".careers-hero-overlay", {
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
    <div className="careers-us-page" ref={pageRef}>
      {/* =========================================
          HERO
      ========================================= */}

      <section className="careers-hero" ref={heroRef}>
        <div
          className="careers-hero-image"
          ref={heroImageRef}
          aria-hidden="true"
        />

        <div className="careers-hero-overlay" />
        <div className="careers-hero-grain" />
<div className="careers-hero-content" ref={heroContentRef}>
  <div className="careers-hero-eyebrow">
    <span>CAREERS</span>
    <span>PEOPLE</span>
    <span>OPPORTUNITIES</span>
  </div>

  <h1 className="careers-hero-title">
    <span className="title-line-wrap">
      <span className="line">Build Your</span>
    </span>

    <span className="title-line-wrap">
      <span className="line gold">Future.</span>
    </span>
  </h1>

  <div className="careers-hero-bottom">
    <div className="careers-hero-meta">
      <span>JOIN OUR TEAM</span>
      <i />
      <span>OPEN ROLES</span>
      <i />
      <span>GROW TOGETHER</span>
    </div>
  </div>
</div>


       
      </section>

    </div>
  );
};

export default CareersHero;
