import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Globe, Server, Cloud, Smartphone } from 'lucide-react';
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
}

interface AuditsListProps {
  audits: Audit[];
  onAuditClick: (audit: Audit) => void;
  onRequestNewAudit: () => void;
}

const AuditsList: React.FC<AuditsListProps> = ({ audits, onAuditClick, onRequestNewAudit }) => {
  const { theme } = useTheme();

  const getAuditIcon = (type: string) => {
    switch (type) {
      case 'web': return Globe;
      case 'network': return Server;
      case 'cloud': return Cloud;
      case 'mobile': return Smartphone;
      default: return Globe;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme === 'dark' ? 'text-green-400 bg-green-500/20' : 'text-green-600 bg-green-100';
      case 'in-progress':
        return theme === 'dark' ? 'text-blue-400 bg-blue-500/20' : 'text-blue-600 bg-blue-100';
      case 'scheduled':
        return theme === 'dark' ? 'text-orange-400 bg-orange-500/20' : 'text-orange-600 bg-orange-100';
      default:
        return theme === 'dark' ? 'text-gray-400 bg-gray-500/20' : 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      className={`p-6 rounded-2xl backdrop-blur-xl border ${
        theme === 'dark'
          ? 'bg-surface-dark/60 border-surface-dark/30'
          : 'bg-surface-light/60 border-surface-secondary-light/30'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Your Audits</h2>
        <motion.button
          onClick={onRequestNewAudit}
          className="px-4 py-2 bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Request New Audit
        </motion.button>
      </div>

      <div className="space-y-4">
        {audits.map((audit, index) => {
          const Icon = getAuditIcon(audit.type);
          
          return (
            <motion.div
              key={audit.id}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                theme === 'dark'
                  ? 'bg-surface-dark/40 border-surface-dark/20 hover:border-surface-dark/40'
                  : 'bg-surface-light/40 border-surface-secondary-light/20 hover:border-surface-secondary-light/40'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => onAuditClick(audit)}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-surface-dark' : 'bg-surface-secondary-light'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div>
                    <h3 className="font-medium">{audit.name}</h3>
                    <div className="flex items-center space-x-4 text-sm opacity-60 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{audit.startDate} - {audit.endDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
                    {audit.status.charAt(0).toUpperCase() + audit.status.slice(1)}
                  </span>
                  
                  {audit.status === 'in-progress' && (
                    <div className="mt-2">
                      <div className="text-xs opacity-60 mb-1">{audit.progress}% Complete</div>
                      <div className={`w-24 h-2 rounded-full ${
                        theme === 'dark' ? 'bg-surface-dark' : 'bg-surface-secondary-light'
                      }`}>
                        <motion.div
                          className="h-full bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${audit.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AuditsList;