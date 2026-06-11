document.addEventListener('DOMContentLoaded', () => {

    // 1. CUSTOM CURSOR SYSTEM (Alleen actief op desktop/non-touch apparaten)
    const cursor = document.querySelector('.custom-cursor');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && cursor) {
        cursor.style.display = 'block';

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Interactieve elementen triggeren schaalvergroting van de cursor
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .menu-toggle');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // 2. MOBILE MENU FULLSCREEN OVERLAY
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        const toggleMenu = () => {
            menuToggle.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            // Voorkom scrollen op de achtergrond als het menu open is
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        };

        menuToggle.addEventListener('click', toggleMenu);

        // Sluit menu zodra er op een link wordt geklikt
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. ROUGH SCROLL INTERSECTION OBSERVER
    // Zorgt voor een brute, vloeiende binnenkomer van de 12 projectkaarten tijdens scrollen
    const cards = document.querySelectorAll('.project-card');

    if (cards.length > 0) {
        const cardObserverOptions = {
            root: null,
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
        };

        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    cardObserver.unobserve(card); // Stop met observeren na binnenkomst
                }
            });
        }, cardObserverOptions);

        cards.forEach((card) => {
            // Initiële verborgen staat instellen voor de observer kick-in
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            cardObserver.observe(card);
        });
    }
});