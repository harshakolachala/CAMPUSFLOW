import React, { useState } from 'react';
import { Users, Grid, Download, RefreshCw, Save } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const Seating: React.FC = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(4);
  const [room, setRoom] = useState('Room 101 (Main Block)');
  const [isGenerated, setIsGenerated] = useState(false);
  const [seatingPlan, setSeatingPlan] = useState<string[][]>([]);

  const generateSeating = () => {
    // Mock random allocation logic
    const students = Array.from({ length: rows * cols }, (_, i) => `21CS${String(i + 1).padStart(3, '0')}`);
    // Shuffle
    for (let i = students.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [students[i], students[j]] = [students[j], students[i]];
    }

    const newPlan: string[][] = [];
    for (let i = 0; i < rows; i++) {
      newPlan.push(students.slice(i * cols, (i + 1) * cols));
    }
    setSeatingPlan(newPlan);
    setIsGenerated(true);
  };

  const savePlan = async () => {
    try {
      await api.post('/seating', {
        room,
        plan: seatingPlan,
        rows,
        cols,
        userId: user?.id
      });
      alert('Seating plan saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save seating plan. Check server connection.');
    }
  };

  const exportCSV = () => {
    const headers = ['Seat', 'StudentId'];
    const rowsData: string[] = [];
    let seatNumber = 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const val = seatingPlan[r]?.[c] ?? '';
        rowsData.push(`${seatNumber},${val}`);
        seatNumber++;
      }
    }
    const csvContent = [headers.join(','), ...rowsData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Seating_${room.replace(/\\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Seating Allocation</h1>
          <p className="text-slate-500">Generate and manage exam seating arrangements.</p>
        </div>
        {isGenerated && (
          <div className="flex space-x-2">
            <button 
              onClick={savePlan}
              className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" /> Save Plan
            </button>
            <button 
              onClick={exportCSV}
              className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4 mr-2" /> Export Chart
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Room Number</label>
                <select 
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                >
                  <option>Room 101 (Main Block)</option>
                  <option>Room 203 (Science Block)</option>
                  <option>Exam Hall A</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rows</label>
                  <input 
                    type="number" 
                    value={rows} 
                    onChange={(e) => setRows(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" 
                    min="1" max="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cols</label>
                  <input 
                    type="number" 
                    value={cols} 
                    onChange={(e) => setCols(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" 
                    min="1" max="8"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Strategy</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                  <option>Randomized (Anti-Cheating)</option>
                  <option>Sequential</option>
                  <option>Department Wise</option>
                </select>
              </div>
              <button 
                onClick={generateSeating}
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" /> Generate Plan
              </button>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
             <div className="flex items-start">
               <Users className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
               <div>
                 <p className="text-sm font-bold text-blue-900">Capacity Info</p>
                 <p className="text-xs text-blue-700 mt-1">
                   Current configuration accommodates <span className="font-bold">{rows * cols}</span> students.
                 </p>
               </div>
             </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-3">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 min-h-[500px] flex flex-col items-center justify-center">
             {!isGenerated ? (
               <div className="text-center text-slate-400">
                 <Grid className="w-16 h-16 mx-auto mb-4 opacity-20" />
                 <p>Configure room settings and click generate to view seating plan.</p>
               </div>
             ) : (
               <div className="w-full">
                 <div className="mb-6 text-center">
                   <h3 className="text-lg font-bold text-slate-900">Teacher's Desk (Front)</h3>
                   <div className="w-64 h-8 bg-slate-200 mx-auto rounded-b-lg mb-8 shadow-inner"></div>
                 </div>
                 
                 <div className="grid gap-4 justify-center" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                   {seatingPlan.flat().map((studentId, idx) => (
                     <div key={idx} className="bg-white border-2 border-slate-200 rounded-lg p-3 text-center hover:border-blue-500 transition-colors cursor-pointer shadow-sm group">
                       <p className="text-xs text-slate-400 mb-1 group-hover:text-blue-400">Seat {idx + 1}</p>
                       <p className="font-mono font-bold text-slate-700 group-hover:text-blue-700">{studentId}</p>
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seating;
