import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import type { Project } from "../../types/projectTypes";

import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  /** Two short lines shown over the hero image, e.g. ["Work. Connect.", "Grow."] */
  tagline?: string[];
  /** Small uppercase line under the tagline, e.g. "Spaces that empower progress" */
  taglineSub?: string;
  /** Short place name for the front face, e.g. "Noida". Falls back to project.location */
  city?: string;
  /** 2-3 short lines shown on the back face instead of an amenities list */
  highlights?: string[];
}

const IconBuilding = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="2.5" width="9" height="15" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M7 6h1M11 6h1M7 9h1M11 9h1M7 12h1M11 12h1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M13 8h2.5a0.5 0.5 0 0 1 0.5 0.5V17H13" stroke="currentColor" strokeWidth="1.2" />
    <path d="M2 17.5h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconLayers = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2.5 17.5 7 10 11.5 2.5 7 10 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M2.5 10.5 10 15l7.5-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 14 10 18.5 17.5 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconExpand = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 2.5H2.5V7M13 2.5h4.5V7M2.5 13v4.5H7M17.5 13v4.5H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPin = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 18s6-5.6 6-10.2A6 6 0 0 0 4 7.8C4 12.4 10 18 10 18Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <circle cx="10" cy="7.8" r="2" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export default function ProjectCard({
  project,
  tagline = ["Work. Connect.", "Grow."],
  taglineSub = "Spaces that empower progress",
  city,
  highlights = [],
}: ProjectCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const supportsHover = useRef(true);
  const [isFlipped, setIsFlipped] = useState(false);
console.log("isFlipped", isFlipped)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card) return;

    supportsHover.current =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    gsap.set(wrapper, { perspective: 1000 });
    gsap.set(card, { transformStyle: "preserve-3d" });
    gsap.set(card.querySelector(".project-card-back"), { rotationY: -180 });
    gsap.set(
      [
        card.querySelector(".project-card-front"),
        card.querySelector(".project-card-back"),
      ],
      { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }
    );

    const tl = gsap.timeline({ paused: true });
    tl.to(card, { duration: 0.9, rotationY: -180, ease: "power1.out" });
    timelineRef.current = tl;

    const handleEnter = () => {
      if (supportsHover.current) timelineRef.current?.play();
    };
    const handleLeave = () => {
      if (supportsHover.current) timelineRef.current?.reverse();
    };

    wrapper.addEventListener("mouseenter", handleEnter);
    wrapper.addEventListener("mouseleave", handleLeave);

    return () => {
      wrapper.removeEventListener("mouseenter", handleEnter);
      wrapper.removeEventListener("mouseleave", handleLeave);
      tl.kill();
    };
  }, []);

  const handleTapFlip = () => {
    if (supportsHover.current) return;
    setIsFlipped((prev) => {
      const next = !prev;
      next ? timelineRef.current?.play() : timelineRef.current?.reverse();
      return next;
    });
  };

  return (
    <div ref={wrapperRef} className="project-card-wrapper" onClick={handleTapFlip}>
      <article ref={cardRef} className="project-card">
        {/* ================= FRONT ================= */}
        <div className="project-card-face project-card-front">
          <img
            className="project-card-bg"
            src={project.frontImage}
            alt={project.title}
            loading="lazy"
          />
          <div className="project-card-scrim" />
          <div className="project-card-hero">
            <h2>
              {tagline.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </h2>
            <div className="project-card-rule" />
            <p>{taglineSub}</p>
          </div>

          <div className="project-card-front-info">
            <h3>{project.title}</h3>
            <span className="project-card-developer">{project.developer}</span>

            <div className="project-card-front-bottom">
              <div className="project-card-front-meta">
                <div className="project-card-meta-row">
                  <IconBuilding />
                  <p>{project.subCategory}</p>
                </div>
                <div className="project-card-meta-row">
                  <IconPin />
                  <p>{city ?? project.location}</p>
                </div>
              </div>

              <button
                className="project-card-arrow"
                type="button"
                aria-label={`Explore ${project.title}`}
                onClick={(e) => e.stopPropagation()}
              >
                ↗
              </button>
            </div>
          </div>
        </div>

        {/* ================= BACK ================= */}
        <div className="project-card-face project-card-back">
          <div className="project-card-back-hero">
            <img src={project.backImage} alt="" loading="lazy" />
            <div className="project-card-back-scrim" />

            <button
              className="project-card-close"
              type="button"
              aria-label="Close project details"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
                timelineRef.current?.reverse();
              }}
            >
              ×
            </button>

            <div className="project-card-back-heading">
              {/* <span>{project.developer}</span> */}
              <h3>{project.title}</h3>
              <div className="project-card-rule project-card-rule-light" />
              <p>{project.description}</p>
            </div>
          </div>

          <div className="project-card-back-content">
            <div className="project-card-details">
              <div className="project-detail">
                <IconBuilding />
                <div>
                  <span>Type</span>
                  <strong>{project.subCategory}</strong>
                </div>
              </div>
              <div className="project-detail">
                <IconLayers />
                <div>
                  <span>Status</span>
                  <strong>{project.status}</strong>
                </div>
              </div>
              <div className="project-detail">
                <IconExpand />
                <div>
                  <span>Total Area</span>
                  <strong>{project.area}</strong>
                </div>
              </div>
              <div className="project-detail">
                <IconPin />
                <div>
                  <span>Location</span>
                  <strong>{project.location}</strong>
                </div>
              </div>
            </div>

            {highlights.length > 0 && (
              <div className="project-highlights">
                {highlights.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            )}
          </div>

          <button
            className="project-card-view"
            type="button"
            onClick={(e) => e.stopPropagation()}
          >
            <span>View Project</span>
            <span>→</span>
          </button>
        </div>
      </article>
    </div>
  );
}