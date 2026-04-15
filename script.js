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

// =======================================================
// Big DOM listener
// =======================================================
document.addEventListener('DOMContentLoaded', () => {

    // ==============================================================
    // Copy Email, display copy message
    // ==============================================================
    const emailLink = document.querySelector('.contact-icon.email-link');
    const copyMessage = document.querySelector('.copy-message');

    if (emailLink && copyMessage) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();

            const email = this.getAttribute('data-email');
            
            navigator.clipboard.writeText(email).then(() => {
                copyMessage.classList.add('show');

                setTimeout(() => {
                    copyMessage.classList.remove('show');
                }, 2500);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    }

    // ==============================================================
    // 404 Fixing to redirect, keep all in one page (silent router)
    // ==============================================================
    const queryString = window.location.search;
    let targetPath = "home"; // Default to home

    if (queryString) {
        // Grab the path (e.g., "math" from "?math")
        targetPath = queryString.substring(1); 
        
        // Clean up the URL instantly to look professional
        window.history.replaceState(null, '', `/${targetPath}`);
    }

    // Instantly set the correct page as active
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.remove('active-page');
    });
    const initialPage = document.getElementById(`page-${targetPath}`);
    if (initialPage) {
        initialPage.classList.add('active-page');
        
        // Trigger any scroll animations for the loaded page
        if (typeof resetRevealAnimations === 'function') {
            resetRevealAnimations(initialPage);
        }
    }

    // Instantly highlight the correct navigation tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-target') === `page-${targetPath}`) {
            tab.classList.add('active');
        }
    });

    // ==============================================================
    // SPA Nav (tabs)
    // ==============================================================
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

            }, 450); 
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

    const courseTiles = document.querySelectorAll('.course-tile');

    courseTiles.forEach(tile => {
        tile.addEventListener('click', function(e) {
            
            // Check if this card is already open
            const isAlreadyOpen = this.classList.contains('touch-open');
            
            // First, instantly close ALL cards
            courseTiles.forEach(t => t.classList.remove('touch-open'));
            
            // If the card we clicked WASN'T open, open it now!
            if (!isAlreadyOpen) {
                this.classList.add('touch-open');
            }
            
            // Stop the click from triggering the "close all" rule below
            e.stopPropagation(); 
        });
    });

    document.addEventListener('click', function() {
        courseTiles.forEach(t => t.classList.remove('touch-open'));
    });

    // =========================================
    // Deep Links
    // =========================================
    const deepLinks = document.querySelectorAll('.deep-link');

    deepLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPageId = this.getAttribute('data-target-page');
            const targetElementId = this.getAttribute('data-target-id');
            const targetPage = document.getElementById(targetPageId);
            const currentPage = document.querySelector('.page-section.active-page');

            // 1. If we are NOT on the right page, switch pages first
            if (currentPage !== targetPage) {
                // Find the nav tab for that page and click it to trigger your SPA logic
                const targetTab = document.querySelector(`.nav-tab[data-target="${targetPageId}"]`);
                if (targetTab) targetTab.click();
            }

            // 2. Wait exactly 500ms for the page fade-in to finish, then scroll!
            // (If we don't wait, the browser tries to scroll to an invisible element and fails)
            setTimeout(() => {
                const targetElement = document.getElementById(targetElementId);
                if (targetElement) {
                    
                    // Smoothly scroll the item into the center of the screen
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Add the purple pulse animation
                    targetElement.classList.add('target-highlight');
                    
                    // Remove the class after 2 seconds so it can fire again later if needed
                    setTimeout(() => {
                        targetElement.classList.remove('target-highlight');
                    }, 2000);
                }
            }, 500); 
        });
    });
});