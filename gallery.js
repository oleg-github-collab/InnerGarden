/**
 * gallery.js
 * Gallery management and artwork display system
 */

import Utils from './utils.js';
import { SoundManager } from './sound-manager.js';
import { PopupSystem } from './popup-system.js';

export class GalleryManager {
    constructor(popupSystem) {
        this.popupSystem = popupSystem;
        this.filters = {
            current: 'all',
            available: ['all', 'nature', 'emotions', 'dreams', 'memories', 'abstract', 'portraits']
        };
        this.artworks = [];
        this.currentView = 'grid';
        this.init();
    }

    init() {
        this.loadArtworks();
        this.bindFilterEvents();
        this.bindArtworkEvents();
        this.bindViewModeEvents();
        this.initLazyLoading();
        this.initZoom();
    }

    loadArtworks() {
        // Generate sample artworks data
        const categories = ['nature', 'emotions', 'dreams', 'memories', 'abstract', 'portraits'];
        const titles = {
            nature: ['Forest Dreams', 'Ocean Whispers', 'Mountain Echo', 'River Song', 'Desert Bloom', 'Spring Awakening'],
            emotions: ['Joy Unleashed', 'Silent Tears', 'Inner Peace', 'Rage Within', 'Love\'s Embrace', 'Melancholy Blue'],
            dreams: ['Night Visions', 'Lucid Journey', 'Dreamcatcher', 'Sleep Walker', 'Fantasy Realm', 'Astral Travel'],
            memories: ['Childhood Days', 'Lost Time', 'Forgotten Faces', 'Memory Lane', 'Past Lives', 'Time Capsule'],
            abstract: ['Color Symphony', 'Form and Void', 'Chaos Theory', 'Pattern Dance', 'Geometric Dreams', 'Abstract Reality'],
            portraits: ['Soul Window', 'Hidden Face', 'Silent Story', 'Character Study', 'Inner Self', 'Human Nature']
        };

        this.artworks = categories.flatMap((category, catIndex) => 
            titles[category].map((title, index) => ({
                id: Utils.generateId(),
                title: title,
                artist: 'Marina Kaminska',
                category: category,
                year: 2024,
                medium: this.getRandomMedium(),
                dimensions: this.getRandomDimensions(),
                price: this.getRandomPrice(),
                description: this.generateDescription(title, category),
                image: this.generateImagePlaceholder(catIndex * 6 + index),
                featured: Math.random() > 0.8,
                sold: Math.random() > 0.9
            }))
        );

        this.renderArtworks();
    }

    getRandomMedium() {
        const mediums = [
            'Oil on Canvas',
            'Acrylic on Canvas',
            'Mixed Media',
            'Digital Print',
            'Watercolor on Paper',
            'Ink and Watercolor'
        ];
        return mediums[Math.floor(Math.random() * mediums.length)];
    }

    getRandomDimensions() {
        const sizes = [
            '60 × 80 cm',
            '80 × 100 cm',
            '100 × 120 cm',
            '120 × 150 cm',
            '50 × 70 cm',
            '90 × 90 cm'
        ];
        return sizes[Math.floor(Math.random() * sizes.length)];
    }

    getRandomPrice() {
        const basePrice = Utils.getRandomInt(5000, 50000);
        return Math.floor(basePrice / 100) * 100;
    }

    generateDescription(title, category) {
        const descriptions = {
            nature: `This artwork explores the profound connection between humanity and the natural world. "${title}" invites viewers to immerse themselves in the organic beauty and raw power of nature.`,
            emotions: `A powerful exploration of human emotions, "${title}" captures the essence of inner feelings and transforms them into visual poetry. The piece resonates with viewers on a deeply personal level.`,
            dreams: `Diving into the subconscious realm, "${title}" presents a dreamlike narrative that blurs the lines between reality and imagination. Each viewing reveals new layers of meaning.`,
            memories: `"${title}" is a nostalgic journey through time, capturing fleeting moments and preserving them in artistic form. The work speaks to our universal experience of remembrance.`,
            abstract: `In "${title}", form and color dance in perfect harmony, creating a visual symphony that transcends literal interpretation. The piece invites contemplation and personal discovery.`,
            portraits: `This intimate portrait study, "${title}", reveals the complexity of human character through subtle details and expressive techniques. It captures both the visible and the hidden.`
        };

        return descriptions[category] || 'A remarkable piece that showcases the artist\'s unique vision and technical mastery.';
    }

    generateImagePlaceholder(index) {
        // Generate gradient-based placeholder
        const hue = (index * 137.5) % 360;
        return {
            placeholder: `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${(hue + 60) % 360}, 70%, 40%))`,
            url: `/images/artwork-${index}.jpg` // Placeholder URL
        };
    }

