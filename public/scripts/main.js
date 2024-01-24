import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from './util/GLTFLoader.js';
import { addStars, addMoon, addRing } from './elements.js';
import { clickOnElement, copyEmail, mouseParallaxEffect, onMouseWheel, onWindowResize } from './eventHandlers.js';
import { navigateTo } from './navigation.js';
import { nextCertificate, prevCertificate, showCertificates, showExperienceInfo } from './ui.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(15, 2, 0);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

function render() {
	renderer.render(scene, camera);
}
render();

window.addEventListener('resize', (e) => onWindowResize(camera, renderer));

const sunLight = new THREE.DirectionalLight(0xffffff, 5);
sunLight.position.set(50, 100, 500);
scene.add(sunLight);

const spaceTexture = new THREE.CubeTextureLoader()
	.setPath('images/skybox/')
	.load([
		'front.png',
		'back.png',
		'top.png',
		'bottom.png',
		'left.png',
		'right.png',
	],
		function (texture) { updateTexture(texture) });
scene.background = spaceTexture;

const loadingManager = new THREE.LoadingManager();
const gltfLoader = new GLTFLoader(loadingManager);

const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.querySelector('.progress-bar-container');

loadingManager.onProgress = function (url, loaded, total) {
	progressBar.value = (loaded / total) * 100;
};

loadingManager.onLoad = function () {
	progressBarContainer.style.display = 'none';
	window.scroll({ top: 0 });
	animate();
};

let bustParent = new THREE.Object3D();
gltfLoader.load('/models/mannequin-bust/scene.gltf', function (gltf) {
	const bust = gltf.scene.children[0];
	bust.scale.set(10, 10, 10);

	bustParent.add(bust);
	scene.add(bustParent);
	bustParent.position.set(0, -1, -5);
	bustParent.lookAt(camera.position);
});

let windows;
gltfLoader.load('/models/scifi-windows/scene.gltf', function (gltf) {
	windows = gltf.scene.children[0];
	windows.position.set(14, -24, -6.55);
	windows.rotateY(THREE.MathUtils.degToRad(-110));

	scene.add(windows);
});

let iphone;
gltfLoader.load('/models/apple-iphone15-promax/scene.gltf', function (gltf) {
	iphone = gltf.scene.children[0];
	iphone.scale.set(25, 25, 25);
	iphone.position.set(12.85, -24, -30);
	iphone.rotateX(THREE.MathUtils.degToRad(-45));
	iphone.rotateY(THREE.MathUtils.degToRad(16));
	iphone.rotateZ(THREE.MathUtils.degToRad(-15));

	scene.add(gltf.scene);
});

function updateTexture(tex) {
	tex.colorSpace = THREE.SRGBColorSpace;
	tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
}

addStars(scene);
const torus = addRing(scene);
const moon = addMoon(scene, updateTexture);

document.querySelectorAll('.exp-icon').forEach(i => i.addEventListener('click', showExperienceInfo));

window.addEventListener('wheel', (e) => onMouseWheel(e, camera, render));

window.addEventListener('click', (e) => clickOnElement(e, camera, scene));

document.addEventListener('mousemove', (e) => mouseParallaxEffect(e, camera, bustParent));

document.getElementById('nav').addEventListener('click', (e) => navigateTo(e, camera));

document.querySelector('.fa-paper-plane').addEventListener('click', copyEmail);

const nav = document.getElementById('nav');
document.querySelector('.fa-bars').addEventListener('click', (e) => nav.classList.toggle('hidden'));

document.addEventListener('click', showCertificates);
document.getElementById('prev-btn').addEventListener('click', prevCertificate);
document.getElementById('next-btn').addEventListener('click', nextCertificate);

let target = new THREE.Vector3(0, 0, 0);

function animate() {
	requestAnimationFrame(animate);

	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;
	torus.rotation.z += 0.01;
	moon.rotateY(0.003);

	camera.lookAt(target);

	render();
}