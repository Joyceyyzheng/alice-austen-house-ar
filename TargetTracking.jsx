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

const TextBox = () => {
    return (
        <div className="track-textbox">
            <div className="track-text">
                <div className="track-title">Scan the target</div>
                <div className="track-content">Align the brackets to the target on miniature floor.</div>
            </div>
        </div >
    )
}

const TargetTracking = ({ sceneRef }) => {

    const [isAnyTargetFound, setIsAnyTargetFound] = useState(false);
    const [firstTargetFound, setFirstTargetFound] = useState(false);
    const { tutorialActive } = useStore();

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

    return (
        <div>
            {!isAnyTargetFound && !tutorialActive && !firstTargetFound && (<TextBox />)}
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