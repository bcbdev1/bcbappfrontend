import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BarChart3, Shield, Settings, HelpCircle, LogOut, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  user: {
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, user }) => {
  const { theme } = useTheme();

  const menuItems = [
    { icon: Home, label: 'Home', active: false },
    { icon: BarChart3, label: 'Dashboard', active: true },
    { icon: Shield, label: 'Scan', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: HelpCircle, label: 'Help', active: false },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      width: '280px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      width: '0px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Sidebar */}
          <motion.aside
            className={`fixed left-0 top-0 h-full z-50 backdrop-blur-xl border-r overflow-hidden ${
              theme === 'dark'
                ? 'bg-surface-dark/80 border-surface-dark/30'
                : 'bg-surface-light/80 border-surface-secondary-light/30'
            }`}
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col h-full w-70">
              {/* Logo Section */}
              <motion.div
                className="flex items-center space-x-3 p-6 border-b border-surface-dark/20 dark:border-surface-light/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">BC</span>
                </div>
                <div>
                  <h1 className="font-display font-bold text-xl">BCBUZZ</h1>
                  <p className="text-xs opacity-60">Security Platform</p>
                </div>
              </motion.div>

              {/* User Profile */}
              <motion.div
                className={`p-6 border-b ${
                  theme === 'dark' ? 'border-surface-dark/20' : 'border-surface-light/20'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{user.name}</p>
                    <p className="text-sm opacity-60 truncate">{user.email}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-secondary-dark/20 dark:bg-secondary-light/20 rounded-full mt-1">
                      {user.role}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Menu */}
              <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      item.active
                        ? theme === 'dark'
                          ? 'bg-secondary-dark/20 text-secondary-light border border-secondary-dark/30'
                          : 'bg-secondary-light/20 text-secondary-dark border border-secondary-light/30'
                        : theme === 'dark'
                        ? 'hover:bg-surface-dark/50 text-text-secondary-dark'
                        : 'hover:bg-surface-light/50 text-text-secondary-light'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.active && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-secondary-dark dark:bg-secondary-light rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 }}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Logout Button */}
              <motion.div
                className="p-4 border-t border-surface-dark/20 dark:border-surface-light/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <button
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    theme === 'dark'
                      ? 'hover:bg-error-dark/20 text-error-dark'
                      : 'hover:bg-error-light/20 text-error-light'
                  }`}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;