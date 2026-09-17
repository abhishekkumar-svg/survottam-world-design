import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Teams.css";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    designation: "Managing Director",
    image: "https://i.pravatar.cc/800?img=32",
  },
  {
    id: 2,
    name: "Ananya Kapoor",
    designation: "Executive Director",
    image: "https://i.pravatar.cc/800?img=13",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    designation: "Chief Architect",
    image: "https://i.pravatar.cc/800?img=47",
  },
  {
    id: 4,
    name: "Priya Verma",
    designation: "Design Director",
    image: "https://i.pravatar.cc/800?img=44",
  },
  {
    id: 5,
    name: "Rohan Malhotra",
    designation: "Senior Project Manager",
    image: "https://i.pravatar.cc/800?img=12",
  },
  {
    id: 6,
    name: "Ishita Singh",
    designation: "Creative Lead",
    image: "https://i.pravatar.cc/800?img=45",
  },
  {
    id: 7,
    name: "Karan Khanna",
    designation: "Senior Architect",
    image: "https://i.pravatar.cc/800?img=11",
  },
  {
    id: 8,
    name: "Meera Joshi",
    designation: "Interior Designer",
    image: "https://i.pravatar.cc/800?img=49",
  },
  {
    id: 9,
    name: "Aditya Bansal",
    designation: "Project Lead",
    image: "https://i.pravatar.cc/800?img=15",
  },
  {
    id: 10,
    name: "Naina Agarwal",
    designation: "Urban Planner",
    image: "https://i.pravatar.cc/800?img=25",
  },
  {
    id: 11,
    name: "Vikram Sethi",
    designation: "Construction Head",
    image: "https://i.pravatar.cc/800?img=68",
  },
  {
    id: 12,
    name: "Simran Kaur",
    designation: "Landscape Architect",
    image: "https://i.pravatar.cc/800?img=26",
  },
  {
    id: 13,
    name: "Aman Gupta",
    designation: "Design Manager",
    image: "https://i.pravatar.cc/800?img=57",
  },
  {
    id: 14,
    name: "Riya Chawla",
    designation: "Brand Strategist",
    image: "https://i.pravatar.cc/800?img=48",
  },
  {
    id: 15,
    name: "Siddharth Rao",
    designation: "Planning Consultant",
    image: "https://i.pravatar.cc/800?img=70",
  },
  {
    id: 16,
    name: "Kavya Nair",
    designation: "Senior Designer",
    image: "https://i.pravatar.cc/800?img=23",
  },
  {
    id: 17,
    name: "Dev Malhotra",
    designation: "Technical Director",
    image: "https://i.pravatar.cc/800?img=53",
  },
  {
    id: 18,
    name: "Tanya Arora",
    designation: "Project Coordinator",
    image: "https://i.pravatar.cc/800?img=29",
  },
];

export default function Teams() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".team-item");

      items.forEach((item) => {
        const image = item.querySelector<HTMLImageElement>(".team-image");

        if (!image) return;

        /*
         * Initial state
         *
         * Image starts slightly above,
         * grayscale and slightly enlarged.
         */
        gsap.set(image, {
          yPercent: 0,
          opacity: 0,
          scale: 1,
          duration: 2,
          filter: "grayscale(100%)",
        });

        /*
         * ONE timeline controls the complete animation.
         *
         * Because this timeline is scrubbed by ScrollTrigger,
         * everything automatically plays forward AND backward.
         */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,

            // Animation begins when card enters
            start: "top 85%",

            // Animation completes around the center
            end: "top 35%",
            scrub: 3,

            // Important:
            // ScrollTrigger recalculates correctly when
            // resizing / refreshing the page.
            invalidateOnRefresh: true,
          },
        });

        /*
         * 0 → 0.65
         *
         * Image slides down into its wrapper
         * and fades in.
         */
        tl.fromTo(image,{
            yPercent: 0,
            opacity: 0,
            duration: 2,
          }, 
          {
          yPercent: 100,
          opacity: 1,
          duration: 2,
          ease: "power3.inOut",
        })

          /*
           * 0.2 → 0.9
           *
           * Image gradually changes from grayscale
           * to full color.
           */
          .to(
            image,
            {
              filter: "grayscale(0%)",
              duration: 2,
              ease: "none",
            },
            0.2
          )

          /*
           * 0 → 0.9
           *
           * Image returns to natural scale.
           */
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

    /*
     * Kill all ScrollTriggers and animations
     * when component unmounts.
     */
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="teams-section">
      {/* <header className="teams-header">
        <span>OUR TEAM</span>

        <h2>
          People behind
          <br />
          the vision.
        </h2>

        <p>
          Meet the people whose experience, creativity and dedication shape
          everything we create.
        </p>
      </header> */}

      <div className="teams-grid">
        {teamMembers.map((member) => (
          <article key={member.id} className="team-item">
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

              <span>{String(member.id).padStart(2, "0")}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}