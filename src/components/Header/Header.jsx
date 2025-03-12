// src/components/Header/Header.jsx
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';
import Nav from '../Nav/Nav';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const updateBodyScroll = () => {
      const isOverflowHidden = menuOpen;
      document.documentElement.style.overflow = isOverflowHidden ? 'hidden' : '';
      document.body.style.overflow = isOverflowHidden ? 'hidden' : '';
      document.body.style.position = isOverflowHidden ? 'fixed' : '';
      document.body.style.width = isOverflowHidden ? '100%' : '';
    };

    updateBodyScroll();

    return () => {
      // Reset styles on unmount
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
    };
  }, [menuOpen]);

  return (
    <>
      <div className={styles.linkcontain}>
        <Link to="/" className={styles.title}>Battle Map</Link>
        <div className={styles.container}>
          <motion.div
            className={styles.hamburger}
            onClick={toggleMenu}
            initial={false}
            animate={menuOpen ? 'open' : 'closed'}
          >
            <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.rect
                width="24"
                height="2"
                rx="1"
                className={styles.fill}
                variants={{
                  closed: { y: 4, rotate: 0 },
                  open: { y: 12, rotate: 45 },
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.rect
                width="24"
                height="2"
                rx="1"
                className={styles.fill}
                variants={{
                  closed: { y: 11, opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.rect
                width="24"
                height="2"
                rx="1"
                className={styles.fill}
                variants={{
                  closed: { y: 18, rotate: 0 },
                  open: { y: 12, rotate: -45 },
                }}
                transition={{ duration: 0.2 }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && <Nav />}
      </AnimatePresence>
      <div className={styles.bar}></div>
    </>
  );
};

export default Header;