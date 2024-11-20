import useStore from "./store";
import { useState, useEffect } from "react";
const BlurOverlay = () => {
  const { tutorialStep } = useStore();

  const [tutorialExist, setTutorialExist] = useState(false);

  useEffect(() => {
    console.info(tutorialStep);
    if (tutorialStep >= 0 && tutorialStep < 5) {
      setTutorialExist(true);
    } else {
      setTutorialExist(false);
    }
  }, [tutorialStep]);

  return (
    tutorialExist && (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
          zIndex: 11, //⚠️tutorial overlay z-index
        }}
      ></div>
    )
  );
};

export default BlurOverlay;
