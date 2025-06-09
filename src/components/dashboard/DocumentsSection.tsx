import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Clock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'xlsx';
  size: string;
  uploadDate: string;
  uploadTime: string;
  auditId: string;
}

interface DocumentsSectionProps {
  documents: Document[];
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ documents }) => {
  const { theme } = useTheme();

  const getFileIcon = (type: string) => {
    return FileText; // Using FileText for all document types
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return theme === 'dark' ? 'text-red-400 bg-red-500/20' : 'text-red-600 bg-red-100';
      case 'doc':
        return theme === 'dark' ? 'text-blue-400 bg-blue-500/20' : 'text-blue-600 bg-blue-100';
      case 'xlsx':
        return theme === 'dark' ? 'text-green-400 bg-green-500/20' : 'text-green-600 bg-green-100';
      default:
        return theme === 'dark' ? 'text-gray-400 bg-gray-500/20' : 'text-gray-600 bg-gray-100';
    }
  };

  const handleDownload = (document: Document) => {
    // Simulate download functionality
    console.log(`Downloading ${document.name}`);
    // In a real app, this would trigger the actual download
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
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Documents</h2>
        <span className="text-sm opacity-60">{documents.length} files</span>
      </div>

      <div className="space-y-3">
        {documents.length === 0 ? (
          <div className="text-center py-8 opacity-60">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No documents available</p>
          </div>
        ) : (
          documents.map((document, index) => {
            const Icon = getFileIcon(document.type);
            
            return (
              <motion.div
                key={document.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                  theme === 'dark'
                    ? 'bg-surface-dark/40 border-surface-dark/20 hover:border-surface-dark/40'
                    : 'bg-surface-light/40 border-surface-secondary-light/20 hover:border-surface-secondary-light/40'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${getFileTypeColor(document.type)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div>
                    <h3 className="font-medium">{document.name}</h3>
                    <div className="flex items-center space-x-4 text-sm opacity-60 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{document.uploadDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{document.uploadTime}</span>
                      </div>
                      <span>{document.size}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={() => handleDownload(document)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    theme === 'dark'
                      ? 'hover:bg-surface-dark text-text-secondary-dark hover:text-text-dark'
                      : 'hover:bg-surface-secondary-light text-text-secondary-light hover:text-text-light'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download className="w-5 h-5" />
                </motion.button>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default DocumentsSection;