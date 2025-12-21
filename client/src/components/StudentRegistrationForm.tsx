import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Lock, Phone, MapPin, Calendar, GraduationCap, 
  Users, FileText, Heart, Globe, ArrowRight, ArrowLeft, 
  Upload, Check, AlertCircle, BookOpen, Home, UserCheck
} from 'lucide-react';

interface StudentFormData {
  // Authentication
  email: string;
  password: string;
  confirmPassword: string;
  
  // Personal Information
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  category: string;
  
  // Contact Information
  phoneNumber: string;
  alternatePhone: string;
  personalEmail: string;
  permanentAddress: string;
  currentAddress: string;
  city: string;
  state: string;
  pincode: string;
  
  // Academic Information
  course: string;
  branch: string;
  semester: string;
  section: string;
  batch: string;
  academicYear: string;
  
  // Guardian Information
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  motherName: string;
  motherOccupation: string;
  motherPhone: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  guardianEmail: string;
  
  // Previous Education
  tenthBoard: string;
  tenthSchool: string;
  tenthYear: string;
  tenthPercentage: string;
  twelfthBoard: string;
  twelfthSchool: string;
  twelfthYear: string;
  twelfthPercentage: string;
  
  // Additional Information
  hostelResident: boolean;
  hostelBlock: string;
  roomNumber: string;
  transportMode: string;
  medicalConditions: string;
  emergencyContact: string;
  emergencyPhone: string;
}

