import React, { useRef, useState, useEffect, useCallback } from 'react';
import useStore from './store';
import negativePhoto from './public/assets/negativephoto.svg';
import positivePhoto from './public/assets/negativephoto2.svg';

const PhotoLoader = () => {
	const { currentStep } = useStore();
	const [endingOn, setEndingOn] = useState(false);
	const [isNegative, setIsNegative] = useState(false);
	const [isPositive, setIsPositive] = useState(false);
	const [centeredImageIndex, setCenteredImageIndex] = useState(0);
	const carrouselRef = useRef(null);

	// Debounced scroll handler
	const handleScroll = useCallback((event) => {
		event.preventDefault();

		// If we're already processing a scroll event, wait
		if (handleScroll.timeout) {
			clearTimeout(handleScroll.timeout);
		}

		handleScroll.timeout = setTimeout(() => {
			const container = event.target;
			const containerWidth = container.offsetWidth;
			const scrollLeft = container.scrollLeft;
			const images = Array.from(container.children);

			const containerCenter = scrollLeft + containerWidth / 2;

			let minDistance = Infinity;
			let centerIndex = 0;

			images.forEach((img, index) => {
				const imgLeft = img.offsetLeft;
				const imgWidth = img.offsetWidth;
				const imgCenter = imgLeft + imgWidth / 2;
				const distance = Math.abs(containerCenter - imgCenter);

				if (distance < minDistance) {
					minDistance = distance;
					centerIndex = index;
				}
			});

			setCenteredImageIndex(centerIndex);
		}, 50); // 50ms debounce
	}, []);

	// Clean up the timeout on unmount
	useEffect(() => {
		return () => {
			if (handleScroll.timeout) {
				clearTimeout(handleScroll.timeout);
			}
		};
	}, []);

	// Center first image on mount
	useEffect(() => {
		if (carrouselRef.current && endingOn) {
			// Add a small delay to ensure DOM is ready
			setTimeout(() => {
				const containerWidth = carrouselRef.current.offsetWidth;
				const imageWidth = carrouselRef.current.children[0].offsetWidth;
				const scrollPosition = (imageWidth - containerWidth) / 2;
				carrouselRef.current.scrollLeft = 0;
			}, 100);
		}
	}, [endingOn]);

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
					>
						{[
							'Carousel1.png',
							'Carousel2.png',
							'Carousel3.png',
							'Carousel4.png',
						].map((img, index) => (
							<img
								key={img}
								src={`assets/${img}`}
								alt={`ending ${index + 1}`}
								style={{
									transform:
										centeredImageIndex === index ? 'scale(1.3)' : 'scale(1)',
									transition: 'transform 0.2s ease-in-out',
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
