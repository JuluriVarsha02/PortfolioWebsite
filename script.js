// ========================================
// Typing Animation
// ========================================
const typingText = document.getElementById('typing-text');
const phrases = [
    'Full-Stack Developer',
    'ML Enthusiast',
    'Problem Solver',
    'Tech Innovator'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeText, typingSpeed);
}

// Start typing animation
setTimeout(typeText, 500);

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// ========================================
// Counter Animation for Stats
// ========================================
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateCounters() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        };

        updateCounter();
    });
}

// ========================================
// Skill Bar Animation
// ========================================
const skillBars = document.querySelectorAll('.skill-progress');
let hasAnimatedSkills = false;

function animateSkillBars() {
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate stats counter
            if (entry.target.classList.contains('about-stats') && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }

            // Animate skill bars
            if (entry.target.classList.contains('skills') && !hasAnimatedSkills) {
                hasAnimatedSkills = true;
                setTimeout(animateSkillBars, 500);
            }

            // Add fade-in animation to elements
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe sections for animations
const sections = document.querySelectorAll('section');
sections.forEach(section => observer.observe(section));

// Observe stats specifically
const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    observer.observe(aboutStats);
}

// ========================================
// Contact Form Handling
// ========================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Here you would typically send the data to a server
    console.log('Form submitted:', { name, email, subject, message });

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');

    // Reset form
    contactForm.reset();
});

// ========================================
// Parallax Effect for Hero Orbs
// ========================================
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;

    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 30;
        const x = mouseX * speed;
        const y = mouseY * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ========================================
// Active Navigation Link Highlighting
// ========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Placeholder Images Generation
// ========================================
function createPlaceholderImage(element, width, height, text, gradient) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Create gradient background
    const grd = ctx.createLinearGradient(0, 0, width, height);
    if (gradient === 1) {
        grd.addColorStop(0, '#667eea');
        grd.addColorStop(1, '#764ba2');
    } else if (gradient === 2) {
        grd.addColorStop(0, '#f093fb');
        grd.addColorStop(1, '#f5576c');
    } else if (gradient === 3) {
        grd.addColorStop(0, '#4facfe');
        grd.addColorStop(1, '#00f2fe');
    } else {
        grd.addColorStop(0, '#667eea');
        grd.addColorStop(1, '#764ba2');
    }

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    // Add text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    element.src = canvas.toDataURL();
}

// Generate placeholder images on load
window.addEventListener('load', () => {
    const profileImg = document.getElementById('profile-img');
    const aboutImg = document.getElementById('about-img');

    if (profileImg && !profileImg.src) {
        createPlaceholderImage(profileImg, 450, 450, 'Your Photo', 1);
    }

    if (aboutImg && !aboutImg.src) {
        createPlaceholderImage(aboutImg, 400, 500, 'About Photo', 2);
    }

    // Project images
    for (let i = 1; i <= 4; i++) {
        const projectImg = document.getElementById(`project${i}-img`);
        if (projectImg && !projectImg.src) {
            createPlaceholderImage(projectImg, 600, 400, `Project ${i}`, i % 3 + 1);
        }
    }
});

// ========================================
// Page Load Animation
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
