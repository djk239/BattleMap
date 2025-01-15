import React from 'react';
import USAMap from "react-usa-map";
import styles from './Map.module.css';

// Define the MapComponent as a functional component
const Map = () => {
  const mapHandler = (event) => {
    console.log(event.target.dataset.name);
  };

  const statesCustomConfig = () => {
    return {

    };
  };

  return (
    <div className={styles.container} id="mapcotainer">
      <USAMap 
        customize={statesCustomConfig()} // Use statesCustomConfig directly here
        className={styles.path} 
        onClick={mapHandler} 
      />
    </div>
  );
};

export default Map;
