import type { Blog } from "../../types/blogs";

interface FeaturedBlogProps {
  blog: Blog;
}

const FeaturedBlog = ({ blog }: FeaturedBlogProps) => {
  return (
    <article className="featured-blog">
      <div className="featured-blog-image-wrap">
        <img
          src={blog.image}
          alt={blog.title}
          className="featured-blog-image"
        />

        <span className="featured-label">
          Featured
        </span>
      </div>

      <div className="featured-blog-content">
        <div className="featured-blog-meta">
          <span>{blog.category}</span>
          <span>{blog.date}</span>
        </div>

        <h2>{blog.title}</h2>

        <p>{blog.content}</p>

        <button className="featured-read-more">
          <span>Read Article</span>
          <span>↗</span>
        </button>
      </div>
    </article>
  );
};

export default FeaturedBlog;