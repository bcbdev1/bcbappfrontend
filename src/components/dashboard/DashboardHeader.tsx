import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Bell, User, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface DashboardHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  isSidebarOpen,
  toggleSidebar,
  user
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-background-dark/80 border-surface-dark/30'
          : 'bg-background-light/80 border-surface-secondary-light/30'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={toggleSidebar}
            className={`p-2 rounded-xl transition-all duration-300 ${
              theme === 'dark'
                ? 'hover:bg-surface-dark/50 text-text-dark'
                : 'hover:bg-surface-light/50 text-text-light'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>

          {!isSidebarOpen && (
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BC</span>
              </div>
              <span className="font-display font-bold text-lg hidden sm:block">
                BCBUZZ
              </span>
            </motion.div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-all duration-300 ${
              theme === 'dark'
                ? 'hover:bg-surface-dark/50 text-text-dark'
                : 'hover:bg-surface-light/50 text-text-light'
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

          {/* Notifications */}
          <motion.button
            className={`relative p-2 rounded-xl transition-all duration-300 ${
              theme === 'dark'
                ? 'hover:bg-surface-dark/50 text-text-dark'
                : 'hover:bg-surface-light/50 text-text-light'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-dark dark:bg-accent-light rounded-full"></span>
          </motion.button>

          {/* User Profile */}
          <motion.div
            className={`flex items-center space-x-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 ${
              theme === 'dark'
                ? 'hover:bg-surface-dark/50'
                : 'hover:bg-surface-light/50'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs opacity-60">{user.email}</p>
            </div>
            <ChevronDown className="w-4 h-4 opacity-60 hidden md:block" />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;