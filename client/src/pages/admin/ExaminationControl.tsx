import React, { useState } from 'react';
import { 
  FileText, Users, Plus, Edit, Trash2, Eye, Download, RefreshCw,
  CheckCircle, Clock, AlertCircle
} from 'lucide-react';

interface Exam {
  id: string;
  name: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  totalStudents: number;
  eligibleStudents: number;
  rooms: string[];
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  seatingGenerated: boolean;
}

interface SeatingPlan {
  examId: string;
  room: string;
  capacity: number;
  assigned: number;
  students: Array<{
    seatNo: number;
    studentId: string;
    name: string;
  }>;
}

const ExaminationControl: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      name: 'Mid-Semester Examination',
      subject: 'Data Structures & Algorithms',
      date: '2024-12-25',
      time: '10:00 AM',
      duration: 180,
      totalStudents: 120,
      eligibleStudents: 115,
      rooms: ['Room 301', 'Room 302', 'Room 303'],
      status: 'scheduled',
      seatingGenerated: true
    },
    {
      id: '2',
      name: 'End-Semester Examination',
      subject: 'Database Management Systems',
      date: '2024-12-28',
      time: '2:00 PM',
      duration: 180,
      totalStudents: 95,
      eligibleStudents: 90,
      rooms: ['Room 401', 'Room 402'],
      status: 'scheduled',
      seatingGenerated: false
    },
    {
      id: '3',
      name: 'Mid-Semester Examination',
      subject: 'Computer Networks',
      date: '2024-12-22',
      time: '10:00 AM',
      duration: 180,
      totalStudents: 85,
      eligibleStudents: 82,
      rooms: ['Room 201', 'Room 202'],
      status: 'completed',
      seatingGenerated: true
    }
  ]);

  const [seatingPlans, setSeatingPlans] = useState<SeatingPlan[]>([
    {
      examId: '1',
      room: 'Room 301',
      capacity: 40,
      assigned: 38,
      students: Array.from({ length: 38 }, (_, i) => ({
        seatNo: i + 1,
        studentId: `CS2024${String(i + 1).padStart(3, '0')}`,
        name: `Student ${i + 1}`
      }))
    }
  ]);

  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showSeatingModal, setShowSeatingModal] = useState(false);

  const generateSeating = (examId: string) => {
    const exam = exams.find(e => e.id === examId);
    if (!exam) return;

    // Simulate seating generation
    const updatedExams = exams.map(e => 
      e.id === examId ? { ...e, seatingGenerated: true } : e
    );
    setExams(updatedExams);
    
    // Generate mock seating plan
    const newSeatingPlan: SeatingPlan = {
      examId,
      room: exam.rooms[0],
      capacity: 40,
      assigned: exam.eligibleStudents,
      students: Array.from({ length: exam.eligibleStudents }, (_, i) => ({
        seatNo: i + 1,
        studentId: `CS2024${String(i + 1).padStart(3, '0')}`,
        name: `Student ${i + 1}`
      }))
    };
    
    setSeatingPlans([...seatingPlans, newSeatingPlan]);
    alert('Seating arrangement generated successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-orange-100 text-orange-700';
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'cancelled': return 'bg-rose-100 text-rose-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return Clock;
      case 'ongoing': return AlertCircle;
      case 'completed': return CheckCircle;
      case 'cancelled': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-secondary-900">Examination & Seating Control</h1>
          <p className="text-secondary-600 mt-1">Manage examinations and generate seating arrangements</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button 
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Exam
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Total Exams</p>
              <p className="text-2xl font-bold text-secondary-900">{exams.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Scheduled</p>
              <p className="text-2xl font-bold text-secondary-900">
                {exams.filter(e => e.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Completed</p>
              <p className="text-2xl font-bold text-secondary-900">
                {exams.filter(e => e.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Total Students</p>
              <p className="text-2xl font-bold text-secondary-900">
                {exams.reduce((sum, e) => sum + e.totalStudents, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exams Table */}
      <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-secondary-200">
          <h2 className="text-lg font-semibold text-secondary-900">Examination Schedule</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Exam Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Rooms
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
              {exams.map((exam) => {
                const StatusIcon = getStatusIcon(exam.status);
                
                return (
                  <tr key={exam.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-secondary-900">{exam.name}</p>
                        <p className="text-sm text-secondary-600">{exam.subject}</p>
                        <p className="text-xs text-secondary-500">{exam.duration} minutes</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-secondary-900">{exam.date}</p>
                        <p className="text-sm text-secondary-600">{exam.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-secondary-900">
                          {exam.eligibleStudents} / {exam.totalStudents}
                        </p>
                        <p className="text-sm text-secondary-600">
                          {exam.totalStudents - exam.eligibleStudents} excluded
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {exam.rooms.map((room, index) => (
                          <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs">
                            {room}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="w-4 h-4" />
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(exam.status)}`}>
                          {exam.status}
                        </span>
                      </div>
                      {exam.seatingGenerated && (
                        <p className="text-xs text-emerald-600 mt-1">✓ Seating Generated</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedExam(exam)}
                          className="p-1 text-secondary-400 hover:text-primary-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1 text-secondary-400 hover:text-primary-600 transition-colors"
                          title="Edit Exam"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        
                        {!exam.seatingGenerated && exam.status === 'scheduled' && (
                          <button 
                            onClick={() => generateSeating(exam.id)}
                            className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded hover:bg-primary-200 transition-colors"
                          >
                            Generate Seating
                          </button>
                        )}
                        
                        {exam.seatingGenerated && (
                          <button 
                            onClick={() => {
                              setSelectedExam(exam);
                              setShowSeatingModal(true);
                            }}
                            className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                          >
                            View Seating
                          </button>
                        )}
                        
                        <button 
                          className="p-1 text-secondary-400 hover:text-rose-600 transition-colors"
                          title="Delete Exam"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seating Plan Modal */}
      {showSeatingModal && selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-poppins font-bold text-secondary-900">
                Seating Plan - {selectedExam.subject}
              </h2>
              <button 
                onClick={() => setShowSeatingModal(false)}
                className="text-secondary-400 hover:text-secondary-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <p className="text-sm text-secondary-600">Total Seats</p>
                  <p className="text-2xl font-bold text-secondary-900">120</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm text-emerald-600">Assigned</p>
                  <p className="text-2xl font-bold text-emerald-900">{selectedExam.eligibleStudents}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-orange-600">Excluded</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {selectedExam.totalStudents - selectedExam.eligibleStudents}
                  </p>
                </div>
              </div>

              {/* Room Layout Visualization */}
              <div className="bg-secondary-50 p-6 rounded-xl">
                <h3 className="font-semibold text-secondary-900 mb-4">Room 301 Layout</h3>
                <div className="grid grid-cols-8 gap-2">
                  {Array.from({ length: 40 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded border-2 flex items-center justify-center text-xs font-medium ${
                        i < selectedExam.eligibleStudents
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'bg-secondary-100 border-secondary-300 text-secondary-500'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center mt-4 space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-emerald-100 border-2 border-emerald-300 rounded"></div>
                    <span className="text-secondary-600">Assigned</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-secondary-100 border-2 border-secondary-300 rounded"></div>
                    <span className="text-secondary-600">Empty</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="btn-primary flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Seating Plan
                </button>
                <button className="btn-secondary">Regenerate</button>
                <button className="btn-secondary">Print</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExaminationControl;