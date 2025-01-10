import useStore from "./store";

const BlurOverlay = () => {
  const { tutorialActive } = useStore();

  return (
    tutorialActive && (
      <div id="blur-overlay"
      ></div>
    )
  );
};

export default BlurOverlay;
