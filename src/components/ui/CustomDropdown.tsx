import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  error?: string;
  required?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium mb-2 text-surface-dark/80 dark:text-surface-light/80">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <motion.div
        className={`relative w-full cursor-pointer ${
          error 
            ? 'ring-2 ring-red-500/50' 
            : ''
        }`}
        whileTap={{ scale: 0.995 }}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 bg-surface-light/10 dark:bg-surface-dark/10 border rounded-xl transition-all duration-300 flex items-center justify-between ${
            isOpen
              ? 'border-accent-dark dark:border-accent-light ring-2 ring-accent-dark/20 dark:ring-accent-light/20'
              : error
              ? 'border-red-500'
              : 'border-surface-light/20 dark:border-surface-dark/20 hover:border-surface-light/40 dark:hover:border-surface-dark/40'
          }`}
        >
          <div className="flex items-center space-x-3">
            {selectedOption?.icon && (
              <span className="text-accent-dark dark:text-accent-light">
                {selectedOption.icon}
              </span>
            )}
            <span className={`${
              selectedOption 
                ? 'text-surface-dark dark:text-surface-light' 
                : 'text-surface-dark/50 dark:text-surface-light/50'
            }`}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-surface-dark/60 dark:text-surface-light/60" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute top-full left-0 right-0 mt-2 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-xl border border-surface-light/20 dark:border-surface-dark/20 rounded-xl shadow-xl z-50 overflow-hidden`}
            >
              {/* Search Input for large lists */}
              {options.length > 6 && (
                <div className="p-3 border-b border-surface-light/20 dark:border-surface-dark/20">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-light/20 dark:bg-surface-dark/20 border border-surface-light/30 dark:border-surface-dark/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50 text-surface-dark dark:text-surface-light"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              <div className="max-h-60 overflow-y-auto">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-surface-dark/50 dark:text-surface-light/50 text-sm">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option, index) => (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      onClick={() => handleSelect(option.value)}
                      className={`px-4 py-3 cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                        value === option.value
                          ? 'bg-accent-dark/10 dark:bg-accent-light/10 text-accent-dark dark:text-accent-light'
                          : 'hover:bg-surface-light/30 dark:hover:bg-surface-dark/30 text-surface-dark dark:text-surface-light'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {option.icon && (
                          <span className={`transition-colors duration-200 ${
                            value === option.value
                              ? 'text-accent-dark dark:text-accent-light'
                              : 'text-surface-dark/60 dark:text-surface-light/60 group-hover:text-surface-dark dark:group-hover:text-surface-light'
                          }`}>
                            {option.icon}
                          </span>
                        )}
                        <span className="font-medium">{option.label}</span>
                      </div>
                      
                      {value === option.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Check className="w-4 h-4 text-accent-dark dark:text-accent-light" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {error && (
        <motion.p 
          className="text-red-500 text-sm mt-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default CustomDropdown;