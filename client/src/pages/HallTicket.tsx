import React, { useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Download, Printer, AlertCircle, GraduationCap } from 'lucide-react';

const HallTicket: React.FC = () => {
  const { user } = useAuth();
  const ticketRef = useRef<HTMLDivElement>(null);

  const ticketData = {
    examName: 'End Semester Examination - Fall 2024',
    studentName: user?.name || 'Student Name',
    rollNumber: '21CS001',
    course: 'B.Tech Computer Science',
    semester: 'V',
    center: 'Main Block, Room 304',
    subjects: [
      { code: 'CS501', name: 'Computer Networks', date: '20 Dec 2024', time: '10:00 AM - 01:00 PM' },
      { code: 'CS502', name: 'Web Technologies', date: '22 Dec 2024', time: '10:00 AM - 01:00 PM' },
      { code: 'CS503', name: 'Software Engineering', date: '24 Dec 2024', time: '10:00 AM - 01:00 PM' },
    ]
  };

  const handleDownload = () => {
    const printContent = ticketRef.current;
    if (!printContent) return;

    const originalContent = document.body.innerHTML;
    const printableContent = printContent.innerHTML;

    document.body.innerHTML = `
      <div style="font-family: system-ui, -apple-system, sans-serif;">
        ${printableContent}
      </div>
    `;

    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-secondary-900">Hall Ticket</h1>
          <p className="text-secondary-600 mt-1">Download your examination hall ticket</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleDownload}
            className="btn-secondary flex items-center"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
          <button 
            onClick={handleDownload}
            className="btn-primary flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
        </div>
      </div>

      {/* Hall Ticket */}
      <div className="max-w-4xl mx-auto">
        <div 
          ref={ticketRef} 
          className="bg-white rounded-2xl border border-secondary-200 shadow-soft p-12 print:shadow-none print:border-none print:rounded-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-secondary-200">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-medium">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-poppins font-bold text-secondary-900">CAMPUSFLOW UNIVERSITY</h2>
                <p className="text-secondary-600 text-sm mt-1">Academic Excellence • Innovation • Leadership</p>
                <p className="text-primary-600 font-semibold mt-2">{ticketData.examName}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-24 h-28 bg-secondary-100 border-2 border-dashed border-secondary-300 rounded-lg flex items-center justify-center">
                <span className="text-xs text-secondary-500 font-medium">Student Photo</span>
              </div>
            </div>
          </div>

          {/* Student Information */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-secondary-500 uppercase tracking-wider mb-1">Student Name</p>
                <p className="text-lg font-semibold text-secondary-900">{ticketData.studentName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-secondary-500 uppercase tracking-wider mb-1">Course</p>
                <p className="font-medium text-secondary-900">{ticketData.course}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-secondary-500 uppercase tracking-wider mb-1">Roll Number</p>
                <p className="text-lg font-semibold text-secondary-900">{ticketData.rollNumber}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-secondary-500 uppercase tracking-wider mb-1">Semester</p>
                <p className="font-medium text-secondary-900">{ticketData.semester}</p>
              </div>
            </div>
          </div>

          {/* Examination Schedule */}
          <div className="mb-8">
            <h3 className="text-lg font-poppins font-semibold text-secondary-900 mb-4">Examination Schedule</h3>
            <div className="overflow-hidden rounded-xl border border-secondary-200">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">Subject Code</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">Subject Name</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-secondary-700 uppercase tracking-wider">Signature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-200">
                  {ticketData.subjects.map((subject, index) => (
                    <tr key={index} className="hover:bg-secondary-50">
                      <td className="px-6 py-4 text-sm font-medium text-secondary-900">{subject.date}</td>
                      <td className="px-6 py-4 text-sm text-secondary-600">{subject.time}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary-600">{subject.code}</td>
                      <td className="px-6 py-4 text-sm text-secondary-900">{subject.name}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="w-16 h-8 border-b border-secondary-300 mx-auto"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Instructions and QR Code */}
          <div className="flex justify-between items-start pt-6 border-t border-secondary-200">
            <div className="max-w-md">
              <div className="flex items-center text-amber-600 mb-3">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="font-semibold">Important Instructions</span>
              </div>
              <ul className="text-sm text-secondary-600 space-y-1">
                <li>• Bring this hall ticket and valid photo ID</li>
                <li>• Report 30 minutes before exam time</li>
                <li>• Electronic devices are prohibited</li>
                <li>• Follow all examination guidelines</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary-900 rounded-lg p-2 mb-2">
                <div className="w-full h-full bg-white rounded grid grid-cols-4 gap-0.5 p-1">
                  {Array.from({ length: 16 }, (_, i) => (
                    <div 
                      key={i} 
                      className={`${Math.random() > 0.5 ? 'bg-secondary-900' : 'bg-white'} rounded-sm`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs font-mono text-secondary-500">ID: {ticketData.rollNumber}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-secondary-200 text-center">
            <p className="text-xs text-secondary-500">
              This is a computer-generated document. No signature required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallTicket;
