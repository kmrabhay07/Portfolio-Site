/**
 * Abhay Kumar Portfolio — Interactive Scripts (2026 Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Typed.js Effect
    if (document.getElementById('typing-text') && typeof Typed !== 'undefined') {
        new Typed('#typing-text', {
            strings: [
                'Spring Boot Microservices',
                'Kafka Event Streaming Pipelines',
                'Scalable Distributed Architectures',
                'Azure Cloud Solutions',
                'High-Performance REST APIs'
            ],
            typeSpeed: 60,
            backSpeed: 35,
            backDelay: 1800,
            loop: true
        });
    }

    // 2. Navbar Scroll Effect & Scrollspy
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background blur on scroll
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll to top button visibility
        if (scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }

        // Active Nav Link Spy
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 3. Scroll to top action
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Mobile Nav Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars-staggered';
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars-staggered';
            });
        });
    }
});

// 5. Contact Form Submission Handler
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const toast = document.getElementById('form-toast');
    if (toast) {
        toast.className = 'form-toast success';
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Your message has been prepared. Opening your default mail client...`;
        
        // Open user's email client directly
        const mailtoUrl = `mailto:ak24nov2002@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Abhay,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
        setTimeout(() => {
            window.location.href = mailtoUrl;
        }, 800);
    }
}