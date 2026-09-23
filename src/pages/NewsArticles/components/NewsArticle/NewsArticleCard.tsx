import { MoveRight } from "lucide-react";
import type { Article } from "../../types/NewsArticles";
import "./NewsArticleCard.css";

interface NewsArticleCardProps {
  article: Article;
}

const NewsArticleCard = ({ article }: NewsArticleCardProps) => {
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <article className="newsArticle-card">
      <div className="newsArticle-card-image-wrap">
        <img
          src={article.image}
          alt={article.title}
          className="newsArticle-card-image"
          loading="lazy"
        />

        <div className="newsArticle-card-image-overlay" />

        <div className="newsArticle-card-source">
          <span>FEATURED IN</span>
          <strong>{article.source}</strong>
        </div>

        <div className="newsArticle-card-number">
          {String(article.id).padStart(2, "0")}
        </div>
      </div>

      <div className="newsArticle-card-content">
        <div className="newsArticle-card-meta">
          <span>{formattedDate}</span>
          <i />
          <span>NEWS & ARTICLES</span>
        </div>

        <h2>{article.title}</h2>

        <p>{article.content}</p>

        <div className="newsArticle-card-footer">
          <span className="newsArticle-read-more">
            READ ARTICLE
          </span>

          <button
            className="newsArticle-card-arrow"
            aria-label={`Read ${article.title}`}
          >
            <MoveRight className="arrowIcon" size={19} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsArticleCard;