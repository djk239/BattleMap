import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { getTopByLevel } from '../../services/api';
import styles from './Leaderboard.module.css';

export default function Leaderboard() {
    const [top10, setTop10] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchTop10 = async () => {
        try {
          setIsLoading(true);
          const response = await getTopByLevel();
          setTop10(response);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching top 10:', error);
          setError(error);
          setIsLoading(false);
        }
      };
  
      fetchTop10();
    }, []);

    const renderLeaderboardContent = () => {
      if (isLoading) {
        return <div className={styles.loading}>Loading...</div>;
      }

      if (error) {
        return <div className={styles.error}>Error loading leaderboard</div>;
      }

      if (!top10 || top10.length === 0) {
        return <div className={styles.empty}>No data available</div>;
      }

      return (
        <ul className={styles.leaderboardList}>
          {top10.map((user, index) => (
            <li 
              key={user.id || index} 
              className={`${styles.leaderboardItem} ${styles[`rank${index + 1}`]}`}
            >
              <span className={styles.rank}>{index + 1}</span>
              <div className={styles.userInfo}>
                <span className={styles.username}>{user.username}</span>
                <span className={styles.level}>Level {user.level}</span>
              </div>
            </li>
          ))}
        </ul>
      );
    };

  return (
    <div className={styles.leaderboardContainer}>
      <Header />
      <div className={styles.leaderboardContent}>
        <h1 className={styles.title}>Leaderboard</h1>
        {renderLeaderboardContent()}
      </div>
    </div>
  )
}