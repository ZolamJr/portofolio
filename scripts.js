document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêcher l'envoi par défaut du formulaire

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Valider le formulaire
        if (name && email && message) {
            alert('Merci pour votre message, ' + name + ' ! Je vous contacterai bientôt.');
            contactForm.reset(); // Réinitialiser le formulaire
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    });
});