const StudentRegistrationForm: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<StudentFormData>({
    email: '', password: '', confirmPassword: '',
    firstName: '', lastName: '', middleName: '', dateOfBirth: '', gender: '',
    bloodGroup: '', nationality: 'Indian', religion: '', category: 'General',
    phoneNumber: '', alternatePhone: '', personalEmail: '',
    permanentAddress: '', currentAddress: '', city: '', state: '', pincode: '',
    course: '', branch: '', semester: '1', section: '', batch: '', academicYear: '',
    fatherName: '', fatherOccupation: '', fatherPhone: '',
    motherName: '', motherOccupation: '', motherPhone: '',
    guardianName: '', guardianRelation: '', guardianPhone: '', guardianEmail: '',
    tenthBoard: '', tenthSchool: '', tenthYear: '', tenthPercentage: '',
    twelfthBoard: '', twelfthSchool: '', twelfthYear: '', twelfthPercentage: '',
    hostelResident: false, hostelBlock: '', roomNumber: '', transportMode: '',
    medicalConditions: '', emergencyContact: '', emergencyPhone: ''
  });

  const totalSteps = 6;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    setError('');
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Authentication
        return !!(formData.email && formData.password && formData.confirmPassword && 
                 formData.password === formData.confirmPassword);
      case 2: // Personal Info
        return !!(formData.firstName && formData.lastName && formData.dateOfBirth && 
                 formData.gender && formData.phoneNumber);
      case 3: // Contact Info
        return !!(formData.permanentAddress && formData.city && formData.state && formData.pincode);
      case 4: // Academic Info
        return !!(formData.course && formData.branch && formData.batch && formData.academicYear);
      case 5: // Guardian Info
        return !!(formData.fatherName && formData.motherName && formData.emergencyContact && formData.emergencyPhone);
      case 6: // Education History
        return !!(formData.tenthBoard && formData.tenthSchool && formData.tenthYear && formData.tenthPercentage);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      setError('Please fill in all required fields before proceeding.');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create the full name for registration
      const fullName = `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`;
      
      await register(fullName, formData.email, formData.password, 'student');
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-secondary-900">Account Setup</h2>
              <p className="text-secondary-600 mt-2">Create your secure login credentials</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field-icon"
                    placeholder="student@college.edu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field-icon"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field-icon"
                    placeholder="••••••••"
                  />
                </div>
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-rose-600 text-sm mt-1">Passwords do not match</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-secondary-900">Personal Information</h2>
              <p className="text-secondary-600 mt-2">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Date of Birth *</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="input-field-icon"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Gender *</label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="input-field-icon"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-secondary-900">Contact Information</h2>
              <p className="text-secondary-600 mt-2">Where can we reach you?</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Alternate Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleChange}
                    className="input-field-icon"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Personal Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />
                  <input
                    type="email"
                    name="personalEmail"
                    value={formData.personalEmail}
                    onChange={handleChange}
                    className="input-field-icon"
                    placeholder="personal@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Permanent Address *</label>
                <textarea
                  name="permanentAddress"
                  required
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  className="input-field resize-none h-24"
                  placeholder="Enter your permanent address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Current Address *</label>
                <textarea
                  name="currentAddress"
                  required
                  value={formData.currentAddress}
                  onChange={handleChange}
                  className="input-field resize-none h-24"
                  placeholder="Enter your current address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Maharashtra"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="400001"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-secondary-900">Academic Information</h2>
              <p className="text-secondary-600 mt-2">Your educational details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Course *</label>
                <select
                  name="course"
                  required
                  value={formData.course}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select Course</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.E">B.E</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="MBA">MBA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Branch *</label>
                <select
                  name="branch"
                  required
                  value={formData.branch}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select Branch</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Electrical">Electrical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Semester *</label>
                <select
                  name="semester"
                  required
                  value={formData.semester}
                  onChange={handleChange}
                  className="input-field"
                >
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={sem.toString()}>{sem}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Section</label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="A"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Batch *</label>
                <input
                  type="text"
                  name="batch"
                  required
                  value={formData.batch}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="2024-2028"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Academic Year *</label>
                <input
                  type="text"
                  name="academicYear"
                  required
                  value={formData.academicYear}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="2024-25"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-secondary-900">Guardian Information</h2>
              <p className="text-secondary-600 mt-2">Emergency contact details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Father's Name *</label>
                <input
                  type="text"
                  name="fatherName"
                  required
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Father's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Father's Occupation</label>
                <input
                  type="text"
                  name="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Business/Service"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Father's Phone</label>
                <input
                  type="tel"
                  name="fatherPhone"
                  value={formData.fatherPhone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Mother's Name *</label>
                <input
                  type="text"
                  name="motherName"
                  required
                  value={formData.motherName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Mother's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Mother's Occupation</label>
                <input
                  type="text"
                  name="motherOccupation"
                  value={formData.motherOccupation}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Housewife/Service"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Mother's Phone</label>
                <input
                  type="tel"
                  name="motherPhone"
                  value={formData.motherPhone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Emergency Contact *</label>
                <input
                  type="text"
                  name="emergencyContact"
                  required
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Emergency contact name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Emergency Phone *</label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  required
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-secondary-900">Education History</h2>
              <p className="text-secondary-600 mt-2">Previous academic records</p>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-secondary-50 rounded-xl">
                <h3 className="font-semibold text-secondary-900 mb-4">10th Standard Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Board *</label>
                    <input
                      type="text"
                      name="tenthBoard"
                      required
                      value={formData.tenthBoard}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="CBSE/ICSE/State Board"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">School Name *</label>
                    <input
                      type="text"
                      name="tenthSchool"
                      required
                      value={formData.tenthSchool}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="School name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Year of Passing *</label>
                    <input
                      type="number"
                      name="tenthYear"
                      required
                      value={formData.tenthYear}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="2022"
                      min="2000"
                      max="2030"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Percentage *</label>
                    <input
                      type="number"
                      name="tenthPercentage"
                      required
                      value={formData.tenthPercentage}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="85.5"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-secondary-50 rounded-xl">
                <h3 className="font-semibold text-secondary-900 mb-4">12th Standard Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Board</label>
                    <input
                      type="text"
                      name="twelfthBoard"
                      value={formData.twelfthBoard}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="CBSE/ICSE/State Board"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">School Name</label>
                    <input
                      type="text"
                      name="twelfthSchool"
                      value={formData.twelfthSchool}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="School name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Year of Passing</label>
                    <input
                      type="number"
                      name="twelfthYear"
                      value={formData.twelfthYear}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="2024"
                      min="2000"
                      max="2030"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Percentage</label>
                    <input
                      type="number"
                      name="twelfthPercentage"
                      value={formData.twelfthPercentage}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="88.5"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-secondary-50 rounded-xl">
                <h3 className="font-semibold text-secondary-900 mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="hostelResident"
                      checked={formData.hostelResident}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                    />
                    <label className="text-sm font-medium text-secondary-700">I will be staying in hostel</label>
                  </div>

                  {formData.hostelResident && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Hostel Block</label>
                        <input
                          type="text"
                          name="hostelBlock"
                          value={formData.hostelBlock}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="Block A"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">Room Number</label>
                        <input
                          type="text"
                          name="roomNumber"
                          value={formData.roomNumber}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="101"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Transport Mode</label>
                    <select
                      name="transportMode"
                      value={formData.transportMode}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select Transport</option>
                      <option value="Bus">College Bus</option>
                      <option value="Private">Private Vehicle</option>
                      <option value="Public">Public Transport</option>
                      <option value="Walking">Walking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Medical Conditions</label>
                    <textarea
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleChange}
                      className="input-field resize-none h-20"
                      placeholder="Any medical conditions or allergies (optional)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Step content for step {currentStep}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-purple/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-poppins font-bold text-gradient">Student Registration</h1>
            <span className="text-sm font-medium text-secondary-600">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="card-elevated p-8">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center text-rose-700 text-sm">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-secondary-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary flex items-center"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  Complete Registration
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;