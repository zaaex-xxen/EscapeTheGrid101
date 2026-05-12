document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, header');
    const navLinksContainer = document.querySelector('.nav-links');

    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };




    const updateActiveLink = () => {
        let currentSectionId = '';
        const navHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Check if section is currently in the active viewport zone
            if (rect.top <= navHeight + 250) {
                currentSectionId = section.getAttribute('id') || '';
            }
        });

        // Special case: if we're at the very bottom of the page, the last section (Credits) must be active
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        if (scrollPosition >= pageHeight - 50) {
            currentSectionId = sections[sections.length - 1].getAttribute('id') || '';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Hide blocks from About section onwards to footer
        if (currentSectionId && currentSectionId !== 'home') {
            document.body.classList.add('hide-blocks');
        } else {
            document.body.classList.remove('hide-blocks');
        }
    };

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });



    const home = document.getElementById('home');
    if (home) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                const h1 = home.querySelector('h1');
                const p = home.querySelector('p');
                const cta = home.querySelector('.cta-btn');
                if (h1) h1.style.transform = `translateY(${scrolled * 0.4}px)`;
                if (p) p.style.transform = `translateY(${scrolled * 0.2}px)`;
                if (cta) cta.style.transform = `translateY(${scrolled * 0.1}px)`;
                home.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }

    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });



    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveLink();
    });
    handleNavbarScroll();
    updateActiveLink();

    console.log('Grid System Initialized...');
});
