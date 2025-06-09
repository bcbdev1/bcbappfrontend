import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import HeroSection from '../components/get-started/HeroSection';
import FeaturesSection from '../components/get-started/FeaturesSection';
import ServicesSection from '../components/get-started/ServicesSection';

const GetStarted: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-background-dark via-surface-dark to-primary-dark text-text-dark' 
        : 'bg-gradient-to-br from-background-light via-surface-light to-primary-light text-text-light'
    }`}>
      {/* Header */}
      <header className="relative z-10">
        <div className="flex items-center justify-between p-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-light/50 dark:bg-surface-dark/50 backdrop-blur-sm border border-secondary-light/20 dark:border-secondary-dark/20 hover:bg-surface-light/70 dark:hover:bg-surface-dark/70 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>

          <motion.button
            className="p-2 rounded-lg bg-surface-light/50 dark:bg-surface-dark/50 backdrop-blur-sm border border-secondary-light/20 dark:border-secondary-dark/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-indigo-600" />
            )}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-secondary-light/20 dark:border-secondary-dark/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BC</span>
            </div>
            <span className="text-2xl font-bold">BCBUZZ</span>
          </div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
            Securing your digital future with advanced cybersecurity solutions
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-text-secondary-light dark:text-text-secondary-dark">
            <a href="#" className="hover:text-secondary-dark dark:hover:text-secondary-light transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-secondary-dark dark:hover:text-secondary-light transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-secondary-dark dark:hover:text-secondary-light transition-colors duration-200">Contact Us</a>
            <a href="#" className="hover:text-secondary-dark dark:hover:text-secondary-light transition-colors duration-200">Support</a>
          </div>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-6">
            © 2025 BCBUZZ Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GetStarted;