// Automatically update the copyright year in the footer
document.addEventListener("DOMContentLoaded", function() {
    const yearSpan = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
    
    console.log("Website loaded successfully!");
});

window.addEventListener('scroll', function() {
    let scrolled = this.window.scrollY;

    let speedMultiplier = 0.5;

    this.document.body.style.backgroundPositionY = (scrolled * speedMultiplier) + 'px';
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        
        if (entry.isIntersecting) {
            
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Don't keep fading in and out
        }
    });
}, {
    threshold: 0.15 
});

const hiddenSections = document.querySelectorAll('.scroll-reveal');
hiddenSections.forEach((section) => {
    revealObserver.observe(section);
});