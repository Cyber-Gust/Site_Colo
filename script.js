document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle Logic ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Optional: Animate icon or change icon state here
            const isExpanded = !mobileMenu.classList.contains('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Header Background on Scroll ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2'); // Shrink header
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.remove('py-2');
            navbar.classList.add('py-4'); // Expand header
        }
    });

    // --- Intersection Observer for Scroll Animations ---
    // Targets elements with class 'reveal-element'
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-element');
    revealElements.forEach(el => observer.observe(el));

    // --- Smooth Scroll for Anchor Links (Backup for Safari/Older browsers) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});