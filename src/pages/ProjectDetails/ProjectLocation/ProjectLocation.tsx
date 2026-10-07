
import { Building, Car, MapPin } from "lucide-react";
import "./ProjectLocation.css";

interface ConnectivityItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ProjectLocationProps {
  description?: string;
  items?: ConnectivityItem[];
}

export default function ProjectLocation({
  description = `Located in Knowledge Park V, Greater Noida, Terminal Tower (Y Tower) offers excellent connectivity to major business hubs, educational institutions and residential areas, making it an ideal choice for businesses and investors.`,
  items = [
    {
      title: "Easy Access",
      description:
        "Well connected to Greater Noida Expressway",
      icon: <Car />,
    },
    {
      title: "Prime Location",
      description:
        "Plot No. 6, Knowledge Park V, Greater Noida, U.P.",
      icon: <MapPin />,
    },
    {
      title: "Growing Business Hub",
      description:
        "Surrounded by educational and corporate institutions",
      icon: <Building />,
    },
  ],
}: ProjectLocationProps) {
  return (
    <section className="project-location">
      <div className="project-location-container">

        <div className="project-location-heading">
          <span className="project-location-eyebrow">
            Location & Connectivity
          </span>

          <h2>
            Strategically
            <br />
            connected
          </h2>
        </div>

        <div className="project-location-description">
          <p>{description}</p>
        </div>

        <div className="project-location-items">
          {items.map((item) => (
            <div className="project-location-item" key={item.title}>
              <div className="project-location-icon">
                {item.icon}
              </div>

              <div className="project-location-item-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
