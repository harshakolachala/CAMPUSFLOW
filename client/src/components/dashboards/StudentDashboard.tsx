import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, Clock, Trophy, TrendingUp, Bell, 
  FileText, Users, MapPin, Heart, Star, ChevronRight,
  GraduationCap, Target, Award, Activity, Brain
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }: any) => (
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
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, color, onClick }: any) => (
    <button
      onClick={onClick}
      className="card p-6 text-left hover:shadow-medium transition-all duration-300 group w-full"
    >
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

  const UpcomingEvent = ({ title, time, type, location }: any) => (
    <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-colors">
      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
        <Calendar className="w-5 h-5 text-primary-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-secondary-900">{title}</h4>
        <div className="flex items-center space-x-4 text-sm text-secondary-600 mt-1">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
        </div>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        type === 'exam' ? 'bg-rose-100 text-rose-700' :
        type === 'class' ? 'bg-blue-100 text-blue-700' :
        'bg-emerald-100 text-emerald-700'
      }`}>
        {type}
      </span>
    </div>
  );

  const AchievementBadge = ({ title, description, icon: Icon, earned }: any) => (
    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
      earned 
        ? 'border-accent-emerald bg-emerald-50 hover:bg-emerald-100' 
        : 'border-secondary-200 bg-white hover:bg-secondary-50'
    }`}>
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${
          earned ? 'bg-accent-emerald text-white' : 'bg-secondary-200 text-secondary-500'
        }`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <h4 className={`font-medium text-sm ${earned ? 'text-emerald-900' : 'text-secondary-600'}`}>
            {title}
          </h4>
          <p className={`text-xs ${earned ? 'text-emerald-700' : 'text-secondary-500'}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl border border-secondary-200 p-8 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-poppins font-bold text-secondary-900 mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-secondary-600">
              Ready to continue your learning journey today?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Current CGPA" 
          value="8.7" 
          subtitle="Excellent Performance"
          icon={Trophy} 
          color="bg-accent-emerald" 
          trend={5.2}
        />
        <StatCard 
          title="Attendance" 
          value="92%" 
          subtitle="Above Required"
          icon={Calendar} 
          color="bg-primary-600" 
          trend={2.1}
        />
        <StatCard 
          title="Assignments Due" 
          value="3" 
          subtitle="This Week"
          icon={FileText} 
          color="bg-accent-orange" 
        />
        <StatCard 
          title="Study Hours" 
          value="28.5" 
          subtitle="This Month"
          icon={Clock} 
          color="bg-accent-purple" 
          trend={12.3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Actions & Schedule */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-poppins font-bold text-secondary-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuickActionCard
                title="View Timetable"
                description="Check your class schedule and room assignments"
                icon={Calendar}
                color="bg-primary-600"
                onClick={() => alert('Timetable feature coming soon!')}
              />
              <QuickActionCard
                title="Mind Map Helper"
                description="Convert PDFs to interactive mind maps"
                icon={Brain}
                color="bg-accent-emerald"
                onClick={() => navigate('/app/study')}
              />
              <QuickActionCard
                title="Hall Ticket"
                description="Download your examination hall ticket"
                icon={Award}
                color="bg-accent-purple"
                onClick={() => navigate('/app/hall-ticket')}
              />
              <QuickActionCard
                title="My Profile"
                description="View and update your personal information"
                icon={BookOpen}
                color="bg-accent-orange"
                onClick={() => navigate('/app/profile')}
              />
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-poppins font-bold text-secondary-900">Today's Schedule</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              <UpcomingEvent
                title="Data Structures & Algorithms"
                time="9:00 AM - 10:30 AM"
                type="class"
                location="Room 301"
              />
              <UpcomingEvent
                title="Database Management Systems"
                time="11:00 AM - 12:30 PM"
                type="class"
                location="Lab 205"
              />
              <UpcomingEvent
                title="Software Engineering Quiz"
                time="2:00 PM - 3:00 PM"
                type="exam"
                location="Room 401"
              />
              <UpcomingEvent
                title="Tech Club Meeting"
                time="4:00 PM - 5:00 PM"
                type="event"
                location="Auditorium"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Notifications & Achievements */}
        <div className="space-y-8">
          {/* Recent Notifications */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-poppins font-bold text-secondary-900">Notifications</h2>
              <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: "Assignment Deadline", message: "Database project due tomorrow", time: "2h ago", urgent: true },
                { title: "Grade Published", message: "Software Engineering mid-term results", time: "5h ago", urgent: false },
                { title: "Event Reminder", message: "Tech fest registration closes soon", time: "1d ago", urgent: false }
              ].map((notification, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-xl bg-white border border-secondary-200 hover:shadow-soft transition-all">
                  <div className={`w-2 h-2 rounded-full mt-2 ${notification.urgent ? 'bg-rose-500' : 'bg-primary-500'}`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-secondary-900 text-sm">{notification.title}</h4>
                    <p className="text-secondary-600 text-sm mt-1">{notification.message}</p>
                    <p className="text-secondary-400 text-xs mt-2">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-xl font-poppins font-bold text-secondary-900 mb-6">Achievements</h2>
            <div className="space-y-3">
              <AchievementBadge
                title="Perfect Attendance"
                description="100% attendance this month"
                icon={Target}
                earned={true}
              />
              <AchievementBadge
                title="Top Performer"
                description="Highest grade in DSA"
                icon={Star}
                earned={true}
              />
              <AchievementBadge
                title="Early Bird"
                description="Submit 5 assignments early"
                icon={Clock}
                earned={false}
              />
              <AchievementBadge
                title="Team Player"
                description="Active in group projects"
                icon={Users}
                earned={false}
              />
            </div>
          </div>

          {/* Academic Progress */}
          <div className="card p-6">
            <h3 className="font-semibold text-secondary-900 mb-4">Academic Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-secondary-600">Semester Progress</span>
                  <span className="font-medium text-secondary-900">75%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-secondary-600">Assignment Completion</span>
                  <span className="font-medium text-secondary-900">88%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div className="bg-accent-emerald h-2 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;