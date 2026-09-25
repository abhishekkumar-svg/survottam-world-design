import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   INTRO IMAGE
========================================= */

const introImage = {
  desktop:
    "https://sarvottamworld.in/_next/image?url=%2FProjects%2FDurga-Industrial.jpg&w=1920&q=75",

  mobile:
    "/hero-mobile-1.png",
};

/* =========================================
   SLIDES
========================================= */

const slides = [
  {
    desktopImage:
      "https://sarvottamworld.in/_next/image?url=%2FProjects%2FGolden-I.jpg&w=1920&q=75",

    mobileImage:
      "/hero-mobile-2.png",

    eyebrow: "Sarvottam World — Since 1989",

    title: ["Where Architecture", "Meets Aspiration"],

    description:
      "Ultra-Luxury Residences & Premium Commercial Developments",
  },

  {
    desktopImage:
      "https://sarvottamworld.in/Project%20Pictures/hero1.png",

    mobileImage:
      "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D",

    eyebrow: "Premium Developments",

    title: ["Spaces Designed", "For What's Ahead"],

    description:
      "Thoughtfully designed destinations built around modern lifestyles.",
  },
];

/* =========================================
   COMPONENT
========================================= */

export default function RealEstateHero() {
  const heroRef = useRef<HTMLElement | null>(null);


  const [mobileSlide, setMobileSlide] = useState(0);

  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    /* =========================================
       CHECK MOBILE
    ========================================= */

    const isMobile = window.matchMedia(
      "(max-width: 768px)"
    ).matches;

if (isMobile) {
  /* =========================================
     MOBILE SLIDER
     ========================================= */

 const interval = window.setInterval(() => {
  setMobileSlide((prev) => {

    return (prev + 1) % 3;
  });
}, 7000);

  /* =========================================
     MOBILE GSAP / SCROLLTRIGGER INITIALIZATION
     
     No visual animation.
     This simply lets GSAP/ScrollTrigger
     measure the Hero as part of the page.
     ========================================= */

  const ctx = gsap.context(() => {
    gsap.set(hero, {
      clearProps: "transform",
    });

    ScrollTrigger.create({
      trigger: hero,

      start: "top top",

      end: "bottom top",

      pin: false,

      scrub: false,

      invalidateOnRefresh: true,
    });

    /*
     * Let browser finish layout first,
     * then make ScrollTrigger calculate
     * Hero + following sections together.
     */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  }, hero);

  return () => {
    window.clearInterval(interval);

    ctx.revert();
  };
}
    /* =========================================
       DESKTOP GSAP
    ========================================= */

    const ctx = gsap.context(() => {
      const imageReveals =
        gsap.utils.toArray<HTMLElement>(
          ".hero-image-reveal"
        );

      const imageWrappers =
        gsap.utils.toArray<HTMLElement>(
          ".hero-image"
        );

      const slideContents =
        gsap.utils.toArray<HTMLElement>(
          ".hero-slide-content"
        );

      const header =
        hero.querySelector(
          ".hero-header"
        ) as HTMLElement | null;

      /*
       * =========================================
       * RESPONSIVE REVEAL RADIUS
       * =========================================
       */

      const revealRadius = "105%";

      /*
       * =========================================
       * INITIAL STATE
       * =========================================
       */

      // Intro image visible
      gsap.set(".hero-intro-image", {
        opacity: 1,
      });

      // Hero 1 starts as a small circle
      gsap.set(imageReveals[0], {
        clipPath:
          "circle(20% at 50% 105%)",
        opacity: 1,
        y: 160,
      });

      // Hero 2 hidden
      gsap.set(imageReveals.slice(1), {
        clipPath:
          "circle(0% at 50% 105%)",
        opacity: 1,
      });

      /*
       * =========================================
       * IMAGE ZOOM
       * =========================================
       */

      gsap.set(imageWrappers, {
        scale: 1.08,
      });

      /*
       * =========================================
       * INTRO CONTENT INITIAL STATE
       * =========================================
       */

      gsap.set(
        ".hero-intro-content .hero-copy-line",
        {
          yPercent: 110,
        }
      );

      gsap.set(
        ".hero-intro-content .hero-eyebrow",
        {
          opacity: 0,
          y: 20,
        }
      );

      /*
       * =========================================
       * SLIDE CONTENT INITIAL STATE
       * =========================================
       */

      slideContents.forEach((content) => {
        gsap.set(
          content.querySelectorAll(
            ".hero-copy-line"
          ),
          {
            yPercent: 110,
          }
        );

        gsap.set(
          content.querySelector(
            ".hero-eyebrow"
          ),
          {
            opacity: 0,
            y: 20,
          }
        );

        gsap.set(
          content.querySelector(
            ".hero-description"
          ),
          {
            opacity: 0,
            y: 100,
          }
        );

        gsap.set(content, {
          opacity: 0,
          yPercent: 0,
        });
      });

      /*
       * =========================================
       * INTRO ENTRANCE
       * =========================================
       */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .to(
          ".hero-intro-content .hero-eyebrow",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          }
        )
        .to(
          ".hero-intro-content .hero-copy-line",
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.35"
        );

      /*
       * =========================================
       * MASTER SCROLL TIMELINE
       * =========================================
       */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,

          start: "top top",

          end: "+=4700",

          pin: true,

          scrub: 1.2,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      /*
       * =========================================
       * INTRO IMAGE → IMAGE 1
       * =========================================
       */

      tl.to(
        ".hero-intro-image",
        {
          opacity: 0,
          duration: 1.5,
          ease: "power3.inOut",
        },
        0
      );

      /*
       * =========================================
       * IMAGE 1 CIRCLE REVEAL
       * =========================================
       */

      tl.to(
        imageReveals[0],
        {
          clipPath: `circle(${revealRadius} at 50% 105%)`,
          duration: 1.5,
          ease: "power3.inOut",
          y: 0,
        },
        0
      );

      /*
       * =========================================
       * IMAGE 1 SCALE
       * =========================================
       */

      tl.to(
        imageWrappers[0],
        {
          scale: 1,
          duration: 1.5,
          ease: "none",
        },
        0
      );

      /*
       * =========================================
       * HEADER → GLASS
       * =========================================
       */

      if (header) {
        tl.to(
          header,
          {
            backgroundColor:
              "rgba(15, 20, 28, 0.32)",

            backdropFilter:
              "blur(4px)",

            webkitBackdropFilter:
              "blur(4px)",

            color: "#f3f3ec",

            borderBottomColor:
              "rgba(255, 255, 255, 0.12)",

            duration: 0.45,

            ease: "power2.out",
          },
          0.15
        );
      }

      /*
       * =========================================
       * INTRO CONTENT OUT
       * =========================================
       */

      tl.to(
        ".hero-intro-content",
        {
          opacity: 0,
          yPercent: -20,
          duration: 0.5,
          ease: "power2.in",
        },
        0.25
      );

      /*
       * =========================================
       * IMAGE 1 CONTENT IN
       * =========================================
       */

      tl.set(
        slideContents[0],
        {
          opacity: 1,
          yPercent: 0,
          color: "#f3f3ec",
        },
        0.65
      );

      tl.to(
        slideContents[0].querySelector(
          ".hero-eyebrow"
        ),
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        0.65
      );

      tl.to(
        slideContents[0].querySelectorAll(
          ".hero-copy-line"
        ),
        {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power4.out",
        },
        0.7
      );

      tl.to(
        slideContents[0].querySelector(
          ".hero-description"
        ),
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
        },
        0.95
      );

      /*
       * =========================================
       * IMAGE 1 → IMAGE 2
       * =========================================
       */

      tl.to(
        imageReveals[0],
        {
          opacity: 0,
          duration: 1.5,
          ease: "power3.inOut",
        },
        1.55
      );

      /*
       * =========================================
       * IMAGE 2 CIRCLE REVEAL
       * =========================================
       */

      tl.to(
        imageReveals[1],
        {
          clipPath: `circle(${revealRadius} at 50% 105%)`,
          duration: 1.5,
          y: 0,
          ease: "power3.inOut",
        },
        1.55
      );

      /*
       * =========================================
       * IMAGE 2 SCALE
       * =========================================
       */

      tl.to(
        imageWrappers[1],
        {
          scale: 1,
          duration: 1.5,
          ease: "none",
        },
        1.55
      );

      /*
       * =========================================
       * IMAGE 1 CONTENT OUT
       * =========================================
       */

      tl.to(
        slideContents[0],
        {
          opacity: 0,
          yPercent: -35,
          duration: 0.6,
          ease: "power2.in",
        },
        1.55
      );

      /*
       * =========================================
       * IMAGE 2 CONTENT IN
       * =========================================
       */

      tl.set(
        slideContents[1],
        {
          opacity: 1,
          yPercent: 0,
          color: "#f3f3ec",
        },
        2.25
      );

      tl.to(
        slideContents[1].querySelector(
          ".hero-eyebrow"
        ),
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        2.25
      );

      tl.to(
        slideContents[1].querySelectorAll(
          ".hero-copy-line"
        ),
        {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power4.out",
        },
        2.25
      );

      tl.to(
        slideContents[1].querySelector(
          ".hero-description"
        ),
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
        },
        2.25
      );

      /*
       * =========================================
       * FINAL IMAGE TRANSFORMATION
       * =========================================
       */

      tl.fromTo(
        imageWrappers[1],
        {
          clipPath:
            "inset(0% 0% 0% 0%)",
        },
        {
          borderRadius: "100px",

          clipPath:
            "inset(20% 20% 20% 20%)",

          yPercent: -12,

          scale: 1.18,

          duration: 0.75,

          ease: "none",
        },
        3
      );

      /*
       * =========================================
       * FINAL CONTENT CENTER
       * =========================================
       */

      tl.to(
        slideContents[1],
        {
          left: "45%",
          top: "46%",
          bottom: "auto",

          xPercent: -50,
          yPercent: -50,

          duration: 0.8,
          ease: "power3.inOut",
        },
        3
      );

      /*
       * =========================================
       * REFRESH AFTER IMAGES LOAD
       * =========================================
       */

      const images =
        hero.querySelectorAll("img");

      images.forEach((img) => {
        if (img.complete) {
          ScrollTrigger.refresh();
        } else {
          img.addEventListener(
            "load",
            () => {
              ScrollTrigger.refresh();
            }
          );
        }
      });
    }, hero);

    /*
     * =========================================
     * DESKTOP CLEANUP
     * =========================================
     */

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={`sarvottam-hero mobile-slide-${mobileSlide}`}
    >

      {/* ====================================
          INTRO IMAGE
      ==================================== */}

      <div className="hero-intro-image">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={introImage.mobile}
          />

          <img
            src={introImage.desktop}
            alt="Sarvottam World"
          />
        </picture>

        <div className="hero-intro-overlay" />
      </div>

      {/* ====================================
          INTRO CONTENT
      ==================================== */}

      <div className="hero-content hero-intro-content">

        <div className="hero-eyebrow">
          {/* Sarvottam World — Since 1989 */}
        </div>

        <h1 className="hero-title">

          <span className="hero-title-mask">
            <span className="hero-copy-line">
              Invest in a Future
            </span>
          </span>

          <span className="hero-title-mask">
            <span className="hero-copy-line">
              Beyond Expectations
            </span>
          </span>

        </h1>

        <div className="hero-divider" />

      </div>

      {/* ====================================
          SLIDE 1 CONTENT
      ==================================== */}

      <div className="hero-content hero-slide-content hero-slide-content-1">

        <div className="hero-eyebrow">
          {/* {slides[0].eyebrow} */}
        </div>

        <h2 className="hero-title">

          <span className="hero-title-mask">
            <span className="hero-copy-line">
              {slides[0].title[0]}
            </span>
          </span>

          <span className="hero-title-mask">
            <span className="hero-copy-line">
              {slides[0].title[1]}
            </span>
          </span>

        </h2>

        <div className="hero-divider" />

        <p className="hero-description">
          {slides[0].description}
        </p>

      </div>

      {/* ====================================
          SLIDE 2 CONTENT
      ==================================== */}

      <div className="hero-content hero-slide-content hero-slide-content-2">

        <div className="hero-eyebrow">
          {/* {slides[1].eyebrow} */}
        </div>

        <h2 className="hero-title">

          <span className="hero-title-mask">
            <span className="hero-copy-line">
              {slides[1].title[0]}
            </span>
          </span>

          <span className="hero-title-mask">
            <span className="hero-copy-line">
              {slides[1].title[1]}
            </span>
          </span>

        </h2>

        <div className="hero-divider" />

        <p className="hero-description">
          {slides[1].description}
        </p>

      </div>

      {/* ====================================
          IMAGE 1
      ==================================== */}

      <div className="hero-image-reveal hero-image-one">

        <div className="hero-image">

          <picture>

            <source
              media="(max-width: 768px)"
              srcSet={slides[0].mobileImage}
            />

            <img
              src={slides[0].desktopImage}
              alt="Sarvottam World luxury development"
            />

          </picture>

          <div className="hero-image-overlay" />

        </div>

      </div>

      {/* ====================================
          IMAGE 2
      ==================================== */}

      <div className="hero-image-reveal hero-image-two">

        <div className="hero-image">

          <picture>

            <source
              media="(max-width: 768px)"
              srcSet={slides[1].mobileImage}
            />

            <img
              src={slides[1].desktopImage}
              alt="Sarvottam World premium development"
            />

          </picture>

          <div className="hero-image-overlay" />

        </div>

      </div>
<div className="mobile-slide-dots">
  {[0, 1, 2].map((index) => (
    <button
      key={index}
      type="button"
      className={`mobile-slide-dot ${
        mobileSlide === index ? "active" : ""
      }`}
      onClick={() => setMobileSlide(index)}
      aria-label={`Go to slide ${index + 1}`}
    />
  ))}
</div>
    </section>
  );
}