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
  MoreVertical
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownOpen) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen]);

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
      priority: 'high'
    },
    {
      id: 2,
      name: 'Web App Audit',
      status: 'Scheduled',
      progress: 0,
      date: '2025-05-20 - 2025-06-05',
      type: 'web',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Cloud Audit',
      status: 'Completed',
      progress: 100,
      date: '2025-04-15 - 2025-04-30',
      type: 'cloud',
      priority: 'low'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Your Network Audit report has been updated',
      time: '2 hours ago',
      type: 'info',
      unread: true
    },
    {
      id: 2,
      title: 'Security vulnerability detected in web application',
      time: '1 day ago',
      type: 'warning',
      unread: true
    },
    {
      id: 3,
      title: 'Cloud Audit completed successfully',
      time: '3 days ago',
      type: 'success',
      unread: false
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

  const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border' = 'bg') => {
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
    return colorMap[color as keyof typeof colorMap]?.[variant] || colorMap.info[variant];
  };

  const handleDownload = (document: any) => {
    // Simulate document download
    console.log(`Downloading ${document.name}`);
    // In a real app, this would trigger the actual download
  };

  const handlePreview = (document: any) => {
    // Simulate document preview
    console.log(`Previewing ${document.name}`);
    // In a real app, this would open a preview modal or new tab
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-background-dark text-text-dark' 
        : 'bg-background-light text-text-light'
    }`}>
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed left-0 top-0 h-full w-70 z-50 ${
              theme === 'dark' 
                ? 'bg-surface-dark/95 border-r border-surface-secondary-dark/50' 
                : 'bg-surface-light/95 border-r border-gray-200'
            } backdrop-blur-xl shadow-2xl`}
          >
            {/* Logo */}
            <div className={`p-6 border-b ${
              theme === 'dark' ? 'border-surface-secondary-dark/50' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-xl flex items-center justify-center shadow-glow">
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
                      ? 'hover:bg-surface-secondary-dark text-text-secondary-dark hover:text-text-dark' 
                      : 'hover:bg-gray-100 text-text-secondary-light hover:text-text-light'
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
                            ? 'bg-secondary-dark/20 text-secondary-dark border border-secondary-dark/30 shadow-inner-glow'
                            : 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm'
                          : theme === 'dark'
                            ? 'hover:bg-surface-secondary-dark/50 text-text-secondary-dark hover:text-text-dark'
                            : 'hover:bg-gray-50 text-text-secondary-light hover:text-text-light'
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
              theme === 'dark' ? 'border-surface-secondary-dark/50' : 'border-gray-200'
            }`}>
              <div className={`flex items-center space-x-3 p-3 rounded-xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-secondary-dark/10 to-accent-dark/10 border border-secondary-dark/20' 
                  : 'bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100'
              }`}>
                <div className="w-10 h-10 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-full flex items-center justify-center shadow-glow">
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
                className={`w-full flex items-center space-x-3 px-4 py-3 mt-3 rounded-xl transition-all duration-200 ${
                  theme === 'dark'
                    ? 'hover:bg-error-dark/20 text-error-dark hover:text-red-300 border border-transparent hover:border-error-dark/30'
                    : 'hover:bg-red-50 text-red-600 hover:text-red-700 border border-transparent hover:border-red-200'
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

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-70' : 'ml-0'}`}>
        {/* Header */}
        <header className={`${
          theme === 'dark' 
            ? 'bg-surface-dark/80 border-b border-surface-secondary-dark/50' 
            : 'bg-surface-light/80 border-b border-gray-200'
        } backdrop-blur-xl sticky top-0 z-40 shadow-sm`}>
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              {/* Sidebar Toggle Button */}
              <motion.button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'hover:bg-surface-secondary-dark text-text-secondary-dark hover:text-text-dark' 
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
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-lg flex items-center justify-center shadow-glow">
                    <span className="text-white font-bold text-sm">BC</span>
                  </div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-secondary-dark to-accent-dark bg-clip-text text-transparent">
                    BCBUZZ
                  </h1>
                </motion.div>
              )}
              
              <div>
                <h1 className="text-2xl font-bold">Welcome back, Test</h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                }`}>Here's an overview of your security audits and account</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'hover:bg-surface-secondary-dark text-text-secondary-dark hover:text-text-dark' 
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

              {/* Search */}
              <div className="relative">
                <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                }`} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 rounded-lg border transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark placeholder:text-text-secondary-dark focus:border-secondary-dark'
                      : 'bg-gray-50 border-gray-200 text-text-light placeholder:text-text-secondary-light focus:border-blue-300'
                  } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                />
              </div>

              {/* Notifications */}
              <motion.button
                className={`relative p-2 rounded-lg transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'hover:bg-surface-secondary-dark text-text-secondary-dark hover:text-text-dark' 
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
                        ? 'hover:bg-surface-secondary-dark' 
                        : 'hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-full flex items-center justify-center shadow-glow">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left hidden md:block">
                      <p className="font-medium text-sm">Test User</p>
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                      }`}>test@bcbuzz.com</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
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
                            ? 'bg-surface-dark border border-surface-secondary-dark/50'
                            : 'bg-surface-light border border-gray-200'
                        } rounded-xl shadow-2xl z-50 backdrop-blur-xl`}
                      >
                        {/* User Info */}
                        <div className={`p-4 border-b ${
                          theme === 'dark' ? 'border-surface-secondary-dark/50' : 'border-gray-200'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-full flex items-center justify-center shadow-glow">
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
                              ? 'hover:bg-surface-secondary-dark' 
                              : 'hover:bg-gray-50'
                          }`}>
                            <Settings className="w-4 h-4" />
                            <span className="text-sm">Account Settings</span>
                          </button>
                          <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                            theme === 'dark' 
                              ? 'hover:bg-surface-secondary-dark' 
                              : 'hover:bg-gray-50'
                          }`}>
                            <HelpCircle className="w-4 h-4" />
                            <span className="text-sm">Help & Support</span>
                          </button>
                        </div>

                        {/* Logout */}
                        <div className={`p-2 border-t ${
                          theme === 'dark' ? 'border-surface-secondary-dark/50' : 'border-gray-200'
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
        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg group cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-surface-dark/50 border-surface-secondary-dark/50 hover:border-secondary-dark/50'
                      : 'bg-surface-light border-gray-200 hover:border-blue-200 hover:shadow-blue-100/50'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm mb-1 ${
                        theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                      }`}>{stat.label}</p>
                      <p className="text-2xl font-bold mb-1">{stat.value}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getColorClasses(stat.color, 'bg')} ${getColorClasses(stat.color, 'text')}`}>
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${getColorClasses(stat.color, 'bg')} ${getColorClasses(stat.color, 'text')}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <p className={`text-xs mt-3 ${
                    theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                  }`}>{stat.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Audits */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`p-6 rounded-2xl border ${
                  theme === 'dark'
                    ? 'bg-surface-dark/50 border-surface-secondary-dark/50'
                    : 'bg-surface-light border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Your Audits</h3>
                  <div className="flex items-center space-x-2">
                    <button className={`p-2 rounded-lg transition-all duration-200 ${
                      theme === 'dark' 
                        ? 'hover:bg-surface-secondary-dark text-text-secondary-dark hover:text-text-dark' 
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
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
                        theme === 'dark'
                          ? 'border-surface-secondary-dark/50 hover:bg-surface-secondary-dark/30 hover:border-secondary-dark/50'
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
                className={`p-6 rounded-2xl border ${
                  theme === 'dark'
                    ? 'bg-surface-dark/50 border-surface-secondary-dark/50'
                    : 'bg-surface-light border-gray-200'
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
                      className={`p-3 rounded-lg border transition-all duration-200 group ${
                        theme === 'dark'
                          ? 'border-surface-secondary-dark/50 hover:bg-surface-secondary-dark/30'
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

              {/* Notifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={`p-6 rounded-2xl border ${
                  theme === 'dark'
                    ? 'bg-surface-dark/50 border-surface-secondary-dark/50'
                    : 'bg-surface-light border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Notifications</h3>
                  <button className="text-secondary-dark hover:underline text-sm font-medium">See All →</button>
                </div>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <motion.div 
                      key={notification.id} 
                      className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        notification.unread 
                          ? theme === 'dark' 
                            ? 'bg-surface-secondary-dark/30 border border-secondary-dark/20' 
                            : 'bg-blue-50 border border-blue-100'
                          : ''
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className={`p-1 rounded-full mt-1 ${
                        notification.type === 'success' ? getColorClasses('success', 'bg') :
                        notification.type === 'warning' ? getColorClasses('warning', 'bg') :
                        getColorClasses('info', 'bg')
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          notification.type === 'success' ? getColorClasses('success', 'text') :
                          notification.type === 'warning' ? getColorClasses('warning', 'text') :
                          getColorClasses('info', 'text')
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className={`text-xs ${
                          theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                        }`}>{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-secondary-dark rounded-full"></div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className={`p-6 rounded-2xl border ${
                  theme === 'dark'
                    ? 'bg-surface-dark/50 border-surface-secondary-dark/50'
                    : 'bg-surface-light border-gray-200'
                }`}
              >
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.label}
                        className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center space-y-2 group ${
                          theme === 'dark'
                            ? 'border-surface-secondary-dark/50 hover:bg-surface-secondary-dark/30 hover:border-secondary-dark/50'
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
    </div>
  );
};

export default Dashboard;