import React, { useEffect, useState } from 'react';
import styles from './SingleState.module.css';

const SingleState = ({ stateAbbreviation }) => {
  const [statePath, setStatePath] = useState(null);
  const [viewBox, setViewBox] = useState("0 0 959 593");

  useEffect(() => {
    const fullMap = document.querySelector('#mapcontainer');
    if (fullMap) {
      const pathElement = fullMap.querySelector(`path[data-name="${stateAbbreviation}"]`);
      if (pathElement) {
        // Clone the path element
        const clonedPath = pathElement.cloneNode(true);
        
        // Get the bounding box
        const bbox = pathElement.getBBox();
        
        // Set the viewBox
        setViewBox(`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);

        // Remove the transform attribute
        clonedPath.removeAttribute('transform');

        setStatePath(clonedPath);
      }
    }
  }, [stateAbbreviation]);

  if (!statePath) {
    return <p>Loading state...</p>;
  }

  return (
    <svg
      className={styles.state}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width="200"
      height="200"
      preserveAspectRatio="xMidYMid meet"
    >
      <g dangerouslySetInnerHTML={{ __html: statePath.outerHTML }} />
    </svg>
  );
};

export default SingleState;