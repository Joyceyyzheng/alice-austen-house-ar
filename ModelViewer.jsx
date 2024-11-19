// ModelViewer.jsx
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import closeBtn from "./public/assets/close_btn.svg";

const ModelViewer = ({ model, onClose, showBtn = true }) => {
  const modelRef = useRef();

  const { scene } = useGLTF(model);

  return (
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
        />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
