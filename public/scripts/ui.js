const expIcon = document.querySelectorAll('.exp-icon');
const expInfoContainers = document.querySelectorAll('.exp-info-container');

export function showExperienceInfo(e) {
	expIcon.forEach(i => {
		if (i.classList.contains('fa-minus')) {
			i.classList.toggle('fa-minus');
			i.classList.toggle('fa-plus');
		}
	})
	e.target.classList.toggle('fa-plus');
	e.target.classList.toggle('fa-minus');

	expInfoContainers.forEach(el => el.style.display = 'none');

	const currentTarget = e.target.parentNode.parentNode.parentNode.querySelector('.exp-info-container');
	currentTarget.style.display = 'flex';
}

const images = [
	"/images/certificates/su-applications.jpeg",
	"/images/certificates/su-advanced.jpeg",
	"/images/certificates/su-fundamentals.jpeg",
	"/images/certificates/su-basics.jpeg",
	"/images/certificates/mon-applications.jpg",
	"/images/certificates/mon-advanced.jpg",
	"/images/certificates/mon-fundamentals.jpg",
	"/images/certificates/mon-basics.jpg"
];

let currentImageIndex = 0;
const certImg = document.getElementById('cert-img');

function updateImage() {
	certImg.src = images[currentImageIndex];
}

export function prevCertificate() {
	currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
	updateImage();
}

export function nextCertificate() {
	currentImageIndex = (currentImageIndex + 1) % images.length;
	updateImage();
}

const dialog = document.querySelector('dialog');

export function showCertificates(e) {
	const certBtn = document.getElementById('cert-btn');

	if (e.target == certBtn) {
		dialog.showModal();
	} else if (!e.target.classList.contains('fa-solid')) {
		dialog.close();
	}
}