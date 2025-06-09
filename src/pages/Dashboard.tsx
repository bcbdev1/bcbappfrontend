import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Import all dashboard components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import Sidebar from '../components/dashboard/Sidebar';
import StatsCards from '../components/dashboard/StatsCards';
import AuditsList from '../components/dashboard/AuditsList';
import DocumentsSection from '../components/dashboard/DocumentsSection';
import NotificationsPanel from '../components/dashboard/NotificationsPanel';
import AuditDetailsModal from '../components/dashboard/AuditDetailsModal';
import NewAuditModal from '../components/dashboard/NewAuditModal';

const Dashboard = () => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isNewAuditModalOpen, setIsNewAuditModalOpen] = useState(false);

  // Mock data
  const user = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Security Analyst'
  };

  const stats = {
    activeAudits: 2,
    completedAudits: 1,
    securityScore: 82,
    totalVulnerabilities: 24
  };

  const [audits, setAudits] = useState([
    {
      id: '1',
      name: 'Network Audit',
      type: 'network' as const,
      status: 'in-progress' as const,
      progress: 65,
      startDate: '2025-05-10',
      endDate: '2025-05-25',
    },
    {
      id: '2',
      name: 'Web App Audit',
      type: 'web' as const,
      status: 'scheduled' as const,
      progress: 0,
      startDate: '2025-05-20',
      endDate: '2025-06-05',
    },
    {
      id: '3',
      name: 'Cloud Audit',
      type: 'cloud' as const,
      status: 'completed' as const,
      progress: 100,
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

  const documents = [
    {
      id: '1',
      name: 'Security_Audit_Report_Q1_2025.pdf',
      type: 'pdf' as const,
      size: '2.4 MB',
      uploadDate: '2025-01-15',
      uploadTime: '14:30',
      auditId: '3'
    },
    {
      id: '2',
      name: 'Vulnerability_Assessment.xlsx',
      type: 'xlsx' as const,
      size: '1.8 MB',
      uploadDate: '2025-01-10',
      uploadTime: '09:15',
      auditId: '3'
    }
  ];

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'info' as const,
      title: 'Network Audit Updated',
      message: 'Your Network Audit report has been updated',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Security Vulnerability Detected',
      message: 'Security vulnerability detected in web application',
      time: '1 day ago',
      read: false
    },
    {
      id: '3',
      type: 'success' as const,
      title: 'Cloud Audit Completed',
      message: 'Cloud Audit completed successfully',
      time: '3 days ago',
      read: true
    }
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAuditClick = (audit: any) => {
    setSelectedAudit(audit);
    setIsAuditModalOpen(true);
  };

  const handleReAudit = (auditId: string) => {
    setAudits(prevAudits =>
      prevAudits.map(audit =>
        audit.id === auditId
          ? { ...audit, status: 'scheduled' as const, progress: 0 }
          : audit
      )
    );
    setIsAuditModalOpen(false);
  };

  const handleNewAuditSubmit = (auditData: any) => {
    const newAudit = {
      id: Date.now().toString(),
      name: `${auditData.auditType.charAt(0).toUpperCase() + auditData.auditType.slice(1)} Audit`,
      type: auditData.auditType,
      status: 'scheduled' as const,
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };
    setAudits(prev => [...prev, newAudit]);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'
    }`}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} user={user} />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-70' : 'ml-0'
      }`}>
        {/* Header */}
        <DashboardHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          user={user}
        />

        {/* Dashboard Content */}
        <main className="p-4 lg:p-6 space-y-6">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome back, {user.name.split(' ')[0]}!
            </h1>
            <p className="opacity-60">
              Here's an overview of your security audits and account
            </p>
          </motion.div>

          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Audits */}
            <div className="xl:col-span-2 space-y-6">
              <AuditsList
                audits={audits}
                onAuditClick={handleAuditClick}
                onRequestNewAudit={() => setIsNewAuditModalOpen(true)}
              />
            </div>

            {/* Right Column - Documents & Notifications */}
            <div className="space-y-6">
              <DocumentsSection documents={documents} />
              <NotificationsPanel
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onDismiss={handleDismissNotification}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AuditDetailsModal
        audit={selectedAudit}
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        onReAudit={handleReAudit}
      />

      <NewAuditModal
        isOpen={isNewAuditModalOpen}
        onClose={() => setIsNewAuditModalOpen(false)}
        onSubmit={handleNewAuditSubmit}
      />
    </div>
  );
};

export default Dashboard;