import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BlogCard = ( {blog} ) => {
  // const navigate = useNavigate();
  // const handleCardClick = () => {
  //   // console.log(blog.id);
  //   navigate(`/blog/${blog.id}`);
  // }
  console.log(blog.image);
  return (
    <div className="blog-card" /*onClick={handleCardClick}*/>
      <img src={blog.image} alt={blog.title} />
      <div className="blog-content">
<<<<<<< HEAD
        <h3>{blog.summary}</h3>
        <p>{blog.content}</p>
        <a href={blog.link} className="read-more">Read More</a>
=======
        <h3>{blog.title}</h3>
        <p>{blog.summary}</p>
        <Link to={`/blog/${blog.id}`} className="read-more">Read More</Link>
>>>>>>> 47b92ea849c245aca48eec18346220ba115ce5a7
      </div>
    </div>
  );
};

export default BlogCard;