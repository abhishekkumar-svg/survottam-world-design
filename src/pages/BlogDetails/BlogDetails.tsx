import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";


import "./BlogDetails.css";
import { blogs } from "../Blogs/data/blog";
export default function BlogDetail() {
  const { blogName } = useParams<{ blogName: string }>();

  const currentBlog = blogs.find((blog) => blog.slug === blogName);

  if (!currentBlog) {
    return <Navigate to="/blogs" replace />;
  }

  const suggestedBlogs = useMemo(() => {
    return [...blogs]
      .filter((blog) => blog.slug !== currentBlog.slug)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, [currentBlog.slug]);

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const shareTitle = encodeURIComponent(currentBlog.title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${shareTitle}%20${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  return (
    <>
    {/* <BlogDetailHero blogContent={currentBlog} /> */}
    <main className="blog-detail">

      {/* ================= HERO ================= */}
      <section className="blog-detail-hero">
        <div className="blog-detail-hero-inner">

          <div className="blog-detail-meta">
            <span>{currentBlog.category}</span>
            <i />
            <span>{currentBlog.date}</span>
          </div>

          <h1>{currentBlog.title}</h1>

          <p className="blog-detail-excerpt">
            Discover ideas, insights and perspectives shaping the
            future of real estate and modern urban development.
          </p>

          <div className="blog-detail-author">
            <span>By</span>
            <strong>Sarvottam World</strong>
          </div>

        </div>
      </section>

      {/* ================= IMAGE ================= */}
      <section className="blog-detail-image-section">
        <div className="blog-detail-image-wrap">
          <img
            src={currentBlog.image}
            alt={currentBlog.title}
          />
        </div>
      </section>

      {/* ================= ARTICLE ================= */}
      <section className="blog-detail-content-section">

        {/* Share */}
        <aside className="blog-detail-share">
          <span>Share</span>

          <div className="blog-detail-share-buttons">

            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-share-button"
              aria-label="Share on WhatsApp"
            >
              <svg viewBox="0 0 24 24">
                <path d="M20 11.5a8.5 8.5 0 0 1-12.8 7.4L3 20l1.2-4A8.5 8.5 0 1 1 20 11.5Z" />
                <path d="M8.5 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .3.1.4.4l.7 1.7c.1.2.1.4-.1.6l-.6.7c.5.9 1.2 1.6 2.1 2.1l.7-.6c.2-.2.4-.2.6-.1l1.7.7c.3.1.4.2.4.5v.5c0 .3 0 .5-.4.7-.4.2-1.1.3-1.5.1-1.3-.4-2.5-1.1-3.5-2.1s-1.7-2.2-2.1-3.5c-.2-.5-.1-1.1.1-1.5Z" />
              </svg>
            </a>

            <a
              href={shareLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-share-button"
              aria-label="Share on X"
            >
              <svg viewBox="0 0 24 24">
                <path d="M5 4l14 16M19 4 5 20" />
              </svg>
            </a>

            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-share-button"
              aria-label="Share on LinkedIn"
            >
              <svg viewBox="0 0 24 24">
                <path d="M6 9v9M6 6.5v.1M10 18v-5a3 3 0 0 1 6 0v5M10 9v9" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="blog-share-button"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <circle cx="12" cy="12" r="3.5" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r=".7"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>

          </div>
        </aside>

        {/* Article */}
        <article className="blog-detail-article">

          <p>
            The way we experience spaces is constantly evolving.
            Modern developments are no longer simply about buildings,
            but about creating environments that support the way
            people live, work and connect.
          </p>

          <p>
            As cities continue to grow, thoughtful planning and
            innovative design are becoming increasingly important.
            The right combination of architecture, connectivity and
            community can create spaces that remain relevant for
            years to come.
          </p>

          <h2>Creating spaces for tomorrow</h2>

          <p>
            Today's developments need to consider more than their
            immediate surroundings. They need to create meaningful
            connections between people, businesses and the wider
            community.
          </p>

          <p>
            From accessibility and infrastructure to design and
            lifestyle, every detail contributes to the experience
            of a place.
          </p>

          <h2>A new approach to development</h2>

          <p>
            The future of real estate lies in creating environments
            that are practical, connected and enjoyable. Developments
            that understand these changing expectations can become
            destinations rather than simply addresses.
          </p>

          <blockquote>
            Great spaces are designed not just for today, but for
            the people and communities that will experience them
            tomorrow.
          </blockquote>

          <p>
            As the industry continues to evolve, the focus will
            increasingly shift towards creating better experiences,
            stronger communities and more connected destinations.
          </p>

        </article>

      </section>

      {/* ================= SUGGESTED BLOGS ================= */}
      <section className="blog-suggested">

        <div className="blog-suggested-container">

          <div className="blog-suggested-heading">
            <div>
              <span>Continue Reading</span>
              <h2>More from our journal.</h2>
            </div>

            <Link
              to="/blogs"
              className="blog-suggested-all"
            >
              View All
              <svg viewBox="0 0 24 24">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="blog-suggested-grid">

            {suggestedBlogs.map((blog) => (
              <Link
                key={blog.slug}
                to={`/blogs/${blog.slug}`}
                className="suggested-blog-card"
              >
                <div className="suggested-blog-image">
                  <img
                    src={blog.image}
                    alt={blog.title}
                  />
                </div>

                <div className="suggested-blog-info">

                  <div className="suggested-blog-meta">
                    <span>{blog.category}</span>
                    <span>{blog.date}</span>
                  </div>

                  <h3>{blog.title}</h3>

                  <span className="suggested-blog-read">
                    Read Article
                    <svg viewBox="0 0 24 24">
                      <path d="M5 12h13M13 6l6 6-6 6" />
                    </svg>
                  </span>

                </div>
              </Link>
            ))}

          </div>

        </div>

      </section>

    </main>
    </>
  );
}