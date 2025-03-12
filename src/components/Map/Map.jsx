// src/components/Map/Map.jsx
import { useState } from 'react';
import USAMap from "react-usa-map";
import { motion, AnimatePresence } from "framer-motion";
import styles from './Map.module.css';
import Header from '../Header/Header';
import Card from '../Card/Card';
import Glance from '../Glance/Glance';

const Map = () => {
  const [curState, setCurState] = useState(null);
  const [warMenuOpen, setWarMenuOpen] = useState(false);

  const mapHandler = (event) => {
    const selectedState = event.target.dataset.name;
    setCurState(prevState => 
      prevState === selectedState ? null : selectedState
    );
    setWarMenuOpen(prev => !prev);
  };

  const statesCustomConfig = () => ({
    // Add any custom state configurations here
  });

  const handleCloseWarMenu = () => {
    setWarMenuOpen(false);
  };

  return (
    <>
      <Header />
      <div className={styles.container} id="mapcontainer">
        <USAMap 
          customize={statesCustomConfig()} 
          className={styles.path} 
          onClick={mapHandler} 
        />
        <AnimatePresence>
          {warMenuOpen && (
            <Card 
              state={curState} 
              close={handleCloseWarMenu} 
            />
          )} 
        </AnimatePresence>
        <Glance />
      </div>
    </>
  );
};

export default Map;