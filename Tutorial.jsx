import { useEffect, useState } from "react";
import React from "react";
import tutorialContent from "./TutorialContent";
import nextBtn from "./public/assets/tutorial_next_btn.svg";
import rotationIcon from "./public/assets/rotation_icon.svg";
import useStore from "./store";

const stepStyles = [
  {
    outerW: "381px",
    outerH: "241px",
    width: "420px",
    height: "193px",
    position: { bottom: "18.59%", left: "7.28%" },
  },
  {
    outerW: "277px",
    outerH: "178px",
    width: "420px",
    height: "176px",
    position: { bottom: "26.24%", left: "8.54%" },
  },
  {
    outerW: "381px",
    outerH: "241px",
    width: "420px",
    height: "159px",
    position: { bottom: "6.78%", left: "8.87%" },
  },
  {
    outerW: "381px",
    outerH: "241px",
    width: "420px",
    height: "176px",
    position: { top: "22.9%", left: "8.54%%" },
  },
  {
    outerW: "381px",
    outerH: "241px",
    width: "300px",
    height: "142px",
    position: { top: "6.59%", left: "8.87%" },
  },
];

const mobileStepStyles = [
  {
    outerW: "311px",
    outerH: "161px",
    width: "271px",
    height: "126px",
    position: { bottom: "64px", left: "50%", transform: "translate(-50%, 0)" },
  },
  {
    outerW: "283px",
    outerH: "178px",
    width: "243px",
    height: "143px",
    position: { bottom: "235px", left: "10%",  },
  },
  {
    outerW: "283px",
    outerH: "177px",
    width: "243px",
    height: "142px",
    position: { bottom: "64px", left: "5%", },
  },
  {
    outerW: "311px",
    outerH: "127px",
     width: "271px",
    height: "92px",
    position: { bottom: "64px", left: "50%", transform: "translate(-50%, 0)" },
  },
  {
    width: "311px",
    height: "161px",
    position: { bottom: "64px", left: "50%", transform: "translate(-50%, 0)" },
  },
];

const TutorialComp = ({
  title,
  content,
  onNext,
  onSkip,
  isLastStep,
  position,
  stepStyles,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Choose appropriate styles based on device type
  const currentStyles = stepStyles;

  return (
    <div
      className="tutorial"
      style={{
        position: "absolute",
        ...(currentStyles.position || {}),
        width: currentStyles.outerW,
        height: currentStyles.outerH,
        boxShadow: isMobile ? "2px 4px 10px rgba(0, 0, 0, 0.25)" : "none",
      }}
    >
      <div
        className="tutorial-comp-parent"
        style={{
          width: currentStyles.width,
          height: currentStyles.height,
          padding: isMobile ? "20px" : "0",
          paddingBottom: isMobile ? "0px" : "0px",
        }}
      >
        <div className="tutorial-comp-text">
          <div
            className="tutorial-comp-title"
            style={{
              padding: isMobile ? "0" : null,
              margin: isMobile ? "0" : null,
            }}
          >
            {title}
          </div>
          <div
            className="tutorial-comp-content"
            style={{
              padding: isMobile ? "0" : null,
              margin: isMobile ? "0" : null,
            }}
          >
            {Array.isArray(content) ? (
              content.map((line, index) => (
                <p
                  key={index}
                  style={{
                    marginBottom: isMobile ?  '0px': (index < content.length - 1 ? "16px" : "0px"),
                  }}
                >
                  {line}
                </p>
              ))
            ) : (
              <p>{content}</p>
            )}
          </div>
        </div>
        <div
          className="tutorial-comp-buttons"
          style={{
            margin: isMobile ? "0" : null,
          
          }}
        >
          <div className="tutorial-comp-skip" onClick={onSkip}>
            Skip
          </div>
          <div className="tutorial-comp-next-container">
            <div className="tutorial-comp-next" onClick={onNext}>
              {isLastStep ? "Finish" : "Next"}
            </div>
            <div className="tutorial-comp-next-Btn">
              <img src={nextBtn} alt="nextBtn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Overlay = () => {
  // return <div className="tutorial-overlay"></div>;
};

const Dots = ({ currentStep }) => {
  return (
    <div className="tutorial-dots">
      {tutorialContent.map((_, index) => (
        <div
          key={index}
          className={`tutorial-dot ${index === currentStep ? "active" : ""}`}
        ></div>
      ))}
    </div>
  );
};

const RotationIcon = () => {
  return (
    <div className="tutorial-rotation-icon">
      <img src={rotationIcon} alt="rotationIcon" />
    </div>
  );
};

const GifLoader = () => {
  const { tutorialStep } = useStore();
  const [deviceType, setDeviceType] = useState("desktop");

  const BREAKPOINTS = {
    mobile: 767,
  };

  const getDeviceType = (width) => {
    if (width <= BREAKPOINTS.mobile) return "mobile";
    return "tablet";
  };

  const GIF_SOURCES = {
    step1: {
      mobile: "assets/Tablet_Textbox_expand.mov",
      tablet: "assets/tablet_textbox.gif",
    },
    step2: {
      mobile: "assets/mobile_anim.gif",
      tablet: "assets/mobile_anim.gif",
    },
    step3: {
      mobile: "assets/mobile_tool.gif",
      tablet: "assets/tablet_tool.gif",
    },
  };

  useEffect(() => {
    const handleResize = () => {
      const newDeviceType = getDeviceType(window.innerWidth);
      setDeviceType(newDeviceType);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getGifSource = (step) => {
    switch (step) {
      case 1:
        return GIF_SOURCES.step1[deviceType];
      case 2:
        return GIF_SOURCES.step2[deviceType];
      case 3:
        return GIF_SOURCES.step3[deviceType];
      default:
        return null;
    }
  };

  return (
    <div>
      {tutorialStep === 1 && (
        <img
          className="tutorial-gif-loader"
          src={getGifSource(1)}
          alt="Tutorial Step 1"
        />
      )}
      {tutorialStep === 2 && (
        <div className="tutorial-gif-loader-anim">
          <img
            className="tutorial-gif-loader-anim"
            src={getGifSource(2)}
            alt="Tutorial Step 2"
          />
        </div>
      )}
      {tutorialStep === 3 && (
        <img
          className="tutorial-gif-loader-tool"
          src={getGifSource(3)}
          alt="Tutorial Step 3"
        />
      )}
    </div>
  );
};

const Tutorial = () => {
  const { tutorialStep, setTutorialStep, tutorialActive, setTutorialActive } =
    useStore();
  const [icon, setIcon] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (tutorialStep === 4) {
      setIcon(true);
    } else {
      setIcon(false);
    }
  }, [tutorialStep]);

  const handleNext = () => {
    if (tutorialStep < tutorialContent.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setTutorialActive(false);
    }
  };

  const handleSkip = () => {
    setTutorialActive(false);
  };

  if (!tutorialActive) return null;

  return (
    <div>
      <Overlay />
      <GifLoader />
      <Dots currentStep={tutorialStep} />
      {icon && <RotationIcon />}
      <TutorialComp
        stepStyles={
          isMobile ? mobileStepStyles[tutorialStep] : stepStyles[tutorialStep]
        }
        title={tutorialContent[tutorialStep].title}
        content={tutorialContent[tutorialStep].content}
        onNext={handleNext}
        onSkip={handleSkip}
        isLastStep={tutorialStep === tutorialContent.length - 1}
        position={tutorialContent[tutorialStep].position}
      />
    </div>
  );
};
export default Tutorial;
