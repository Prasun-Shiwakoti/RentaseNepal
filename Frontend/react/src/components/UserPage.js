import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage = ({ setisLoggedIn, setUserRole }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('user-token');
    console.log(token);
    if (!token) {
      setisLoggedIn(false);
      setUserRole('user');
      navigate('/login');
    }
  }, [navigate, setisLoggedIn, setUserRole]);

  // Handle logout
  const handleLogout = (e) => {
    localStorage.removeItem('user-token');
    setisLoggedIn(false);
    setUserRole('user');
    navigate('/login');
  };

  return (
      <button onClick={handleLogout} style={{ margin: '40px' }}>Logout</button>
  );
};

export default UserPage;
