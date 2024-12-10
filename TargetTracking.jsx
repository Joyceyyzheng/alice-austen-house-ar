import React, { useState, useEffect } from 'react';

const styles = {
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayImage: {
        maxWidth: '500px',
        padding: '1rem',
    },
};

const TargetTracking = ({ sceneRef }) => {

    const [isAnyTargetFound, setIsAnyTargetFound] = useState(false);

    useEffect(() => {
        if (!sceneRef.current) return;
        const sceneEl = sceneRef.current;
        console.log(sceneEl);
        let activeTargets = new Set();

        // Get all target entities
        const targets = sceneEl.querySelectorAll('[mindar-image-target]');

        targets.forEach((target, index) => {
            target.addEventListener('targetFound', () => {
                console.log(`Target ${index} found`);
                activeTargets.add(index);
                setIsAnyTargetFound(true);
            });

            target.addEventListener('targetLost', () => {
                console.log(`Target ${index} lost`);
                activeTargets.delete(index);
                // Only set to false if no targets are active
                if (activeTargets.size === 0) {
                    setIsAnyTargetFound(false);
                }
            });
        });

        // Cleanup
        return () => {
            targets.forEach((target, index) => {
                target.removeEventListener('targetFound', () => { });
                target.removeEventListener('targetLost', () => { });
            });
        };
    }, []);

    return (
        <div>
            {!isAnyTargetFound && (
                <div style={styles.overlay}>
                    <img
                        src="/assets/target-frame.png"
                        alt="Please scan a target"
                        style={styles.overlayImage}
                    />
                </div>
            )}
        </div>
    )
}
export default TargetTracking;