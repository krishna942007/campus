import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Shield,
  FileText,
  Database,
  Cpu,
  Activity,
  Plus,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  Settings,
  LogOut,
  Bell,
  Lock,
  Eye,
  Key,
  Layers,
  Server,
  Link as LinkIcon,
  ShieldCheck,
  FolderTree,
  UserCheck,
  RotateCw,
  X,
  ChevronRight,
  ExternalLink,
  Download,
  Trash2,
  Edit,
  Sliders,
  Check,
  GraduationCap,
  Send,
  Filter,
  BarChart3,
  Globe,
  HardDrive,
  Calendar,
  Building,
  BookOpen,
  Award,
  Zap,
  HelpCircle,
  ToggleLeft,
  ToggleRight,
  Upload,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  UserPlus
} from 'lucide-react';

import { ToastNotification, ToastMessage } from './ToastNotification';
import { getMentoringStore, saveMentoringStore, MentorRequest } from '../services/mentoringStore';
import { ChatGPTAIWorkspace } from './ChatGPTAIWorkspace';
import { studentAdminApi } from '../services/api';

interface AdminPortalProps {
  onBackToLanding: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToLanding }) => {
  const [activeNav, setActiveNav] = useState<
    | 'Overview'
    | 'Users'
    | 'Students'
    | 'Faculty / Mentors'
    | 'Roles & Permissions'
    | 'Departments'
    | 'Programs'
    | 'Academic Structure'
    | 'Mentor Assignments'
    | 'AI Configuration'
    | 'Knowledge Base'
    | 'RAG Documents'
    | 'ERP / Data Sources'
    | 'Integration Health'
    | 'Audit Logs'
    | 'Security'
    | 'System Activity'
    | 'Settings'
  >('Overview');

  // Website Theme Toast Notifications State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type, duration: 2000 }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Modals and Drawers
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState<any | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);
  const [isSyncingERP, setIsSyncingERP] = useState(false);

  // RAG Documents List
  const [documents, setDocuments] = useState([
    { id: 1, name: 'VIT Academic Regulations 2026', category: 'Academic Policy', version: 'v2.1', size: '2.4 MB', vectors: 48, status: 'Indexed', date: 'Aug 01, 2026' },
    { id: 2, name: 'VIT Autonomous Exam Rules', category: 'Examination Policy', version: 'v1.4', size: '1.8 MB', vectors: 36, status: 'Indexed', date: 'Aug 05, 2026' },
    { id: 3, name: 'CSE Department Syllabus 2026', category: 'Curriculum', version: 'v3.0', size: '4.1 MB', vectors: 92, status: 'Indexed', date: 'Aug 09, 2026' },
    { id: 4, name: 'Faculty Mentoring Guidelines & Rubrics', category: 'Mentoring Standard', version: 'v1.2', size: '3.2 MB', vectors: 64, status: 'Indexed', date: 'Aug 10, 2026' },
    { id: 5, name: 'Honors & Minors Degree Ordinance', category: 'Academic Policy', version: 'v1.1', size: '1.5 MB', vectors: 28, status: 'Indexed', date: 'Aug 12, 2026' },
  ]);

  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Academic Policy');
  const [isUploading, setIsUploading] = useState(false);

  // Users Directory State
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  const [usersList, setUsersList] = useState([
    { id: 1, name: 'Aarav Sharma', role: 'Student', dept: 'Computer Engineering', status: 'Active', lastActive: 'Today', email: 'aarav.s@vit.edu.in' },
    { id: 2, name: 'Prof. S. Kulkarni', role: 'Faculty / Mentor', dept: 'AI & Data Science', status: 'Active', lastActive: 'Today', email: 's.kulkarni@vit.edu.in' },
    { id: 3, name: 'Dr. R. Mehta', role: 'Department Admin', dept: 'Computer Engineering', status: 'Active', lastActive: 'Yesterday', email: 'r.mehta@vit.edu.in' },
    { id: 4, name: 'Aarav Sharma', role: 'Student', dept: 'Computer Engineering', status: 'Attention', lastActive: '12 days ago', email: 'aarav.s@vit.edu.in' },
    { id: 5, name: 'Super Administrator', role: 'Institution Admin', dept: 'Central IT Governance', status: 'Active', lastActive: 'Now', email: 'admin@vit.edu.in' },
    { id: 6, name: 'Ananya Deshmukh', role: 'Student', dept: 'Information Technology', status: 'Active', lastActive: '3 hours ago', email: 'ananya.d@vit.edu.in' },
    { id: 7, name: 'Dr. Priya Nair', role: 'Faculty / Mentor', dept: 'Electronics & Telecom', status: 'Active', lastActive: 'Today', email: 'priya.nair@vit.edu.in' },
  ]);

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Student');
  const [newUserDept, setNewUserDept] = useState('Computer Engineering');

  // Real API Student Management State
  const [realStudents, setRealStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState<boolean>(false);
  const [studentSearch, setStudentSearch] = useState('');
  const [studentDeptFilter, setStudentDeptFilter] = useState('All');
  const [studentSemFilter, setStudentSemFilter] = useState('All');
  const [studentStatusFilter, setStudentStatusFilter] = useState('All');
  const [studentPagination, setStudentPagination] = useState({ totalCount: 0, currentPage: 1, totalPages: 1, limit: 50 });

  // Student Details Drawer/Modal
  const [selectedStudentDetails, setSelectedStudentDetails] = useState<any | null>(null);
  const [showStudentDetailsModal, setShowStudentDetailsModal] = useState<boolean>(false);

  // Add / Edit Student Modal State
  const [showStudentFormModal, setShowStudentFormModal] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [studentFormData, setStudentFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    department: 'Computer Engineering',
    semester: 1,
    division: 'Div A',
    cgpa: 0.0,
    attendancePercentage: 100.0,
    phone: '',
    assignedMentor: '',
    password: '',
  });

  // Bulk CSV Import Modal State
  const [showBulkImportModal, setShowBulkImportModal] = useState<boolean>(false);
  const [importStep, setImportStep] = useState<number>(1);
  const [rawCsvFileName, setRawCsvFileName] = useState<string>('');
  const [parsedCsvRows, setParsedCsvRows] = useState<any[]>([]);
  const [previewResult, setPreviewResult] = useState<any | null>(null);
  const [commitResult, setCommitResult] = useState<any | null>(null);
  const [isImporting, setIsImporting] = useState<boolean>(false);

  // Faculty Directory State
  const [facultyList, setFacultyList] = useState([
    { id: 'FAC-101', name: 'Prof. S. Kulkarni', dept: 'Computer Engineering', role: 'Associate Professor & Mentor Chair', mentees: 18, maxMentees: 20, rating: 4.9, email: 's.kulkarni@vit.edu.in' },
    { id: 'FAC-102', name: 'Dr. R. Mehta', dept: 'Computer Engineering', role: 'Head of Department', mentees: 12, maxMentees: 15, rating: 4.8, email: 'r.mehta@vit.edu.in' },
    { id: 'FAC-103', name: 'Dr. Priya Nair', dept: 'Electronics & Telecom', role: 'Professor & Dean R&D', mentees: 15, maxMentees: 20, rating: 4.95, email: 'priya.nair@vit.edu.in' },
    { id: 'FAC-104', name: 'Prof. Amit Verma', dept: 'AI & Data Science', role: 'Assistant Professor', mentees: 19, maxMentees: 20, rating: 4.7, email: 'amit.v@vit.edu.in' },
  ]);

  // Departments List
  const [departments, setDepartments] = useState([
    { id: 'DEPT-CSE', name: 'Computer Engineering', code: 'CSE', hod: 'Dr. R. Mehta', students: 720, faculty: 38, labs: 8, status: 'NBA Accredited' },
    { id: 'DEPT-AIDS', name: 'AI & Data Science', code: 'AIDS', hod: 'Dr. V. Raman', students: 480, faculty: 26, labs: 6, status: 'NBA Accredited' },
    { id: 'DEPT-IT', name: 'Information Technology', code: 'IT', hod: 'Dr. S. Patil', students: 480, faculty: 24, labs: 6, status: 'NBA Accredited' },
    { id: 'DEPT-EXTC', name: 'Electronics & Telecommunication', code: 'EXTC', hod: 'Dr. Priya Nair', students: 360, faculty: 22, labs: 5, status: 'NBA Accredited' },
    { id: 'DEPT-BME', name: 'Biomedical Engineering', code: 'BME', hod: 'Dr. M. Joshi', students: 240, faculty: 16, labs: 4, status: 'Autonomous Approved' },
  ]);
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptCode, setNewDeptCode] = useState('');
  const [newDeptHOD, setNewDeptHOD] = useState('');

  // Degree Programs List
  const [programs, setPrograms] = useState([
    { id: 'PRG-BTECH-CSE', name: 'B.Tech in Computer Engineering', level: 'Undergraduate', duration: '4 Years (8 Sems)', credits: 160, intake: 180, curriculum: '2024-RevC' },
    { id: 'PRG-BTECH-AIDS', name: 'B.Tech in AI & Data Science', level: 'Undergraduate', duration: '4 Years (8 Sems)', credits: 160, intake: 120, curriculum: '2024-RevC' },
    { id: 'PRG-HONORS-AI', name: 'Honors Degree in Applied Deep Learning', level: 'Honors Track', duration: '4 Semesters', credits: 20, intake: 60, curriculum: '2025-RevA' },
    { id: 'PRG-MTECH-CSE', name: 'M.Tech in Computer Engineering', level: 'Postgraduate', duration: '2 Years (4 Sems)', credits: 72, intake: 24, curriculum: '2023-RevB' },
  ]);

  // AI Configuration Settings State
  const [aiProvider, setAiProvider] = useState('Google Gemini 2.0 Pro / Flash');
  const [aiTemperature, setAiTemperature] = useState(0.3);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [enableRagRerank, setEnableRagRerank] = useState(true);
  const [enableSafetyGuardrail, setEnableSafetyGuardrail] = useState(true);

  // Audit Logs Data
  const [auditLogs, setAuditLogs] = useState([
    { id: 'LOG-8801', time: '14:32:10', actor: 'Super Administrator', action: 'Role Scope Updated (Mentoring Committee)', target: 'Permissions', ip: '192.168.1.10', status: 'Success' },
    { id: 'LOG-8802', time: '14:18:04', actor: 'Super Administrator', action: 'Uploaded RAG Doc: VIT Academic Regulations 2026', target: 'Vector Store', ip: '192.168.1.10', status: 'Success' },
    { id: 'LOG-8803', time: '13:52:45', actor: 'VIT ERP Sync Service', action: 'Full ERP Attendance & CGPA Ingestion', target: 'Academic Data', ip: '10.0.4.12', status: 'Success' },
    { id: 'LOG-8804', time: '12:30:19', actor: 'Dr. R. Mehta', action: 'Approved Faculty Mentor Batch Assignment', target: 'Mentoring Roster', ip: '192.168.1.44', status: 'Success' },
    { id: 'LOG-8805', time: '11:05:33', actor: 'Security Sentinel', action: 'Automated Vulnerability & Token Scan', target: 'System Core', ip: '127.0.0.1', status: 'Success' },
    { id: 'LOG-8806', time: '09:15:22', actor: 'Super Administrator', action: 'Rotated AI Provider API Key Secret', target: 'Secrets Vault', ip: '192.168.1.10', status: 'Success' },
  ]);

  // AI Assistant Chat Messages
  const [chatMessages, setChatMessages] = useState([
    { sender: 'AI', text: 'Hello Admin! I am the VIT Institutional AI Operations Assistant. How can I assist system monitoring today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  // Mentoring Store state hook
  const [mentoringStore, setMentoringStoreState] = useState(getMentoringStore());

  // Fetch live student records from MongoDB API
  const fetchStudentsList = async () => {
    setLoadingStudents(true);
    try {
      const params: any = {
        search: studentSearch,
        page: studentPagination.currentPage,
        limit: studentPagination.limit,
      };
      if (studentDeptFilter !== 'All') params.department = studentDeptFilter;
      if (studentSemFilter !== 'All') params.semester = studentSemFilter;
      if (studentStatusFilter !== 'All') params.status = studentStatusFilter;

      const res: any = await studentAdminApi.getStudents(params);
      if (res?.data) {
        setRealStudents(res.data.students || []);
        if (res.data.pagination) {
          setStudentPagination((prev) => ({
            ...prev,
            totalCount: res.data.pagination.totalCount,
            totalPages: res.data.pagination.totalPages,
          }));
        }
      }
    } catch (err: any) {
      console.warn('Backend API connection warning (using store sync):', err.message);
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    fetchStudentsList();
  }, [studentSearch, studentDeptFilter, studentSemFilter, studentStatusFilter, studentPagination.currentPage]);

  // Open Add Student Modal
  const handleOpenAddStudent = () => {
    setEditingStudent(null);
    setStudentFormData({
      name: '',
      email: '',
      rollNo: '',
      department: 'Computer Engineering',
      semester: 1,
      division: 'Div A',
      cgpa: 0.0,
      attendancePercentage: 100.0,
      phone: '',
      assignedMentor: '',
      password: '',
    });
    setShowStudentFormModal(true);
  };

  // Open Edit Student Modal
  const handleOpenEditStudent = (student: any) => {
    setEditingStudent(student);
    setStudentFormData({
      name: student.name || '',
      email: student.email || '',
      rollNo: student.rollNo || '',
      department: student.department || 'Computer Engineering',
      semester: student.semester || 1,
      division: student.division || 'Div A',
      cgpa: student.cgpa || 0.0,
      attendancePercentage: student.attendancePercentage || 100.0,
      phone: student.phone || '',
      assignedMentor: student.assignedMentor?._id || student.assignedMentor || '',
      password: '',
    });
    setShowStudentFormModal(true);
  };

  // Save Student (Add / Edit)
  const handleSaveStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await studentAdminApi.updateStudent(editingStudent._id, studentFormData);
        addToast('Student Record Updated', `${studentFormData.name}'s information updated successfully.`, 'success');
        setAuditLogs((prev) => [
          { id: `LOG-${Date.now().toString().slice(-4)}`, time: new Date().toLocaleTimeString(), actor: 'Super Administrator', action: `STUDENT_UPDATED: ${studentFormData.name} (${studentFormData.rollNo})`, target: 'Student Database', ip: '192.168.1.10', status: 'Success' },
          ...prev,
        ]);
      } else {
        await studentAdminApi.createStudent(studentFormData);
        addToast('Student Enrolled', `New student ${studentFormData.name} enrolled successfully.`, 'success');
        setAuditLogs((prev) => [
          { id: `LOG-${Date.now().toString().slice(-4)}`, time: new Date().toLocaleTimeString(), actor: 'Super Administrator', action: `STUDENT_CREATED: ${studentFormData.name} (${studentFormData.rollNo})`, target: 'Student Database', ip: '192.168.1.10', status: 'Success' },
          ...prev,
        ]);
      }
      setShowStudentFormModal(false);
      fetchStudentsList();
    } catch (err: any) {
      addToast('Operation Failed', err.message || 'Could not save student record', 'error');
    }
  };

  // Toggle Student Status (ACTIVE <-> INACTIVE)
  const handleToggleStudentStatus = async (student: any) => {
    const nextStatus = student.status === 'INACTIVE' ? 'ACTIVE' : 'INACTIVE';
    try {
      await studentAdminApi.updateStatus(student._id, nextStatus);
      addToast('Status Updated', `${student.name}'s status changed to ${nextStatus}.`, 'info');
      setAuditLogs((prev) => [
        { id: `LOG-${Date.now().toString().slice(-4)}`, time: new Date().toLocaleTimeString(), actor: 'Super Administrator', action: `STUDENT_STATUS_CHANGED: ${student.name} -> ${nextStatus}`, target: 'Student Database', ip: '192.168.1.10', status: 'Success' },
        ...prev,
      ]);
      fetchStudentsList();
    } catch (err: any) {
      addToast('Update Failed', err.message, 'error');
    }
  };

  // Delete / Safe Deactivate Student
  const handleDeleteStudent = async (student: any) => {
    if (!window.confirm(`Are you sure you want to delete or deactivate student ${student.name} (${student.rollNo})?`)) return;
    try {
      const res: any = await studentAdminApi.deleteStudent(student._id);
      const msg = res?.data?.deactivationOnly
        ? `Student ${student.name} has active records; account safely marked INACTIVE.`
        : `Student ${student.name} record permanently deleted.`;
      addToast('Record Processed', msg, 'info');
      setAuditLogs((prev) => [
        { id: `LOG-${Date.now().toString().slice(-4)}`, time: new Date().toLocaleTimeString(), actor: 'Super Administrator', action: `STUDENT_DELETED_OR_DEACTIVATED: ${student.name}`, target: 'Student Database', ip: '192.168.1.10', status: 'Success' },
        ...prev,
      ]);
      fetchStudentsList();
    } catch (err: any) {
      addToast('Delete Failed', err.message, 'error');
    }
  };

  // Native CSV Parser Utility
  const parseCSVText = (text: string) => {
    // Strip UTF-8 BOM if present
    const cleanText = text.replace(/^\uFEFF/, '');
    const lines = cleanText.split(/\r\n|\n/).filter((line) => line.trim() !== '');
    if (lines.length === 0) return { headers: [], rows: [] };

    const parseRow = (rowStr: string) => {
      const result: string[] = [];
      let insideQuote = false;
      let entry = '';
      for (let i = 0; i < rowStr.length; i++) {
        const char = rowStr[i];
        if (char === '"') {
          insideQuote = !insideQuote;
        } else if (char === ',' && !insideQuote) {
          result.push(entry.trim().replace(/^"|"$/g, '').trim());
          entry = '';
        } else {
          entry += char;
        }
      }
      result.push(entry.trim().replace(/^"|"$/g, '').trim());
      return result;
    };

    const rawHeaders = parseRow(lines[0]);
    const rows = lines.slice(1).map((line) => {
      const values = parseRow(line);
      const obj: Record<string, string> = {};
      rawHeaders.forEach((h, idx) => {
        obj[h] = values[idx] || '';
      });
      return obj;
    });

    return { headers: rawHeaders, rows };
  };

  // Handle CSV File Select
  const handleCSVFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRawCsvFileName(file.name);
    setIsImporting(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const { rows } = parseCSVText(text);

        if (rows.length === 0) {
          addToast('Empty File', 'The uploaded CSV file contains no valid data rows.', 'warning');
          setIsImporting(false);
          return;
        }

        setParsedCsvRows(rows);
        setImportStep(2);

        // Dry-run preview API call
        const previewRes: any = await studentAdminApi.previewImport(rows);
        if (previewRes?.data) {
          setPreviewResult(previewRes.data);
          setImportStep(3); // Move to interactive preview
        }
      } catch (err: any) {
        addToast('CSV Import Error', err.message || 'Failed to process CSV file. Ensure you are logged in as Admin.', 'error');
      } finally {
        setIsImporting(false);
      }
    };
    reader.readAsText(file);
  };

  // Confirm and Commit Bulk Import
  const handleConfirmCommitImport = async () => {
    if (!previewResult || !previewResult.rows || previewResult.rows.length === 0) return;
    setIsImporting(true);
    setImportStep(5);

    try {
      const commitRes: any = await studentAdminApi.commitImport(previewResult.rows);
      if (commitRes?.data) {
        setCommitResult(commitRes.data);
        setImportStep(6);
        addToast('Bulk Import Complete', `Created: ${commitRes.data.createdCount}, Updated: ${commitRes.data.updatedCount}, Failed: ${commitRes.data.failedCount}`, 'success');
        
        // Refresh live student roster
        fetchStudentsList();
        
        // Log Audit Event
        const newLog = {
          id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
          time: new Date().toLocaleTimeString(),
          actor: 'Super Administrator',
          action: `Bulk Imported Students (Created: ${commitRes.data.createdCount}, Updated: ${commitRes.data.updatedCount})`,
          target: 'Student Directory',
          ip: '192.168.1.10',
          status: 'Success',
        };
        setAuditLogs((prev) => [newLog, ...prev]);
      }
    } catch (err: any) {
      addToast('Commit Failed', err.message || 'Failed to commit student import data', 'error');
      setImportStep(3); // Return to preview step on failure
    } finally {
      setIsImporting(false);
    }
  };

  // Download Sample CSV Template
  const downloadSampleCSVTemplate = () => {
    const csvContent = 
      "Roll Number / PRN,Full Name,Email Address,Department,Semester,Division,CGPA,Attendance %,Phone Number,Mentor Email\n" +
      "2023CSE101,Aarav Verma,aarav.v@vit.edu.in,Computer Engineering,5,Div A,8.75,92.5,9876543210,s.kulkarni@vit.edu.in\n" +
      "2023AIDS102,Riya Sharma,riya.s@vit.edu.in,AI & Data Science,3,Div B,9.10,88.0,9876543211,p.sharma@vit.edu.in\n" +
      "2023IT103,Karan Patel,karan.p@vit.edu.in,Information Technology,5,Div A,7.60,74.5,9876543212,a.deshmukh@vit.edu.in";
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "VIT_Student_Import_Template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download Import Error Report
  const downloadImportErrorReport = () => {
    if (!commitResult || !commitResult.failures || commitResult.failures.length === 0) return;
    let csvContent = "Row Number,Student,Error Reason\n";
    commitResult.failures.forEach((f: any) => {
      csvContent += `${f.rowNumber},"${f.student}","${f.error}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Import_Failure_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    setMentoringStoreState(getMentoringStore());
  }, []);

  const filteredUsers = usersList.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                          u.email.toLowerCase().includes(userSearch.toLowerCase()) || 
                          u.dept.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'All' || u.role.toLowerCase().includes(userRoleFilter.toLowerCase());
    return matchesSearch && matchesRole;
  });

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;
    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      const newDoc = {
        id: Date.now(),
        name: newDocName,
        category: newDocCategory,
        version: 'v1.0',
        size: '2.9 MB',
        vectors: 52,
        status: 'Indexed',
        date: 'Just now',
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setNewDocName('');
      setShowUploadModal(false);
      addToast('Document Indexed', `"${newDoc.name}" vectorized into pgvector RAG database.`, 'success');
      
      // Log audit
      setAuditLogs(prev => [
        { id: `LOG-${Date.now().toString().slice(-4)}`, time: new Date().toLocaleTimeString(), actor: 'Super Administrator', action: `Uploaded RAG Doc: ${newDoc.name}`, target: 'Vector Store', ip: '192.168.1.10', status: 'Success' },
        ...prev
      ]);
    }, 1000);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser = {
      id: Date.now(),
      name: newUserName,
      role: newUserRole,
      dept: newUserDept,
      status: 'Active',
      lastActive: 'Just now',
      email: newUserEmail,
    };

    setUsersList(prev => [newUser, ...prev]);
    setNewUserName('');
    setNewUserEmail('');
    setShowAddUserModal(false);
    addToast('User Created', `Account created for ${newUser.name} with role ${newUser.role}.`, 'success');
  };

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName.trim() || !newDeptCode.trim()) return;

    const newDept = {
      id: `DEPT-${newDeptCode.toUpperCase()}`,
      name: newDeptName,
      code: newDeptCode.toUpperCase(),
      hod: newDeptHOD || 'Pending Appointment',
      students: 120,
      faculty: 8,
      labs: 3,
      status: 'Autonomous Approved',
    };

    setDepartments(prev => [...prev, newDept]);
    setNewDeptName('');
    setNewDeptCode('');
    setNewDeptHOD('');
    setShowAddDeptModal(false);
    addToast('Department Created', `Department of ${newDept.name} (${newDept.code}) initialized.`, 'success');
  };

  const handleTriggerERPSync = () => {
    setIsSyncingERP(true);
    addToast('ERP Sync Triggered', 'Starting bidirectional sync with VIT Mumbai Academic ERP...', 'info');

    setTimeout(() => {
      setIsSyncingERP(false);
      addToast('ERP Sync Complete', 'Successfully synchronized 4,120 student profiles & latest attendance.', 'success');
      setAuditLogs(prev => [
        { id: `LOG-${Date.now().toString().slice(-4)}`, time: new Date().toLocaleTimeString(), actor: 'Super Administrator', action: 'Manual Full ERP Synchronization Triggered', target: 'Academic Data Feed', ip: '192.168.1.10', status: 'Success' },
        ...prev
      ]);
    }, 1500);
  };

  const handleSendMessage = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || inputMessage;
    if (!query.trim()) return;

    setChatMessages((prev) => [...prev, { sender: 'USER', text: query }]);
    if (!customQuery) setInputMessage('');

    setTimeout(() => {
      let reply = 'I have queried the VIT Wadala system telemetry & audit trail. ';
      const lower = query.toLowerCase();
      if (lower.includes('health') || lower.includes('issue')) {
        reply += 'All 6 critical system services (Auth, Academic Sync, AI Provider, RAG, Database, Notifications) are operating at 99.98% uptime.';
      } else if (lower.includes('user') || lower.includes('count') || lower.includes('student')) {
        reply += `System has ${usersList.length * 700 + 460} total accounts across Computer Engineering, AI & Data Science, and IT.`;
      } else if (lower.includes('usage') || lower.includes('token') || lower.includes('limit')) {
        reply += 'Monthly AI provider API token consumption is currently at 72% of the configured institutional quota (3.6M / 5.0M tokens).';
      } else if (lower.includes('rag') || lower.includes('doc')) {
        reply += `There are ${documents.length} approved institutional policy documents vectorized with total 270 chunk embeddings.`;
      } else {
        reply += 'Audit trail shows all administrative actions logged with 100% compliance and zero security violations.';
      }
      setChatMessages((prev) => [...prev, { sender: 'AI', text: reply }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F7F2E9] text-[#102A43] font-sans antialiased flex flex-col">
      
      {/* 1. UNIFIED FULL-WIDTH TOP HEADER BAR (CLEAN 90° CORNER WITH SIDEBAR DIVIDER) */}
      <header className="bg-[#FFFDF8] border-b border-[#E2D7C6] sticky top-0 z-30 shadow-xs flex flex-col lg:flex-row">
        
        {/* Top Brand Header (Matches Sidebar Width & Border-R) */}
        <div className="w-full lg:w-64 h-[84px] px-6 lg:border-r border-[#E2D7C6] flex items-center space-x-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#123B63] text-white flex items-center justify-center font-bold text-xs shadow-sm border border-[#C49A52]/40">
            <span className="text-[#F5C056]">VIT</span>
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-[#102A43] tracking-tight">VIT Mumbai</h2>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#C49A52]">
              INSTITUTIONAL ADMIN
            </p>
          </div>
        </div>

        {/* Admin Identity + Action Controls */}
        <div className="flex-1 px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-[#123B63] text-white flex items-center justify-center font-bold text-sm shadow-sm border border-[#C49A52]/40 shrink-0">
              <span className="text-[#F5C056]">AD</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-extrabold text-[#102A43]">VIT Institutional Administration</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#E9DDC9] text-[#102A43] text-[10px] font-bold border border-[#E2D7C6] shrink-0">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-[#5A6E7F]">
                System configuration • Data governance • AI operations | VIT Wadala
              </p>
            </div>
          </div>

          {/* Right Action Controls (AI Assistant button removed from top header) */}
          <div className="flex items-center space-x-3 shrink-0 self-start sm:self-center">
            <button 
              onClick={() => setActiveNav('Audit Logs')}
              className="p-2.5 rounded-xl bg-[#F7F2E9] hover:bg-[#E9DDC9] text-[#102A43] border border-[#E2D7C6] relative cursor-pointer shadow-2xs transition-colors"
              title="View Audit Notifications"
            >
              <Bell className="w-4 h-4 text-[#123B63]" />
              <span className="w-2 h-2 rounded-full bg-[#B91C1C] absolute top-1.5 right-1.5" />
            </button>

            <button
              onClick={onBackToLanding}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F7F2E9] text-[#102A43] text-xs font-bold border border-[#E2D7C6] shadow-2xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#123B63]" />
              <span>Back to Portal Overview</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. BODY CONTENT (SIDEBAR + MAIN) */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        
        {/* ADMIN SIDEBAR NAVIGATION */}
        <aside className="w-full lg:w-64 bg-[#FFFDF8] border-b lg:border-b-0 lg:border-r border-[#E2D7C6] flex flex-col justify-between shrink-0">
          <div>
            {/* Grouped Navigation Links */}
            <nav className="p-4 space-y-4 text-xs font-semibold overflow-y-auto max-h-[calc(100vh-210px)]">
            
            {/* Group 1: Overview */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveNav('Overview')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeNav === 'Overview' ? 'bg-[#123B63] text-white shadow-sm font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <LayoutDashboard className={`w-4 h-4 ${activeNav === 'Overview' ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                  <span>Overview</span>
                </div>
              </button>
            </div>

            {/* Group 2: USER MANAGEMENT */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#5A6E7F]">USER MANAGEMENT</p>
              {[
                { name: 'Users', icon: Users },
                { name: 'Students', icon: GraduationCap },
                { name: 'Faculty / Mentors', icon: UserCheck },
                { name: 'Roles & Permissions', icon: ShieldCheck },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name as any)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                      isActive ? 'bg-[#123B63] text-white font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Group 3: ACADEMIC STRUCTURE */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#5A6E7F]">ACADEMIC STRUCTURE</p>
              {[
                { name: 'Departments', icon: FolderTree },
                { name: 'Programs', icon: Layers },
                { name: 'Academic Structure', icon: Building },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name as any)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                      isActive ? 'bg-[#123B63] text-white font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Group 4: MENTORING */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#5A6E7F]">MENTORING</p>
              <button
                onClick={() => setActiveNav('Mentor Assignments')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                  activeNav === 'Mentor Assignments' ? 'bg-[#123B63] text-white font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                }`}
              >
                <UserCheck className={`w-3.5 h-3.5 ${activeNav === 'Mentor Assignments' ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                <span>Mentor Assignments</span>
              </button>
            </div>

            {/* Group 5: AI & KNOWLEDGE */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#5A6E7F]">AI & KNOWLEDGE</p>
              {[
                { name: 'AI Configuration', icon: Cpu },
                { name: 'Knowledge Base', icon: Database },
                { name: 'RAG Documents', icon: FileText },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name as any)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                      isActive ? 'bg-[#123B63] text-white font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Group 6: INTEGRATIONS */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#5A6E7F]">INTEGRATIONS</p>
              {[
                { name: 'ERP / Data Sources', icon: LinkIcon },
                { name: 'Integration Health', icon: Server },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name as any)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                      isActive ? 'bg-[#123B63] text-white font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Group 7: SECURITY & GOVERNANCE */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#5A6E7F]">SECURITY & GOVERNANCE</p>
              {[
                { name: 'Audit Logs', icon: FileText },
                { name: 'Security', icon: ShieldCheck },
                { name: 'System Activity', icon: Activity },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name as any)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                      isActive ? 'bg-[#123B63] text-white font-bold' : 'text-[#102A43] hover:bg-[#E9DDC9]/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5C056]' : 'text-[#1D4E73]'}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

          </nav>
        </div>

        {/* Sidebar Footer Support & Exit */}
        <div className="p-4 border-t border-[#E2D7C6] space-y-2 text-xs">
          <button 
            onClick={() => setActiveNav('Settings')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-[#102A43] hover:bg-[#E9DDC9]/50 font-semibold ${
              activeNav === 'Settings' ? 'bg-[#E9DDC9] font-bold' : ''
            }`}
          >
            <Settings className="w-4 h-4 text-[#1D4E73]" />
            <span>Settings & Preferences</span>
          </button>

          <button
            onClick={onBackToLanding}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl bg-[#E9DDC9]/60 hover:bg-[#E2D7C6] text-[#102A43] font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#123B63]" />
            <span>Back to Portal Overview</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* MAIN BODY WRAPPER */}
        <main className="p-6 max-w-7xl mx-auto space-y-6 w-full flex-1">
          
          {/* ========================================================================= */}
          {/* VIEW 1: OVERVIEW */}
          {/* ========================================================================= */}
          {activeNav === 'Overview' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Institution Overview</h2>
                  <p className="text-xs text-[#5A6E7F]">Monitor users, academic data, mentoring operations and AI services.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleTriggerERPSync}
                    disabled={isSyncingERP}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#F5C056] ${isSyncingERP ? 'animate-spin' : ''}`} />
                    <span>{isSyncingERP ? 'Syncing ERP...' : 'Sync with VIT ERP'}</span>
                  </button>
                  <span className="px-3 py-1.5 rounded-xl bg-[#E9DDC9] text-xs font-bold text-[#102A43]">
                    CENTRAL PLATFORM CONTROL
                  </span>
                </div>
              </div>

              {/* 4 EXECUTIVE KPI STAT METRICS BENTO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Stat 1: Total Active Accounts */}
                <div 
                  onClick={() => setActiveNav('Users')} 
                  className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-6 border border-[#0C2238]/08 shadow-xs hover:shadow-md hover:border-[#C99632]/40 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] flex items-center justify-center text-[#4F46E5] shadow-2xs">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-extrabold tracking-wide">
                      VERIFIED ACCOUNTS
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#627083] block mb-1">
                      Total Active Accounts
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#10253A] font-display">
                        4,360
                      </span>
                      <span className="text-xs font-bold text-[#159A72]">Users</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#0C2238]/06 flex items-center justify-between text-[11px] text-[#627083]">
                    <span>Students + Faculty + Staff</span>
                    <span className="font-bold text-[#10253A]">100% Active</span>
                  </div>
                </div>

                {/* Stat 2: Enrolled Students */}
                <div 
                  onClick={() => setActiveNav('Students')} 
                  className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-6 border border-[#0C2238]/08 shadow-xs hover:shadow-md hover:border-[#C99632]/40 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center text-[#15803D] shadow-2xs">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-extrabold tracking-wide">
                      ENROLLED
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#627083] block mb-1">
                      Undergraduate Cohort
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#10253A] font-display">
                        4,120
                      </span>
                      <span className="text-xs font-bold text-[#159A72]">Active</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#0C2238]/06 flex items-center justify-between text-[11px] text-[#627083]">
                    <span>Across 5 Departments</span>
                    <span className="font-bold text-[#10253A]">Autonomous</span>
                  </div>
                </div>

                {/* Stat 3: Faculty Mentors */}
                <div 
                  onClick={() => setActiveNav('Faculty / Mentors')} 
                  className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-6 border border-[#0C2238]/08 shadow-xs hover:shadow-md hover:border-[#C99632]/40 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center text-[#D97706] shadow-2xs">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] text-[10px] font-extrabold tracking-wide">
                      FACULTY COUNCIL
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#627083] block mb-1">
                      Assigned Faculty Mentors
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#10253A] font-display">
                        214
                      </span>
                      <span className="text-xs font-bold text-[#0C2238]">Mentors</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#0C2238]/06 flex items-center justify-between text-[11px] text-[#627083]">
                    <span>1:20 Mentoring Ratio</span>
                    <span className="font-bold text-[#159A72]">Target Met</span>
                  </div>
                </div>

                {/* Stat 4: System Uptime */}
                <div 
                  onClick={() => setActiveNav('Integration Health')} 
                  className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-6 border border-[#0C2238]/08 shadow-xs hover:shadow-md hover:border-[#C99632]/40 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#E0E7FF] border border-[#C7D2FE] flex items-center justify-center text-[#4338CA] shadow-2xs">
                      <Server className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-extrabold tracking-wide">
                      HIGH AVAILABILITY
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#627083] block mb-1">
                      Core Infrastructure Uptime
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#15803D] font-display">
                        99.98%
                      </span>
                      <span className="text-xs font-bold text-[#15803D]">Optimal</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#0C2238]/06 flex items-center justify-between text-[11px] text-[#627083]">
                    <span>All 6 Microservices</span>
                    <span className="font-bold text-[#15803D]">Zero Outage</span>
                  </div>
                </div>

              </div>

              {/* SYSTEM HEALTH TELEMETRY */}
              <div className="bg-[#FFFCF7]/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-[#0C2238]/08 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#0C2238]/06 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EFE7D8] flex items-center justify-center text-[#0C2238]">
                      <Activity className="w-4.5 h-4.5 text-[#0C2238]" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-[#10253A] tracking-tight">Institutional System Telemetry</h3>
                      <p className="text-[11px] text-[#627083]">Live health status across autonomous infrastructure</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[10px] font-black text-[#15803D] uppercase tracking-wider">
                    ALL SYSTEMS HEALTHY
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs pt-1">
                  {[
                    { name: 'Authentication', status: 'Operational', ping: '12ms' },
                    { name: 'Academic ERP', status: 'Operational', ping: '45ms' },
                    { name: 'Gemini RAG API', status: 'Operational', ping: '88ms' },
                    { name: 'pgvector Store', status: 'Operational', ping: '18ms' },
                    { name: 'PostgreSQL DB', status: 'Operational', ping: '8ms' },
                    { name: 'Notifications', status: 'Operational', ping: '15ms' },
                  ].map((svc) => (
                    <div key={svc.name} className="p-3.5 rounded-2xl bg-[#F7F4EE] border border-[#0C2238]/08 space-y-1 hover:border-[#C99632]/40 transition-colors">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#159A72] animate-pulse" />
                        <p className="font-extrabold text-[#10253A] truncate">{svc.name}</p>
                      </div>
                      <p className="text-[11px] font-bold text-[#159A72]">{svc.status}</p>
                      <p className="text-[10px] text-[#627083]">Latency: {svc.ping}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2-COLUMN GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-6">
                  {/* USER ROSTER PREVIEW */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-[#102A43]">Recent User Accounts</h3>
                      <button onClick={() => setActiveNav('Users')} className="text-xs font-bold text-[#123B63] hover:underline">
                        View All {usersList.length} →
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#E2D7C6] text-[#5A6E7F]">
                            <th className="py-2.5 px-3 font-bold">NAME</th>
                            <th className="py-2.5 px-3 font-bold">ROLE</th>
                            <th className="py-2.5 px-3 font-bold">DEPARTMENT</th>
                            <th className="py-2.5 px-3 font-bold">STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2D7C6]">
                          {usersList.slice(0, 4).map((u) => (
                            <tr key={u.id} className="hover:bg-[#F7F2E9]/60">
                              <td className="py-2.5 px-3 font-bold text-[#102A43]">{u.name}</td>
                              <td className="py-2.5 px-3 font-semibold text-[#123B63]">{u.role}</td>
                              <td className="py-2.5 px-3 text-[#5A6E7F]">{u.dept}</td>
                              <td className="py-2.5 px-3">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#15803D]">
                                  {u.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* KNOWLEDGE BASE CARD */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-[#102A43]">RAG Knowledge Base</h3>
                        <p className="text-xs text-[#5A6E7F]">Approved Institutional Regulations & Policies</p>
                      </div>
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                      >
                        + Upload Document
                      </button>
                    </div>
                    <div className="space-y-2 text-xs">
                      {documents.slice(0, 3).map((doc) => (
                        <div key={doc.id} className="p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] flex items-center justify-between">
                          <div>
                            <p className="font-bold text-[#102A43]">{doc.name}</p>
                            <p className="text-[10px] text-[#5A6E7F]">{doc.category} • {doc.version} • {doc.vectors} chunks</p>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold">
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                  {/* AI CONFIG */}
                  <div className="bg-[#123B63] text-white rounded-2xl p-6 border border-[#C49A52]/40 shadow-md space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Cpu className="w-5 h-5 text-[#F5C056]" />
                        <h3 className="text-base font-extrabold text-white">AI Engine & Quota</h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#C49A52]/30 text-[9px] font-extrabold text-[#F5C056]">
                        ACTIVE
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Model Provider:</span>
                        <span className="font-bold text-[#F5C056]">{aiProvider}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Vector Store:</span>
                        <span className="font-bold text-white">pgvector (Cosine 1536d)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Monthly Usage:</span>
                        <span className="font-bold text-[#F5C056]">72% Used (3.6M tokens)</span>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F5C056]" style={{ width: '72%' }} />
                    </div>

                    <button 
                      onClick={() => addToast('API Secret Rotated', 'AI provider secret rotated and encrypted in institutional vault.', 'success')}
                      className="w-full py-2 rounded-xl bg-[#F5C056] text-[#102A43] font-bold text-xs hover:bg-[#E5B046]"
                    >
                      Rotate API Key Secret
                    </button>
                  </div>

                  {/* RECENT AUDIT LOGS */}
                  <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-[#102A43]">Audit Log Stream</h3>
                      <button onClick={() => setActiveNav('Audit Logs')} className="text-xs font-bold text-[#123B63] hover:underline">
                        All Logs →
                      </button>
                    </div>
                    <div className="space-y-2 text-xs">
                      {auditLogs.slice(0, 3).map((log) => (
                        <div key={log.id} className="p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] flex items-center justify-between">
                          <div>
                            <span className="font-mono font-bold text-[#123B63] mr-2">{log.time}</span>
                            <span className="font-bold text-[#102A43]">{log.action}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold">
                            {log.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 2: USERS DIRECTORY */}
          {/* ========================================================================= */}
          {activeNav === 'Users' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">User Directory & Accounts</h2>
                  <p className="text-xs text-[#5A6E7F]">Manage credentials, role assignments, and account statuses.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowAddUserModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#F5C056]" />
                    <span>Create User Account</span>
                  </button>
                </div>
              </div>

              {/* FILTERS & SEARCH */}
              <div className="bg-[#FFFDF8] rounded-2xl p-4 border border-[#E2D7C6] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-[#5A6E7F] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search by name, email, or department..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43] focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="font-bold text-[#5A6E7F]">Role Filter:</span>
                  {['All', 'Student', 'Faculty', 'Admin'].map((role) => (
                    <button
                      key={role}
                      onClick={() => setUserRoleFilter(role)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                        userRoleFilter === role ? 'bg-[#123B63] text-white' : 'bg-[#F7F2E9] text-[#102A43] hover:bg-[#E9DDC9]'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* USERS TABLE */}
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#E2D7C6] text-[#5A6E7F]">
                        <th className="py-3 px-3 font-bold">NAME & EMAIL</th>
                        <th className="py-3 px-3 font-bold">ROLE</th>
                        <th className="py-3 px-3 font-bold">DEPARTMENT</th>
                        <th className="py-3 px-3 font-bold">STATUS</th>
                        <th className="py-3 px-3 font-bold">LAST ACTIVE</th>
                        <th className="py-3 px-3 font-bold text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2D7C6]">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-[#F7F2E9]/60">
                          <td className="py-3 px-3">
                            <p className="font-bold text-[#102A43]">{u.name}</p>
                            <p className="text-[10px] text-[#5A6E7F]">{u.email}</p>
                          </td>
                          <td className="py-3 px-3 font-semibold text-[#123B63]">{u.role}</td>
                          <td className="py-3 px-3 text-[#5A6E7F]">{u.dept}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              u.status === 'Active' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEF3C7] text-[#D97706]'
                            }`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-[#5A6E7F]">{u.lastActive}</td>
                          <td className="py-3 px-3 text-right space-x-2">
                            <button
                              onClick={() => addToast('Password Reset Link Sent', `Sent password reset email to ${u.email}`, 'info')}
                              className="text-xs font-bold text-[#123B63] hover:underline"
                            >
                              Reset
                            </button>
                            <button
                              onClick={() => setShowDeactivateModal(u)}
                              className="text-xs font-bold text-[#B91C1C] hover:underline"
                            >
                              Deactivate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 3: STUDENTS DATA MANAGEMENT */}
          {/* ========================================================================= */}
          {activeNav === 'Students' && (
            <div className="space-y-6">
              {/* HEADER BAR */}
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43] flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#C49A52]" />
                    <span>Student Data Management</span>
                  </h2>
                  <p className="text-xs text-[#5A6E7F] mt-1">Official institutional student records, roll numbers, CGPA, statutory attendance, and mentor linkages.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button 
                    onClick={downloadSampleCSVTemplate}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs font-bold text-[#102A43] hover:bg-[#E9DDC9] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#123B63]" />
                    <span>Template</span>
                  </button>
                  <button
                    onClick={() => {
                      setImportStep(1);
                      setParsedCsvRows([]);
                      setPreviewResult(null);
                      setCommitResult(null);
                      setShowBulkImportModal(true);
                    }}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#F5C056]" />
                    <span>Import CSV</span>
                  </button>
                  <button
                    onClick={handleOpenAddStudent}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#C49A52] hover:bg-[#B38743] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-white" />
                    <span>Add Student</span>
                  </button>
                </div>
              </div>

              {/* SEARCH & FILTERS TOOLBAR */}
              <div className="bg-[#FFFDF8] rounded-2xl p-4 border border-[#E2D7C6] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-[#5A6E7F] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search student by name, PRN / roll number, email..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43] focus:outline-none focus:border-[#123B63]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {/* Department Filter */}
                  <select
                    value={studentDeptFilter}
                    onChange={(e) => setStudentDeptFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-[#102A43] font-bold focus:outline-none"
                  >
                    <option value="All">All Departments</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="AI & Data Science">AI & Data Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Telecommunication">Electronics & Telecom</option>
                  </select>

                  {/* Semester Filter */}
                  <select
                    value={studentSemFilter}
                    onChange={(e) => setStudentSemFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-[#102A43] font-bold focus:outline-none"
                  >
                    <option value="All">All Semesters</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>

                  {/* Status Filter */}
                  <select
                    value={studentStatusFilter}
                    onChange={(e) => setStudentStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-[#102A43] font-bold focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>

                  <button
                    onClick={fetchStudentsList}
                    className="p-2 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-[#102A43] hover:bg-[#E9DDC9]"
                    title="Refresh Data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingStudents ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* STUDENTS LIVE TABLE */}
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#E2D7C6] text-[#5A6E7F]">
                        <th className="py-3 px-3 font-bold">STUDENT & ROLL NO</th>
                        <th className="py-3 px-3 font-bold">DEPARTMENT & SEMESTER</th>
                        <th className="py-3 px-3 font-bold">CGPA</th>
                        <th className="py-3 px-3 font-bold">ATTENDANCE %</th>
                        <th className="py-3 px-3 font-bold">ASSIGNED MENTOR</th>
                        <th className="py-3 px-3 font-bold">STATUS</th>
                        <th className="py-3 px-3 font-bold text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2D7C6]">
                      {loadingStudents ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-[#5A6E7F]">
                            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#123B63] mb-2" />
                            <p className="font-bold text-xs">Fetching live student records from database...</p>
                          </td>
                        </tr>
                      ) : realStudents.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-[#5A6E7F]">
                            <GraduationCap className="w-8 h-8 mx-auto text-[#C49A52] mb-2 opacity-60" />
                            <p className="font-bold text-sm text-[#102A43]">No student records found</p>
                            <p className="text-xs mt-1">Try adjusting your filters or click "Import CSV" to add bulk students.</p>
                          </td>
                        </tr>
                      ) : (
                        realStudents.map((s) => (
                          <tr key={s._id} className="hover:bg-[#F7F2E9]/60 transition-colors">
                            <td className="py-3 px-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-7 h-7 rounded-full bg-[#123B63] text-white flex items-center justify-center font-bold text-[10px]">
                                  {s.name ? s.name.charAt(0) : 'S'}
                                </div>
                                <div>
                                  <p className="font-bold text-[#102A43]">{s.name}</p>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-[10px] text-[#5A6E7F] font-bold">{s.rollNo || s.email}</span>
                                    {s.division && (
                                      <span className="px-1.5 py-0.2 bg-[#F7F2E9] border border-[#E2D7C6] text-[9px] rounded font-bold text-[#102A43]">
                                        {s.division}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <p className="font-semibold text-[#102A43]">{s.department}</p>
                              <p className="text-[10px] text-[#5A6E7F]">Semester {s.semester}</p>
                            </td>
                            <td className="py-3 px-3 font-extrabold text-[#123B63]">
                              {s.cgpa !== undefined ? Number(s.cgpa).toFixed(2) : '0.00'} / 10.00
                            </td>
                            <td className="py-3 px-3">
                              <span className={`font-extrabold ${ (s.attendancePercentage || 100) >= 75 ? 'text-[#15803D]' : 'text-[#B91C1C]' }`}>
                                {(s.attendancePercentage || 100).toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-3 px-3 font-semibold text-[#C49A52]">
                              {s.assignedMentor?.name || s.assignedMentor || 'Unassigned'}
                            </td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                s.status === 'INACTIVE' ? 'bg-[#FEE2E2] text-[#B91C1C]' : 'bg-[#DCFCE7] text-[#15803D]'
                              }`}>
                                {s.status || 'ACTIVE'}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => {
                                    setSelectedStudentDetails(s);
                                    setShowStudentDetailsModal(true);
                                  }}
                                  className="p-1 rounded hover:bg-[#E9DDC9] text-[#123B63]"
                                  title="View Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleOpenEditStudent(s)}
                                  className="p-1 rounded hover:bg-[#E9DDC9] text-[#102A43]"
                                  title="Edit Record"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleToggleStudentStatus(s)}
                                  className="p-1 rounded hover:bg-[#E9DDC9] text-[#C49A52]"
                                  title="Toggle Status"
                                >
                                  <ToggleRight className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteStudent(s)}
                                  className="p-1 rounded hover:bg-[#FEE2E2] text-[#B91C1C]"
                                  title="Delete / Deactivate"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* PAGINATION FOOTER */}
                <div className="mt-4 flex items-center justify-between border-t border-[#E2D7C6] pt-3 text-xs text-[#5A6E7F]">
                  <span>Showing {realStudents.length} of {studentPagination.totalCount} student records</span>
                  <div className="flex items-center space-x-2">
                    <button
                      disabled={studentPagination.currentPage <= 1}
                      onClick={() => setStudentPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                      className="px-3 py-1.5 rounded-lg bg-[#F7F2E9] border border-[#E2D7C6] text-xs font-bold text-[#102A43] disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <span className="font-bold text-[#102A43]">
                      Page {studentPagination.currentPage} of {studentPagination.totalPages || 1}
                    </span>
                    <button
                      disabled={studentPagination.currentPage >= studentPagination.totalPages}
                      onClick={() => setStudentPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                      className="px-3 py-1.5 rounded-lg bg-[#F7F2E9] border border-[#E2D7C6] text-xs font-bold text-[#102A43] disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 4: FACULTY / MENTORS */}
          {/* ========================================================================= */}
          {activeNav === 'Faculty / Mentors' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Faculty & Mentoring Council</h2>
                  <p className="text-xs text-[#5A6E7F]">Institutional mentor allocation, faculty workload balance, and feedback audits.</p>
                </div>
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#F5C056]" />
                  <span>Add Faculty Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facultyList.map((f) => (
                  <div key={f.id} className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-extrabold text-[#102A43]">{f.name}</h3>
                          <span className="font-mono text-[10px] font-bold text-[#5A6E7F] bg-[#F7F2E9] px-2 py-0.5 rounded-md">
                            {f.id}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#123B63]">{f.role}</p>
                        <p className="text-xs text-[#5A6E7F]">{f.dept} • {f.email}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[10px] font-bold text-[#15803D]">
                        ★ {f.rating} Rating
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#E2D7C6]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#5A6E7F] font-semibold">Mentee Workload Capacity:</span>
                        <span className="font-extrabold text-[#102A43]">{f.mentees} / {f.maxMentees} Students</span>
                      </div>
                      <div className="w-full h-2 bg-[#F7F2E9] rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${f.mentees >= f.maxMentees ? 'bg-[#B91C1C]' : 'bg-[#15803D]'}`}
                          style={{ width: `${(f.mentees / f.maxMentees) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button 
                        onClick={() => {
                          setActiveNav('Mentor Assignments');
                          addToast('Assigning Mentees', `Configuring student roster for ${f.name}`, 'info');
                        }}
                        className="text-xs font-bold text-[#123B63] hover:underline"
                      >
                        Manage Assigned Mentees →
                      </button>
                      <button 
                        onClick={() => addToast('Workload Adjusted', `Adjusted capacity for ${f.name}`, 'success')}
                        className="px-3 py-1 rounded-xl bg-[#F7F2E9] text-[11px] font-bold text-[#102A43] hover:bg-[#E9DDC9]"
                      >
                        Adjust Cap
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 5: ROLES & PERMISSIONS */}
          {/* ========================================================================= */}
          {activeNav === 'Roles & Permissions' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Role-Based Access Control (RBAC)</h2>
                  <p className="text-xs text-[#5A6E7F]">Institutional authorization matrix and scope governance.</p>
                </div>
                <button 
                  onClick={() => addToast('Permissions Saved', 'Updated security scope matrix across all roles.', 'success')}
                  className="px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Policy Matrix
                </button>
              </div>

              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#E2D7C6] text-[#5A6E7F]">
                        <th className="py-3 px-3 font-bold">PERMISSION SCOPE</th>
                        <th className="py-3 px-3 font-bold text-center">STUDENT</th>
                        <th className="py-3 px-3 font-bold text-center">FACULTY MENTOR</th>
                        <th className="py-3 px-3 font-bold text-center">DEPARTMENT ADMIN</th>
                        <th className="py-3 px-3 font-bold text-center">INSTITUTION ADMIN</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2D7C6]">
                      {[
                        { name: 'View Own Academic Profile & Attendance', student: true, faculty: true, deptAdmin: true, instAdmin: true },
                        { name: 'Request Mentor Assignment & Meeting', student: true, faculty: false, deptAdmin: false, instAdmin: true },
                        { name: 'View Assigned Mentees Roster & Grades', student: false, faculty: true, deptAdmin: true, instAdmin: true },
                        { name: 'Assign Online Courses & Benchmarks', student: false, faculty: true, deptAdmin: true, instAdmin: true },
                        { name: 'Create Department Coursework & Syllabi', student: false, faculty: false, deptAdmin: true, instAdmin: true },
                        { name: 'Manage Department User Accounts', student: false, faculty: false, deptAdmin: true, instAdmin: true },
                        { name: 'Upload Approved RAG Institutional Documents', student: false, faculty: false, deptAdmin: false, instAdmin: true },
                        { name: 'Configure AI Provider Models & Quotas', student: false, faculty: false, deptAdmin: false, instAdmin: true },
                        { name: 'Full ERP Bidirectional Sync & Overwrite', student: false, faculty: false, deptAdmin: false, instAdmin: true },
                        { name: 'View Immutable Audit Logs & Security Vault', student: false, faculty: false, deptAdmin: false, instAdmin: true },
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#F7F2E9]/40">
                          <td className="py-3 px-3 font-bold text-[#102A43]">{row.name}</td>
                          <td className="py-3 px-3 text-center">{row.student ? <Check className="w-4 h-4 text-[#15803D] mx-auto" /> : <span className="text-[#5A6E7F]">—</span>}</td>
                          <td className="py-3 px-3 text-center">{row.faculty ? <Check className="w-4 h-4 text-[#15803D] mx-auto" /> : <span className="text-[#5A6E7F]">—</span>}</td>
                          <td className="py-3 px-3 text-center">{row.deptAdmin ? <Check className="w-4 h-4 text-[#15803D] mx-auto" /> : <span className="text-[#5A6E7F]">—</span>}</td>
                          <td className="py-3 px-3 text-center">{row.instAdmin ? <Check className="w-4 h-4 text-[#15803D] mx-auto" /> : <span className="text-[#5A6E7F]">—</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 6: DEPARTMENTS */}
          {/* ========================================================================= */}
          {activeNav === 'Departments' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Academic Departments</h2>
                  <p className="text-xs text-[#5A6E7F]">VIT Mumbai autonomous faculty divisions and laboratories.</p>
                </div>
                <button
                  onClick={() => setShowAddDeptModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#F5C056]" />
                  <span>Add Department</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((d) => (
                  <div key={d.id} className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-[#C49A52] bg-[#F7F2E9] px-2 py-0.5 rounded-md">
                          {d.code}
                        </span>
                        <h3 className="text-base font-extrabold text-[#102A43] mt-1">{d.name}</h3>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[10px] font-bold text-[#15803D]">
                        {d.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-[#5A6E7F]">
                      <p><strong className="text-[#102A43]">Head of Dept:</strong> {d.hod}</p>
                      <p><strong className="text-[#102A43]">Enrolled Students:</strong> {d.students}</p>
                      <p><strong className="text-[#102A43]">Faculty Members:</strong> {d.faculty}</p>
                      <p><strong className="text-[#102A43]">Research Labs:</strong> {d.labs} Active Centers</p>
                    </div>

                    <div className="pt-2 border-t border-[#E2D7C6] flex justify-end space-x-2">
                      <button 
                        onClick={() => addToast('Department Settings', `Opening config for ${d.name}`, 'info')}
                        className="px-3 py-1 rounded-xl bg-[#F7F2E9] text-xs font-bold text-[#102A43] hover:bg-[#E9DDC9]"
                      >
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 7: PROGRAMS */}
          {/* ========================================================================= */}
          {activeNav === 'Programs' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Degrees & Degree Programs</h2>
                  <p className="text-xs text-[#5A6E7F]">Autonomous curriculum structures, credit requirements, and intake caps.</p>
                </div>
                <button
                  onClick={() => addToast('Program Created', 'New curriculum program framework initialized.', 'success')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#F5C056]" />
                  <span>Create Program</span>
                </button>
              </div>

              <div className="space-y-3">
                {programs.map((p) => (
                  <div key={p.id} className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-extrabold text-[#102A43]">{p.name}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#E9DDC9] text-[10px] font-bold text-[#102A43]">
                          {p.level}
                        </span>
                      </div>
                      <p className="text-xs text-[#5A6E7F]">
                        Duration: {p.duration} • Total Credits: {p.credits} • Intake Capacity: {p.intake} Students • Syllabus: {p.curriculum}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => addToast('Curriculum Handbook', `Opening syllabus for ${p.name}`, 'info')}
                        className="px-3 py-1.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs font-bold text-[#102A43] hover:bg-[#E9DDC9]"
                      >
                        View Syllabus
                      </button>
                      <button 
                        onClick={() => addToast('Intake Capacity Updated', `Updated intake rules for ${p.name}`, 'success')}
                        className="px-3 py-1.5 rounded-xl bg-[#123B63] text-xs font-bold text-white hover:bg-[#1D4E73]"
                      >
                        Edit Intake
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 8: ACADEMIC STRUCTURE */}
          {/* ========================================================================= */}
          {activeNav === 'Academic Structure' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs">
                <h2 className="text-xl font-extrabold text-[#102A43]">Institutional Academic Structure</h2>
                <p className="text-xs text-[#5A6E7F]">Hierarchical architecture of VIT Mumbai autonomous governance.</p>
              </div>

              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-6">
                <div className="p-4 rounded-xl bg-[#123B63] text-white flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Building className="w-6 h-6 text-[#F5C056]" />
                    <div>
                      <h3 className="font-extrabold text-sm">Vidyalankar Institute of Technology (Autonomous)</h3>
                      <p className="text-xs text-slate-300">Board of Governance • Academic Council • Controller of Examinations</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#C49A52]/30 text-xs font-bold text-[#F5C056]">
                    TOP LEVEL
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-[#123B63]/30">
                  <div className="p-4 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-2">
                    <h4 className="font-extrabold text-sm text-[#102A43]">Faculty of Engineering & Technology</h4>
                    <ul className="text-xs text-[#5A6E7F] space-y-1">
                      <li>• Department of Computer Engineering</li>
                      <li>• Department of AI & Data Science</li>
                      <li>• Department of Information Technology</li>
                      <li>• Department of Electronics & Telecom</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] space-y-2">
                    <h4 className="font-extrabold text-sm text-[#102A43]">Mentoring & Student Development Council</h4>
                    <ul className="text-xs text-[#5A6E7F] space-y-1">
                      <li>• 214 Assigned Faculty Mentors</li>
                      <li>• Continuous Progress Monitoring Committee</li>
                      <li>• Career & Capstone Advisory Cell</li>
                      <li>• Student Mental Health & Growth Support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 9: MENTOR ASSIGNMENTS */}
          {/* ========================================================================= */}
          {activeNav === 'Mentor Assignments' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Mentor Allocation & Balancing Engine</h2>
                  <p className="text-xs text-[#5A6E7F]">Auto-balance student cohorts with faculty mentors based on research interest and department capacity.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => {
                      addToast('AI Balancing Executed', 'Optimized mentor allocation across 4,120 students with zero unassigned.', 'success');
                    }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#F5C056]" />
                    <span>Run AI Auto-Balancing</span>
                  </button>
                </div>
              </div>

              {/* MENTOR ALLOCATION STATUS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-1">
                  <span className="text-xs font-bold text-[#5A6E7F]">Assigned Students</span>
                  <p className="text-2xl font-extrabold text-[#102A43]">4,118 / 4,120</p>
                  <p className="text-[11px] text-[#15803D] font-bold">99.9% Paired with Faculty</p>
                </div>

                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-1">
                  <span className="text-xs font-bold text-[#5A6E7F]">Unassigned Queue</span>
                  <p className="text-2xl font-extrabold text-[#D97706]">2 Students</p>
                  <p className="text-[11px] text-[#D97706] font-bold">Awaiting Mentor Pairing</p>
                </div>

                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-1">
                  <span className="text-xs font-bold text-[#5A6E7F]">Average Mentee Ratio</span>
                  <p className="text-2xl font-extrabold text-[#123B63]">19.2 Students</p>
                  <p className="text-[11px] text-[#5A6E7F]">Target Cap: 20 per Mentor</p>
                </div>
              </div>

              {/* PENDING MENTOR REQUESTS */}
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-[#102A43]">Live Mentorship Requests</h3>
                <div className="space-y-2 text-xs">
                  {mentoringStore.mentorRequests.map((req: MentorRequest) => (
                    <div key={req.id} className="p-4 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-sm text-[#102A43]">{req.studentName}</span>
                          <span className="font-mono text-[10px] text-[#5A6E7F]">({req.studentId})</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#E9DDC9] text-[10px] font-bold text-[#102A43]">{req.branch}</span>
                        </div>
                        <p className="text-[#5A6E7F] mt-1">Goal: {req.goal} • CGPA: {req.cgpa.toFixed(2)} • Match Score: <strong className="text-[#15803D]">{req.matchScore}%</strong></p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          req.status === 'ACCEPTED' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEF3C7] text-[#D97706]'
                        }`}>
                          {req.status}
                        </span>
                        <button 
                          onClick={() => addToast('Mentor Pair Confirmed', `Assigned mentor for ${req.studentName}`, 'success')}
                          className="px-3 py-1 rounded-xl bg-[#123B63] text-white text-xs font-bold hover:bg-[#1D4E73]"
                        >
                          Confirm Assignment
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 10: AI CONFIGURATION */}
          {/* ========================================================================= */}
          {activeNav === 'AI Configuration' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">AI Engine & Model Governance</h2>
                  <p className="text-xs text-[#5A6E7F]">Configure institutional LLM providers, temperature parameters, and embedding stores.</p>
                </div>
                <button 
                  onClick={() => addToast('AI Settings Saved', 'Model configuration and parameters updated successfully.', 'success')}
                  className="px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Configuration
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                  <h3 className="text-base font-extrabold text-[#102A43]">LLM Model Provider</h3>
                  
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-[#102A43]">Primary Reasoning Engine:</label>
                      <select 
                        value={aiProvider}
                        onChange={(e) => setAiProvider(e.target.value)}
                        className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs font-bold text-[#102A43]"
                      >
                        <option>Google Gemini 2.0 Pro / Flash</option>
                        <option>Google Gemini 1.5 Pro</option>
                        <option>Anthropic Claude 3.5 Sonnet</option>
                        <option>OpenAI GPT-4o</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-[#102A43]">
                        <span>Sampling Temperature: {aiTemperature}</span>
                        <span className="text-[#5A6E7F]">Deterministic (0.0) → Creative (1.0)</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.05"
                        value={aiTemperature}
                        onChange={(e) => setAiTemperature(parseFloat(e.target.value))}
                        className="w-full mt-2" 
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#102A43]">Max Output Token Cap:</label>
                      <input 
                        type="number" 
                        value={maxTokens}
                        onChange={(e) => setMaxTokens(parseInt(e.target.value) || 2048)}
                        className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                  <h3 className="text-base font-extrabold text-[#102A43]">Guardrails & Vector Settings</h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6]">
                      <div>
                        <p className="font-bold text-[#102A43]">Enable RAG Cross-Encoder Reranking</p>
                        <p className="text-[10px] text-[#5A6E7F]">Improves precision of institutional ordinance answers</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={enableRagRerank} 
                        onChange={(e) => setEnableRagRerank(e.target.checked)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6]">
                      <div>
                        <p className="font-bold text-[#102A43]">Institutional Safety & Hallucination Filter</p>
                        <p className="text-[10px] text-[#5A6E7F]">Blocks non-grounded academic policy assertions</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={enableSafetyGuardrail} 
                        onChange={(e) => setEnableSafetyGuardrail(e.target.checked)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-[#123B63] text-white space-y-1">
                      <p className="font-bold">Embedding Model</p>
                      <p className="text-[11px] text-[#F5C056]">text-embedding-004 (1536 dimensions)</p>
                      <p className="text-[10px] text-slate-300">Indexed in PostgreSQL with pgvector cosine indexing</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LIVE CHATGPT-STYLE ADMIN OPERATIONS COPILOT WORKSPACE */}
              <div className="pt-2">
                <ChatGPTAIWorkspace 
                  userName={authUser?.name || "Super Admin"} 
                  userRole="ADMIN" 
                  userId={authUser?._id}
                  userEmail={authUser?.email || "admin@vit.edu.in"}
                  onToast={addToast} 
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 11: KNOWLEDGE BASE */}
          {/* ========================================================================= */}
          {activeNav === 'Knowledge Base' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Vector Knowledge Base Status</h2>
                  <p className="text-xs text-[#5A6E7F]">Institutional pgvector index statistics & document corpus.</p>
                </div>
                <button 
                  onClick={() => addToast('Vector Index Rebuilt', 'Re-embedded all 5 institutional documents with 0 errors.', 'success')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#F5C056]" />
                  <span>Re-index Vector Store</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-1">
                  <span className="text-xs font-bold text-[#5A6E7F]">Total Chunks</span>
                  <p className="text-2xl font-extrabold text-[#102A43]">270 Chunks</p>
                  <p className="text-[10px] text-[#15803D]">1536-Dimensional Vectors</p>
                </div>
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-1">
                  <span className="text-xs font-bold text-[#5A6E7F]">Index Size</span>
                  <p className="text-2xl font-extrabold text-[#123B63]">13.0 MB</p>
                  <p className="text-[10px] text-[#5A6E7F]">pgvector memory cached</p>
                </div>
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-1">
                  <span className="text-xs font-bold text-[#5A6E7F]">Avg Vector Search Ping</span>
                  <p className="text-2xl font-extrabold text-[#15803D]">18ms</p>
                  <p className="text-[10px] text-[#15803D]">HNSW cosine search</p>
                </div>
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-1">
                  <span className="text-xs font-bold text-[#5A6E7F]">Active Documents</span>
                  <p className="text-2xl font-extrabold text-[#C49A52]">{documents.length} Docs</p>
                  <p className="text-[10px] text-[#5A6E7F]">100% Indexed & Verified</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 12: RAG DOCUMENTS */}
          {/* ========================================================================= */}
          {activeNav === 'RAG Documents' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Approved RAG Documents</h2>
                  <p className="text-xs text-[#5A6E7F]">Official institutional regulations, curriculum handbooks, and policy guidelines.</p>
                </div>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#F5C056]" />
                  <span>Upload Approved Document</span>
                </button>
              </div>

              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#E2D7C6] text-[#5A6E7F]">
                        <th className="py-3 px-3 font-bold">DOCUMENT NAME</th>
                        <th className="py-3 px-3 font-bold">CATEGORY</th>
                        <th className="py-3 px-3 font-bold">VERSION</th>
                        <th className="py-3 px-3 font-bold">FILE SIZE</th>
                        <th className="py-3 px-3 font-bold">VECTORS</th>
                        <th className="py-3 px-3 font-bold">STATUS</th>
                        <th className="py-3 px-3 font-bold text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2D7C6]">
                      {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-[#F7F2E9]/60">
                          <td className="py-3 px-3 font-bold text-[#102A43]">{doc.name}</td>
                          <td className="py-3 px-3 text-[#5A6E7F]">{doc.category}</td>
                          <td className="py-3 px-3 font-semibold text-[#123B63]">{doc.version}</td>
                          <td className="py-3 px-3 text-[#5A6E7F]">{doc.size}</td>
                          <td className="py-3 px-3 font-bold text-[#C49A52]">{doc.vectors} chunks</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#15803D]">
                              {doc.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right space-x-2">
                            <button 
                              onClick={() => addToast('Document Re-indexed', `Refreshed vector embeddings for ${doc.name}`, 'info')}
                              className="text-xs font-bold text-[#123B63] hover:underline"
                            >
                              Re-index
                            </button>
                            <button 
                              onClick={() => {
                                setDocuments(prev => prev.filter(d => d.id !== doc.id));
                                addToast('Document Deleted', `Removed ${doc.name} from vector corpus`, 'warning');
                              }}
                              className="text-xs font-bold text-[#B91C1C] hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 13: ERP / DATA SOURCES */}
          {/* ========================================================================= */}
          {activeNav === 'ERP / Data Sources' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">ERP & Enterprise Data Sources</h2>
                  <p className="text-xs text-[#5A6E7F]">Institutional connectors, RFID attendance readers, and exam office feeds.</p>
                </div>
                <button 
                  onClick={handleTriggerERPSync}
                  disabled={isSyncingERP}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#F5C056] ${isSyncingERP ? 'animate-spin' : ''}`} />
                  <span>{isSyncingERP ? 'Syncing...' : 'Execute Full Sync'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'VIT Academic ERP (Mainframe)', type: 'REST / PostgreSQL', status: 'Connected', sync: '5 mins ago', records: '4,360 Accounts' },
                  { name: 'Examination & Grade Ledger', type: 'Database Mirror', status: 'Synced', sync: '12 mins ago', records: '32,400 Semester Grades' },
                  { name: 'Smart Campus RFID Attendance', type: 'IoT Stream', status: 'Live Stream', sync: 'Realtime (2s ping)', records: '14,200 Daily Swipes' },
                  { name: 'LMS Moodle Coursework Portal', type: 'LTI 1.3 / GraphQL', status: 'Connected', sync: '15 mins ago', records: '48 Active Courses' },
                ].map((src) => (
                  <div key={src.name} className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-[#102A43]">{src.name}</h3>
                        <p className="text-xs font-mono text-[#5A6E7F]">{src.type}</p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[10px] font-bold text-[#15803D]">
                        {src.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#5A6E7F] space-y-1">
                      <p><strong className="text-[#102A43]">Last Synchronized:</strong> {src.sync}</p>
                      <p><strong className="text-[#102A43]">Ingested Records:</strong> {src.records}</p>
                    </div>

                    <div className="pt-2 border-t border-[#E2D7C6] flex justify-end">
                      <button 
                        onClick={() => addToast('Connection Tested', `Pinged ${src.name}: Response 14ms (Healthy)`, 'success')}
                        className="px-3 py-1 rounded-xl bg-[#F7F2E9] text-xs font-bold text-[#102A43] hover:bg-[#E9DDC9]"
                      >
                        Test Ping
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 14: INTEGRATION HEALTH */}
          {/* ========================================================================= */}
          {activeNav === 'Integration Health' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs">
                <h2 className="text-xl font-extrabold text-[#102A43]">Integration Diagnostics & Health</h2>
                <p className="text-xs text-[#5A6E7F]">Latency metrics, webhook delivery logs, and connector diagnostics.</p>
              </div>

              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-[#102A43]">Live Connector Status</h3>
                <div className="space-y-3 text-xs">
                  {[
                    { name: 'SSO / Identity Provider (SAML 2.0)', latency: '12ms', status: 'Healthy', errorRate: '0.00%' },
                    { name: 'PostgreSQL Primary Cluster', latency: '4ms', status: 'Healthy', errorRate: '0.00%' },
                    { name: 'Google AI Gemini API Endpoint', latency: '92ms', status: 'Healthy', errorRate: '0.01%' },
                    { name: 'Student Push Notification Gateway', latency: '19ms', status: 'Healthy', errorRate: '0.00%' },
                  ].map((item) => (
                    <div key={item.name} className="p-4 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] flex items-center justify-between">
                      <div>
                        <p className="font-extrabold text-[#102A43]">{item.name}</p>
                        <p className="text-[10px] text-[#5A6E7F]">Latency: {item.latency} • Error Rate: {item.errorRate}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[10px] font-bold text-[#15803D]">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 15: AUDIT LOGS */}
          {/* ========================================================================= */}
          {activeNav === 'Audit Logs' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Immutable Audit Trail & Compliance</h2>
                  <p className="text-xs text-[#5A6E7F]">Cryptographically verifiable event log for accreditation and compliance.</p>
                </div>
                <button 
                  onClick={() => addToast('Exporting Audit Trail', 'Generating signed audit log CSV report...', 'info')}
                  className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs font-bold text-[#102A43] hover:bg-[#E9DDC9]"
                >
                  <Download className="w-3.5 h-3.5 text-[#123B63]" />
                  <span>Download Audit Export</span>
                </button>
              </div>

              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#E2D7C6] text-[#5A6E7F]">
                        <th className="py-3 px-3 font-bold">LOG ID & TIME</th>
                        <th className="py-3 px-3 font-bold">ACTOR</th>
                        <th className="py-3 px-3 font-bold">ACTION TAKEN</th>
                        <th className="py-3 px-3 font-bold">TARGET SCOPE</th>
                        <th className="py-3 px-3 font-bold">IP ADDRESS</th>
                        <th className="py-3 px-3 font-bold text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2D7C6]">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#F7F2E9]/60">
                          <td className="py-3 px-3">
                            <p className="font-mono font-bold text-[#123B63]">{log.id}</p>
                            <p className="text-[10px] text-[#5A6E7F]">{log.time}</p>
                          </td>
                          <td className="py-3 px-3 font-bold text-[#102A43]">{log.actor}</td>
                          <td className="py-3 px-3 font-medium text-[#102A43]">{log.action}</td>
                          <td className="py-3 px-3 text-[#5A6E7F]">{log.target}</td>
                          <td className="py-3 px-3 font-mono text-[10px] text-[#5A6E7F]">{log.ip}</td>
                          <td className="py-3 px-3 text-right">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#15803D]">
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 16: SECURITY */}
          {/* ========================================================================= */}
          {activeNav === 'Security' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">Security & Access Governance</h2>
                  <p className="text-xs text-[#5A6E7F]">Institutional security policies, 2FA enforcement, and vulnerability posture.</p>
                </div>
                <button 
                  onClick={() => addToast('Vulnerability Scan Run', 'Zero CVE vulnerabilities detected across 6 services.', 'success')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F5C056]" />
                  <span>Run Security Audit</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4">
                  <h3 className="text-base font-extrabold text-[#102A43]">Security Posture Score</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-2xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center font-extrabold text-2xl border border-[#15803D]/30">
                      98/100
                    </div>
                    <div>
                      <p className="font-extrabold text-[#102A43]">GRADE A+ SECURITY STANDARD</p>
                      <p className="text-xs text-[#5A6E7F]">TLS 1.3 Strict • AES-256 Vector Vault • Role Boundary Enforced</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-3 text-xs">
                  <h3 className="text-base font-extrabold text-[#102A43]">Enforced Policies</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F2E9]">
                      <span className="font-bold text-[#102A43]">Two-Factor Authentication (2FA) for Faculty & Admins</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[10px] font-bold text-[#15803D]">ENFORCED</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F2E9]">
                      <span className="font-bold text-[#102A43]">Session Idle Timeout (15 mins)</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[10px] font-bold text-[#15803D]">ACTIVE</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F2E9]">
                      <span className="font-bold text-[#102A43]">Campus IP Restriction for Super Admin Operations</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[10px] font-bold text-[#15803D]">LOCKED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 17: SYSTEM ACTIVITY */}
          {/* ========================================================================= */}
          {activeNav === 'System Activity' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs">
                <h2 className="text-xl font-extrabold text-[#102A43]">Realtime System Activity & Traffic</h2>
                <p className="text-xs text-[#5A6E7F]">Current user throughput, API traffic per minute, and active sessions.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-1">
                  <span className="text-xs font-bold text-[#5A6E7F]">Active Concurrent Sessions</span>
                  <p className="text-2xl font-extrabold text-[#123B63]">642 Users</p>
                  <p className="text-[10px] text-[#15803D]">Online right now</p>
                </div>
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-1">
                  <span className="text-xs font-bold text-[#5A6E7F]">API Ingestion Rate</span>
                  <p className="text-2xl font-extrabold text-[#102A43]">142 req/sec</p>
                  <p className="text-[10px] text-[#5A6E7F]">Peak throughput stable</p>
                </div>
                <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E2D7C6] shadow-xs space-y-1">
                  <span className="text-xs font-bold text-[#5A6E7F]">AI Query Generation</span>
                  <p className="text-2xl font-extrabold text-[#C49A52]">34 ops/min</p>
                  <p className="text-[10px] text-[#15803D]">Avg response time: 0.8s</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 18: SETTINGS */}
          {/* ========================================================================= */}
          {activeNav === 'Settings' && (
            <div className="space-y-6">
              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#102A43]">System Settings & Preferences</h2>
                  <p className="text-xs text-[#5A6E7F]">Global institution identifiers, branding, and notification templates.</p>
                </div>
                <button 
                  onClick={() => addToast('Settings Saved', 'Global platform parameters updated.', 'success')}
                  className="px-4 py-2 rounded-xl bg-[#123B63] hover:bg-[#1D4E73] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>

              <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E2D7C6] shadow-xs space-y-4 max-w-2xl text-xs">
                <div>
                  <label className="font-bold text-[#102A43]">Institution Name:</label>
                  <input 
                    type="text" 
                    defaultValue="Vidyalankar Institute of Technology, Mumbai (Autonomous)"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Academic Year Session:</label>
                  <select className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]">
                    <option>2025 - 2026 (Odd / Even Semesters)</option>
                    <option>2026 - 2027 (Upcoming)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Admin Notification Email:</label>
                  <input 
                    type="email" 
                    defaultValue="admin.operations@vit.edu.in"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>

      {/* 3. DOCUMENT UPLOAD MODAL */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <form onSubmit={handleUploadDoc} className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-2xl max-w-lg w-full space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                <h3 className="text-base font-extrabold text-[#102A43]">
                  Upload Approved RAG Institutional Document
                </h3>
                <button type="button" onClick={() => setShowUploadModal(false)} className="p-1 rounded-lg hover:bg-[#F7F2E9]">
                  <X className="w-5 h-5 text-[#102A43]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#102A43]">Document Title:</label>
                  <input
                    type="text"
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    placeholder="e.g. VIT Academic Guidelines 2026.pdf"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43] focus:outline-none focus:border-[#123B63]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Category:</label>
                  <select
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  >
                    <option>Academic Policy</option>
                    <option>Examination Policy</option>
                    <option>Curriculum</option>
                    <option>Mentoring Standard</option>
                  </select>
                </div>

                <div className="p-4 rounded-xl border-2 border-dashed border-[#E2D7C6] bg-[#F7F2E9] text-center space-y-1">
                  <FileText className="w-8 h-8 text-[#123B63] mx-auto" />
                  <p className="font-bold text-[#102A43]">Drag & Drop PDF document here</p>
                  <p className="text-[10px] text-[#5A6E7F]">Supports PDF, DOCX up to 25 MB</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 rounded-xl bg-[#123B63] text-white text-xs font-bold cursor-pointer"
                >
                  {isUploading ? 'Processing & Vectorizing...' : 'Upload & Vectorize Document'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. ADD USER MODAL */}
      <AnimatePresence>
        {showAddUserModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <form onSubmit={handleAddUser} className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-2xl max-w-md w-full space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                <h3 className="text-base font-extrabold text-[#102A43]">
                  Create New User Account
                </h3>
                <button type="button" onClick={() => setShowAddUserModal(false)} className="p-1 rounded-lg hover:bg-[#F7F2E9]">
                  <X className="w-5 h-5 text-[#102A43]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#102A43]">Full Name:</label>
                  <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Institutional Email:</label>
                  <input
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="e.g. rahul.s@vit.edu.in"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Role Assignment:</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  >
                    <option>Student</option>
                    <option>Faculty / Mentor</option>
                    <option>Department Admin</option>
                    <option>Institution Admin</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Department:</label>
                  <select
                    value={newUserDept}
                    onChange={(e) => setNewUserDept(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  >
                    <option>Computer Engineering</option>
                    <option>AI & Data Science</option>
                    <option>Information Technology</option>
                    <option>Electronics & Telecom</option>
                    <option>Biomedical Engineering</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#123B63] text-white text-xs font-bold cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. ADD DEPARTMENT MODAL */}
      <AnimatePresence>
        {showAddDeptModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <form onSubmit={handleAddDepartment} className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-2xl max-w-md w-full space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                <h3 className="text-base font-extrabold text-[#102A43]">
                  Add Academic Department
                </h3>
                <button type="button" onClick={() => setShowAddDeptModal(false)} className="p-1 rounded-lg hover:bg-[#F7F2E9]">
                  <X className="w-5 h-5 text-[#102A43]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#102A43]">Department Name:</label>
                  <input
                    type="text"
                    value={newDeptName}
                    onChange={(e) => setNewDeptName(e.target.value)}
                    placeholder="e.g. Mechanical Engineering"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Department Code:</label>
                  <input
                    type="text"
                    value={newDeptCode}
                    onChange={(e) => setNewDeptCode(e.target.value)}
                    placeholder="e.g. MECH"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Head of Department (HOD):</label>
                  <input
                    type="text"
                    value={newDeptHOD}
                    onChange={(e) => setNewDeptHOD(e.target.value)}
                    placeholder="e.g. Dr. A. K. Sen"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddDeptModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#123B63] text-white text-xs font-bold cursor-pointer"
                >
                  Initialize Department
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. DEACTIVATE USER CONFIRMATION MODAL */}
      <AnimatePresence>
        {showDeactivateModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-2xl max-w-md w-full space-y-4">
              <div className="flex items-center space-x-3 text-[#B91C1C]">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-base font-extrabold text-[#102A43]">Confirm Account Deactivation</h3>
              </div>

              <p className="text-xs text-[#5A6E7F] leading-relaxed">
                Are you sure you want to deactivate the user account for <strong>{showDeactivateModal.name}</strong> ({showDeactivateModal.email})? This action will revoke platform access and log an audit entry.
              </p>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeactivateModal(null)}
                  className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setUsersList(prev => prev.filter(u => u.id !== showDeactivateModal.id));
                    addToast('User Deactivated', `Account for ${showDeactivateModal.name} deactivated.`, 'warning');
                    setShowDeactivateModal(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#B91C1C] text-white text-xs font-bold cursor-pointer"
                >
                  Confirm Deactivation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. PERSISTENT FLOATING AI COPILOT DRAWER */}
      <AnimatePresence>
        {aiDrawerOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-[#FFFDF8] border-l border-[#E2D7C6] shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Copilot Header */}
            <div className="p-5 bg-[#123B63] text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-5 h-5 text-[#F5C056]" />
                <div>
                  <h3 className="text-sm font-bold text-white">Campus 1 AI Admin Operations Assistant</h3>
                  <p className="text-[10px] text-slate-300">Institutional Governance & System Telemetry</p>
                </div>
              </div>
              <button 
                onClick={() => setAiDrawerOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Conversation Area */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3.5 rounded-2xl ${
                    msg.sender === 'USER' 
                      ? 'bg-[#123B63] text-white rounded-br-none' 
                      : 'bg-[#F7F2E9] border border-[#E2D7C6] text-[#102A43] rounded-bl-none'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Prompts */}
            <div className="p-3 bg-[#F7F2E9] border-t border-[#E2D7C6] space-y-1.5">
              <p className="text-[10px] font-bold uppercase text-[#5A6E7F]">Suggested Prompts:</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Show me system issues.',
                  'Which integrations are unhealthy?',
                  'Summarize today\'s admin activity.',
                  'Summarize AI usage this month.'
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(undefined, prompt)}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-[#E9DDC9] text-[#102A43] text-[10px] font-semibold border border-[#E2D7C6] transition-colors text-left cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={(e) => handleSendMessage(e)} className="p-4 border-t border-[#E2D7C6] flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask AI about system telemetry, users, RAG..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43] focus:outline-none focus:border-[#123B63]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-[#123B63] text-white hover:bg-[#1D4E73] transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 1: STUDENT DETAILS DRAWER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showStudentDetailsModal && selectedStudentDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-2xl max-w-lg w-full space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#123B63] text-white flex items-center justify-center font-bold text-sm">
                    {selectedStudentDetails.name ? selectedStudentDetails.name.charAt(0) : 'S'}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#102A43]">{selectedStudentDetails.name}</h3>
                    <p className="text-xs text-[#5A6E7F] font-mono">{selectedStudentDetails.rollNo || selectedStudentDetails.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowStudentDetailsModal(false)}
                  className="p-1 rounded-lg hover:bg-[#F7F2E9]"
                >
                  <X className="w-5 h-5 text-[#102A43]" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-[#102A43]">
                <div className="grid grid-cols-2 gap-3 bg-[#F7F2E9] p-3.5 rounded-2xl border border-[#E2D7C6]">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#5A6E7F]">Department</p>
                    <p className="font-bold text-[#102A43] mt-0.5">{selectedStudentDetails.department}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#5A6E7F]">Semester & Division</p>
                    <p className="font-bold text-[#102A43] mt-0.5">Sem {selectedStudentDetails.semester} ({selectedStudentDetails.division || 'Div A'})</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#5A6E7F]">CGPA Score</p>
                    <p className="font-extrabold text-[#123B63] mt-0.5">{Number(selectedStudentDetails.cgpa || 0).toFixed(2)} / 10.00</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#5A6E7F]">Attendance Record</p>
                    <p className={`font-extrabold mt-0.5 ${(selectedStudentDetails.attendancePercentage || 100) >= 75 ? 'text-[#15803D]' : 'text-[#B91C1C]'}`}>
                      {(selectedStudentDetails.attendancePercentage || 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-[#E2D7C6]">
                    <span className="text-[#5A6E7F] font-bold">Email Address:</span>
                    <span className="font-semibold text-[#102A43]">{selectedStudentDetails.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E2D7C6]">
                    <span className="text-[#5A6E7F] font-bold">Phone Contact:</span>
                    <span className="font-semibold text-[#102A43]">{selectedStudentDetails.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E2D7C6]">
                    <span className="text-[#5A6E7F] font-bold">Assigned Faculty Mentor:</span>
                    <span className="font-bold text-[#C49A52]">{selectedStudentDetails.assignedMentor?.name || 'Unassigned'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E2D7C6]">
                    <span className="text-[#5A6E7F] font-bold">Account Status:</span>
                    <span className={`font-bold ${selectedStudentDetails.status === 'INACTIVE' ? 'text-[#B91C1C]' : 'text-[#15803D]'}`}>
                      {selectedStudentDetails.status || 'ACTIVE'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowStudentDetailsModal(false);
                    handleOpenEditStudent(selectedStudentDetails);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#123B63] text-white text-xs font-bold hover:bg-[#1D4E73]"
                >
                  Edit Student Record
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 2: ADD / EDIT STUDENT FORM MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showStudentFormModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <form onSubmit={handleSaveStudentSubmit} className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-2xl max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                <h3 className="text-base font-extrabold text-[#102A43] flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-[#C49A52]" />
                  <span>{editingStudent ? 'Edit Student Record' : 'Enroll New Student'}</span>
                </h3>
                <button type="button" onClick={() => setShowStudentFormModal(false)} className="p-1 rounded-lg hover:bg-[#F7F2E9]">
                  <X className="w-5 h-5 text-[#102A43]" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-[#102A43]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={studentFormData.name}
                    onChange={(e) => setStudentFormData({ ...studentFormData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={studentFormData.email}
                    onChange={(e) => setStudentFormData({ ...studentFormData, email: e.target.value })}
                    placeholder="e.g. rahul.s@vit.edu.in"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Roll Number / PRN *</label>
                  <input
                    type="text"
                    required
                    value={studentFormData.rollNo}
                    onChange={(e) => setStudentFormData({ ...studentFormData, rollNo: e.target.value })}
                    placeholder="e.g. 2023CSE001"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Phone Number</label>
                  <input
                    type="text"
                    value={studentFormData.phone}
                    onChange={(e) => setStudentFormData({ ...studentFormData, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Department</label>
                  <select
                    value={studentFormData.department}
                    onChange={(e) => setStudentFormData({ ...studentFormData, department: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  >
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="AI & Data Science">AI & Data Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Telecommunication">Electronics & Telecom</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Semester</label>
                  <select
                    value={studentFormData.semester}
                    onChange={(e) => setStudentFormData({ ...studentFormData, semester: Number(e.target.value) })}
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Division</label>
                  <input
                    type="text"
                    value={studentFormData.division}
                    onChange={(e) => setStudentFormData({ ...studentFormData, division: e.target.value })}
                    placeholder="e.g. Div A"
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">CGPA Score (0 - 10)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={studentFormData.cgpa}
                    onChange={(e) => setStudentFormData({ ...studentFormData, cgpa: parseFloat(e.target.value) || 0 })}
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#102A43]">Attendance % (0 - 100)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={studentFormData.attendancePercentage}
                    onChange={(e) => setStudentFormData({ ...studentFormData, attendancePercentage: parseFloat(e.target.value) || 100 })}
                    className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                  />
                </div>

                {!editingStudent && (
                  <div>
                    <label className="font-bold text-[#102A43]">Initial Password (Optional)</label>
                    <input
                      type="password"
                      value={studentFormData.password}
                      onChange={(e) => setStudentFormData({ ...studentFormData, password: e.target.value })}
                      placeholder="Auto-generated if left blank"
                      className="w-full mt-1 p-2.5 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] text-xs text-[#102A43]"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#E2D7C6]">
                <button
                  type="button"
                  onClick={() => setShowStudentFormModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#123B63] text-white text-xs font-bold hover:bg-[#1D4E73]"
                >
                  {editingStudent ? 'Save Changes' : 'Create Student'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 3: MULTI-STEP BULK CSV IMPORT MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showBulkImportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E2D7C6] shadow-2xl max-w-3xl w-full space-y-4 max-h-[90vh] flex flex-col"
            >
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between border-b border-[#E2D7C6] pb-3">
                <div className="flex items-center space-x-2.5">
                  <FileSpreadsheet className="w-5 h-5 text-[#123B63]" />
                  <div>
                    <h3 className="text-base font-extrabold text-[#102A43]">Bulk Student Data Import Engine</h3>
                    <p className="text-[11px] text-[#5A6E7F]">Step {importStep} of 6 — Upload, Validate & Sync Institutional Records</p>
                  </div>
                </div>
                <button type="button" onClick={() => setShowBulkImportModal(false)} className="p-1 rounded-lg hover:bg-[#F7F2E9]">
                  <X className="w-5 h-5 text-[#102A43]" />
                </button>
              </div>

              {/* STEP PROGRESS INDICATOR */}
              <div className="grid grid-cols-6 gap-1 text-[10px] font-bold text-center">
                {['Upload', 'Header Check', 'Dry-Run Preview', 'Confirmation', 'Commit', 'Results'].map((lbl, idx) => (
                  <div
                    key={lbl}
                    className={`py-1 rounded-lg transition-colors ${
                      importStep === idx + 1
                        ? 'bg-[#123B63] text-white'
                        : importStep > idx + 1
                        ? 'bg-[#DCFCE7] text-[#15803D]'
                        : 'bg-[#F7F2E9] text-[#5A6E7F]'
                    }`}
                  >
                    {lbl}
                  </div>
                ))}
              </div>

              {/* MODAL BODY BY STEP */}
              <div className="flex-1 overflow-y-auto space-y-4 py-2 text-xs text-[#102A43]">
                {/* STEP 1: UPLOAD FILE */}
                {importStep === 1 && (
                  <div className="space-y-4 text-center py-6">
                    <div className="border-2 border-dashed border-[#E2D7C6] rounded-3xl p-8 bg-[#F7F2E9]/50 hover:bg-[#F7F2E9] transition-colors relative cursor-pointer">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleCSVFileSelect}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <Upload className="w-10 h-10 mx-auto text-[#123B63] mb-3" />
                      <p className="font-extrabold text-sm text-[#102A43]">Click or drag & drop a CSV student file</p>
                      <p className="text-xs text-[#5A6E7F] mt-1">Accepts standard `.csv` files with Roll Number, Name, Email, and Department.</p>
                    </div>

                    <div className="flex items-center justify-center space-x-3 pt-2">
                      <button
                        onClick={downloadSampleCSVTemplate}
                        className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#F7F2E9] border border-[#E2D7C6] font-bold text-[#123B63] hover:bg-[#E9DDC9]"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Sample CSV Template</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: PROCESSING & SERVER PREVIEW LOADING */}
                {importStep === 2 && (
                  <div className="py-12 text-center space-y-3">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#123B63]" />
                    <p className="font-bold text-sm text-[#102A43]">Parsing CSV rows & verifying server-side dry-run validation...</p>
                    <p className="text-xs text-[#5A6E7F]">Checking duplicate roll numbers, email formats, and existing database records.</p>
                  </div>
                )}

                {/* STEP 3 & 4: INTERACTIVE PREVIEW & CONFIRMATION */}
                {(importStep === 3 || importStep === 4) && previewResult && (
                  <div className="space-y-4">
                    {/* STATS BADGES */}
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-3 bg-[#F7F2E9] rounded-2xl border border-[#E2D7C6]">
                        <p className="text-[10px] font-bold text-[#5A6E7F] uppercase">Total Rows</p>
                        <p className="text-lg font-extrabold text-[#102A43]">{previewResult.totalRows}</p>
                      </div>
                      <div className="p-3 bg-[#DCFCE7] rounded-2xl border border-[#86EFAC]">
                        <p className="text-[10px] font-bold text-[#15803D] uppercase">New Students</p>
                        <p className="text-lg font-extrabold text-[#15803D]">{previewResult.validNewCount}</p>
                      </div>
                      <div className="p-3 bg-[#FEF3C7] rounded-2xl border border-[#FDE047]">
                        <p className="text-[10px] font-bold text-[#D97706] uppercase">Existing Updates</p>
                        <p className="text-lg font-extrabold text-[#D97706]">{previewResult.validUpdateCount}</p>
                      </div>
                      <div className="p-3 bg-[#FEE2E2] rounded-2xl border border-[#FCA5A5]">
                        <p className="text-[10px] font-bold text-[#B91C1C] uppercase">Invalid Rows</p>
                        <p className="text-lg font-extrabold text-[#B91C1C]">{previewResult.invalidCount}</p>
                      </div>
                    </div>

                    {/* PREVIEW TABLE */}
                    <div className="border border-[#E2D7C6] rounded-2xl overflow-hidden max-h-60 overflow-y-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F7F2E9] sticky top-0 font-bold text-[#5A6E7F]">
                          <tr>
                            <th className="py-2 px-3">ROW</th>
                            <th className="py-2 px-3">STATUS</th>
                            <th className="py-2 px-3">ROLL NO & NAME</th>
                            <th className="py-2 px-3">EMAIL & DEPT</th>
                            <th className="py-2 px-3">VALIDATION DETAILS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2D7C6]">
                          {previewResult.rows.map((row: any) => (
                            <tr key={row.rowNumber} className={row.status === 'INVALID' ? 'bg-[#FFF5F5]' : ''}>
                              <td className="py-2 px-3 font-mono text-[11px]">{row.rowNumber}</td>
                              <td className="py-2 px-3">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                                  row.status === 'VALID_NEW'
                                    ? 'bg-[#DCFCE7] text-[#15803D]'
                                    : row.status === 'VALID_UPDATE'
                                    ? 'bg-[#FEF3C7] text-[#D97706]'
                                    : 'bg-[#FEE2E2] text-[#B91C1C]'
                                }`}>
                                  {row.status}
                                </span>
                              </td>
                              <td className="py-2 px-3 font-bold">{row.data.name} ({row.data.rollNo})</td>
                              <td className="py-2 px-3">{row.data.email} ({row.data.department})</td>
                              <td className="py-2 px-3 text-[11px]">
                                {row.errors.length > 0 ? (
                                  <span className="text-[#B91C1C] font-semibold">{row.errors.join(', ')}</span>
                                ) : (
                                  <span className="text-[#15803D] font-semibold">✓ Verified clean</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {importStep === 4 && (
                      <div className="p-3 bg-[#FEF3C7] border border-[#FDE047] rounded-2xl flex items-center space-x-2 text-[#92400E]">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-[#D97706]" />
                        <p className="font-semibold">
                          <strong>Admin Confirmation Required:</strong> You are about to commit {previewResult.validNewCount + previewResult.validUpdateCount} validated student records to the MongoDB production database. Existing passwords will NOT be modified.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 5: COMMIT PROGRESS */}
                {importStep === 5 && (
                  <div className="py-12 text-center space-y-3">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#123B63]" />
                    <p className="font-bold text-sm text-[#102A43]">Committing student records to database...</p>
                    <p className="text-xs text-[#5A6E7F]">Inserting new accounts, linking faculty mentors, and preserving security tokens.</p>
                  </div>
                )}

                {/* STEP 6: FINAL RESULTS SUMMARY */}
                {importStep === 6 && commitResult && (
                  <div className="space-y-4 text-center py-4">
                    <CheckCircle2 className="w-12 h-12 text-[#15803D] mx-auto" />
                    <h4 className="text-lg font-extrabold text-[#102A43]">Bulk Import Completed Successfully</h4>

                    <div className="grid grid-cols-4 gap-3">
                      <div className="p-3 bg-[#F7F2E9] rounded-2xl border border-[#E2D7C6]">
                        <p className="text-[10px] font-bold text-[#5A6E7F]">TOTAL PROCESSED</p>
                        <p className="text-xl font-extrabold text-[#102A43]">{commitResult.totalProcessed}</p>
                      </div>
                      <div className="p-3 bg-[#DCFCE7] rounded-2xl border border-[#86EFAC]">
                        <p className="text-[10px] font-bold text-[#15803D]">CREATED</p>
                        <p className="text-xl font-extrabold text-[#15803D]">{commitResult.createdCount}</p>
                      </div>
                      <div className="p-3 bg-[#FEF3C7] rounded-2xl border border-[#FDE047]">
                        <p className="text-[10px] font-bold text-[#D97706]">UPDATED</p>
                        <p className="text-xl font-extrabold text-[#D97706]">{commitResult.updatedCount}</p>
                      </div>
                      <div className="p-3 bg-[#FEE2E2] rounded-2xl border border-[#FCA5A5]">
                        <p className="text-[10px] font-bold text-[#B91C1C]">FAILED</p>
                        <p className="text-xl font-extrabold text-[#B91C1C]">{commitResult.failedCount}</p>
                      </div>
                    </div>

                    {commitResult.failures && commitResult.failures.length > 0 && (
                      <div className="pt-2">
                        <button
                          onClick={downloadImportErrorReport}
                          className="flex items-center space-x-1.5 mx-auto px-4 py-2 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] text-xs font-bold text-[#B91C1C] hover:bg-[#FCA5A5]/40"
                        >
                          <Download className="w-4 h-4 text-[#B91C1C]" />
                          <span>Download Error Report ({commitResult.failures.length} Failures)</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* MODAL FOOTER BUTTONS */}
              <div className="flex items-center justify-between border-t border-[#E2D7C6] pt-3">
                <button
                  type="button"
                  onClick={() => setShowBulkImportModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#E9DDC9] text-[#102A43] text-xs font-bold"
                >
                  {importStep === 6 ? 'Close Window' : 'Cancel'}
                </button>

                {importStep === 3 && (
                  <button
                    onClick={() => setImportStep(4)}
                    className="px-5 py-2 rounded-xl bg-[#123B63] text-white text-xs font-bold hover:bg-[#1D4E73]"
                  >
                    Proceed to Confirmation
                  </button>
                )}

                {importStep === 4 && (
                  <button
                    disabled={isImporting}
                    onClick={() => {
                      setImportStep(5);
                      handleConfirmCommitImport();
                    }}
                    className="px-6 py-2 rounded-xl bg-[#15803D] text-white text-xs font-bold hover:bg-[#166534] flex items-center space-x-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm & Commit to Database</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website Theme Toast Notifications */}
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
};


