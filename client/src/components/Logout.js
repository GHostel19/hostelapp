import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(true);
  };

  return (
    <li className="nav-item">
    <form onSubmit={handleLogout}>
      <button type="submit" className="btn btn-link nav-link">
        Logout
      </button>
    </form>
   </li>
    
  );
};

export default Logout;
