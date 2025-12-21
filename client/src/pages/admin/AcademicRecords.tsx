import React, { useState } from 'react';
import { 
  Search, AlertTriangle, CheckCircle, 
  XCircle, TrendingUp, Edit, Eye
} from 'lucide-react';

interface StudentRecord {
  id: string;
  name: string;
  studentId: string;
  course: string;
  semester: number;
  cgpa: number;
  credits: {
    earned: number;
    required: number;
  };
  status: 'active' | 'credit_shortage' | 'detained';
  lastUpdated: string;
}

const AcademicRecords: React.FC = () => {
  const [students, setStudents] = useState<StudentRecord[]>([
    {
      id: '1',
      name: 'John Doe',
      studentId: 'CS2024001',
      course: 'B.Tech Computer Science',
      semester: 5,
      cgpa: 8.7,
      credits: { earned: 120, required: 160 },
      status: 'active',
      lastUpdated: '2024-12-20'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      studentId: 'CS2024002',
      course: 'B.Tech Computer Science',
      semester: 5,
      cgpa: 6.2,
      credits: { earned: 95, required: 160 },
      status: 'credit_shortage',
      lastUpdated: '2024-12-19'
    },
    {
      id: '3',
      name: 'Mike Chen',
      studentId: 'EC2024015',
      course: 'B.Tech Electronics',
      semester: 3,
      cgpa: 4.8,
      credits: { earned: 45, required: 90 },
      status: 'detained',
      lastUpdated: '2024-12-18'
    },
    {
      id: '4',
      name: 'Emma Davis',
      studentId: 'CS2024003',
      course: 'B.Tech Computer Science',
      semester: 7,
      cgpa: 9.1,
      credits: { earned: 180, required: 200 },
      status: 'active',
      lastUpdated: '2024-12-20'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateStudentStatus = (studentId: string, newStatus: 'active' | 'credit_shortage' | 'detained') => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] } : student
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'credit_shortage': return 'bg-orange-100 text-orange-700';
      case 'detained': return 'bg-rose-100 text-rose-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'credit_shortage': return AlertTriangle;
      case 'detained': return XCircle;
      default: return CheckCircle;
    }
  };

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 8.0) return 'text-emerald-600';
    if (cgpa >= 6.0) return 'text-orange-600';
    return 'text-rose-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-secondary-900">Academic Records & Credit Management</h1>
          <p className="text-secondary-600 mt-1">Monitor student academic performance and credit status</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Active Students</p>
              <p className="text-2xl font-bold text-secondary-900">
                {students.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Credit Shortage</p>
              <p className="text-2xl font-bold text-secondary-900">
                {students.filter(s => s.status === 'credit_shortage').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-rose-100 rounded-lg">
              <XCircle className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Detained</p>
              <p className="text-2xl font-bold text-secondary-900">
                {students.filter(s => s.status === 'detained').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Avg CGPA</p>
              <p className="text-2xl font-bold text-secondary-900">
                {(students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-secondary-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="credit_shortage">Credit Shortage</option>
              <option value="detained">Detained</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Course & Semester
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  CGPA
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200">
              {filteredStudents.map((student) => {
                const StatusIcon = getStatusIcon(student.status);
                const creditPercentage = (student.credits.earned / student.credits.required) * 100;
                
                return (
                  <tr key={student.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium text-sm">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">{student.name}</p>
                          <p className="text-sm text-secondary-600">{student.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-secondary-900">{student.course}</p>
                      <p className="text-sm text-secondary-600">Semester {student.semester}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-lg font-bold ${getCGPAColor(student.cgpa)}`}>
                        {student.cgpa.toFixed(1)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-secondary-900">
                          {student.credits.earned} / {student.credits.required}
                        </p>
                        <div className="w-24 bg-secondary-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              creditPercentage >= 75 ? 'bg-emerald-500' : 
                              creditPercentage >= 50 ? 'bg-orange-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${Math.min(creditPercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="w-4 h-4" />
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(student.status)}`}>
                          {student.status.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedStudent(student)}
                          className="p-1 text-secondary-400 hover:text-primary-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1 text-secondary-400 hover:text-primary-600 transition-colors"
                          title="Edit Record"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        
                        {/* Status Change Buttons */}
                        {student.status !== 'active' && (
                          <button 
                            onClick={() => updateStudentStatus(student.id, 'active')}
                            className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                          >
                            Activate
                          </button>
                        )}
                        {student.status !== 'detained' && student.cgpa < 5.0 && (
                          <button 
                            onClick={() => updateStudentStatus(student.id, 'detained')}
                            className="px-2 py-1 text-xs bg-rose-100 text-rose-700 rounded hover:bg-rose-200 transition-colors"
                          >
                            Detain
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-poppins font-bold text-secondary-900">Academic Record Details</h2>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="text-secondary-400 hover:text-secondary-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-lg">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900">{selectedStudent.name}</h3>
                  <p className="text-secondary-600">{selectedStudent.studentId}</p>
                  <p className="text-secondary-600">{selectedStudent.course}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Current CGPA</label>
                    <p className={`text-2xl font-bold ${getCGPAColor(selectedStudent.cgpa)}`}>
                      {selectedStudent.cgpa.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Semester</label>
                    <p className="text-lg font-semibold text-secondary-900">{selectedStudent.semester}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Credits Progress</label>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Earned: {selectedStudent.credits.earned}</span>
                        <span>Required: {selectedStudent.credits.required}</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-3">
                        <div 
                          className="bg-primary-600 h-3 rounded-full"
                          style={{ width: `${(selectedStudent.credits.earned / selectedStudent.credits.required) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(selectedStudent.status)}`}>
                      {selectedStudent.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button className="btn-primary flex-1">Update Record</button>
                <button className="btn-secondary">View Transcript</button>
                <button className="btn-secondary">Generate Report</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicRecords;