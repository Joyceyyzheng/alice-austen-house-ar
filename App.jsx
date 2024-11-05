// App.jsx
import React, { useEffect, useState } from 'react';

const App = () => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isRoomVisible, setIsRoomVisible] = useState(true);

  // useEffect(() => {
  //   // Initialize once after the component mounts
  //   const sceneEl = document.querySelector('a-scene');
  //   if (sceneEl) {
  //     const arSystem = sceneEl.systems["mindar-image-system"];
  //     arSystem.stayVisible = true; // Set stayVisible to true initially or as needed
  //   }
  // }, []);

  const handleButtonClick = () => {
    setIsCameraVisible(true);
    setIsRoomVisible(false);

    const cameraModelEntity = document.querySelector('[src="#cameraModel"]');
    const roomModelEntity = document.querySelector('[src="#roomModel"]');

    if (cameraModelEntity) {
      cameraModelEntity.setAttribute('visible', true);
      console.log("cameraModelEntity updated to visible");
    } else {
      console.log("cameraModelEntity not found");
    }

    if (roomModelEntity) {
      roomModelEntity.setAttribute('visible', false);
      console.log("roomModelEntity updated to invisible");
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Next one</button>
      <p>Check the console to see visibility updates for 3D models.</p>
    </div>
  );
};

export default App;
