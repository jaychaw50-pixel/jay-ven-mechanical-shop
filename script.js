// Jay-Ven Mechanical Shop - Enhanced Interactions
document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');
    var navbar = document.querySelector('.navbar');
    var backToTop = document.querySelector('.back-to-top');

    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            var isOpen = navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(isOpen));

            // Animate hamburger to X
            var spans = hamburger.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                resetHamburger(spans);
            }
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                resetHamburger(hamburger.querySelectorAll('span'));
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            if (
                navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                resetHamburger(hamburger.querySelectorAll('span'));
            }
        });

        // Close mobile menu on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                resetHamburger(hamburger.querySelectorAll('span'));
                hamburger.focus();
            }
        });
    }

    function resetHamburger(spans) {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    // ========================================
    // Smooth scroll for anchor links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);
            if (target) {
                var navHeight = navbar ? navbar.offsetHeight : 72;
                var offsetTop = target.offsetTop - navHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Navbar scroll effect
    // ========================================
    var lastScrollY = 0;
    var ticking = false;

    function onScroll() {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function () {
                handleScroll(lastScrollY);
                ticking = false;
            });
            ticking = true;
        }
    }

    function handleScroll(scrollY) {
        // Navbar shadow
        if (navbar) {
            if (scrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back to top button visibility
        if (backToTop) {
            if (scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ========================================
    // Back to top button
    // ========================================
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========================================
    // Scroll-triggered fade-in animations
    // ========================================
    var animatedSelectors = '.service-card, .part-card, .contact-card, .owner-card';
    var animatedCards = document.querySelectorAll(animatedSelectors);

    if (animatedCards.length > 0 && 'IntersectionObserver' in window) {
        animatedCards.forEach(function (card) {
            card.classList.add('fade-in-up');
        });

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        animatedCards.forEach(function (card) {
            observer.observe(card);
        });
    }

    // ========================================
    // Staggered animation delays
    // ========================================
    function applyStaggerDelay(parentSelector, childSelector) {
        document.querySelectorAll(parentSelector).forEach(function (grid) {
            var children = grid.querySelectorAll(childSelector);
            children.forEach(function (child, index) {
                child.style.transitionDelay = (index * 0.08) + 's';
            });
        });
    }

    applyStaggerDelay('.services-grid', '.service-card');
    applyStaggerDelay('.parts-grid', '.part-card');
    applyStaggerDelay('.about-grid', '.owner-card');
    applyStaggerDelay('.contact-info', '.contact-card');

    // ========================================
    // Contact form submission
    // ========================================
    var contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var formData = new FormData(this);
            var data = {};
            formData.forEach(function (value, key) {
                data[key] = value;
            });

            if (data.name && data.phone) {
                alert('Thank you for your message! We will contact you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Run initial scroll check
    handleScroll(window.scrollY);
});
