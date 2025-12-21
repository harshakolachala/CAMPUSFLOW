import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calendar, Ticket, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PublicNavProps {
  className?: string;
}

const PublicNav: React.FC<PublicNavProps> = ({ className }) => {
  return (
    <header className={cn("w-full bg-white border-b border-slate-200", className)}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">CF</div>
          <div>
            <p className="font-bold text-slate-900 leading-none">CAMPUSFLOW</p>
            <p className="text-xs text-slate-500">Academic & Exam Management</p>
          </div>
        </div>
        <nav className="flex items-center space-x-6 text-sm">
          <NavLink to="/" className={({ isActive }) => cn("flex items-center space-x-2 text-slate-700 hover:text-blue-700", isActive && "text-blue-700 font-medium")}>
            <LayoutDashboard className="w-4 h-4" /><span>Home</span>
          </NavLink>
          <NavLink to="/features" className="flex items-center space-x-2 text-slate-700 hover:text-blue-700">
            <BookOpen className="w-4 h-4" /><span>Features</span>
          </NavLink>
          <NavLink to="/events" className="flex items-center space-x-2 text-slate-700 hover:text-blue-700">
            <Calendar className="w-4 h-4" /><span>Events</span>
          </NavLink>
          <NavLink to="/hall-ticket-info" className="flex items-center space-x-2 text-slate-700 hover:text-blue-700">
            <Ticket className="w-4 h-4" /><span>Hall Ticket</span>
          </NavLink>
          <NavLink to="/login" className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            <User className="w-4 h-4" /><span>Sign In</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default PublicNav;
