import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, BookOpen, Calendar, Clock, TrendingUp, Bell, 
  FileText, Award, BarChart3, ChevronRight, GraduationCap,
  CheckCircle, AlertCircle, Star, MessageSquare, PieChart
} from 'lucide-react';

const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();

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

  const ClassCard = ({ subject, students, time, room, attendance }: any) => (
    <div className="card p-6 hover:shadow-medium transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-1">{subject}</h3>
          <p className="text-sm text-secondary-600">{students} students enrolled</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          attendance >= 85 ? 'bg-emerald-100 text-emerald-700' :
          attendance >= 75 ? 'bg-orange-100 text-orange-700' :
          'bg-rose-100 text-rose-700'
        }`}>
          {attendance}% attendance
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-secondary-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{room}</span>
          </div>
        </div>
        <button className="text-primary-600 hover:text-primary-700 font-medium">
          View Details
        </button>
      </div>
    </div>
  );

  const PendingTask = ({ title, type, dueDate, priority }: any) => (
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
          <span>Due: {dueDate}</span>
        </div>
      </div>
      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
        Complete
      </button>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-secondary p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-bold mb-2">
                Good morning, Prof. {user?.name?.split(' ')[0]}! 📚
              </h1>
              <p className="text-pink-100 text-lg">
                You have 3 classes scheduled today and 12 assignments to review.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-12 h-12" />
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
          value="156" 
          subtitle="Across all courses"
          icon={Users} 
          color="bg-primary-600" 
        />
        <StatCard 
          title="Courses Teaching" 
          value="4" 
          subtitle="This semester"
          icon={BookOpen} 
          color="bg-accent-emerald" 
        />
        <StatCard 
          title="Assignments Pending" 
          value="12" 
          subtitle="Need grading"
          icon={FileText} 
          color="bg-accent-orange" 
        />
        <StatCard 
          title="Average Class Rating" 
          value="4.8" 
          subtitle="Student feedback"
          icon={Star} 
          color="bg-accent-purple" 
          trend={8.2}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Actions & Classes */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-poppins font-bold text-secondary-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuickActionCard
                title="Grade Assignments"
                description="Review and grade pending submissions"
                icon={CheckCircle}
                color="bg-accent-emerald"
                badge={12}
                onClick={() => {}}
              />
              <QuickActionCard
                title="Take Attendance"
                description="Mark attendance for today's classes"
                icon={Users}
                color="bg-primary-600"
                onClick={() => {}}
              />
              <QuickActionCard
                title="Create Assignment"
                description="Design new assignments and quizzes"
                icon={FileText}
                color="bg-accent-purple"
                onClick={() => {}}
              />
              <QuickActionCard
                title="View Analytics"
                description="Check class performance and insights"
                icon={BarChart3}
                color="bg-accent-orange"
                onClick={() => {}}
              />
            </div>
          </div>

          {/* Today's Classes */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-poppins font-bold text-secondary-900">Today's Classes</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
                View Schedule <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ClassCard
                subject="Data Structures & Algorithms"
                students={45}
                time="9:00 AM - 10:30 AM"
                room="Room 301"
                attendance={92}
              />
              <ClassCard
                subject="Database Management Systems"
                students={38}
                time="11:00 AM - 12:30 PM"
                room="Lab 205"
                attendance={88}
              />
              <ClassCard
                subject="Software Engineering"
                students={42}
                time="2:00 PM - 3:30 PM"
                room="Room 401"
                attendance={85}
              />
              <ClassCard
                subject="Computer Networks"
                students={31}
                time="4:00 PM - 5:30 PM"
                room="Lab 301"
                attendance={78}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Pending Tasks & Analytics */}
        <div className="space-y-8">
          {/* Pending Tasks */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-poppins font-bold text-secondary-900">Pending Tasks</h2>
              <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">8</span>
              </div>
            </div>
            <div className="space-y-3">
              <PendingTask
                title="Grade DSA Mid-term Exams"
                type="grading"
                dueDate="Tomorrow"
                priority="high"
              />
              <PendingTask
                title="Prepare DBMS Lab Assignment"
                type="preparation"
                dueDate="Dec 22"
                priority="medium"
              />
              <PendingTask
                title="Submit Course Feedback Report"
                type="administrative"
                dueDate="Dec 25"
                priority="medium"
              />
              <PendingTask
                title="Review Research Proposals"
                type="research"
                dueDate="Dec 28"
                priority="low"
              />
            </div>
          </div>

          {/* Class Performance Analytics */}
          <div className="card p-6">
            <h3 className="font-semibold text-secondary-900 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-primary-600" />
              Class Performance Overview
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-secondary-600">Average Grade</span>
                  <span className="font-medium text-secondary-900">B+</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div className="bg-accent-emerald h-2 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-secondary-600">Assignment Submission Rate</span>
                  <span className="font-medium text-secondary-900">94%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-secondary-600">Class Participation</span>
                  <span className="font-medium text-secondary-900">86%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div className="bg-accent-purple h-2 rounded-full" style={{ width: '86%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Student Messages */}
          <div className="card p-6">
            <h3 className="font-semibold text-secondary-900 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-primary-600" />
              Recent Messages
            </h3>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", message: "Question about assignment 3", time: "2h ago", unread: true },
                { name: "Mike Chen", message: "Request for grade clarification", time: "5h ago", unread: true },
                { name: "Emma Davis", message: "Thank you for the feedback!", time: "1d ago", unread: false }
              ].map((msg, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 text-xs font-medium">
                      {msg.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-secondary-900 text-sm">{msg.name}</h4>
                      {msg.unread && <div className="w-2 h-2 bg-primary-500 rounded-full" />}
                    </div>
                    <p className="text-secondary-600 text-sm mt-1">{msg.message}</p>
                    <p className="text-secondary-400 text-xs mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;