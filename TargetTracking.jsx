import React, { useState, useEffect } from 'react';
import Background from 'three/src/renderers/common/Background.js';
import useStore from "./store";

const styles = {

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        // right: 0,
        // bottom: 0,
        // zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',

    },
    overlayImage: {
        maxWidth: '500px',
        width: '80%',
        padding: '1rem',
        objectFit: 'contain',

    },


};

// const TextBox = () => {
//     return (
//         <div className="track-textbox">
//             <div className="track-text">
//                 <div className="track-title">Scan the target</div>
//                 <div className="track-content">Align the brackets to the target on miniature floor.</div>
//             </div>
//         </div >
//     )
// }

const TextBox = ({ title = "", content = "" }) => {
    return (
        <div className="track-textbox">
            <div className="track-text">
                <div className="track-title">{title}</div>
                <div className="track-content">{content}</div>
            </div>
        </div>
    );
};

const TargetTracking = ({ sceneRef }) => {

    const [isAnyTargetFound, setIsAnyTargetFound] = useState(false);
    const [firstTargetFound, setFirstTargetFound] = useState(false);
    const { tutorialActive } = useStore();
    const [showGif, setShowGif] = useState(true);
    const [gifSource, setGifSource] = useState("/assets/ARipad-ezgif.com-reverse.gif");


    useEffect(() => {
        if (!sceneRef.current) return;
        const sceneEl = sceneRef.current;
        let activeTargets = new Set();

        const targets = sceneEl.querySelectorAll('[mindar-image-target]');

        targets.forEach((target, index) => {
            target.addEventListener('targetFound', () => {
                activeTargets.add(index);
                setIsAnyTargetFound(true);
                setFirstTargetFound(true);
                console.log('Target found');
            });

            target.addEventListener('targetLost', () => {

                activeTargets.delete(index);

                if (activeTargets.size === 0) {
                    //add a delay
                    setTimeout(() => {
                        setIsAnyTargetFound(false);
                    }, 1500);
                    setIsAnyTargetFound(false);
                    console.log('Target lost');
                }
            });
        });

        return () => {
            targets.forEach((target, index) => {
                target.removeEventListener('targetFound', () => { });
                target.removeEventListener('targetLost', () => { });
            });
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGif(false);
        }, 7500);

        if (!firstTargetFound) {
            clearTimeout(timer);
            // console.log('Tutorial active');
        }

        return () => clearTimeout(timer);

    }, [firstTargetFound]);

    useEffect(() => {

        const checkScreenSize = () => {
            if (window.innerWidth <= 767) {
                setGifSource("/assets/ARPhone-ezgif.com-reverse.gif");
            } else {
                setGifSource("/assets/ARipad-ezgif.com-reverse.gif"); // Desktop version
            }
        };

        checkScreenSize(); // Run on mount
        window.addEventListener("resize", checkScreenSize); // Update on resize

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, [window.innerWidth]);

    return (
        <div>
            {!isAnyTargetFound && !tutorialActive && !firstTargetFound && (<>
                <TextBox title="Scan the target" content="Point your camera at the QR code to continue." />
            </>)}
            {firstTargetFound && showGif && (
                <>  <TextBox title="Lower your device to watch the animation" content="Keep the floor target in frame at all times!" />
                    <img
                        className="intro-gif"
                        src={gifSource}
                        alt="Intro Animation"
                        style={{
                            position: "absolute",
                            top: "70%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "40rem",
                            height: "auto",
                            zIndex: 1000,
                        }}
                    /></>

            )}
            {!isAnyTargetFound && !tutorialActive && (
                <>
                    <div className='ar-overlay' style={styles.overlay}>
                        <img
                            className="ar-overlay-image"
                            src="/assets/arTarget.svg"
                            alt="Please scan a target"
                            style={styles.overlayImage}
                        />
                        {/* <video autoPlay loop muted playsInline className="ar-overlay-video">
                            <source src="/assets/test_expanding.mov" type="video/mov" />
                        </video> */}
                    </div>
                </>
            )}
        </div>
    )
}
export default TargetTracking;