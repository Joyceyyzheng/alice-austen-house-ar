import React, { useRef, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import useStore from './store';
import Tutorial from './Tutorial';
import Opening from './Opening';
import Equipment from './Equipment';
import InformationPanel from './InformationPanel';
import BlurOverlay from './BlurOverlay';
import PhotoLoader from './PhotoLoader';
import MindARViewer from './mindar-viewer';

const App = () => {
	const { currentStep, nextStep, prevStep, programStart } = useStore();

	// Create refs for all models
	const modelRefs = {
		camera: useRef(null),
		room: useRef(null),
		frame: useRef(null),
		newCamera: useRef(null),
		contact: useRef(null),
		tank: useRef(null),
		tray: useRef(null),
		spoon: useRef(null),
		imageTarget: useRef(null),
		testTarget: useRef(null),
		anim1: useRef(null),
		anim2: useRef(null),
		anim4: useRef(null),
		anim5: useRef(null),
		anim6: useRef(null)
	};

	// Define model visibility configurations for each step
	const stepConfigurations = {
		1: {
			room: false,
			camera: false,
			frame: false,
			contact: false,
			tank: false,
			tray: false,
			spoon: false,
			anim1: true,
			anim2: false,
			anim4: false,
			anim5: false,
			anim6: false

		},
		2: {
			room: false,
			camera: false,
			frame: false,
			contact: false,
			tank: false,
			tray: false,
			spoon: false,
			anim1: false,
			anim2: true,
			anim4: false,
			anim5: false,
			anim6: false
		},
		3: {
			room: false,
			camera: false,
			frame: false,
			contact: false,
			tank: false,
			tray: false,
			spoon: false,
			anim1: false,
			anim2: false,
			anim4: false,
			anim5: false,
			anim6: false
		},
		4: {
			room: false,
			camera: false,
			frame: false,
			contact: false,
			tank: false,
			tray: false,
			spoon: false,
			anim1: false,
			anim2: false,
			anim4: true,
			anim5: false,
			anim6: false
		},
		5: {
			room: false,
			camera: false,
			frame: false,
			contact: false,
			tank: false,
			tray: false,
			spoon: false,
			anim1: false,
			anim2: false,
			anim4: false,
			anim5: true,
			anim6: false
		},
		6: {
			room: false,
			camera: false,
			frame: false,
			contact: false,
			tank: false,
			tray: false,
			spoon: false,
			anim1: false,
			anim2: false,
			anim4: false,
			anim5: false,
			anim6: true
		},
		7: {
			room: false,
			camera: false,
			frame: false,
			contact: false,
			tank: false,
			tray: false,
			spoon: false,
			anim1: false,
			anim2: false,
			anim4: false,
			anim5: false,
			anim6: false
		}
	};

	// Initialize refs on mount
	useEffect(() => {
		Object.entries(modelRefs).forEach(([key, ref]) => {
			const selector = key === 'frame' ? '[src="#cupModel"]' :
				key === 'newCamera' ? '[src="#newCamModel"]' :
					key === 'testTarget' ? '[src="#bearModel"]' :
						key === 'anim1' ? '[src="#anim1"]' :
							key === 'anim2' ? '[src="#anim2"]' :
								key === 'anim4' ? '[src="#anim4"]' :
									key === 'anim5' ? '[src="#anim5"]' :
										key === 'anim6' ? '[src="#anim6"]' :
											`[src="#${key}Model"]`;

			ref.current = document.querySelector(selector);
		});
	}, []);

	// Update model visibility based on current step
	useEffect(() => {
		const configuration = stepConfigurations[currentStep];
		if (!configuration) return;

		Object.entries(configuration).forEach(([model, isVisible]) => {
			const modelRef = modelRefs[model];
			if (modelRef.current) {
				modelRef.current.setAttribute('visible', isVisible);
			}
		});
	}, [currentStep]);

	const pauseAnimation = () => {
		if (modelRefs.room.current) {
			modelRefs.room.current.setAttribute('animation-mixer', { timeScale: 0 });
		}
	};

	const playAnimation = () => {
		if (modelRefs.room.current) {
			modelRefs.room.current.setAttribute('animation-mixer', { timeScale: 1 });
		}
	};

	return (
		<div>
			<div className="container">
				<MindARViewer />
			</div>
			{programStart ? (
				<>
					<Tutorial />
					<InformationPanel />
					<ProgressBar />
					<Equipment />
					<BlurOverlay />
					<PhotoLoader />
					{/* <div className="mainLogo" /> */}
					<button className="nextBtn" onClick={nextStep} />
					<button className="prevBtn" onClick={prevStep} />
				</>
			) : (
				<Opening />
			)}
		</div>
	);
};

export default App;