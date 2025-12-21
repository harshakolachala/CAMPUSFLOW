import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Plus, CheckCircle, XCircle } from 'lucide-react';
import api from '@/lib/api';

interface Event {
  id: number;
  clubName: string;
  name: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  description: string;
}

const Clubs: React.FC = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  
  // Form State
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    description: '',
    clubName: 'General Club' // Default or select
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      // Keep existing events if any, or empty
    }
  };

  const handleStatusChange = async (id: number, newStatus: 'approved' | 'rejected') => {
    try {
      await api.patch(`/events/${id}/status`, { status: newStatus });
      // Optimistic update
      setEvents(events.map(e => e.id === id ? { ...e, status: newStatus } : e));
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update event status');
    }
  };

  const handleCreateEvent = async () => {
    if (!newEvent.name || !newEvent.date || !newEvent.description) {
      alert('Please fill all fields');
      return;
    }

    try {
      await api.post('/events', {
        ...newEvent,
        userId: user?.id
      });
      setShowModal(false);
      setNewEvent({ name: '', date: '', description: '', clubName: 'General Club' });
      fetchEvents();
    } catch (err) {
      console.error('Failed to create event:', err);
      alert('Failed to create event. Is the backend running?');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Club Events & Profiles</h1>
          <p className="text-slate-500">Manage club activities and event approvals.</p>
        </div>
        {(user?.role === 'club_coordinator' || user?.role === 'student') && (
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" /> Propose Event
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Event Proposals</h2>
          {events.length === 0 && (
            <p className="text-slate-500 italic">No events found. Start the server to see events.</p>
          )}
          {events.map(event => (
            <div key={event.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  event.status === 'approved' ? 'bg-green-100 text-green-600' :
                  event.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{event.name}</h3>
                  <p className="text-sm font-medium text-blue-600">{event.clubName}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {new Date(event.date).toLocaleDateString()} • {event.description}
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      event.status === 'approved' ? 'bg-green-100 text-green-800' :
                      event.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>

              {user?.role === 'admin' && event.status === 'pending' && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleStatusChange(event.id, 'approved')}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleStatusChange(event.id, 'rejected')}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Calendar / Info Widget */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <h3 className="font-bold text-slate-900 mb-4">Club Statistics</h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-sm text-slate-500">Total Clubs</span>
                 <span className="font-bold text-slate-900">12</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm text-slate-500">Active Events</span>
                 <span className="font-bold text-slate-900">{events.filter(e => e.status === 'approved').length}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm text-slate-500">Total Participants</span>
                 <span className="font-bold text-slate-900">450+</span>
               </div>
             </div>
           </div>

           <div className="bg-blue-600 p-6 rounded-xl shadow-lg text-white">
             <h3 className="font-bold text-lg mb-2">Join a Club!</h3>
             <p className="text-blue-100 text-sm mb-4">Explore your interests and meet new people.</p>
             <button className="w-full py-2 bg-white text-blue-600 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors">
               Browse Clubs
             </button>
           </div>
        </div>
      </div>
      
      {/* Propose Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Propose New Event</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Event Name" 
                className="w-full px-3 py-2 border rounded-lg"
                value={newEvent.name}
                onChange={e => setNewEvent({...newEvent, name: e.target.value})}
              />
              <input 
                type="date" 
                className="w-full px-3 py-2 border rounded-lg"
                value={newEvent.date}
                onChange={e => setNewEvent({...newEvent, date: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Club Name" 
                className="w-full px-3 py-2 border rounded-lg"
                value={newEvent.clubName}
                onChange={e => setNewEvent({...newEvent, clubName: e.target.value})}
              />
              <textarea 
                placeholder="Description" 
                className="w-full px-3 py-2 border rounded-lg" 
                rows={3}
                value={newEvent.description}
                onChange={e => setNewEvent({...newEvent, description: e.target.value})}
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button onClick={handleCreateEvent} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clubs;
