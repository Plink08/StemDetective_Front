document.addEventListener("DOMContentLoaded", () => {

	const questions = document.querySelectorAll(".faq-question");

	questions.forEach(question => {

		question.addEventListener("click", () => {

			question.classList.toggle("active");

			const answer = question.nextElementSibling;

			if (answer.style.display === "block") {
				answer.style.display = "none";
			} else {
				answer.style.display = "block";
			}

		});

	});

});

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker geregistreerd:', reg.scope))
            .catch(err => console.error('Service Worker registratie mislukt:', err));
    });
}
