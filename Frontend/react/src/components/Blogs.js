import React from 'react';
import blogs from '../data/blogs.json';
import BlogCard from "./BlogCard";
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Blogs = () => {
  return (
    <div className="blogs-section">
      <h2>Our Latest Blogs</h2>
      <Swiper 
        style={{
          padding:"40px",
      }}
        className="blogs-container"
        slidesPerView={3}
        slidesPerGroup={3}
        spaceBetween={28}
        loop={true}
        fadeEffect={true}
        grabCursor={true}
        pagination={{ clickable: true, dynamicBullets: true, }}
        breakpoints={{
            0: {slidesPerView: 1,},
            1000: {slidesPerView: 2,},
            1250: {slidesPerView: 3,},
        }}
        modules={[Pagination]}
      >
        {blogs.map((blog, index) => (
          <SwiperSlide>
          <BlogCard 
          key={blog.id}
          blog={blog}
          />
          </SwiperSlide>
          
        ))}
      </Swiper>
    </div>
  );
};

export default Blogs;
