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
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
          "--webkit-backdrop-filter": " blur(10px)",
          zIndex: 11, //⚠️tutorial overlay z-index
        }}
      ></div>
    )
  );
};

export default BlurOverlay;
