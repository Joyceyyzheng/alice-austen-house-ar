import useStore from "./store";
import { useState, useEffect } from "react";
const BlurOverlay = () => {
  const { tutorialStep, tutorialActive } = useStore();

  // const [tutorialExist, setTutorialExist] = useState(false);

  // useEffect(() => {
  //   console.info(tutorialStep);
  //   console.info(tutorialExist)
  //   if (tutorialActive) {
  //     if (tutorialStep >= 0 && tutorialStep < 5) {
  //       setTutorialExist(true);
  //     } else {
  //       setTutorialExist(false);
  //     }
  //   }
  // }, [tutorialStep, tutorialActive]);

  return (
    tutorialActive && (
      <div id="blur-overlay"
      ></div>
    )
  );
};

export default BlurOverlay;
