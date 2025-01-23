import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  // Effect to lock/unlock scrolling when menu is open (mainly for mobile devices, may no longer be needed. kept as precaution)
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
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
            onClick={handleClick}
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
      <AnimatePresence>{menuOpen && <Nav close={handleClick} />}</AnimatePresence>
      <div className={styles.bar}></div>
    </>
  );
};

export default Header;
