// ModelViewer.jsx
import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import closeBtn from "./public/assets/modelviewer_closeBtn.svg";
import useStore from "./store";

const ModelViewer = ({ model, onClose, showBtn = true, opacityValue, name }) => {
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
    // <div className={`model-viewer${isTutorial ? "up" : ""}`}>
    <div className="model-viewer">
      {showBtn && (
        <button className="model-viewer-close-btn" onClick={onClose}>
          <img src={closeBtn} alt="equipBtn" />
        </button>
      )}
      <div className="model-viewer-title">{name}</div>

      <Canvas style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={1.4} />
        <directionalLight position={[10, 10, 10]} intensity={2.0} />
        <primitive
          ref={modelRef}
          object={scene}
          scale={0.2}
          rotation={[0, Math.PI / 4, Math.PI / 4]}
          onUpdate={(self) => {
            self.traverse((child) => {
              if (child.isMesh && child.material) {
                child.material.transparent = true;
                child.material.opacity = opacityValue;
                child.material.alphaTest = opacityValue;
                child.material.depthWrite = true;
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
