
import { ArrowRight, Building, Calendar, Download, Expand, Houses, LetterText, Mail, Phone, User } from "lucide-react";
import "./Overview.css";

interface ProjectOverviewProps {
  description?: string;
  launch?: string;
  configuration?: string;
  status?: string;
  developer?: string;
}



interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function StatItem({ icon, value, label }: StatItemProps) {
  return (
    <div className="project-overview-stat">
      <div className="project-overview-stat-icon">{icon}</div>

      <div className="project-overview-stat-info">
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

export default function ProjectOverview({
  description = `Terminal Tower (Y Tower) is located in Plot No 6 - Knowledge Park V. Configuration: 450 sq. ft. corporate suites (studio apartments), retail, commercial spaces and food court. Part of Sarvottam World, this development brings together modern infrastructure, strategic connectivity and a vibrant business ecosystem.`,
  launch = "2024",
  configuration = "450 sq. ft.",
  status = "Ongoing",
  developer = "Sarvottam World",
}: ProjectOverviewProps) {
  return (
    <section className="project-overview">
      <div className="project-overview-container">
        {/* Main overview content */}
        <div className="project-overview-main">
          <div className="project-overview-intro">
            <div className="project-overview-heading">
              <span className="project-overview-eyebrow">
                Overview
              </span>

              <h2>
                Designed for
                <br />
                the way you live.
              </h2>

              <span className="project-overview-heading-line" />
            </div>

            <div className="project-overview-description">
              <p>{description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="project-overview-stats">
            <StatItem
              icon={<Calendar />}
              value={launch}
              label="Launch"
            />

            <StatItem
              icon={<Expand />}
              value={configuration}
              label="Configuration"
            />

            <StatItem
              icon={<Building />}
              value={status}
              label="Status"
            />

            <StatItem
              icon={<Houses/>}
              value={developer}
              label="Developer"
            />
          </div>
        </div>

        {/* Enquiry card */}
        <aside className="project-enquiry-card">
          <div className="project-enquiry-top">
            <span>Starting From</span>
            <h3>On Request</h3>
          </div>

          <form
            className="project-enquiry-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="project-enquiry-field">
              <User />
              <input type="text" placeholder="Your Name" />
            </label>

            <label className="project-enquiry-field">
              <Phone />
              <input type="tel" placeholder="Phone Number" />
            </label>

            <label className="project-enquiry-field">
              <Mail />
              <input type="email" placeholder="Email Address" />
            </label>

            <label className="project-enquiry-field project-enquiry-message">
              <LetterText />
              <textarea placeholder="Your Message (optional)" />
            </label>

            <button className="project-enquiry-submit" type="submit">
              <span>Request Callback</span>
              <ArrowRight />
            </button>
          </form>

          <div className="project-enquiry-divider">
            <span>OR</span>
          </div>

          <div className="project-enquiry-actions">
            <a href="tel:+911234567890" className="project-enquiry-action">
              <Phone />
              <span>Call Now</span>
            </a>

            <button
              type="button"
              className="project-enquiry-action"
            >
              <Download />
              <span>Download Brochure</span>
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
