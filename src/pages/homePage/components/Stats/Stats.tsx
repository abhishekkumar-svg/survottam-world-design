import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Stats.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 15,
    suffix: "+",
    label: "YEARS OF EXCELLENCE",
  },
  {
    value: 50,
    suffix: "+",
    label: "PROJECTS DELIVERED",
  },
  {
    value: 5000,
    suffix: "+",
    label: "HAPPY FAMILIES",
  },
  {
    value: 25,
    suffix: "+",
    label: "LANDMARK PROJECTS",
  },
  {
    value: 500,
    suffix: "+",
    label: "TEAM MEMBERS",
  },
  {
    value: 100,
    suffix: "%",
    label: "ON-TIME DELIVERY",
  },
];

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const counters = section.querySelectorAll<HTMLElement>(
        ".stats-number"
      );

      counters.forEach((counter) => {
        const target = Number(counter.dataset.value);

        const obj = {
          value: 0,
        };

        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",

          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },

          onUpdate: () => {
            counter.textContent =
              Math.floor(obj.value).toLocaleString("en-IN");
          },
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stats-section"
    >
      <div className="stats-container">

        {stats.map((stat, index) => (
          <div
            className="stat-item"
            key={index}
          >
            <div className="stat-number-wrapper">
              <span
                className="stats-number"
                data-value={stat.value}
              >
                0
              </span>

              <span className="stats-suffix">
                {stat.suffix}
              </span>
            </div>

            <span className="stat-label">
              {stat.label}
            </span>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Stats;