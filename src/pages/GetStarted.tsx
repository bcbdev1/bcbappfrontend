import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '../../components/Dashboard/Sidebar';
import Header from '../../components/Dashboard/Header';
import StatsCard from '../../components/Dashboard/StatsCard';
import AuditCard from '../../components/Dashboard/AuditCard';
import DocumentCard from '../../components/Dashboard/DocumentCard';
import NotificationCard from '../../components/Dashboard/NotificationCard';
import QuickActionCard from '../../components/Dashboard/QuickActionCard';
import AuditDetailsModal from '../../components/Dashboard/AuditDetailsModal';
import NewAuditFormModal from '../../components/Dashboard/NewAuditFormModal';
import ParticleText from '../../components/effects/ParticleText';
import { useTheme } from '../../context/ThemeContext';

// Import data arrays from data.js or directly define here
import {
  statsData,
  recentAuditsData,
  quickActionsData,
  documentsData
} from '../../data/index';
import { Filter, Plus, BellRing, Info, AlertTriangle, } from 'lucide-react';
import { ColorKey } from '../../types/index'
import { notificationsData } from '../../data';
// import { NotificationItem } from '../../types';

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [showAuditDetails, setShowAuditDetails] = useState(false);
  const [showNewAuditForm, setShowNewAuditForm] = useState(false);
  
  // ✅ Add ParticleText intro state
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard | BCBUZZ';
  }, []);

  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    // Navigation logic based on tab ID
    switch (id) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'projects':
        navigate('/projects');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'help':
        navigate('/help');
        break;
      default:
        navigate('/dashboard');
        break;
    }
  };

  // State for notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Network Audit Report Updated',
      description: 'Your network security audit report has been updated with new findings',
      time: '2 hours ago',
      type: 'info',
      unread: true,
      icon: Info
    },
    {
      id: 2,
      title: 'Critical Vulnerability Detected',
      description: 'High-severity vulnerability found in web application requiring immediate attention',
      time: '1 day ago',
      type: 'warning',
      unread: true,
      icon: AlertTriangle
    }
  ]);

  // Handlers
  const handleMarkRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleRemove = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const getColorClasses = (color: string, variant?: string): string => {
    const validColor = color as ColorKey;

    const colorMap: Record<string, Record<string, string>> = {
      info: {
        bg: theme === 'dark' ? 'bg-info/20' : 'bg-sky-50',
        text: theme === 'dark' ? 'text-info' : 'text-sky-600',
        border: theme === 'dark' ? 'border-info/30' : 'border-sky-200'
      },
      success: {
        bg: theme === 'dark' ? 'bg-success-dark/20' : 'bg-emerald-50',
        text: theme === 'dark' ? 'text-success-dark' : 'text-emerald-600',
        border: theme === 'dark' ? 'border-success-dark/30' : 'border-emerald-200'
      },
      warning: {
        bg: theme === 'dark' ? 'bg-warning-dark/20' : 'bg-amber-50',
        text: theme === 'dark' ? 'text-warning-dark' : 'text-amber-600',
        border: theme === 'dark' ? 'border-warning-dark/30' : 'border-amber-200'
      },
      error: {
        bg: theme === 'dark' ? 'bg-error-dark/20' : 'bg-red-50',
        text: theme === 'dark' ? 'text-error-dark' : 'text-red-600',
        border: theme === 'dark' ? 'border-error-dark/30' : 'border-red-200'
      },
      secondary: {
        bg: theme === 'dark' ? 'bg-secondary-dark/20' : 'bg-blue-50',
        text: theme === 'dark' ? 'text-secondary-dark' : 'text-blue-600',
        border: theme === 'dark' ? 'border-secondary-dark/30' : 'border-blue-200'
      }
    };

    return (
      colorMap[validColor]?.[variant || 'bg'] ||
      colorMap.info[variant || 'bg']
    );
  };

  const handleDownload = (document: any) => {
    console.log(`Downloading ${document.name}`);
  };

  const handlePreview = (document: any) => {
    console.log(`Previewing ${document.name}`);
  };

  const handleAuditClick = (audit: any) => {
    setSelectedAudit(audit);
    setShowAuditDetails(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (userDropdownOpen) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen]);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* ✅ Show ParticleText animation first */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <ParticleText onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* ✅ Show dashboard content after intro */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div
            className={`min-h-screen transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-background-dark text-text-dark'
                : 'bg-background-light text-text-light'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background Effects for dark mode */}
            {theme === 'dark' && (
              <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-dark-mesh opacity-50" />
              </div>
            )}

            {/* Sidebar */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleNavigation={handleNavigation}
              theme={theme}
            />

            {/* Main Content Area */}
            <div className={`${sidebarOpen ? 'lg:ml-70' : 'ml-0'} transition-all duration-300 ease-in-out`}>
              {/* Header */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                theme={theme}
                toggleTheme={toggleTheme}
                userDropdownOpen={userDropdownOpen}
                setUserDropdownOpen={setUserDropdownOpen}
                notifications={notifications}
                showNotifications={showNotifications}
                setShowNotifications={setShowNotifications}
                markAsRead={handleMarkRead}
                removeNotification={handleRemove}
                getColorClasses={getColorClasses}
              />

              {/* Mobile Header */}
              <div className="block sm:hidden px-6 py-4">
                <h1 className="text-xl font-bold">Welcome back, Test</h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                }`}>Here's an overview of your security audits</p>
              </div>

              {/* Dashboard Content */}
              <main className="p-4 lg:p-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {statsData.map((stat: any, index: any) => (
                    <StatsCard
                      key={index}
                      {...stat}
                      index={index}
                      theme={theme}
                      getColorClasses={getColorClasses}
                    />
                  ))}
                </div>

                {/* Recent Audits Section */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`p-4 lg:p-6 rounded-2xl border backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-surface-dark/80 to-surface-secondary-dark/50 border-surface-secondary-dark/30 shadow-dark-card'
                          : 'bg-surface-light/80 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg lg:text-xl font-semibold">Your Audits</h3>
                        <div className="flex items-center space-x-2">
                          <button className={`p-2 rounded-lg transition-all duration-200 ${
                            theme === 'dark'
                              ? 'hover:bg-surface-secondary-dark/50 text-text-secondary-dark hover:text-text-dark'
                              : 'hover:bg-gray-100 text-text-secondary-light hover:text-text-light'
                          }`}>
                            <Filter className="w-4 h-4" />
                          </button>
                          <button className="text-secondary-dark hover:underline text-sm font-medium">
                            View All →
                          </button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {recentAuditsData.map((audit: { id: React.Key | null | undefined; }) => (
                          <AuditCard
                            key={audit.id}
                            audit={audit}
                            onClick={() => handleAuditClick(audit)}
                            theme={theme}
                            getColorClasses={getColorClasses}
                          />
                        ))}
                      </div>
                      <motion.button
                        onClick={() => setShowNewAuditForm(true)}
                        className={`w-full mt-4 p-3 border-2 border-dashed rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group ${
                          theme === 'dark'
                            ? 'border-secondary-dark/30 text-secondary-dark hover:bg-secondary-dark/10 hover:border-secondary-dark/50'
                            : 'border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Plus className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
                        <span className="font-medium">Request New Audit</span>
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Right Sidebar - Documents + Notifications + Quick Actions */}
                  <div className="space-y-6">
                    {/* Documents */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className={`p-4 lg:p-6 rounded-2xl border backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-surface-dark/80 to-surface-secondary-dark/50 border-surface-secondary-dark/30 shadow-dark-card'
                          : 'bg-surface-light/80 border-gray-200'
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-4">Documents</h3>
                      <div className="space-y-3">
                        {documentsData.map((doc: { id: React.Key | null | undefined; }) => (
                          <DocumentCard
                            key={doc.id}
                            doc={doc}
                            onPreview={() => handlePreview(doc)}
                            onDownload={() => handleDownload(doc)}
                            theme={theme}
                            getColorClasses={getColorClasses}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Notifications */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className={`p-4 lg:p-6 rounded-2xl border backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-surface-dark/80 to-surface-secondary-dark/50 border-surface-secondary-dark/30 shadow-dark-card'
                          : 'bg-surface-light/80 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">Notifications</h3>
                          <div className="flex items-center space-x-1">
                            <BellRing className="w-4 h-4 text-secondary-dark" />
                            <span className="text-xs bg-error-dark text-white px-2 py-0.5 rounded-full">
                              {notificationsData.filter((n: { unread: any; }) => n.unread).length}
                            </span>
                          </div>
                        </div>
                        <button className="text-secondary-dark hover:underline text-sm font-medium">
                          See All →
                        </button>
                      </div>
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {notificationsData.map((notification) => (
                          <NotificationCard
                            key={notification.id}
                            notification={notification}
                            theme={theme}
                            getColorClasses={getColorClasses} 
                            onMarkRead={function (): void {
                              throw new Error('Function not implemented.');
                            }} 
                            onRemove={function (): void {
                              throw new Error('Function not implemented.');
                            }}                    
                          />
                        ))}
                      </div>
                      <motion.button 
                        onClick={markAllAsRead}
                        className={`w-full mt-4 p-2 text-sm rounded-lg transition-all duration-200 ${
                          theme === 'dark'
                            ? 'text-secondary-dark hover:bg-secondary-dark/10'
                            : 'text-blue-600 hover:bg-blue-50'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        Mark all as read
                      </motion.button>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className={`p-4 lg:p-6 rounded-2xl border backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-surface-dark/80 to-surface-secondary-dark/50 border-surface-secondary-dark/30 shadow-dark-card'
                          : 'bg-surface-light/80 border-gray-200'
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {quickActionsData.map((action: { label: React.Key | null | undefined; }) => (
                          <QuickActionCard
                            key={action.label}
                            action={action}
                            theme={theme}
                            getColorClasses={getColorClasses}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Audit Details Modal */}
            <AuditDetailsModal
              show={showAuditDetails}
              onClose={() => setShowAuditDetails(false)}
              audit={selectedAudit}
              theme={theme}
              getColorClasses={getColorClasses}
            />

            {/* New Audit Form Modal */}
            <NewAuditFormModal
              show={showNewAuditForm}
              onClose={() => setShowNewAuditForm(false)}
              theme={theme}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;