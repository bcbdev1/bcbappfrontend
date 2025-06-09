import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Play,
  Pause,
  RotateCcw,
  Download,
  Filter,
  Globe,
  Server,
  Database,
  Smartphone,
  Eye,
  X
} from 'lucide-react';

interface ScanResult {
  id: string;
  target: string;
  type: 'Web Application' | 'Network' | 'Database' | 'Mobile';
  status: 'Running' | 'Completed' | 'Failed' | 'Scheduled';
  progress: number;
  startTime: string;
  endTime?: string;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  findings: Array<{
    severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
    title: string;
    description: string;
    recommendation: string;
  }>;
}

const ScanPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'scheduled'>('active');
  const [showScanDetails, setShowScanDetails] = useState(false);
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);
  const [showNewScanForm, setShowNewScanForm] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const [scans, setScans] = useState<ScanResult[]>([
    {
      id: '1',
      target: 'https://example.com',
      type: 'Web Application',
      status: 'Running',
      progress: 65,
      startTime: '2025-01-15T10:30:00Z',
      vulnerabilities: { critical: 0, high: 2, medium: 5, low: 8, info: 3 },
      findings: [
        {
          severity: 'High',
          title: 'SQL Injection Vulnerability',
          description: 'Potential SQL injection found in login form',
          recommendation: 'Use parameterized queries and input validation'
        },
        {
          severity: 'Medium',
          title: 'Missing Security Headers',
          description: 'X-Frame-Options header not set',
          recommendation: 'Add security headers to prevent clickjacking'
        }
      ]
    },
    {
      id: '2',
      target: '192.168.1.0/24',
      type: 'Network',
      status: 'Completed',
      progress: 100,
      startTime: '2025-01-14T09:00:00Z',
      endTime: '2025-01-14T11:30:00Z',
      vulnerabilities: { critical: 1, high: 3, medium: 2, low: 5, info: 1 },
      findings: [
        {
          severity: 'Critical',
          title: 'Unpatched SSH Service',
          description: 'SSH service running with known vulnerabilities',
          recommendation: 'Update SSH service to latest version'
        }
      ]
    },
    {
      id: '3',
      target: 'mobile-app-v2.1.0',
      type: 'Mobile',
      status: 'Scheduled',
      progress: 0,
      startTime: '2025-01-16T14:00:00Z',
      vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
      findings: []
    }
  ]);

  const [newScanForm, setNewScanForm] = useState({
    target: '',
    scanType: '',
    priority: '',
    schedule: 'immediate',
    scheduledTime: '',
    description: ''
  });

  const getScanTypeIcon = (type: string) => {
    switch (type) {
      case 'Web Application': return Globe;
      case 'Network': return Server;
      case 'Database': return Database;
      case 'Mobile': return Smartphone;
      default: return Shield;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'text-blue-400';
      case 'Completed': return 'text-green-400';
      case 'Failed': return 'text-red-400';
      case 'Scheduled': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Running': return Play;
      case 'Completed': return CheckCircle;
      case 'Failed': return AlertTriangle;
      case 'Scheduled': return Clock;
      default: return Shield;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Info': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredScans = scans.filter(scan => {
    const statusFilter = activeTab === 'active' ? scan.status === 'Running' :
                        activeTab === 'completed' ? scan.status === 'Completed' :
                        scan.status === 'Scheduled';
    
    const typeFilter = filterType === 'all' || scan.type === filterType;
    
    return statusFilter && typeFilter;
  });

  const handleScanClick = (scan: ScanResult) => {
    setSelectedScan(scan);
    setShowScanDetails(true);
  };

  const handleNewScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newScan: ScanResult = {
      id: Date.now().toString(),
      target: newScanForm.target,
      type: newScanForm.scanType as any,
      status: newScanForm.schedule === 'immediate' ? 'Running' : 'Scheduled',
      progress: newScanForm.schedule === 'immediate' ? 0 : 0,
      startTime: newScanForm.schedule === 'immediate' ? new Date().toISOString() : newScanForm.scheduledTime,
      vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
      findings: []
    };
    
    setScans([...scans, newScan]);
    setShowNewScanForm(false);
    setNewScanForm({
      target: '',
      scanType: '',
      priority: '',
      schedule: 'immediate',
      scheduledTime: '',
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Security Scans
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor and manage your security scanning activities
          </p>
        </div>
        <button
          onClick={() => setShowNewScanForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
        >
          <Play className="w-4 h-4" />
          New Scan
        </button>
      </motion.div>

      {/* Tabs and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            {['active', 'completed', 'scheduled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Web Application">Web Application</option>
              <option value="Network">Network</option>
              <option value="Database">Database</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>
        </div>

        {/* Scan List */}
        <div className="space-y-4">
          {filteredScans.map((scan, index) => {
            const StatusIcon = getStatusIcon(scan.status);
            const TypeIcon = getScanTypeIcon(scan.type);
            const totalVulns = Object.values(scan.vulnerabilities).reduce((a, b) => a + b, 0);
            
            return (
              <motion.div
                key={scan.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl border border-white/10 dark:border-gray-700/50 bg-white/5 dark:bg-gray-800/30 hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                onClick={() => handleScanClick(scan)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <TypeIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{scan.target}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {scan.type} • Started: {formatDate(scan.startTime)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className={`flex items-center gap-2 ${getStatusColor(scan.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{scan.status}</span>
                      </div>
                      {scan.status === 'Completed' && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {totalVulns} vulnerabilities found
                        </p>
                      )}
                    </div>
                    
                    {scan.status === 'Running' && (
                      <div className="w-24">
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{scan.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${scan.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <Eye className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredScans.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No {activeTab} scans
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {activeTab === 'active' && "No scans are currently running."}
              {activeTab === 'completed' && "No completed scans to display."}
              {activeTab === 'scheduled' && "No scans are scheduled."}
            </p>
          </div>
        )}
      </motion.div>

      {/* Scan Details Modal */}
      {showScanDetails && selectedScan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowScanDetails(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Scan Details: {selectedScan.target}
              </h2>
              <button
                onClick={() => setShowScanDetails(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Scan Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Scan Type</p>
                <p className="font-semibold text-gray-900 dark:text-white">{selectedScan.type}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <p className="font-semibold text-gray-900 dark:text-white">{selectedScan.status}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {selectedScan.endTime 
                    ? `${Math.round((new Date(selectedScan.endTime).getTime() - new Date(selectedScan.startTime).getTime()) / (1000 * 60))} minutes`
                    : 'In progress'
                  }
                </p>
              </div>
            </div>

            {/* Vulnerabilities Summary */}
            {selectedScan.status === 'Completed' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Vulnerabilities Found
                </h3>
                <div className="grid grid-cols-5 gap-4">
                  {Object.entries(selectedScan.vulnerabilities).map(([severity, count]) => (
                    <div key={severity} className={`rounded-xl p-4 border ${getSeverityColor(severity.charAt(0).toUpperCase() + severity.slice(1))}`}>
                      <p className="text-sm font-medium capitalize">{severity}</p>
                      <p className="text-2xl font-bold">{count}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Findings */}
            {selectedScan.findings.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Key Findings
                </h3>
                <div className="space-y-4">
                  {selectedScan.findings.map((finding, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getSeverityColor(finding.severity)}`}>
                          {finding.severity}
                        </span>
                        <h4 className="font-medium text-gray-900 dark:text-white">{finding.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{finding.description}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        <strong>Recommendation:</strong> {finding.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-4">
              {selectedScan.status === 'Completed' && (
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200">
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
              )}
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
                <RotateCcw className="w-4 h-4" />
                Re-scan
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* New Scan Form Modal */}
      {showNewScanForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewScanForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Security Scan</h2>
              <button
                onClick={() => setShowNewScanForm(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleNewScanSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target
                </label>
                <input
                  type="text"
                  value={newScanForm.target}
                  onChange={(e) => setNewScanForm({...newScanForm, target: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com or 192.168.1.1"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Scan Type
                  </label>
                  <select
                    value={newScanForm.scanType}
                    onChange={(e) => setNewScanForm({...newScanForm, scanType: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select scan type</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Network">Network Security</option>
                    <option value="Database">Database Security</option>
                    <option value="Mobile">Mobile Application</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={newScanForm.priority}
                    onChange={(e) => setNewScanForm({...newScanForm, priority: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Schedule
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="immediate"
                      checked={newScanForm.schedule === 'immediate'}
                      onChange={(e) => setNewScanForm({...newScanForm, schedule: e.target.value})}
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">Start immediately</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="scheduled"
                      checked={newScanForm.schedule === 'scheduled'}
                      onChange={(e) => setNewScanForm({...newScanForm, schedule: e.target.value})}
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">Schedule for later</span>
                  </label>
                </div>
                
                {newScanForm.schedule === 'scheduled' && (
                  <input
                    type="datetime-local"
                    value={newScanForm.scheduledTime}
                    onChange={(e) => setNewScanForm({...newScanForm, scheduledTime: e.target.value})}
                    className="mt-3 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newScanForm.description}
                  onChange={(e) => setNewScanForm({...newScanForm, description: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional notes or requirements..."
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewScanForm(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                >
                  {newScanForm.schedule === 'immediate' ? 'Start Scan' : 'Schedule Scan'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ScanPage;