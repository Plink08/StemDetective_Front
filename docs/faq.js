document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {
        question.addEventListener("click", () => {
            // Zorg dat de pijl animeert of van kleur verandert
            question.classList.toggle("active");
            
            // Haal het antwoord op
            const answer = question.nextElementSibling;
            
            // Toggle een CSS class in plaats van style.display
            answer.classList.toggle("show");
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