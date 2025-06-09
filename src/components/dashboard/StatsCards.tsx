import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface StatsCardsProps {
  stats: {
    activeAudits: number;
    completedAudits: number;
    securityScore: number;
    totalVulnerabilities: number;
  };
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const { theme } = useTheme();

  const cards = [
    {
      title: 'Active Audits',
      value: stats.activeAudits,
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      bgColor: theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Completed Audits',
      value: stats.completedAudits,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: theme === 'dark' ? 'bg-green-500/10' : 'bg-green-50',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Security Score',
      value: `${stats.securityScore}/100`,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: theme === 'dark' ? 'bg-orange-500/10' : 'bg-orange-50',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      title: 'Total Vulnerabilities',
      value: stats.totalVulnerabilities,
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      bgColor: theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50',
      textColor: 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          className={`relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
            theme === 'dark'
              ? 'bg-surface-dark/60 border-surface-dark/30 hover:border-surface-dark/50'
              : 'bg-surface-light/60 border-surface-secondary-light/30 hover:border-surface-secondary-light/50'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5 rounded-2xl`} />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.textColor}`} />
              </div>
              <div className={`text-2xl font-bold ${card.textColor}`}>
                {card.value}
              </div>
            </div>
            
            <h3 className="text-sm font-medium opacity-80">{card.title}</h3>
            
            {/* Progress indicator for security score */}
            {card.title === 'Security Score' && (
              <div className="mt-3">
                <div className={`w-full h-2 rounded-full ${
                  theme === 'dark' ? 'bg-surface-dark' : 'bg-surface-secondary-light'
                }`}>
                  <motion.div
                    className={`h-full bg-gradient-to-r ${card.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.securityScore}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;