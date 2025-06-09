import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  BarChart3, 
  Scan, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Bell, 
  Search,
  User,
  Shield,
  Globe,
  Smartphone,
  FileText,
  ChevronRight,
  Plus,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Menu,
  X,
  ChevronDown,
  Download,
  Calendar,
  Sun,
  Moon,
  Filter,
  Eye,
  MoreVertical,
  BellRing,
  Info,
  AlertCircle,
  PieChart,
  Activity,
  Target,
  Zap,
  RefreshCw,
  Send,
  Building,
  MapPin,
  Phone,
  Mail as MailIcon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [showAuditDetails, setShowAuditDetails] = useState(false);
  const [showNewAuditForm, setShowNewAuditForm] = useState(false);
  const [newAuditForm, setNewAuditForm] = useState({
    auditType: '',
    targetUrl: '',
    description: '',
    priority: 'medium',
    methodology: '',
    contactEmail: '',
    companyName: '',
    estimatedDuration: ''
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
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

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'scan', label: 'Scan', icon: Scan },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const stats = [
    { 
      label: 'Active Audits', 
      value: '2', 
      icon: Shield, 
      color: 'info',
      trend: '+12%',
      description: 'Currently running security audits'
    },
    { 
      label: 'Completed Audits', 
      value: '1', 
      icon: CheckCircle, 
      color: 'success',
      trend: '+25%',
      description: 'Successfully completed this month'
    },
    { 
      label: 'Security Score', 
      value: '82/100', 
      icon: TrendingUp, 
      color: 'warning',
      trend: '+5%',
      description: 'Overall security rating'
    },
    { 
      label: 'Vulnerabilities', 
      value: '3', 
      icon: AlertTriangle, 
      color: 'error',
      trend: '-15%',
      description: 'Critical issues found'
    },
  ];

  const recentAudits = [
    {
      id: 1,
      name: 'Network Audit',
      status: 'In Progress',
      progress: 65,
      date: '2025-05-10 - 2025-05-25',
      type: 'network',
      priority: 'high',
      testingPeriod: 'Sep 17 - Oct 16',
      reportDelivery: 'Oct 30, 2021',
      methodology: 'Network Security',
      vulnerabilities: {
        critical: 6,
        high: 6,
        medium: 0,
        low: 8,
        informational: 2,
        total: 22
      },
      testingProgress: 65
    },
    {
      id: 2,
      name: 'Web App Audit',
      status: 'Scheduled',
      progress: 0,
      date: '2025-05-20 - 2025-06-05',
      type: 'web',
      priority: 'medium',
      testingPeriod: 'May 20 - Jun 05',
      reportDelivery: 'Jun 15, 2025',
      methodology: 'Web Application',
      vulnerabilities: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        informational: 0,
        total: 0
      },
      testingProgress: 0
    },
    {
      id: 3,
      name: 'Cloud Audit',
      status: 'Completed',
      progress: 100,
      date: '2025-04-15 - 2025-04-30',
      type: 'cloud',
      priority: 'low',
      testingPeriod: 'Apr 15 - Apr 30',
      reportDelivery: 'May 10, 2025',
      methodology: 'Cloud Infrastructure',
      vulnerabilities: {
        critical: 2,
        high: 4,
        medium: 3,
        low: 5,
        informational: 1,
        total: 15
      },
      testingProgress: 100
    }
  ];

  const notifications = [
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
    },
    {
      id: 3,
      title: 'Cloud Audit Completed',
      description: 'Your cloud infrastructure audit has been completed successfully with no critical issues',
      time: '3 days ago',
      type: 'success',
      unread: false,
      icon: CheckCircle
    },
    {
      id: 4,
      title: 'Security Certificate Expiring',
      description: 'Your SSL certificate will expire in 30 days. Renewal recommended',
      time: '5 days ago',
      type: 'warning',
      unread: false,
      icon: AlertCircle
    }
  ];

  const quickActions = [
    { label: 'Web Scan', icon: Globe, color: 'info', description: 'Scan web applications' },
    { label: 'Port Scan', icon: Shield, color: 'success', description: 'Network port analysis' },
    { label: 'Mobile Check', icon: Smartphone, color: 'secondary', description: 'Mobile app security' },
    { label: 'Report', icon: FileText, color: 'warning', description: 'Generate reports' }
  ];

  // Mock documents data
  const documents = [
    {
      id: 1,
      name: 'Network Security Audit Report',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2025-01-15',
      uploadTime: '14:30',
      status: 'completed',
      category: 'audit-report'
    },
    {
      id: 2,
      name: 'Vulnerability Assessment Summary',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2025-01-14',
      uploadTime: '09:15',
      status: 'completed',
      category: 'vulnerability'
    },
    {
      id: 3,
      name: 'Compliance Certificate',
      type: 'PDF',
      size: '856 KB',
      uploadDate: '2025-01-12',
      uploadTime: '16:45',
      status: 'completed',
      category: 'certificate'
    },
    {
      id: 4,
      name: 'Security Policy Document',
      type: 'PDF',
      size: '3.2 MB',
      uploadDate: '2025-01-10',
      uploadTime: '11:20',
      status: 'processing',
      category: 'policy'
    }
  ];

  const getColorClasses = (color, variant = 'bg') => {
    const colorMap = {
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
    return colorMap[color]?.[variant] || colorMap.info[variant];
  };

  const handleDownload = (document) => {
    console.log(`Downloading ${document.name}`);
  };

  const handlePreview = (document) => {
    console.log(`Previewing ${document.name}`);
  };

  const handleAuditClick = (audit) => {
    setSelectedAudit(audit);
    setShowAuditDetails(true);
  };

  const handleReaudit = () => {
    if (selectedAudit) {
      // Update the audit status to scheduled
      const updatedAudits = recentAudits.map(audit => 
        audit.id === selectedAudit.id 
          ? { ...audit, status: 'Scheduled', progress: 0 }
          : audit
      );
      setShowAuditDetails(false);
      setSelectedAudit(null);
      // In a real app, you would update the state properly
      console.log('Re-audit scheduled for:', selectedAudit.name);
    }
  };

  const handleNewAuditSubmit = (e) => {
    e.preventDefault();
    console.log('New audit request:', newAuditForm);
    setShowNewAuditForm(false);
    setNewAuditForm({
      auditType: '',
      targetUrl: '',
      description: '',
      priority: 'medium',
      methodology: '',
      contactEmail: '',
      companyName: '',
      estimatedDuration: ''
    });
  };

  const handleNewAuditChange = (field, value) => {
    setNewAuditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-background-dark text-text-dark' 
        : 'bg-background-light text-text-light'
    }`}>
      {/* Dark Mode Background Effects */}
      {theme === 'dark' && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-dark-mesh opacity-50" />
        </div>
      )}

      {/* Glassmorphism Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed left-0 top-0 h-full w-70 z-50 backdrop-blur-xl border-r ${
              theme === 'dark' 
                ? 'bg-surface-dark/20 border-surface-secondary-dark/20 shadow-dark-elevated' 
                : 'bg-surface-light/20 border-gray-200/20 shadow-xl'
            }`}
            style={{
              background: theme === 'dark' 
                ? 'rgba(30, 41, 59, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Logo */}
            <div className={`p-6 border-b ${
              theme === 'dark' ? 'border-surface-secondary-dark/20' : 'border-gray-200/20'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-xl flex items-center justify-center ${
                    theme === 'dark' ? 'shadow-glow' : 'shadow-lg'
                  }`}>
                    <span className="text-white font-bold text-lg">BC</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-secondary-dark to-accent-dark bg-clip-text text-transparent">
                      BCBUZZ
                    </h1>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                    }`}>Security Platform</p>
                  </div>
                </div>
                {/* Close Sidebar Button */}
                <motion.button
                  onClick={() => setSidebarOpen(false)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'hover:bg-surface-secondary-dark/30 text-text-secondary-dark hover:text-text-dark' 
                      : 'hover:bg-gray-100/50 text-text-secondary-light hover:text-text-light'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 flex-1">
              <div className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? theme === 'dark'
                            ? 'bg-gradient-to-r from-secondary-dark/30 to-accent-dark/30 text-secondary-dark border border-secondary-dark/30 shadow-inner-glow backdrop-blur-sm'
                            : 'bg-gradient-to-r from-secondary-dark/20 to-accent-dark/20 text-blue-600 border border-blue-200/50 shadow-sm backdrop-blur-sm'
                          : theme === 'dark'
                            ? 'hover:bg-surface-secondary-dark/20 text-text-secondary-dark hover:text-text-dark backdrop-blur-sm'
                            : 'hover:bg-gray-50/50 text-text-secondary-light hover:text-text-light backdrop-blur-sm'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className={`w-5 h-5 transition-transform duration-200 ${
                        isActive ? 'scale-110' : 'group-hover:scale-105'
                      }`} />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="ml-auto w-2 h-2 bg-secondary-dark rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </nav>

            {/* User Profile */}
            <div className={`p-4 border-t ${
              theme === 'dark' ? 'border-surface-secondary-dark/20' : 'border-gray-200/20'
            }`}>
              <div className={`flex items-center space-x-3 p-3 rounded-xl backdrop-blur-sm ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-secondary-dark/20 to-accent-dark/20 border border-secondary-dark/20 shadow-dark-card' 
                  : 'bg-gradient-to-r from-blue-50/50 to-sky-50/50 border border-blue-100/50'
              }`}>
                <div className={`w-10 h-10 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-full flex items-center justify-center ${
                  theme === 'dark' ? 'shadow-glow' : 'shadow-lg'
                }`}>
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Test User</p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                  }`}>test@bcbuzz.com</p>
                </div>
              </div>
              
              {/* Logout Button */}
              <motion.button
                className={`w-full flex items-center space-x-3 px-4 py-3 mt-3 rounded-xl transition-all duration-200 backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'hover:bg-error-dark/20 text-error-dark hover:text-red-300 border border-transparent hover:border-error-dark/30'
                    : 'hover:bg-red-50/50 text-red-600 hover:text-red-700 border border-transparent hover:border-red-200/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Responsive */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'lg:ml-70' : 'ml-0'
        }`}
      >
        {/* Header */}
        <header className={`${
          theme === 'dark' 
            ? 'bg-surface-dark/80 border-b border-surface-secondary-dark/30 shadow-dark-card' 
            : 'bg-surface-light/80 border-b border-gray-200'
        } backdrop-blur-xl sticky top-0 z-40`}>
          <div className="flex items-center justify-between p-4 lg:p-6">
            <div className="flex items-center space-x-4">
              {/* Sidebar Toggle Button */}
              <motion.button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'hover:bg-surface-secondary-dark/50 text-text-secondary-dark hover:text-text-dark' 
                    : 'hover:bg-gray-100 text-text-secondary-light hover:text-text-light'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
              
              {/* Logo when sidebar is closed */}
              {!sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3"
                >
                  <div className={`w-8 h-8 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-lg flex items-center justify-center ${
                    theme === 'dark' ? 'shadow-glow' : 'shadow-lg'
                  }`}>
                    <span className="text-white font-bold text-sm">BC</span>
                  </div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-secondary-dark to-accent-dark bg-clip-text text-transparent hidden sm:block">
                    BCBUZZ
                  </h1>
                </motion.div>
              )}
              
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold">Welcome back, Test</h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                }`}>Here's an overview of your security audits and account</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'hover:bg-surface-secondary-dark/50 text-text-secondary-dark hover:text-text-dark' 
                    : 'hover:bg-gray-100 text-text-secondary-light hover:text-text-light'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" />
                )}
              </motion.button>

              {/* Search - Hidden on mobile */}
              <div className="relative hidden md:block">
                <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                }`} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 rounded-lg border transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark placeholder:text-text-secondary-dark focus:border-secondary-dark shadow-dark-card'
                      : 'bg-gray-50 border-gray-200 text-text-light placeholder:text-text-secondary-light focus:border-blue-300'
                  } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                />
              </div>

              {/* Notifications */}
              <motion.button
                className={`relative p-2 rounded-lg transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'hover:bg-surface-secondary-dark/50 text-text-secondary-dark hover:text-text-dark' 
                    : 'hover:bg-gray-100 text-text-secondary-light hover:text-text-light'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-dark rounded-full animate-pulse"></span>
              </motion.button>

              {/* User Profile Dropdown (when sidebar is closed) */}
              {!sidebarOpen && (
                <div className="relative">
                  <motion.button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                      theme === 'dark' 
                        ? 'hover:bg-surface-secondary-dark/50' 
                        : 'hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'shadow-glow' : 'shadow-lg'
                    }`}>
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="font-medium text-sm">Test User</p>
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                      }`}>test@bcbuzz.com</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 hidden lg:block ${
                      userDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </motion.button>

                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 top-full mt-2 w-64 ${
                          theme === 'dark'
                            ? 'bg-surface-dark/95 border border-surface-secondary-dark/30 shadow-dark-elevated'
                            : 'bg-surface-light border border-gray-200'
                        } rounded-xl backdrop-blur-xl z-50`}
                      >
                        {/* User Info */}
                        <div className={`p-4 border-b ${
                          theme === 'dark' ? 'border-surface-secondary-dark/30' : 'border-gray-200'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-full flex items-center justify-center ${
                              theme === 'dark' ? 'shadow-glow' : 'shadow-lg'
                            }`}>
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">Test User</p>
                              <p className={`text-sm ${
                                theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                              }`}>test@bcbuzz.com</p>
                              <p className={`text-xs ${
                                theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                              }`}>BCBUZZ Technologies</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                            theme === 'dark' 
                              ? 'hover:bg-surface-secondary-dark/50' 
                              : 'hover:bg-gray-50'
                          }`}>
                            <Settings className="w-4 h-4" />
                            <span className="text-sm">Account Settings</span>
                          </button>
                          <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                            theme === 'dark' 
                              ? 'hover:bg-surface-secondary-dark/50' 
                              : 'hover:bg-gray-50'
                          }`}>
                            <HelpCircle className="w-4 h-4" />
                            <span className="text-sm">Help & Support</span>
                          </button>
                        </div>

                        {/* Logout */}
                        <div className={`p-2 border-t ${
                          theme === 'dark' ? 'border-surface-secondary-dark/30' : 'border-gray-200'
                        }`}>
                          <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                            theme === 'dark'
                              ? 'hover:bg-error-dark/20 text-error-dark'
                              : 'hover:bg-red-50 text-red-600'
                          }`}>
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-6 space-y-6">
          {/* Mobile Header */}
          <div className="block sm:hidden">
            <h1 className="text-xl font-bold">Welcome back, Test</h1>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
            }`}>Here's an overview of your security audits</p>
          </div>

          {/* Stats Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 lg:p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg group cursor-pointer backdrop-blur-sm ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-surface-dark/80 to-surface-secondary-dark/50 border-surface-secondary-dark/30 hover:border-secondary-dark/50 shadow-dark-card hover:shadow-dark-elevated'
                      : 'bg-surface-light/80 border-gray-200 hover:border-blue-200 hover:shadow-blue-100/50'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm mb-1 ${
                        theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                      }`}>{stat.label}</p>
                      <p className="text-xl lg:text-2xl font-bold mb-1">{stat.value}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getColorClasses(stat.color, 'bg')} ${getColorClasses(stat.color, 'text')}`}>
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${getColorClasses(stat.color, 'bg')} ${getColorClasses(stat.color, 'text')}`}>
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                  </div>
                  <p className={`text-xs mt-3 ${
                    theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                  }`}>{stat.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Audits */}
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
                    <button className="text-secondary-dark hover:underline text-sm font-medium">View All →</button>
                  </div>
                </div>

                <div className="space-y-4">
                  {recentAudits.map((audit) => (
                    <motion.div
                      key={audit.id}
                      onClick={() => handleAuditClick(audit)}
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer group backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'border-surface-secondary-dark/30 hover:bg-surface-secondary-dark/30 hover:border-secondary-dark/50 shadow-dark-card'
                          : 'border-gray-200 hover:bg-gray-50 hover:border-blue-200'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            audit.type === 'network' ? getColorClasses('info', 'bg') + ' ' + getColorClasses('info', 'text') :
                            audit.type === 'web' ? getColorClasses('success', 'bg') + ' ' + getColorClasses('success', 'text') :
                            getColorClasses('secondary', 'bg') + ' ' + getColorClasses('secondary', 'text')
                          }`}>
                            {audit.type === 'network' ? <Shield className="w-4 h-4" /> :
                             audit.type === 'web' ? <Globe className="w-4 h-4" /> :
                             <Shield className="w-4 h-4" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{audit.name}</h4>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                            }`}>{audit.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            audit.status === 'Completed' ? getColorClasses('success', 'bg') + ' ' + getColorClasses('success', 'text') :
                            audit.status === 'In Progress' ? getColorClasses('info', 'bg') + ' ' + getColorClasses('info', 'text') :
                            getColorClasses('warning', 'bg') + ' ' + getColorClasses('warning', 'text')
                          }`}>
                            {audit.status}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            audit.priority === 'high' ? getColorClasses('error', 'bg') + ' ' + getColorClasses('error', 'text') :
                            audit.priority === 'medium' ? getColorClasses('warning', 'bg') + ' ' + getColorClasses('warning', 'text') :
                            getColorClasses('success', 'bg') + ' ' + getColorClasses('success', 'text')
                          }`}>
                            {audit.priority}
                          </span>
                        </div>
                      </div>
                      
                      {audit.progress > 0 && audit.progress < 100 && (
                        <div className={`w-full rounded-full h-2 ${
                          theme === 'dark' ? 'bg-surface-secondary-dark' : 'bg-gray-200'
                        }`}>
                          <div
                            className="bg-gradient-to-r from-secondary-dark to-accent-dark h-2 rounded-full transition-all duration-500"
                            style={{ width: `${audit.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </motion.div>
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

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Document Downloads */}
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Documents</h3>
                  <button className="text-secondary-dark hover:underline text-sm font-medium">View All →</button>
                </div>
                
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <motion.div
                      key={doc.id}
                      className={`p-3 rounded-lg border transition-all duration-200 group backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'border-surface-secondary-dark/30 hover:bg-surface-secondary-dark/30 shadow-dark-card'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`p-2 rounded-lg ${getColorClasses('info', 'bg')} ${getColorClasses('info', 'text')}`}>
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{doc.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`text-xs ${
                                theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                              }`}>{doc.size}</span>
                              <span className={`text-xs ${
                                theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                              }`}>•</span>
                              <span className={`text-xs ${
                                theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                              }`}>{doc.type}</span>
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                              <Calendar className={`w-3 h-3 ${
                                theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                              }`} />
                              <span className={`text-xs ${
                                theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                              }`}>{doc.uploadDate} at {doc.uploadTime}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <motion.button
                            onClick={() => handlePreview(doc)}
                            className={`p-1.5 rounded transition-colors ${
                              theme === 'dark' 
                                ? 'hover:bg-surface-secondary-dark text-text-secondary-dark hover:text-text-dark' 
                                : 'hover:bg-gray-100 text-text-secondary-light hover:text-text-light'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Preview"
                          >
                            <Eye className="w-3 h-3" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDownload(doc)}
                            className={`p-1.5 rounded transition-colors ${
                              theme === 'dark' 
                                ? 'hover:bg-surface-secondary-dark text-text-secondary-dark hover:text-text-dark' 
                                : 'hover:bg-gray-100 text-text-secondary-light hover:text-text-light'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Download"
                          >
                            <Download className="w-3 h-3" />
                          </motion.button>
                          <motion.button
                            className={`p-1.5 rounded transition-colors ${
                              theme === 'dark' 
                                ? 'hover:bg-surface-secondary-dark text-text-secondary-dark hover:text-text-dark' 
                                : 'hover:bg-gray-100 text-text-secondary-light hover:text-text-light'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="More options"
                          >
                            <MoreVertical className="w-3 h-3" />
                          </motion.button>
                        </div>
                      </div>
                      
                      {doc.status === 'processing' && (
                        <div className="mt-2">
                          <div className={`w-full rounded-full h-1 ${
                            theme === 'dark' ? 'bg-surface-secondary-dark' : 'bg-gray-200'
                          }`}>
                            <div className="bg-gradient-to-r from-secondary-dark to-accent-dark h-1 rounded-full w-3/4 animate-pulse"></div>
                          </div>
                          <span className={`text-xs mt-1 ${getColorClasses('warning', 'text')}`}>Processing...</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced Notifications */}
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
                        {notifications.filter(n => n.unread).length}
                      </span>
                    </div>
                  </div>
                  <button className="text-secondary-dark hover:underline text-sm font-medium">See All →</button>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <motion.div 
                        key={notification.id} 
                        className={`relative p-4 rounded-xl transition-all duration-200 cursor-pointer group backdrop-blur-sm ${
                          notification.unread 
                            ? theme === 'dark' 
                              ? 'bg-gradient-to-r from-secondary-dark/10 to-accent-dark/10 border border-secondary-dark/20 shadow-inner-glow' 
                              : 'bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200'
                            : theme === 'dark'
                              ? 'hover:bg-surface-secondary-dark/30'
                              : 'hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.01, x: 2 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: notification.id * 0.1 }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg mt-0.5 ${
                            notification.type === 'success' ? getColorClasses('success', 'bg') + ' ' + getColorClasses('success', 'text') :
                            notification.type === 'warning' ? getColorClasses('warning', 'bg') + ' ' + getColorClasses('warning', 'text') :
                            getColorClasses('info', 'bg') + ' ' + getColorClasses('info', 'text')
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
                                <p className={`text-xs leading-relaxed ${
                                  theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                                }`}>{notification.description}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Clock className={`w-3 h-3 ${
                                    theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                                  }`} />
                                  <span className={`text-xs ${
                                    theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                                  }`}>{notification.time}</span>
                                </div>
                              </div>
                              {notification.unread && (
                                <motion.div 
                                  className="w-2 h-2 bg-secondary-dark rounded-full ml-2 mt-1"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Hover actions */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button className={`p-1 rounded transition-colors ${
                            theme === 'dark' 
                              ? 'hover:bg-surface-secondary-dark text-text-secondary-dark hover:text-text-dark' 
                              : 'hover:bg-gray-100 text-text-secondary-light hover:text-text-light'
                          }`}>
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Mark all as read button */}
                <motion.button
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
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.label}
                        className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center space-y-2 group backdrop-blur-sm ${
                          theme === 'dark'
                            ? 'border-surface-secondary-dark/30 hover:bg-surface-secondary-dark/30 hover:border-secondary-dark/50 shadow-dark-card hover:shadow-dark-elevated'
                            : 'border-gray-200 hover:bg-gray-50 hover:border-blue-200'
                        }`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`p-2 rounded-lg transition-all duration-300 group-hover:scale-110 ${getColorClasses(action.color, 'bg')} ${getColorClasses(action.color, 'text')}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-center">
                          <span className="text-xs font-medium block">{action.label}</span>
                          <span className={`text-xs ${
                            theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                          }`}>{action.description}</span>
                        </div>
                      </motion.button>
                    );
                  })}
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

      {/* Audit Details Popup */}
      <AnimatePresence>
        {showAuditDetails && selectedAudit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowAuditDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-xl ${
                theme === 'dark'
                  ? 'bg-surface-dark/95 border border-surface-secondary-dark/30 shadow-dark-elevated'
                  : 'bg-surface-light/95 border border-gray-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`p-6 border-b ${
                theme === 'dark' ? 'border-surface-secondary-dark/30' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${
                      selectedAudit.type === 'network' ? getColorClasses('info', 'bg') + ' ' + getColorClasses('info', 'text') :
                      selectedAudit.type === 'web' ? getColorClasses('success', 'bg') + ' ' + getColorClasses('success', 'text') :
                      getColorClasses('secondary', 'bg') + ' ' + getColorClasses('secondary', 'text')
                    }`}>
                      {selectedAudit.type === 'network' ? <Shield className="w-6 h-6" /> :
                       selectedAudit.type === 'web' ? <Globe className="w-6 h-6" /> :
                       <Shield className="w-6 h-6" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedAudit.name}</h2>
                      <p className={`${
                        theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                      }`}>Detailed audit information and results</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAuditDetails(false)}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-surface-secondary-dark/50' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Overview Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-surface-secondary-dark/30' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-secondary-dark" />
                      <span className="text-sm font-medium">Testing Period</span>
                    </div>
                    <p className="font-semibold">{selectedAudit.testingPeriod}</p>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                    }`}>Expired 2 weeks ago</p>
                  </div>

                  <div className={`p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-surface-secondary-dark/30' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="w-4 h-4 text-secondary-dark" />
                      <span className="text-sm font-medium">Report Delivery</span>
                    </div>
                    <p className="font-semibold">{selectedAudit.reportDelivery}</p>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                    }`}>Delivered 3 days ago</p>
                  </div>

                  <div className={`p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-surface-secondary-dark/30' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-4 h-4 text-secondary-dark" />
                      <span className="text-sm font-medium">Methodology</span>
                    </div>
                    <p className="font-semibold">{selectedAudit.methodology}</p>
                  </div>

                  <div className={`p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-surface-secondary-dark/30' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="w-4 h-4 text-secondary-dark" />
                      <span className="text-sm font-medium">Testing Progress</span>
                    </div>
                    <p className="font-semibold">{selectedAudit.testingProgress}% of tests complete</p>
                    <div className={`w-full rounded-full h-2 mt-2 ${
                      theme === 'dark' ? 'bg-surface-secondary-dark' : 'bg-gray-200'
                    }`}>
                      <div
                        className="bg-gradient-to-r from-secondary-dark to-accent-dark h-2 rounded-full"
                        style={{ width: `${selectedAudit.testingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Status and Vulnerabilities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Status */}
                  <div className={`p-6 rounded-xl ${
                    theme === 'dark' ? 'bg-surface-secondary-dark/30' : 'bg-gray-50'
                  }`}>
                    <h3 className="text-lg font-semibold mb-4">Status</h3>
                    <div className="space-y-3">
                      {[
                        { status: 'Draft', description: 'Bugcrowd is setting up your pen test', completed: true },
                        { status: 'Launching', description: 'Your pen test is scheduled for launch', completed: true },
                        { status: 'In progress', description: 'Pen testers are testing and validating', completed: true },
                        { status: 'Finalizing', description: 'Bugcrowd is preparing reports', completed: selectedAudit.status === 'Completed' },
                        { status: 'Completed', description: 'Your report is ready for review', completed: selectedAudit.status === 'Completed' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            item.completed 
                              ? 'bg-success-dark text-white' 
                              : theme === 'dark' ? 'bg-surface-secondary-dark' : 'bg-gray-200'
                          }`}>
                            {item.completed && <CheckCircle className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-medium">{item.status}</p>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                            }`}>{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="text-secondary-dark hover:underline text-sm mt-4">View reports</button>
                  </div>

                  {/* Vulnerabilities */}
                  <div className={`p-6 rounded-xl ${
                    theme === 'dark' ? 'bg-surface-secondary-dark/30' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Reported Vulnerabilities</h3>
                      <button className="text-secondary-dark hover:underline text-sm">View all</button>
                    </div>
                    
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative w-32 h-32">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={theme === 'dark' ? '#334155' : '#e5e7eb'}
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#dc2626"
                            strokeWidth="3"
                            strokeDasharray="30, 70"
                            strokeLinecap="round"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="3"
                            strokeDasharray="30, 70"
                            strokeDashoffset="-30"
                            strokeLinecap="round"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                            strokeDasharray="40, 60"
                            strokeDashoffset="-60"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-sm font-medium">Reported</p>
                            <p className="text-2xl font-bold">{selectedAudit.vulnerabilities.total}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { label: 'Critical', count: selectedAudit.vulnerabilities.critical, color: 'bg-red-500' },
                        { label: 'High', count: selectedAudit.vulnerabilities.high, color: 'bg-orange-500' },
                        { label: 'Medium', count: selectedAudit.vulnerabilities.medium, color: 'bg-yellow-500' },
                        { label: 'Low', count: selectedAudit.vulnerabilities.low, color: 'bg-green-500' },
                        { label: 'Info', count: selectedAudit.vulnerabilities.informational, color: 'bg-blue-500' }
                      ].map((vuln, index) => (
                        <div key={index} className="text-center">
                          <div className={`${vuln.color} text-white text-xs px-2 py-1 rounded mb-1`}>
                            {vuln.label}
                          </div>
                          <p className="text-xl font-bold">{vuln.count}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Remediation Section */}
                <div className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-surface-secondary-dark/30' : 'bg-gray-50'
                }`}>
                  <h3 className="text-lg font-semibold mb-4">Remediation Recommendations</h3>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border-l-4 border-red-500 ${
                      theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50'
                    }`}>
                      <h4 className="font-medium text-red-600 dark:text-red-400">Critical: SQL Injection Vulnerability</h4>
                      <p className={`text-sm mt-1 ${
                        theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                      }`}>Implement parameterized queries and input validation to prevent SQL injection attacks.</p>
                    </div>
                    <div className={`p-4 rounded-lg border-l-4 border-orange-500 ${
                      theme === 'dark' ? 'bg-orange-500/10' : 'bg-orange-50'
                    }`}>
                      <h4 className="font-medium text-orange-600 dark:text-orange-400">High: Cross-Site Scripting (XSS)</h4>
                      <p className={`text-sm mt-1 ${
                        theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                      }`}>Implement proper output encoding and Content Security Policy headers.</p>
                    </div>
                    <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
                      theme === 'dark' ? 'bg-green-500/10' : 'bg-green-50'
                    }`}>
                      <h4 className="font-medium text-green-600 dark:text-green-400">Low: Missing Security Headers</h4>
                      <p className={`text-sm mt-1 ${
                        theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                      }`}>Add security headers like X-Frame-Options and X-Content-Type-Options.</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setShowAuditDetails(false)}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'bg-surface-secondary-dark/50 hover:bg-surface-secondary-dark text-text-dark'
                        : 'bg-gray-100 hover:bg-gray-200 text-text-light'
                    }`}
                  >
                    Close
                  </button>
                  <motion.button
                    onClick={handleReaudit}
                    className="px-6 py-2 bg-gradient-to-r from-secondary-dark to-accent-dark text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Re-audit</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Audit Form Popup */}
      <AnimatePresence>
        {showNewAuditForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowNewAuditForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-xl ${
                theme === 'dark'
                  ? 'bg-surface-dark/95 border border-surface-secondary-dark/30 shadow-dark-elevated'
                  : 'bg-surface-light/95 border border-gray-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`p-6 border-b ${
                theme === 'dark' ? 'border-surface-secondary-dark/30' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-secondary-dark to-accent-dark text-white">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Request New Audit</h2>
                      <p className={`${
                        theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                      }`}>Fill out the form to request a new security audit</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNewAuditForm(false)}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-surface-secondary-dark/50' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleNewAuditSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Audit Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Audit Type</label>
                    <select
                      value={newAuditForm.auditType}
                      onChange={(e) => handleNewAuditChange('auditType', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark'
                          : 'bg-gray-50 border-gray-200 text-text-light'
                      } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                      required
                    >
                      <option value="">Select audit type</option>
                      <option value="web">Web Application</option>
                      <option value="network">Network Security</option>
                      <option value="cloud">Cloud Infrastructure</option>
                      <option value="mobile">Mobile Application</option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select
                      value={newAuditForm.priority}
                      onChange={(e) => handleNewAuditChange('priority', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark'
                          : 'bg-gray-50 border-gray-200 text-text-light'
                      } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                {/* Target URL */}
                <div>
                  <label className="block text-sm font-medium mb-2">Target URL/IP</label>
                  <input
                    type="text"
                    value={newAuditForm.targetUrl}
                    onChange={(e) => handleNewAuditChange('targetUrl', e.target.value)}
                    placeholder="https://example.com or 192.168.1.1"
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      theme === 'dark'
                        ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark placeholder:text-text-secondary-dark'
                        : 'bg-gray-50 border-gray-200 text-text-light placeholder:text-text-secondary-light'
                    } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      value={newAuditForm.companyName}
                      onChange={(e) => handleNewAuditChange('companyName', e.target.value)}
                      placeholder="Your company name"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark placeholder:text-text-secondary-dark'
                          : 'bg-gray-50 border-gray-200 text-text-light placeholder:text-text-secondary-light'
                      } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                      required
                    />
                  </div>

                  {/* Contact Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={newAuditForm.contactEmail}
                      onChange={(e) => handleNewAuditChange('contactEmail', e.target.value)}
                      placeholder="contact@company.com"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark placeholder:text-text-secondary-dark'
                          : 'bg-gray-50 border-gray-200 text-text-light placeholder:text-text-secondary-light'
                      } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Methodology */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Methodology</label>
                    <select
                      value={newAuditForm.methodology}
                      onChange={(e) => handleNewAuditChange('methodology', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark'
                          : 'bg-gray-50 border-gray-200 text-text-light'
                      } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                    >
                      <option value="">Select methodology</option>
                      <option value="owasp">OWASP Testing Guide</option>
                      <option value="nist">NIST Framework</option>
                      <option value="pci">PCI DSS</option>
                      <option value="iso27001">ISO 27001</option>
                    </select>
                  </div>

                  {/* Estimated Duration */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Estimated Duration</label>
                    <select
                      value={newAuditForm.estimatedDuration}
                      onChange={(e) => handleNewAuditChange('estimatedDuration', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark'
                          : 'bg-gray-50 border-gray-200 text-text-light'
                      } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                    >
                      <option value="">Select duration</option>
                      <option value="1-2 weeks">1-2 weeks</option>
                      <option value="3-4 weeks">3-4 weeks</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="3+ months">3+ months</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">Description & Requirements</label>
                  <textarea
                    value={newAuditForm.description}
                    onChange={(e) => handleNewAuditChange('description', e.target.value)}
                    placeholder="Describe your audit requirements, scope, and any specific concerns..."
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors resize-none ${
                      theme === 'dark'
                        ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark placeholder:text-text-secondary-dark'
                        : 'bg-gray-50 border-gray-200 text-text-light placeholder:text-text-secondary-light'
                    } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewAuditForm(false)}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'bg-surface-secondary-dark/50 hover:bg-surface-secondary-dark text-text-dark'
                        : 'bg-gray-100 hover:bg-gray-200 text-text-light'
                    }`}
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-secondary-dark to-accent-dark text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Request</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;