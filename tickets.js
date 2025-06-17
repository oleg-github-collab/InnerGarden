/**
 * tickets.js
 * Ticket purchasing and management system
 */

import Utils from './utils.js';
import { SoundManager } from './sound-manager.js';
import { PopupSystem } from './popup-system.js';

export class TicketManager {
    constructor(popupSystem) {
        this.popupSystem = popupSystem;
        this.ticketTypes = {
            standard: { 
                name: 'Standard', 
                price: 150, 
                features: [
                    'Access to all exhibitions',
                    'Interactive wall access',
                    'Audio guide included'
                ]
            },
            premium: { 
                name: 'Premium', 
                price: 250,
                features: [
                    'Access to all exhibitions',
                    'Interactive wall access',
                    'Audio guide included',
                    'Priority booking for events',
                    'Exclusive exhibition catalog'
                ]
            },
            vip: { 
                name: 'VIP', 
                price: 450,
                features: [
                    'Access to all exhibitions',
                    'Interactive wall access',
                    'Audio guide included',
                    'Priority booking for events',
                    'Exclusive exhibition catalog',
                    'Private tour with curator',
                    'Complimentary refreshments'
                ]
            },
            family: { 
                name: 'Family Pack', 
                price: 500,
                features: [
                    'Access for 2 adults + 2 children',
                    'Interactive wall access',
                    'Audio guides for all',
                    'Family workshop participation',
                    'Special children\'s activity pack'
                ]
            },
            student: { 
                name: 'Student', 
                price: 100,
                features: [
                    'Access to all exhibitions',
                    'Interactive wall access',
                    'Audio guide included',
                    'Valid with student ID'
                ]
            },
            group: {
                name: 'Group',
                price: 120,
                features: [
                    'Minimum 10 people',
                    'Access to all exhibitions',
                    'Interactive wall access',
                    'Dedicated group guide'
                ]
            }
        };
        
        this.cart = [];
        this.init();
    }

    init() {
        this.bindTicketButtons();
        this.bindCartEvents();
        this.createTicketCards();
        this.initDatePicker();
    }

    createTicketCards() {
        const ticketsContainer = document.querySelector('.tickets-grid');
        if (!ticketsContainer) return;

        Object.entries(this.ticketTypes).forEach(([key, ticket]) => {
            const card = this.createTicketCard(key, ticket);
            ticketsContainer.appendChild(card);
        });
    }

    createTicketCard(type, ticket) {
        const card = document.createElement('div');
        card.className = 'ticket-card magnetic';
        card.setAttribute('data-ticket-type', type);
        
        const isPopular = type === 'premium';
        const isBestValue = type === 'family';
        
        card.innerHTML = `
            <div class="ticket-header">
                ${isPopular ? '<span class="badge popular">Most Popular</span>' : ''}
                ${isBestValue ? '<span class="badge best-value">Best Value</span>' : ''}
                <h3 class="ticket-name">${ticket.name}</h3>
                <div class="ticket-price">
                    <span class="currency">₴</span>
                    <span class="amount">${ticket.price}</span>
                    ${type === 'group' ? '<span class="per-person">/person</span>' : ''}
                </div>
            </div>
            <div class="ticket-features">
                <ul>
                    ${ticket.features.map(feature => `
                        <li><span class="check-icon">✓</span> ${feature}</li>
                    `).join('')}
                </ul>
            </div>
            <div class="ticket-actions">
                <button class="ticket-btn" data-ticket="${type}" data-translate="buyTicket">
                    Buy Ticket
                </button>
                <button class="add-to-cart-btn" data-ticket="${type}" data-translate="addToCart">
                    Add to Cart
                </button>
            </div>
        `;
        
        return card;
    }

    bindTicketButtons() {
        // Direct purchase buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('ticket-btn')) {
                const ticketType = e.target.getAttribute('data-ticket');
                this.showTicketPurchase(ticketType);
            }
            
