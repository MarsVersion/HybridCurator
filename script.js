document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const backToTopBtn = document.getElementById('back-to-top');
    const navLinkItems = document.querySelectorAll('.nav-link[href^="#"]');
    const allNavLinks = document.querySelectorAll('.nav-link');

    const setNavExpanded = (expanded) => {
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        }
    };

    if (navToggle && navLinks) {
        setNavExpanded(false);

        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
            setNavExpanded(isOpen);
        });

        allNavLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                setNavExpanded(false);
            });
        });

        document.addEventListener('click', (event) => {
            // Never interfere with mailto or other external protocol links
            const clickedLink = event.target.closest('a[href]');
            if (clickedLink) {
                const href = clickedLink.getAttribute('href');
                if (href && (href.startsWith('mailto:') || href.startsWith('tel:'))) {
                    return;
                }
            }

            if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                setNavExpanded(false);
            }
        });
    }

    if (backToTopBtn) {
        const toggleBackToTop = () => {
            backToTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
        };

        toggleBackToTop();
        window.addEventListener('scroll', toggleBackToTop, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const sections = document.querySelectorAll('section[id]');
    if (sections.length && navLinkItems.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const id = entry.target.getAttribute('id');
                    navLinkItems.forEach((link) => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                });
            },
            { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
    }
});
