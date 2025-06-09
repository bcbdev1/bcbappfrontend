import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  notifications,
  onMarkAsRead,
  onDismiss
}) => {
  const { theme } = useTheme();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return theme === 'dark' ? 'text-green-400 bg-green-500/20' : 'text-green-600 bg-green-100';
      case 'warning':
        return theme === 'dark' ? 'text-orange-400 bg-orange-500/20' : 'text-orange-600 bg-orange-100';
      case 'error':
        return theme === 'dark' ? 'text-red-400 bg-red-500/20' : 'text-red-600 bg-red-100';
      case 'info':
        return theme === 'dark' ? 'text-blue-400 bg-blue-500/20' : 'text-blue-600 bg-blue-100';
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
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <span className="text-sm opacity-60">
          {notifications.filter(n => !n.read).length} unread
        </span>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-8 opacity-60">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No notifications</p>
          </div>
        ) : (
          notifications.map((notification, index) => {
            const Icon = getNotificationIcon(notification.type);
            
            return (
              <motion.div
                key={notification.id}
                className={`relative p-4 rounded-xl border transition-all duration-300 ${
                  notification.read
                    ? theme === 'dark'
                      ? 'bg-surface-dark/20 border-surface-dark/10 opacity-60'
                      : 'bg-surface-light/20 border-surface-secondary-light/10 opacity-60'
                    : theme === 'dark'
                    ? 'bg-surface-dark/40 border-surface-dark/20'
                    : 'bg-surface-light/40 border-surface-secondary-light/20'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => !notification.read && onMarkAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{notification.title}</h3>
                    <p className="text-sm opacity-80 mt-1">{notification.message}</p>
                    <span className="text-xs opacity-60 mt-2 block">{notification.time}</span>
                  </div>

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDismiss(notification.id);
                    }}
                    className={`p-1 rounded-lg transition-all duration-300 ${
                      theme === 'dark'
                        ? 'hover:bg-surface-dark text-text-secondary-dark hover:text-text-dark'
                        : 'hover:bg-surface-secondary-light text-text-secondary-light hover:text-text-light'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {!notification.read && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-accent-dark dark:bg-accent-light rounded-full" />
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default NotificationsPanel;