/**
 * INNER GARDEN - Application Configuration
 * @module config
 */

export const CONFIG = {
    version: '3.1.0',
    buildDate: '2024-01-20',
    
    // Language settings
    language: {
        default: 'uk',
        supported: ['uk', 'en', 'de', 'es'],
        autoDetect: true,
        storageKey: 'innerGarden_language'
    },
    
    // Animation settings
    animation: {
        speed: {
            fast: 200,
            medium: 400,
            slow: 800,
            interactive: 1200
        },
        easing: {
            default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
    },
    
    // Custom cursor settings
    cursor: {
        enabled: true,
        trailLength: 12,
        magneticDistance: 80,
        parallaxStrength: 0.1,
        colors: {
            default: '#e67e22',
            hover: '#3498db',
            active: '#e74c3c',
            magnetic: '#9b59b6',
            text: '#27ae60'
        }
    },
    
    // Interactive wall settings
    wall: {
        maxMessages: 50,
        messageLifetime: 3600000, // 1 hour in ms
        particleDensity: 0.3,
        interactionRadius: 100,
        animations: {
            enabled: true,
            types: ['scatter', 'cluster', 'flow', 'spiral', 'wave', 'explode']
        },
        canvas: {
            fps: 60,
            particleCount: 100
        }
    },
    
    // Sound settings
    sound: {
        enabled: true,
        volume: 0.6,
        ambientEnabled: false,
        sounds: {
            click: { frequency: 800, duration: 0.1, type: 'square' },
            hover: { frequency: 600, duration: 0.05, type: 'sine' },
            success: { frequencies: [523.25, 659.25, 783.99], duration: 0.4 },
            error: { frequency: 200, duration: 0.3, type: 'sawtooth' },
            notification: { frequencies: [440, 554.37], duration: 0.3 },
            transition: { startFreq: 200, endFreq: 800, duration: 0.5 }
        }
    },
    
    // 3D Tour settings
    tour3d: {
        enabled: true,
        rooms: 4,
        roomSize: { width: 20, height: 10, depth: 20 },
        camera: {
            fov: 75,
            near: 0.1,
            far: 1000,
            startPosition: { x: 0, y: 1.6, z: 5 }
        },
        controls: {
            moveSpeed: 0.1,
            lookSpeed: 0.002,
            enableVR: true
        },
        quality: {
            shadows: true,
            antialias: true,
            pixelRatio: window.devicePixelRatio || 1
        }
    },
    
    // Gallery settings
    gallery: {
        imagesPerLoad: 12,
        lazyLoadOffset: 300,
        animationDelay: 100,
        viewModes: ['grid', 'masonry', 'carousel'],
        defaultView: 'grid',
        filters: ['all', 'nature', 'emotions', 'dreams', 'memories', 'abstract', 'portraits']
    },
    
    // Ticket system settings
    tickets: {
        types: {
            standard: { price: 150, currency: 'UAH' },
            full: { price: 250, currency: 'UAH' },
            vip: { price: 450, currency: 'UAH' },
            family: { price: 500, currency: 'UAH' },
            student: { price: 100, currency: 'UAH' }
        },
        qrCode: {
            size: 256,
            margin: 4,
            errorCorrectionLevel: 'M'
        },
        payment: {
            methods: ['card', 'paypal', 'crypto'],
            processingTime: 2500
        }
    },
    
    // API endpoints
    api: {
        baseUrl: 'https://api.innergarden.art/v1',
        endpoints: {
            artworks: '/artworks',
            messages: '/messages',
            events: '/events',
            tickets: '/tickets',
            newsletter: '/newsletter',
            support: '/support'
        },
        timeout: 10000,
        retryAttempts: 3
    },
    
    // Storage keys
    storage: {
        prefix: 'innerGarden_',
        keys: {
            language: 'language',
            theme: 'theme',
            sound: 'soundEnabled',
            accessibility: 'accessibilitySettings',
            visitCount: 'visitCount',
            lastVisit: 'lastVisit',
            favorites: 'favoriteArtworks'
        }
    },
    
    // Performance settings
    performance: {
        debounceDelay: 250,
        throttleDelay: 16,
        intersectionThreshold: 0.1,
        prefetchDelay: 500
    },
    
    // Social media links
    social: {
        instagram: 'https://instagram.com/innergarden.art',
        facebook: 'https://facebook.com/innergarden.art',
        twitter: 'https://twitter.com/innergarden_art',
        youtube: 'https://youtube.com/@innergarden'
    },
    
    // Contact information
    contact: {
        phone: '+380441234567',
        email: 'info@innergarden.art',
        address: {
            street: 'вул. Мистецька, 42',
            city: 'Київ',
            postalCode: '01001',
            country: 'Україна'
        },
        coordinates: {
            lat: 50.4501,
            lng: 30.5234
        }
    },
    
    // Exhibition details
    exhibition: {
        startDate: '2025-05-15',
        endDate: '2025-06-30',
        openingHours: {
            weekdays: '10:00 - 20:00',
            friday: '10:00 - 22:00',
            weekends: '10:00 - 20:00'
        },
        venue: 'Арт-Простір'
    },
    
    // Feature flags
    features: {
        enablePreloader: true,
        enableCustomCursor: true,
        enable3DTour: true,
        enableInteractiveWall: true,
        enableSoundEffects: true,
        enableAnalytics: true,
        enablePWA: true,
        enableWebGL: true,
        enableNotifications: true,
        enableNewsletter: true
    },
    
    // Debug settings
    debug: {
        enabled: false,
        logLevel: 'warn', // 'error', 'warn', 'info', 'debug'
        showPerformanceMetrics: false,
        showFPS: false
    }
};

// Freeze configuration to prevent modifications
export default Object.freeze(CONFIG);