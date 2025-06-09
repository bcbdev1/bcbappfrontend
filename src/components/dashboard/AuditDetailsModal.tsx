import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Audit {
  id: string;
  name: string;
  type: 'web' | 'network' | 'cloud' | 'mobile';
  status: 'in-progress' | 'completed' | 'scheduled';
  progress: number;
  startDate: string;
  endDate: string;
  vulnerabilities?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  methodology?: string;
  testingPeriod?: string;
  deliveryDate?: string;
}

interface AuditDetailsModalProps {
  audit: Audit | null;
  isOpen: boolean;
  onClose: () => void;
  onReAudit: (auditId: string) => void;
}

const AuditDetailsModal: React.FC<AuditDetailsModalProps> = ({
  audit,
  isOpen,
  onClose,
  onReAudit
}) => {
  const { theme } = useTheme();

  if (!audit) return null;

  const vulnerabilityData = audit.vulnerabilities || {
    critical: 6,
    high: 6,
    medium: 0,
    low: 8,
    info: 2
  };

  const total = Object.values(vulnerabilityData).reduce((sum, count) => sum + count, 0);

  const vulnerabilityColors = {
    critical: { color: 'bg-red-500', text: 'text-red-600 dark:text-red-400' },
    high: { color: 'bg-orange-500', text: 'text-orange-600 dark:text-orange-400' },
    medium: { color: 'bg-yellow-500', text: 'text-yellow-600 dark:text-yellow-400' },
    low: { color: 'bg-green-500', text: 'text-green-600 dark:text-green-400' },
    info: { color: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' }
  };

  const remediations = [
    {
      type: 'critical',
      title: 'SQL Injection Vulnerability',
      description: 'Update input validation and use parameterized queries to prevent SQL injection attacks.',
      priority: 'Critical'
    },
    {
      type: 'high',
      title: 'Cross-Site Scripting (XSS)',
      description: 'Implement proper output encoding and Content Security Policy headers.',
      priority: 'High'
    },
    {
      type: 'medium',
      title: 'Insecure Direct Object References',
      description: 'Implement proper access controls and authorization checks.',
      priority: 'Medium'
    },
    {
      type: 'low',
      title: 'Missing Security Headers',
      description: 'Add security headers like X-Frame-Options, X-Content-Type-Options.',
      priority: 'Low'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-xl border ${
              theme === 'dark'
                ? 'bg-surface-dark/90 border-surface-dark/30'
                : 'bg-surface-light/90 border-surface-secondary-light/30'
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-surface-dark/20 dark:border-surface-light/20">
              <div>
                <h2 className="text-2xl font-bold">{audit.name}</h2>
                <p className="text-sm opacity-60 mt-1">Audit Details & Results</p>
              </div>
              <motion.button
                onClick={onClose}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'hover:bg-surface-dark text-text-secondary-dark hover:text-text-dark'
                    : 'hover:bg-surface-secondary-light text-text-secondary-light hover:text-text-light'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Audit Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className={`p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-surface-dark/40' : 'bg-surface-light/40'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Testing Period</span>
                  </div>
                  <p className="text-lg font-bold">Sep 17 - Oct 16</p>
                  <p className="text-sm opacity-60">Expired 2 weeks ago</p>
                </div>

                <div className={`p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-surface-dark/40' : 'bg-surface-light/40'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Report Delivery</span>
                  </div>
                  <p className="text-lg font-bold">Oct 30, 2021</p>
                  <p className="text-sm opacity-60">Delivered 3 days ago</p>
                </div>

                <div className={`p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-surface-dark/40' : 'bg-surface-light/40'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-purple-500" />
                    <span className="font-medium">Methodology</span>
                  </div>
                  <p className="text-lg font-bold">Web app</p>
                </div>

                <div className={`p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-surface-dark/40' : 'bg-surface-light/40'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Progress</span>
                  </div>
                  <p className="text-lg font-bold">100% complete</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-blue-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>
              </div>

              {/* Status & Vulnerabilities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Status */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Status</h3>
                  <div className="space-y-3">
                    {[
                      { status: 'Draft', description: 'Bugcrowd is setting up your pen test', completed: true },
                      { status: 'Launching', description: 'Your pen test is scheduled for launch', completed: true },
                      { status: 'In progress', description: 'Pen testers are testing and validating', completed: true },
                      { status: 'Finalizing', description: 'Bugcrowd is preparing reports', completed: true },
                      { status: 'Completed', description: 'Your report is ready for review', completed: true }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium">{item.status}</p>
                          <p className="text-sm opacity-60">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vulnerabilities Chart */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Reported Vulnerabilities</h3>
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-48 h-48">
                      {/* Pie Chart Placeholder */}
                      <div className="w-full h-full rounded-full bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 to-blue-500 relative">
                        <div className={`absolute inset-8 rounded-full ${
                          theme === 'dark' ? 'bg-surface-dark' : 'bg-surface-light'
                        } flex items-center justify-center`}>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{total}</p>
                            <p className="text-sm opacity-60">Reported</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vulnerability Breakdown */}
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(vulnerabilityData).map(([type, count]) => (
                      <div key={type} className="text-center">
                        <div className={`px-2 py-1 rounded text-xs font-medium mb-1 ${
                          type === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          type === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                          type === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          type === 'low' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </div>
                        <p className="text-lg font-bold">{count}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Remediation Recommendations */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Remediation Recommendations</h3>
                <div className="space-y-4">
                  {remediations.map((item, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        theme === 'dark'
                          ? 'bg-surface-dark/40 border-surface-dark/20'
                          : 'bg-surface-light/40 border-surface-secondary-light/20'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className={`w-5 h-5 mt-1 ${
                          vulnerabilityColors[item.type as keyof typeof vulnerabilityColors]?.text || 'text-gray-500'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{item.title}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              item.priority === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              item.priority === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                              item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                              {item.priority}
                            </span>
                          </div>
                          <p className="text-sm opacity-80">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-surface-dark/20 dark:border-surface-light/20">
                <motion.button
                  onClick={onClose}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-surface-dark hover:bg-surface-dark/80 text-text-dark'
                      : 'bg-surface-secondary-light hover:bg-surface-secondary-light/80 text-text-light'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
                
                <motion.button
                  onClick={() => onReAudit(audit.id)}
                  className="px-6 py-3 bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Re-audit
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuditDetailsModal;