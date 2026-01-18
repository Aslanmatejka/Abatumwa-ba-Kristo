// =============================================
// NGO Website - JavaScript Functionality
// =============================================

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Change icon
            if (mainNav.classList.contains('active')) {
                menuToggle.textContent = '✕';
            } else {
                menuToggle.textContent = '☰';
            }
        });

        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }

    // Initialize all forms
    initContactForm();
    initNewsletterForm();
    initDonationForm();
    initGallery();
    initSmoothScroll();
});

// =============================================
// Contact Form Handling
// =============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validate
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showFormMessage(formMessage, 'Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(formData.email)) {
                showFormMessage(formMessage, 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage(formMessage, 'Sending your message...', 'info');
            
            setTimeout(() => {
                showFormMessage(formMessage, 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
}

// =============================================
// Newsletter Form Handling
// =============================================
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.getElementById('newsletterMessage');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail').value;
            
            // Validate email
            if (!isValidEmail(email)) {
                showFormMessage(newsletterMessage, 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate subscription
            showFormMessage(newsletterMessage, 'Subscribing...', 'info');
            
            setTimeout(() => {
                showFormMessage(newsletterMessage, 'Successfully subscribed! Check your inbox for confirmation.', 'success');
                newsletterForm.reset();
            }, 1500);
        });
    }
}

// =============================================
// Donation Form Handling
// =============================================
function initDonationForm() {
    const donationForm = document.getElementById('donationForm');
    const donationMessage = document.getElementById('donationMessage');
    
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                donationType: document.getElementById('donationType').value,
                amount: document.getElementById('amount').value,
                donorName: document.getElementById('donorName').value,
                donorEmail: document.getElementById('donorEmail').value,
                donorPhone: document.getElementById('donorPhone').value,
                designation: document.getElementById('designation').value,
                message: document.getElementById('message').value,
                anonymous: document.getElementById('anonymous').checked
            };
            
            // Validate
            if (!formData.donationType || !formData.amount || !formData.donorName || !formData.donorEmail) {
                showFormMessage(donationMessage, 'Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email
            if (!isValidEmail(formData.donorEmail)) {
                showFormMessage(donationMessage, 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Validate amount
            if (formData.amount < 5) {
                showFormMessage(donationMessage, 'Minimum donation amount is $5.', 'error');
                return;
            }
            
            // Simulate processing
            showFormMessage(donationMessage, 'Processing your donation...', 'info');
            
            setTimeout(() => {
                showFormMessage(donationMessage, `Thank you for your generous donation of $${formData.amount}! Redirecting to payment...`, 'success');
                
                // In a real application, redirect to payment gateway
                setTimeout(() => {
                    console.log('Donation data:', formData);
                    // window.location.href = 'payment-gateway-url';
                }, 2000);
            }, 1500);
        });
    }
}

// Handle quick donation buttons
function handleDonation(amount) {
    // Scroll to custom donation form
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        document.getElementById('amount').value = amount;
        donationForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight the amount field
        setTimeout(() => {
            document.getElementById('amount').focus();
        }, 800);
    }
}

// =============================================
// Photo Gallery Functionality
// =============================================
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });
}

function openLightbox(src, alt) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create image
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
    `;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'scale(1)';
    });
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Close on click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === closeBtn) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// =============================================
// Smooth Scroll for Anchor Links
// =============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =============================================
// Helper Functions
// =============================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.style.display = 'block';
    
    // Set colors based on type
    switch(type) {
        case 'success':
            element.style.color = '#27ae60';
            break;
        case 'error':
            element.style.color = '#e74c3c';
            break;
        case 'info':
            element.style.color = '#3498db';
            break;
    }
    
    // Auto-hide after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// =============================================
// Scroll Animations
// =============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections on page load
window.addEventListener('load', function() {
    const animatedElements = document.querySelectorAll('.card, .team-member, .gallery-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// =============================================
// Scroll to Top Button (Optional Enhancement)
// =============================================
window.addEventListener('scroll', function() {
    // Add shadow to header on scroll
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    }
});

// =============================================
// Console Message
// =============================================
console.log('%c🎨 Abatumwa ba Kristo Website', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cMaking a difference, one line of code at a time! 💙', 'color: #f5576c; font-size: 14px;');
