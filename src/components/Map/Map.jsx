import { useEffect, useState } from 'react';
import USAMap from "react-usa-map";
import styles from './Map.module.css';
import Card from '../Card/Card';
import { motion, AnimatePresence } from "framer-motion";
import Header from '../Header/Header';
import Glance from '../Glance/Glance';


// Define the MapComponent as a functional component
const Map = () => {

  const [curState, setCurState] = useState(null);
  const [warMenuOpen, setWarMenuOpen] = useState(false);
  const mapHandler = (event) => {
    console.log(event.target.dataset.name);
    curState === event.target.dataset.name ? setCurState(null) : setCurState(event.target.dataset.name);
    warMenuOpen ? setWarMenuOpen(false) : setWarMenuOpen(true);
  };

  const statesCustomConfig = () => {
    return {

    };
  };

  const handleCloseWarMenu = () => {
    setWarMenuOpen(false);
  };

  return (
    <>
    <Header />
    <div className={styles.container} id="mapcontainer">
      <USAMap 
        customize={statesCustomConfig()} // Use statesCustomConfig directly here
        className={styles.path} 
        onClick={mapHandler} 
      />
      <AnimatePresence>
        { warMenuOpen &&
          <Card state={curState} close={handleCloseWarMenu} />
        } 
      </AnimatePresence>
      <Glance />
      </div>
      </>
  );
};

export default Map;