            if (e.target.classList.contains('add-to-cart-btn')) {
                const ticketType = e.target.getAttribute('data-ticket');
                this.addToCart(ticketType);
            }
        });
    }

    bindCartEvents() {
        const cartIcon = document.querySelector('.cart-icon');
        const cartCount = document.querySelector('.cart-count');
        
        if (cartIcon) {
            cartIcon.addEventListener('click', () => {
                this.showCart();
            });
        }
    }

    showTicketPurchase(ticketType) {
        const ticket = this.ticketTypes[ticketType];
        if (!ticket) return;
        
        this.popupSystem.show({
            title: `Purchase ${ticket.name} Ticket`,
            subtitle: `${ticket.price} UAH`,
            content: this.createPurchaseForm(ticketType, ticket),
            maxWidth: '700px',
            buttons: [
                { text: 'Cancel', class: 'popup-btn-secondary' },
                { 
                    text: `Pay ${ticket.price} UAH`, 
                    class: 'popup-btn-primary',
                    callback: (popup) => this.processTicketPayment(popup, ticketType, ticket)
                }
            ]
        });
        
        this.bindPaymentMethodSelection();
        this.bindFormValidation();
        SoundManager.play('click');
    }

    createPurchaseForm(ticketType, ticket) {
        return `
            <div class="ticket-purchase">
                <div class="ticket-summary">
                    <h3>${ticket.name} Ticket</h3>
                    <p class="price">${ticket.price} UAH</p>
                    <div class="ticket-features">
                        ${ticket.features.map(f => `<p>✓ ${f}</p>`).join('')}
                    </div>
                </div>
                
                <form class="purchase-form">
                    <h3>Visitor Information</h3>
                    
                    <div class="form-group">
                        <label class="form-label">Visit Date *</label>
                        <input type="date" class="form-input" name="visitDate" required 
                               min="${new Date().toISOString().split('T')[0]}"
                               max="${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}">
                    </div>
                    
                    ${ticketType === 'group' ? `
                        <div class="form-group">
                            <label class="form-label">Number of People *</label>
                            <input type="number" class="form-input" name="groupSize" 
                                   min="10" max="50" value="10" required>
                            <small>Minimum 10 people required for group tickets</small>
                        </div>
                    ` : ''}
                    
                    <div class="form-group">
                        <label class="form-label">Full Name *</label>
                        <input type="text" class="form-input" name="fullName" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Email *</label>
                        <input type="email" class="form-input" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-input" name="phone">
                    </div>
                    
                    ${ticketType === 'student' ? `
                        <div class="form-group">
                            <label class="form-label">Student ID Number *</label>
                            <input type="text" class="form-input" name="studentId" required>
                            <small>You'll need to show your student ID at entrance</small>
                        </div>
                    ` : ''}
                    
                    <h3>Payment Method</h3>
                    <div class="payment-methods">
                        <div class="payment-method selected" data-method="card">
                            <strong>💳 Credit Card</strong>
                            <p>Visa, MasterCard, American Express</p>
                        </div>
                        <div class="payment-method" data-method="paypal">
                            <strong>🅿️ PayPal</strong>
                            <p>Pay securely with PayPal</p>
                        </div>
                        <div class="payment-method" data-method="bank">
                            <strong>🏦 Bank Transfer</strong>
                            <p>Direct bank transfer</p>
                        </div>
                    </div>
                    
                    <div class="card-details">
                        <div class="form-group">
                            <label class="form-label">Card Number *</label>
                            <input type="text" class="form-input" name="cardNumber" 
                                   placeholder="1234 5678 9012 3456" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Expiry Date *</label>
                                <input type="text" class="form-input" name="expiry" 
                                       placeholder="MM/YY" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">CVV *</label>
                                <input type="text" class="form-input" name="cvv" 
                                       placeholder="123" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="paypal-details" style="display: none;">
                        <p>You will be redirected to PayPal to complete your payment.</p>
                    </div>
                    
                    <div class="bank-details" style="display: none;">
                        <p>Bank transfer details will be sent to your email after confirmation.</p>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="terms" required>
                            I agree to the <a href="#" onclick="window.showTerms()">Terms of Service</a> 
                            and <a href="#" onclick="window.showRefund()">Refund Policy</a>
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="newsletter">
                            Send me updates about upcoming exhibitions and events
                        </label>
                    </div>
                </form>
            </div>
        `;
    }

    bindPaymentMethodSelection() {
        setTimeout(() => {
            const paymentMethods = document.querySelectorAll('.payment-method');
            const cardDetails = document.querySelector('.card-details');
            const paypalDetails = document.querySelector('.paypal-details');
            const bankDetails = document.querySelector('.bank-details');
            
            paymentMethods.forEach(method => {
                method.addEventListener('click', () => {
                    paymentMethods.forEach(m => m.classList.remove('selected'));
                    method.classList.add('selected');
                    
                    const methodType = method.getAttribute('data-method');
                    
                    // Show/hide payment details
                    cardDetails.style.display = methodType === 'card' ? 'block' : 'none';
                    paypalDetails.style.display = methodType === 'paypal' ? 'block' : 'none';
                    bankDetails.style.display = methodType === 'bank' ? 'block' : 'none';
                    
                    // Update required fields
                    const cardInputs = cardDetails.querySelectorAll('input');
                    cardInputs.forEach(input => {
                        input.required = methodType === 'card';
                    });
                    
                    SoundManager.play('click');
                });
            });
        }, 100);
    }

    bindFormValidation() {
        setTimeout(() => {
            // Card number formatting
            const cardInput = document.querySelector('input[name="cardNumber"]');
            if (cardInput) {
                cardInput.addEventListener('input', (e) => {
                    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
                    let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                    if (formatted.length > 19) formatted = formatted.substring(0, 19);
                    e.target.value = formatted;
                });
            }
            
            // Expiry date formatting
            const expiryInput = document.querySelector('input[name="expiry"]');
            if (expiryInput) {
                expiryInput.addEventListener('input', (e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length >= 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4);
                    }
                    e.target.value = value;
                });
            }
            
            // CVV formatting
            const cvvInput = document.querySelector('input[name="cvv"]');
            if (cvvInput) {
                cvvInput.addEventListener('input', (e) => {
                    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
                });
            }
            
            // Group size update
            const groupSizeInput = document.querySelector('input[name="groupSize"]');
            if (groupSizeInput) {
                groupSizeInput.addEventListener('input', (e) => {
                    const size = parseInt(e.target.value) || 10;
                    const pricePerPerson = this.ticketTypes.group.price;
                    const totalPrice = size * pricePerPerson;
                    
                    const submitBtn = document.querySelector('.popup-btn-primary');
                    if (submitBtn) {
                        submitBtn.textContent = `Pay ${totalPrice} UAH`;
                    }
                });
            }
        }, 100);
    }

    processTicketPayment(popup, ticketType, ticket) {
        const form = popup.element.querySelector('.purchase-form');
        const formData = new FormData(form);
        
        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Calculate final price
        let finalPrice = ticket.price;
        if (ticketType === 'group') {
            const groupSize = parseInt(formData.get('groupSize')) || 10;
            finalPrice = groupSize * ticket.price;
        }
        
        // Show processing
        const submitBtn = popup.element.querySelector('.popup-btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Simulate payment processing
        setTimeout(() => {
            const paymentMethod = popup.element.querySelector('.payment-method.selected').getAttribute('data-method');
            
            if (paymentMethod === 'paypal') {
                // Simulate PayPal redirect
                this.showNotification('Redirecting to PayPal...', 'info');
                setTimeout(() => {
                    this.popupSystem.close(popup);
                    this.showTicketSuccess(ticket, formData, finalPrice);
                }, 1500);
            } else {
                // Direct payment processing
                this.popupSystem.close(popup);
                this.showTicketSuccess(ticket, formData, finalPrice);
            }
            
            SoundManager.play('success');
        }, 2500);
    }

    showTicketSuccess(ticket, formData, price) {
        const ticketId = this.generateTicketId();
        const visitDate = new Date(formData.get('visitDate')).toLocaleDateString();
        
        this.popupSystem.show({
            title: 'Payment Successful!',
            subtitle: 'Your ticket has been confirmed',
            content: `
                <div class="success-content">
                    <div class="success-icon">✓</div>
                    <div class="ticket-confirmation">
                        <h3>${ticket.name} Ticket</h3>
                        <p class="ticket-id">Ticket ID: <strong>${ticketId}</strong></p>
                        <div class="confirmation-details">
                            <p><strong>Name:</strong> ${formData.get('fullName')}</p>
                            <p><strong>Email:</strong> ${formData.get('email')}</p>
                            <p><strong>Visit Date:</strong> ${visitDate}</p>
                            ${formData.get('groupSize') ? `<p><strong>Group Size:</strong> ${formData.get('groupSize')} people</p>` : ''}
                            <p><strong>Total Price:</strong> ${price} UAH</p>
                        </div>
                        <div class="qr-code">
                            <div class="qr-placeholder">QR CODE</div>
                            <p>Show this QR code at the entrance</p>
                        </div>
                    </div>
                    <p class="confirmation-note">
                        A confirmation email with your e-ticket has been sent to ${formData.get('email')}
                    </p>
                </div>
            `,
            buttons: [
                { 
                    text: 'Download Ticket', 
                    class: 'popup-btn-secondary',
                    callback: () => this.downloadTicket(ticketId, ticket, formData, price),
                    close: false
                },
                { text: 'Close', class: 'popup-btn-primary' }
            ]
        });
    }

    generateTicketId() {
        const prefix = 'TKT';
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `${prefix}-${timestamp}-${random}`;
    }

    downloadTicket(ticketId, ticket, formData, price) {
        const visitDate = new Date(formData.get('visitDate')).toLocaleDateString();
        const ticketHtml = this.generateTicketHTML(ticketId, ticket, formData, price, visitDate);
        
        const blob = new Blob([ticketHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `INNER_GARDEN_Ticket_${ticketId}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Ticket downloaded successfully!', 'success');
    }

    generateTicketHTML(ticketId, ticket, formData, price, visitDate) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>INNER GARDEN Ticket - ${ticketId}</title>
                <style>
                    body { 
                        font-family: 'Arial', sans-serif; 
                        margin: 0; 
                        padding: 20px; 
                        background: #f5f5f5; 
                    }
                    .ticket { 
                        max-width: 600px; 
                        margin: 0 auto; 
                        background: white;
                        border-radius: 20px; 
                        padding: 40px; 
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    }
                    .header { 
                        text-align: center; 
                        margin-bottom: 3rem; 
                        border-bottom: 2px solid #eee;
                        padding-bottom: 2rem;
                    }
                    .logo { 
                        font-size: 2.5rem; 
                        font-weight: 900; 
                        color: #667eea;
                        margin-bottom: 0.5rem; 
                    }
                    .subtitle { 
                        font-size: 1rem; 
                        color: #999;
                    }
                    .ticket-type {
                        font-size: 1.5rem;
                        color: #333;
                        margin: 2rem 0;
                    }
                    .ticket-id { 
                        font-size: 1.8rem; 
                        font-weight: bold; 
                        text-align: center; 
                        margin: 2rem 0;
                        padding: 1rem;
                        background: #f8f9fa;
                        border-radius: 10px;
                        color: #e67e22;
                        letter-spacing: 2px;
                    }
                    .ticket-info { 
                        margin: 2rem 0; 
                    }
                    .info-row { 
                        display: flex; 
                        justify-content: space-between; 
                        margin: 1rem 0; 
                        padding: 0.5rem 0;
                        border-bottom: 1px solid #f0f0f0;
                    }
                    .info-label {
                        color: #666;
                    }
                    .info-value {
                        font-weight: 600;
                        color: #333;
                    }
                    .qr-code { 
                        text-align: center;
                        margin: 3rem 0;
                    }
                    .qr-placeholder { 
                        width: 200px; 
                        height: 200px; 
                        background: #f0f0f0; 
                        margin: 0 auto 1rem; 
                        border-radius: 10px; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        color: #999; 
                        font-weight: bold;
                        font-size: 1.5rem;
                    }
                    .footer { 
                        text-align: center; 
                        margin-top: 3rem; 
                        color: #666;
                        font-size: 0.9rem;
                    }
                    .terms {
                        margin-top: 2rem;
                        padding: 1rem;
                        background: #fffbf0;
                        border-radius: 10px;
                        font-size: 0.85rem;
                        color: #666;
                    }
                    @media print {
                        body { background: white; }
                        .ticket { box-shadow: none; }
                    }
                </style>
            </head>
            <body>
                <div class="ticket">
                    <div class="header">
                        <div class="logo">INNER GARDEN</div>
                        <div class="subtitle">Interactive Art Experience</div>
                    </div>
                    
                    <div class="ticket-type">${ticket.name} Ticket</div>
                    <div class="ticket-id">ID: ${ticketId}</div>
                    
                    <div class="ticket-info">
                        <div class="info-row">
                            <span class="info-label">Visitor Name:</span>
                            <span class="info-value">${formData.get('fullName')}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Visit Date:</span>
                            <span class="info-value">${visitDate}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Email:</span>
                            <span class="info-value">${formData.get('email')}</span>
                        </div>
                        ${formData.get('groupSize') ? `
                        <div class="info-row">
                            <span class="info-label">Group Size:</span>
                            <span class="info-value">${formData.get('groupSize')} people</span>
                        </div>
                        ` : ''}
                        <div class="info-row">
                            <span class="info-label">Total Price:</span>
                            <span class="info-value">${price} UAH</span>
                        </div>
                    </div>
                    
                    <div class="qr-code">
                        <div class="qr-placeholder">QR CODE</div>
                        <p>Present this QR code at the entrance</p>
                    </div>
                    
                    <div class="terms">
                        <strong>Terms & Conditions:</strong><br>
                        • This ticket is valid only for the specified date<br>
                        • No refunds for no-shows<br>
                        • Children under 5 enter free<br>
                        • Photography allowed for personal use only<br>
                        • Please arrive 15 minutes before your scheduled time
                    </div>
                    
                    <div class="footer">
                        <p>Marina Kaminska's Interactive Exhibition</p>
                        <p>May 15 - June 30, 2025</p>
                        <p>Thank you for visiting INNER GARDEN!</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    addToCart(ticketType) {
        const ticket = this.ticketTypes[ticketType];
        if (!ticket) return;
        
        this.cart.push({
            id: Utils.generateId(),
            type: ticketType,
            ticket: ticket,
            quantity: 1,
            date: null
        });
        
        this.updateCartCount();
        this.showNotification(`${ticket.name} ticket added to cart!`, 'success');
        SoundManager.play('success');
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    showCart() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty', 'info');
            return;
        }
        
        const totalPrice = this.cart.reduce((sum, item) => 
            sum + (item.ticket.price * item.quantity), 0
        );
        
        this.popupSystem.show({
            title: 'Shopping Cart',
            subtitle: `${this.cart.length} items`,
            content: this.createCartContent(totalPrice),
            maxWidth: '700px',
            buttons: [
                { text: 'Continue Shopping', class: 'popup-btn-secondary' },
                { 
                    text: `Checkout (${totalPrice} UAH)`, 
                    class: 'popup-btn-primary',
                    callback: (popup) => this.processCartCheckout(popup, totalPrice)
                }
            ]
        });
        
        this.bindCartItemEvents();
    }

    createCartContent(totalPrice) {
        return `
            <div class="shopping-cart">
                <div class="cart-items">
                    ${this.cart.map(item => `
                        <div class="cart-item" data-cart-id="${item.id}">
                            <div class="item-info">
                                <h4>${item.ticket.name}</h4>
                                <p class="item-price">${item.ticket.price} UAH each</p>
                            </div>
                            <div class="item-controls">
                                <input type="date" class="item-date" 
                                       value="${item.date || ''}"
                                       min="${new Date().toISOString().split('T')[0]}"
                                       placeholder="Select date">
                                <input type="number" class="item-quantity" 
                                       value="${item.quantity}" 
                                       min="1" max="20">
                                <button class="remove-item" data-cart-id="${item.id}">×</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-summary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>${totalPrice} UAH</span>
                    </div>
                    <div class="summary-row">
                        <span>Service Fee:</span>
                        <span>0 UAH</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total:</span>
                        <span>${totalPrice} UAH</span>
                    </div>
                </div>
            </div>
        `;
    }

    bindCartItemEvents() {
        setTimeout(() => {
            // Quantity change
            document.querySelectorAll('.item-quantity').forEach(input => {
                input.addEventListener('change', (e) => {
                    const cartId = e.target.closest('.cart-item').getAttribute('data-cart-id');
                    const item = this.cart.find(i => i.id === cartId);
                    if (item) {
                        item.quantity = parseInt(e.target.value) || 1;
                        this.updateCartDisplay();
                    }
                });
            });
            
            // Date change
            document.querySelectorAll('.item-date').forEach(input => {
                input.addEventListener('change', (e) => {
                    const cartId = e.target.closest('.cart-item').getAttribute('data-cart-id');
                    const item = this.cart.find(i => i.id === cartId);
                    if (item) {
                        item.date = e.target.value;
                    }
                });
            });
            
            // Remove item
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const cartId = e.target.getAttribute('data-cart-id');
                    this.removeFromCart(cartId);
                });
            });
        }, 100);
    }

    removeFromCart(cartId) {
        this.cart = this.cart.filter(item => item.id !== cartId);
        this.updateCartCount();
        
        if (this.cart.length === 0) {
            this.popupSystem.closeAll();
            this.showNotification('Cart is now empty', 'info');
        } else {
            this.updateCartDisplay();
        }
        
        SoundManager.play('click');
    }

    updateCartDisplay() {
        const totalPrice = this.cart.reduce((sum, item) => 
            sum + (item.ticket.price * item.quantity), 0
        );
        
        // Update cart content
        const cartContent = document.querySelector('.shopping-cart');
        if (cartContent) {
            cartContent.innerHTML = this.createCartContent(totalPrice).match(/<div class="shopping-cart">([\s\S]*)<\/div>/)[1];
            this.bindCartItemEvents();
        }
        
        // Update checkout button
        const checkoutBtn = document.querySelector('.popup-btn-primary');
        if (checkoutBtn) {
            checkoutBtn.textContent = `Checkout (${totalPrice} UAH)`;
        }
    }

    processCartCheckout(popup, totalPrice) {
        // Validate all items have dates
        const missingDates = this.cart.filter(item => !item.date);
        if (missingDates.length > 0) {
            this.showNotification('Please select dates for all tickets', 'error');
            return;
        }
        
        // Show checkout form
        this.popupSystem.close(popup);
        this.showCheckoutForm(totalPrice);
    }

    showCheckoutForm(totalPrice) {
        // Similar to individual ticket purchase but for multiple items
        this.popupSystem.show({
            title: 'Checkout',
            subtitle: `Total: ${totalPrice} UAH`,
            content: this.createCheckoutForm(totalPrice),
            maxWidth: '700px',
            buttons: [
                { text: 'Back to Cart', class: 'popup-btn-secondary', callback: () => this.showCart() },
                { 
                    text: `Complete Purchase (${totalPrice} UAH)`, 
                    class: 'popup-btn-primary',
                    callback: (popup) => this.processCheckout(popup, totalPrice)
                }
            ]
        });
        
        this.bindPaymentMethodSelection();
        this.bindFormValidation();
    }

    createCheckoutForm(totalPrice) {
        return `
            <div class="checkout-form">
                <div class="order-summary">
                    <h3>Order Summary</h3>
                    ${this.cart.map(item => `
                        <div class="order-item">
                            <p><strong>${item.ticket.name}</strong> × ${item.quantity}</p>
                            <p>Date: ${new Date(item.date).toLocaleDateString()}</p>
                            <p>${item.ticket.price * item.quantity} UAH</p>
                        </div>
                    `).join('')}
                    <div class="order-total">
                        <strong>Total: ${totalPrice} UAH</strong>
                    </div>
                </div>
                
                <!-- Rest of the form similar to individual ticket purchase -->
                <form class="purchase-form">
                    <!-- Customer and payment information -->
                    <!-- ... (same as individual ticket form) ... -->
                </form>
            </div>
        `;
    }

    processCheckout(popup, totalPrice) {
        // Similar to individual ticket processing but for multiple tickets
        // Implementation would follow the same pattern
    }

    initDatePicker() {
        // Initialize any date picker enhancements
        const today = new Date().toISOString().split('T')[0];
        const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        document.querySelectorAll('input[type="date"]').forEach(input => {
            input.setAttribute('min', today);
            input.setAttribute('max', maxDate);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `ticket-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;

        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };

        notification.style.background = colors[type] || colors.info;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}