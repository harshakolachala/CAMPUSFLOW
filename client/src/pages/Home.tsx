import React from 'react';
import PublicNav from '@/components/PublicNav';
import { Shield, Grid, Users, Ticket, BookOpen, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNav />
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mb-4">
              Integrated Academic & Examination Management
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Manage campus academics, exams, seating and clubs in one place
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              CAMPUSFLOW provides role-based dashboards for Students, Administrators, Seating Managers and Club Coordinators.
              Secure authentication, real-time data, and elegant UI out of the box.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => navigate('/login')} className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                Sign In / Create Account
              </button>
              <button onClick={() => navigate('/features')} className="px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 rounded-lg font-medium">
                Explore Features
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-bold text-blue-900">Secure Auth</p>
                      <p className="text-xs text-blue-700">Password hashing & role-based access</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                  <div className="flex items-center space-x-3">
                    <Grid className="w-6 h-6 text-emerald-600" />
                    <div>
                      <p className="font-bold text-emerald-900">Seating Plans</p>
                      <p className="text-xs text-emerald-700">Generate & save arrangements</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                  <div className="flex items-center space-x-3">
                    <Users className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="font-bold text-purple-900">Dashboards</p>
                      <p className="text-xs text-purple-700">Student & Admin views</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-100">
                  <div className="flex items-center space-x-3">
                    <Ticket className="w-6 h-6 text-orange-600" />
                    <div>
                      <p className="font-bold text-orange-900">Hall Tickets</p>
                      <p className="text-xs text-orange-700">Printable exam pass</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center space-x-3">
                  <BookOpen className="w-6 h-6 text-slate-700" />
                  <div>
                    <p className="font-bold text-slate-900">Study Support</p>
                    <p className="text-xs text-slate-600">Syllabus & mind maps</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-slate-700" />
                  <div>
                    <p className="font-bold text-slate-900">Club Events</p>
                    <p className="text-xs text-slate-600">Proposals & approvals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-10 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} CAMPUSFLOW</p>
          <div className="text-xs text-slate-500">Built with React, Express & Prisma</div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
