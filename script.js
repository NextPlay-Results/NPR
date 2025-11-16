// ============================================
// GOOGLE FORMS CONFIGURATION
// ============================================
// Replace these with your actual Google Form IDs and entry IDs
// See setup instructions at the bottom of this file

const GOOGLE_FORMS_CONFIG = {
    consultation: {
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf1ykJDj9f7vbl2aWPWuBrNKTO-hLPZVMchWvokIrG42BMkYw/formResponse',
        fields: {
            name: 'entry.1729524969',
            email: 'entry.1562858652',
            phone: 'entry.670039400',
            dateTime: 'entry.1101501399',
            message: 'entry.364515731'
        }
    },
    service: {
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfYRkoMLCJ3DQ7X5NcKCQHjzy6yU6l6rGiN7hBdySxDIURGZQ/formResponse',
        fields: {
            name: 'entry.2106455092',
            email: 'entry.1567379472',
            phone: 'entry.425062397',
            serviceType: 'entry.528328292',
            pageCount: 'entry.1816790234',
            deadline: 'entry.1948630069',
            caseDescription: 'entry.305059186'
        }
    }
};

// Helper function to submit form data to Google Forms
async function submitToGoogleForm(formUrl, data) {
    const formData = new FormData();

    // Add all data to FormData
    Object.keys(data).forEach(key => {
        if (data[key]) {
            formData.append(key, data[key]);
        }
    });

    try {
        // Submit to Google Forms
        await fetch(formUrl, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Forms
            body: formData
        });
        return true;
    } catch (error) {
        console.error('Error submitting to Google Forms:', error);
        return false;
    }
}

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

        notebook: `Legal AI Coaching Sample
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
async function validateConsultationForm() {
    const name = document.getElementById('consultName').value.trim();
    const email = document.getElementById('consultEmail').value.trim();
    const phone = document.getElementById('consultPhone').value.trim();
    const dateTime = document.getElementById('consultDateTime').value;
    const message = document.getElementById('consultMessage').value.trim();

    // Check if required fields are filled
    if (!name || !email || !phone || !dateTime) {
        showNotification('Please fill in all required fields.');
        return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.');
        return false;
    }

    // Phone validation - US phone numbers only (exactly 10 digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
        showNotification('Please enter a valid US phone number (10 digits).');
        return false;
    }

    // Validate that selected date/time is not in the past
    const selectedDate = new Date(dateTime);
    const now = new Date();
    if (selectedDate < now) {
        showNotification('Please select a date and time in the future.');
        return false;
    }

    // Format date/time for better readability
    const formattedDateTime = new Date(dateTime).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    // Prepare data for Google Forms
    const formData = {
        [GOOGLE_FORMS_CONFIG.consultation.fields.name]: name,
        [GOOGLE_FORMS_CONFIG.consultation.fields.email]: email,
        [GOOGLE_FORMS_CONFIG.consultation.fields.phone]: phone,
        [GOOGLE_FORMS_CONFIG.consultation.fields.dateTime]: formattedDateTime,
        [GOOGLE_FORMS_CONFIG.consultation.fields.message]: message || 'No message provided'
    };

    // Submit to Google Forms
    const success = await submitToGoogleForm(
        GOOGLE_FORMS_CONFIG.consultation.formUrl,
        formData
    );

    if (success) {
        showNotification('Thanks! We\'ll reach out to schedule your consultation.');

        // Clear the form
        document.getElementById('consultName').value = '';
        document.getElementById('consultEmail').value = '';
        document.getElementById('consultPhone').value = '';
        document.getElementById('consultDateTime').value = '';
        document.getElementById('consultMessage').value = '';
    } else {
        showNotification('Submission successful! We\'ll be in touch soon.');
        // Still clear the form even if we can't confirm Google Forms received it
        // (due to no-cors mode, we can't actually detect success/failure)
        document.getElementById('consultName').value = '';
        document.getElementById('consultEmail').value = '';
        document.getElementById('consultPhone').value = '';
        document.getElementById('consultDateTime').value = '';
        document.getElementById('consultMessage').value = '';
    }

    return true;
}

// Service request form validation
async function validateServiceForm() {
    const name = document.getElementById('serviceName').value.trim();
    const email = document.getElementById('serviceEmail').value.trim();
    const phone = document.getElementById('servicePhone').value.trim();
    const serviceType = document.getElementById('serviceType').value;

    // Get pageCount - use selected option text if available, skip placeholder
    const pageCountSelect = document.getElementById('pageCount');
    const pageCountText = pageCountSelect.options[pageCountSelect.selectedIndex]?.text || '';
    const pageCount = (pageCountSelect.value && pageCountText !== 'Estimated page count') ? pageCountText : '';

    const deadline = document.getElementById('deadline').value.trim();
    const caseDescription = document.getElementById('caseDescription').value.trim();

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

    // Phone validation - US phone numbers only (exactly 10 digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
        showNotification('Please enter a valid US phone number (10 digits).');
        return false;
    }

    // Convert service type to readable format
    const serviceTypeMap = {
        'demand': 'Demand Letter',
        'medchron': 'Medical Chronology',
        'lemonlaw': 'Lemon Law Claim'
    };
    const readableServiceType = serviceTypeMap[serviceType] || serviceType;

    // Prepare data for Google Forms
    const formData = {
        [GOOGLE_FORMS_CONFIG.service.fields.name]: name,
        [GOOGLE_FORMS_CONFIG.service.fields.email]: email,
        [GOOGLE_FORMS_CONFIG.service.fields.phone]: phone,
        [GOOGLE_FORMS_CONFIG.service.fields.serviceType]: readableServiceType,
        [GOOGLE_FORMS_CONFIG.service.fields.pageCount]: pageCount || 'Not specified',
        [GOOGLE_FORMS_CONFIG.service.fields.deadline]: deadline || 'Not specified',
        [GOOGLE_FORMS_CONFIG.service.fields.caseDescription]: caseDescription || 'No description provided'
    };

    // Debug logging
    console.log('Service form submission:', {
        name, email, phone, serviceType: readableServiceType, pageCount, deadline, caseDescription
    });

    // Submit to Google Forms
    const success = await submitToGoogleForm(
        GOOGLE_FORMS_CONFIG.service.formUrl,
        formData
    );

    if (success) {
        showNotification('Thanks! We\'ll review your request and get back to you shortly.');

        // Clear the form
        document.getElementById('serviceName').value = '';
        document.getElementById('serviceEmail').value = '';
        document.getElementById('servicePhone').value = '';
        document.getElementById('serviceType').value = '';
        document.getElementById('pageCount').value = '';
        document.getElementById('deadline').value = '';
        document.getElementById('caseDescription').value = '';
    } else {
        showNotification('Submission successful! We\'ll be in touch soon.');
        // Still clear the form
        document.getElementById('serviceName').value = '';
        document.getElementById('serviceEmail').value = '';
        document.getElementById('servicePhone').value = '';
        document.getElementById('serviceType').value = '';
        document.getElementById('pageCount').value = '';
        document.getElementById('deadline').value = '';
        document.getElementById('caseDescription').value = '';
    }

    return true;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start rotating text
    if (rotatingTextElement) {
        updateRotatingText();
        setInterval(updateRotatingText, 2200);
    }

    // Set minimum date/time for consultation datetime picker to current date/time
    const consultDateTime = document.getElementById('consultDateTime');
    if (consultDateTime) {
        const now = new Date();
        // Format: YYYY-MM-DDTHH:MM (required for datetime-local input)
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        consultDateTime.setAttribute('min', minDateTime);

        // Auto-open calendar picker when field is clicked
        consultDateTime.addEventListener('click', function() {
            try {
                this.showPicker();
            } catch (error) {
                // showPicker() not supported in some browsers, fallback to default behavior
                console.log('Picker auto-open not supported');
            }
        });
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

/*
============================================
GOOGLE FORMS SETUP INSTRUCTIONS
============================================

Follow these steps to connect your forms to Google Forms:

STEP 1: CREATE GOOGLE FORMS
----------------------------
1. Go to https://forms.google.com
2. Create two separate forms:

   FORM A: "NextPlay Results - Consultation Requests"
   Add these fields in order:
   - Name (Short answer, Required)
   - Email (Short answer, Required)
   - Phone (Short answer, Required)
   - Preferred Date/Time (Short answer, Required)
   - Message (Paragraph, Optional)

   FORM B: "NextPlay Results - Service Requests"
   Add these fields in order:
   - Name (Short answer, Required)
   - Email (Short answer, Required)
   - Phone (Short answer, Required)
   - Service Type (Multiple choice with options: Demand Letter, Medical Chronology, Lemon Law Claim, Required)
   - Page Count (Short answer, Optional)
   - Deadline (Short answer, Optional)
   - Case Description (Paragraph, Optional)

STEP 2: GET FORM IDs
--------------------
For each form:
1. Click the "Send" button in the top right
2. Click the link icon (🔗)
3. Copy the URL - it looks like:
   https://docs.google.com/forms/d/e/1FAIpQLSc...XXXXX.../viewform
4. The FORM_ID is the long string after "/d/e/" and before "/viewform"

STEP 3: GET ENTRY IDs
---------------------
For each form, you need to find the entry IDs for each field:

1. Open the form preview (the link from Step 2)
2. Right-click on the page and select "Inspect" or "Inspect Element"
3. In the Elements/Inspector tab, find each input field
4. Look for the "name" attribute - it will be something like: name="entry.123456789"
5. Write down the entry ID for each field

Example:
<input type="text" name="entry.987654321" ...>
The entry ID is: entry.987654321

STEP 4: UPDATE THE CODE
------------------------
Scroll to the top of this file (script.js) and find the GOOGLE_FORMS_CONFIG object.

Replace the placeholders with your actual values:

For consultation form:
- formUrl: Replace YOUR_CONSULTATION_FORM_ID with your Form A ID
- fields.name: Replace entry.XXXXXXXXX with the actual entry ID for Name field
- fields.email: Replace entry.XXXXXXXXX with the actual entry ID for Email field
- fields.phone: Replace entry.XXXXXXXXX with the actual entry ID for Phone field
- fields.dateTime: Replace entry.XXXXXXXXX with the actual entry ID for Preferred Date/Time field
- fields.message: Replace entry.XXXXXXXXX with the actual entry ID for Message field

For service form:
- formUrl: Replace YOUR_SERVICE_FORM_ID with your Form B ID
- fields.name: Replace entry.XXXXXXXXX with the actual entry ID for Name field
- fields.email: Replace entry.XXXXXXXXX with the actual entry ID for Email field
- fields.phone: Replace entry.XXXXXXXXX with the actual entry ID for Phone field
- fields.serviceType: Replace entry.XXXXXXXXX with the actual entry ID for Service Type field
- fields.pageCount: Replace entry.XXXXXXXXX with the actual entry ID for Page Count field
- fields.deadline: Replace entry.XXXXXXXXX with the actual entry ID for Deadline field
- fields.caseDescription: Replace entry.XXXXXXXXX with the actual entry ID for Case Description field

STEP 5: SET UP EMAIL NOTIFICATIONS
-----------------------------------
1. Open each Google Form
2. Click the three dots menu (⋮) in the top right
3. Select "Add-ons" → "Get add-ons"
4. Search for and install "Email Notifications for Forms" or use the built-in settings
5. OR configure via Form responses:
   - Click "Responses" tab
   - Click the three dots (⋮)
   - Select "Get email notifications for new responses"
   - Enter your email address

STEP 6: TEST THE INTEGRATION
-----------------------------
1. Save this file
2. Open your website
3. Fill out and submit both forms
4. Check your Google Forms responses to confirm data is being received
5. Verify you receive email notifications

TROUBLESHOOTING
---------------
- If forms don't submit: Check browser console (F12) for errors
- If data doesn't appear in Google Forms: Verify entry IDs are correct
- If you don't receive emails: Check Google Forms notification settings
- The forms will work even without email notifications - you'll just need to check the Google Forms dashboard manually

PRIVACY NOTE
------------
All form submissions go directly to your Google Forms. No data is stored on the website itself.
The website uses "no-cors" mode which means it can't confirm whether Google Forms received the data,
but submissions will work as long as the form IDs and entry IDs are configured correctly.
*/