import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { jobPosts } from "../data/careers";

interface OpeningsProps {
  onApply: (jobTitle: string) => void;
}

const Openings = ({ onApply }: OpeningsProps) => {
  const [activeJob, setActiveJob] = useState<number | null>(null);

  const toggleJob = (id: number) => {
    setActiveJob((current) => (current === id ? null : id));
  };

  return (
    <section className="careers-jobs" id="open-positions">
      <div className="careers-container">
        <div className="careers-jobs-heading">
          <span className="careers-eyebrow">CAREERS</span>

          <h2>
            Current
            <br />
            <span>opportunities.</span>
          </h2>

          <p>
            Explore our current openings and find an opportunity that
            matches your experience, skills and ambitions.
          </p>
        </div>

        <div className="careers-job-list">
          {jobPosts.map((job) => {
            const isOpen = activeJob === job.id;

            return (
              <article
                className={`careers-job ${isOpen ? "is-open" : ""}`}
                key={job.id}
              >
                <button
                  className="careers-job-header"
                  onClick={() => toggleJob(job.id)}
                  aria-expanded={isOpen}
                >
                  <div className="careers-job-main">
                    <span className="careers-job-category">
                      {job.category}
                    </span>

                    <h3>{job.title}</h3>
                  </div>

                  <div className="careers-job-summary">
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                    <span>{job.experience}</span>
                  </div>

                  <span className="careers-job-icon">
                    <ChevronDown size={18} />
                  </span>
                </button>

                {isOpen && (
                  <div className="careers-job-details">
                    <div className="careers-job-details-top">
                      <div>
                        <span>LOCATION</span>
                        <strong>{job.location}</strong>
                      </div>

                      <div>
                        <span>JOB TYPE</span>
                        <strong>{job.type}</strong>
                      </div>

                      <div>
                        <span>EXPERIENCE</span>
                        <strong>{job.experience}</strong>
                      </div>

                      <div>
                        <span>DEPARTMENT</span>
                        <strong>{job.department}</strong>
                      </div>
                    </div>

                    <div className="careers-job-description">
                      <p>{job.description}</p>
                    </div>

                    <div className="careers-job-columns">
                      <div>
                        <h4>Responsibilities</h4>

                        <ul>
                          {job.responsibilities.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4>Preferred Qualifications</h4>

                        <ul>
                          {job.qualifications.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="careers-job-apply-row">
                      <span>
                        Interested in this position?
                      </span>

                      <button
                        onClick={() => onApply(job.title)}
                        className="careers-apply-button"
                      >
                        APPLY NOW
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Openings;