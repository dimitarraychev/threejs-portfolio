import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { shakeObject } from './navigation.js';

export function onWindowResize(camera, renderer) {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

const contacts = document.getElementById('contacts-container');

export function onMouseWheel(event, camera, render) {

	if (camera.position.y >= 2 && event.deltaY < 0) return;
	if (camera.position.z <= -35 && event.deltaY > 0) return;

	if (camera.position.z >= 0 && event.deltaY < 0) {
		camera.position.y -= Math.trunc(event.deltaY * 0.02);
		if (camera.position.y > 2) camera.position.y = 2;
	} else if (camera.position.y <= -28) {
		camera.position.z -= Math.trunc(event.deltaY * 0.05);
		if (camera.position.z < -35) camera.position.z = -35;
	} else {
		camera.position.y -= Math.trunc(event.deltaY * 0.02);
		if (camera.position.y < -28) camera.position.y = -28;
	}

	if (camera.position.z <= -31) {
		contacts.style.opacity = 1;
	} else {
		contacts.style.opacity = 0;
	}

	document.querySelector('dialog').close();

	render();
}

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

export function clickOnElement(event, camera, scene, bustParent, iphone, moon) {
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(pointer, camera);
	const intersects = raycaster.intersectObjects(scene.children);

	const target = intersects.length > 0 ? intersects[0].object : null;

	if (target && target.shaking == false ||
		 target && target.shaking == undefined) {
		target.shaking = true;
		shakeObject(target);
	}

	if (target && target.name == 'SM_large_window002_T_window_3_0') window.open('https://techgrit.web.app/', '_blank');
	if (target && target.name == 'SM_large_window001_T_window_2_0') window.open('https://play-metaverse-explorer.web.app/', '_blank');
}

const mouse = { x: 1, y: 1 };

export function mouseParallaxEffect(e, camera, bustParent) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

	const pointerY = camera.position.y + mouse.y * 8;
	const pointerZ = camera.position.z + 2 - mouse.x * 10;
	const pointer = new THREE.Vector3(camera.position.x, pointerY, pointerZ);

	if (bustParent) {
		bustParent.lookAt(pointer);
	}
}

export function copyEmail(e) {

	const textToCopy = 'draytchev@gmail.com';
	const copyMsg = document.querySelector('.email-copy');

	navigator.clipboard.writeText(textToCopy)
		.then(function () {
			copyMsg.style.opacity = 1;
			setTimeout(() => copyMsg.style.opacity = 0, 1500);
		})
		.catch(function (err) {
			console.log('Unable to copy text to the clipboard', err);
		});
}
