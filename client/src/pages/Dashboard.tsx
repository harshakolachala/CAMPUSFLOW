import React from 'react';
import { useAuth } from '@/context/AuthContext';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import FacultyDashboard from '@/components/dashboards/FacultyDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Render role-specific dashboard
  switch (user?.role) {
    case 'student':
      return <StudentDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'seating_manager':
    case 'club_coordinator':
      // For now, show admin dashboard for these roles
      // You can create specific dashboards for these roles later
      return <AdminDashboard />;
    default:
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">Welcome to CAMPUSFLOW</h2>
            <p className="text-secondary-600">Please contact your administrator to set up your role.</p>
          </div>
        </div>
      );
  }
};

export default Dashboard;
