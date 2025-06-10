import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Lock, Shield, Server, Globe, Cloud, Smartphone, Cpu, Sun, Moon, Users, Building, Briefcase, GraduationCap, Landmark, Zap, Truck, Factory, ShoppingBag, Stethoscope } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CustomDropdown from '../components/ui/CustomDropdown';

// Define interfaces
interface FormData {
  [x: string]: string | number | readonly string[] | undefined;
  companyName: string;
  contactName: string;
  jobRole: string;
  contactEmail: string;
  contactPhone: string;
  companySize: string;
  industry: string;
  auditServices: string[];
  additionalDetails: string;
}

interface ValidationErrors {
  companyName?: string;
  contactName?: string;
  jobRole?: string;
  contactEmail?: string;
  contactPhone?: string;
  companySize?: string;
  industry?: string;
  auditServices?: string;
  consent?: string;
}

const GetStarted = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [consentChecked, setConsentChecked] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    jobRole: '',
    contactEmail: '',
    contactPhone: '',
    companySize: '',
    industry: '',
    auditServices: [],
    additionalDetails: '',
  });

  useEffect(() => {
    document.title = 'Get Started | BCBUZZ';
  }, []);

  // Company size options with icons
  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees', icon: <Users className="w-4 h-4" /> },
    { value: '11-50', label: '11-50 employees', icon: <Users className="w-4 h-4" /> },
    { value: '51-200', label: '51-200 employees', icon: <Building className="w-4 h-4" /> },
    { value: '201-500', label: '201-500 employees', icon: <Building className="w-4 h-4" /> },
    { value: '501-1000', label: '501-1000 employees', icon: <Factory className="w-4 h-4" /> },
    { value: '1000+', label: '1000+ employees', icon: <Factory className="w-4 h-4" /> },
  ];

  // Industry options with icons
  const industryOptions = [
    { value: 'Technology', label: 'Technology', icon: <Cpu className="w-4 h-4" /> },
    { value: 'Finance', label: 'Finance', icon: <Briefcase className="w-4 h-4" /> },
    { value: 'Healthcare', label: 'Healthcare', icon: <Stethoscope className="w-4 h-4" /> },
    { value: 'Retail', label: 'Retail', icon: <ShoppingBag className="w-4 h-4" /> },
    { value: 'Manufacturing', label: 'Manufacturing', icon: <Factory className="w-4 h-4" /> },
    { value: 'Education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { value: 'Government', label: 'Government', icon: <Landmark className="w-4 h-4" /> },
    { value: 'Energy', label: 'Energy', icon: <Zap className="w-4 h-4" /> },
    { value: 'Transportation', label: 'Transportation', icon: <Truck className="w-4 h-4" /> },
    { value: 'Other', label: 'Other', icon: <Building className="w-4 h-4" /> },
  ];

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{7,15}$/;
    return phoneRegex.test(phone);
  };

  const getValidationErrorsStep1 = (): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!formData.companyName.trim()) {
      errors.companyName = 'Company name is required';
    }

    if (!formData.contactName.trim()) {
      errors.contactName = 'Contact name is required';
    }

    if (!formData.jobRole.trim()) {
      errors.jobRole = 'Job role is required';
    }

    if (!formData.contactEmail.trim()) {
      errors.contactEmail = 'Email is required';
    } else if (!validateEmail(formData.contactEmail)) {
      errors.contactEmail = 'Please enter a valid email address';
    }

    if (!formData.contactPhone.trim()) {
      errors.contactPhone = 'Phone number is required';
    } else if (!validatePhone(formData.contactPhone)) {
      errors.contactPhone = 'Please enter a valid phone number (7-15 digits)';
    }

    return errors;
  };

  const getValidationErrorsStep2 = (): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!formData.companySize) {
      errors.companySize = 'Company size is required';
    }

    if (!formData.industry) {
      errors.industry = 'Industry is required';
    }

    return errors;
  };

  const getValidationErrorsStep3 = (): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (formData.auditServices.length === 0) {
      errors.auditServices = 'Please select at least one audit service';
    }

    return errors;
  };

  const getValidationErrorsStep4 = (): ValidationErrors => {
    const errors: ValidationErrors = {
      ...getValidationErrorsStep1(),
      ...getValidationErrorsStep2(),
      ...getValidationErrorsStep3()
    };

    if (!consentChecked) {
      errors.consent = 'Please agree to the privacy policy';
    }

    return errors;
  };

  const checkCurrentStepValidity = (step: number): boolean => {
    let errors: ValidationErrors = {};
    
    switch (step) {
      case 1:
        errors = getValidationErrorsStep1();
        break;
      case 2:
        errors = getValidationErrorsStep2();
        break;
      case 3:
        errors = getValidationErrorsStep3();
        break;
      case 4:
        errors = getValidationErrorsStep4();
        break;
      default:
        return false;
    }

    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    setError('');
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    setError('');
  };

  const nextStep = () => {
    const errors = currentStep === 1 ? getValidationErrorsStep1() :
                   currentStep === 2 ? getValidationErrorsStep2() :
                   currentStep === 3 ? getValidationErrorsStep3() : {};
    
    if (Object.keys(errors).length === 0 && currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      setValidationErrors({});
    } else {
      setValidationErrors(errors);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setValidationErrors({});
    }
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => {
      const isSelected = prev.auditServices.includes(service);
      const newServices = isSelected 
        ? prev.auditServices.filter(s => s !== service)
        : [...prev.auditServices, service];
      
      return {
        ...prev,
        auditServices: newServices
      };
    });
    
    // Clear validation error for audit services
    if (validationErrors.auditServices) {
      setValidationErrors(prev => ({
        ...prev,
        auditServices: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const errors = getValidationErrorsStep4();
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setError('Please ensure all required fields are filled correctly and consent is given.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <motion.div 
          className="glass-card p-8 rounded-xl backdrop-blur-sm bg-white/10 dark:bg-surface-dark/50 border border-white/10 dark:border-surface-light/10 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            animation: 'float 6s ease-in-out infinite'
          }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 text-surface-dark dark:text-surface-light">Get Started with BCBUZZ</h1>
            <p className="text-surface-dark/70 dark:text-surface-light/70">
              Complete the form below to begin your security audit journey.
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-10 relative">
            <div className="h-1 bg-surface-light/20 dark:bg-surface-dark/20 w-full rounded-full">
              <motion.div 
                className="h-1 bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / (isSuccess ? 5 : 4)) * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / (isSuccess ? 5 : 4)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            
            <div className="flex justify-between -mt-2.5">
              {[1, 2, 3, 4].map(step => (
                <motion.div 
                  key={step} 
                  className={`w-5 h-5 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                    currentStep >= step 
                      ? 'bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light shadow-lg' 
                      : 'bg-surface-light/20 dark:bg-surface-dark/20'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  animate={{ 
                    scale: currentStep === step ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ 
                    scale: { duration: 0.3 },
                    repeat: currentStep === step ? Infinity : 0,
                    repeatDelay: 2
                  }}
                >
                  {currentStep > step && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <CheckCircle className="h-4 w-4 text-white dark:text-surface-dark" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-between mt-2 text-xs text-surface-dark/50 dark:text-surface-light/50">
              <span>Company Details</span>
              <span>Business Info</span>
              <span>Audit Selection</span>
              <span>Review</span>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <motion.div 
              className="bg-red-500/10 text-red-500 dark:text-red-400 p-4 rounded-lg mb-6 flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle className="h-5 w-5 mr-2 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
          
          {/* Success Message */}
          {isSuccess ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 text-surface-dark dark:text-surface-light">Request Submitted Successfully!</h2>
              <p className="text-surface-dark/70 dark:text-surface-light/70 mb-4">
                Your request has been successfully received and our team has been notified.
                We'll contact you shortly to discuss the next steps.
              </p>
              <motion.button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light text-white rounded-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Go to Dashboard
              </motion.button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Company Details */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-medium mb-4 text-surface-dark dark:text-surface-light">Company Details</h2>
                  
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-1 text-surface-dark/80 dark:text-surface-light/80">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border rounded-md focus:outline-none focus:ring-2 text-surface-dark dark:text-surface-light transition-all duration-300 ${
                        validationErrors.companyName 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50 focus:border-accent-dark dark:focus:border-accent-light'
                      }`}
                    />
                    {validationErrors.companyName && (
                      <motion.p 
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {validationErrors.companyName}
                      </motion.p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium mb-1 text-surface-dark/80 dark:text-surface-light/80">
                      Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border rounded-md focus:outline-none focus:ring-2 text-surface-dark dark:text-surface-light transition-all duration-300 ${
                        validationErrors.contactName 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50 focus:border-accent-dark dark:focus:border-accent-light'
                      }`}
                    />
                    {validationErrors.contactName && (
                      <motion.p 
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {validationErrors.contactName}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="jobRole" className="block text-sm font-medium mb-1 text-surface-dark/80 dark:text-surface-light/80">
                      Job Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="jobRole"
                      name="jobRole"
                      value={formData.jobRole}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border rounded-md focus:outline-none focus:ring-2 text-surface-dark dark:text-surface-light transition-all duration-300 ${
                        validationErrors.jobRole 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50 focus:border-accent-dark dark:focus:border-accent-light'
                      }`}
                    />
                    {validationErrors.jobRole && (
                      <motion.p 
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {validationErrors.jobRole}
                      </motion.p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium mb-1 text-surface-dark/80 dark:text-surface-light/80">
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border rounded-md focus:outline-none focus:ring-2 text-surface-dark dark:text-surface-light transition-all duration-300 ${
                        validationErrors.contactEmail 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50 focus:border-accent-dark dark:focus:border-accent-light'
                      }`}
                    />
                    {validationErrors.contactEmail && (
                      <motion.p 
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {validationErrors.contactEmail}
                      </motion.p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium mb-1 text-surface-dark/80 dark:text-surface-light/80">
                      Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/\D/g, '');
                        handleChange({
                          ...e,
                          target: {
                            ...e.target,
                            name: 'contactPhone',
                            value: onlyNums
                          }
                        });
                      }}
                      inputMode="numeric"
                      pattern="[0-9]{7,15}"
                      className={`w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border rounded-md focus:outline-none focus:ring-2 text-surface-dark dark:text-surface-light transition-all duration-300 ${
                        validationErrors.contactPhone 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50 focus:border-accent-dark dark:focus:border-accent-light'
                      }`}
                    />
                    {validationErrors.contactPhone && (
                      <motion.p 
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {validationErrors.contactPhone}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}
              
              {/* Step 2: Business Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-medium mb-4 text-surface-dark dark:text-surface-light">Business Information</h2>
                  
                  <CustomDropdown
                    options={companySizeOptions}
                    value={formData.companySize}
                    onChange={(value) => handleDropdownChange('companySize', value)}
                    placeholder="Select company size"
                    label="Company Size"
                    error={validationErrors.companySize}
                    required
                  />
                  
                  <CustomDropdown
                    options={industryOptions}
                    value={formData.industry}
                    onChange={(value) => handleDropdownChange('industry', value)}
                    placeholder="Select industry"
                    label="Industry"
                    error={validationErrors.industry}
                    required
                  />
                </motion.div>
              )}
              
              {/* Step 3: Audit Services */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-medium mb-4 text-surface-dark dark:text-surface-light">Select Audit Services</h2>
                  <p className="text-surface-dark/70 dark:text-surface-light/70 mb-6">
                    Choose the security audit services you're interested in. You can select multiple options. <span className="text-red-500">*</span>
                  </p>
                  
                  {validationErrors.auditServices && (
                    <motion.div 
                      className="bg-red-500/10 text-red-500 dark:text-red-400 p-3 rounded-lg mb-4 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="h-4 w-4 mr-2 shrink-0" />
                      <span>{validationErrors.auditServices}</span>
                    </motion.div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'network', icon: Shield, label: 'Network Audit', description: 'Comprehensive assessment of your network infrastructure and security.', color: 'accent' },
                      { id: 'web', icon: Globe, label: 'Web App Audit', description: 'Security assessment of your web applications and APIs.', color: 'green' },
                      { id: 'cloud', icon: Cloud, label: 'Cloud Audit', description: 'Security assessment of your cloud infrastructure and configurations.', color: 'blue' },
                      { id: 'mobile', icon: Smartphone, label: 'Mobile Audit', description: 'Security assessment of your mobile applications.', color: 'yellow' },
                      { id: 'iot', icon: Cpu, label: 'IoT Audit', description: 'Security assessment of your IoT devices and infrastructure.', color: 'red' },
                      { id: 'api', icon: Server, label: 'API Audit', description: 'Security assessment of your application programming interfaces.', color: 'violet' }
                    ].map((service, index) => (
                      <motion.div 
                        key={service.id}
                        className={`glass-card hover:border-accent-dark dark:hover:border-accent-light transition-all duration-300 cursor-pointer ${
                          formData.auditServices.includes(service.id) 
                            ? 'border-accent-dark dark:border-accent-light bg-accent-dark/5 dark:bg-accent-light/5 shadow-lg' 
                            : 'hover:shadow-md'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.auditServices.includes(service.id)}
                            onChange={() => handleServiceChange(service.id)}
                            className="h-5 w-5 text-accent-dark dark:text-accent-light rounded border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark dark:focus:ring-accent-light bg-surface-light/10 dark:bg-surface-dark/10 mt-1"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <service.icon className={`h-5 w-5 mr-2 ${
                                service.color === 'accent' ? 'text-accent-dark dark:text-accent-light' :
                                service.color === 'green' ? 'text-green-500 dark:text-green-400' :
                                service.color === 'blue' ? 'text-blue-500 dark:text-blue-400' :
                                service.color === 'yellow' ? 'text-yellow-500 dark:text-yellow-400' :
                                service.color === 'red' ? 'text-red-500 dark:text-red-400' :
                                'text-violet-500 dark:text-violet-400'
                              }`} />
                              <span className="font-medium">{service.label}</span>
                            </div>
                            <p className="text-sm text-surface-dark/70 dark:text-surface-light/70 mt-1">
                              {service.description}
                            </p>
                          </div>
                        </label>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div>
                    <label htmlFor="additionalDetails" className="block text-sm font-medium mb-1 text-surface-dark/80 dark:text-surface-light/80">
                      Additional Details
                    </label>
                    <textarea
                      id="additionalDetails"
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border border-surface-light/20 dark:border-surface-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50 focus:border-accent-dark dark:focus:border-accent-light text-surface-dark dark:text-surface-light transition-all duration-300"
                      placeholder="Please provide any additional information about your security requirements..."
                    ></textarea>
                  </div>
                </motion.div>
              )}
              
              {/* Step 4: Review */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-medium mb-4 text-surface-dark dark:text-surface-light">Review Your Information</h2>
                  <p className="text-surface-dark/70 dark:text-surface-light/70 mb-6">
                    Please review your information before submitting.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      className="glass-card p-4 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="font-medium mb-3 flex items-center text-surface-dark dark:text-surface-light">
                        <Shield className="h-5 w-5 text-accent-dark dark:text-accent-light mr-2" />
                        Company Details
                      </h3>
                      <ul className="space-y-2 text-surface-dark/80 dark:text-surface-light/80">
                        <li><span className="text-surface-dark/60 dark:text-surface-light/60">Company:</span> {formData.companyName}</li>
                        <li><span className="text-surface-dark/60 dark:text-surface-light/60">Contact:</span> {formData.contactName}</li>
                        <li><span className="text-surface-dark/60 dark:text-surface-light/60">Job Role:</span> {formData.jobRole}</li>
                        <li><span className="text-surface-dark/60 dark:text-surface-light/60">Email:</span> {formData.contactEmail}</li>
                        <li><span className="text-surface-dark/60 dark:text-surface-light/60">Phone:</span> {formData.contactPhone}</li>
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      className="glass-card p-4 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="font-medium mb-3 flex items-center text-surface-dark dark:text-surface-light">
                        <Shield className="h-5 w-5 text-accent-dark dark:text-accent-light mr-2" />
                        Business Information
                      </h3>
                      <ul className="space-y-2 text-surface-dark/80 dark:text-surface-light/80">
                        <li><span className="text-surface-dark/60 dark:text-surface-light/60">Company Size:</span> {companySizeOptions.find(opt => opt.value === formData.companySize)?.label}</li>
                        <li><span className="text-surface-dark/60 dark:text-surface-light/60">Industry:</span> {industryOptions.find(opt => opt.value === formData.industry)?.label}</li>
                      </ul>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="glass-card p-4 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="font-medium mb-3 flex items-center text-surface-dark dark:text-surface-light">
                      <Shield className="h-5 w-5 text-accent-dark dark:text-accent-light mr-2" />
                      Selected Audit Services
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.auditServices.map((service, index) => {
                        const serviceConfig = {
                          network: { icon: <Server className="h-4 w-4" />, color: 'bg-accent-dark/10 text-accent-dark dark:bg-accent-light/10 dark:text-accent-light', label: 'Network Audit' },
                          web: { icon: <Globe className="h-4 w-4" />, color: 'bg-green-500/10 text-green-500 dark:bg-green-400/10 dark:text-green-400', label: 'Web App Audit' },
                          cloud: { icon: <Cloud className="h-4 w-4" />, color: 'bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400', label: 'Cloud Audit' },
                          mobile: { icon: <Smartphone className="h-4 w-4" />, color: 'bg-yellow-500/10 text-yellow-500 dark:bg-yellow-400/10 dark:text-yellow-400', label: 'Mobile Audit' },
                          iot: { icon: <Cpu className="h-4 w-4" />, color: 'bg-red-500/10 text-red-500 dark:bg-red-400/10 dark:text-red-400', label: 'IoT Audit' },
                          api: { icon: <Server className="h-4 w-4" />, color: 'bg-violet-500/10 text-violet-500 dark:bg-violet-400/10 dark:text-violet-400', label: 'API Audit' }
                        }[service] || { icon: <Shield className="h-4 w-4" />, color: 'bg-accent-dark/10 text-accent-dark dark:bg-accent-light/10 dark:text-accent-light', label: service };
                        
                        return (
                          <motion.span 
                            key={service} 
                            className={`px-3 py-1 rounded-full flex items-center ${serviceConfig.color}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {serviceConfig.icon}
                            <span className="ml-2">{serviceConfig.label}</span>
                          </motion.span>
                        );
                      })}
                    </div>
                    
                    {formData.additionalDetails && (
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-surface-dark/80 dark:text-surface-light/80">Additional Details:</h4>
                        <p className="text-surface-dark/70 dark:text-surface-light/70">{formData.additionalDetails}</p>
                      </div>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    className="bg-surface-light/10 dark:bg-surface-dark/10 p-4 rounded-lg border border-surface-light/20 dark:border-surface-dark/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-start mb-4">
                      <Lock className="h-5 w-5 text-accent-dark dark:text-accent-light mr-3 shrink-0 mt-0.5" />
                      <p className="text-surface-dark/80 dark:text-surface-light/80">
                        Your information will be securely stored using our proprietary technology.
                        This ensures data integrity throughout the audit process.
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                        className="h-4 w-4 text-accent-dark dark:text-accent-light border-surface-light/20 dark:border-surface-dark/20 rounded focus:ring-accent-dark dark:focus:ring-accent-light bg-surface-light/10 dark:bg-surface-dark/10"
                      />
                      <label htmlFor="consent" className="ml-2 text-sm text-surface-dark/80 dark:text-surface-light/80">
                        I agree to the processing of my data as described in the{' '}
                        <a href="#" className="text-accent-dark dark:text-accent-light hover:opacity-80">Privacy Policy</a> <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {validationErrors.consent && (
                      <motion.p 
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {validationErrors.consent}
                      </motion.p>
                    )}
                  </motion.div>
                </motion.div>
              )}
              
              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 rounded-md bg-surface-light/20 dark:bg-surface-dark/20 text-surface-dark dark:text-surface-light hover:bg-surface-light/30 dark:hover:bg-surface-dark/30 transition-all duration-300"
                    whileHover={{ scale: 1.02, x: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                )}
                
                {currentStep < 4 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    disabled={!checkCurrentStepValidity(currentStep)}
                    className={`px-6 py-2 rounded-md transition-all duration-300 ml-auto ${
                      checkCurrentStepValidity(currentStep)
                        ? 'bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light text-white hover:shadow-lg'
                        : 'bg-surface-light/20 dark:bg-surface-dark/20 text-surface-dark/50 dark:text-surface-light/50 cursor-not-allowed'
                    }`}
                    whileHover={checkCurrentStepValidity(currentStep) ? { scale: 1.02, x: 2 } : {}}
                    whileTap={checkCurrentStepValidity(currentStep) ? { scale: 0.98 } : {}}
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !checkCurrentStepValidity(currentStep)}
                    className={`px-6 py-2 rounded-md transition-all duration-300 ml-auto flex items-center ${
                      checkCurrentStepValidity(currentStep) && !isSubmitting
                        ? 'bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light text-white hover:shadow-lg'
                        : 'bg-surface-light/20 dark:bg-surface-dark/20 text-surface-dark/50 dark:text-surface-light/50 cursor-not-allowed'
                    }`}
                    whileHover={checkCurrentStepValidity(currentStep) && !isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={checkCurrentStepValidity(currentStep) && !isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.svg 
                          className="animate-spin h-5 w-5 text-white mr-2" 
                          viewBox="0 0 24 24"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </motion.svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </motion.button>
                )}
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GetStarted;