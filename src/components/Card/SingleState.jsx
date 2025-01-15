// src/components/Card/SingleState.jsx
import React, { useEffect, useState } from 'react';
import styles from './SingleState.module.css';  

const SingleState = ({ stateAbbreviation }) => {
  const [statePath, setStatePath] = useState(null);

  useEffect(() => {
    // Ensure the full map is rendered and accessible
    const fullMap = document.querySelector('#mapcotainer'); 
    if (fullMap) {
      const pathElement = fullMap.querySelector(`path[data-name="${stateAbbreviation}"]`);
      if (pathElement) {
        const clonedPath = pathElement.cloneNode(true);
        setStatePath(clonedPath);
      }
    }
  }, [stateAbbreviation]);

  if (!statePath) {
    return <p>Loading state...</p>;
  }

  return (
    <svg className={styles.state}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 959 593" // Adjust the viewBox as needed
    >
      <g dangerouslySetInnerHTML={{ __html: statePath.outerHTML }} />
    </svg>
  );
};

export default SingleState;