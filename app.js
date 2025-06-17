/**
 * app.js
 * Main application controller for INNER GARDEN
 */

import { CONFIG } from './config.js';
import Utils from './utils.js';
import { LanguageManager } from './language-manager.js';
import { SoundManager } from './sound-manager.js';
import { AdvancedCursor } from './cursor-system.js';
import { AdvancedPreloader } from './preloader.js';
import { AdvancedInteractiveWall } from './interactive-wall.js';
import { Virtual3DTour } from './virtual-tour.js';
import { PopupSystem } from './popup-system.js';
import { GalleryManager } from './gallery.js';
import { TicketManager } from './tickets.js';

export class InnerGardenApp {
    constructor() {
        this.modules = {};
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Initialize core systems first
        this.modules.languageManager = new LanguageManager();
        this.modules.soundManager = new SoundManager();
        this.modules.popupSystem = new PopupSystem();
        
        // Make language manager globally available
        window.languageManager = this.modules.languageManager;
        window.SoundManager = this.modules.soundManager;
        
        // Initialize preloader
        this.modules.preloader = new AdvancedPreloader();
        
        // Listen for preloader completion
        window.addEventListener('preloaderComplete', (e) => {
            this.initMainApplication(e.detail.selectedLanguage);
        });
        
        // Initialize immediately if no preloader element
        if (!document.getElementById('preloader') && !document.getElementById('advanced-preloader')) {
            setTimeout(() => this.initMainApplication(), 100);
        }
    }

    initMainApplication(selectedLanguage) {
        if (this.isInitialized) return;
        this.isInitialized = true;

        // Set language if provided
        if (selectedLanguage) {
            this.modules.languageManager.setLanguage(selectedLanguage);
        }

        // Initialize advanced systems
        this.modules.cursor = new AdvancedCursor();
        
        // Initialize interactive wall
        const wallContainer = document.querySelector('.wall-container') || document.querySelector('#interactive-wall');
        if (wallContainer) {
            this.modules.interactiveWall = new AdvancedInteractiveWall(wallContainer);
        }

        // Initialize 3D tour
        const tourContainer = document.querySelector('#virtual-tour') || this.create3DTourContainer();
        if (tourContainer) {
            // Check if Three.js is available
            if (typeof THREE !== 'undefined') {
                this.modules.virtualTour = new Virtual3DTour(tourContainer);
            } else {
                console.warn('Three.js not available, 3D tour disabled');
            }
        }

        // Initialize gallery
        this.modules.galleryManager = new GalleryManager(this.modules.popupSystem);
        
        // Initialize tickets
        this.modules.ticketManager = new TicketManager(this.modules.popupSystem);

        // Initialize other systems
        this.initNavigation();
        this.initEvents();
        this.initSupport();
        this.initAccessibility();
        
        // Initialize scroll animations
        this.initScrollAnimations();
        
        // Initialize resize handler
        this.initResizeHandler();
        
        // Show main content
        this.showMainContent();
        
        console.log('🎨 INNER GARDEN Application fully initialized!');
    }

    create3DTourContainer() {
        const container = document.createElement('section');
        container.id = 'virtual-tour';
        container.className = 'section';
        container.innerHTML = `
            <h2 data-translate="virtualTour">3D Virtual Tour</h2>
            <p data-translate="virtualExperience">Experience the gallery in virtual reality</p>
        `;
        
        // Insert after gallery section
        const gallery = document.querySelector('#gallery');
        if (gallery && gallery.nextSibling) {
            gallery.parentNode.insertBefore(container, gallery.nextSibling);
        } else if (gallery) {
            gallery.parentNode.appendChild(container);
        }
        
        return container;
    }

