import React, { useState, useEffect } from "react";
import useStore from "./store";



const LightsOff = () => {
  const [isTutorial, setIsTutorial] = useState(false);
  const { tutorialStep } = useStore();
  useEffect(() => {
    if (tutorialStep === 5) {
      setIsTutorial(true);
    } else {
      setIsTutorial(false);
    }
  }, [tutorialStep]);

  return (
    <>
      <div className={`light-off-parent ${isTutorial ? "up" : ""}`}></div>
    </>
  );
};

export default LightsOff;
