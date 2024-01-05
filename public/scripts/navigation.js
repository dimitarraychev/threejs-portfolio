import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.4/+esm';

export function navigateTo(event, camera) {
	const view = event.target.textContent;

	if (view == 'ABOUT') moveCamera(camera, 15, 2, 0);
	if (view == 'EXPERIENCE/SKILLS') moveCamera(camera, 15, -12, 0);
	if (view == 'PROJECTS') moveCamera(camera, 15, -28, 0);
	if (view == 'CONTACTS') {
		document.getElementById('contacts-container').style.opacity = 1;
		moveCamera(camera, 15, -28, -35);
	} 
}

function moveCamera(camera, x, y, z) {
	gsap.to(camera.position, {
		x,
		y,
		z,
		duration: 1,
		ease: 'power2.out'
	});
}

export function shakeObject(object) {
	gsap.to(object.position, {
		duration: 0.5,
		y: "+=1",
		yoyo: true,
		repeat: 3,
		ease: "power2.inOut",
		onComplete: (e) => { object.shaking = false }
	});
}