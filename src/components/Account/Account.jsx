import { useEffect, useState } from 'react';
import styles from './Account.module.css';
import { motion, AnimatePresence } from "framer-motion";
import Header from '../Header/Header';


// Define the Account as a functional component
const Account = () => {

    const [user, setUser] = useState({
        pfp: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg", // Default profile picture URL
        username: "Guest",          // Default username
        level: 100,
        email: "halotv@example.com",                  // User email
        notifications: true,        // User notifications setting
      });

  return (
    <>
    <Header />
        <div className={styles.container}>
            <h2 className={styles.profile}>Profile</h2>       
            <div className={styles.profileContainer}>
                <div className={styles.pfpContainer}>
                    <img className={styles.pfp} src={user.pfp} alt="Profile Picture" />
                    <h3 className={styles.username}>{user.username}</h3>
                    <p className={styles.level}>lvl {user.level}</p>
                    <button className={styles.edit}>Edit ✏️</button>
                </div>
                <h3 className={styles.text}>Username : {user.username}</h3>
                <p className={styles.text}>Email : {user.email}</p>
                <p className={styles.text}>Notifications: {user.notifications ? 'On' : 'Off'}</p>
                <button className={styles.changepass}>Change Password</button>
            </div>
        </div>
    </>
  );
};

export default Account;
