import { useLayoutEffect, useRef, useState } from "react";
import directorsImage from "../../assets/Directors.avif";
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

const directorsMessage = [
  "Every great institution is built on a vision that extends beyond commercial success. At Sarvottam World, our purpose has always been to create enduring assets that enrich lives, strengthen communities, and contribute meaningfully to India's transformation into a global economic powerhouse.",
  "From our strong foundation in real estate, Sarvottam World has evolved into a diversified enterprise with a clear vision for the future. Over the next decade, we are committed to building an integrated ecosystem spanning world-class infrastructure, premium residential communities, plotted developments, IT & ITES parks, healthcare institutions, automobile hubs, and financial services. Together, these businesses will shape vibrant urban destinations that enable people to live, work, invest, and prosper.",
  "India stands at the threshold of an unprecedented era of growth, driven by rapid urbanization, digital innovation, infrastructure expansion, and rising aspirations. We believe this moment calls for visionary leadership and responsible development. Every project we undertake is designed with a long-term perspective—creating sustainable value, strengthening economic ecosystems, generating employment, and supporting the nation's progress.",
  "Our success is not defined solely by the scale of our developments, but by the trust we earn, the opportunities we create, and the lasting impact we leave for future generations. Integrity, innovation, excellence, and disciplined execution remain the cornerstones of every decision we make.",
  "As we move towards 2035, our aspiration is to establish Sarvottam World among India's most respected and diversified business Worlds—setting new benchmarks in quality, sustainability, governance, and customer trust across every sector we serve.",
  "We are not merely developing projects. We are creating destinations, building institutions, empowering industries, and partnering in India's next chapter of growth.",
  "Together, we remain committed to Shaping Progress. Building India's Future.",
];

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

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  /* =====================================================
     EXISTING TEAM SCROLL ANIMATIONS
  ===================================================== */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".team-item");

      gsap.fromTo(
        ".directors-image",
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".directors-image-wrapper",
            start: "top bottom",
            end: "bottom 40%",
            scrub: true,
          },
        },
      );

      gsap.utils
        .toArray<HTMLElement>(".directors-message-paragraph")
        .forEach((paragraph) => {
          const words = paragraph.querySelectorAll(".message-word");

          gsap.fromTo(
            words,
            { opacity: 0.15 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: {
                trigger: paragraph,
                start: "top 85%",
                end: "bottom 55%",
                scrub: true,
              },
            },
          );
        });

      items.forEach((item) => {
        const image = item.querySelector<HTMLImageElement>(".team-image");

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
          },
        )
          .to(
            image,
            {
              filter: "grayscale(0%)",
              duration: 2,
              ease: "none",
            },
            0.2,
          )
          .to(
            image,
            {
              scale: 1,
              duration: 2,
              ease: "power2.out",
            },
            0,
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
        "-=0.4",
      )
      .to(
        content,
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.4,
        },
        "-=0.2",
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
        "-=0.1",
      )
      .to(
        overlay,
        {
          scaleY: 0,
          x: "-100%",
          opacity: 0,
          duration: 0.6,
        },
        "-=0.2",
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
        <div className="teams-header">
          <span>Sarvottam World</span>
          <h2>Board of Directors</h2>
          <p>
            Meet the leaders driving innovation, strategic growth, and
            excellence across our organization.
          </p>
        </div>

        <div className="directors-image-wrapper">
          <img
            className="directors-image"
            src={directorsImage}
            alt="Managing Directors"
          />
        </div>

        <div className="directors-message">
          <h2>Joint Message from the Managing Directors</h2>

          {directorsMessage.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === directorsMessage.length - 1
                  ? "directors-message-paragraph directors-message-closing"
                  : "directors-message-paragraph"
              }
            >
              {paragraph.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="message-word">
                  {word}{" "}
                </span>
              ))}
            </p>
          ))}
        </div>

        <div className="teams-subheader">
          <span>Sarvottam World</span>
          <h2>Key Personnel</h2>
        </div>

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
                    <h3 className="team-name">
                      {member.name}

                      <span className="team-name-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </h3>

                    <p>{member.designation}</p>
                  </div>

                  <span>{String(member.id).padStart(2, "0")}</span>
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
                <img src={selectedMember.image} alt={selectedMember.name} />
              </div>

              <div className="team-popup-details">
                <span className="team-popup-number">
                  {String(selectedMember.id).padStart(2, "0")}
                </span>

                <p className="team-popup-designation">
                  {selectedMember.designation}
                </p>

                <h2 id="team-popup-name">{selectedMember.name}</h2>

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
