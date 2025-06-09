import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Book, 
  MessageCircle, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  FileText,
  Video,
  Users,
  Zap,
  Shield,
  Settings,
  Send
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  icon: any;
}

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const categories = [
    { id: 'all', label: 'All Topics', icon: Book },
    { id: 'getting-started', label: 'Getting Started', icon: Zap },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'account', label: 'Account', icon: Users },
    { id: 'technical', label: 'Technical', icon: Settings }
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I start my first security audit?',
      answer: 'To start your first security audit, navigate to the Dashboard and click on "Request New Audit". Fill in the required information including target URL, audit type, and priority level. Our team will review your request and begin the audit process.',
      category: 'getting-started'
    },
    {
      id: '2',
      question: 'What types of security audits do you offer?',
      answer: 'We offer comprehensive security audits including Web Application Security, Network Security, Cloud Infrastructure, Mobile Application Security, Database Security, and Wireless Security assessments.',
      category: 'security'
    },
    {
      id: '3',
      question: 'How long does a typical audit take?',
      answer: 'Audit duration varies based on scope and complexity. Web application audits typically take 1-2 weeks, while comprehensive network audits may take 2-4 weeks. You can track progress in real-time through your dashboard.',
      category: 'getting-started'
    },
    {
      id: '4',
      question: 'How do I change my account password?',
      answer: 'Go to Settings > Security, then scroll to the "Change Password" section. Enter your current password and your new password twice to confirm. Click "Save Security Settings" to update your password.',
      category: 'account'
    },
    {
      id: '5',
      question: 'Can I integrate BCBUZZ with my existing tools?',
      answer: 'Yes! BCBUZZ offers API integration and webhook support. You can find your API key and configure integrations in Settings > API & Integrations. We support popular tools like Slack, JIRA, and custom webhook endpoints.',
      category: 'technical'
    },
    {
      id: '6',
      question: 'What should I do if a critical vulnerability is found?',
      answer: 'Critical vulnerabilities require immediate attention. You\'ll receive instant notifications via email and dashboard alerts. Review the detailed remediation recommendations provided in the audit report and implement fixes as soon as possible.',
      category: 'security'
    }
  ];

  const articles: Article[] = [
    {
      id: '1',
      title: 'Getting Started with BCBUZZ',
      description: 'Complete guide to setting up your account and running your first security audit',
      category: 'getting-started',
      readTime: '5 min read',
      icon: Zap
    },
    {
      id: '2',
      title: 'Understanding Vulnerability Severity Levels',
      description: 'Learn how we classify vulnerabilities and prioritize remediation efforts',
      category: 'security',
      readTime: '8 min read',
      icon: Shield
    },
    {
      id: '3',
      title: 'API Integration Guide',
      description: 'Step-by-step instructions for integrating BCBUZZ with your existing workflow',
      category: 'technical',
      readTime: '12 min read',
      icon: Settings
    },
    {
      id: '4',
      title: 'Best Practices for Web Application Security',
      description: 'Essential security measures every web application should implement',
      category: 'security',
      readTime: '15 min read',
      icon: Shield
    },
    {
      id: '5',
      title: 'Managing Your Security Team',
      description: 'How to add team members and manage permissions in your BCBUZZ account',
      category: 'account',
      readTime: '6 min read',
      icon: Users
    },
    {
      id: '6',
      title: 'Automated Scanning Setup',
      description: 'Configure automated security scans for continuous monitoring',
      category: 'technical',
      readTime: '10 min read',
      icon: Settings
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm);
    setShowContactForm(false);
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Help & Support
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Find answers to your questions and get the help you need
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help articles, FAQs, or topics..."
            className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-800/70 transition-all duration-300 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <MessageCircle className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Live Chat</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get instant help from our support team</p>
            </div>
          </div>
        </div>

        <div 
          className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-800/70 transition-all duration-300 cursor-pointer"
          onClick={() => setShowContactForm(true)}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Mail className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Email Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Send us a detailed message</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-800/70 transition-all duration-300 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <Phone className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Phone Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Call us at +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  activeCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                  {expandedFAQ === faq.id ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No FAQs found matching your search.</p>
            </div>
          )}
        </motion.div>

        {/* Help Articles */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Help Articles
          </h2>

          <div className="space-y-4">
            {filteredArticles.map((article) => {
              const Icon = article.icon;
              return (
                <div
                  key={article.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">{article.title}</h3>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{article.description}</p>
                      <span className="text-xs text-blue-500 dark:text-blue-400">{article.readTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No articles found matching your search.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Additional Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="p-4 bg-purple-500/20 rounded-xl w-fit mx-auto mb-4">
              <Video className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Video Tutorials</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Watch step-by-step video guides for common tasks
            </p>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              Browse Videos →
            </button>
          </div>

          <div className="text-center">
            <div className="p-4 bg-green-500/20 rounded-xl w-fit mx-auto mb-4">
              <Book className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Documentation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Comprehensive guides and API documentation
            </p>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              Read Docs →
            </button>
          </div>

          <div className="text-center">
            <div className="p-4 bg-orange-500/20 rounded-xl w-fit mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Community</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Connect with other users and share experiences
            </p>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              Join Community →
            </button>
          </div>
        </div>
      </motion.div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowContactForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Support</h2>
              <button
                onClick={() => setShowContactForm(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <Search className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={contactForm.priority}
                    onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={6}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please describe your issue or question in detail..."
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default HelpPage;