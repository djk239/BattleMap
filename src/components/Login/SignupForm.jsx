import React from 'react';
import styles from './SignupForm.module.css';

export default function SignupForm({ formik }) {
  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Sign Up</h2>
        {/* Username Field */}
        <div className={styles.container}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input
            className={styles.inputBox}
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            required
          />
          {formik.touched.username && formik.errors.username ? (
            <div className={styles.errors}>{formik.errors.username}</div>
          ) : null}
        </div>

        {/* Email Field */}
        <div className={styles.container}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            className={styles.inputBox}
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.errors}>{formik.errors.email}</div>
          ) : null}
        </div>

        {/* Password Field */}
        <div className={styles.container}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            className={styles.inputBox}
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className={styles.errors}>{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Confirm Password Field */}
        <div className={styles.container}>
          <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
          <input
            className={styles.inputBox}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            required
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className={styles.errors}>{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </>
  );
}