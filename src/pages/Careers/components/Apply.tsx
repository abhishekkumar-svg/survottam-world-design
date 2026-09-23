interface ApplyProps {
  selectedPosition: string;
}

const Apply = ({ selectedPosition }: ApplyProps) => {
  const subject = `Application for ${selectedPosition}`;

  return (
    <section className="careers-apply">
      <div className="careers-apply-inner">
        <div className="careers-apply-heading">
          <span className="careers-eyebrow">JOIN OUR TEAM</span>

          <h2>
            Apply <span>Now.</span>
          </h2>

          <p>
            Ready to be part of Sarvottam World? Send your updated CV to our
            HR team.
          </p>
        </div>

        <div className="careers-apply-box">
          <div className="careers-apply-top">
            <div className="careers-apply-email">
              <span>EMAIL YOUR CV</span>

              <a href="mailto:hr@sarvottamworld.in">
                hr@sarvottamworld.in
              </a>
            </div>

            <div className="careers-apply-position">
              <span>APPLYING FOR</span>
              <strong>{selectedPosition}</strong>
            </div>
          </div>

          <div className="careers-apply-bottom">
            <div>
              <span>EMAIL SUBJECT</span>
              <strong>{subject}</strong>
            </div>

            <a
              href={`mailto:hr@sarvottamworld.in?subject=${encodeURIComponent(
                subject
              )}`}
              className="careers-apply-mail"
            >
              SEND APPLICATION
              {/* <span>↗</span> */}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Apply;