import React, { useState } from 'react';
import { 
  BarChart3, PieChart, TrendingUp, Download, Calendar,
  Users, GraduationCap, AlertTriangle, CheckCircle,
  FileText, Filter, RefreshCw, Eye, ArrowUp, ArrowDown
} from 'lucide-react';

interface AnalyticsData {
  totalStudents: number;
  activeStudents: number;
  detainedStudents: number;
  creditShortageStudents: number;
  averageCGPA: number;
  totalFaculty: number;
  totalCourses: number;
  systemUptime: number;
}

interface DepartmentStats {
  name: string;
  students: number;
  faculty: number;
  averageCGPA: number;
  detainedCount: number;
  performance: number;
}

interface TrendData {
  month: string;
  enrollments: number;
  graduations: number;
  detentions: number;
}

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'administrative' | 'financial' | 'system';
  generatedAt: string;
  generatedBy: string;
  size: string;
  status: 'ready' | 'generating' | 'failed';
}

const ReportsAnalytics: React.FC = () => {
  const [analyticsData] = useState<AnalyticsData>({
    totalStudents: 2543,
    activeStudents: 2387,
    detainedStudents: 89,
    creditShortageStudents: 67,
    averageCGPA: 7.2,
    totalFaculty: 156,
    totalCourses: 124,
    systemUptime: 99.8
  });

  const [departmentStats] = useState<DepartmentStats[]>([
    {
      name: 'Computer Science',
      students: 456,
      faculty: 28,
      averageCGPA: 7.8,
      detainedCount: 12,
      performance: 92
    },
    {
      name: 'Electronics',
      students: 398,
      faculty: 22,
      averageCGPA: 7.5,
      detainedCount: 18,
      performance: 88
    },
    {
      name: 'Mechanical',
      students: 412,
      faculty: 25,
      averageCGPA: 7.1,
      detainedCount: 25,
      performance: 85
    },
    {
      name: 'Civil',
      students: 356,
      faculty: 19,
      averageCGPA: 6.9,
      detainedCount: 22,
      performance: 83
    }
  ]);

  const [trendData] = useState<TrendData[]>([
    { month: 'Aug 2024', enrollments: 245, graduations: 0, detentions: 12 },
    { month: 'Sep 2024', enrollments: 23, graduations: 0, detentions: 8 },
    { month: 'Oct 2024', enrollments: 15, graduations: 0, detentions: 15 },
    { month: 'Nov 2024', enrollments: 8, graduations: 0, detentions: 22 },
    { month: 'Dec 2024', enrollments: 12, graduations: 0, detentions: 18 }
  ]);

  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      name: 'Student Academic Performance Report',
      description: 'Comprehensive analysis of student CGPA and credit status',
      type: 'academic',
      generatedAt: '2024-12-20',
      generatedBy: 'Dr. Admin',
      size: '2.4 MB',
      status: 'ready'
    },
    {
      id: '2',
      name: 'Department-wise Faculty Distribution',
      description: 'Faculty allocation and workload analysis across departments',
      type: 'administrative',
      generatedAt: '2024-12-19',
      generatedBy: 'Dr. Admin',
      size: '1.8 MB',
      status: 'ready'
    },
    {
      id: '3',
      name: 'System Usage Analytics',
      description: 'Platform usage statistics and performance metrics',
      type: 'system',
      generatedAt: '2024-12-18',
      generatedBy: 'System',
      size: '3.2 MB',
      status: 'ready'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'departments' | 'trends' | 'reports'>('overview');
  const [selectedDateRange, setSelectedDateRange] = useState('last_30_days');

  const generateReport = (type: string) => {
    const newReport: Report = {
      id: Date.now().toString(),
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
      description: `Generated ${type} report for current period`,
      type: type as 'academic' | 'administrative' | 'financial' | 'system',
      generatedAt: new Date().toISOString().split('T')[0],
      generatedBy: 'Dr. Admin',
      size: '0 MB',
      status: 'generating'
    };
    
    setReports([newReport, ...reports]);
    
    // Simulate report generation
    setTimeout(() => {
      setReports(prev => prev.map(report => 
        report.id === newReport.id 
          ? { ...report, status: 'ready' as const, size: `${(Math.random() * 3 + 1).toFixed(1)} MB` }
          : report
      ));
    }, 3000);
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend, change }: any) => (
    <div className="bg-white rounded-xl border border-secondary-200 p-6 hover:shadow-medium transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2.5 rounded-xl ${color}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-medium text-secondary-600 text-sm">{title}</h3>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-secondary-900">{value}</p>
            {subtitle && <p className="text-xs text-secondary-500">{subtitle}</p>}
          </div>
        </div>
        {trend !== undefined && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend > 0 ? 'bg-emerald-100 text-emerald-700' : 
            trend < 0 ? 'bg-rose-100 text-rose-700' :
            'bg-secondary-100 text-secondary-700'
          }`}>
            {trend > 0 ? <ArrowUp className="w-3 h-3" /> : 
             trend < 0 ? <ArrowDown className="w-3 h-3" /> : null}
            <span>{change || Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );

  const DepartmentCard = ({ dept }: { dept: DepartmentStats }) => (
    <div className="bg-white rounded-xl border border-secondary-200 p-6 hover:shadow-medium transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-secondary-900 mb-1">{dept.name}</h3>
          <p className="text-sm text-secondary-600">{dept.students} students • {dept.faculty} faculty</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          dept.performance >= 90 ? 'bg-emerald-100 text-emerald-700' :
          dept.performance >= 85 ? 'bg-orange-100 text-orange-700' :
          'bg-rose-100 text-rose-700'
        }`}>
          {dept.performance}% performance
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-secondary-600">Avg CGPA</p>
          <p className="text-lg font-bold text-secondary-900">{dept.averageCGPA}</p>
        </div>
        <div>
          <p className="text-xs text-secondary-600">Detained</p>
          <p className="text-lg font-bold text-rose-600">{dept.detainedCount}</p>
        </div>
      </div>
      
      <div className="w-full bg-secondary-200 rounded-full h-2">
        <div 
          className="bg-primary-600 h-2 rounded-full"
          style={{ width: `${dept.performance}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-secondary-900">Reports & Analytics</h1>
          <p className="text-secondary-600 mt-1">Comprehensive system analytics and reporting</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          >
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_3_months">Last 3 Months</option>
            <option value="last_year">Last Year</option>
          </select>
          <button className="btn-secondary flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-secondary-100 p-1 rounded-lg w-fit">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'departments', label: 'Departments' },
          { key: 'trends', label: 'Trends' },
          { key: 'reports', label: 'Reports' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-secondary-600 hover:text-secondary-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Students" 
              value={analyticsData.totalStudents.toLocaleString()} 
              subtitle="Enrolled students"
              icon={Users} 
              color="bg-primary-600" 
              trend={5.2}
              change="12"
            />
            <StatCard 
              title="Active Students" 
              value={analyticsData.activeStudents.toLocaleString()} 
              subtitle="Currently active"
              icon={CheckCircle} 
              color="bg-emerald-600" 
              trend={2.1}
              change="3"
            />
            <StatCard 
              title="Detained Students" 
              value={analyticsData.detainedStudents} 
              subtitle="Require attention"
              icon={AlertTriangle} 
              color="bg-rose-600" 
              trend={-8.5}
              change="8"
            />
            <StatCard 
              title="Average CGPA" 
              value={analyticsData.averageCGPA.toFixed(1)} 
              subtitle="System-wide average"
              icon={GraduationCap} 
              color="bg-purple-600" 
              trend={1.2}
              change="0.1"
            />
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Academic Performance */}
            <div className="bg-white rounded-xl border border-secondary-200 p-6">
              <h3 className="font-semibold text-secondary-900 mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-primary-600" />
                Academic Performance
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">CGPA 8.0+</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-secondary-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '45%' }} />
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">CGPA 6.0-8.0</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-secondary-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '38%' }} />
                    </div>
                    <span className="text-sm font-medium">38%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">CGPA Below 6.0</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-secondary-200 rounded-full h-2">
                      <div className="bg-rose-500 h-2 rounded-full" style={{ width: '17%' }} />
                    </div>
                    <span className="text-sm font-medium">17%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl border border-secondary-200 p-6">
              <h3 className="font-semibold text-secondary-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
                System Health
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Uptime</span>
                  <span className="font-bold text-emerald-600">{analyticsData.systemUptime}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Active Sessions</span>
                  <span className="font-bold text-secondary-900">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Database Usage</span>
                  <span className="font-bold text-secondary-900">67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Server Load</span>
                  <span className="font-bold text-secondary-900">34%</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'departments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departmentStats.map((dept) => (
            <DepartmentCard key={dept.name} dept={dept} />
          ))}
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <h3 className="font-semibold text-secondary-900 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
            Enrollment & Performance Trends
          </h3>
          
          {/* Trend Chart Placeholder */}
          <div className="h-64 bg-secondary-50 rounded-lg flex items-center justify-center mb-6">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-secondary-400 mx-auto mb-2" />
              <p className="text-secondary-600">Interactive trend charts would be displayed here</p>
              <p className="text-sm text-secondary-500">Showing enrollment, graduation, and detention trends</p>
            </div>
          </div>

          {/* Trend Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">Month</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">Enrollments</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">Graduations</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-secondary-700 uppercase">Detentions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200">
                {trendData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium text-secondary-900">{data.month}</td>
                    <td className="px-4 py-3 text-emerald-600 font-medium">{data.enrollments}</td>
                    <td className="px-4 py-3 text-blue-600 font-medium">{data.graduations}</td>
                    <td className="px-4 py-3 text-rose-600 font-medium">{data.detentions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Generate Reports */}
          <div className="bg-white rounded-xl border border-secondary-200 p-6">
            <h3 className="font-semibold text-secondary-900 mb-4">Generate New Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button 
                onClick={() => generateReport('academic')}
                className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors text-left"
              >
                <GraduationCap className="w-6 h-6 text-primary-600 mb-2" />
                <h4 className="font-medium text-secondary-900">Academic Report</h4>
                <p className="text-sm text-secondary-600">Student performance & grades</p>
              </button>
              <button 
                onClick={() => generateReport('administrative')}
                className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors text-left"
              >
                <Users className="w-6 h-6 text-emerald-600 mb-2" />
                <h4 className="font-medium text-secondary-900">Administrative</h4>
                <p className="text-sm text-secondary-600">Faculty & staff analytics</p>
              </button>
              <button 
                onClick={() => generateReport('financial')}
                className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors text-left"
              >
                <PieChart className="w-6 h-6 text-purple-600 mb-2" />
                <h4 className="font-medium text-secondary-900">Financial</h4>
                <p className="text-sm text-secondary-600">Fee collection & expenses</p>
              </button>
              <button 
                onClick={() => generateReport('system')}
                className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors text-left"
              >
                <BarChart3 className="w-6 h-6 text-orange-600 mb-2" />
                <h4 className="font-medium text-secondary-900">System</h4>
                <p className="text-sm text-secondary-600">Usage & performance metrics</p>
              </button>
            </div>
          </div>

          {/* Generated Reports */}
          <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-secondary-200">
              <h3 className="font-semibold text-secondary-900">Generated Reports</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase">Report</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase">Generated</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase">Size</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-secondary-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-secondary-900">{report.name}</p>
                          <p className="text-sm text-secondary-600">{report.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium capitalize">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-secondary-900">{report.generatedAt}</p>
                          <p className="text-xs text-secondary-600">By: {report.generatedBy}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-secondary-600">{report.size}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report.status === 'ready' ? 'bg-emerald-100 text-emerald-700' :
                          report.status === 'generating' ? 'bg-orange-100 text-orange-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {report.status === 'ready' && (
                            <>
                              <button className="p-1 text-secondary-400 hover:text-primary-600 transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-secondary-400 hover:text-primary-600 transition-colors">
                                <Download className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsAnalytics;