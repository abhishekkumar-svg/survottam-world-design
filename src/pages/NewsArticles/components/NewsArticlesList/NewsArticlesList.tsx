import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import "./NewsArticlesList.css"
import { newsArticles } from "../../data/NewsArticles";
import NewsArticleCard from "../NewsArticle/NewsArticleCard";


gsap.registerPlugin(ScrollTrigger);

const BATCH_SIZE = 6;

const NewsArticlesList = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);




  const visibleNewsArticles = newsArticles.slice(0, visibleCount);

  /**
   * Infinite scrolling
   */
  const loadMore = useCallback(() => {
    setVisibleCount((current) =>
      Math.min(current + BATCH_SIZE, newsArticles.length)
    );
  }, [newsArticles.length]);

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

        if (visibleCount >= newsArticles.length) return;

        loadMore();
      },
      {
        rootMargin: "500px 0px",
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [visibleCount, newsArticles.length, loadMore]);

  /**
   * GSAP card animations
   */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".newsArticle-card");

      cards.forEach((card) => {
        const image = card.querySelector<HTMLElement>(
          ".newsArticle-card-image"
        );

        const content = card.querySelector<HTMLElement>(
          ".newsArticle-card-content"
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
  }, [visibleNewsArticles.length]);

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
        .from(".newsArticles-hero-eyebrow span", {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
        })
        .from(
          ".newsArticles-hero-title .line",
          {
            yPercent: 110,
            opacity: 0,
            stagger: 0.12,
            duration: 1,
          },
          "-=0.35"
        )
        .from(
          ".featured-newsArticle",
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
    <main className="newsArticles-page" ref={pageRef}>
  

      {/* ================= BLOG LIST ================= */}
<section className="newsArticles-list-section">
  <div className="newsArticles-section-heading">
    <div>
      <span className="section-eyebrow">
        FEATURED IN MEDIA
      </span>

      <h2>
        In the
        <span> Spotlight.</span>
      </h2>
    </div>

    <p>
      Discover the latest news, features and stories
      covering Sarvottam World and its vision for
      modern, wellness-focused living.
    </p>
  </div>

  <div className="newsArticles-grid" ref={listRef}>
    {newsArticles.map((article) => (
      <NewsArticleCard
        key={article.id}
        article={article}
      />
    ))}
  </div>

  <div
    ref={loadMoreRef}
    className="newsArticles-load-trigger"
    aria-hidden="true"
  >
    {visibleCount < newsArticles.length && (
      <span className="newsArticles-loading">
        Loading more articles
      </span>
    )}
  </div>
</section>
    </main>
  );
};

export default NewsArticlesList;