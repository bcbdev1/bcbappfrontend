import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'scan', label: 'Scan', icon: Scan },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const stats = [
    { label: 'Active Audits', value: '2', icon: Shield, color: 'blue' },
    { label: 'Completed Audits', value: '1', icon: CheckCircle, color: 'green' },
    { label: 'Security Score', value: '82/100', icon: TrendingUp, color: 'yellow' },
    { label: 'Vulnerabilities', value: '3', icon: AlertTriangle, color: 'red' },
  ];

  const recentAudits = [
    {
      id: 1,
      name: 'Network Audit',
      status: 'In Progress',
      progress: 65,
      date: '2025-05-10 - 2025-05-25',
      type: 'network'
    },
    {
      id: 2,
      name: 'Web App Audit',
      status: 'Scheduled',
      progress: 0,
      date: '2025-05-20 - 2025-06-05',
      type: 'web'
    },
    {
      id: 3,
      name: 'Cloud Audit',
      status: 'Completed',
      progress: 100,
      date: '2025-04-15 - 2025-04-30',
      type: 'cloud'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Your Network Audit report has been updated',
      time: '2 hours ago',
      type: 'info'
    },
    {
      id: 2,
      title: 'Security vulnerability detected in web application',
      time: '1 day ago',
      type: 'warning'
    },
    {
      id: 3,
      title: 'Cloud Audit completed successfully',
      time: '3 days ago',
      type: 'success'
    }
  ];

  const quickActions = [
    { label: 'Web Scan', icon: Globe, color: 'blue' },
    { label: 'Port Scan', icon: Shield, color: 'green' },
    { label: 'Mobile Check', icon: Smartphone, color: 'purple' },
    { label: 'Report', icon: FileText, color: 'orange' }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-background-dark' : 'bg-gray-50'} transition-colors duration-300`}>
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
                ? 'bg-surface-dark/95 border-r border-secondary-dark/20' 
                : 'bg-white/95 border-r border-gray-200'
            } backdrop-blur-xl`}
          >
            {/* Logo */}
            <div className="p-6 border-b border-secondary-dark/20 dark:border-gray-200/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">BC</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-secondary-dark to-accent-dark bg-clip-text text-transparent">
                    BCBUZZ
                  </h1>
                  <p className="text-xs opacity-60">Security Platform</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 flex-1">
              <div className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeTab === item.id
                          ? theme === 'dark'
                            ? 'bg-secondary-dark/20 text-secondary-dark border border-secondary-dark/30'
                            : 'bg-blue-50 text-blue-600 border border-blue-200'
                          : theme === 'dark'
                            ? 'hover:bg-surface-dark/50 text-text-dark/70 hover:text-text-dark'
                            : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-secondary-dark/20 dark:border-gray-200/20">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-secondary-dark/10 to-accent-dark/10">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary-dark to-accent-dark rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Test User</p>
                  <p className="text-xs opacity-60">test@bcbuzz.com</p>
                </div>
              </div>
              
              {/* Logout Button */}
              <motion.button
                className={`w-full flex items-center space-x-3 px-4 py-3 mt-3 rounded-xl transition-all duration-200 ${
                  theme === 'dark'
                    ? 'hover:bg-red-500/20 text-red-400 hover:text-red-300'
                    : 'hover:bg-red-50 text-red-600 hover:text-red-700'
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
            ? 'bg-surface-dark/80 border-b border-secondary-dark/20' 
            : 'bg-white/80 border-b border-gray-200'
        } backdrop-blur-xl sticky top-0 z-40`}>
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, Test</h1>
                <p className="text-sm opacity-60">Here's an overview of your security audits and account</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-surface-dark/50 border-secondary-dark/30 text-text-dark'
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-secondary-dark/50`}
                />
              </div>

              {/* Notifications */}
              <motion.button
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </motion.button>
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
                  className={`p-6 rounded-2xl ${
                    theme === 'dark'
                      ? 'bg-surface-dark/50 border border-secondary-dark/20'
                      : 'bg-white border border-gray-200'
                  } hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-60 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${
                      stat.color === 'blue' ? 'bg-blue-500/20 text-blue-500' :
                      stat.color === 'green' ? 'bg-green-500/20 text-green-500' :
                      stat.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
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
                className={`p-6 rounded-2xl ${
                  theme === 'dark'
                    ? 'bg-surface-dark/50 border border-secondary-dark/20'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Your Audits</h3>
                  <button className="text-secondary-dark hover:underline text-sm">View All →</button>
                </div>

                <div className="space-y-4">
                  {recentAudits.map((audit) => (
                    <div
                      key={audit.id}
                      className={`p-4 rounded-xl border ${
                        theme === 'dark'
                          ? 'border-secondary-dark/20 hover:bg-surface-dark/30'
                          : 'border-gray-200 hover:bg-gray-50'
                      } transition-colors cursor-pointer`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            audit.type === 'network' ? 'bg-blue-500/20 text-blue-500' :
                            audit.type === 'web' ? 'bg-green-500/20 text-green-500' :
                            'bg-purple-500/20 text-purple-500'
                          }`}>
                            {audit.type === 'network' ? <Shield className="w-4 h-4" /> :
                             audit.type === 'web' ? <Globe className="w-4 h-4" /> :
                             <Shield className="w-4 h-4" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{audit.name}</h4>
                            <p className="text-sm opacity-60">{audit.date}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          audit.status === 'Completed' ? 'bg-green-500/20 text-green-500' :
                          audit.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500' :
                          'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {audit.status}
                        </span>
                      </div>
                      
                      {audit.progress > 0 && audit.progress < 100 && (
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-secondary-dark to-accent-dark h-2 rounded-full transition-all duration-300"
                            style={{ width: `${audit.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <motion.button
                  className="w-full mt-4 p-3 border-2 border-dashed border-secondary-dark/30 rounded-xl text-secondary-dark hover:bg-secondary-dark/10 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-5 h-5" />
                  <span>Request New Audit</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Account Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`p-6 rounded-2xl ${
                  theme === 'dark'
                    ? 'bg-surface-dark/50 border border-secondary-dark/20'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <h3 className="text-lg font-semibold mb-4">Account Overview</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm opacity-60">Company</p>
                    <p className="font-medium">BCBUZZ Technologies Private Limited</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-60">Plan</p>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-500 rounded text-xs font-medium">
                      Business Pro
                    </span>
                  </div>
                  <div>
                    <p className="text-sm opacity-60">Blockchain Verifications</p>
                    <p className="font-medium">12 of 20 used</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-secondary-dark text-white rounded-lg hover:bg-secondary-dark/90 transition-colors">
                  Manage Account
                </button>
              </motion.div>

              {/* Notifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={`p-6 rounded-2xl ${
                  theme === 'dark'
                    ? 'bg-surface-dark/50 border border-secondary-dark/20'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Notifications</h3>
                  <button className="text-secondary-dark hover:underline text-sm">See All →</button>
                </div>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3">
                      <div className={`p-1 rounded-full mt-1 ${
                        notification.type === 'success' ? 'bg-green-500/20' :
                        notification.type === 'warning' ? 'bg-yellow-500/20' :
                        'bg-blue-500/20'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs opacity-60">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className={`p-6 rounded-2xl ${
                  theme === 'dark'
                    ? 'bg-surface-dark/50 border border-secondary-dark/20'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.label}
                        className={`p-4 rounded-xl border ${
                          theme === 'dark'
                            ? 'border-secondary-dark/20 hover:bg-surface-dark/30'
                            : 'border-gray-200 hover:bg-gray-50'
                        } transition-colors flex flex-col items-center space-y-2`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`p-2 rounded-lg ${
                          action.color === 'blue' ? 'bg-blue-500/20 text-blue-500' :
                          action.color === 'green' ? 'bg-green-500/20 text-green-500' :
                          action.color === 'purple' ? 'bg-purple-500/20 text-purple-500' :
                          'bg-orange-500/20 text-orange-500'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium">{action.label}</span>
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;