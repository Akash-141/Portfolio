document.addEventListener('DOMContentLoaded', () => {

    // ===== LOADING SCREEN =====
    const loadingScreen = document.getElementById('loading-screen');
    document.body.classList.add('loading');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            document.body.classList.remove('loading');
        }, 1000);
    });

    // ===== SCROLL PROGRESS BAR =====
    const scrollProgress = document.getElementById('scroll-progress');
    let ticking = false;

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight);
        scrollProgress.style.transform = `scaleX(${scrollPercent})`;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    });

    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.getElementById('back-to-top');
    let scrollTicking = false;

    function updateBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        scrollTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(updateBackToTop);
            scrollTicking = true;
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== DOWNLOAD RESUME =====
    const downloadResumeBtn = document.getElementById('download-resume');

    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('To enable resume download:\n\n1. Create your resume PDF (name it resume.pdf)\n2. Place it in the Portfolio folder\n3. Update the link href to: href=\"resume.pdf\" download=\"Akash_Paul_Resume.pdf\"\n\nFor now, create your resume using Canva, Google Docs, or Microsoft Word and save as PDF.');
        });
    }

    // ===== THEME TOGGLE =====
    const themeButton = document.getElementById('theme-button');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
    });

    // ===== MOBILE MENU TOGGLE =====
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggleBtn.addEventListener('click', () => {
        sidebarMenu.classList.toggle('show-menu');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebarMenu.classList.remove('show-menu');
        });
    });

    // ===== CURSOR FOLLOWER EFFECT =====
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    let mouseX = 0,
        mouseY = 0;
    let followerX = 0,
        followerY = 0;
    const speed = 0.13; // Smoother catch-up speed

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function updateCursor() {
        // Move the dot instantly using transform for better performance
        cursorDot.style.transform = `translate(${mouseX - 3}px, ${mouseY + 1}px) translate(-20%, -80%) rotate(-25deg)`;

        // Calculate smooth follower movement
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;

        followerX += dx * speed;
        followerY += dy * speed;

        // Apply position with GPU-accelerated transform
        cursorFollower.style.transform = `translate(${followerX - 15}px, ${followerY - 15}px)`;
    }

    function animateFollower() {
        updateCursor();
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .tab-btn, .dot, .menu-toggle, .filter-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover');
        });
    });


    // ===== TYPING EFFECT =====
    const typingElement = document.querySelector('.typing-effect');
    const words = ["Websites.", "Interfaces.", "Experiences."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const typeSpeed = isDeleting ? 100 : 200;
        setTimeout(type, typeSpeed);
    }
    type();

    // ===== ABOUT ME TABS =====
    const tabs = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.target);
            tabs.forEach(t => t.classList.remove('active-tab'));
            tab.classList.add('active-tab');
            tabPanes.forEach(pane => pane.classList.remove('active-pane'));
            target.classList.add('active-pane');
        });
    });

    // ===== SKILLS PROGRESS ANIMATION =====
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillProgressBars.forEach(bar => skillsObserver.observe(bar));

    // ===== STATS COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target >= 100 ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }

    // ===== PROJECT FILTERS =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');

            // Filter projects with optimized animations
            requestAnimationFrame(() => {
                projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        // Stagger animation for smooth reveal
                        setTimeout(() => {
                            card.classList.remove('hide');
                            card.style.animation = 'fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                        }, index * 50);
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    });

    // ===== TESTIMONIAL CAROUSEL =====
    const track = document.querySelector('.testimonial-track');
    const slides = Array.from(track.children);
    const dotsNav = document.querySelector('.carousel-dots');
    const slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;
    let currentSlide = 0;

    if (slideWidth > 0) {
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active-dot');
            dotsNav.appendChild(dot);

            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });

        const dots = Array.from(dotsNav.children);

        const updateCarousel = () => {
            track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
            dots.forEach(dot => dot.classList.remove('active-dot'));
            dots[currentSlide].classList.add('active-dot');
        };

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }, 5000);
    }


    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        rootMargin: '-50% 0px -50% 0px',
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ===== ANIMATE ELEMENTS ON SCROLL =====
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => scrollObserver.observe(el));

    // ===== CONTACT FORM VALIDATION & SUBMISSION =====
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', async(e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const message = document.getElementById('form-message').value.trim();

        // Validation
        if (!name || !email || !message) {
            showFormStatus('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const btnText = contactForm.querySelector('.btn-text');
        const btnLoading = contactForm.querySelector('.btn-loading');
        btnText.style.display = 'none';
        btnLoading.classList.add('active');

        // Google Sheets Web App URL
        const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxInedInvKNAPF8Sm2LLKzj7T31smlzGYUT-FTZ1_Qd3d45USVFIde4cMrBAjDZkTBp/exec';

        try {
            // Save to Google Sheets
            await fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toISOString()
                })
            });

            showFormStatus('Thank you! Your message has been saved successfully.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            showFormStatus('Oops! Something went wrong. Please try again later.', 'error');
        } finally {
            // Reset button state
            btnText.style.display = 'flex';
            btnLoading.classList.remove('active');
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;

        // Auto-hide after 5 seconds
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 5000);
    }
});