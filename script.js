// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation for Timeline and Cards
const revealElements = document.querySelectorAll('.timeline-item, .card, .goal-box');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('card') || entry.target.classList.contains('goal-box')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    if (el.classList.contains('card') || el.classList.contains('goal-box')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    }
    revealObserver.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Parallax Effect for Hero Section
(function() {
    document.addEventListener("mousemove", parallax);
    const heroElem = document.querySelector(".hero");
    
    function parallax(e) {
        if (!heroElem) return;
        let _w = window.innerWidth / 2;
        let _h = window.innerHeight / 2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        
        let shiftX = 50 - (_mouseX - _w) * 0.02;
        let shiftY = 50 - (_mouseY - _h) * 0.02;
        
        heroElem.style.backgroundPosition = `${shiftX}% ${shiftY}%`;
    }
})();

// Inject Drone SVGs
const droneSvg = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <!-- Arms -->
    <line x1="20" y1="20" x2="80" y2="80" stroke="var(--drone-arms, #c5c6c7)" stroke-width="4" stroke-linecap="round"/>
    <line x1="20" y1="80" x2="80" y2="20" stroke="var(--drone-arms, #c5c6c7)" stroke-width="4" stroke-linecap="round"/>
    <!-- Body -->
    <rect x="35" y="30" width="30" height="40" rx="5" fill="var(--drone-body, #1f2833)" stroke="var(--drone-accent, #66fcf1)" stroke-width="2"/>
    <circle cx="50" cy="40" r="5" fill="var(--drone-accent, #00d2ff)"/>
    <rect x="45" y="60" width="10" height="15" fill="var(--drone-prop, #b200ff)"/>
    <!-- Propellers -->
    <g class="propeller" style="transform-origin: 20px 20px;">
        <ellipse cx="20" cy="20" rx="16" ry="4" fill="var(--drone-prop, #b200ff)" opacity="var(--drone-prop-opacity, 0.8)"/>
        <ellipse cx="20" cy="20" rx="4" ry="16" fill="var(--drone-prop, #b200ff)" opacity="var(--drone-prop-opacity, 0.8)"/>
        <circle cx="20" cy="20" r="3" fill="#fff"/>
    </g>
    <g class="propeller" style="transform-origin: 80px 20px;">
        <ellipse cx="80" cy="20" rx="16" ry="4" fill="var(--drone-prop, #b200ff)" opacity="var(--drone-prop-opacity, 0.8)"/>
        <ellipse cx="80" cy="20" rx="4" ry="16" fill="var(--drone-prop, #b200ff)" opacity="var(--drone-prop-opacity, 0.8)"/>
        <circle cx="80" cy="20" r="3" fill="#fff"/>
    </g>
    <g class="propeller" style="transform-origin: 20px 80px;">
        <ellipse cx="20" cy="80" rx="16" ry="4" fill="var(--drone-prop, #b200ff)" opacity="var(--drone-prop-opacity, 0.8)"/>
        <ellipse cx="20" cy="80" rx="4" ry="16" fill="var(--drone-prop, #b200ff)" opacity="var(--drone-prop-opacity, 0.8)"/>
        <circle cx="20" cy="80" r="3" fill="#fff"/>
    </g>
    <g class="propeller" style="transform-origin: 80px 80px;">
        <ellipse cx="80" cy="80" rx="16" ry="4" fill="var(--drone-prop, #b200ff)" opacity="var(--drone-prop-opacity, 0.8)"/>
        <ellipse cx="80" cy="80" rx="4" ry="16" fill="var(--drone-prop, #b200ff)" opacity="var(--drone-prop-opacity, 0.8)"/>
        <circle cx="80" cy="80" r="3" fill="#fff"/>
    </g>
</svg>
`;

document.querySelectorAll('.drone-decoration').forEach(el => {
    el.innerHTML = droneSvg;
});

// Custom Cursor Tracking
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    if(cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    }
    
    if(cursorOutline) {
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

// 3D Tilt Effect for Cards
const tiltElements = document.querySelectorAll('.card, .goal-box');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top; 
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on cursor position
        const rotateX = ((y - centerY) / centerY) * -10; 
        const rotateY = ((x - centerX) / centerX) * 10;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.transition = 'none';
        el.style.zIndex = '10';
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        el.style.transition = 'transform 0.5s ease';
        el.style.zIndex = '1';
    });
});
