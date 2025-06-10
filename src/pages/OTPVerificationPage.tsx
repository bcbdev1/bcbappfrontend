import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/ui/AuthCard';
import Button from '../components/ui/Button';
import ParticleText from '../components/effects/ParticleText';
import { useTheme } from '../context/ThemeContext';
import apiClient from '../lib/api';

const OTPVerificationPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showParticleText, setShowParticleText] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const [id, setId] = useState(() => {
    return localStorage.getItem('id') || '';
  });

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join('');

    if (!id) {
      alert('ID is missing. Please go back and try again.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post('/verify-otp', {
        id,
        code,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
      }

      // Show particle text animation before navigating to dashboard
      setShowParticleText(true);
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          'Invalid or expired OTP. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleParticleTextComplete = () => {
    setShowParticleText(false);
    navigate('/dashboard');
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showParticleText && (
          <ParticleText onComplete={handleParticleTextComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showParticleText && (
          <motion.div
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-secondary-dark/20 dark:bg-secondary-light/20 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent-dark/20 dark:bg-accent-light/20 rounded-full blur-3xl animate-pulse-slow" />
            </motion.div>

            {/* Theme toggle button */}
            <motion.button
              className="fixed top-4 right-4 p-2 rounded-full bg-[#e0e0e0] dark:bg-surface-light/50 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-indigo-600" />
              )}
            </motion.button>

            <AuthCard
              title="Verify Your Email"
              subtitle="Enter the 6-digit code sent to your email"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <motion.input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 h-12 text-center text-lg font-semibold rounded-lg outline-none transition-all duration-300
                        ${theme === 'dark'
                          ? 'bg-surface-dark/50 border border-secondary-dark/30 focus:border-secondary-dark text-text-dark'
                          : 'bg-surface-light/50 border border-secondary-light/30 focus:border-secondary-light text-text-light'
                        }`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    />
                  ))}
                </div>

                <Button type="submit" isLoading={isLoading} className="w-full">
                  Verify
                </Button>

                <p className="text-center text-sm">
                  Didn't receive the code?{' '}
                  <button
                    type="button"
                    className="text-secondary-dark dark:text-secondary-light hover:underline"
                    onClick={() => {
                      console.log('Resend clicked');
                    }}
                  >
                    Resend
                  </button>
                </p>
              </form>
            </AuthCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OTPVerificationPage;