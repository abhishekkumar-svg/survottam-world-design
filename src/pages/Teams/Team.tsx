
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Teams.css";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  introduction: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    designation: "Managing Director",
    image: "https://i.pravatar.cc/800?img=32",
    introduction:
      "Rahul brings over two decades of experience in real estate development and strategic leadership. His vision focuses on creating thoughtful spaces that balance long-term value, design excellence, and meaningful experiences for the people who use them.",
  },
  {
    id: 2,
    name: "Ananya Kapoor",
    designation: "Executive Director",
    image: "https://i.pravatar.cc/800?img=13",
    introduction:
      "Ananya leads strategic initiatives across the organisation, bringing together business thinking, design sensitivity, and a strong understanding of evolving customer expectations.",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    designation: "Chief Architect",
    image: "https://i.pravatar.cc/800?img=47",
    introduction:
      "Arjun oversees architectural direction across projects, translating ideas into thoughtful environments that combine functionality, character, and timeless design.",
  },
  {
    id: 4,
    name: "Priya Verma",
    designation: "Design Director",
    image: "https://i.pravatar.cc/800?img=44",
    introduction:
      "Priya guides the creative and design language of the organisation, ensuring every detail contributes to a consistent and distinctive experience.",
  },
  {
    id: 5,
    name: "Rohan Malhotra",
    designation: "Senior Project Manager",
    image: "https://i.pravatar.cc/800?img=12",
    introduction:
      "Rohan manages complex projects from planning through execution, coordinating teams and ensuring that ideas are delivered with precision and efficiency.",
  },
  {
    id: 6,
    name: "Ishita Singh",
    designation: "Creative Lead",
    image: "https://i.pravatar.cc/800?img=45",
    introduction:
      "Ishita develops creative concepts and visual narratives that help transform projects into distinctive and memorable experiences.",
  },
  {
    id: 7,
    name: "Karan Khanna",
    designation: "Senior Architect",
    image: "https://i.pravatar.cc/800?img=11",
    introduction:
      "Karan works across architecture and planning, with a focus on creating practical spaces that retain a strong visual identity.",
  },
  {
    id: 8,
    name: "Meera Joshi",
    designation: "Interior Designer",
    image: "https://i.pravatar.cc/800?img=49",
    introduction:
      "Meera creates refined interior environments by combining materiality, proportion, light, and functionality into cohesive spaces.",
  },
  {
    id: 9,
    name: "Aditya Bansal",
    designation: "Project Lead",
    image: "https://i.pravatar.cc/800?img=15",
    introduction:
      "Aditya coordinates project teams and ensures that design intent, timelines, and execution remain aligned throughout the development process.",
  },
  {
    id: 10,
    name: "Naina Agarwal",
    designation: "Urban Planner",
    image: "https://i.pravatar.cc/800?img=25",
    introduction:
      "Naina focuses on urban planning strategies that connect individual developments with their wider surroundings and communities.",
  },
  {
    id: 11,
    name: "Vikram Sethi",
    designation: "Construction Head",
    image: "https://i.pravatar.cc/800?img=68",
    introduction:
      "Vikram oversees construction operations, working closely with teams and partners to maintain quality, safety, and delivery standards.",
  },
  {
    id: 12,
    name: "Simran Kaur",
    designation: "Landscape Architect",
    image: "https://i.pravatar.cc/800?img=26",
    introduction:
      "Simran creates landscape concepts that bring natural elements into the built environment while strengthening the identity of each project.",
  },
  {
    id: 13,
    name: "Aman Gupta",
    designation: "Design Manager",
    image: "https://i.pravatar.cc/800?img=57",
    introduction:
      "Aman manages multidisciplinary design teams and helps turn creative concepts into coordinated and buildable solutions.",
  },
  {
    id: 14,
    name: "Riya Chawla",
    designation: "Brand Strategist",
    image: "https://i.pravatar.cc/800?img=48",
    introduction:
      "Riya shapes the organisation's brand communication, developing narratives that connect projects with their audiences in meaningful ways.",
  },
  {
    id: 15,
    name: "Siddharth Rao",
    designation: "Planning Consultant",
    image: "https://i.pravatar.cc/800?img=70",
    introduction:
      "Siddharth works on planning strategies, feasibility, and development frameworks to support informed project decisions.",
  },
  {
    id: 16,
    name: "Kavya Nair",
    designation: "Senior Designer",
    image: "https://i.pravatar.cc/800?img=23",
    introduction:
      "Kavya contributes to the visual and spatial design of projects, bringing a detail-oriented approach to every stage of the creative process.",
  },
  {
    id: 17,
    name: "Dev Malhotra",
    designation: "Technical Director",
    image: "https://i.pravatar.cc/800?img=53",
    introduction:
      "Dev oversees technical coordination and ensures that ambitious design ideas are supported by robust technical solutions.",
  },
  {
    id: 18,
    name: "Tanya Arora",
    designation: "Project Coordinator",
    image: "https://i.pravatar.cc/800?img=29",
    introduction:
      "Tanya coordinates project communication, documentation, and day-to-day activities to keep teams moving efficiently toward shared goals.",
  },
];