    renderArtworks() {
        const galleryContainer = document.querySelector('.gallery-grid');
        if (!galleryContainer) return;

        galleryContainer.innerHTML = '';

        const filteredArtworks = this.filters.current === 'all' 
            ? this.artworks 
            : this.artworks.filter(artwork => artwork.category === this.filters.current);

        filteredArtworks.forEach(artwork => {
            const artworkElement = this.createArtworkElement(artwork);
            galleryContainer.appendChild(artworkElement);
        });

        this.animateArtworksIn();
    }

    createArtworkElement(artwork) {
        const element = document.createElement('div');
        element.className = 'artwork-item magnetic';
        element.setAttribute('data-categories', artwork.category);
        element.setAttribute('data-id', artwork.id);
        
        element.innerHTML = `
            <div class="artwork-image" style="background: ${artwork.image.placeholder}">
                ${artwork.featured ? '<span class="featured-badge">Featured</span>' : ''}
                ${artwork.sold ? '<span class="sold-badge">Sold</span>' : ''}
                <div class="artwork-overlay">
                    <button class="quick-view-btn" data-translate="viewDetails">View Details</button>
                </div>
            </div>
            <div class="artwork-info">
                <h3 class="artwork-title">${artwork.title}</h3>
                <p class="artwork-medium">${artwork.medium}</p>
                <p class="artwork-dimensions">${artwork.dimensions}</p>
                <p class="artwork-price">${Utils.formatCurrency(artwork.price, 'UAH')}</p>
            </div>
        `;

        return element;
    }

