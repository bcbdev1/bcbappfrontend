import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Server, Cloud, Smartphone } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NewAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (auditData: any) => void;
}

const NewAuditModal: React.FC<NewAuditModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    auditType: 'web',
    priority: 'medium',
    targetUrl: '',
    companyName: '',
    contactEmail: '',
    methodology: 'owasp',
    estimatedDuration: '2-weeks',
    description: ''
  });

  const auditTypes = [
    { id: 'web', label: 'Web Application', icon: Globe, description: 'Security testing for web applications' },
    { id: 'network', label: 'Network Security', icon: Server, description: 'Network infrastructure assessment' },
    { id: 'cloud', label: 'Cloud Security', icon: Cloud, description: 'Cloud platform security review' },
    { id: 'mobile', label: 'Mobile App', icon: Smartphone, description: 'Mobile application security testing' }
  ];

  const priorities = [
    { id: 'low', label: 'Low', color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300' },
    { id: 'medium', label: 'Medium', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300' },
    { id: 'high', label: 'High', color: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300' }
  ];

  const methodologies = [
    { id: 'owasp', label: 'OWASP Top 10' },
    { id: 'nist', label: 'NIST Framework' },
    { id: 'pci', label: 'PCI DSS' },
    { id: 'iso27001', label: 'ISO 27001' }
  ];

  const durations = [
    { id: '1-week', label: '1 Week' },
    { id: '2-weeks', label: '2 Weeks' },
    { id: '1-month', label: '1 Month' },
    { id: '2-months', label: '2 Months' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      auditType: 'web',
      priority: 'medium',
      targetUrl: '',
      companyName: '',
      contactEmail: '',
      methodology: 'owasp',
      estimatedDuration: '2-weeks',
      description: ''
    });
  };

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
            className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-xl border ${
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
                <h2 className="text-2xl font-bold">Request New Audit</h2>
                <p className="text-sm opacity-60 mt-1">Fill out the form to request a new security audit</p>
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Audit Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Audit Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {auditTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <motion.button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, auditType: type.id })}
                        className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                          formData.auditType === type.id
                            ? theme === 'dark'
                              ? 'bg-secondary-dark/20 border-secondary-dark/50 text-secondary-light'
                              : 'bg-secondary-light/20 border-secondary-light/50 text-secondary-dark'
                            : theme === 'dark'
                            ? 'bg-surface-dark/40 border-surface-dark/20 hover:border-surface-dark/40'
                            : 'bg-surface-light/40 border-surface-secondary-light/20 hover:border-surface-secondary-light/40'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-6 h-6" />
                          <div>
                            <h3 className="font-medium">{type.label}</h3>
                            <p className="text-sm opacity-60">{type.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Priority and Target URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Priority Level</label>
                  <div className="space-y-2">
                    {priorities.map((priority) => (
                      <label key={priority.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="priority"
                          value={priority.id}
                          checked={formData.priority === priority.id}
                          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                          className="w-4 h-4"
                        />
                        <span className={`px-2 py-1 rounded text-sm font-medium ${priority.color}`}>
                          {priority.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Target URL/IP</label>
                  <input
                    type="text"
                    value={formData.targetUrl}
                    onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                    placeholder="https://example.com or 192.168.1.1"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-surface-dark/50 border-surface-dark/30 focus:border-secondary-dark text-text-dark'
                        : 'bg-surface-light/50 border-surface-secondary-light/30 focus:border-secondary-light text-text-light'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Company Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Your Company Name"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-surface-dark/50 border-surface-dark/30 focus:border-secondary-dark text-text-dark'
                        : 'bg-surface-light/50 border-surface-secondary-light/30 focus:border-secondary-light text-text-light'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="contact@company.com"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-surface-dark/50 border-surface-dark/30 focus:border-secondary-dark text-text-dark'
                        : 'bg-surface-light/50 border-surface-secondary-light/30 focus:border-secondary-light text-text-light'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Methodology and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Methodology</label>
                  <select
                    value={formData.methodology}
                    onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-surface-dark/50 border-surface-dark/30 focus:border-secondary-dark text-text-dark'
                        : 'bg-surface-light/50 border-surface-secondary-light/30 focus:border-secondary-light text-text-light'
                    }`}
                  >
                    {methodologies.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Estimated Duration</label>
                  <select
                    value={formData.estimatedDuration}
                    onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-surface-dark/50 border-surface-dark/30 focus:border-secondary-dark text-text-dark'
                        : 'bg-surface-light/50 border-surface-secondary-light/30 focus:border-secondary-light text-text-light'
                    }`}
                  >
                    {durations.map((duration) => (
                      <option key={duration.id} value={duration.id}>
                        {duration.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description & Requirements</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your specific requirements, scope, and any additional information..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 resize-none ${
                    theme === 'dark'
                      ? 'bg-surface-dark/50 border-surface-dark/30 focus:border-secondary-dark text-text-dark'
                      : 'bg-surface-light/50 border-surface-secondary-light/30 focus:border-secondary-light text-text-light'
                  }`}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-surface-dark/20 dark:border-surface-light/20">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-surface-dark hover:bg-surface-dark/80 text-text-dark'
                      : 'bg-surface-secondary-light hover:bg-surface-secondary-light/80 text-text-light'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Request
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewAuditModal;