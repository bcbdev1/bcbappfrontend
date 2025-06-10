import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Lock, Shield, Server, Globe, Cloud, Smartphone, Cpu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
              <div 
                className="h-1 bg-accent-dark dark:bg-accent-light rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / (isSuccess ? 5 : 4)) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between -mt-2.5">
              {[1, 2, 3, 4].map(step => (
                <div 
                  key={step} 
                  className={`w-5 h-5 rounded-full flex items-center justify-center z-10 
                  ${currentStep >= step ? 'bg-accent-dark dark:bg-accent-light' : 'bg-surface-light/20 dark:bg-surface-dark/20'}`}
                >
                  {currentStep > step && (
                    <CheckCircle className="h-4 w-4 text-white dark:text-surface-dark" />
                  )}
                </div>
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
            <div className="bg-red-500/10 text-red-500 dark:text-red-400 p-4 rounded-lg mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Success Message */}
          {isSuccess ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-surface-dark dark:text-surface-light">Request Submitted Successfully!</h2>
              <p className="text-surface-dark/70 dark:text-surface-light/70 mb-4">
                Your request has been successfully received and our team has been notified.
                We'll contact you shortly to discuss the next steps.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-accent-dark dark:bg-accent-light text-white rounded-md hover:bg-accent-dark/90 dark:hover:bg-accent-light/90 transition-colors"
              >
                Go to Dashboard
              </button>
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
                      className={`w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border rounded-md focus:outline-none focus:ring-2 text-surface-dark dark:text-surface-light ${
                        validationErrors.companyName 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50'
                      }`}
                    />
                    {validationErrors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.companyName}</p>
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
                      className={`w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border rounded-md focus:outline-none focus:ring-2 text-surface-dark dark:text-surface-light ${
                        validationErrors.contactName 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50'
                      }`}
                    />
                    {validationErrors.contactName && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.contactName}</p>
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
                      className={`w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border rounded-md focus:outline-none focus:ring-2 text-surface-dark dark:text-surface-light ${
                        validationErrors.jobRole 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50'
                      }`}
                    />
                    {validationErrors.jobRole && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.jobRole}</p>
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
                      className={`w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border rounded-md focus:outline-none focus:ring-2 text-surface-dark dark:text-surface-light ${
                        validationErrors.contactEmail 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50'
                      }`}
                    />
                    {validationErrors.contactEmail && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.contactEmail}</p>
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
                      className={`w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border rounded-md focus:outline-none focus:ring-2 text-surface-dark dark:text-surface-light ${
                        validationErrors.contactPhone 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50'
                      }`}
                    />
                    {validationErrors.contactPhone && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.contactPhone}</p>
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
                  
                  <div>
                    <label htmlFor="companySize" className="block text-sm font-medium mb-1 text-surface-dark/80 dark:text-surface-light/80">
                      Company Size <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border rounded-md focus:outline-none focus:ring-2 text-surface-dark dark:text-surface-light ${
                        validationErrors.companySize 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50'
                      }`}
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                    {validationErrors.companySize && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.companySize}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium mb-1 text-surface-dark/80 dark:text-surface-light/80">
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border rounded-md focus:outline-none focus:ring-2 text-surface-dark dark:text-surface-light ${
                        validationErrors.industry 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50'
                      }`}
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Education">Education</option>
                      <option value="Government">Government</option>
                      <option value="Energy">Energy</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Other">Other</option>
                    </select>
                    {validationErrors.industry && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.industry}</p>
                    )}
                  </div>
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
                    <div className="bg-red-500/10 text-red-500 dark:text-red-400 p-3 rounded-lg mb-4 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 shrink-0" />
                      <span>{validationErrors.auditServices}</span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`glass-card hover:border-accent-dark dark:hover:border-accent-light transition-colors cursor-pointer ${
                      formData.auditServices.includes('network') ? 'border-accent-dark dark:border-accent-light bg-accent-dark/5 dark:bg-accent-light/5' : ''
                    }`}>
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.auditServices.includes('network')}
                          onChange={() => handleServiceChange('network')}
                          className="h-5 w-5 text-accent-dark dark:text-accent-light rounded border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark dark:focus:ring-accent-light bg-surface-light/10 dark:bg-surface-dark/10 mt-1"
                        />
                        <div className="ml-3">
                          <div className="flex items-center">
                            <Server className="h-5 w-5 text-accent-dark dark:text-accent-light mr-2" />
                            <span className="font-medium">Network Audit</span>
                          </div>
                          <p className="text-sm text-surface-dark/70 dark:text-surface-light/70 mt-1">
                            Comprehensive assessment of your network infrastructure and security.
                          </p>
                        </div>
                      </label>
                    </div>
                    
                    <div className={`glass-card hover:border-accent-dark dark:hover:border-accent-light transition-colors cursor-pointer ${
                      formData.auditServices.includes('web') ? 'border-green-500 bg-green-500/5' : ''
                    }`}>
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.auditServices.includes('web')}
                          onChange={() => handleServiceChange('web')}
                          className="h-5 w-5 text-accent-dark dark:text-accent-light rounded border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark dark:focus:ring-accent-light bg-surface-light/10 dark:bg-surface-dark/10 mt-1"
                        />
                        <div className="ml-3">
                          <div className="flex items-center">
                            <Globe className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                            <span className="font-medium">Web App Audit</span>
                          </div>
                          <p className="text-sm text-surface-dark/70 dark:text-surface-light/70 mt-1">
                            Security assessment of your web applications and APIs.
                          </p>
                        </div>
                      </label>
                    </div>
                    
                    <div className={`glass-card hover:border-accent-dark dark:hover:border-accent-light transition-colors cursor-pointer ${
                      formData.auditServices.includes('cloud') ? 'border-blue-500 bg-blue-500/5' : ''
                    }`}>
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.auditServices.includes('cloud')}
                          onChange={() => handleServiceChange('cloud')}
                          className="h-5 w-5 text-accent-dark dark:text-accent-light rounded border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark dark:focus:ring-accent-light bg-surface-light/10 dark:bg-surface-dark/10 mt-1"
                        />
                        <div className="ml-3">
                          <div className="flex items-center">
                            <Cloud className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                            <span className="font-medium">Cloud Audit</span>
                          </div>
                          <p className="text-sm text-surface-dark/70 dark:text-surface-light/70 mt-1">
                            Security assessment of your cloud infrastructure and configurations.
                          </p>
                        </div>
                      </label>
                    </div>
                    
                    <div className={`glass-card hover:border-accent-dark dark:hover:border-accent-light transition-colors cursor-pointer ${
                      formData.auditServices.includes('mobile') ? 'border-yellow-500 bg-yellow-500/5' : ''
                    }`}>
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.auditServices.includes('mobile')}
                          onChange={() => handleServiceChange('mobile')}
                          className="h-5 w-5 text-accent-dark dark:text-accent-light rounded border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark dark:focus:ring-accent-light bg-surface-light/10 dark:bg-surface-dark/10 mt-1"
                        />
                        <div className="ml-3">
                          <div className="flex items-center">
                            <Smartphone className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2" />
                            <span className="font-medium">Mobile Audit</span>
                          </div>
                          <p className="text-sm text-surface-dark/70 dark:text-surface-light/70 mt-1">
                            Security assessment of your mobile applications.
                          </p>
                        </div>
                      </label>
                    </div>
                    
                    <div className={`glass-card hover:border-accent-dark dark:hover:border-accent-light transition-colors cursor-pointer ${
                      formData.auditServices.includes('iot') ? 'border-red-500 bg-red-500/5' : ''
                    }`}>
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.auditServices.includes('iot')}
                          onChange={() => handleServiceChange('iot')}
                          className="h-5 w-5 text-accent-dark dark:text-accent-light rounded border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark dark:focus:ring-accent-light bg-surface-light/10 dark:bg-surface-dark/10 mt-1"
                        />
                        <div className="ml-3">
                          <div className="flex items-center">
                            <Cpu className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                            <span className="font-medium">IoT Audit</span>
                          </div>
                          <p className="text-sm text-surface-dark/70 dark:text-surface-light/70 mt-1">
                            Security assessment of your IoT devices and infrastructure.
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className={`glass-card hover:border-accent-dark dark:hover:border-accent-light transition-colors cursor-pointer ${
                      formData.auditServices.includes('api') ? 'border-violet-500 bg-violet-500/5' : ''
                    }`}>
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.auditServices.includes('api')}
                          onChange={() => handleServiceChange('api')}
                          className="h-5 w-5 text-accent-dark dark:text-accent-light rounded border-surface-light/20 dark:border-surface-dark/20 focus:ring-accent-dark dark:focus:ring-accent-light bg-surface-light/10 dark:bg-surface-dark/10 mt-1"
                        />
                        <div className="ml-3">
                          <div className="flex items-center">
                            <Server className="h-5 w-5 text-violet-500 dark:text-violet-400 mr-2" />
                            <span className="font-medium">API Audit</span>
                          </div>
                          <p className="text-sm text-surface-dark/70 dark:text-surface-light/70 mt-1">
                            Security assessment of your application programming interfaces.
                          </p>
                        </div>
                      </label>
                    </div>
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
                      className="w-full px-4 py-2 bg-surface-light/10 dark:bg-surface-dark/10 border border-surface-light/20 dark:border-surface-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-dark/50 dark:focus:ring-accent-light/50 text-surface-dark dark:text-surface-light"
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
                    <div className="glass-card p-4 rounded-lg">
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
                    </div>
                    
                    <div className="glass-card p-4 rounded-lg">
                      <h3 className="font-medium mb-3 flex items-center text-surface-dark dark:text-surface-light">
                        <Shield className="h-5 w-5 text-accent-dark dark:text-accent-light mr-2" />
                        Business Information
                      </h3>
                      <ul className="space-y-2 text-surface-dark/80 dark:text-surface-light/80">
                        <li><span className="text-surface-dark/60 dark:text-surface-light/60">Company Size:</span> {formData.companySize}</li>
                        <li><span className="text-surface-dark/60 dark:text-surface-light/60">Industry:</span> {formData.industry}</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="glass-card p-4 rounded-lg">
                    <h3 className="font-medium mb-3 flex items-center text-surface-dark dark:text-surface-light">
                      <Shield className="h-5 w-5 text-accent-dark dark:text-accent-light mr-2" />
                      Selected Audit Services
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.auditServices.map(service => {
                        let icon;
                        let color;
                        let label;
                        
                        switch(service) {
                          case 'network':
                            icon = <Server className="h-4 w-4" />;
                            color = 'bg-accent-dark/10 text-accent-dark dark:bg-accent-light/10 dark:text-accent-light';
                            label = 'Network Audit';
                            break;
                          case 'web':
                            icon = <Globe className="h-4 w-4" />;
                            color = 'bg-green-500/10 text-green-500 dark:bg-green-400/10 dark:text-green-400';
                            label = 'Web App Audit';
                            break;
                          case 'cloud':
                            icon = <Cloud className="h-4 w-4" />;
                            color = 'bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400';
                            label = 'Cloud Audit';
                            break;
                          case 'mobile':
                            icon = <Smartphone className="h-4 w-4" />;
                            color = 'bg-yellow-500/10 text-yellow-500 dark:bg-yellow-400/10 dark:text-yellow-400';
                            label = 'Mobile Audit';
                            break;
                          case 'iot':
                            icon = <Cpu className="h-4 w-4" />;
                            color = 'bg-red-500/10 text-red-500 dark:bg-red-400/10 dark:text-red-400';
                            label = 'IoT Audit';
                            break;
                          case 'api':
                            icon = <Server className="h-4 w-4" />;
                            color = 'bg-violet-500/10 text-violet-500 dark:bg-violet-400/10 dark:text-violet-400';
                            label = 'API Audit';
                            break;
                          default:
                            icon = <Shield className="h-4 w-4" />;
                            color = 'bg-accent-dark/10 text-accent-dark dark:bg-accent-light/10 dark:text-accent-light';
                            label = service;
                        }
                        
                        return (
                          <span key={service} className={`px-3 py-1 rounded-full flex items-center ${color}`}>
                            {icon}
                            <span className="ml-2">{label}</span>
                          </span>
                        );
                      })}
                    </div>
                    
                    {formData.additionalDetails && (
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-surface-dark/80 dark:text-surface-light/80">Additional Details:</h4>
                        <p className="text-surface-dark/70 dark:text-surface-light/70">{formData.additionalDetails}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-surface-light/10 dark:bg-surface-dark/10 p-4 rounded-lg border border-surface-light/20 dark:border-surface-dark/20">
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
                      <p className="text-red-500 text-sm mt-1">{validationErrors.consent}</p>
                    )}
                  </div>
                </motion.div>
              )}
              
              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 rounded-md bg-surface-light/20 dark:bg-surface-dark/20 text-surface-dark dark:text-surface-light hover:bg-surface-light/30 dark:hover:bg-surface-dark/30 transition-colors"
                  >
                    Back
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!checkCurrentStepValidity(currentStep)}
                    className={`px-6 py-2 rounded-md transition-colors ml-auto ${
                      checkCurrentStepValidity(currentStep)
                        ? 'bg-accent-dark dark:bg-accent-light text-white hover:bg-accent-dark/90 dark:hover:bg-accent-light/90'
                        : 'bg-surface-light/20 dark:bg-surface-dark/20 text-surface-dark/50 dark:text-surface-light/50 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !checkCurrentStepValidity(currentStep)}
                    className={`px-6 py-2 rounded-md transition-colors ml-auto flex items-center ${
                      checkCurrentStepValidity(currentStep) && !isSubmitting
                        ? 'bg-accent-dark dark:bg-accent-light text-white hover:bg-accent-dark/90 dark:hover:bg-accent-light/90'
                        : 'bg-surface-light/20 dark:bg-surface-dark/20 text-surface-dark/50 dark:text-surface-light/50 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white mr-2\" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Request
                      </>
                    )}
                  </button>
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