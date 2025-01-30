import { useEffect, useState } from 'react';
import styles from './Account.module.css';
import { motion } from "framer-motion";
import Header from '../Header/Header';
import { mockAccounts } from '../../mockdata/mockData';
import { useAuth } from '../../AuthContext';
import { Link } from 'react-router-dom';

const Account = () => {
    const { isLoggedIn, handleLog } = useAuth(); 
    const [user, setUser] = useState(null);

    // Simulate fetching the logged-in user's data
    useEffect(() => {
        if (isLoggedIn) {
            // Replace this with your actual logic to fetch user data
            const loggedInUserId = 1; // Use the authenticated user's ID (replace with dynamic ID if available)
            const loggedInUser = mockAccounts.find(account => account.id === loggedInUserId);
            setUser(loggedInUser);
        }
    }, [isLoggedIn]);

    // Function to handle notifications toggle
    const handleNotificationsToggle = () => {
        setUser(prevUser => ({
            ...prevUser,
            notifications: !prevUser.notifications
        }));
    };

    // Function to handle changing password FUTURE NEEDED
    const handleChangePassword = () => {
        alert("Change password functionality not implemented yet.");
    };

    // If the user is not logged in, show a login prompt
    if (!isLoggedIn) {
        return (
            <>
            <Header />
            <div className={styles.loginPrompt}>
                <h2>Please log in to view your account.</h2>
                <motion.div className={styles.loginButton} whileTap={{scale: 0.8}} whileHover={{scale: 1.2}}>
                    <Link className={styles.links} to="/login">Login</Link>
                </motion.div>
            </div>
            </>
        );
    }

    // Show loading state while fetching user data
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <motion.div
                className={styles.container}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className={styles.profile}>Profile</h2>
                <div className={styles.profileContainer}>
                    <div className={styles.pfpContainer}>
                        <motion.img
                            className={styles.pfp}
                            src={user.pfp}
                            alt="Profile Picture"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                        <h3 className={styles.username}>{user.username}</h3>
                        <p className={styles.level}>lvl {user.level}</p>
                    </div>
                    <div className={styles.details}>
                        <h3 className={styles.text}>Username: {user.username}</h3>
                        <p className={styles.text}>Email: {user.email}</p>
                        <div className={styles.notifications}>
                            <label htmlFor="notifications" className={styles.text}>
                                Notifications:
                            </label>
                            <input
                                id="notifications"
                                type="checkbox"
                                checked={user.notifications}
                                onChange={handleNotificationsToggle}
                                className={styles.checkbox}
                            />
                        </div>
                    </div>
                    <motion.button
                        className={styles.changepass}
                        whileHover={{ scale: 1.05 }}
                        onClick={handleChangePassword}
                    >
                        Change Password
                    </motion.button>
                </div>
            </motion.div>
        </>
    );
};

export default Account;