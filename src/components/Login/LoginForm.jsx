import React from 'react'
import styles from './LoginForm.module.css';


export default function LoginForm( { formik } ) {
  return (
    <>
    <form onSubmit={formik.handleSubmit} className={styles.form}>
    <h2 className={styles.title}>Login</h2>

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
        />
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.errors}>{formik.errors.password}</div>
        ) : null}
      </div>

      {/* Submit Button */}
      <button type="submit" className={styles.button}>Login</button>
    </form>
    
    </>
  )
}
