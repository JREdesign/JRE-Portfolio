// Dashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAbout from './AdminAbout';
import AdminExperiences from './AdminExperiences';
import AdminTech from './AdminTech';
import AdminWorks from './AdminWorks';
import AdminFeedbacks from './AdminFeedbacks';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Si no hay userID en localStorage, redirige al usuario a la página de login
    if (!window.localStorage.getItem('userID')) {
      navigate('/login');
    }
  }, [navigate]);

  // Si hay un userID, renderiza el contenido del Dashboard normalmente
  return (
    <div>
      <h1 className="header">Panel de Administración</h1>
      <AdminAbout />
      <AdminExperiences />
      <AdminTech />
      <AdminWorks />
      <AdminFeedbacks />
    </div>
  );
};

export default Dashboard;
