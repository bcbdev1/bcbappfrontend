import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Sun, Moon } from 'lucide-react';
import AuthCard from '../components/ui/AuthCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import apiClient from '../lib/api'; // ✅ New import

const SignupPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res=await apiClient.post('/signup', {
        fullName : formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword:formData.confirmPassword
       
      } );
      localStorage.setItem("id",res.data.userId);
      // Redirect to OTP verification after signup
      navigate('/verify');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glowing Background Elements */}
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
        title="Create Account"
        subtitle="Join us on this amazing journey"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            leftIcon={<User className="w-5 h-5" />}
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            leftIcon={<Mail className="w-5 h-5" />}
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Input
            type="password"
            label="Password"
            placeholder="Create a password"
            leftIcon={<Lock className="w-5 h-5" />}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            leftIcon={<Lock className="w-5 h-5" />}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />

          <Button type="submit" isLoading={isLoading} className="w-full">
            Next
          </Button>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link
              to="/"
              className="text-secondary-dark dark:text-secondary-light hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </AuthCard>
    </div>
  );
};

export default SignupPage;