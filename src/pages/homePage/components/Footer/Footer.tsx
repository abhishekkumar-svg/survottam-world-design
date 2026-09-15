import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* =========================================
          TOP EDITORIAL CTA
      ========================================== */}

      <div className="footer-intro">

        <div className="footer-intro-label">
          <span>THE SARVOTTAM PROMISE</span>
          <i />
        </div>

        <div className="footer-intro-content">

          <h2>
            Extraordinary
            <br />
            <em>spaces.</em>
          </h2>

          <div className="footer-intro-right">
            <p>
              From landmark residences to distinguished
              commercial destinations, we create places
              designed to become part of your story.
            </p>

            <a href="#contact" className="footer-cta">
              BEGIN A CONVERSATION
              <span>↗</span>
            </a>
          </div>

        </div>

      </div>


      {/* =========================================
          MAIN FOOTER
      ========================================== */}

      <div className="footer-main">

        {/* BRAND */}

        <div className="footer-brand">

          <a href="/" className="footer-logo">
            <img
              src="https://sarvottamworld.in/_next/image?url=%2Flogosarvottam.png&w=256&q=75"
              alt="Sarvottam World"
            />
          </a>

          <p className="footer-brand-description">
            Crafting extraordinary luxury residences
            and premium commercial developments since
            1989. Where architecture meets aspiration.
          </p>

          <div className="footer-socials">

            <a href="#" aria-label="Instagram">
              Instagram
            </a>

            <a href="#" aria-label="LinkedIn">
              LinkedIn
            </a>

            <a href="#" aria-label="Facebook">
              Facebook
            </a>

          </div>

        </div>


        {/* PROJECTS */}

        <div className="footer-column">

          <h3>PROJECTS</h3>

          <nav>
            <a href="#">All Projects</a>
            <a href="#">Residential</a>
            <a href="#">Commercial</a>
            <a href="#">Upcoming</a>
            <a href="#">Ongoing</a>
            <a href="#">Delivered</a>
          </nav>

        </div>


        {/* COMPANY */}

        <div className="footer-column">

          <h3>COMPANY</h3>

          <nav>
            <a href="#">About Us</a>
            <a href="#">Our Legacy</a>
            <a href="#">Leadership</a>
            <a href="#">Media Centre</a>
            <a href="#">Careers</a>
          </nav>

        </div>


        {/* CONTACT */}

        <div className="footer-column footer-contact">

          <h3>CONTACT</h3>

          <a href="tel:+917797123456">
            +91 77971 23456
          </a>

          <a href="mailto:info@sarvottamworld.in">
            info@sarvottamworld.in
          </a>

          <address>
            Block 1, Unit No 302,
            <br />
            Plot No 6, KP V,
            <br />
            Greater Noida,
            <br />
            Gautam Buddha Nagar,
            <br />
            Uttar Pradesh — 201306
          </address>

        </div>


        {/* NEWSLETTER */}

        <div className="footer-newsletter">

          <h3>STAY INFORMED</h3>

          <p>
            Receive exclusive updates on new launches,
            investment opportunities, and luxury living
            insights.
          </p>

          <form className="footer-form">

            <input
              type="email"
              placeholder="Your email address"
              aria-label="Your email address"
            />

            <button type="submit">
              →
            </button>

          </form>

        </div>

      </div>


      {/* =========================================
          BOTTOM
      ========================================== */}

      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} Sarvottam World.
          All rights reserved.
        </span>

        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Disclaimer</a>
        </div>

        <span className="footer-credit">
          Designed with intention.
        </span>

      </div>


      {/* =========================================
          WATERMARK
      ========================================== */}

      <div className="footer-watermark">
        SARVOTTAM
      </div>

    </footer>
  );
};

export default Footer;