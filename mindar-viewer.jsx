import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'aframe-extras';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function MindARViewer() {
	const sceneRef = useRef(null);

	useEffect(() => {
		const sceneEl = sceneRef.current;
	}, []);

	return (
		<a-scene
			ref={sceneRef}
			log
			mindar-image="imageTargetSrc: assets/offcial.mind; maxTrack:7; uiScanning:no; filterMinCF:0.0001; filterBeta: 0.001;id:imageTarget"
			color-space="sRGB"
			renderer="colorManagement: true, physicallyCorrectLights"
			vr-mode-ui="enabled: false"
			device-orientation-permission-ui="enabled: false"
		>
			<a-assets>
				<a-asset-item
					id="roomModel"
					src="models/darkroom_noceiling01.glb"
				></a-asset-item>
				<a-asset-item id="cameraModel" src="models/camera.gltf"></a-asset-item>
				<a-asset-item
					id="cupModel"
					src="models/demo_graduatedcylinder.glb"
				></a-asset-item>
				<a-asset-item
					id="contactModel"
					src="models/demo_contactprintingeasel.glb"
				></a-asset-item>
				<a-asset-item
					id="tankModel"
					src="models/demo_developingtank.glb"
				></a-asset-item>
				<a-asset-item id="trayModel" src="models/demo_tray.glb"></a-asset-item>
				<a-asset-item
					id="spoonModel"
					src="models/demo_woodenspoon.glb"
				></a-asset-item>
			</a-assets>

			<a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

			{/* Room Model */}
			<a-entity mindar-image-target="targetIndex: 0">
				<a-gltf-model
					rotation="80 0 0"
					position="0 4.9 -7.2"
					scale="22.5 22.5 22.5"
					src="#roomModel"
					animation-mixer
				></a-gltf-model>
			</a-entity>

			{/* Camera Model */}
			<a-entity id="example-target" mindar-image-target="targetIndex: 1">
				<a-gltf-model
					rotation="5 95 90"
					position="-1.5 3.15 -1.0"
					scale="0.028 0.028 0.028"
					src="#cameraModel"
					visible="false"
					animation-mixer
				></a-gltf-model>
			</a-entity>

			{/* Cup Model */}
			<a-entity mindar-image-target="targetIndex: 2">
				<a-gltf-model
					rotation="0 95 90"
					position="-0.12 2.85 -1.0"
					scale="0.16 0.16 0.16"
					src="#cupModel"
					animation-mixer
				></a-gltf-model>
			</a-entity>

			<a-entity mindar-image-target="targetIndex: 3">
				<a-gltf-model
					rotation="0 95 90"
					position="0.6 2.85 -1.0"
					scale="0.2 0.2 0.2"
					src="#contactModel"
					animation-mixer
				></a-gltf-model>
			</a-entity>

			<a-entity mindar-image-target="targetIndex: 4">
				<a-gltf-model
					rotation="0 95 90"
					position="1.0 2.85 -1.0"
					scale="0.16 0.16 0.16"
					src="#tankModel"
					animation-mixer
				></a-gltf-model>
			</a-entity>

			<a-entity mindar-image-target="targetIndex: 5">
				<a-gltf-model
					rotation="0 95 90"
					position="1.51 2.35 -1.0"
					scale="0.1 0.1 0.1"
					src="#trayModel"
					animation-mixer
				></a-gltf-model>
			</a-entity>

			<a-entity mindar-image-target="targetIndex: 6">
				<a-gltf-model
					rotation="10 95 90"
					position="1.45 1.25 -0.86"
					scale="0.13 0.13 0.13"
					src="#spoonModel"
					animation-mixer
				></a-gltf-model>
			</a-entity>
		</a-scene>
	);
}
