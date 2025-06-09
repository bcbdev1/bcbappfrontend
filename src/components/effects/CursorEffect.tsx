import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const CursorEffect = () => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference
          ${theme === 'dark' ? 'bg-white' : 'bg-black'} opacity-50`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          opacity: visible ? 0.5 : 0,
          scale: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50
          ${theme === 'dark' ? 'bg-accent-dark' : 'bg-accent-light'}`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CursorEffect;