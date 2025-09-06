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
    "Faster Demand Letters",
    "Smarter MedChron", 
    "AI-Powered Solutions",
    "Operational Excellence"
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
• QA checklist: citations present, no hallucinations`
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

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.classList.toggle('mobile-open');
    }
}

// Add mobile menu button if needed
function addMobileMenuButton() {
    const headerInner = document.querySelector('.header-inner');
    if (headerInner && window.innerWidth < 768) {
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-toggle';
        mobileMenuButton.innerHTML = '☰';
        mobileMenuButton.onclick = toggleMobileMenu;
        headerInner.appendChild(mobileMenuButton);
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    // Add mobile menu button on small screens
    if (window.innerWidth < 768) {
        addMobileMenuButton();
    }
});

// Initialize mobile menu on load
window.addEventListener('load', addMobileMenuButton);