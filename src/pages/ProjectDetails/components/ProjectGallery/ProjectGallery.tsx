
import "./ProjectGallery.css";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
  description?: string;
  onViewGallery?: () => void;
}



export default function ProjectGallery({
  images,
}: ProjectGalleryProps) {
  const galleryImages = images.slice(0, 4);

  return (
    <section className="project-gallery">
      <div className="project-gallery-container">

        {/* Header */}
        <div className="project-gallery-header">
          <div className="project-gallery-title">
            <span className="project-gallery-eyebrow">
              Gallery
            </span>

            <h2>
              Explore the project
            </h2>
          </div>
{/* 
          <div className="project-gallery-header-right">
            <p>{description}</p>

            <button
              type="button"
              className="project-gallery-button"
              onClick={onViewGallery}
            >
              <span>View Full Gallery</span>
              <ArrowRight />
            </button>
          </div> */}
        </div>

        {/* Gallery Grid */}
        <div className="project-gallery-grid">

          {/* Large image */}
          {galleryImages[0] && (
            <div className="project-gallery-item project-gallery-item-large">
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                loading="lazy"
              />
            </div>
          )}

          {/* Video / featured image */}
          {galleryImages[1] && (
            <div className="project-gallery-item project-gallery-item-featured">
              <img
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                loading="lazy"
              />

            </div>
          )}

          {/* Bottom small image 1 */}
          {galleryImages[2] && (
            <div className="project-gallery-item project-gallery-item-small">
              <img
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                loading="lazy"
              />
            </div>
          )}

          {/* Bottom small image 2 */}
          {galleryImages[3] && (
            <div className="project-gallery-item project-gallery-item-small">
              <img
                src={galleryImages[3].src}
                alt={galleryImages[3].alt}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
