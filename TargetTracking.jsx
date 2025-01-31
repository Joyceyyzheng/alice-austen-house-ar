import React, { useState, useEffect } from 'react';
import Background from 'three/src/renderers/common/Background.js';
import useStore from "./store";

const styles = {

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    overlayImage: {
        maxWidth: '500px',
        padding: '1rem',
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
            });

            target.addEventListener('targetLost', () => {

                activeTargets.delete(index);

                if (activeTargets.size === 0) {
                    // setIsAnyTargetFound(false);
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

            {!isAnyTargetFound && !tutorialActive && (
                <>
                    <TextBox />
                    <div className='ar-overlay' style={styles.overlay}>
                        <img
                            className="ar-overlay-image"
                            src="/assets/arTarget.svg"
                            alt="Please scan a target"
                            style={styles.overlayImage}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
export default TargetTracking;