export default function Teams() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Popup refs
  const popupOverlayRef = useRef<HTMLDivElement | null>(null);
  const popupCardRef = useRef<HTMLDivElement | null>(null);
  const popupContentRef = useRef<HTMLDivElement | null>(null);

  const popupTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(
    null
  );

  /* =====================================================
     EXISTING TEAM SCROLL ANIMATIONS
  ===================================================== */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".team-item");

      items.forEach((item) => {
        const image =
          item.querySelector<HTMLImageElement>(".team-image");

        if (!image) return;

        gsap.set(image, {
          yPercent: 0,
          opacity: 0,
          scale: 1,
          duration: 2,
          filter: "grayscale(100%)",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 35%",
            scrub: 3,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          image,
          {
            yPercent: 0,
            opacity: 0,
            duration: 2,
          },
          {
            yPercent: 100,
            opacity: 1,
            duration: 2,
            ease: "power3.inOut",
          }
        )
          .to(
            image,
            {
              filter: "grayscale(0%)",
              duration: 2,
              ease: "none",
            },
            0.2
          )
          .to(
            image,
            {
              scale: 1,
              duration: 2,
              ease: "power2.out",
            },
            0
          );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =====================================================
     POPUP OPEN ANIMATION
  ===================================================== */

  useLayoutEffect(() => {
    if (!selectedMember) return;

    const overlay = popupOverlayRef.current;
    const card = popupCardRef.current;
    const content = popupContentRef.current;

    if (!overlay || !card || !content) return;

    // Kill previous popup animation
    popupTimelineRef.current?.kill();

    // Initial state
    gsap.set(overlay, {
      display: "flex",
      scaleY: 0,
      x: "-100%",
      opacity: 0,
    });

    gsap.set(card, {
      scaleY: 0,
      opacity: 0,
      transformOrigin: "center center",
    });

    gsap.set(content, {
      scaleY: 0,
      opacity: 0,
      transformOrigin: "center center",
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
    });

    popupTimelineRef.current = tl;

    tl.to(overlay, {
      scaleY: 0.01,
      x: 0,
      opacity: 1,
      duration: 0.1,
    })
      .to(overlay, {
        scaleY: 1,
        opacity: 1,
        duration: 0.6,
      })
      .to(
        card,
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.6,
        },
        "-=0.4"
      )
      .to(
        content,
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.4,
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, [selectedMember]);

  /* =====================================================
     OPEN POPUP
  ===================================================== */

  const openMember = (member: TeamMember) => {
    setSelectedMember(member);
  };

  /* =====================================================
     CLOSE POPUP
  ===================================================== */

  const closeMember = () => {
    const overlay = popupOverlayRef.current;
    const card = popupCardRef.current;
    const content = popupContentRef.current;

    if (!overlay || !card || !content) {
      setSelectedMember(null);
      return;
    }

    popupTimelineRef.current?.kill();

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
      onComplete: () => {
        setSelectedMember(null);
      },
    });

    popupTimelineRef.current = tl;

    tl.to(content, {
      scaleY: 0,
      opacity: 0,
      duration: 0.25,
    })
      .to(
        card,
        {
          scaleY: 0,
          opacity: 0,
          duration: 0.4,
        },
        "-=0.1"
      )
      .to(
        overlay,
        {
          scaleY: 0,
          x: "-100%",
          opacity: 0,
          duration: 0.6,
        },
        "-=0.2"
      );
  };

  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  useLayoutEffect(() => {
    if (!selectedMember) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMember();
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Prevent background scrolling while popup is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedMember]);

  return (
    <>
      <section ref={sectionRef} className="teams-section">
        <div className="teams-grid">
          {teamMembers.map((member) => (
            <article key={member.id} className="team-item">
              <button
                type="button"
                className="team-member-trigger"
                onClick={() => openMember(member)}
                aria-label={`View ${member.name}'s profile`}
              >
                <div className="team-image-wrapper">
                  <img
                    className="team-image"
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                  />
                </div>

                <div className="team-info">
                  <div>
                    <h3>{member.name}</h3>
                    <p>{member.designation}</p>
                  </div>

                  <span>
                    {String(member.id).padStart(2, "0")}
                  </span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          MEMBER POPUP
      ===================================================== */}

      {selectedMember && (
        <div
          ref={popupOverlayRef}
          className="team-popup-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeMember();
            }
          }}
        >
          <div
            ref={popupCardRef}
            className="team-popup-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-popup-name"
          >
            <button
              type="button"
              className="team-popup-close"
              onClick={closeMember}
              aria-label="Close profile"
            >
              <span></span>
              <span></span>
            </button>

            <div ref={popupContentRef} className="team-popup-content">
              <div className="team-popup-image">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                />
              </div>

              <div className="team-popup-details">
                <span className="team-popup-number">
                  {String(selectedMember.id).padStart(2, "0")}
                </span>

                <p className="team-popup-designation">
                  {selectedMember.designation}
                </p>

                <h2 id="team-popup-name">
                  {selectedMember.name}
                </h2>

                <div className="team-popup-line" />

                <p className="team-popup-introduction">
                  {selectedMember.introduction}
                </p>

                <button
                  type="button"
                  className="team-popup-close-text"
                  onClick={closeMember}
                >
                  Close profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
