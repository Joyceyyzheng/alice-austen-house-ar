import { Suspense, useEffect, useState } from "react";
import React from "react";
import equipBtn from "./public/assets/equipBtn.svg";
import useStore from "./store";
import ModelContent from "./ModelContent";
import ModelViewer from "./ModelViewer";

const MenuBtn = ({ onClick }) => {
  return (
    <div className="menu-btn" onClick={onClick}>
      <div className="menu-btn-icon">
        <img src={equipBtn} alt="equipBtn" />
      </div>
      <div className="menu-btn-text">Equipment</div>
    </div>
  );
};

const ExpandedMenu = ({ onToggle }) => {
  const { currentStep } = useStore();
  const [selectedModel, setSelectedModel] = useState(null);

  const models = ModelContent[currentStep] || [];

  const handleModelClick = (model) => {
    setSelectedModel(model);
  };

  const handleCloseViewer = () => {
    setSelectedModel(null);
  };

  //   console.info("ExpandedMenu");

  return (
    <>
      <div className="expanded-menu">
        <div className="expanded-model-container">
          {models.map((model) => (
            <div
              key={model.name}
              className="expanded-menu-item"
              onClick={() => handleModelClick(model)}
            >
              <img src={model.image} alt={model.name} />
              {/* <p>{model.name}</p> */}
            </div>
          ))}
        </div>
        <div className="expanded-menu-btn" onClick={onToggle}></div>
      </div>
      {selectedModel && (
        <Suspense fallback={<div>Loading model...</div>}>
          <div className="model-viewer-container">
            <ModelViewer
              model={selectedModel.model}
              onClose={handleCloseViewer}
            />
          </div>
        </Suspense>
      )}
    </>
  );
};

const Equipment = () => {
  //   const [expanded, setExpanded] = useState(false);
  const { modalExpanded, setModalExpanded, currentStep } = useStore();
  const [showModal, setShowModal] = useState(true);

  //   useEffect (() => {
  //     if (currentStep == 7) {
  //       console.info("Equipment");}
  //     },[currentStep]);
  //   };

  useEffect(() => {
    if (currentStep === 7) {
      //   console.log("Equipment");
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [currentStep]);

  const toggleModalExpanded = () => {
    setModalExpanded(!modalExpanded);
    console.log("toggleModalExpanded", modalExpanded);
  };

  return (
    <>
      {showModal && (
        <div className="equipment">
          {modalExpanded ? (
            <>
              <ExpandedMenu onToggle={toggleModalExpanded} />
            </>
          ) : (
            <>
              <MenuBtn onClick={toggleModalExpanded} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Equipment;
