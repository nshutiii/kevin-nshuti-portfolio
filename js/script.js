/**
 * Nshuti Kevin - Portfolio Interactivity & Animation Mechanics
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Page Loader Handler ---
    const handlePageLoader = () => {
        const loader = document.querySelector('.page-loader');
        if (!loader) return;
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 800);
        });
        
        // Safety timeout (in case load event doesn't trigger)
        setTimeout(() => {
            if (loader.style.opacity !== '0') {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }
        }, 3000);
    };
    handlePageLoader();

    // --- 2. Floating Navbar Scroll Effect ---
    const handleNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        const checkScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Run once on load
    };
    handleNavbarScroll();

    // --- 3. Fluid Smooth Scroll for Nav Links ---
    const handleSmoothScrolling = () => {
        const navLinks = document.querySelectorAll('.nav-link, .scroll-indicator a, .hero-buttons a');
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (!targetId || !targetId.startsWith('#')) return;
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    e.preventDefault();
                    
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // If mobile menu is open, close it
                    const navMenu = document.querySelector('.nav-menu');
                    const mobileToggle = document.querySelector('.mobile-toggle');
                    if (navMenu?.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileToggle?.classList.remove('open');
                    }
                }
            });
        });
    };
    handleSmoothScrolling();

    // --- 4. Responsive Mobile Hamburger Menu ---
    const handleMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navContainer = document.querySelector('.nav-container');
        if (!navContainer) return;
        
        // Create mobile toggle element
        const toggle = document.createElement('div');
        toggle.className = 'mobile-toggle';
        toggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Inject styles directly for hamburger
        const style = document.createElement('style');
        style.textContent = `
            .mobile-toggle {
                display: none;
                flex-direction: column;
                justify-content: space-between;
                width: 26px;
                height: 18px;
                cursor: pointer;
                z-index: 1000;
            }
            .mobile-toggle span {
                width: 100%;
                height: 2px;
                background-color: var(--text-primary);
                border-radius: 4px;
                transition: var(--transition-smooth);
            }
            @media (max-width: 768px) {
                .mobile-toggle {
                    display: flex;
                }
                .nav-menu {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 70%;
                    height: 100vh;
                    background: rgba(6, 9, 19, 0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-left: 1px solid var(--border-glass);
                    flex-direction: column;
                    justify-content: center;
                    gap: 40px;
                    transition: var(--transition-smooth);
                    z-index: 998;
                }
                .nav-menu.active {
                    right: 0;
                }
            }
            .mobile-toggle.open span:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }
            .mobile-toggle.open span:nth-child(2) {
                opacity: 0;
            }
            .mobile-toggle.open span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
        `;
        document.head.appendChild(style);
        navContainer.appendChild(toggle);
        
        const navMenu = document.querySelector('.nav-menu');
        
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            navMenu?.classList.toggle('active');
        });
    };
    handleMobileMenu();

    // --- 5. Interactive Typewriter Loop Effect ---
    const handleTypewriter = () => {
        const target = document.querySelector('.typewriter-text');
        if (!target) return;
        
        const words = JSON.parse(target.getAttribute('data-words') || '[]');
        if (words.length === 0) return;
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                target.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Deletes faster
            } else {
                target.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 120; // Natural typing speed
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at full word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Pause before typing next word
            }
            
            setTimeout(type, typingSpeed);
        };
        
        // Start after header animation
        setTimeout(type, 1500);
    };
    handleTypewriter();

    // --- 6. Highly Performant Scroll Reveals via IntersectionObserver ---
    const handleScrollAnimations = () => {
        const animElements = document.querySelectorAll(
            '.glass-panel, .glass-panel-hover, .timeline-item-modern, .edu-card, .skills-category-card, .project-card-modern, .contact-info-card'
        );
        
        // Set initial invisible styles via JS to avoid flashing on disabled JS
        animElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animElements.forEach(el => revealObserver.observe(el));
    };
    handleScrollAnimations();

    // --- 7. Active Scroll Navigation Highlight ---
    const handleActiveNavHighlight = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        
        const observerOptions = {
            root: null,
            threshold: 0.25,
            rootMargin: `-${navbarHeight}px 0px -40% 0px`
        };
        
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(sec => navObserver.observe(sec));
    };
    handleActiveNavHighlight();

    // --- 8. Secure Message Dispatch Validation & Alerts ---
    const handleFormSubmit = () => {
        const form = document.querySelector('.contact-form-wrapper form');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();
            
            if (!name || !email || !message) {
                showNotification('All fields are mandatory.', 'error');
                return;
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showNotification('Please key in a valid email format.', 'error');
                return;
            }
            
            // Submitting animation
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Dispatching...`;
            
            // Simulate Form Submission
            setTimeout(() => {
                submitBtn.innerHTML = `<i class="fas fa-check-circle"></i> Message Dispatched!`;
                submitBtn.style.background = 'linear-gradient(135deg, #2cb67d 0%, #00eb87 100%)';
                
                showNotification('Thank you! Your secure transmission was successful.', 'success');
                
                this.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                    submitBtn.style.background = ''; // Reverts back to style variables
                }, 3000);
            }, 2000);
        });
    };
    handleFormSubmit();

    // --- 9. Glassmorphic Notification Toast System ---
    const showNotification = (message, type = 'success') => {
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();
        
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
        const color = type === 'success' ? 'var(--accent-teal)' : 'var(--accent-rose)';
        const shadow = type === 'success' ? 'var(--teal-glow)' : '0 0 25px rgba(244, 63, 94, 0.35)';
        
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 16px 28px;
            background: rgba(13, 20, 38, 0.85);
            border: 1px solid var(--border-glass);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 12px;
            color: var(--text-primary);
            font-family: var(--font-heading);
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 14px;
            z-index: 10001;
            box-shadow: ${shadow};
            transform: translateY(100px) scale(0.9);
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        `;
        
        const iconEl = toast.querySelector('i');
        iconEl.style.color = color;
        iconEl.style.fontSize = '1.3rem';
        
        document.body.appendChild(toast);
        
        // Trigger reveal
        setTimeout(() => {
            toast.style.transform = 'translateY(0) scale(1)';
            toast.style.opacity = '1';
        }, 50);
        
        // Hide and clear
        setTimeout(() => {
            toast.style.transform = 'translateY(40px) scale(0.9)';
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 4000);
    };

    console.log('Nshuti Kevin - High Performance Portfolio Core Loaded.');
});