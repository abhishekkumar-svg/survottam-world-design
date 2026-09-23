import { useRef } from "react";
import type { Blog } from "../../types/blogs";
import "./BlogCard.css";
import { MoveRight } from "lucide-react";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const cardRef = useRef<HTMLElement | null>(null);

  return (
    <article className="blog-card" ref={cardRef}>
      <div className="blog-card-image-wrap">
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-card-image"
          loading="lazy"
        />

        <div className="blog-card-image-overlay" />

        {blog.featured && (
          <span className="blog-card-featured">
            Featured
          </span>
        )}
      </div>

      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span>{blog.date}</span>

          <span className="blog-card-dot" />

          <span>{blog.category}</span>
        </div>

        <h2>{blog.title}</h2>

        <p>{blog.content}</p>

        <button className="blog-card-arrow" aria-label={`Read ${blog.title}`}>
         <MoveRight className="arrowIcon" size={20}/>
        </button>
      </div>
    </article>
  );
};

export default BlogCard;