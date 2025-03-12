// src/components/Nav/Nav.jsx
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import styles from './Nav.module.css';
import ToggleTheme from '../ToggleTheme/ToggleTheme';

const navVariants = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' }
};

const linkMotion = {
  whileTap: { scale: 0.8 },
  whileHover: { scale: 1.2 }
};

function Nav() {
  const { isLoggedIn } = useAuth();

  const NavLinks = [
    { 
      condition: !isLoggedIn, 
      to: "/login", 
      label: "SignUp / Login" 
    },
    { 
      to: "/", 
      label: "War Map" 
    },
    { 
      to: "/leaderboards", 
      label: "Leaderboards" 
    },
    { 
      condition: isLoggedIn, 
      to: "/account", 
      label: "Account" 
    },
    { 
      to: "/tutorial", 
      label: "Tutorial" 
    },
    { 
      to: "/about", 
      label: "About" 
    }
  ];

  return (
    <motion.div
      variants={navVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: 'tween', duration: 0.5 }}
      className={styles.container}
    >
      <div className={styles.linkcontainer}>
        {NavLinks.map((link, index) => (
          (link.condition === undefined || link.condition) && (
            <motion.div key={index} {...linkMotion}>
              <Link 
                className={styles.links} 
                to={link.to}
              >
                {link.label}
              </Link>
            </motion.div>
          )
        ))}
      </div>
      <ToggleTheme />
      <div className={styles.termscontainer}>
        <div className={styles.terms}>Terms and Conditions</div>
        <p className={styles.terms}>|</p>
        <div className={styles.terms}>Privacy Policy</div>
      </div>
    </motion.div>
  );
}

export default Nav;