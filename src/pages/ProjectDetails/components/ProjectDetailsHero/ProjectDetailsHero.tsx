
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ProjectDetailsHero.css";

gsap.registerPlugin(ScrollTrigger);

const ProjectHero = ({projectDetails}: {projectDetails: any}) => {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================================
         HERO INTRO
      ========================================= */

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".project-hero-status", {
        y: 20,
        opacity: 0,
        duration: 0.7,
      })
        .from(
          ".project-hero-eyebrow",
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.35"
        )
        .from(
          ".project-hero-title .hero-title-line",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1.1,
            stagger: 0.12,
          },
          "-=0.25"
        )
        .from(
          ".project-hero-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45"
        )
       
        .from(
          ".project-hero-scroll",
          {
            opacity: 0,
            y: 15,
            duration: 0.6,
          },
          "-=0.3"
        );

      /* =========================================
         IMAGE PARALLAX
      ========================================= */

      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.12,
          yPercent: -4,
        },
        {
          scale: 1,
          yPercent: 7,
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
         CONTENT PARALLAX
      ========================================= */

      gsap.to(contentRef.current, {
        yPercent: -18,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =========================================
         OVERLAY DARKENS ON SCROLL
      ========================================= */

      gsap.to(".project-hero-overlay", {
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="project-hero"
    >
      {/* =========================================
          BACKGROUND IMAGE
      ========================================= */}

      <div
        ref={imageRef}
        className="project-hero-image"
        aria-hidden="true"
      />

      {/* DARK OVERLAY */}

      <div className="project-hero-overlay" />

      {/* SUBTLE GRAIN */}

      <div className="project-hero-grain" />

      {/* =========================================
          CONTENT
      ========================================= */}

      <div
        ref={contentRef}
        className="project-hero-content"
      >
        <div className="project-hero-main">

          {/* STATUS */}

          <div className="project-hero-status">
            <span className="status-dot" />
            <span>ONGOING</span>
          </div>


          {/* TITLE */}

          <h1 className="project-hero-title">
            <span className="hero-title-wrap">
              <span className="hero-title-line">
                {projectDetails.title || ""}
              </span>
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p className="project-hero-description">
            A contemporary commercial destination
            designed for ambitious businesses,
            retail experiences and modern
            workspaces.
          </p>

        </div>

        {/* =========================================
            BOTTOM META
        ========================================= */}

        <div className="project-hero-bottom">

          <div className="project-hero-meta">
           
            <div className="project-meta-item">
             
              <span className="project-meta-label">
                LOCATION
              </span>

              <span className="project-meta-value">
                Plot No. 6, Knowledge Park V
              </span>
            </div>


            <div className="project-meta-divider" />


            <div className="project-meta-item">
              <span className="project-meta-label">
                CONFIGURATION
              </span>

              <span className="project-meta-value">
                450 sq. ft. Corporate Suites
              </span>
            </div>


            <div className="project-meta-divider" />


            <div className="project-meta-item">
              <span className="project-meta-label">
                DEVELOPMENT
              </span>

              <span className="project-meta-value">
               Commercial Development
              </span>
            </div>

          </div>


      
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
