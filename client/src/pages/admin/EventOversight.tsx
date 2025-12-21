import React, { useState } from 'react';
import { 
  Calendar, Clock, Users, Plus, Edit, 
  Eye, CheckCircle, XCircle, Search,
  Bell, Star, Award, Music, Gamepad2
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  organizer: string;
  organizerType: 'club' | 'department' | 'admin';
  category: 'academic' | 'cultural' | 'sports' | 'technical' | 'social';
  date: string;
  time: string;
  duration: number;
  venue: string;
  capacity: number;
  registered: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  submittedAt: string;
  approvedBy?: string;
  approvedAt?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  recipients: 'all' | 'students' | 'faculty' | 'specific';
  recipientCount: number;
  scheduledFor: string;
  status: 'draft' | 'scheduled' | 'sent';
  eventId?: string;
}

const EventOversight: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Annual Tech Fest 2024',
      description: 'Three-day technical festival with competitions, workshops, and exhibitions',
      organizer: 'Tech Club',
      organizerType: 'club',
      category: 'technical',
      date: '2024-12-28',
      time: '09:00 AM',
      duration: 3 * 24 * 60, // 3 days in minutes
      venue: 'Main Auditorium & Campus Grounds',
      capacity: 2000,
      registered: 1247,
      status: 'approved',
      priority: 'high',
      submittedAt: '2024-12-10',
      approvedBy: 'Dr. Admin',
      approvedAt: '2024-12-12'
    },
    {
      id: '2',
      title: 'Cultural Night - Winter Celebration',
      description: 'Evening of music, dance, and cultural performances',
      organizer: 'Cultural Committee',
      organizerType: 'club',
      category: 'cultural',
      date: '2024-12-24',
      time: '06:00 PM',
      duration: 240,
      venue: 'Open Air Theatre',
      capacity: 500,
      registered: 342,
      status: 'pending',
      priority: 'medium',
      submittedAt: '2024-12-18'
    },
    {
      id: '3',
      title: 'Inter-Department Sports Meet',
      description: 'Annual sports competition between all departments',
      organizer: 'Sports Department',
      organizerType: 'department',
      category: 'sports',
      date: '2024-12-30',
      time: '08:00 AM',
      duration: 8 * 60,
      venue: 'Sports Complex',
      capacity: 1000,
      registered: 456,
      status: 'approved',
      priority: 'high',
      submittedAt: '2024-12-15',
      approvedBy: 'Dr. Admin',
      approvedAt: '2024-12-16'
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Tech Fest Registration Open',
      message: 'Registration for Annual Tech Fest 2024 is now open. Limited seats available!',
      recipients: 'all',
      recipientCount: 2543,
      scheduledFor: '2024-12-21 10:00 AM',
      status: 'sent',
      eventId: '1'
    },
    {
      id: '2',
      title: 'Cultural Night Reminder',
      message: 'Don\'t miss the Cultural Night tomorrow evening. Gates open at 5:30 PM.',
      recipients: 'students',
      recipientCount: 2100,
      scheduledFor: '2024-12-23 02:00 PM',
      status: 'scheduled',
      eventId: '2'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'events' | 'notifications'>('events');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const approveEvent = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            status: 'approved' as const, 
            approvedBy: 'Dr. Admin',
            approvedAt: new Date().toISOString().split('T')[0]
          }
        : event
    ));
  };

  const rejectEvent = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: 'rejected' as const } : event
    ));
  };

  const cancelEvent = (eventId: string) => {
    if (confirm('Are you sure you want to cancel this event?')) {
      setEvents(events.map(event => 
        event.id === eventId ? { ...event, status: 'cancelled' as const } : event
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'rejected': return 'bg-rose-100 text-rose-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-secondary-100 text-secondary-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'pending': return Clock;
      case 'rejected': return XCircle;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return Award;
      case 'cultural': return Music;
      case 'sports': return Gamepad2;
      case 'academic': return Users;
      case 'social': return Star;
      default: return Calendar;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-rose-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-emerald-500';
      default: return 'bg-secondary-500';
    }
  };

  const sendNotification = (notification: Omit<Notification, 'id' | 'status'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      status: 'scheduled'
    };
    setNotifications([newNotification, ...notifications]);
    setShowNotificationModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-secondary-900">Event & Calendar Oversight</h1>
          <p className="text-secondary-600 mt-1">Approve, manage, and oversee campus events</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowNotificationModal(true)}
            className="btn-secondary flex items-center"
          >
            <Bell className="w-4 h-4 mr-2" />
            Send Notification
          </button>
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-secondary-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'events'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-secondary-600 hover:text-secondary-900'
          }`}
        >
          Events
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'notifications'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-secondary-600 hover:text-secondary-900'
          }`}
        >
          Notifications
        </button>
      </div>

      {activeTab === 'events' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-secondary-200 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-600">Total Events</p>
                  <p className="text-2xl font-bold text-secondary-900">{events.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-secondary-200 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-600">Pending Approval</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {events.filter(e => e.status === 'pending').length}
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
                  <p className="text-sm text-secondary-600">Approved</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {events.filter(e => e.status === 'approved').length}
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
                  <p className="text-sm text-secondary-600">Total Registrations</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {events.reduce((sum, e) => sum + e.registered, 0)}
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
                    placeholder="Search events..."
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
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="technical">Technical</option>
                  <option value="cultural">Cultural</option>
                  <option value="sports">Sports</option>
                  <option value="academic">Academic</option>
                  <option value="social">Social</option>
                </select>
              </div>
            </div>
          </div>

          {/* Events Table */}
          <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                      Organizer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                      Venue & Capacity
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
                  {filteredEvents.map((event) => {
                    const StatusIcon = getStatusIcon(event.status);
                    const CategoryIcon = getCategoryIcon(event.category);
                    
                    return (
                      <tr key={event.id} className="hover:bg-secondary-50">
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-3">
                            <div className={`w-3 h-3 rounded-full mt-2 ${getPriorityColor(event.priority)}`} />
                            <div>
                              <div className="flex items-center space-x-2">
                                <CategoryIcon className="w-4 h-4 text-secondary-500" />
                                <p className="font-medium text-secondary-900">{event.title}</p>
                              </div>
                              <p className="text-sm text-secondary-600 mt-1 max-w-xs truncate">
                                {event.description}
                              </p>
                              <span className="inline-block px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs mt-1 capitalize">
                                {event.category}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-secondary-900">{event.organizer}</p>
                            <p className="text-sm text-secondary-600 capitalize">{event.organizerType}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-secondary-900">{event.date}</p>
                            <p className="text-sm text-secondary-600">{event.time}</p>
                            <p className="text-xs text-secondary-500">
                              {event.duration >= 1440 
                                ? `${Math.floor(event.duration / 1440)} days`
                                : `${Math.floor(event.duration / 60)}h ${event.duration % 60}m`
                              }
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-secondary-900">{event.venue}</p>
                            <p className="text-sm text-secondary-600">
                              {event.registered} / {event.capacity} registered
                            </p>
                            <div className="w-20 bg-secondary-200 rounded-full h-1 mt-1">
                              <div 
                                className="bg-primary-600 h-1 rounded-full"
                                style={{ width: `${Math.min((event.registered / event.capacity) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className="w-4 h-4" />
                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(event.status)}`}>
                              {event.status}
                            </span>
                          </div>
                          {event.approvedBy && (
                            <p className="text-xs text-secondary-500 mt-1">
                              By: {event.approvedBy}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              className="p-1 text-secondary-400 hover:text-primary-600 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            
                            {event.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => approveEvent(event.id)}
                                  className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                                >
                                  Approve
                                </button>
                                <button 
                                  onClick={() => rejectEvent(event.id)}
                                  className="px-2 py-1 text-xs bg-rose-100 text-rose-700 rounded hover:bg-rose-200 transition-colors"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            
                            {event.status === 'approved' && (
                              <button 
                                onClick={() => cancelEvent(event.id)}
                                className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                            
                            <button 
                              className="p-1 text-secondary-400 hover:text-primary-600 transition-colors"
                              title="Edit Event"
                            >
                              <Edit className="w-4 h-4" />
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
        </>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-secondary-900">Event Notifications</h2>
            <button 
              onClick={() => setShowNotificationModal(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Notification
            </button>
          </div>
          
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="border border-secondary-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-secondary-900">{notification.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        notification.status === 'sent' ? 'bg-emerald-100 text-emerald-700' :
                        notification.status === 'scheduled' ? 'bg-orange-100 text-orange-700' :
                        'bg-secondary-100 text-secondary-700'
                      }`}>
                        {notification.status}
                      </span>
                    </div>
                    <p className="text-secondary-600 text-sm mb-3">{notification.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-secondary-500">
                      <span>Recipients: {notification.recipients} ({notification.recipientCount})</span>
                      <span>Scheduled: {notification.scheduledFor}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-primary-600 hover:text-primary-700 text-sm">
                      Edit
                    </button>
                    <button className="text-rose-600 hover:text-rose-700 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-poppins font-bold text-secondary-900 mb-6">Send Notification</h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              sendNotification({
                title: formData.get('title') as string,
                message: formData.get('message') as string,
                recipients: formData.get('recipients') as 'all' | 'students' | 'faculty' | 'specific',
                recipientCount: 2543,
                scheduledFor: formData.get('scheduledFor') as string,
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Title</label>
                  <input
                    name="title"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="Notification title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="Notification message"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Recipients</label>
                  <select
                    name="recipients"
                    className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  >
                    <option value="all">All Users</option>
                    <option value="students">Students Only</option>
                    <option value="faculty">Faculty Only</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Schedule For</label>
                  <input
                    name="scheduledFor"
                    type="datetime-local"
                    required
                    className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowNotificationModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventOversight;