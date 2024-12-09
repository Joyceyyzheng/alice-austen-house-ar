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
	const [centeredImageIndex, setCenteredImageIndex] = useState(0);
	const carrouselRef = useRef(null);

	const handleScroll = (event) => {
		const scrollLeft = event.target.scrollLeft;
		const imageWidth = event.target.children[0].offsetWidth;
		const normalizedPosition = scrollLeft / imageWidth;

		const centerIndex = Math.floor(
			normalizedPosition < 0.2 ? 0 :
				normalizedPosition < 1.2 ? 1 :
					normalizedPosition < 2.2 ? 2 : 3
		);

		setCenteredImageIndex(centerIndex);

		if (scrollLeft > 10) {
			!scrolled && setScrolled(true);
		} else {
			scrolled && setScrolled(false);
		}
	};

	useEffect(() => {
		setIsNegative(currentStep === 3);
		setIsPositive(currentStep === 7);
		setEndingOn(currentStep === 8);
	}, [currentStep]);

	return (
		<>
			{endingOn && (
				<div className="carrousel-parent">
					<div
						className="picture-container"
						ref={carrouselRef}
						onScroll={handleScroll}
						style={{
							marginLeft: scrolled ? '0px' : '300px',
							transition: 'margin 0.3s ease',
						}}
					>
						{['Carousel1.png', 'Carousel2.png', 'Carousel3.png', 'Carousel4.png'].map((img, index) => (
							<img
								key={img}
								src={`assets/${img}`}
								alt={`ending ${index + 1}`}
								style={{
									transform: centeredImageIndex === index
										? 'scale(1.3)'
										: 'scale(1)',
									transition: 'transform 0.3s ease'
								}}
							/>
						))}
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