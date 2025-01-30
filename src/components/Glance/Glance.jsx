import React, { useEffect, useState } from 'react';
import styles from './Glance.module.css';
import SingleState from '../Card/SingleState';
import { useAuth } from '../../AuthContext';
import { fetchStateByName } from '../../services/api';

export default function Glance() {
  const { user, isLoggedIn } = useAuth();
  const [stateData, setStateData] = useState(null);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const stateInfo = await fetchStateByName(user.homestate);   
        setStateData(stateInfo);
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    };

    fetchState();
  }, [user]);

  // Handle loading or unauthenticated state
  if (!user || !stateData) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <h2 className={styles.title}>At a glance</h2>
          <p className={styles.info}>Home territory: {user.homestate}</p>
          <p className={styles.info}>Current Defense: {stateData.def}</p>
          <p className={styles.info}>Currently Attacking: {stateData.atk}</p>
          <p className={styles.info}>Troop pool: {user.trooppool}</p>
        </div>
        <SingleState stateAbbreviation={user.homestate} />
      </div>
    </>
  );
}