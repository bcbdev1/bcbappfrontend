import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Sun, 
  Moon,
  FolderOpen,
  LayoutDashboard,
  Scan,
  Download,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Filter,
  Eye,
  MoreVertical,
  FileText,
  Shield,
  Globe,
  Server,
  Smartphone
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    name: "E-commerce Security Audit",
    type: "Web Application",
    status: "completed",
    date: "2024-01-15",
    vulnerabilities: { critical: 2, high: 5, medium: 8, low: 12 },
    score: 78,
    icon: Globe,
    client: "TechCorp Inc."
  },
  {
    id: 2,
    name: "Network Infrastructure Review",
    type: "Network Security",
    status: "in-progress",
    date: "2024-01-10",
    vulnerabilities: { critical: 0, high: 3, medium: 6, low: 4 },
    score: 85,
    icon: Server,
    client: "SecureNet Ltd."
  },
  {
    id: 3,
    name: "Mobile App Penetration Test",
    type: "Mobile Security",
    status: "scheduled",
    date: "2024-01-08",
    vulnerabilities: { critical: 1, high: 2, medium: 4, low: 8 },
    score: 82,
    icon: Smartphone,
    client: "AppDev Solutions"
  },
  {
    id: 4,
    name: "Cloud Security Assessment",
    type: "Cloud Infrastructure",
    status: "completed",
    date: "2024-01-05",
    vulnerabilities: { critical: 0, high: 1, medium: 3, low: 6 },
    score: 92,
    icon: Shield,
    client: "CloudFirst Corp."
  }
];

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "audit_completed",
    title: "Network Infrastructure Review Completed",
    message: "Your network security audit has been completed successfully",
    date: "2024-01-15",
    time: "14:30",
    read: false,
    priority: "high"
  },
  {
    id: 2,
    type: "vulnerability_found",
    title: "Critical Vulnerability Detected",
    message: "SQL injection vulnerability found in user authentication module",
    date: "2024-01-15",
    time: "10:15",
    read: false,
    priority: "critical"
  },
  {
    id: 3,
    type: "report_ready",
    title: "Security Report Ready for Download",
    message: "E-commerce Security Audit report is now available",
    date: "2024-01-14",
    time: "16:45",
    read: true,
    priority: "medium"
  },
  {
    id: 4,
    type: "audit_scheduled",
    title: "New Audit Scheduled",
    message: "Mobile App Penetration Test scheduled for next week",
    date: "2024-01-14",
    time: "09:20",
    read: true,
    priority: "low"
  },
  {
    id: 5,
    type: "system_update",
    title: "System Maintenance Complete",
    message: "Scheduled maintenance has been completed successfully",
    date: "2024-01-13",
    time: "22:00",
    read: true,
    priority: "low"
  }
];

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Search functionality
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || project.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  // Get unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Sidebar navigation items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'scan', label: 'Scan', icon: Scan },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in-progress': return 'text-blue-500';
      case 'scheduled': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'scheduled': return Calendar;
      default: return XCircle;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const NotificationIcon = ({ type }) => {
    switch (type) {
      case 'audit_completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'vulnerability_found': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'report_ready': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'audit_scheduled': return <Calendar className="w-5 h-5 text-orange-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  // Projects Page Component
  const ProjectsPage = () => (
    <div className="space-y-6">
      {/* Projects Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Projects</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Manage and track all your security audit projects
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Types</option>
            <option value="web">Web Application</option>
            <option value="network">Network Security</option>
            <option value="mobile">Mobile Security</option>
            <option value="cloud">Cloud Infrastructure</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const StatusIcon = getStatusIcon(project.status);
          const ProjectIcon = project.icon;
          
          return (
            <motion.div
              key={project.id}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300 cursor-pointer"
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <ProjectIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{project.client}</p>
                  </div>
                </div>
                
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Project Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Type</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{project.type}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                  <div className="flex items-center space-x-2">
                    <StatusIcon className={`w-4 h-4 ${getStatusColor(project.status)}`} />
                    <span className={`text-sm font-medium capitalize ${getStatusColor(project.status)}`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Date</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {new Date(project.date).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Security Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          project.score >= 90 ? 'bg-green-500' :
                          project.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${project.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{project.score}%</span>
                  </div>
                </div>
              </div>

              {/* Vulnerabilities Summary */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>{project.vulnerabilities.critical}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>{project.vulnerabilities.high}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>{project.vulnerabilities.medium}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{project.vulnerabilities.low}</span>
                  </div>
                </div>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white/90 to-transparent dark:from-gray-800/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl">
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                  <button className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No projects found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );

  // Dashboard Content Component
  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back, Test</h1>
        <p className="opacity-90">Here's an overview of your security audits and account</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[
          { label: 'Active Audits', value: '2', icon: Clock, color: 'blue' },
          { label: 'Completed Audits', value: '1', icon: CheckCircle, color: 'green' },
          { label: 'Security Score', value: '82/100', icon: Shield, color: 'yellow' },
          { label: 'Total Projects', value: '4', icon: FolderOpen, color: 'purple' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-gray-200/50 dark:border-gray-700/50"
            whileHover={{ y: -2, scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Projects</h2>
          <button 
            onClick={() => setCurrentView('projects')}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {projects.slice(0, 3).map((project) => {
            const StatusIcon = getStatusIcon(project.status);
            const ProjectIcon = project.icon;
            
            return (
              <div key={project.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <ProjectIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{project.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{project.client}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <StatusIcon className={`w-4 h-4 ${getStatusColor(project.status)}`} />
                      <span className={`text-sm font-medium capitalize ${getStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(project.date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Glassmorphism Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 h-full w-64 z-50 lg:relative lg:translate-x-0"
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/20" />
            
            {/* Sidebar Content */}
            <div className="relative h-full flex flex-col p-4">
              {/* Logo */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    BCBUZZ
                  </span>
                </div>
                
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-1 rounded-lg hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile */}
              <div className="mb-8 p-4 rounded-xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    T
                  </div>
                  <div>
                    <p className="font-medium">Test User</p>
                    <p className="text-xs opacity-70">test@example.com</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-2">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-white/20 dark:bg-gray-800/20 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                        : 'hover:bg-white/10 dark:hover:bg-gray-800/10 text-gray-700 dark:text-gray-300'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {currentView === item.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Logout */}
              <button className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'ml-0'
      }`}>
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Search Bar */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, audits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 lg:w-80 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto"
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{unreadCount} unread</p>
                      </div>
                      
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                            onClick={() => markAsRead(notification.id)}
                            whileHover={{ x: 4 }}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                <NotificationIcon type={notification.type} />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                                  )}
                                </div>
                                
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {notification.message}
                                </p>
                                
                                <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                  <Calendar className="w-3 h-3" />
                                  <span>{notification.date}</span>
                                  <Clock className="w-3 h-3" />
                                  <span>{notification.time}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="w-full text-center text-blue-600 dark:text-blue-400 hover:underline text-sm">
                          View All Notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu (when sidebar is closed) */}
              {!sidebarOpen && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                    T
                  </div>
                  <span className="hidden sm:block font-medium">Test</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentView === 'dashboard' && <DashboardContent />}
              {currentView === 'projects' && <ProjectsPage />}
              {currentView === 'scan' && (
                <div className="text-center py-12">
                  <Scan className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Security Scan</h2>
                  <p className="text-gray-600 dark:text-gray-400">Scan functionality coming soon...</p>
                </div>
              )}
              {currentView === 'settings' && (
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Settings</h2>
                  <p className="text-gray-600 dark:text-gray-400">Settings page coming soon...</p>
                </div>
              )}
              {currentView === 'help' && (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Help & Support</h2>
                  <p className="text-gray-600 dark:text-gray-400">Help documentation coming soon...</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;