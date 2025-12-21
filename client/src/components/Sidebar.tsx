import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, BookOpen, Users, Calendar, Ticket, Grid, LogOut, 
  GraduationCap, UserCheck, Settings, BarChart3, FileText, Award,
  Clock, MapPin, User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getNavigationLinks = () => {
    const baseLinks = [
      { name: 'Dashboard', href: '/app', icon: LayoutDashboard, roles: ['student', 'faculty', 'admin', 'seating_manager', 'club_coordinator'] },
    ];

    const studentLinks = [
      { name: 'My Profile', href: '/app/profile', icon: User, roles: ['student'] },
      { name: 'Mind Map Helper', href: '/app/study', icon: BookOpen, roles: ['student'] },
      { name: 'Hall Ticket', href: '/app/hall-ticket', icon: Ticket, roles: ['student'] },
      { name: 'Club Events', href: '/app/clubs', icon: Calendar, roles: ['student'] },
    ];

    const facultyLinks = [
      { name: 'My Classes', href: '/app/classes', icon: Users, roles: ['faculty'] },
      { name: 'Course Management', href: '/app/courses', icon: BookOpen, roles: ['faculty'] },
      { name: 'Assignments', href: '/app/assignments', icon: FileText, roles: ['faculty'] },
      { name: 'Grading', href: '/app/grading', icon: Award, roles: ['faculty'] },
      { name: 'Attendance', href: '/app/attendance', icon: Clock, roles: ['faculty'] },
      { name: 'Analytics', href: '/app/analytics', icon: BarChart3, roles: ['faculty'] },
    ];

    const adminLinks = [
      { name: 'User Management', href: '/app/users', icon: Users, roles: ['admin'] },
      { name: 'Academic Records', href: '/app/academic', icon: GraduationCap, roles: ['admin'] },
      { name: 'Examination Control', href: '/app/examinations', icon: FileText, roles: ['admin'] },
      { name: 'Hall Ticket Management', href: '/app/hall-tickets', icon: Award, roles: ['admin'] },
      { name: 'Event Oversight', href: '/app/events', icon: Calendar, roles: ['admin'] },
      { name: 'Reports & Analytics', href: '/app/reports', icon: BarChart3, roles: ['admin'] },
      { name: 'System Settings', href: '/app/settings', icon: Settings, roles: ['admin'] },
    ];

    const specialRoleLinks = [
      { name: 'Seating Plans', href: '/app/seating', icon: MapPin, roles: ['seating_manager'] },
      { name: 'Event Management', href: '/app/events', icon: Calendar, roles: ['club_coordinator'] },
    ];

    let allLinks = [...baseLinks];
    
    if (user.role === 'student') {
      allLinks = [...allLinks, ...studentLinks];
    } else if (user.role === 'faculty') {
      allLinks = [...allLinks, ...facultyLinks];
    } else if (user.role === 'admin') {
      allLinks = [...allLinks, ...adminLinks];
    } else {
      allLinks = [...allLinks, ...specialRoleLinks];
    }

    return allLinks.filter(link => link.roles.includes(user.role as string));
  };

  const navigationLinks = getNavigationLinks();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'from-primary-600 to-primary-700';
      case 'faculty': return 'from-accent-emerald to-emerald-600';
      case 'admin': return 'from-accent-purple to-purple-600';
      default: return 'from-accent-orange to-orange-600';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return GraduationCap;
      case 'faculty': return UserCheck;
      case 'admin': return Settings;
      default: return Users;
    }
  };

  const RoleIcon = getRoleIcon(user.role);

  return (
    <div className={cn("flex flex-col h-screen bg-white border-r border-secondary-200 w-64 shadow-soft", className)}>
      {/* Header */}
      <div className="p-6 border-b border-secondary-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-poppins font-bold text-secondary-900">CAMPUSFLOW</h1>
            <p className="text-xs text-secondary-500">Academic Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        {navigationLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.href}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm",
                isActive
                  ? "bg-primary-50 text-primary-700 border border-primary-100"
                  : "text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900"
              )
            }
          >
            {({ isActive }) => (
              <>
                <link.icon className={cn(
                  "w-4 h-4 mr-3 transition-colors duration-200",
                  isActive ? "text-primary-600" : "text-secondary-500 group-hover:text-secondary-600"
                )} />
                <span className="font-medium">{link.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-secondary-100">
        <div className="flex items-center space-x-3 mb-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br",
            getRoleColor(user.role)
          )}>
            <RoleIcon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-secondary-900 truncate">{user.name}</p>
            <p className="text-xs text-secondary-500 capitalize">
              {user.role.replace('_', ' ')}
            </p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-4 h-4 mr-3" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
