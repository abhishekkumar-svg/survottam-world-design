import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

import "./Contact.css";
import ContactInput from "./components/contactInput";
import ContactHero from "./components/ContactHero/ContactHero";

const Contact = () => {
  return (
    <main className="contact-page">
      <ContactHero />

      <section className="contact-section">
        <div className="contact-container">
          {/* =========================================
              LEFT — CONTACT FORM
          ========================================= */}
          <div className="contact-form-wrapper">
            <span className="contact-eyebrow">
              GET IN TOUCH
            </span>

            <h1 className="contact-title">
              Let's <span>talk.</span>
            </h1>

            <p className="contact-description">
              Have a question, want to know more about our
              projects, or simply want to say hello? Fill out
              the form and we'll get back to you soon.
            </p>

            <form className="contact-form">
              <ContactInput
                label="YOUR NAME"
                inputProps={{
                  type: "text",
                  name: "name",
                  autoComplete: "name",
                  placeholder: "Your name",
                }}
              />

              <ContactInput
                label="YOUR EMAIL"
                inputProps={{
                  type: "email",
                  name: "email",
                  autoComplete: "email",
                  placeholder: "Your email address",
                }}
              />

              <ContactInput
                label="YOUR MESSAGE"
                textarea
                textareaProps={{
                  name: "message",
                  rows: 5,
                  placeholder: "Type something if you want...",
                }}
              />

              <button
                type="submit"
                className="contact-submit"
              >
                SEND MESSAGE
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* =========================================
              RIGHT — CONTACT INFORMATION
          ========================================= */}
          <aside className="contact-information">
            <div className="contact-info-content">
              <span className="contact-eyebrow">
                CONTACT DETAILS
              </span>

              <h2>
                We'd love to
                <br />
                <span>hear from you.</span>
              </h2>

              {/* =====================================
                  ADDRESSES
              ===================================== */}
              <div className="contact-addresses">
                {/* OFFICE ADDRESS */}
                <div className="contact-address">
                  <div className="contact-address-heading">
                    <span className="contact-address-label">
                      OFFICE ADDRESS
                    </span>

                    <span className="contact-address-line" />
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Plot+No.+6,+Noida+-+Greater+Noida+Rd,+Tusiana+Village,+Knowledge+Park+V,+Greater+Noida,+Uttar+Pradesh+201306"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-address-content"
                  >
                    <MapPin size={17} />

                    <p>
                      Plot No. 6, Noida - Greater Noida Rd,
                      <br />
                      Tusiana Village, Knowledge Park V,
                      <br />
                      Greater Noida, Uttar Pradesh 201306
                    </p>
                  </a>
                </div>

                {/* REGISTERED ADDRESS */}
                <div className="contact-address">
                  <div className="contact-address-heading">
                    <span className="contact-address-label">
                      REGISTERED ADDRESS
                    </span>

                    <span className="contact-address-line" />
                  </div>

                  <a
                    href="#"
                    className="contact-address-content"
                  >
                    <MapPin size={17} />

                    <p>
                      Registered Office,
                      <br />
                      Dehradun, Uttarakhand,
                      <br />
                      India
                    </p>
                  </a>
                </div>
              </div>

              {/* =====================================
                  PHONE
              ===================================== */}
              <div className="contact-details">
                <a
                  href="tel:+917797123456"
                  className="contact-detail"
                >
                  <span className="contact-detail-icon">
                    <Phone size={17} />
                  </span>

                  <span>+91 7797123456</span>
                </a>

                <a
                  href="mailto:sales@sarvottamworld.com"
                  className="contact-detail"
                >
                  <span className="contact-detail-icon">
                    <Mail size={17} />
                  </span>

                  <span>sales@sarvottamworld.com</span>
                </a>
              </div>

              {/* =====================================
                  SOCIAL
              ===================================== */}
              <div className="contact-socials">
                <a
                  href="#"
                  aria-label="Instagram"
                >
                  <img
                    width={18}
                    height={18}
                    src="/src/assets/instagram.svg"
                    alt="Instagram"
                  />
                </a>

                <a
                  href="#"
                  aria-label="Facebook"
                >
                  <img
                    width={18}
                    height={18}
                    src="/src/assets/facebook.svg"
                    alt="Facebook"
                  />
                </a>
                  <a
                  href="#"
                  aria-label="Facebook"
                >
                  <img
                    width={18}
                    height={18}
                    src="/src/assets/youtube.svg"
                    alt="Youtube"
                  />
                </a>

                <a
                  href="#"
                  aria-label="WhatsApp"
                >
                 <img
                    width={18}
                    height={18}
                    src="/src/assets/whatsapp.svg"
                    alt="Whatsapp"
                  />
                </a>
              </div>
            </div>

            {/* =========================================
                GOOGLE MAP
            ========================================= */}
            <div className="contact-map">
              <iframe
                title="Sarvottam World Office Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1389874.6736956208!2d77.86322298796769!3d28.3955752679429!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cebf8fabce4c9%3A0x8b64644005f2539c!2sGalactic%20City!5e1!3m2!1sen!2sin!4v1790158510123!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Contact;