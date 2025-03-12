import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';
import { motion } from "framer-motion";

// Validation schema
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  message: Yup.string()
    .min(10, 'Message is too short')
    .required('Message is required')
});

const ContactForm = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '2abbddae-79d5-4ed9-82b9-d7f0b9851e84',
          name: values.name,
          email: values.email,
          message: values.message
        })
      });

      const result = await response.json();

      if (result.success) {
        alert('Message sent successfully!');
        resetForm();
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting form');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.contactFormContainer}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          message: ''
        }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <Field 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                className={styles.input}
              />
              <ErrorMessage 
                name="name" 
                component="div" 
                className={styles.errorMessage} 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <Field 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                className={styles.input}
              />
              <ErrorMessage 
                name="email" 
                component="div" 
                className={styles.errorMessage} 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <Field 
                as="textarea" 
                name="message" 
                placeholder="Your Message" 
                className={styles.textarea}
              />
              <ErrorMessage 
                name="message" 
                component="div" 
                className={styles.errorMessage} 
              />
            </div>

            <motion.button 
            whileHover={{scale: 1.1}}
              type="submit" 
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;