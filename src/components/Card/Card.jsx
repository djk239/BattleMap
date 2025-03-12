// src/components/Card/Card.jsx
import { useEffect, useState, useCallback } from 'react';
import { motion } from "framer-motion";
import styles from './Card.module.css';
import SingleState from './SingleState';
import { fetchState, createDeployment } from '../../services/api';
import { useAuth } from '../../AuthContext';

const cardVariants = {
  initial: { y: '50vh', x: '-50%' },
  animate: { y: '-50%', x: '-50%' },
  exit: { y: '50vh', x: '-50%' }
};

const Card = ({ state, close }) => { 
  const { user, isLoggedIn } = useAuth();
  const [stateData, setStateData] = useState(null);
  const [toDeploy, setToDeploy] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleState = async () => {
      try {
        setIsLoading(true);
        const stateInfo = await fetchState(state);
        setStateData(stateInfo);
      } catch (error) {
        console.error("Error fetching state data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleState();
  }, [state]);

  const handleDeploy = useCallback(async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      alert("You must be logged in to deploy troops.");
      return;
    }
  
    try {
      const deploymentData = {
        state, 
        troops: toDeploy,
      };
  
      const result = await createDeployment(deploymentData);
      alert(`Successfully deployed ${toDeploy} troops to ${state}!`);
    } catch (error) {
      console.error("Deployment failed:", error);
      alert(`Deployment failed: ${error.message || "Unknown error"}`);
    }
  }, [state, toDeploy, isLoggedIn]);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;
    setToDeploy(value);
  };

  if (isLoading) {
    return <div>Loading state data...</div>;
  }

  if (error) {
    return <div>Error loading state information</div>;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={cardVariants}
      transition={{ type: 'tween', duration: 0.5 }}
      className={styles.container}
    >
      <CloseButton onClick={close} />
      
      <div className={styles.infoContainer}>
        <h2 className={styles.txt}>{state}</h2>
        <SingleState stateAbbreviation={state} />
        {stateData && (
          <h3 className={styles.txt}>Owner: {stateData.owner}</h3>
        )}
      </div>
      
      <div className={styles.bar} />
      
      <StateStats 
        stateData={stateData} 
        toDeploy={toDeploy}
        onInputChange={handleInputChange}
        onDeploy={handleDeploy}
      />
    </motion.div>
  );
};

// Extracted close button component
const CloseButton = ({ onClick }) => (
  <svg 
    className={styles.closebtn} 
    viewBox="0 0 26 26" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    onClick={onClick}
  >
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
);

// Extracted state stats component
const StateStats = ({ 
  stateData, 
  toDeploy, 
  onInputChange, 
  onDeploy 
}) => {
  if (!stateData) return null;

  return (
    <div className={styles.statsContainer}>
      <StateStatItem label="Active defense" value={stateData.def_value} />
      <StateStatItem label="Active attacking" value={stateData.atk_value} />
      <StateStatItem label="Daily replenishment" value={stateData.daily_value} />
      <StateStatItem label="Replenishing in" value={stateData.replenish_value} />
      
      <form className={styles.form}>
        <input 
          className={styles.input}
          type="number" 
          min="0" 
          value={toDeploy} 
          onChange={onInputChange} 
        />
        <button 
          className={styles.button} 
          onClick={onDeploy}
        >
          Deploy
        </button>
      </form>
    </div>
  );
};

// Helper component for rendering state stats
const StateStatItem = ({ label, value }) => (
  <h2 className={styles.txt}>{label}: {value}</h2>
);

export default Card;