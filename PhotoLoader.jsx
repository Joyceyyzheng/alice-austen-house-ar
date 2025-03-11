import React, { useRef, useState, useEffect, useCallback } from 'react';
import useStore from './store';
import negativePhoto from './public/assets/negativephoto.svg';
import positivePhoto from './public/assets/negativephoto2.svg';
import closeBtn from "./public/assets/modelviewer_closeBtn.svg";
import nextBtn from "./public/assets/photoLoader_nextBtn.svg";

const PhotoLoader = () => {
	const { currentStep, setCurrentStep } = useStore();
	const [endingOn, setEndingOn] = useState(false);
	const [isNegative, setIsNegative] = useState(false);
	const [isPositive, setIsPositive] = useState(false);
	const [centeredImageIndex, setCenteredImageIndex] = useState(0);
	const carrouselRef = useRef(null);
	const [popUp, setPopUp] = useState(false);

	const handleScroll = useCallback((event) => {
		event.preventDefault();

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
		}, 50);
	}, []);

	useEffect(() => {
		return () => {
			if (handleScroll.timeout) {
				clearTimeout(handleScroll.timeout);
			}
		};
	}, []);

	useEffect(() => {
		if (carrouselRef.current && endingOn) {

			setTimeout(() => {
				const containerWidth = carrouselRef.current.offsetWidth;
				const imageWidth = carrouselRef.current.children[0].offsetWidth;
				const scrollPosition = (imageWidth - containerWidth) / 2;
				carrouselRef.current.scrollLeft = 0;
			}, 100);
		}
	}, [endingOn]);

	useEffect(() => {
		if (isPositive) {
			setTimeout(() => {
				setPopUp(true);
			}, 3000);
		}
	}, [isPositive]);

	useEffect(() => {
		setIsNegative(currentStep === 3);
		setIsPositive(currentStep === 7);
		setEndingOn(currentStep === 8);
	}, [currentStep]);

	const handlePopUpClose = () => { }

	return (
		<>
			{endingOn && (
				<>
					<div className="carrousel-parent">
						<div
							className="picture-container"
							ref={carrouselRef}
							onScroll={handleScroll}
						>

							{[
								{
									src: 'photoLoad1.png',
									title: 'Glass Plate Negative',
									description: 'Alice Austen, Herald Square, 1898.',
								},
								{
									src: 'photoLoad2.png',
									title: 'Albumen Paper Print',
									description: 'Alice Austen, Herald Square, 1898.',
								},
								{
									src: 'photoLoad3.png',
									title: 'Glass Plate Negative',
									description: 'Alice Austen, Brooklyn Bridge, 1898.',
								},
								{
									src: 'photoLoad4.png',
									title: 'Albumen Paper Print',
									description: 'Alice Austen, Brooklyn Bridge, 1898.',
								},
							].map((img, index) => (
								<div key={img.src} className="picture-item">
									<div className="picture-title">{img.title}</div>
									<img
										src={`assets/${img.src}`}
										alt={`ending ${index + 1}`}
										style={{
											transform: centeredImageIndex === index ? 'scale(1)' : 'scale(1)',
											transition: 'transform 0.2s ease-in-out',
										}}
									/>

									<div className="picture-description">{img.description}</div>
								</div>
							))}
						</div>
					</div>
					<div className="link-to-website">
						<a href="https://www.aliceausten.org/" target="_blank" rel="noopener noreferrer" className='link-to-website-anchor'>
							<p>Visit Alice Austen’s Photo Archive</p>
							<img src={nextBtn} alt="nextBtn" />
						</a>
					</div>
				</>
			)}
			{isNegative && (
				<div>
					<div className="photo-loader-title">Negative image on glass plate</div>
					<img className="photo-loader" src={negativePhoto} alt="negative" />
					<div className="photo-loader-alt">Alice Austen and Julia Martin sitting in trees with dogs, 1885</div>
				</div>
			)}
			{isPositive && (
				<div className="photo-loader-container">
					<div className="photo-loader-title">Printed image on paper</div>
					<img className="photo-loader" src={positivePhoto} alt="positive" />
					<div className="photo-loader-alt">Alice Austen and Julia Martin sitting in trees with dogs, 1885</div>
				</div>
			)}
			{
				popUp && (
					<div className="photo-loader-popup">
						<button className="photo-loader-popup-close" onClick={() => setPopUp(false)}>

						</button>
						<div className="photo-loader-popup-content">
							<div>Thank you for finishing Alice’s photo development process! </div>
							<div className='photo-loader-start' onClick={() => {
								setEndingOn(true);
								setCurrentStep(8);
								setPopUp(false);
							}}>
								<p>See more of Alice’s photo</p>
								<img src={nextBtn} alt="nextBtn" />
							</div>
						</div>
					</div >
				)
			}
		</>
	);
};

export default PhotoLoader;
