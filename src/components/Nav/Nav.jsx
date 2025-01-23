import React, { useState } from 'react';
import styles from './Nav.module.css';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import ToggleTheme from '../ToggleTheme/ToggleTheme';

function Nav({close}) {
  // State to toggle login/signup popup form. FALSE by default
  const [popupOpen, setPopupOpen] = useState(false);  

  // Authentication hook for getting login state and login and logout functions
  const { isLoggedIn, handleLog, handleLogout } = useAuth();

  // Function to toggle login/signup popup
  const popup = () => {
    setPopupOpen(!popupOpen);
  };

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'tween', duration: .5 }}
      className={styles.container}
    >
      <div className={styles.linkcontainer}>

        {!isLoggedIn && 
        <motion.p className={styles.links} whileTap={{scale: 0.8}} whileHover={{scale: 1.25}} onClick={popup}>SignUp / Login</motion.p>
        }
            <motion.div whileTap={{scale: 0.8}} whileHover={{scale: 1.2}}>
                <Link className={styles.links} to="/">War Map</Link>
            </motion.div>
            <motion.div whileTap={{scale: 0.8}} whileHover={{scale: 1.2}}>
                <div className={styles.links} to="/">Leaderboards</div>
            </motion.div>
        {isLoggedIn && 
            <motion.div whileTap={{scale: 0.8}} whileHover={{scale: 1.2}}>
                <div className={styles.links} to="/">Account</div>
            </motion.div>
        }
            <motion.div whileTap={{scale: 0.8}} whileHover={{scale: 1.2}}>
                <div className={styles.links} to="/">Contact</div>
            </motion.div>
            <motion.div whileTap={{scale: 0.8}} whileHover={{scale: 1.2}}>
                <div className={styles.links} to="/">Tutorial</div>
            </motion.div>



      </div>
      <ToggleTheme />
      <div className={styles.termscontainer}>
        <div className={styles.terms} to="/terms">Terms and Conditions</div>
        <p className={styles.terms}>|</p>
        <div className={styles.terms} to="/privacy">Privacy Policy</div>
      </div>
      {popupOpen && <PopupMenu close={close}/>}
    </motion.div>
  );
}

export default Nav;
