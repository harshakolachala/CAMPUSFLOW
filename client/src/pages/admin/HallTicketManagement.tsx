import React, { useState } from 'react';
import { 
  Upload, Download, FileText, CheckCircle, XCircle, 
  AlertTriangle, Search, Filter, Eye, RefreshCw,
  Users, Building, Calendar, BarChart3
} from 'lucide-react';

interface HallTicket {
  id: string;
  studentId: string;
  studentName: string;
  examName: string;
  examDate: string;
  department: string;
  semester: number;
  status: 'generated' | 'delivered' | 'failed' | 'pending';
  generatedAt: string;
  deliveredAt?: string;
}

interface UploadBatch {
  id: string;
  fileName: string;
  uploadedAt: string;
  totalTickets: number;
  successCount: number;
  failedCount: number;
  status: 'processing' | 'completed' | 'failed';
}

const HallTicketManagement: React.FC = () => {
  const [hallTickets, setHallTickets] = useState<HallTicket[]>([
    {
      id: '1',
      studentId: 'CS2024001',
      studentName: 'John Doe',
      examName: 'Mid-Semester Examination',
      examDate: '2024-12-25',
      department: 'Computer Science',
      semester: 5,
      status: 'delivered',
      generatedAt: '2024-12-20',
      deliveredAt: '2024-12-20'
    },
    {
      id: '2',
      studentId: 'CS2024002',
      studentName: 'Sarah Johnson',
      examName: 'Mid-Semester Examination',
      examDate: '2024-12-25',
      department: 'Computer Science',
      semester: 5,
      status: 'failed',
      generatedAt: '2024-12-20'
    },
    {
      id: '3',
      studentId: 'EC2024015',
      studentName: 'Mike Chen',
      examName: 'End-Semester Examination',
      examDate: '2024-12-28',
      department: 'Electronics',
      semester: 3,
      status: 'pending',
      generatedAt: '2024-12-19'
    }
  ]);

  const [uploadBatches, setUploadBatches] = useState<UploadBatch[]>([
    {
      id: '1',
      fileName: 'mid_sem_hall_tickets.xlsx',
      uploadedAt: '2024-12-20',
      totalTickets: 120,
      successCount: 118,
      failedCount: 2,
      status: 'completed'
    },
    {
      id: '2',
      fileName: 'end_sem_hall_tickets.xlsx',
      uploadedAt: '2024-12-19',
      totalTickets: 95,
      successCount: 90,
      failedCount: 5,
      status: 'processing'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<HallTicket | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredTickets = hallTickets.filter(ticket => {
    const matchesSearch = ticket.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || ticket.department === filterDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-100 text-emerald-700';
      case 'generated': return 'bg-blue-100 text-blue-700';
      case 'failed': return 'bg-rose-100 text-rose-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'generated': return FileText;
      case 'failed': return XCircle;
      case 'pending': return AlertTriangle;
      default: return FileText;
    }
  };

  const handleBulkUpload = (file: File) => {
    const newBatch: UploadBatch = {
      id: Date.now().toString(),
      fileName: file.name,
      uploadedAt: new Date().toISOString().split('T')[0],
      totalTickets: Math.floor(Math.random() * 100) + 50,
      successCount: 0,
      failedCount: 0,
      status: 'processing'
    };
    
    setUploadBatches([newBatch, ...uploadBatches]);
    setShowUploadModal(false);
    
    // Simulate processing
    setTimeout(() => {
      const successCount = Math.floor(newBatch.totalTickets * 0.9);
      const failedCount = newBatch.totalTickets - successCount;
      
      setUploadBatches(prev => prev.map(batch => 
        batch.id === newBatch.id 
          ? { ...batch, successCount, failedCount, status: 'completed' as const }
          : batch
      ));
    }, 3000);
  };

  const retryFailedTickets = (ticketIds: string[]) => {
    setHallTickets(prev => prev.map(ticket => 
      ticketIds.includes(ticket.id) 
        ? { ...ticket, status: 'pending' as const }
        : ticket
    ));
  };

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-secondary-900">Hall Ticket Management</h1>
          <p className="text-secondary-600 mt-1">Bulk upload and manage hall ticket distribution</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="btn-primary flex items-center"
          >
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
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
              <p className="text-sm text-secondary-600">Total Tickets</p>
              <p className="text-2xl font-bold text-secondary-900">{hallTickets.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Delivered</p>
              <p className="text-2xl font-bold text-secondary-900">
                {hallTickets.filter(t => t.status === 'delivered').length}
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
              <p className="text-sm text-secondary-600">Failed</p>
              <p className="text-2xl font-bold text-secondary-900">
                {hallTickets.filter(t => t.status === 'failed').length}
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
              <p className="text-sm text-secondary-600">Pending</p>
              <p className="text-2xl font-bold text-secondary-900">
                {hallTickets.filter(t => t.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Batches */}
      <div className="bg-white rounded-xl border border-secondary-200 p-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Recent Upload Batches</h2>
        <div className="space-y-4">
          {uploadBatches.map((batch) => (
            <div key={batch.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Upload className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary-900">{batch.fileName}</p>
                  <p className="text-sm text-secondary-600">
                    Uploaded on {batch.uploadedAt} • {batch.totalTickets} tickets
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary-900">
                    {batch.successCount} / {batch.totalTickets}
                  </p>
                  <p className="text-xs text-secondary-600">
                    {batch.failedCount} failed
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  batch.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                  batch.status === 'processing' ? 'bg-orange-100 text-orange-700' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  {batch.status}
                </div>
                {batch.failedCount > 0 && batch.status === 'completed' && (
                  <button 
                    onClick={() => retryFailedTickets([])}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Retry Failed
                  </button>
                )}
              </div>
            </div>
          ))}
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
                placeholder="Search tickets..."
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
              <option value="delivered">Delivered</option>
              <option value="generated">Generated</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>

            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2">
            <button className="btn-secondary flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Hall Tickets Table */}
      <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Exam Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Generated
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200">
              {filteredTickets.map((ticket) => {
                const StatusIcon = getStatusIcon(ticket.status);
                
                return (
                  <tr key={ticket.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-secondary-900">{ticket.studentName}</p>
                        <p className="text-sm text-secondary-600">{ticket.studentId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-secondary-900">{ticket.examName}</p>
                        <p className="text-sm text-secondary-600">{ticket.examDate}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-secondary-900">{ticket.department}</p>
                        <p className="text-sm text-secondary-600">Semester {ticket.semester}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="w-4 h-4" />
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-600">
                      {ticket.generatedAt}
                      {ticket.deliveredAt && (
                        <p className="text-xs text-emerald-600">Delivered: {ticket.deliveredAt}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedTicket(ticket)}
                          className="p-1 text-secondary-400 hover:text-primary-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {ticket.status === 'failed' && (
                          <button 
                            onClick={() => retryFailedTickets([ticket.id])}
                            className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded hover:bg-primary-200 transition-colors"
                          >
                            Retry
                          </button>
                        )}
                        
                        {ticket.status === 'delivered' && (
                          <button className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors">
                            Download
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-poppins font-bold text-secondary-900 mb-6">Bulk Upload Hall Tickets</h2>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-secondary-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
                <p className="text-secondary-600 mb-2">Drop your Excel file here or click to browse</p>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleBulkUpload(file);
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="btn-primary cursor-pointer">
                  Choose File
                </label>
              </div>
              
              <div className="text-sm text-secondary-600">
                <p className="font-medium mb-2">File Requirements:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Excel format (.xlsx or .xls)</li>
                  <li>Columns: Student ID, Name, Exam, Date</li>
                  <li>Maximum 1000 records per file</li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HallTicketManagement;