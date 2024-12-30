import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hostelList from '../data/hostels.json';
import blogList from '../data/blogs.json';

const AdminPage = () => {
  const [hostels, setHostels] = useState(hostelList);
  const [blogs, setBlogs] = useState(blogList);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('adminToken');
  //   if (!token) {
  //     navigate('/admin-login');
  //   }
  // }, [navigate]);

  // useEffect(() => {
  //   // Fetching data from JSON files (mock API)
  //   fetch('/hostels.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Sort hostels alphabetically by title
  //       const sortedHostels = data.sort((a, b) => a.title.localeCompare(b.title));
  //       setHostels(sortedHostels);
  //     });

  //   fetch('/blogs.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Sort blogs alphabetically by title
  //       const sortedBlogs = data.sort((a, b) => a.title.localeCompare(b.title));
  //       setBlogs(sortedBlogs);
  //     });
  // }, []);

  const deleteHostel = (id) => {
    // Simulate deletion
    const updatedHostels = hostels.filter((hostel) => hostel.id !== id);
    setHostels(updatedHostels);
    // Additional backend deletion logic needed
  };

  const deleteBlog = (title) => {
    // Simulate deletion by filtering the list
    const updatedBlogs = blogs.filter((blog) => blog.title !== title);
    setBlogs(updatedBlogs);
    // Additional backend deletion logic needed
  };

  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>
      <div className="tables-container">
        <div className="table-section">
          <h3>Hostels</h3>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hostels.map((hostel) => (
                  <tr key={hostel.id}>
                    <td>{hostel.title}</td>
                    <td>
                      <button onClick={() => deleteHostel(hostel.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="table-section">
          <h3>Blogs</h3>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={index}>
                    <td>{blog.title}</td>
                    <td>
                      <button onClick={() => deleteBlog(blog.title)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;