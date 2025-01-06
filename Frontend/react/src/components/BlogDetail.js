import React from "react";
import { useParams } from 'react-router-dom';
import blogs from "../data/blogs.json";
import { Link } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams();

  const blog = blogs.find(blog => blog.id === Number(id));

  const mostViewedBlogs = blogs.filter(blog => blog.id !== Number(id)).sort((a, b) => b.views - a.views).slice(0,5);

  return (
    <div className="blog-body">
        <div className="blogmain-container">
          {/* Blog Container */}
          <div className="blog-container">
            <h2>{blog.title}</h2>

            <div className="blog-meta">
              <span className="date">{blog.date}</span>
              <span className="views">
                <i className="bi bi-eye-fill"></i> {blog.views} Views
              </span>
            </div>
            {console.log(blog.image)}
            <img src={blog.image} alt={blog.title} className="blog-main-image" />

            <div className="blog-content">
              <p>{blog.hook}</p>
              {/* {blog.hooks.map((hook, index) => (
                <p key={`hook-${index}`}>{hook}</p>
              ))} */}
              {blog.content.map((paragraph, index) => (
                <p key={`content-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Most Viewed Section */}
          <div className="blog-most-viewed">
            <h2>Most Viewed</h2>
            {mostViewedBlogs.map((mostViewedBlog, index) => (
              <div className="blog-most-viewed-item" key={`most-viewed-${index}`}>
                <img src={mostViewedBlog.image} alt="Thumbnail" />
                <div className="blog-content">
                  <h3><Link to={`/blog/${mostViewedBlog.id}`}>{mostViewedBlog.title}</Link></h3>
                  <div className="date">{mostViewedBlog.date}</div>
                  <div className="views">
                    <i className="bi bi-eye-fill"></i> {mostViewedBlog.views} Views
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Follow Us Section */}
        </div>
        <div className="blog-follow-us-section">
          <h3>Follow Us</h3>
          <div className="blog-social-icons">
            <a href="https://www.facebook.com/profile.php?id=61559722175314" className="facebook"><i className="bi bi-facebook"></i></a>
            <a href="mailto:rentasenepal@gmail.com" className="google"><i className="bi bi-envelope"></i></a>
            <a href="#" className="whatsapp"><i className="bi bi-whatsapp"></i></a>
            <a href="https://www.instagram.com/rentase_nepal/" className="instagram"><i className="bi bi-instagram"></i></a>
          </div>
        </div>
    </div>
  );
};

export default Blog;
