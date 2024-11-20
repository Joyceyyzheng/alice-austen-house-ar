import React from "react";
import useStore from "./store";

const TutorialHighlight = ({ step, children }) => {
  const { tutorialStep } = useStore();
  const isActive = Array.isArray(step)
    ? step.includes(tutorialStep)
    : tutorialStep === step;

  console.log(`Tutorial Step: ${tutorialStep}, Active: ${isActive}`);

  return (
    <>
      {/* Highlight Layer */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 13,
            pointerEvents: "none", // Prevent blocking interactions
          }}
        />
      )}

      {/* Render children without affecting their layout */}
      {children}
    </>
  );
};

export default TutorialHighlight;
