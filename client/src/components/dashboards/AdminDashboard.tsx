import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, BookOpen, Calendar, TrendingUp, Bell, Shield,
  FileText, Award, BarChart3, ChevronRight, Settings,
  CheckCircle, AlertCircle, Star, Activity, PieChart,
  UserCheck, GraduationCap, Building, Database
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend, change }: any) => (
    <div className="card p-6 hover:shadow-medium transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2.5 rounded-xl ${color} group-hover:scale-110 transition-transform duration-200`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-medium text-secondary-600 text-sm">{title}</h3>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-secondary-900">{value}</p>
            {subtitle && <p className="text-xs text-secondary-500">{subtitle}</p>}
          </div>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
          }`}>
            <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
            <span>{change || Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, color, onClick, badge }: any) => (
    <button
      onClick={onClick}
      className="card p-6 text-left hover:shadow-medium transition-all duration-300 group w-full relative"
    >
      {badge && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">{badge}</span>
        </div>
      )}
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-secondary-900 mb-1">{title}</h3>
          <p className="text-sm text-secondary-600">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-secondary-400 group-hover:text-secondary-600 transition-colors" />
      </div>
    </button>
  );

  const DepartmentCard = ({ name, students, faculty, courses, performance }: any) => (
    <div className="card p-6 hover:shadow-medium transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-1">{name}</h3>
          <p className="text-sm text-secondary-600">{students} students • {faculty} faculty</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          performance >= 85 ? 'bg-emerald-100 text-emerald-700' :
          performance >= 75 ? 'bg-orange-100 text-orange-700' :
          'bg-rose-100 text-rose-700'
        }`}>
          {performance}% performance
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-secondary-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{courses} courses</span>
          </div>
        </div>
        <button className="text-primary-600 hover:text-primary-700 font-medium">
          View Details
        </button>
      </div>
    </div>
  );

  const PendingApproval = ({ title, type, submittedBy, date, priority }: any) => (
    <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-colors">
      <div className={`w-3 h-3 rounded-full ${
        priority === 'high' ? 'bg-rose-500' :
        priority === 'medium' ? 'bg-orange-500' :
        'bg-emerald-500'
      }`} />
      <div className="flex-1">
        <h4 className="font-medium text-secondary-900 text-sm">{title}</h4>
        <div className="flex items-center space-x-4 text-xs text-secondary-600 mt-1">
          <span className="capitalize">{type}</span>
          <span>By: {submittedBy}</span>
          <span>{date}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
          Approve
        </button>
        <button className="text-rose-600 hover:text-rose-700 text-sm font-medium">
          Reject
        </button>
      </div>
    </div>
  );

  const SystemAlert = ({ title, message, type, time }: any) => (
    <div className="flex items-start space-x-3 p-4 rounded-xl bg-white border border-secondary-200">
      <div className={`p-1.5 rounded-full ${
        type === 'error' ? 'bg-rose-100' :
        type === 'warning' ? 'bg-orange-100' :
        'bg-blue-100'
      }`}>
        {type === 'error' ? (
          <AlertCircle className="w-4 h-4 text-rose-600" />
        ) : type === 'warning' ? (
          <AlertCircle className="w-4 h-4 text-orange-600" />
        ) : (
          <CheckCircle className="w-4 h-4 text-blue-600" />
        )}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-secondary-900 text-sm">{title}</h4>
        <p className="text-secondary-600 text-sm mt-1">{message}</p>
        <p className="text-secondary-400 text-xs mt-2">{time}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-success p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-bold mb-2">
                System Overview 🎯
              </h1>
              <p className="text-blue-100 text-lg">
                Managing 2,543 students across 8 departments with 156 faculty members.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                <Shield className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value="2,543" 
          subtitle="Active enrollments"
          icon={Users} 
          color="bg-primary-600" 
          trend={5.2}
          change="12"
        />
        <StatCard 
          title="Faculty Members" 
          value="156" 
          subtitle="Across all departments"
          icon={UserCheck} 
          color="bg-accent-emerald" 
          trend={2.1}
          change="3"
        />
        <StatCard 
          title="Pending Approvals" 
          value="24" 
          subtitle="Require attention"
          icon={AlertCircle} 
          color="bg-accent-orange" 
        />
        <StatCard 
          title="System Health" 
          value="98.5%" 
          subtitle="Uptime this month"
          icon={Activity} 
          color="bg-accent-purple" 
          trend={0.5}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Actions & Departments */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-poppins font-bold text-secondary-900 mb-6">Administrative Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuickActionCard
                title="Student Management"
                description="View, add, or modify student records"
                icon={Users}
                color="bg-primary-600"
                onClick={() => {}}
              />
              <QuickActionCard
                title="Faculty Management"
                description="Manage faculty profiles and assignments"
                icon={UserCheck}
                color="bg-accent-emerald"
                onClick={() => {}}
              />
              <QuickActionCard
                title="Course Management"
                description="Create and manage academic courses"
                icon={BookOpen}
                color="bg-accent-purple"
                onClick={() => {}}
              />
              <QuickActionCard
                title="System Settings"
                description="Configure system parameters and policies"
                icon={Settings}
                color="bg-accent-orange"
                onClick={() => {}}
              />
              <QuickActionCard
                title="Reports & Analytics"
                description="Generate comprehensive system reports"
                icon={BarChart3}
                color="bg-secondary-700"
                onClick={() => {}}
              />
              <QuickActionCard
                title="Pending Approvals"
                description="Review and approve pending requests"
                icon={CheckCircle}
                color="bg-rose-600"
                badge={24}
                onClick={() => {}}
              />
            </div>
          </div>

          {/* Department Overview */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-poppins font-bold text-secondary-900">Department Overview</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DepartmentCard
                name="Computer Science & Engineering"
                students={456}
                faculty={28}
                courses={24}
                performance={92}
              />
              <DepartmentCard
                name="Electronics & Communication"
                students={398}
                faculty={22}
                courses={20}
                performance={88}
              />
              <DepartmentCard
                name="Mechanical Engineering"
                students={412}
                faculty={25}
                courses={22}
                performance={85}
              />
              <DepartmentCard
                name="Civil Engineering"
                students={356}
                faculty={19}
                courses={18}
                performance={87}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Approvals & System Status */}
        <div className="space-y-8">
          {/* Pending Approvals */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-poppins font-bold text-secondary-900">Pending Approvals</h2>
              <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">24</span>
              </div>
            </div>
            <div className="space-y-3">
              <PendingApproval
                title="New Faculty Registration"
                type="registration"
                submittedBy="Dr. Sarah Johnson"
                date="2 hours ago"
                priority="high"
              />
              <PendingApproval
                title="Course Curriculum Update"
                type="curriculum"
                submittedBy="Prof. Mike Chen"
                date="5 hours ago"
                priority="medium"
              />
              <PendingApproval
                title="Student Transfer Request"
                type="transfer"
                submittedBy="Emma Davis"
                date="1 day ago"
                priority="medium"
              />
              <PendingApproval
                title="Event Proposal - Tech Fest"
                type="event"
                submittedBy="Tech Club"
                date="2 days ago"
                priority="low"
              />
            </div>
          </div>

          {/* System Analytics */}
          <div className="card p-6">
            <h3 className="font-semibold text-secondary-900 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-primary-600" />
              System Analytics
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-secondary-600">Database Usage</span>
                  <span className="font-medium text-secondary-900">67%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '67%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-secondary-600">Active Users</span>
                  <span className="font-medium text-secondary-900">1,847</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div className="bg-accent-emerald h-2 rounded-full" style={{ width: '73%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-secondary-600">Server Load</span>
                  <span className="font-medium text-secondary-900">34%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div className="bg-accent-orange h-2 rounded-full" style={{ width: '34%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* System Alerts */}
          <div>
            <h3 className="font-semibold text-secondary-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-primary-600" />
              System Alerts
            </h3>
            <div className="space-y-4">
              <SystemAlert
                title="Database Backup Completed"
                message="Daily backup completed successfully at 2:00 AM"
                type="success"
                time="6 hours ago"
              />
              <SystemAlert
                title="High Server Load Detected"
                message="Server load exceeded 80% during peak hours"
                type="warning"
                time="8 hours ago"
              />
              <SystemAlert
                title="Security Update Available"
                message="New security patches available for installation"
                type="info"
                time="1 day ago"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card p-6">
            <h3 className="font-semibold text-secondary-900 mb-4">Quick Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-secondary-600 text-sm">New Registrations Today</span>
                <span className="font-bold text-secondary-900">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600 text-sm">Active Sessions</span>
                <span className="font-bold text-secondary-900">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600 text-sm">Completed Transactions</span>
                <span className="font-bold text-secondary-900">856</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600 text-sm">System Uptime</span>
                <span className="font-bold text-emerald-600">99.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;