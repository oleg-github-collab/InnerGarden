/**
 * popup-system.js
 * Advanced popup management system
 */

import Utils from './utils.js';
import { SoundManager } from './sound-manager.js';

export class PopupSystem {
    constructor() {
        this.popups = [];
        this.zIndexCounter = 10000;
        this.init();
    }

    init() {
        this.createPopupStyles();
    }

    createPopupStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .popup-overlay.active {
                opacity: 1;
            }

            .popup-content {
                background: white;
                border-radius: 15px;
                padding: 2rem;
                max-width: 90vw;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                transform: scale(0.9) translateY(20px);
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }

            .popup-overlay.active .popup-content {
                transform: scale(1) translateY(0);
            }

            .popup-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #999;
                transition: color 0.2s ease;
                z-index: 1;
            }

            .popup-close:hover {
                color: #e74c3c;
            }

            .popup-header {
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #eee;
            }

            .popup-title {
                font-size: 2rem;
                font-weight: 700;
                color: #2c3e50;
                margin-bottom: 0.5rem;
            }

            .popup-subtitle {
                font-size: 1.1rem;
                color: #7f8c8d;
            }

            .popup-body {
                line-height: 1.6;
                color: #34495e;
            }

            .popup-footer {
                margin-top: 2rem;
                padding-top: 1rem;
                border-top: 1px solid #eee;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }

            .popup-btn {
                padding: 0.8rem 2rem;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .popup-btn-primary {
                background: #3498db;
                color: white;
            }

            .popup-btn-primary:hover {
                background: #2980b9;
                transform: translateY(-2px);
            }

            .popup-btn-secondary {
                background: #95a5a6;
                color: white;
            }

            .popup-btn-secondary:hover {
                background: #7f8c8d;
            }

            .form-group {
                margin-bottom: 1.5rem;
            }

            .form-label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: #2c3e50;
            }

            .form-input {
                width: 100%;
                padding: 1rem;
                border: 2px solid #ddd;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.2s ease;
            }

            .form-input:focus {
                outline: none;
                border-color: #3498db;
            }

            .form-select {
                width: 100%;
                padding: 1rem;
                border: 2px solid #ddd;
                border-radius: 8px;
                font-size: 1rem;
                background: white;
                cursor: pointer;
            }

            .form-textarea {
                min-height: 120px;
                resize: vertical;
            }

            .payment-methods {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin: 1rem 0;
            }

            .payment-method {
                padding: 1rem;
                border: 2px solid #ddd;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                text-align: center;
            }

            .payment-method:hover,
            .payment-method.selected {
                border-color: #3498db;
                background: rgba(52, 152, 219, 0.1);
            }

            .document-content {
                max-height: 60vh;
                overflow-y: auto;
                padding: 1rem;
                background: #f8f9fa;
                border-radius: 8px;
                margin: 1rem 0;
            }

            .document-content h1,
            .document-content h2,
            .document-content h3 {
                color: #2c3e50;
                margin: 1.5rem 0 1rem 0;
            }

            .document-content p {
                margin-bottom: 1rem;
            }

            .document-content ul,
            .document-content ol {
                margin: 1rem 0;
                padding-left: 2rem;
            }

            @media (max-width: 768px) {
                .popup-content {
                    margin: 1rem;
                    padding: 1.5rem;
                }

                .popup-title {
                    font-size: 1.5rem;
                }

                .popup-footer {
                    flex-direction: column;
                }

                .payment-methods {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }

    show(options) {
        const popup = this.createPopup(options);
        this.popups.push(popup);
        document.body.appendChild(popup.element);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            popup.element.classList.add('active');
        }, 10);

        SoundManager.play('transition');
        return popup;
    }

    createPopup(options) {
        const popup = {
            id: Utils.StringUtils.generateId(),
            element: null,
            options: options
        };

        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        overlay.style.zIndex = this.zIndexCounter++;

        const content = document.createElement('div');
        content.className = 'popup-content';
        content.style.maxWidth = options.maxWidth || '600px';

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'popup-close';
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', () => {
            this.close(popup);
        });
        content.appendChild(closeBtn);

        // Header
        if (options.title || options.subtitle) {
            const header = document.createElement('div');
            header.className = 'popup-header';

            if (options.title) {
                const title = document.createElement('h2');
                title.className = 'popup-title';
                title.textContent = options.title;
                header.appendChild(title);
            }

            if (options.subtitle) {
                const subtitle = document.createElement('p');
                subtitle.className = 'popup-subtitle';
                subtitle.textContent = options.subtitle;
                header.appendChild(subtitle);
            }

            content.appendChild(header);
        }

        // Body
        const body = document.createElement('div');
        body.className = 'popup-body';
        
        if (options.content) {
            if (typeof options.content === 'string') {
                body.innerHTML = options.content;
            } else {
                body.appendChild(options.content);
            }
        }

        content.appendChild(body);

        // Footer
        if (options.buttons && options.buttons.length > 0) {
            const footer = document.createElement('div');
            footer.className = 'popup-footer';

            options.buttons.forEach(buttonConfig => {
                const button = document.createElement('button');
                button.className = `popup-btn ${buttonConfig.class || 'popup-btn-secondary'}`;
                button.textContent = buttonConfig.text;
                
                button.addEventListener('click', () => {
                    if (buttonConfig.callback) {
                        buttonConfig.callback(popup);
                    }
                    
                    if (buttonConfig.close !== false) {
                        this.close(popup);
                    }
                });

                footer.appendChild(button);
            });

            content.appendChild(footer);
        }

        overlay.appendChild(content);
        popup.element = overlay;

        // Click overlay to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.close(popup);
            }
        });

        // ESC key to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.close(popup);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        return popup;
    }

    close(popup) {
        const index = this.popups.indexOf(popup);
        if (index === -1) return;

        popup.element.classList.remove('active');

        setTimeout(() => {
            if (popup.element.parentNode) {
                popup.element.parentNode.removeChild(popup.element);
            }
            
            // Restore body scroll if no more popups
            if (this.popups.length === 1) {
                document.body.style.overflow = '';
            }
            
            this.popups.splice(index, 1);
        }, 300);

        SoundManager.play('click');
    }

    closeAll() {
        this.popups.forEach(popup => {
            if (popup.element.parentNode) {
                popup.element.parentNode.removeChild(popup.element);
            }
        });
        
        this.popups = [];
        document.body.style.overflow = '';
    }

    // Predefined popup types
    showAlert(message, title = 'Alert') {
        return this.show({
            title: title,
            content: `<p>${message}</p>`,
            buttons: [
                { text: 'OK', class: 'popup-btn-primary' }
            ]
        });
    }

    showConfirm(message, title = 'Confirm', callback = null) {
        return this.show({
            title: title,
            content: `<p>${message}</p>`,
            buttons: [
                { text: 'Cancel', class: 'popup-btn-secondary' },
                { 
                    text: 'Confirm', 
                    class: 'popup-btn-primary',
                    callback: callback
                }
            ]
        });
    }

    showDocument(type) {
        const documents = {
            terms: {
                title: window.languageManager?.t('termsOfService') || 'Terms of Service',
                content: this.generateTermsContent()
            },
            privacy: {
                title: window.languageManager?.t('privacyPolicy') || 'Privacy Policy',
                content: this.generatePrivacyContent()
            },
            cookies: {
                title: window.languageManager?.t('cookiePolicy') || 'Cookie Policy',
                content: this.generateCookieContent()
            },
            refund: {
                title: window.languageManager?.t('refundPolicy') || 'Refund Policy',
                content: this.generateRefundContent()
            }
        };

        const doc = documents[type];
        if (!doc) return;

        return this.show({
            title: doc.title,
            content: `<div class="document-content">${doc.content}</div>`,
            maxWidth: '800px',
            buttons: [
                { text: 'Close', class: 'popup-btn-primary' }
            ]
        });
    }

    generateTermsContent() {
        return `
            <h1>Terms of Service</h1>
            <p><strong>Last updated:</strong> May 2025</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using the INNER GARDEN interactive exhibition, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h2>2. Exhibition Access</h2>
            <p>Access to the exhibition is granted subject to the following conditions:</p>
            <ul>
                <li>Valid ticket purchase or reservation</li>
                <li>Compliance with exhibition rules and guidelines</li>
                <li>Respectful behavior towards artwork and other visitors</li>
            </ul>
            
            <h2>3. Interactive Elements</h2>
            <p>The interactive wall and digital components are provided for visitor engagement. We reserve the right to moderate content and remove inappropriate messages.</p>
            
            <h2>4. Photography and Recording</h2>
            <p>Personal photography is permitted for non-commercial use. Flash photography and video recording may be restricted in certain areas.</p>
            
            <h2>5. Liability</h2>
            <p>While we take every precaution to ensure visitor safety, participation in interactive elements is at your own risk.</p>
            
            <h2>6. Refunds and Changes</h2>
            <p>Ticket refunds and changes are subject to our refund policy. Please see our refund policy for detailed information.</p>
            
            <h2>7. Contact Information</h2>
            <p>For questions about these terms, please contact us at info@innergarden.art</p>
        `;
    }

    generatePrivacyContent() {
        return `
            <h1>Privacy Policy</h1>
            <p><strong>Last updated:</strong> May 2025</p>
            
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as:</p>
            <ul>
                <li>Contact information for ticket purchases</li>
                <li>Messages left on the interactive wall</li>
                <li>Survey responses and feedback</li>
            </ul>
            
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Process ticket purchases and reservations</li>
                <li>Enhance the exhibition experience</li>
                <li>Send updates about upcoming events</li>
                <li>Improve our services</li>
            </ul>
            
            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:</p>
            <ul>
                <li>With your consent</li>
                <li>To comply with legal requirements</li>
                <li>To protect our rights and safety</li>
            </ul>
            
            <h2>4. Interactive Wall Messages</h2>
            <p>Messages posted on the interactive wall may be visible to other visitors. Please do not include personal or sensitive information in your messages.</p>
            
            <h2>5. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h2>6. Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information. Contact us at privacy@innergarden.art for assistance.</p>
            
            <h2>7. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        `;
    }

    generateCookieContent() {
        return `
            <h1>Cookie Policy</h1>
            <p><strong>Last updated:</strong> May 2025</p>
            
            <h2>1. What Are Cookies</h2>
            <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and settings.</p>
            
            <h2>2. Types of Cookies We Use</h2>
            
            <h3>Essential Cookies</h3>
            <p>These cookies are necessary for the website to function properly. They include:</p>
            <ul>
                <li>Language preference cookies</li>
                <li>Session management cookies</li>
                <li>Security cookies</li>
            </ul>
            
            <h3>Preference Cookies</h3>
            <p>These cookies remember your choices and preferences:</p>
            <ul>
                <li>Sound settings</li>
                <li>Accessibility options</li>
                <li>Theme preferences</li>
            </ul>
            
            <h3>Analytics Cookies</h3>
            <p>These cookies help us understand how visitors interact with our website:</p>
            <ul>
                <li>Page visit statistics</li>
                <li>User behavior analysis</li>
                <li>Performance monitoring</li>
            </ul>
            
            <h2>3. Managing Cookies</h2>
            <p>You can control and manage cookies in various ways:</p>
            <ul>
                <li>Through your browser settings</li>
                <li>Using our cookie preference center</li>
                <li>By clearing your browser data</li>
            </ul>
            
            <h2>4. Third-Party Cookies</h2>
            <p>We may use third-party services that set their own cookies. These include:</p>
            <ul>
                <li>Payment processors</li>
                <li>Analytics providers</li>
                <li>Social media platforms</li>
            </ul>
            
            <h2>5. Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us at cookies@innergarden.art</p>
        `;
    }

    generateRefundContent() {
        return `
            <h1>Refund Policy</h1>
            <p><strong>Last updated:</strong> May 2025</p>
            
            <h2>1. General Refund Policy</h2>
            <p>We want you to be completely satisfied with your INNER GARDEN experience. Our refund policy is designed to be fair and transparent.</p>
            
            <h2>2. Ticket Refunds</h2>
            
            <h3>Full Refund (100%)</h3>
            <p>Available under the following conditions:</p>
            <ul>
                <li>Cancellation more than 48 hours before the event</li>
                <li>Exhibition cancellation due to unforeseen circumstances</li>
                <li>Technical issues preventing access to digital elements</li>
            </ul>
            
            <h3>Partial Refund (50%)</h3>
            <p>Available under the following conditions:</p>
            <ul>
                <li>Cancellation 24-48 hours before the event</li>
                <li>Medical emergencies (documentation required)</li>
            </ul>
            
            <h3>No Refund</h3>
            <p>The following situations do not qualify for refunds:</p>
            <ul>
                <li>Cancellation less than 24 hours before the event</li>
                <li>No-shows without prior notification</li>
                <li>Dissatisfaction with the exhibition content</li>
            </ul>
            
            <h2>3. Digital Content and Merchandise</h2>
            <p>Refunds for digital content and merchandise are handled on a case-by-case basis.</p>
            
            <h2>4. Processing Time</h2>
            <p>Approved refunds will be processed within 5-10 business days to the original payment method.</p>
            
            <h2>5. How to Request a Refund</h2>
            <p>To request a refund:</p>
            <ol>
                <li>Contact us at refunds@innergarden.art</li>
                <li>Include your ticket confirmation number</li>
                <li>Specify the reason for your refund request</li>
                <li>Provide any required documentation</li>
            </ol>
            
            <h2>6. Exchanges and Transfers</h2>
            <p>Ticket exchanges and transfers to different dates may be available subject to availability and a small processing fee.</p>
            
            <h2>7. Contact Information</h2>
            <p>For refund requests and questions, contact us at refunds@innergarden.art or call +380 XX XXX XXXX</p>
        `;
    }
}