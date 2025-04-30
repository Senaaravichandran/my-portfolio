// Wait for DOM to fully load before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after page loads
    window.addEventListener('load', function() {
        const loaderWrapper = document.querySelector('.loader-wrapper');
        loaderWrapper.classList.add('hidden');
        
        // Animate elements once page is loaded
        setTimeout(function() {
            document.querySelectorAll('.animate-text').forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            });
        }, 300);
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dark/Light mode toggle
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial theme based on local storage or user preference
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.getItem('darkMode') === null) {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Calculate header height for offset
            const headerHeight = document.querySelector('header').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - headerHeight - 20) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
            if (navItem.getAttribute('href') === `#${current}`) {
                navItem.classList.add('active');
            }
        });
    });

    // Form submission handling with validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation with regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }

    // "See More" buttons functionality
    const seeMoreExpBtn = document.getElementById('see-more-exp');
    const seeMoreProjectsBtn = document.getElementById('see-more-projects');
    const seeMoreCertificationsBtn = document.getElementById('see-more-certifications');
    
    // For Experience Section
    if (seeMoreExpBtn) {
        const initiallyVisibleItems = 4;
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Initially hide items beyond the initial count
        for (let i = initiallyVisibleItems; i < timelineItems.length; i++) {
            timelineItems[i].style.display = 'none';
        }
        
        seeMoreExpBtn.addEventListener('click', function() {
            for (let i = initiallyVisibleItems; i < timelineItems.length; i++) {
                timelineItems[i].style.display = timelineItems[i].style.display === 'none' ? 'block' : 'none';
            }
            
            this.textContent = this.textContent === 'See More' ? 'Show Less' : 'See More';
        });
    }
    
    // Similar functionality for Projects and Certifications can be added here
    // For simplicity, we'll just show alerts for now
    if (seeMoreProjectsBtn) {
        seeMoreProjectsBtn.addEventListener('click', function() {
            alert('More projects would be shown here. You can expand this functionality later!');
        });
    }
    
    if (seeMoreCertificationsBtn) {
        seeMoreCertificationsBtn.addEventListener('click', function() {
            alert('More certifications would be shown here. You can expand this functionality later!');
        });
    }

    // Add simple animation effects for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px var(--shadow-color)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});