    bindFilterEvents() {
        const filterButtons = document.querySelectorAll('.gallery-filter');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.setFilter(filter);
                this.updateActiveFilter(button);
                SoundManager.play('click');
            });
        });
    }

    setFilter(filter) {
        this.filters.current = filter;
        this.filterArtworks();
    }

    filterArtworks() {
        const artworkItems = document.querySelectorAll('.artwork-item');
        
        artworkItems.forEach(item => {
            const categories = item.getAttribute('data-categories')?.split(' ') || [];
            const shouldShow = this.filters.current === 'all' || categories.includes(this.filters.current);
            
            item.style.opacity = shouldShow ? '1' : '0.3';
            item.style.transform = shouldShow ? 'scale(1)' : 'scale(0.95)';
            item.style.pointerEvents = shouldShow ? 'all' : 'none';
        });
    }

    updateActiveFilter(activeButton) {
        document.querySelectorAll('.gallery-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    bindArtworkEvents() {
        // Use event delegation for dynamic content
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-view-btn')) {
                const artworkItem = e.target.closest('.artwork-item');
                if (artworkItem) {
                    const artworkId = artworkItem.getAttribute('data-id');
                    const artwork = this.artworks.find(a => a.id === artworkId);
                    if (artwork) {
                        this.showArtworkDetails(artwork);
                    }
                }
            }
        });
    }

    showArtworkDetails(artwork) {
        this.popupSystem.show({
            title: artwork.title,
            subtitle: `${artwork.medium} • ${artwork.year}`,
            content: this.createArtworkDetailsContent(artwork),
            maxWidth: '800px',
            buttons: [
                { 
                    text: 'Inquire About This Piece', 
                    class: 'popup-btn-secondary',
                    callback: () => this.showInquiryForm(artwork),
                    close: false
                },
                { text: 'Close', class: 'popup-btn-primary' }
            ]
        });
        
        SoundManager.play('magic');
    }

    createArtworkDetailsContent(artwork) {
        return `
            <div class="artwork-details">
                <div class="artwork-image-large" style="background: ${artwork.image.placeholder}; height: 400px; border-radius: 10px; margin-bottom: 2rem;">
                    ${artwork.sold ? '<div class="sold-overlay">SOLD</div>' : ''}
                </div>
                
                <div class="artwork-description">
                    <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 2rem;">${artwork.description}</p>
                    
                    <div class="artwork-metadata" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; background: #f8f9fa; padding: 1.5rem; border-radius: 10px;">
                        <div>
                            <h4 style="color: #7f8c8d; font-size: 0.9rem; margin-bottom: 0.5rem;">Artist</h4>
                            <p style="font-weight: 600;">${artwork.artist}</p>
                        </div>
                        <div>
                            <h4 style="color: #7f8c8d; font-size: 0.9rem; margin-bottom: 0.5rem;">Year</h4>
                            <p style="font-weight: 600;">${artwork.year}</p>
                        </div>
                        <div>
                            <h4 style="color: #7f8c8d; font-size: 0.9rem; margin-bottom: 0.5rem;">Medium</h4>
                            <p style="font-weight: 600;">${artwork.medium}</p>
                        </div>
                        <div>
                            <h4 style="color: #7f8c8d; font-size: 0.9rem; margin-bottom: 0.5rem;">Dimensions</h4>
                            <p style="font-weight: 600;">${artwork.dimensions}</p>
                        </div>
                        <div>
                            <h4 style="color: #7f8c8d; font-size: 0.9rem; margin-bottom: 0.5rem;">Category</h4>
                            <p style="font-weight: 600;">${artwork.category}</p>
                        </div>
                        <div>
                            <h4 style="color: #7f8c8d; font-size: 0.9rem; margin-bottom: 0.5rem;">Price</h4>
                            <p style="font-weight: 600; color: #e67e22; font-size: 1.2rem;">
                                ${artwork.sold ? 'SOLD' : Utils.formatCurrency(artwork.price, 'UAH')}
                            </p>
                        </div>
                    </div>
                    
                    ${artwork.featured ? `
                        <div class="featured-note" style="margin-top: 2rem; padding: 1rem; background: #fff3cd; border-radius: 8px; color: #856404;">
                            <strong>Featured Artwork:</strong> This piece is part of our specially curated collection.
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    showInquiryForm(artwork) {
        this.popupSystem.show({
            title: 'Artwork Inquiry',
            subtitle: artwork.title,
            content: `
                <form class="inquiry-form">
                    <p style="margin-bottom: 2rem;">Interested in "${artwork.title}"? Please fill out the form below and we'll get back to you shortly.</p>
                    
                    <div class="form-group">
                        <label class="form-label">Your Name *</label>
                        <input type="text" class="form-input" name="name" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Email *</label>
                        <input type="email" class="form-input" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-input" name="phone">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Message</label>
                        <textarea class="form-input form-textarea" name="message" placeholder="Tell us about your interest in this artwork..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Preferred Contact Method</label>
                        <select class="form-select" name="contactMethod">
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                </form>
            `,
            buttons: [
                { text: 'Cancel', class: 'popup-btn-secondary' },
                { 
                    text: 'Send Inquiry', 
                    class: 'popup-btn-primary',
                    callback: (popup) => this.submitInquiry(popup, artwork)
                }
            ]
        });
    }

    submitInquiry(popup, artwork) {
        const form = popup.element.querySelector('.inquiry-form');
        const formData = new FormData(form);
        
        // Validate form
        if (!formData.get('name') || !formData.get('email')) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate sending inquiry
        const submitBtn = popup.element.querySelector('.popup-btn-primary');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            this.popupSystem.close(popup);
            this.showNotification('Your inquiry has been sent successfully!', 'success');
            SoundManager.play('success');
        }, 1500);
    }

    bindViewModeEvents() {
        const viewButtons = document.querySelectorAll('.view-mode-btn');
        
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const mode = button.getAttribute('data-view');
                this.setViewMode(mode);
                this.updateActiveViewMode(button);
                SoundManager.play('click');
            });
        });
    }

    setViewMode(mode) {
        this.currentView = mode;
        const galleryContainer = document.querySelector('.gallery-grid');
        
        if (galleryContainer) {
            galleryContainer.className = `gallery-grid ${mode}-view`;
        }
    }

    updateActiveViewMode(activeButton) {
        document.querySelectorAll('.view-mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    initLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const artworkImage = entry.target;
                    const imageUrl = artworkImage.getAttribute('data-src');
                    
                    if (imageUrl) {
                        // Simulate image loading
                        artworkImage.style.backgroundImage = `url(${imageUrl})`;
                        artworkImage.classList.add('loaded');
                        observer.unobserve(artworkImage);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        document.querySelectorAll('.artwork-image[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    initZoom() {
        let zoomLevel = 1;
        const zoomStep = 0.1;
        const maxZoom = 2;
        const minZoom = 0.5;

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === '+' || e.key === '=') {
                    e.preventDefault();
                    this.zoomIn();
                } else if (e.key === '-') {
                    e.preventDefault();
                    this.zoomOut();
                } else if (e.key === '0') {
                    e.preventDefault();
                    this.resetZoom();
                }
            }
        });
    }

    zoomIn() {
        const galleryContainer = document.querySelector('.gallery-grid');
        if (galleryContainer) {
            const currentZoom = parseFloat(galleryContainer.style.zoom || 1);
            const newZoom = Math.min(currentZoom + 0.1, 2);
            galleryContainer.style.zoom = newZoom;
        }
    }

    zoomOut() {
        const galleryContainer = document.querySelector('.gallery-grid');
        if (galleryContainer) {
            const currentZoom = parseFloat(galleryContainer.style.zoom || 1);
            const newZoom = Math.max(currentZoom - 0.1, 0.5);
            galleryContainer.style.zoom = newZoom;
        }
    }

    resetZoom() {
        const galleryContainer = document.querySelector('.gallery-grid');
        if (galleryContainer) {
            galleryContainer.style.zoom = 1;
        }
    }

    animateArtworksIn() {
        const artworkItems = document.querySelectorAll('.artwork-item');
        
        artworkItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `gallery-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
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
            notification.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}