    initNavigation() {
        // Smooth scrolling navigation
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    this.modules.soundManager.play('click');
                }
            });
        });

        // Mobile menu
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-nav-menu');
        
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                this.modules.soundManager.play('click');
            });
        }

        // Header scroll effects
        const header = document.querySelector('.header-section');
        if (header) {
            window.addEventListener('scroll', Utils.throttle(() => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }, 16));
        }

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                const isDark = document.body.classList.contains('dark-theme');
                themeToggle.querySelector('span').textContent = isDark ? '☀️' : '🌙';
                this.modules.soundManager.play('click');
                
                // Save theme preference
                localStorage.setItem('innerGarden_theme', isDark ? 'dark' : 'light');
            });
            
            // Load saved theme
            const savedTheme = localStorage.getItem('innerGarden_theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
                themeToggle.querySelector('span').textContent = '☀️';
            }
        }

        // Sound toggle
        const soundToggle = document.getElementById('sound-toggle');
        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                const isEnabled = this.modules.soundManager.toggle();
                soundToggle.querySelector('span').textContent = isEnabled ? '🎧' : '🔇';
                
                this.showNotification(
                    isEnabled ? 
                    this.modules.languageManager.t('soundOn', 'Sound enabled') : 
                    this.modules.languageManager.t('soundOff', 'Sound disabled')
                );
            });
            
            // Update sound toggle state
            soundToggle.querySelector('span').textContent = 
                this.modules.soundManager.isEnabled() ? '🎧' : '🔇';
        }

        // Language selector
        const langSelector = document.querySelector('.language-selector');
        if (langSelector) {
            this.createLanguageSelector(langSelector);
        }
    }

    createLanguageSelector(container) {
        const currentLang = this.modules.languageManager.getCurrentLanguage();
        const languages = {
            uk: '🇺🇦 UA',
            en: '🇺🇸 EN',
            de: '🇩🇪 DE',
            es: '🇪🇸 ES'
        };
        
        container.innerHTML = `
            <button class="lang-toggle">
                <span>${languages[currentLang]}</span>
            </button>
            <div class="lang-dropdown hidden">
                ${Object.entries(languages).map(([code, label]) => `
                    <button class="lang-option ${code === currentLang ? 'active' : ''}" 
                            data-lang="${code}">${label}</button>
                `).join('')}
            </div>
        `;
        
        const toggle = container.querySelector('.lang-toggle');
        const dropdown = container.querySelector('.lang-dropdown');
        
        toggle.addEventListener('click', () => {
            dropdown.classList.toggle('hidden');
            this.modules.soundManager.play('click');
        });
        
        container.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                this.modules.languageManager.setLanguage(lang);
                toggle.querySelector('span').textContent = languages[lang];
                dropdown.classList.add('hidden');
                
                // Update active state
                container.querySelectorAll('.lang-option').forEach(opt => {
                    opt.classList.toggle('active', opt === option);
                });
                
                this.modules.soundManager.play('click');
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        });
    }

    initEvents() {
        const eventButtons = document.querySelectorAll('.event-btn');
        
        eventButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const eventElement = btn.closest('.timeline-event');
                this.showEventDetails(eventElement);
            });
        });
    }

    showEventDetails(eventElement) {
        const title = eventElement.querySelector('.event-title')?.textContent || 'Event';
        const date = eventElement.querySelector('.event-date')?.textContent || 'Date TBD';
        const description = eventElement.querySelector('.event-description')?.textContent || '';
        
        this.modules.popupSystem.show({
            title: title,
            subtitle: date,
            content: `
                <div class="event-details">
                    <p class="event-description">${description}</p>
                    <div class="event-info">
                        <h3>Event Information</h3>
                        <p><strong>Date:</strong> ${date}</p>
                        <p><strong>Duration:</strong> 2 hours</p>
                        <p><strong>Location:</strong> INNER GARDEN Gallery</p>
                        <p><strong>Capacity:</strong> Limited seats available</p>
                        <p><strong>Price:</strong> Included with exhibition ticket</p>
                    </div>
                    <div class="registration-form">
                        <h3>Register for this Event</h3>
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-input" placeholder="Enter your full name">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-input" placeholder="Enter your email">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone</label>
                            <input type="tel" class="form-input" placeholder="Enter your phone number">
                        </div>
                    </div>
                </div>
            `,
            maxWidth: '600px',
            buttons: [
                { text: 'Cancel', class: 'popup-btn-secondary' },
                { 
                    text: 'Register', 
                    class: 'popup-btn-primary',
                    callback: (popup) => {
                        this.handleEventRegistration(popup);
                    }
                }
            ]
        });
        
        this.modules.soundManager.play('click');
    }

    handleEventRegistration(popup) {
        // Get form data
        const name = popup.element.querySelector('input[type="text"]').value;
        const email = popup.element.querySelector('input[type="email"]').value;
        const phone = popup.element.querySelector('input[type="tel"]').value;
        
        if (!name || !email) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate registration
        setTimeout(() => {
            this.showNotification('Registration successful! You will receive a confirmation email.', 'success');
            this.modules.soundManager.play('success');
        }, 1000);
    }

    initSupport() {
        const supportButtons = document.querySelectorAll('.support-btn');
        
        supportButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tier = btn.getAttribute('data-tier') || 'friend';
                this.showSupportForm(tier);
            });
        });
    }

    showSupportForm(tier) {
        const supportTiers = {
            friend: { name: 'Gallery Friend', amount: 50 },
            supporter: { name: 'Supporter', amount: 200 },
            patron: { name: 'Patron', amount: 500 },
            benefactor: { name: 'Benefactor', amount: 1000 }
        };
        
        const support = supportTiers[tier] || supportTiers.friend;
        
        this.modules.popupSystem.show({
            title: `Support as ${support.name}`,
            subtitle: `${support.amount} UAH`,
            content: `
                <div class="support-form">
                    <div class="support-benefits">
                        <h3>Your Support Includes:</h3>
                        <ul>
                            <li>Thank you recognition on our website</li>
                            <li>Digital certificate of support</li>
                            <li>Exclusive behind-the-scenes content</li>
                            ${support.amount >= 200 ? '<li>Invitation to private events</li>' : ''}
                            ${support.amount >= 500 ? '<li>Personal meeting with the artist</li>' : ''}
                            ${support.amount >= 1000 ? '<li>Signed artwork print</li>' : ''}
                        </ul>
                    </div>
                    
                    <form class="donation-form">
                        <h3>Supporter Information</h3>
                        <div class="form-group">
                            <label class="form-label">Full Name *</label>
                            <input type="text" class="form-input" name="fullName" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email *</label>
                            <input type="email" class="form-input" name="email" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Message (Optional)</label>
                            <textarea class="form-input form-textarea" name="message" 
                                      placeholder="Share why you're supporting INNER GARDEN..."></textarea>
                        </div>
                    </form>
                </div>
            `,
            maxWidth: '600px',
            buttons: [
                { text: 'Cancel', class: 'popup-btn-secondary' },
                { 
                    text: `Support with ${support.amount} UAH`, 
                    class: 'popup-btn-primary',
                    callback: (popup) => {
                        this.processSupportPayment(popup, support);
                    }
                }
            ]
        });
        
        this.modules.soundManager.play('click');
    }

    processSupportPayment(popup, support) {
        const form = popup.element.querySelector('.donation-form');
        const formData = new FormData(form);
        
        // Validate required fields
        if (!formData.get('fullName') || !formData.get('email')) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Show processing
        const submitBtn = popup.element.querySelector('.popup-btn-primary');
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            this.modules.popupSystem.close(popup);
            this.showSupportSuccess(support, formData);
            this.modules.soundManager.play('success');
        }, 2000);
    }

    showSupportSuccess(support, formData) {
        this.modules.popupSystem.show({
            title: 'Thank You for Your Support!',
            subtitle: `${support.name} - ${support.amount} UAH`,
            content: `
                <div class="success-content">
                    <div class="success-icon">❤️</div>
                    <p>Your generous support helps us continue creating amazing interactive art experiences.</p>
                    <div class="support-confirmation">
                        <h3>Support Confirmation</h3>
                        <p><strong>Supporter:</strong> ${formData.get('fullName')}</p>
                        <p><strong>Level:</strong> ${support.name}</p>
                        <p><strong>Amount:</strong> ${support.amount} UAH</p>
                    </div>
                    <p>You will receive a confirmation email shortly with your digital certificate.</p>
                </div>
            `,
            buttons: [
                { text: 'Close', class: 'popup-btn-primary' }
            ]
        });
    }

    initAccessibility() {
        const accessibilityPanel = document.querySelector('.accessibility-panel');
        if (!accessibilityPanel) return;

        const toggle = accessibilityPanel.querySelector('.accessibility-toggle');
        const menu = accessibilityPanel.querySelector('.accessibility-menu');
        const options = accessibilityPanel.querySelectorAll('.accessibility-option');

        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('hidden');
                this.modules.soundManager.play('click');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.accessibility-panel') && !menu.classList.contains('hidden')) {
                    menu.classList.add('hidden');
                }
            });
        }

        options.forEach(option => {
            option.addEventListener('click', () => {
                const action = option.getAttribute('data-action');
                this.handleAccessibilityAction(action);
                this.modules.soundManager.play('click');
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Alt + A for accessibility menu
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                toggle?.click();
            }

            // ESC to close menus
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.popup-overlay.active');
                if (openModal) {
                    const closeBtn = openModal.querySelector('.popup-close');
                    closeBtn?.click();
                }
            }
        });
    }

    handleAccessibilityAction(action) {
        switch (action) {
            case 'font-size':
                document.body.classList.toggle('large-font');
                this.showNotification(
                    document.body.classList.contains('large-font') ? 
                    'Large font enabled' : 'Large font disabled'
                );
                break;
                
            case 'contrast':
                document.body.classList.toggle('high-contrast');
                this.showNotification(
                    document.body.classList.contains('high-contrast') ? 
                    'High contrast enabled' : 'High contrast disabled'
                );
                break;
                
            case 'animations':
                document.body.classList.toggle('reduced-motion');
                this.showNotification(
                    document.body.classList.contains('reduced-motion') ? 
                    'Reduced motion enabled' : 'Animations restored'
                );
                break;
        }
        
        // Save accessibility preferences
        const preferences = {
            largeFont: document.body.classList.contains('large-font'),
            highContrast: document.body.classList.contains('high-contrast'),
            reducedMotion: document.body.classList.contains('reduced-motion')
        };
        localStorage.setItem('innerGarden_accessibility', JSON.stringify(preferences));
    }

    loadAccessibilityPreferences() {
        const saved = localStorage.getItem('innerGarden_accessibility');
        if (saved) {
            try {
                const preferences = JSON.parse(saved);
                if (preferences.largeFont) document.body.classList.add('large-font');
                if (preferences.highContrast) document.body.classList.add('high-contrast');
                if (preferences.reducedMotion) document.body.classList.add('reduced-motion');
            } catch (e) {
                console.error('Error loading accessibility preferences:', e);
            }
        }
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(section);
        });

        // Custom animation for animated elements
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(element => {
            observer.observe(element);
        });

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            .section.animated {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            [data-animate].animated {
                animation: fadeInUp 0.8s ease forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .reduced-motion * {
                animation-duration: 0s !important;
                transition-duration: 0s !important;
            }
        `;
        document.head.appendChild(style);
    }

    initResizeHandler() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Update mobile/desktop state
                const isMobile = Utils.Device.isMobile();
                
                if (isMobile && this.modules.cursor) {
                    this.modules.cursor.destroy();
                    this.modules.cursor = null;
                } else if (!isMobile && !this.modules.cursor) {
                    this.modules.cursor = new AdvancedCursor();
                }

                // Update 3D tour canvas
                if (this.modules.virtualTour) {
                    this.modules.virtualTour.handleResize();
                }

                // Update interactive wall canvas
                if (this.modules.interactiveWall) {
                    this.modules.interactiveWall.resizeCanvas();
                }
            }, 250);
        });
    }

    showMainContent() {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }

        // Show body content
        document.body.classList.add('app-loaded');
        
        // Load accessibility preferences
        this.loadAccessibilityPreferences();
        
        // Initialize language updates
        this.modules.languageManager.updateAllElements();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'app-notification';
        notification.textContent = message;
        
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${colors[type] || colors.info};
            color: white;
            border-radius: 8px;
            font-weight: 500;
            z-index: 100000;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Document popup handlers
    showTerms() {
        this.modules.popupSystem.showDocument('terms');
    }

    showPrivacy() {
        this.modules.popupSystem.showDocument('privacy');
    }

    showCookies() {
        this.modules.popupSystem.showDocument('cookies');
    }

    showRefund() {
        this.modules.popupSystem.showDocument('refund');
    }

    // Utility methods
    getCurrentLanguage() {
        return this.modules.languageManager.getCurrentLanguage();
    }

    changeLanguage(lang) {
        return this.modules.languageManager.setLanguage(lang);
    }

    toggleSound() {
        return this.modules.soundManager.toggle();
    }

    // Cleanup method
    destroy() {
        Object.values(this.modules).forEach(module => {
            if (module && typeof module.destroy === 'function') {
                module.destroy();
            }
        });
        
        this.modules = {};
        this.isInitialized = false;
    }
}

/************************************
 * GLOBAL INITIALIZATION
 ************************************/

// Initialize application when DOM is ready
const initApp = () => {
    // Create global app instance
    window.INNER_GARDEN_APP = new InnerGardenApp();
    
    // Make key components globally available
    window.SoundManager = window.INNER_GARDEN_APP.modules.soundManager;
    window.PopupSystem = window.INNER_GARDEN_APP.modules.popupSystem;
    
    // Global convenience methods
    window.showTerms = () => window.INNER_GARDEN_APP.showTerms();
    window.showPrivacy = () => window.INNER_GARDEN_APP.showPrivacy();
    window.showCookies = () => window.INNER_GARDEN_APP.showCookies();
    window.showRefund = () => window.INNER_GARDEN_APP.showRefund();
    
    // Main application initialization function
    window.initMainApplication = (selectedLanguage) => {
        window.INNER_GARDEN_APP.initMainApplication(selectedLanguage);
    };
    
    console.log('🌟 INNER GARDEN System Ready!');
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application Error:', e.error);
    
    if (window.INNER_GARDEN_APP && window.INNER_GARDEN_APP.modules.popupSystem) {
        window.INNER_GARDEN_APP.showNotification(
            'An error occurred. Please refresh the page if issues persist.',
            'error'
        );
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`🚀 INNER GARDEN loaded in ${Math.round(loadTime)}ms`);
    
    // Report performance metrics
    if ('performance' in window && 'timing' in performance) {
        const timing = performance.timing;
        const interactive = timing.domInteractive - timing.navigationStart;
        const complete = timing.loadEventEnd - timing.navigationStart;
        
        console.log(`📊 Performance Metrics:
            - DOM Interactive: ${interactive}ms
            - Page Complete: ${complete}ms
            - Memory Usage: ${navigator.deviceMemory || 'Unknown'} GB
            - Connection: ${navigator.connection?.effectiveType || 'Unknown'}`);
    }
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for ES6 modules
export default InnerGardenApp;