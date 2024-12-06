import { Suspense, useEffect, useState } from "react";
import React from "react";
import equipBtn from "./public/assets/equipBtn.svg";
import useStore from "./store";
import ModelContent from "./ModelContent";
import ModelViewer from "./ModelViewer";


const ExampleModel = () => {
  const [isTutorial, setIsTutorial] = useState(false);
  const { tutorialStep, tutorialActive } = useStore();
  useEffect(() => {
    if (tutorialStep === 4 && tutorialActive) {
      setIsTutorial(true);
    } else {
      setIsTutorial(false);
    }
  }, [tutorialStep, tutorialActive]);
  //only for tutorials
  //console.info("Example Model mounted", ModelContent[1][0].model);

  return (
    <Suspense fallback={<div>Loading model...</div>}>
      <div className={`sample-model-viewer-container${isTutorial ? "up" : ""}`}>
        <ModelViewer
          model={ModelContent[2][0].model}
          showBtn={false}
          opacityValue={1.0}
        // onClose={handleCloseViewer}
        />
      </div>
    </Suspense>
  );
};

const MenuBtn = ({ onClick }) => {
  const [isTutorial, setIsTutorial] = useState(false);
  const { tutorialStep, tutorialActive } = useStore();
  useEffect(() => {
    if (tutorialStep === 2 && tutorialActive) {
      setIsTutorial(true);

    } else {
      setIsTutorial(false);
    }
  }, [tutorialStep, tutorialActive]);
  return (
    <div className={`menu-btn ${isTutorial ? "up" : ""}`} onClick={onClick}>
      <div className="menu-btn-icon">
        <img src={equipBtn} alt="equipBtn" />
      </div>
      <div className="menu-btn-text">Equipment</div>
    </div>
  );
};


const ExpandedMenu = ({ onToggle }) => {
  const { currentStep, tutorialStep, modalExpanded, setModalExpanded, tutorialActive, setSelectedModelIndex, selectedModelIndex } =
    useStore();
  const [selectedModel, setSelectedModel] = useState(null);
  const [isTutorial, setIsTutorial] = useState(false);

  useEffect(() => {
    if (tutorialActive && tutorialStep === 3) {
      setIsTutorial(true);
    } else if (tutorialActive & tutorialStep === 4) {
      setIsTutorial(true);

    } else {
      setIsTutorial(false);
    }

  }, [tutorialStep, tutorialActive]);

  const models = ModelContent[currentStep] || [];

  const handleModelClick = (model, index) => {
    setSelectedModel({ ...model, index });
    setSelectedModelIndex(index);
    console.info("Selected model index:", index);

    console.info("Opacity value:", ModelContent[currentStep][index].opacity);

  };

  const handleCloseViewer = () => {
    setSelectedModel(null);
  };

  return (
    <>
      <div className={`expanded-menu ${isTutorial ? "up" : ""}`}>
        <div className="expanded-model-container">
          {models.map((model, index) => (
            <div
              key={model.name}
              className="expanded-menu-item"
              onClick={() => handleModelClick(model, index)}
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
              opacityValue={ModelContent[currentStep][selectedModelIndex].opacity}
            />
          </div>
        </Suspense>
      )}
    </>
  );
};

const Equipment = () => {
  //   const [expanded, setExpanded] = useState(false);
  const { modalExpanded, setModalExpanded, currentStep, tutorialStep, tutorialActive } =
    useStore();
  const [showModal, setShowModal] = useState(true);
  const [tutorialModel, setTutorialModel] = useState(false);
  const [isTutorial, setIsTutorial] = useState(false);



  //read tutorial steps
  useEffect(() => {
    // console.info(tutorialStep);
    if (tutorialStep === 2 && tutorialActive) {
      setIsTutorial(true);
      setModalExpanded(false); // Ensure modal remains consistent
      setTutorialModel(false);
      //console.info("istutorial?", isTutorial, tutorialStep);
    }
    else if (tutorialStep === 3 && tutorialActive) {
      //equipment step
      setModalExpanded(true);
      setIsTutorial(true);
      //   console.info("istutorial?", isTutorial, tutorialStep);

      //   console.info("Equipment tutorial");
    } else if (tutorialStep === 4 && tutorialActive) {
      setTutorialModel(true);
      setIsTutorial(true);
      //setOverlay(false);
      //  console.log("example models step");
      //  setModalExpanded(true);
    } else {
      setModalExpanded(false);
      setTutorialModel(false);
      setIsTutorial(false);

    }
  }, [tutorialStep, tutorialActive]);

  useEffect(() => {
    //equipment gone on certain steps
    if (currentStep === 7 || currentStep === 3) {
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

      <div className={`equipment ${isTutorial ? "up" : ""}`}>
        {showModal && (
          <>
            {modalExpanded ? (
              <>
                <ExpandedMenu onToggle={toggleModalExpanded} />
              </>
            ) : (
              <>
                <MenuBtn onClick={toggleModalExpanded} />
              </>
            )}
          </>
        )}
      </div>

      {tutorialModel && tutorialActive && <ExampleModel />}
    </>
  );
};

export default Equipment;
