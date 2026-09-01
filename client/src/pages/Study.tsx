import React, { useState, useRef } from 'react';
import { 
  Share2, Download, Plus, Upload, FileText, Brain, 
  Link, Eye, Zap, CheckCircle, AlertCircle, Loader, Clock
} from 'lucide-react';
import api from '@/lib/api';

interface StudyResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'article' | 'quiz';
  url: string;
  description: string;
}

interface MindMapNode {
  id: string;
  title: string;
  x: number;
  y: number;
  children: string[];
  resources: StudyResource[];
  color: string;
  summary?: string;
  keywords?: string[];
}

interface Subject {
  id: number;
  name: string;
  code: string;
  syllabusUploaded?: boolean;
  mindMapGenerated?: boolean;
  uploadedFile?: File;
  extractedTopics?: string[];
  mindMapNodes?: MindMapNode[];
  processingStats?: {
    totalCharacters: number;
    totalTopics: number;
    processingTime: number;
  };
}

const Study: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'mindmap' | 'upload'>('syllabus');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [subjects, setSubjects] = useState<Subject[]>([
    { 
      id: 1, 
      name: 'Data Structures', 
      code: 'CS201',
      syllabusUploaded: true,
      mindMapGenerated: true,
      extractedTopics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting', 'Searching'],
      mindMapNodes: [
        {
          id: 'root',
          title: 'Data Structures',
          x: 400,
          y: 200,
          children: ['arrays', 'linkedlists', 'trees', 'graphs'],
          resources: [],
          color: 'bg-primary-600'
        },
        {
          id: 'arrays',
          title: 'Arrays',
          x: 200,
          y: 100,
          children: ['sorting'],
          resources: [
            { id: '1', title: 'Array Basics PDF', type: 'pdf', url: '#', description: 'Introduction to arrays' },
            { id: '2', title: 'Array Operations Video', type: 'video', url: '#', description: '30 min tutorial' }
          ],
          color: 'bg-accent-emerald'
        },
        {
          id: 'linkedlists',
          title: 'Linked Lists',
          x: 600,
          y: 100,
          children: [],
          resources: [
            { id: '3', title: 'Linked List Implementation', type: 'article', url: '#', description: 'Step by step guide' }
          ],
          color: 'bg-accent-purple'
        },
        {
          id: 'trees',
          title: 'Trees',
          x: 200,
          y: 300,
          children: ['searching'],
          resources: [
            { id: '4', title: 'Binary Trees Quiz', type: 'quiz', url: '#', description: 'Test your knowledge' }
          ],
          color: 'bg-accent-orange'
        },
        {
          id: 'graphs',
          title: 'Graphs',
          x: 600,
          y: 300,
          children: [],
          resources: [],
          color: 'bg-accent-rose'
        },
        {
          id: 'sorting',
          title: 'Sorting Algorithms',
          x: 100,
          y: 50,
          children: [],
          resources: [],
          color: 'bg-secondary-600'
        },
        {
          id: 'searching',
          title: 'Search Algorithms',
          x: 100,
          y: 350,
          children: [],
          resources: [],
          color: 'bg-secondary-600'
        }
      ]
    },
    { 
      id: 2, 
      name: 'Database Management', 
      code: 'CS202',
      syllabusUploaded: false,
      mindMapGenerated: false
    },
    { 
      id: 3, 
      name: 'Operating Systems', 
      code: 'CS203',
      syllabusUploaded: false,
      mindMapGenerated: false
    },
  ]);

  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);

  const addSubject = () => {
    const name = prompt('Enter subject name:');
    if (!name) return;
    const code = prompt('Enter subject code:') || `CS${Math.floor(Math.random() * 900) + 100}`;
    const newSub: Subject = { 
      id: Date.now(), 
      name, 
      code,
      syllabusUploaded: false,
      mindMapGenerated: false
    };
    const updated = [...subjects, newSub];
    setSubjects(updated);
    setSelectedSubject(newSub);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.');
      return;
    }

    setIsProcessing(true);
    setUploadProgress(0);

    // Simple text-based processing simulation
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        // Simulate processing steps
        const steps = [
          { progress: 20, message: 'Reading PDF file...' },
          { progress: 40, message: 'Extracting text content...' },
          { progress: 60, message: 'Analyzing structure...' },
          { progress: 80, message: 'Identifying topics...' },
          { progress: 100, message: 'Generating mind map...' }
        ];

        for (const step of steps) {
          setUploadProgress(step.progress);
          await new Promise(resolve => setTimeout(resolve, 800));
        }

        // Generate simple mind map based on filename and common academic topics
        const fileName = file.name.replace('.pdf', '');
        const commonTopics = [
          'Introduction', 'Fundamentals', 'Core Concepts', 'Advanced Topics',
          'Applications', 'Case Studies', 'Methodology', 'Analysis',
          'Implementation', 'Conclusion', 'References', 'Appendix'
        ];

        // Create topics based on subject name and common patterns
        const generatedTopics = [
          `Introduction to ${selectedSubject.name}`,
          `${selectedSubject.name} Fundamentals`,
          'Core Concepts',
          'Practical Applications',
          'Advanced Topics',
          'Case Studies'
        ];

        // Generate mind map nodes
        const mindMapNodes: MindMapNode[] = [
          {
            id: 'root',
            title: selectedSubject.name,
            x: 400,
            y: 300,
            children: ['intro', 'fundamentals', 'core', 'applications'],
            resources: [],
            color: 'bg-primary-600',
            summary: `Main subject covering ${selectedSubject.name}`,
            keywords: ['main', 'subject', 'course']
          },
          {
            id: 'intro',
            title: 'Introduction',
            x: 200,
            y: 150,
            children: [],
            resources: [
              { id: '1', title: 'Introduction PDF', type: 'pdf', url: '#', description: 'Basic concepts and overview' },
              { id: '2', title: 'Overview Video', type: 'video', url: '#', description: '15 min introduction' }
            ],
            color: 'bg-accent-emerald',
            summary: 'Basic introduction and overview of the subject',
            keywords: ['introduction', 'basics', 'overview']
          },
          {
            id: 'fundamentals',
            title: 'Fundamentals',
            x: 600,
            y: 150,
            children: [],
            resources: [
              { id: '3', title: 'Fundamentals Guide', type: 'article', url: '#', description: 'Core principles explained' }
            ],
            color: 'bg-accent-purple',
            summary: 'Fundamental principles and core concepts',
            keywords: ['fundamentals', 'principles', 'core']
          },
          {
            id: 'core',
            title: 'Core Concepts',
            x: 200,
            y: 450,
            children: [],
            resources: [
              { id: '4', title: 'Concepts Quiz', type: 'quiz', url: '#', description: 'Test your understanding' }
            ],
            color: 'bg-accent-orange',
            summary: 'Essential concepts and theories',
            keywords: ['concepts', 'theory', 'essential']
          },
          {
            id: 'applications',
            title: 'Applications',
            x: 600,
            y: 450,
            children: [],
            resources: [
              { id: '5', title: 'Practical Examples', type: 'article', url: '#', description: 'Real-world applications' }
            ],
            color: 'bg-accent-rose',
            summary: 'Practical applications and real-world examples',
            keywords: ['applications', 'practical', 'examples']
          }
        ];

        // Update the selected subject
        const updatedSubjects = subjects.map(sub => 
          sub.id === selectedSubject.id 
            ? { 
                ...sub, 
                syllabusUploaded: true,
                mindMapGenerated: true,
                uploadedFile: file,
                extractedTopics: generatedTopics,
                mindMapNodes: mindMapNodes,
                processingStats: {
                  totalCharacters: file.size,
                  totalTopics: generatedTopics.length,
                  processingTime: Date.now()
                }
              }
            : sub
        );
        
        setSubjects(updatedSubjects);
        setSelectedSubject(updatedSubjects.find(s => s.id === selectedSubject.id)!);
        setActiveTab('mindmap');
        
      } catch (error: any) {
        console.error('Processing error:', error);
        alert('Error processing file. Please try again.');
      } finally {
        setIsProcessing(false);
        setTimeout(() => setUploadProgress(0), 1000);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const processUploadedPDF = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf' || file.size > 10 * 1024 * 1024) {
      alert('Select a PDF file no larger than 10 MB.');
      event.target.value = '';
      return;
    }
    setIsProcessing(true);
    setUploadProgress(10);
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('subjectName', selectedSubject.name);
      const response = await api.post('/pdf/process', formData, {
        onUploadProgress: progress => {
          if (progress.total) setUploadProgress(Math.min(85, Math.round(progress.loaded * 85 / progress.total)));
        },
      });
      const result = response.data.data;
      const updatedSubjects = subjects.map(subject => subject.id === selectedSubject.id ? {
        ...subject,
        syllabusUploaded: true,
        mindMapGenerated: true,
        uploadedFile: file,
        extractedTopics: result.topics.map((topic: { title: string }) => topic.title),
        mindMapNodes: result.mindMapNodes as MindMapNode[],
        processingStats: result.statistics,
      } : subject);
      setUploadProgress(100);
      setSubjects(updatedSubjects);
      setSelectedSubject(updatedSubjects.find(subject => subject.id === selectedSubject.id)!);
      setActiveTab('mindmap');
    } catch (error: any) {
      alert(error.response?.data?.error || 'The PDF could not be processed.');
    } finally {
      setIsProcessing(false);
      setTimeout(() => setUploadProgress(0), 1000);
      event.target.value = '';
    }
  };

  const shareSubject = async () => {
    const text = `Subject: ${selectedSubject.name} (${selectedSubject.code}) - CAMPUSFLOW Study Support`;
    try {
      await navigator.clipboard.writeText(text);
      alert('Subject info copied to clipboard!');
    } catch {
      alert('Failed to copy to clipboard.');
    }
  };

  const downloadSyllabus = () => {
    const content = `Syllabus for ${selectedSubject.name} (${selectedSubject.code})\n\n- Unit 1: Introduction\n- Unit 2: Core Concepts\n- Unit 3: Advanced Topics\n\nGenerated by CAMPUSFLOW`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedSubject.code}_${selectedSubject.name}_Syllabus.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-secondary-900">Mind Map Helper</h1>
          <p className="text-secondary-600">Convert syllabus PDFs into interactive mind maps and study resources</p>
        </div>
        <div className="flex space-x-2">
           <button 
             className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'upload' ? 'bg-primary-600 text-white shadow-lg' : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'}`}
             onClick={() => setActiveTab('upload')}
           >
             <Upload className="w-4 h-4 mr-2 inline" />
             Upload PDF
           </button>
           <button 
             className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'syllabus' ? 'bg-primary-600 text-white shadow-lg' : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'}`}
             onClick={() => setActiveTab('syllabus')}
           >
             <FileText className="w-4 h-4 mr-2 inline" />
             Syllabus
           </button>
           <button 
             className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'mindmap' ? 'bg-primary-600 text-white shadow-lg' : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'}`}
             onClick={() => setActiveTab('mindmap')}
           >
             <Brain className="w-4 h-4 mr-2 inline" />
             Mind Map
           </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={processUploadedPDF}
        className="hidden"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Subject List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-secondary-200 shadow-soft">
            <h3 className="font-semibold text-secondary-900 mb-4">Your Subjects</h3>
            <div className="space-y-3">
              {subjects.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${selectedSubject.id === sub.id ? 'bg-primary-50 text-primary-700 border border-primary-200' : 'text-secondary-600 hover:bg-secondary-50 border border-transparent'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{sub.name}</div>
                      <div className="text-xs text-secondary-500 mt-1">{sub.code}</div>
                      <div className="flex items-center space-x-2 mt-2">
                        {sub.syllabusUploaded ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            PDF Uploaded
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-secondary-100 text-secondary-600">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            No PDF
                          </span>
                        )}
                        {sub.mindMapGenerated && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700">
                            <Brain className="w-3 h-3 mr-1" />
                            Mind Map
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={addSubject} className="w-full mt-4 flex items-center justify-center px-4 py-3 border-2 border-dashed border-secondary-300 rounded-xl text-sm text-secondary-500 hover:border-primary-500 hover:text-primary-500 transition-all">
              <Plus className="w-4 h-4 mr-2" /> Add Subject
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-secondary-200 shadow-soft min-h-[600px] p-8">
            <div className="flex justify-between items-start mb-8">
               <div>
                 <h2 className="text-2xl font-poppins font-bold text-secondary-900">{selectedSubject.name}</h2>
                 <p className="text-secondary-600 mt-1">Course Code: {selectedSubject.code}</p>
                 {selectedSubject.extractedTopics && (
                   <div className="flex items-center space-x-4 mt-2">
                     <p className="text-sm text-emerald-600">
                       <Zap className="w-4 h-4 inline mr-1" />
                       {selectedSubject.extractedTopics.length} topics extracted
                     </p>
                     {selectedSubject.processingStats && (
                       <p className="text-sm text-secondary-500">
                         {Math.round(selectedSubject.processingStats.totalCharacters / 1000)}k characters processed
                       </p>
                     )}
                   </div>
                 )}
               </div>
               <div className="flex space-x-2">
                 <button onClick={shareSubject} className="p-2 text-secondary-400 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50">
                   <Share2 className="w-5 h-5" />
                 </button>
                 <button onClick={downloadSyllabus} className="p-2 text-secondary-400 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50">
                   <Download className="w-5 h-5" />
                 </button>
               </div>
            </div>

            {activeTab === 'upload' && (
              <div className="space-y-6">
                {!selectedSubject.syllabusUploaded ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Upload className="w-12 h-12 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">Upload Syllabus PDF</h3>
                    <p className="text-secondary-600 mb-6 max-w-md mx-auto">
                      Upload your syllabus PDF and our AI will extract topics, create mind maps, and link relevant study resources automatically.
                    </p>
                    <button
                      onClick={triggerFileUpload}
                      disabled={isProcessing}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                          Processing PDF...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose PDF File
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">PDF Processed Successfully!</h3>
                    <p className="text-secondary-600 mb-6">
                      Your syllabus has been analyzed and mind map has been generated. 
                      Switch to the Mind Map tab to explore the interactive visualization.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => setActiveTab('mindmap')}
                        className="btn-primary"
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        View Mind Map
                      </button>
                      <button
                        onClick={triggerFileUpload}
                        className="btn-secondary"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New PDF
                      </button>
                    </div>
                  </div>
                )}

                {isProcessing && (
                  <div className="mt-8">
                    <div className="bg-secondary-50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <Loader className="w-5 h-5 text-primary-600 animate-spin mr-3" />
                        <span className="font-medium text-secondary-900">Processing your PDF...</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2 mb-4">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <div className="text-sm text-secondary-600 space-y-2">
                        <div className={`flex items-center ${uploadProgress >= 15 ? 'text-emerald-600' : ''}`}>
                          {uploadProgress >= 15 ? <CheckCircle className="w-4 h-4 mr-2" /> : <Clock className="w-4 h-4 mr-2" />}
                          Uploading and parsing PDF file
                        </div>
                        <div className={`flex items-center ${uploadProgress >= 30 ? 'text-emerald-600' : ''}`}>
                          {uploadProgress >= 30 ? <CheckCircle className="w-4 h-4 mr-2" /> : <Clock className="w-4 h-4 mr-2" />}
                          Extracting text content using OCR
                        </div>
                        <div className={`flex items-center ${uploadProgress >= 50 ? 'text-emerald-600' : ''}`}>
                          {uploadProgress >= 50 ? <CheckCircle className="w-4 h-4 mr-2" /> : <Clock className="w-4 h-4 mr-2" />}
                          Analyzing content with NLP algorithms
                        </div>
                        <div className={`flex items-center ${uploadProgress >= 70 ? 'text-emerald-600' : ''}`}>
                          {uploadProgress >= 70 ? <CheckCircle className="w-4 h-4 mr-2" /> : <Clock className="w-4 h-4 mr-2" />}
                          Identifying key topics and concepts
                        </div>
                        <div className={`flex items-center ${uploadProgress >= 85 ? 'text-emerald-600' : ''}`}>
                          {uploadProgress >= 85 ? <CheckCircle className="w-4 h-4 mr-2" /> : <Clock className="w-4 h-4 mr-2" />}
                          Generating interactive mind map
                        </div>
                        <div className={`flex items-center ${uploadProgress >= 100 ? 'text-emerald-600' : ''}`}>
                          {uploadProgress >= 100 ? <CheckCircle className="w-4 h-4 mr-2" /> : <Clock className="w-4 h-4 mr-2" />}
                          Linking relevant study resources
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'syllabus' && (
              <div className="space-y-6">
                {selectedSubject.extractedTopics ? (
                  <div className="space-y-6">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-3 flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        AI-Extracted Topics
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedSubject.extractedTopics.map((topic, index) => (
                          <div key={index} className="bg-white border border-emerald-200 rounded-lg p-3 text-sm font-medium text-emerald-800">
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <h3 className="text-lg font-semibold text-secondary-800">Unit 1: Introduction</h3>
                      <ul className="list-disc pl-5 text-secondary-600 space-y-1">
                        <li>Basic concepts and definitions</li>
                        <li>History and evolution</li>
                        <li>Core principles</li>
                      </ul>
                      <div className="mt-4 flex gap-2">
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                           <FileText className="w-3 h-3 mr-1" />
                           PDF Available
                         </span>
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                           <Eye className="w-3 h-3 mr-1" />
                           Video Link
                         </span>
                      </div>

                      <h3 className="text-lg font-semibold text-secondary-800 mt-6">Unit 2: Advanced Topics</h3>
                      <ul className="list-disc pl-5 text-secondary-600 space-y-1">
                        <li>Complex implementations</li>
                        <li>Real-world applications</li>
                        <li>Case studies</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">No Syllabus Available</h3>
                    <p className="text-secondary-600 mb-4">Upload a PDF to extract and view syllabus content</p>
                    <button
                      onClick={() => setActiveTab('upload')}
                      className="btn-primary"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload PDF
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'mindmap' && (
              <div className="space-y-6">
                {selectedSubject.mindMapNodes ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Mind Map Visualization */}
                    <div className="lg:col-span-2">
                      <div className="h-[500px] bg-secondary-50 rounded-xl border border-secondary-200 relative overflow-hidden">
                        <div className="absolute inset-0 p-8">
                          {selectedSubject.mindMapNodes.map((node) => (
                            <div
                              key={node.id}
                              className={`absolute cursor-pointer transition-all duration-200 hover:scale-105 ${node.color} text-white rounded-xl shadow-lg flex items-center justify-center text-sm font-medium px-4 py-2 min-w-[120px] text-center`}
                              style={{
                                left: `${(node.x / 800) * 100}%`,
                                top: `${(node.y / 400) * 100}%`,
                                transform: 'translate(-50%, -50%)'
                              }}
                              onClick={() => setSelectedNode(node)}
                            >
                              {node.title}
                            </div>
                          ))}
                          
                          {/* Connection Lines */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            {selectedSubject.mindMapNodes.map((node) =>
                              node.children.map((childId) => {
                                const child = selectedSubject.mindMapNodes?.find(n => n.id === childId);
                                if (!child) return null;
                                return (
                                  <line
                                    key={`${node.id}-${childId}`}
                                    x1={`${(node.x / 800) * 100}%`}
                                    y1={`${(node.y / 400) * 100}%`}
                                    x2={`${(child.x / 800) * 100}%`}
                                    y2={`${(child.y / 400) * 100}%`}
                                    stroke="#cbd5e1"
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                  />
                                );
                              })
                            )}
                          </svg>
                        </div>
                        <div className="absolute bottom-4 right-4 text-xs text-secondary-500 bg-white px-2 py-1 rounded">
                          Click nodes to view resources
                        </div>
                      </div>
                    </div>

                    {/* Node Details Panel */}
                    <div className="lg:col-span-1">
                      <div className="bg-white border border-secondary-200 rounded-xl p-6">
                        {selectedNode ? (
                          <div>
                            <h3 className="text-lg font-semibold text-secondary-900 mb-2">{selectedNode.title}</h3>
                            
                            {selectedNode.summary && (
                              <div className="mb-4 p-3 bg-secondary-50 rounded-lg">
                                <h4 className="text-sm font-medium text-secondary-700 mb-2">Summary:</h4>
                                <p className="text-sm text-secondary-600">{selectedNode.summary}</p>
                              </div>
                            )}

                            {selectedNode.keywords && selectedNode.keywords.length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-medium text-secondary-700 mb-2">Keywords:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {selectedNode.keywords.map((keyword, index) => (
                                    <span key={index} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                                      {keyword}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {selectedNode.resources.length > 0 ? (
                              <div className="space-y-3">
                                <h4 className="text-sm font-medium text-secondary-700">Study Resources:</h4>
                                {selectedNode.resources.map((resource) => (
                                  <div key={resource.id} className="border border-secondary-200 rounded-lg p-3 hover:bg-secondary-50 transition-colors">
                                    <div className="flex items-start space-x-3">
                                      <div className={`p-2 rounded-lg ${
                                        resource.type === 'pdf' ? 'bg-red-100 text-red-600' :
                                        resource.type === 'video' ? 'bg-blue-100 text-blue-600' :
                                        resource.type === 'article' ? 'bg-emerald-100 text-emerald-600' :
                                        'bg-purple-100 text-purple-600'
                                      }`}>
                                        {resource.type === 'pdf' ? <FileText className="w-4 h-4" /> :
                                         resource.type === 'video' ? <Eye className="w-4 h-4" /> :
                                         resource.type === 'article' ? <Link className="w-4 h-4" /> :
                                         <CheckCircle className="w-4 h-4" />}
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-medium text-secondary-900 text-sm">{resource.title}</h5>
                                        <p className="text-xs text-secondary-600 mt-1">{resource.description}</p>
                                        <button className="text-xs text-primary-600 hover:text-primary-700 mt-2">
                                          Open Resource →
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-secondary-600">No resources available for this topic yet.</p>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Brain className="w-12 h-12 text-secondary-300 mx-auto mb-3" />
                            <p className="text-sm text-secondary-600">Click on a node in the mind map to view related study resources</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">No Mind Map Available</h3>
                    <p className="text-secondary-600 mb-4">Upload a PDF to generate an interactive mind map</p>
                    <button
                      onClick={() => setActiveTab('upload')}
                      className="btn-primary"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload PDF
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
