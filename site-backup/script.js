// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Theme Switch
    const themeSwitch = document.getElementById('checkbox');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    }
    
    // Listen for theme switch change
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile Menu
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const menu = document.querySelector('.menu');
    const themeWrapper = document.querySelector('.theme-switch-wrapper');
    const navControls = document.querySelector('.nav-controls');
    
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            menu.classList.toggle('active');
            
            // Change icon
            const icon = mobileMenuIcon.querySelector('i');
            if (menu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && 
            !navControls.contains(event.target) && 
            menu.classList.contains('active')) {
            menu.classList.remove('active');
            const icon = mobileMenuIcon.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Prevent theme switch from closing menu
    themeWrapper.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Initialize Embla Carousel
    const emblaNode = document.querySelector('.embla');
    if (emblaNode) {
        const options = { loop: true };
        const embla = EmblaCarousel(emblaNode.querySelector('.embla__viewport'), options);
        
        // Add buttons functionality
        const prevButton = emblaNode.querySelector('.embla__button--prev');
        const nextButton = emblaNode.querySelector('.embla__button--next');
        
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => embla.scrollPrev());
            nextButton.addEventListener('click', () => embla.scrollNext());
        }
        
        // Auto scroll
        let autoplayID = setInterval(() => {
            if (!embla.canScrollNext()) {
                embla.scrollTo(0);
            } else {
                embla.scrollNext();
            }
        }, 5000);
        
        // Pause autoplay on hover
        emblaNode.addEventListener('mouseenter', () => {
            clearInterval(autoplayID);
        });
        
        emblaNode.addEventListener('mouseleave', () => {
            autoplayID = setInterval(() => {
                if (!embla.canScrollNext()) {
                    embla.scrollTo(0);
                } else {
                    embla.scrollNext();
                }
            }, 5000);
        });
    }
    
    // Scroll Reveal Animation
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false,
        useDelay: 'always',
        viewFactor: 0.2
    });
    
    sr.reveal('.hero-content', { delay: 200 });
    sr.reveal('.step', { interval: 100 });
    sr.reveal('.service-card', { interval: 100 });
    sr.reveal('.team-member', { interval: 100 });
    sr.reveal('.feature', { interval: 100 });
    
    // Transparent Header Effect
    const header = document.querySelector('header');
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            header.classList.remove('sticky');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        if (currentScroll > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Smooth Scroll for Menu Links
    const menuLinks = document.querySelectorAll('.menu a, .footer-links a, .hero-buttons a, a.btn:not([target="_blank"])');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (menu.classList.contains('active')) {
                        menu.classList.remove('active');
                        const icon = mobileMenuIcon.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    
                    // Scroll to target
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form Submission
    const quoteForm = document.querySelector('.quote-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            const submitButton = quoteForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            // Simulate API call
            setTimeout(() => {
                submitButton.textContent = 'Enviado!';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 2000);
            }, 1000);
        });
    }
    
    // Partners Carousel Clone for Infinite Scroll
    const partnersTrack = document.querySelector('.partners-track');
    if (partnersTrack) {
        const partners = partnersTrack.querySelectorAll('.partner');
        
        // Clone partners for seamless infinite scroll
        partners.forEach(partner => {
            const clone = partner.cloneNode(true);
            partnersTrack.appendChild(clone);
        });
    }
    
    // Lazy loading de imagens
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Initialize main project carousel
    const mainCarousel = document.querySelector('.embla');

    // Log the main carousel element
    console.log('Main carousel element:', mainCarousel);

    if (mainCarousel) {
        const mainEmbla = EmblaCarousel(mainCarousel.querySelector('.embla__viewport'), {
            loop: true,
            align: 'center',
            slidesToScroll: 1
        });

        // Log the Embla instance for the main carousel
        console.log('Main Embla instance:', mainEmbla);

        // Add button functionality for main carousel
        const mainPrevButton = mainCarousel.querySelector('.embla__button--prev');
        const mainNextButton = mainCarousel.querySelector('.embla__button--next');

        if (mainPrevButton && mainNextButton) {
            mainPrevButton.addEventListener('click', () => mainEmbla.scrollPrev());
            mainNextButton.addEventListener('click', () => mainEmbla.scrollNext());
        }
    }

    // Initialize room carousel for Perdizes apartment
    const roomCarousel = document.querySelector('.embla-room');

    // Log the room carousel element
    console.log('Room carousel element:', roomCarousel);

    if (roomCarousel) {
        const roomEmbla = EmblaCarousel(roomCarousel.querySelector('.embla-room__viewport'), {
            loop: true,
            align: 'center',
            slidesToScroll: 1
        });

        // Log the Embla instance for the room carousel
        console.log('Room Embla instance:', roomEmbla);

        // Add button functionality for room carousel
        const roomPrevButton = roomCarousel.querySelector('.embla-room__button--prev');
        const roomNextButton = roomCarousel.querySelector('.embla-room__button--next');

        if (roomPrevButton && roomNextButton) {
            roomPrevButton.addEventListener('click', () => roomEmbla.scrollPrev());
            roomNextButton.addEventListener('click', () => roomEmbla.scrollNext());
        }
    }
}); 