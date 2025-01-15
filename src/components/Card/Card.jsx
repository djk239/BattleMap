import React, { useEffect, useState } from 'react';
import styles from './Card.module.css';
import USAMap from "react-usa-map";
import SingleState from './SingleState';
import { fetchStateByName } from '../../services/api';

export default function Card({ state }) { 

  const [stateData, setStateData] = useState(null);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const stateInfo = await fetchStateByName(state);
        setStateData(stateInfo);
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    };

    fetchState();
  }, [state]);

  return (
    <>
    <div className={styles.container}>
    <svg className={styles.closebtn} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect 
      width="24" 
      height="2" 
      rx="1" 
      y="12" 
      transform="rotate(45 12 13)"
      fill="currentColor"
    />
    <rect 
      width="24" 
      height="2" 
      rx="1" 
      y="12" 
      transform="rotate(-45 12 13)"
      fill="currentColor"
    />
  </svg>
      <div className={styles.infoContainer}>
        <h2 className={styles.txt}>{state}</h2>
        <SingleState stateAbbreviation={state} />
        <h3 className={styles.txt}>Owner: {state}</h3>
      </div>
      <div className={styles.bar}/>
      <div className={styles.statsContainer}>
        {stateData ? (
          <>
            <h2 className={styles.txt}>Active defense: {stateData.def}</h2>
            <h2 className={styles.txt}>Active attacking: {stateData.atk}</h2>
            <h2 className={styles.txt}>Daily replenishment: {stateData.daily}</h2>
            <h2 className={styles.txt}>Replenishing in: {stateData.replenish}</h2>
          </>
        ) : (
          <p>Loading state data...</p>
        )}
      </div>
    </div>
    </>
  );
}