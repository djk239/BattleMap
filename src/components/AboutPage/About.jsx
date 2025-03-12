import React from 'react'
import Header from '../Header/Header'
import styles from './About.module.css';
import ContactForm from './ContactForm';


export default function About() {
  return (
    <>
        <Header />
        <div className={styles.container}>
            <h1 className={styles.title}>Quick Story:</h1>
            <p className={styles.story}>Hi, I'm Dale, the creator of this website!
                Passionate fullstack developer and gamer eager to share my creations with the world.
                While there were many before this, this is one of the first to see the light of day.
                I'm thrilled to share my work with you, and I hope you enjoy it as much as I enjoyed making it!
                If you have any questions or want to work with me please feel free to reach out below.
            </p>
        </div>
        <ContactForm />
    
    </>
  )
}
