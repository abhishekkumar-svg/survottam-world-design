import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "./Header.css";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about" },
  { label: "Our Vision", href: "/vision" },
  { label: "Leadership", href: "/leadership" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const MOBILE_BREAKPOINT = 768;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLAnchorElement[]>([]);
  const menuBottomRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const menuTimeline = useRef<gsap.core.Timeline | null>(null);
  const isFirstRender = useRef(true);

  // Keep the clip-path origin locked to the hamburger button's actual
  // position, so the reveal always starts from the button regardless of
  // screen size / padding changes at different breakpoints.
  const setOriginFromButton = () => {
    const btn = menuButtonRef.current;
    const menu = menuRef.current;

    if (!btn || !menu) return;

    const rect = btn.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    menu.style.setProperty("--menu-origin-x", `${originX}px`);
    menu.style.setProperty("--menu-origin-y", `${originY}px`);
  };

  useLayoutEffect(() => {
    const menu = menuRef.current;

    if (!menu) return;

    setOriginFromButton();

    gsap.set(menu, {
      clipPath:
        "circle(0% at var(--menu-origin-x) var(--menu-origin-y))",
      pointerEvents: "none",
    });

    gsap.set(menuLinksRef.current, {
      yPercent: 100,
      opacity: 0,
    });

    gsap.set(menuBottomRef.current, {
      y: 20,
      opacity: 0,
    });

    return () => {
      menuTimeline.current?.kill();
    };
  }, []);

  // Keep the origin in sync on resize/orientation change, and auto-close
  // the menu if the viewport grows past the mobile breakpoint (otherwise
  // the fixed, full-screen menu can stay mounted with pointer-events:auto
  // and block the desktop layout with no visible way to close it).
  useEffect(() => {
    const handleResize = () => {
      setOriginFromButton();

      if (window.innerWidth > MOBILE_BREAKPOINT && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  // Give the header a visible background once the page is scrolled, so
  // the (previously always-white) text stays readable once it's no
  // longer sitting over a hero image.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on Escape, and lock background scroll while the menu is open.
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    const menu = menuRef.current;

    if (!menu) return;

    // Skip animating on the very first render — there's nothing to
    // animate from/to yet, it just wastes a GSAP timeline on load.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    menuTimeline.current?.kill();

    if (menuOpen) {
      setOriginFromButton();

      menuTimeline.current = gsap.timeline();

      menuTimeline.current
        .set(menu, {
          pointerEvents: "auto",
        })

        // Expand menu
        .to(menu, {
          clipPath:
            "circle(150% at var(--menu-origin-x) var(--menu-origin-y))",
          duration: 0.85,
          ease: "power4.inOut",
        })

        // Reveal links
        .to(
          menuLinksRef.current,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.065,
            ease: "power4.out",
          },
          "-=0.35"
        )

        // Bottom content
        .to(
          menuBottomRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3"
        );
    } else {
      menuTimeline.current = gsap.timeline();

      menuTimeline.current

        // Hide bottom
        .to(menuBottomRef.current, {
          y: 15,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        })

        // Hide links from bottom to top
        .to(
          menuLinksRef.current,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.3,
            stagger: {
              each: 0.035,
              from: "end",
            },
            ease: "power2.in",
          },
          "-=0.1"
        )

        // Collapse circle
        .to(
          menu,
          {
            clipPath:
              "circle(0% at var(--menu-origin-x) var(--menu-origin-y))",
            duration: 0.65,
            ease: "power4.inOut",
          },
          "-=0.05"
        )

        .set(menu, {
          pointerEvents: "none",
        });
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
console.log("isScrolled", isScrolled)
  return (
    <>
      {/* =========================================
          GLOBAL HEADER
      ========================================= */}

      <header
        className={`global-header ${
          menuOpen ? "global-header-menu-open" : ""
        } ${isScrolled ? "global-header-scrolled" : ""}`}
      >
        {/* LOGO */}

        <a
          href="/"
          className="global-header-logo"
          onClick={closeMenu}
        >
          <img
            src="https://sarvottamworld.in/_next/image?url=%2Flogosarvottam.png&w=256&q=75"
            alt="Sarvottam World"
          />
        </a>

        {/* =========================================
            DESKTOP NAV
        ========================================= */}

        <nav className="global-header-nav">
          {menuItems.map((item) => (
            <a key={item.label} href={item.href}>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* =========================================
            DESKTOP CTA
        ========================================= */}
{/* 
        <a
          href="/contact"
          className="global-header-contact"
        >
          Schedule a Visit
        </a> */}

        {/* =========================================
            MOBILE HAMBURGER
        ========================================= */}

        <button
          ref={menuButtonRef}
          type="button"
          className={`global-header-menu-button ${
            menuOpen
              ? "global-header-menu-button-open"
              : ""
          }`}
          onClick={toggleMenu}
          aria-label={
            menuOpen ? "Close navigation" : "Open navigation"
          }
          aria-expanded={menuOpen}
        >
          <span className={`${ menuOpen ? "!bg-black" : ""}`} />
          <span className={`${ menuOpen ? "!bg-black" : ""}`} />
        </button>
      </header>


      <div
        ref={menuRef}
        className="global-mobile-menu"
        aria-hidden={!menuOpen}
      >
        <div className="global-mobile-menu-inner">

          {/* TOP */}


          {/* =========================================
              LINKS
          ========================================= */}

          <nav className="global-mobile-nav">
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                ref={(el) => {
                  if (el) {
                    menuLinksRef.current[index] = el;
                  }
                }}
                onClick={closeMenu}
              >
                {/* <span className="global-mobile-nav-number">
                  {String(index + 1).padStart(2, "0")}
                </span> */}

                <span className="global-mobile-nav-label">
                  {item.label}
                </span>

                <span className="global-mobile-nav-arrow">
                  ↗
                </span>
              </a>
            ))}
          </nav>

          {/* =========================================
              BOTTOM
          ========================================= */}

          <div
            ref={menuBottomRef}
            className="global-mobile-menu-bottom"
          >
            <div>
              <span>Visit</span>

              <a
                href="/contact"
                onClick={closeMenu}
              >
                Schedule a Visit
              </a>
            </div>

            <div>
              <span>Connect</span>

              <p>
                Instagram&nbsp;&nbsp;/&nbsp;&nbsp;LinkedIn
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}