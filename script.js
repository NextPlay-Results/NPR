// Smooth scroll helper
function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
        });
    }
}

// Rotating text functionality
const phrases = [
    "Done Right, Done Fast",
    "20 Years in PI Law",
    "1,000+ Demand Letters Written",
    "Trial-Ready Work Product",
    "All 50 States Covered",
    "Real Experience, Real Results"
];

let currentPhraseIndex = 0;
const rotatingTextElement = document.getElementById('rotating-text');

function updateRotatingText() {
    if (rotatingTextElement) {
        rotatingTextElement.textContent = phrases[currentPhraseIndex];
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    }
}

// Modal functionality
function openModal(title, content) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.textContent = content;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Sample content for modals
function getSampleContent(type) {
    const samples = {
        demand: `Sample Outline
— Header: Parties, Insured, Claim #
— Facts: Collision summary
— Liability: Negligence per se + citations
— Damages: Medical bills, wage loss, pain & suffering
— Demand: Settlement figure with deadline`,

        medchron: `MedChron Snippet
01/12/2025 · Dr. Patel (Orthopedics) — DX: C5‑6 herniation; RX: PT 3x/week
02/04/2025 · MRI Cervical Spine — C5‑6 protrusion 2.8mm
02/18/2025 · PT Progress — Pain ↓ from 8/10 to 5/10`,

        notebook: `NotebookLM Enablement
• Source map: records, pleadings, photos
• Prompts: chronology, causation, missing‑docs
• QA checklist: citations present, no hallucinations`,

        lemonlaw: `Lemon Law Claim Sample
Vehicle: 2024 Toyota Camry, VIN: 1HGBH41JXMN109186
— Defect: Persistent transmission slipping (substantial impairment)
— Repair Attempts: 4 attempts at authorized dealer (dates documented)
— Statute: [State] Lemon Law § 1793.2(d) - exceeds reasonable repair attempts
— Manufacturer Notice: Certified letter sent [date] per statutory requirements
— Demand: Full refund or replacement under buyback provisions`
    };

    return samples[type] || 'Sample content not available.';
}

// Close modal when clicking outside
function handleModalClick(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
function handleKeyDown(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

// Form handling
function handleFormSubmit(event) {
    event.preventDefault();
    // Add your form submission logic here
    alert('Thanks! We\'ll be in touch soon.');
}

// Show notification toast
function showNotification(message) {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notification-message');

    if (notification && messageElement) {
        messageElement.textContent = message;
        notification.classList.add('show');

        // Auto-hide after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }
}

// Newsletter form validation
function validateNewsletterForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const organization = document.getElementById('organization').value.trim();

    // Check if all fields are filled
    if (!firstName || !lastName || !email || !organization) {
        showNotification('Please fill in all fields to get the PDF.');
        return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.');
        return false;
    }

    // If validation passes
    showNotification('Thanks! We\'ll email the checklist to ' + email);
    return true;
}

// Consultation form validation
function validateConsultationForm() {
    const name = document.getElementById('consultName').value.trim();
    const email = document.getElementById('consultEmail').value.trim();
    const phone = document.getElementById('consultPhone').value.trim();

    // Check if required fields are filled
    if (!name || !email || !phone) {
        showNotification('Please fill in all required fields.');
        return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.');
        return false;
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\(\)\+\.]+$/;
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
        showNotification('Please enter a valid phone number.');
        return false;
    }

    // If validation passes
    showNotification('Thanks! We\'ll reach out to schedule your consultation.');

    // Clear the form
    document.getElementById('consultName').value = '';
    document.getElementById('consultEmail').value = '';
    document.getElementById('consultPhone').value = '';
    document.getElementById('consultDateTime').value = '';
    document.getElementById('consultMessage').value = '';

    return true;
}

// Service request form validation
function validateServiceForm() {
    const name = document.getElementById('serviceName').value.trim();
    const email = document.getElementById('serviceEmail').value.trim();
    const phone = document.getElementById('servicePhone').value.trim();
    const serviceType = document.getElementById('serviceType').value;

    // Check if required fields are filled
    if (!name || !email || !phone || !serviceType) {
        showNotification('Please fill in all required fields.');
        return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.');
        return false;
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\(\)\+\.]+$/;
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
        showNotification('Please enter a valid phone number.');
        return false;
    }

    // If validation passes
    showNotification('Thanks! We\'ll review your request and get back to you shortly.');

    // Clear the form
    document.getElementById('serviceName').value = '';
    document.getElementById('serviceEmail').value = '';
    document.getElementById('servicePhone').value = '';
    document.getElementById('serviceType').value = '';
    document.getElementById('pageCount').value = '';
    document.getElementById('deadline').value = '';
    document.getElementById('caseDescription').value = '';

    return true;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start rotating text
    if (rotatingTextElement) {
        updateRotatingText();
        setInterval(updateRotatingText, 2200);
    }
    
    // Add modal event listeners
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', handleModalClick);
    }
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Add form event listeners
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // Add smooth scrolling to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToId(targetId);
        });
    });
    
    // Add intersection observer for animations (optional)
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
    
    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.service-card, .founder-grid, .impact-grid');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Update year in footer
    const yearElement = document.querySelector('.footer-text');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
});

// Mobile menu toggle (updated version)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.classList.toggle('mobile-open');
        
        // Prevent body scroll when menu is open
        if (nav.classList.contains('mobile-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Close mobile menu when a nav link is clicked
function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) {
        // Close mobile menu first
        const nav = document.querySelector('.nav');
        if (nav && nav.classList.contains('mobile-open')) {
            nav.classList.remove('mobile-open');
            document.body.style.overflow = '';
        }
        
        // Then scroll to section
        el.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
        });
    }
}

// Initialize mobile menu on load
//window.addEventListener('load', addMobileMenuButton);

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stats section and trigger animation when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
        }
    });
}, { threshold: 0.3 });

// Observe stats section when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});