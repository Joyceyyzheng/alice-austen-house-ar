import React, { useRef, useState, useEffect } from "react";
import useStore from "./store";

const Ending = () => {
    const { currentStep } = useStore();
    const [endingOn, setEndingOn] = useState(false);

    useEffect(() => {
        if (currentStep == 8) {
            // console.log("step 8, Ending mounted");
            setEndingOn(true);
        }
    }, [currentStep]);

    const scrollHorizontally = (e) => {
    }

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