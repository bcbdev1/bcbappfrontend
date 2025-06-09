// import { Routes, Route, useLocation } from 'react-router-dom';
// import { AnimatePresence } from 'framer-motion';
// import { useEffect, useState } from 'react';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import OTPVerificationPage from './pages/OTPVerificationPage';
// import ForgotPasswordPage from './pages/ForgotPasswordPage';
// import { useTheme } from './context/ThemeContext';
// import CursorEffect from './components/effects/CursorEffect';
// import ParticleText from './components/effects/ParticleText';

// function App() {
//   const location = useLocation();
//   const { theme } = useTheme();
//   const [showIntro, setShowIntro] = useState(true);

//   // Apply theme class to body
//   useEffect(() => {
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [theme]);

//   return (
//     <div className={`min-h-screen ${theme === 'dark' ? 'bg-background-dark text-text-dark' : 'bg-gray-300 text-text-light'} transition-colors duration-300`}>
//       <CursorEffect />
//       <AnimatePresence mode="wait">
//         {showIntro && (
//           <ParticleText onComplete={() => setShowIntro(false)} />
//         )}
//       </AnimatePresence>
//       <AnimatePresence mode="wait">
//         {!showIntro && (
//           <Routes location={location} key={location.pathname}>
//             <Route path="/" element={<LoginPage />} />
//             <Route path="/signup" element={<SignupPage />} />
//             <Route path="/verify" element={<OTPVerificationPage />} />
//             <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//           </Routes>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default App;

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import GetStarted from './pages/GetStarted'; // ✅ Import GetStarted
import { useTheme } from './context/ThemeContext';
import CursorEffect from './components/effects/CursorEffect';
import ParticleText from './components/effects/ParticleText';

function App() {
  const location = useLocation();
  const { theme } = useTheme();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-background-dark text-text-dark' : 'bg-gray-300 text-text-light'} transition-colors duration-300`}>
      <CursorEffect />
      <AnimatePresence mode="wait">
        {showIntro &&  (
          <ParticleText onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!showIntro && (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify" element={<OTPVerificationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/get-started" element={<GetStarted />} /> {/* ✅ New Route */}
          </Routes>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
