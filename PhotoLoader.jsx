import React, { useRef, useState, useEffect } from 'react';
import useStore from './store';
import negativePhoto from './public/assets/negativephoto.svg';
import positivePhoto from './public/assets/negativephoto2.svg';

const PhotoLoader = () => {
	const { currentStep } = useStore();
	const [endingOn, setEndingOn] = useState(false);
	const [isNegative, setIsNegative] = useState(false);
	const [isPositive, setIsPositive] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const carrouselRef = useRef(null);

	// Changed to use onScroll prop instead of addEventListener
	const handleScroll = (event) => {
		const scrollLeft = event.target.scrollLeft;
		console.log('Scroll position:', scrollLeft); // Debug log

		if (scrollLeft > 10) {
			!scrolled && setScrolled(true);
		} else {
			scrolled && setScrolled(false);
		}
	};

	// Watch for currentStep changes
	useEffect(() => {
		setIsNegative(currentStep === 3);
		setIsPositive(currentStep === 7);
		setEndingOn(currentStep === 8);
	}, [currentStep]);

	// Debug useEffect to monitor scrolled state
	useEffect(() => {
		console.log('Scrolled state changed:', scrolled);
	}, [scrolled]);

	return (
		<>
			{endingOn && (
				<div className="carrousel-parent">
					<div
						className="picture-container"
						ref={carrouselRef}
						onScroll={handleScroll} // Using React's onScroll instead of addEventListener
						style={{
							marginLeft: scrolled ? '0px' : '300px',
							transition: 'margin 0.3s ease',
						}}
					>
						<img src="assets/Carousel1.png" alt="ending" />
						<img src="assets/Carousel2.png" alt="ending" />
						<img src="assets/Carousel3.png" alt="ending" />
						<img src="assets/Carousel4.png" alt="ending" />
					</div>
				</div>
			)}
			{isNegative && (
				<div>
					<img className="photo-loader" src={negativePhoto} alt="negative" />
				</div>
			)}
			{isPositive && (
				<div>
					<img className="photo-loader" src={positivePhoto} alt="positive" />
				</div>
			)}
		</>
	);
};

export default PhotoLoader;
