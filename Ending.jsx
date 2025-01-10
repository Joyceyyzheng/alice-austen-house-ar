import React, { useState, useEffect } from "react";
import useStore from "./store";

const Ending = () => {
    const { currentStep } = useStore();
    const [endingOn, setEndingOn] = useState(false);

    useEffect(() => {
        if (currentStep == 8) {

            setEndingOn(true);
        }
    }, [currentStep]);

    return (
        (endingOn &&
            <div className="carrousel-parent">
                <div className="picture-container">
                    <img src="assets/Carousel1.png" alt="ending" />
                    <img src="assets/Carousel2.png" alt="ending" />
                    <img src="assets/Carousel3.png" alt="ending" />
                    <img src="assets/Carousel4.png" alt="ending" />
                </div>
            </div>)
    );
}
export default Ending;