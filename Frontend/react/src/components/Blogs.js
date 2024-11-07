import React from 'react';
import blogs from '../data/blogs.json';
const Blogs = () => {
  return (
    <div className="blogs-section">
      <h2>Our Latest Blogs</h2>
      <div className="blogs-container">
        {blogs.map((blog, index) => (
          <div className="blog-card" key={index}>
            <img src={blog.image} alt={blog.title} />
            <div className="blog-content">
              <h3>{blog.title}</h3>
              <p>{blog.summary}</p>
              <a href={blog.link} className="read-more">Read More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
