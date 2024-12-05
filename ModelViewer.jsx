// ModelViewer.jsx
import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import closeBtn from "./public/assets/close_btn.svg";
import useStore from "./store";

const ModelViewer = ({ model, onClose, showBtn = true, opacityValue = 1.0 }) => {
  const modelRef = useRef();

  const { scene } = useGLTF(model);

  //for tutorial
  const [isTutorial, setIsTutorial] = useState(false);
  const { tutorialStep } = useStore();
  useEffect(() => {
    if (tutorialStep === 4) {
      setIsTutorial(true);
    } else {
      setIsTutorial(false);
    }
  }, [tutorialStep]);

  return (
    console.info("opacity value", opacityValue),

    // <div className={`model-viewer${isTutorial ? "up" : ""}`}>
    <div className="model-viewer">
      {showBtn && (
        <button className="model-viewer-close-btn" onClick={onClose}>
          <img src={closeBtn} alt="equipBtn" />
        </button>
      )}

      <Canvas style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} />
        <primitive
          ref={modelRef}
          object={scene}
          scale={0.5}
          rotation={[0, Math.PI / 4, 0]}
          onUpdate={(self) => {
            self.traverse((child) => {
              if (child.isMesh && child.material) {
                child.material.transparent = true;
                child.material.opacity = opacityValue; // Adjust if necessary
                child.material.alphaTest = opacityValue; // Helps with rendering transparency
                child.material.depthWrite = false; // Prevents z-buffer issues
              }
            });
          }}
        />
        <OrbitControls enableZoom={false} autoRotate enablePan={false} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
