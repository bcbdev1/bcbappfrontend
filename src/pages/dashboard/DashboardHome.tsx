import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Download,
  Plus,
  Eye,
  RotateCcw,
  X,
  Calendar,
  Globe,
  Server,
  Smartphone,
  Database
} from 'lucide-react';

interface Audit {
  id: string;
  name: string;
  type: string;
  status: 'In Progress' | 'Completed' | 'Scheduled';
  completion: number;
  startDate: string;
  endDate: string;
  vulnerabilities?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

const DashboardHome: React.FC = () => {
  const [showAuditDetails, setShowAuditDetails] = useState(false);
  const [showNewAuditForm, setShowNewAuditForm] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);
  const [audits, setAudits] = useState<Audit[]>([
    {
      id: '1',
      name: 'Network Audit',
      type: 'Network',
      status: 'In Progress',
      completion: 65,
      startDate: '2025-05-10',
      endDate: '2025-05-25'
    },
    {
      id: '2',
      name: 'Web App Audit',
      type: 'Web Application',
      status: 'Scheduled',
      completion: 0,
      startDate: '2025-05-20',
      endDate: '2025-06-05'
    },
    {
      id: '3',
      name: 'Cloud Audit',
      type: 'Cloud Infrastructure',
      status: 'Completed',
      completion: 100,
      startDate: '2025-04-15',
      endDate: '2025-04-30',
      vulnerabilities: {
        critical: 6,
        high: 6,
        medium: 0,
        low: 8,
        info: 2
      }
    }
  ]);

  const documents: Document[] = [
    {
      id: '1',
      name: 'Security Assessment Report Q1 2025',
      type: 'PDF',
      uploadDate: '2025-01-15T10:30:00Z',
      size: '2.4 MB'
    },
    {
      id: '2',
      name: 'Vulnerability Scan Results',
      type: 'PDF',
      uploadDate: '2025-01-10T14:20:00Z',
      size: '1.8 MB'
    },
    {
      id: '3',
      name: 'Compliance Checklist',
      type: 'PDF',
      uploadDate: '2025-01-05T09:15:00Z',
      size: '856 KB'
    }
  ];

  const [newAuditForm, setNewAuditForm] = useState({
    auditType: '',
    priority: '',
    targetUrl: '',
    companyName: '',
    contactEmail: '',
    methodology: '',
    estimatedDuration: '',
    description: ''
  });

  const handleAuditClick = (audit: Audit) => {
    if (audit.status === 'Completed') {
      setSelectedAudit(audit);
      setShowAuditDetails(true);
    }
  };

  const handleReAudit = () => {
    if (selectedAudit) {
      const updatedAudits = audits.map(audit => 
        audit.id === selectedAudit.id 
          ? { ...audit, status: 'Scheduled' as const, completion: 0 }
          : audit
      );
      setAudits(updatedAudits);
      setShowAuditDetails(false);
    }
  };

