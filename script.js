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

document.addEventListener('DOMContentLoaded', () => {

    const queryString = window.location.search;
    if (queryString) {
        // Grab the path (e.g., "math" from "?math")
        const targetPath = queryString.substring(1); 
        
        // Find the matching tab and virtually "click" it
        const targetTab = document.querySelector(`.nav-tab[data-target="page-${targetPath}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }

    // Grab all the navigation tabs and pages
    const navTabs = document.querySelectorAll('.nav-tab');
    const pageSections = document.querySelectorAll('.page-section');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            // Stops the browser from reloading the page
            e.preventDefault(); 

            // Get the ID of the page we want to go to
            const targetId = this.getAttribute('data-target');
            const targetPage = document.getElementById(targetId);
            const currentPage = document.querySelector('.page-section.active-page');

            // If the user clicks the tab they are already on, do nothing
            if (currentPage === targetPage) return;
            
            // Remove the glow/underline from the old tab and add it to the new one
            document.querySelector('.nav-tab.active').classList.remove('active');
            this.classList.add('active');

            // Update the URL without reloading (History API)
            // Turns the URL into "*.com/math"
            const urlPath = targetId.replace('page-', '');
            window.history.pushState(null, '', `/${urlPath}`);

            // Scroll
            window.scrollTo({ top: 0, behavior: 'smooth' });

            currentPage.classList.add('fading-out');

            setTimeout(() => {
                
                // Remove the old page entirely
                currentPage.classList.remove('active-page', 'fading-out');
                
                // Add the new page
                targetPage.classList.add('active-page');
                
                // Reset scroll animations for the new page so they fire again
                resetRevealAnimations(targetPage);

            }, 1000); 
        });
    });

    function resetRevealAnimations(page) {
        const reveals = page.querySelectorAll('.scroll-reveal');
        reveals.forEach(el => {
            el.classList.remove('is-visible');
            // Re-observe them with your IntersectionObserver from earlier
            if (typeof revealObserver !== 'undefined') {
                revealObserver.observe(el);
            }
        });
    }
});