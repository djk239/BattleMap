import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import Header from '../Header/Header';
import styles from './SignupLogin.module.css';
import { useFormik } from 'formik';
import { useAuth } from '../../AuthContext';
import { signupSchema } from '../../Schema/SignupSchema';
import { loginSchema } from '../../Schema/LoginSchema';
import { login, signup } from '../../services/api';
import DOMPurify from 'dompurify';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useNavigate } from 'react-router-dom';

export default function SignupLogin() {
    const [isLoggingin, setIsLoggingin] = useState(true);
    const { handleLog, handleLogout } = useAuth();

    const navigate = useNavigate();

    // Helper to clean any malicious input
    const sanitizeInput = (input) => DOMPurify.sanitize(input);

    // Formik instance for handling login form
    const loginFormik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            console.log("Submitting form with values:", values); // Debugging step
            try {
                const response = await login(values); // Ensure this function is defined
                console.log("Login successful:", response);
                handleLog();
                navigate('/');
            } catch (error) {
                console.log("Login error:", error);
            }
        },
    });

    // Formik instance for handling signup form
    const signupFormik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: signupSchema,
        onSubmit: async (values) => {
            const sanitizedValues = {
                email: sanitizeInput(values.email),
                username: sanitizeInput(values.username),
                password: sanitizeInput(values.password),
                confirmPassword: sanitizeInput(values.confirmPassword),
            };
            try {
                const response = await signup(sanitizedValues);
                console.log("Signup successful:", response);
            } catch (error) {
                console.log("Signup error:", error);
                setSignupError("Username or email already in use.");
            }
        },
    });

    // Function to toggle between login and signup forms
    const toggleForm = (isLogin) => {
        setIsLoggingin(isLogin);
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <div className={styles.buttonContainer}>
                        <h2
                            onClick={() => toggleForm(true)}
                            className={isLoggingin ? styles.active : ''}
                        >
                            Login
                        </h2>
                        <h2
                            onClick={() => toggleForm(false)}
                            className={!isLoggingin ? styles.active : ''}
                        >
                            Sign Up
                        </h2>
                        <motion.div
                            className={styles.underline}
                            animate={{
                                x: isLoggingin ? 0 : '100%', // Slide to the right for Signup
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                    </div>

                    <AnimatePresence mode='wait'>
                        {isLoggingin ? (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: .5 }}
                            >
                                <LoginForm formik={loginFormik} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="signup"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: .5 }}
                            >
                                <SignupForm formik={signupFormik} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}