import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Study from '@/pages/Study';
import HallTicket from '@/pages/HallTicket';
import Seating from '@/pages/Seating';
import Clubs from '@/pages/Clubs';
import Home from '@/pages/Home';
import StudentProfile from '@/pages/StudentProfile';

// Admin Pages
import UserManagement from '@/pages/admin/UserManagement';
import AcademicRecords from '@/pages/admin/AcademicRecords';
import ExaminationControl from '@/pages/admin/ExaminationControl';
import HallTicketManagement from '@/pages/admin/HallTicketManagement';
import EventOversight from '@/pages/admin/EventOversight';
import ReportsAnalytics from '@/pages/admin/ReportsAnalytics';
import SystemSettings from '@/pages/admin/SystemSettings';

import { Loader } from 'lucide-react';

// Loading component
const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
    <div className="text-center">
      <Loader className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
      <p className="text-secondary-600">Loading CAMPUSFLOW...</p>
    </div>
  </div>
);

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Main app content
const AppContent: React.FC = () => {
  const { loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/app" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="study" element={<Study />} />
        <Route path="hall-ticket" element={<HallTicket />} />
        <Route path="seating" element={<Seating />} />
        <Route path="clubs" element={<Clubs />} />
        
        {/* Admin Routes */}
        <Route path="users" element={<UserManagement />} />
        <Route path="academic" element={<AcademicRecords />} />
        <Route path="examinations" element={<ExaminationControl />} />
        <Route path="hall-tickets" element={<HallTicketManagement />} />
        <Route path="events" element={<EventOversight />} />
        <Route path="reports" element={<ReportsAnalytics />} />
        <Route path="settings" element={<SystemSettings />} />
        
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
