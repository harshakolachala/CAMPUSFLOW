import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  User, Mail, Phone, MapPin, Calendar, GraduationCap, 
  Users, FileText, Edit, Camera, Download
} from 'lucide-react';

const StudentProfile: React.FC = () => {
  const { user } = useAuth();

  const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-xl border border-secondary-200 p-6">
      <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
        {title}
      </h3>
      {children}
    </div>
  );

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-2 border-b border-secondary-100 last:border-b-0">
      <span className="text-secondary-600 text-sm">{label}</span>
      <span className="text-secondary-900 font-medium text-sm">{value || 'Not provided'}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">My Profile</h1>
          <p className="text-secondary-600 mt-1">Manage your personal information</p>
        </div>
        <button className="btn-primary flex items-center">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </button>
      </div>

      {/* Profile Header Card */}
      <div className="bg-gradient-primary rounded-xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-12 h-12" />
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Camera className="w-4 h-4 text-primary-600" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-primary-100 text-lg">Student ID: STU2024001</p>
            <p className="text-primary-200">Computer Science Engineering</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Semester 5</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Batch 2022-26</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
      </div>

      {/* Profile Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <InfoCard title="Personal Information">
          <div className="space-y-1">
            <InfoRow label="Full Name" value={user?.name || ''} />
            <InfoRow label="Date of Birth" value="15 March 2004" />
            <InfoRow label="Gender" value="Male" />
            <InfoRow label="Blood Group" value="O+" />
            <InfoRow label="Nationality" value="Indian" />
            <InfoRow label="Category" value="General" />
          </div>
        </InfoCard>

        {/* Contact Information */}
        <InfoCard title="Contact Information">
          <div className="space-y-1">
            <InfoRow label="Email" value={user?.email || ''} />
            <InfoRow label="Phone" value="+91 9876543210" />
            <InfoRow label="Alternate Phone" value="+91 9876543211" />
            <InfoRow label="Personal Email" value="john.doe@gmail.com" />
          </div>
        </InfoCard>

        {/* Address Information */}
        <InfoCard title="Address Information">
          <div className="space-y-1">
            <InfoRow label="Current Address" value="123 College Street, Mumbai" />
            <InfoRow label="Permanent Address" value="456 Home Street, Pune" />
            <InfoRow label="City" value="Mumbai" />
            <InfoRow label="State" value="Maharashtra" />
            <InfoRow label="Pincode" value="400001" />
          </div>
        </InfoCard>

        {/* Academic Information */}
        <InfoCard title="Academic Information">
          <div className="space-y-1">
            <InfoRow label="Course" value="B.Tech" />
            <InfoRow label="Branch" value="Computer Science" />
            <InfoRow label="Semester" value="5" />
            <InfoRow label="Section" value="A" />
            <InfoRow label="Batch" value="2022-2026" />
            <InfoRow label="Academic Year" value="2024-25" />
          </div>
        </InfoCard>

        {/* Guardian Information */}
        <InfoCard title="Guardian Information">
          <div className="space-y-1">
            <InfoRow label="Father's Name" value="Mr. John Doe Sr." />
            <InfoRow label="Father's Occupation" value="Business" />
            <InfoRow label="Mother's Name" value="Mrs. Jane Doe" />
            <InfoRow label="Mother's Occupation" value="Teacher" />
            <InfoRow label="Emergency Contact" value="Mr. John Doe Sr." />
            <InfoRow label="Emergency Phone" value="+91 9876543210" />
          </div>
        </InfoCard>

        {/* Education History */}
        <InfoCard title="Education History">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-secondary-900 mb-2">10th Standard</h4>
              <div className="space-y-1">
                <InfoRow label="Board" value="CBSE" />
                <InfoRow label="School" value="ABC High School" />
                <InfoRow label="Year" value="2020" />
                <InfoRow label="Percentage" value="92.5%" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-secondary-900 mb-2">12th Standard</h4>
              <div className="space-y-1">
                <InfoRow label="Board" value="CBSE" />
                <InfoRow label="School" value="XYZ Senior Secondary" />
                <InfoRow label="Year" value="2022" />
                <InfoRow label="Percentage" value="88.7%" />
              </div>
            </div>
          </div>
        </InfoCard>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title="Hostel Information">
          <div className="space-y-1">
            <InfoRow label="Hostel Resident" value="Yes" />
            <InfoRow label="Block" value="Block A" />
            <InfoRow label="Room Number" value="A-201" />
            <InfoRow label="Transport Mode" value="College Bus" />
          </div>
        </InfoCard>

        <InfoCard title="Documents">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-secondary-600" />
                <span className="text-sm font-medium text-secondary-900">10th Marksheet</span>
              </div>
              <button className="text-primary-600 hover:text-primary-700">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-secondary-600" />
                <span className="text-sm font-medium text-secondary-900">12th Marksheet</span>
              </div>
              <button className="text-primary-600 hover:text-primary-700">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-secondary-600" />
                <span className="text-sm font-medium text-secondary-900">Admission Letter</span>
              </div>
              <button className="text-primary-600 hover:text-primary-700">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default StudentProfile;