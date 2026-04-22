/* ================================================
   FABRÍCIO BARAÚNA — Personal Site JS
   ================================================ */

// ---- Mobile Nav Toggle ----
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('active');
        // Prevent body scroll while menu is open
        document.body.style.overflow = navLinks.classList.contains('nav-active') ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ---- Smooth Scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 70; // header height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// ---- Header Scroll Style ----
const header = document.querySelector('.main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// ---- Scroll Fade-In Animations ----
const fadeEls = document.querySelectorAll(
    '.article-card, .card, .about-text, .about-visual, .skill-tag'
);

fadeEls.forEach(el => {
    el.classList.add('fade-in');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

// ---- Staggered animation for cards ----
document.querySelectorAll('.card-grid .card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 60}ms`;
});

document.querySelectorAll('.articles-grid .article-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
});

// ---- Active Nav Highlight on Scroll ----
const sections = document.querySelectorAll('section[id], footer[id]');
const navItems = document.querySelectorAll('.nav-links li a[href^="#"]');

const activateNav = () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', activateNav, { passive: true });
