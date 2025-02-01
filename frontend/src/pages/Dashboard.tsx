import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // ✅ Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* ✅ Sidebar */}
      <div className="sidebar">
        <h2>TravelApp</h2>
        <ul>
          <li onClick={() => navigate('/my-trips')}>My Trips</li>
          <li onClick={() => navigate('/upload-post')}>Upload Post</li>
          <li onClick={() => navigate('/user-profile')}>User Profile</li>
          <li onClick={handleLogout} className="logout">Logout</li>
        </ul>
      </div>

      {/* ✅ Background Map Image (Handled in CSS) */}
      <div className="map-container"></div>
    </div>
  );
};

export default Dashboard;
