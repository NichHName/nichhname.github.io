// Automatically update the copyright year in the footer
document.addEventListener("DOMContentLoaded", function() {
    const yearSpan = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
    
    console.log("Website loaded successfully!");
});

window.addEventListener('scroll', function() {
    let scrolled = this.window.scrollY;

    let speedMultiplier = 0.2;

    this.document.body.style.backgroundPositionY = (scrolled * speedMultiplier) + 'px';
});