  const handleNewAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAudit: Audit = {
      id: Date.now().toString(),
      name: `${newAuditForm.auditType} Audit`,
      type: newAuditForm.auditType,
      status: 'Scheduled',
      completion: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    
    setAudits([...audits, newAudit]);
    setShowNewAuditForm(false);
    setNewAuditForm({
      auditType: '',
      priority: '',
      targetUrl: '',
      companyName: '',
      contactEmail: '',
      methodology: '',
      estimatedDuration: '',
      description: ''
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-400';
      case 'In Progress': return 'text-blue-400';
      case 'Scheduled': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return CheckCircle;
      case 'In Progress': return Activity;
      case 'Scheduled': return Clock;
      default: return AlertTriangle;
    }
  };

  const getAuditTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'web application': return Globe;
      case 'network': return Server;
      case 'mobile': return Smartphone;
      case 'cloud infrastructure': return Database;
      default: return Shield;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Welcome back, Test
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Here's an overview of your security audits and account
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-800/70 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Audits</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {audits.filter(a => a.status === 'In Progress').length}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-800/70 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed Audits</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {audits.filter(a => a.status === 'Completed').length}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-800/70 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Security Score</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">82/100</p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <AlertTriangle className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Your Audits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Audits</h2>
          <button
            onClick={() => setShowNewAuditForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Request New Audit
          </button>
        </div>

        <div className="space-y-4">
          {audits.map((audit, index) => {
            const StatusIcon = getStatusIcon(audit.status);
            const TypeIcon = getAuditTypeIcon(audit.type);
            
            return (
              <motion.div
                key={audit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border border-white/10 dark:border-gray-700/50 bg-white/5 dark:bg-gray-800/30 hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-300 ${
                  audit.status === 'Completed' ? 'cursor-pointer' : ''
                }`}
                onClick={() => handleAuditClick(audit)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <TypeIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{audit.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {audit.startDate} - {audit.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`flex items-center gap-2 ${getStatusColor(audit.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{audit.status}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Completion: {audit.completion}%
                      </p>
                    </div>
                    {audit.status === 'Completed' && (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
                {audit.status === 'In Progress' && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${audit.completion}%` }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Documents Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Documents</h2>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl border border-white/10 dark:border-gray-700/50 bg-white/5 dark:bg-gray-800/30 hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Download className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{doc.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Uploaded: {formatDate(doc.uploadDate)} • {doc.size}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-white/10 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200">
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Audit Details Modal */}
      {showAuditDetails && selectedAudit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAuditDetails(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedAudit.name} - Audit Details
              </h2>
              <button
                onClick={() => setShowAuditDetails(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Audit Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Testing Period</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {selectedAudit.startDate} - {selectedAudit.endDate}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">Expired 2 weeks ago</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Report Delivery</p>
                <p className="font-semibold text-gray-900 dark:text-white">Oct 30, 2021</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">Delivered 3 days ago</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Methodology</p>
                <p className="font-semibold text-gray-900 dark:text-white">Web app</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Testing Progress</p>
                <p className="font-semibold text-gray-900 dark:text-white">100% of tests complete</p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full w-full" />
                </div>
              </div>
            </div>

            {/* Status and Vulnerabilities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Status</h3>
                <div className="space-y-3">
                  {[
                    { status: 'Draft', description: 'Bugcrowd is setting up your pen test', completed: true },
                    { status: 'Launching', description: 'Your pen test is scheduled for launch', completed: true },
                    { status: 'In progress', description: 'Pen testers are testing and validating', completed: true },
                    { status: 'Finalizing', description: 'Bugcrowd is preparing reports', completed: true },
                    { status: 'Completed', description: 'Your report is ready for review', completed: true }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.status}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vulnerabilities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Reported Vulnerabilities
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">24</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Reported</p>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-center">
                    <div className="bg-red-500/20 rounded-lg p-2">
                      <p className="text-sm font-medium text-red-600 dark:text-red-400">Critical</p>
                      <p className="text-lg font-bold text-red-600 dark:text-red-400">6</p>
                    </div>
                    <div className="bg-orange-500/20 rounded-lg p-2">
                      <p className="text-sm font-medium text-orange-600 dark:text-orange-400">High</p>
                      <p className="text-lg font-bold text-orange-600 dark:text-orange-400">6</p>
                    </div>
                    <div className="bg-yellow-500/20 rounded-lg p-2">
                      <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Medium</p>
                      <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">0</p>
                    </div>
                    <div className="bg-green-500/20 rounded-lg p-2">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">Low</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">8</p>
                    </div>
                    <div className="bg-blue-500/20 rounded-lg p-2">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Info</p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Remediation Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Remediation Recommendations
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-r-lg">
                  <h4 className="font-medium text-red-800 dark:text-red-400">Critical: SQL Injection Vulnerability</h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    Implement parameterized queries and input validation to prevent SQL injection attacks.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-r-lg">
                  <h4 className="font-medium text-orange-800 dark:text-orange-400">High: Cross-Site Scripting (XSS)</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                    Implement proper output encoding and Content Security Policy headers.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-400">Low: Missing Security Headers</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Add security headers like X-Frame-Options and X-Content-Type-Options.
                  </p>
                </div>
              </div>
            </div>

            {/* Re-audit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleReAudit}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                Re-audit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* New Audit Request Modal */}
      {showNewAuditForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewAuditForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Request New Audit</h2>
              <button
                onClick={() => setShowNewAuditForm(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleNewAuditSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Audit Type
                  </label>
                  <select
                    value={newAuditForm.auditType}
                    onChange={(e) => setNewAuditForm({...newAuditForm, auditType: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select audit type</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Network">Network Security</option>
                    <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                    <option value="Mobile">Mobile Application</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={newAuditForm.priority}
                    onChange={(e) => setNewAuditForm({...newAuditForm, priority: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target URL/IP
                </label>
                <input
                  type="text"
                  value={newAuditForm.targetUrl}
                  onChange={(e) => setNewAuditForm({...newAuditForm, targetUrl: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com or 192.168.1.1"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={newAuditForm.companyName}
                    onChange={(e) => setNewAuditForm({...newAuditForm, companyName: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={newAuditForm.contactEmail}
                    onChange={(e) => setNewAuditForm({...newAuditForm, contactEmail: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Methodology
                  </label>
                  <select
                    value={newAuditForm.methodology}
                    onChange={(e) => setNewAuditForm({...newAuditForm, methodology: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select methodology</option>
                    <option value="OWASP">OWASP Top 10</option>
                    <option value="NIST">NIST Framework</option>
                    <option value="PCI DSS">PCI DSS</option>
                    <option value="ISO 27001">ISO 27001</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estimated Duration
                  </label>
                  <select
                    value={newAuditForm.estimatedDuration}
                    onChange={(e) => setNewAuditForm({...newAuditForm, estimatedDuration: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select duration</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="2-4 weeks">2-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="2+ months">2+ months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newAuditForm.description}
                  onChange={(e) => setNewAuditForm({...newAuditForm, description: e.target.value})}
                  rows={4}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your audit requirements..."
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewAuditForm(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardHome;