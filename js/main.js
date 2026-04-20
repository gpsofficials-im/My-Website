// ============================================
// INITIALIZE AOS (Animate on Scroll)
// ============================================

AOS.init({
    duration: 1000,
    easing: 'ease-in-out-quad',
    once: true,
    offset: 100
});

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// PORTFOLIO FILTERS
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Filter cards
        portfolioCards.forEach(card => {
            if (filter === 'all') {
                card.style.opacity = '1';
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.animation = 'fadeUp 0.6s ease forwards';
                }, 0);
            } else {
                const category = card.getAttribute('data-category');
                if (category === filter) {
                    card.style.opacity = '1';
                    card.style.display = 'block';
                    card.style.animation = 'fadeUp 0.6s ease forwards';
                } else {
                    card.style.opacity = '0';
                    card.style.display = 'none';
                }
            }
        });
    });
});

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formStatus = document.querySelector('.form-status');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate individual input
function validateInput(input) {
    const errorElement = input.parentElement.querySelector('.form-error');
    let isValid = true;

    if (input === nameInput) {
        if (input.value.trim().length < 2) {
            errorElement.textContent = 'Name must be at least 2 characters';
            errorElement.classList.add('show');
            isValid = false;
        } else {
            errorElement.classList.remove('show');
        }
    } else if (input === emailInput) {
        if (!emailRegex.test(input.value.trim())) {
            errorElement.textContent = 'Please enter a valid email address';
            errorElement.classList.add('show');
            isValid = false;
        } else {
            errorElement.classList.remove('show');
        }
    } else if (input === messageInput) {
        if (input.value.trim().length < 10) {
            errorElement.textContent = 'Message must be at least 10 characters';
            errorElement.classList.add('show');
            isValid = false;
        } else {
            errorElement.classList.remove('show');
        }
    }

    return isValid;
}

// Real-time validation
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => {
        if (input.parentElement.querySelector('.form-error').classList.contains('show')) {
            validateInput(input);
        }
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all inputs
    let isFormValid = true;
    [nameInput, emailInput, messageInput].forEach(input => {
        if (!validateInput(input)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        showFormStatus('Please fix the errors above', 'error');
        return;
    }

    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Here you would normally send the form data to a backend
        console.log('Form submitted:', {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        });

        // Reset form
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        showFormStatus('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');

        // Clear success message after 5 seconds
        setTimeout(() => {
            formStatus.classList.remove('success');
        }, 5000);
    }, 1500);
});

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.classList.remove('success', 'error');
    formStatus.classList.add(type);
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const text = element.textContent;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Animate counters when section comes into view
const statBoxes = document.querySelectorAll('.stat-box h4');
let counterStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
            counterStarted = true;
            statBoxes.forEach((box, index) => {
                const number = parseInt(box.textContent);
                if (!isNaN(number)) {
                    animateCounter(box, number);
                }
            });
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    counterObserver.observe(aboutSection);
}

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PARALLAX EFFECT (OPTIONAL)
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const blobs = document.querySelectorAll('.blob');
    
    blobs.forEach((blob, index) => {
        blob.style.transform = `translateY(${scrolled * (0.1 + index * 0.05)}px)`;
    });
});

// ============================================
// MOBILE MENU TOGGLE WITH HAMBURGER
// ============================================

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (optional feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Add search functionality here if needed
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Get element
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Add click ripple effect to buttons
const addRippleEffect = () => {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    addRippleEffect();
});

// ============================================
// SERVICE WORKER (FOR PWA - OPTIONAL)
// ============================================

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
        // Silent fail - service worker not required
    });
}

// ============================================
// LAZY LOADING
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// DARK MODE TOGGLE (OPTIONAL - ALREADY DARK)
// ============================================

// The website is already dark mode by default
// Add localStorage preference for future light mode feature
localStorage.setItem('theme', 'dark');

console.log('%c🎨 GP\'S Officials HIM Portfolio', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML5, CSS3, and Vanilla JavaScript', 'color: #8338ec; font-size: 14px;');
console.log('%cDeploy to GitHub Pages for free hosting!', 'color: #00ff88; font-size: 14px;');
