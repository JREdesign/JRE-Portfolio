// Dashboard.jsx
import React from 'react';
import AdminAbout from './AdminAbout'; // Asegúrate de que la ruta de importación sea correcta
import AdminExperiences from './AdminExperiences'; // Ajusta la ruta según sea necesario
import AdminTech from './AdminTech';
import AdminWorks from './AdminWorks';
import AdminFeedbacks from './AdminFeedbacks';
const Dashboard = () => {
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
