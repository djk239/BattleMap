// src/components/Glance/Glance.jsx
import { useEffect, useState } from 'react';
import styles from './Glance.module.css';
import SingleState from '../Card/SingleState';
import { useAuth } from '../../AuthContext';
import { fetchState } from '../../services/api';

const Glance = () => {
  const { user, isLoggedIn } = useAuth();
  const [stateData, setStateData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStateInfo = async () => {
      if (!isLoggedIn || !user?.homestate) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const stateInfo = await fetchState(user.homestate);   
        setStateData(stateInfo);
      } catch (error) {
        console.error("Error fetching state data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStateInfo();
  }, [user, isLoggedIn]);

  if (!isLoggedIn) return null;

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading state information</div>;
  }

  if (!user || !stateData) {
    return <div className={styles.empty}>No state information available</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h2 className={styles.title}>At a glance</h2>
        <GlanceInfoItem label="Home territory" value={user.homestate} />
        <GlanceInfoItem label="Current Defense" value={stateData.def} />
        <GlanceInfoItem label="Currently Attacking" value={stateData.atk} />
        <GlanceInfoItem label="Troop pool" value={user.trooppool} />
      </div>
      <SingleState stateAbbreviation={user.homestate} />
    </div>
  );
};

// Extract repeated info item rendering to a separate component
const GlanceInfoItem = ({ label, value }) => (
  <p className={styles.info}>
    {label}: {value}
  </p>
);

export default Glance;