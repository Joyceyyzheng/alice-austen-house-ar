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

const ExampleModel = () => {
  //only for tutorials
  console.info("Example Model mounted", ModelContent[1][0].model);
  return (
    <Suspense fallback={<div>Loading model...</div>}>
      <div className="sample-model-viewer-container">
        <ModelViewer
          model={ModelContent[2][0].model}
          showBtn={false}
          // onClose={handleCloseViewer}
        />
      </div>
    </Suspense>
  );
};

const ExpandedMenu = ({ onToggle }) => {
  const { currentStep, tutorialStep, modalExpanded, setModalExpanded } =
    useStore();
  const [selectedModel, setSelectedModel] = useState(null);

  const models = ModelContent[currentStep] || [];
  const exampleModel = models[0];

  const handleModelClick = (model) => {
    setSelectedModel(model);
  };

  const handleCloseViewer = () => {
    setSelectedModel(null);
  };

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
  const { modalExpanded, setModalExpanded, currentStep, tutorialStep } =
    useStore();
  const [showModal, setShowModal] = useState(true);
  const [tutorialModel, setTutorialModel] = useState(false);

  //read tutorial steps
  useEffect(() => {
    if (tutorialStep === 3) {
      //equipment step
      setModalExpanded(true);
      console.info("Equipment tutorial");
    } else if (tutorialStep === 4) {
      setTutorialModel(true);
      console.log("example models step");
      //  setModalExpanded(true);
    } else {
      setModalExpanded(false);
      setTutorialModel(false);
    }
  }, [tutorialStep]);

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
    //console.log("toggleModalExpanded", modalExpanded);
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
      {tutorialModel && <ExampleModel />}
    </>
  );
};

export default Equipment;
