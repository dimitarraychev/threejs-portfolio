import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Ring
export function addRing(scene) {
	const geometry = new THREE.TorusGeometry(5, 1.5, 32, 200);
	const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
	const torus = new THREE.Mesh(geometry, material);
	torus.name = 'torus';
	torus.position.set(0, 0, -5);

	scene.add(torus);
	torus.rotation.y = 100;
	return torus;
}

// Stars
const starGeometry = new THREE.SphereGeometry(0.25)
const starMaterial = new THREE.MeshStandardMaterial({ color: 0x124567, roughness: 0.5 });

function createStar(scene) {
	const star = new THREE.Mesh(starGeometry, starMaterial);
	star.name = 'star';

	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50));

	star.position.set(x, y, z);
	scene.add(star);
}

export function addStars(scene) {
	Array(300).fill().forEach(el => createStar(scene));
}

// Moon
let updateTexture;

const moonTexture = new THREE.TextureLoader().load('./images/moonmap.jpg', function (texture) {updateTexture(texture)});
const normalTexture = new THREE.TextureLoader().load('./images/normalmoon.jpg', function (texture) {updateTexture(texture)});

export function addMoon(scene, func) {
    updateTexture = func;
    const geometry = new THREE.SphereGeometry(3, 32, 32);
    const material = new THREE.MeshStandardMaterial({ 
        map: moonTexture,
        normalMap: normalTexture,
    });

    const moon = new THREE.Mesh(geometry, material);
	moon.name = 'moon';
    
    moon.position.set(-10, 7, -10);
    scene.add(moon);
	return moon;
}