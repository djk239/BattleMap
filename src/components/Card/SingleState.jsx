// src/components/Card/SingleState.jsx
import { useEffect, useState, useMemo } from 'react';
import styles from './SingleState.module.css';

const SingleState = ({ stateAbbreviation }) => {
  const [statePath, setStatePath] = useState(null);
  const [viewBox, setViewBox] = useState("0 0 959 593");

  useEffect(() => {
    const findStatePath = () => {
      const fullMap = document.querySelector('#mapcontainer');
      if (!fullMap) return null;

      const pathElement = fullMap.querySelector(`path[data-name="${stateAbbreviation}"]`);
      return pathElement;
    };

    const pathElement = findStatePath();
    
    if (pathElement) {
      const clonedPath = pathElement.cloneNode(true);
      const bbox = pathElement.getBBox();
      
      setViewBox(`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
      clonedPath.removeAttribute('transform');
      setStatePath(clonedPath);
    }
  }, [stateAbbreviation]);

  const svgContent = useMemo(() => {
    return statePath 
      ? { __html: statePath.outerHTML } 
      : null;
  }, [statePath]);

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
      {svgContent && <g dangerouslySetInnerHTML={svgContent} />}
    </svg>
  );
};

export default SingleState;