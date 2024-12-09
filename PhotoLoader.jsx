import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import useStore from "./store";
import negativePhoto from "./public/assets/negativephoto.svg";
import positivePhoto from "./public/assets/negativephoto2.svg";

const PhotoLoader = () => {
    const { currentStep } = useStore();
    const [endingOn, setEndingOn] = useState(false);
    const [isNegative, setIsNegative] = useState(false);
    const [isPositive, setIsPositive] = useState(false);
    const carrouselRef = useRef();
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        if (carrouselRef.current.scrollLeft > 0) {
            setScrolled(true);
            console.log("scrolled");
        }
        // } else {
        //     setScrolled(false);
        // }
    };

    useEffect(() => {
        const carrousel = carrouselRef.current;

        // if (!carrousel) {
        //     // Retry attaching the event listener after the DOM is rendered
        //     const timeout = setTimeout(() => {
        //         if (carrouselRef.current) {
        //             console.info("scroll event added (delayed)");
        //             carrouselRef.current.addEventListener("scroll", handleScroll);
        //         }
        //     }, 0);

        //     return () => clearTimeout(timeout);
        // }

        if (carrousel) {
            console.info("scroll event added");
            carrousel.addEventListener("scroll", handleScroll);

            return () => {
                console.info("scroll event removed");
                carrousel.removeEventListener("scroll", handleScroll);
            };
        }

    }, [carrouselRef]);


    useEffect(() => {
        if (currentStep === 3) {
            setIsNegative(true);
        } else {
            setIsNegative(false);
        }

        if (currentStep === 7) {
            setIsPositive(true);
        } else {
            setIsPositive(false);
        }

        if (currentStep === 8) {
            setEndingOn(true);
        } else {
            setEndingOn(false);
        }
    }, [currentStep]);

    return (
        <>
            {endingOn &&
                <div
                    className="carrousel-parent"
                >
                    <div className="picture-container"
                        ref={carrouselRef}
                        style={{
                            marginLeft: scrolled ? "0px" : "300px", // Remove padding when scrolled
                            transition: "margin 0.3s ease", // Smooth transition
                        }}>
                        <img src="assets/Carousel1.png" alt="ending" />
                        <img src="assets/Carousel2.png" alt="ending" />
                        <img src="assets/Carousel3.png" alt="ending" />
                        <img src="assets/Carousel4.png" alt="ending" />
                    </div>
                </div>}
            {isNegative && (<div ><img className="photo-loader" src={negativePhoto} /></div>)}
            {isPositive && (<div ><img className="photo-loader" src={positivePhoto} /></div>)}
        </>
    );
}
export default PhotoLoader;