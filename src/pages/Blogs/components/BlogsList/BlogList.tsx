import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import "./BlogList.css"
import BlogCard from "../blog/BlogCard";
import FeaturedBlog from "../blog/FeaturedBlog";
import { blogs } from "../../data/blog";

gsap.registerPlugin(ScrollTrigger);

const BATCH_SIZE = 6;

const BlogsList = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  /**
   * Featured article
   */
  const featuredBlog = useMemo(
    () => blogs.find((blog) => blog.featured),
    []
  );

  /**
   * Never show the featured article again
   * inside the normal blog list.
   */
  const regularBlogs = useMemo(
    () => blogs.filter((blog) => !blog.featured),
    []
  );

  const visibleBlogs = regularBlogs.slice(0, visibleCount);

  /**
   * Infinite scrolling
   */
  const loadMore = useCallback(() => {
    setVisibleCount((current) =>
      Math.min(current + BATCH_SIZE, regularBlogs.length)
    );
  }, [regularBlogs.length]);

  /**
   * IntersectionObserver for infinite scroll.
   *
   * No scroll event listener required.
   */
  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) return;

        if (visibleCount >= regularBlogs.length) return;

        loadMore();
      },
      {
        rootMargin: "500px 0px",
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [visibleCount, regularBlogs.length, loadMore]);

  /**
   * GSAP card animations
   */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".blog-card");

      cards.forEach((card) => {
        const image = card.querySelector<HTMLElement>(
          ".blog-card-image"
        );

        const content = card.querySelector<HTMLElement>(
          ".blog-card-content"
        );

        gsap.fromTo(
          card,
          {
            y: 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );

        if (image) {
          gsap.fromTo(
            image,
            {
              scale: 1.12,
            },
            {
              scale: 1,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content.children,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true,
              },
            }
          );
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, [visibleBlogs.length]);

  /**
   * Featured animation
   */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const featured = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      featured
        .from(".blogs-hero-eyebrow span", {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
        })
        .from(
          ".blogs-hero-title .line",
          {
            yPercent: 110,
            opacity: 0,
            stagger: 0.12,
            duration: 1,
          },
          "-=0.35"
        )
        .from(
          ".featured-blog",
          {
            y: 80,
            opacity: 0,
            duration: 1,
          },
          "-=0.4"
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="blogs-page" ref={pageRef}>
  

      {/* ================= FEATURED ================= */}

      {featuredBlog && (
        <section className="featured-section">
          <FeaturedBlog blog={featuredBlog} />
        </section>
      )}

      {/* ================= BLOG LIST ================= */}

      <section className="blogs-list-section">
        <div className="blogs-section-heading">
          <div>
            <span className="section-eyebrow">
              LATEST ARTICLES
            </span>

            <h2>
              Explore Our
              <span> Stories.</span>
            </h2>
          </div>

          <p>
            Perspectives on architecture, lifestyle,
            investment and modern living.
          </p>
        </div>

        <div className="blogs-grid" ref={listRef}>
          {visibleBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>

        {/* Infinite scroll trigger */}
        <div
          ref={loadMoreRef}
          className="blogs-load-trigger"
          aria-hidden="true"
        >
          {visibleCount < regularBlogs.length && (
            <span className="blogs-loading">
              Loading more stories
            </span>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogsList;