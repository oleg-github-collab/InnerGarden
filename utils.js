/**
 * INNER GARDEN - Utility Functions
 * @module utils
 */

/**
 * Performance optimization utilities
 */
export const Performance = {
    /**
     * Throttle function execution
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Debounce function execution
     * @param {Function} func - Function to debounce
     * @param {number} delay - Delay in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, delay) {
        let debounceTimer;
        return function(...args) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Request idle callback with fallback
     * @param {Function} callback - Callback function
     * @param {Object} options - Options object
     */
    requestIdleCallback(callback, options = {}) {
        if ('requestIdleCallback' in window) {
            return window.requestIdleCallback(callback, options);
        }
        return setTimeout(callback, 1);
    }
};

/**
 * Math and calculation utilities
 */
export const MathUtils = {
    /**
     * Get random float between min and max
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random float
     */
    getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * Get random integer between min and max (inclusive)
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random integer
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Linear interpolation
     * @param {number} start - Start value
     * @param {number} end - End value
     * @param {number} factor - Interpolation factor (0-1)
     * @returns {number} Interpolated value
     */
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    },

    /**
     * Clamp value between min and max
     * @param {number} value - Value to clamp
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Clamped value
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    /**
     * Calculate distance between two points
     * @param {number} x1 - First point X
     * @param {number} y1 - First point Y
     * @param {number} x2 - Second point X
     * @param {number} y2 - Second point Y
     * @returns {number} Distance
     */
    distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    },

    /**
     * Convert degrees to radians
     * @param {number} degrees - Degrees value
     * @returns {number} Radians value
     */
    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    },

    /**
     * Convert radians to degrees
     * @param {number} radians - Radians value
     * @returns {number} Degrees value
     */
    radiansToDegrees(radians) {
        return radians * (180 / Math.PI);
    }
};

/**
 * Easing functions for animations
 */
export const Easing = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInQuart: t => t * t * t * t,
    easeOutQuart: t => 1 - (--t) * t * t * t,
    easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
    easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeInOutExpo: t => {
        if (t === 0) return 0;
        if (t === 1) return 1;
        if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2;
        return (2 - Math.pow(2, -20 * t + 10)) / 2;
    },
    easeInElastic: t => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
    },
    easeOutElastic: t => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    },
    easeOutBounce: t => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) return n1 * t * t;
        if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
        if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
};

/**
 * DOM manipulation utilities
 */
export const DOM = {
    /**
     * Create element with attributes and content
     * @param {string} tag - HTML tag name
     * @param {Object} attributes - Element attributes
     * @param {string|HTMLElement|Array} content - Element content
     * @returns {HTMLElement} Created element
     */
    createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else if (key === 'style' && typeof value === 'object') {
                Object.entries(value).forEach(([styleKey, styleValue]) => {
                    element.style[styleKey] = styleValue;
                });
            } else if (key.startsWith('on')) {
                element.addEventListener(key.slice(2).toLowerCase(), value);
            } else {
                element.setAttribute(key, value);
            }
        });
        
        if (Array.isArray(content)) {
            content.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else {
                    element.appendChild(child);
                }
            });
        } else if (typeof content === 'string') {
            element.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            element.appendChild(content);
        }
        
        return element;
    },

    /**
     * Query selector with error handling
     * @param {string} selector - CSS selector
     * @param {HTMLElement} parent - Parent element
     * @returns {HTMLElement|null} Found element
     */
    $(selector, parent = document) {
        return parent.querySelector(selector);
    },

    /**
     * Query selector all with error handling
     * @param {string} selector - CSS selector
     * @param {HTMLElement} parent - Parent element
     * @returns {NodeList} Found elements
     */
    $$(selector, parent = document) {
        return parent.querySelectorAll(selector);
    },

    /**
     * Add event listener with delegation support
     * @param {HTMLElement} element - Target element
     * @param {string} event - Event type
     * @param {string} selector - Delegated selector (optional)
     * @param {Function} handler - Event handler
     */
    on(element, event, selector, handler) {
        if (typeof selector === 'function') {
            handler = selector;
            element.addEventListener(event, handler);
        } else {
            element.addEventListener(event, e => {
                const target = e.target.closest(selector);
                if (target && element.contains(target)) {
                    handler.call(target, e);
                }
            });
        }
    },

    /**
     * Remove element from DOM
     * @param {HTMLElement} element - Element to remove
     */
    remove(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    },

    /**
     * Empty element content
     * @param {HTMLElement} element - Element to empty
     */
    empty(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    },

    /**
     * Check if element is in viewport
     * @param {HTMLElement} element - Element to check
     * @param {number} offset - Offset in pixels
     * @returns {boolean} Is in viewport
     */
    isInViewport(element, offset = 0) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight + offset &&
            rect.bottom >= -offset &&
            rect.left <= window.innerWidth + offset &&
            rect.right >= -offset
        );
    }
};

/**
 * String manipulation utilities
 */
export const StringUtils = {
    /**
     * Generate unique ID
     * @param {string} prefix - ID prefix
     * @returns {string} Unique ID
     */
    generateId(prefix = 'id') {
        return `${prefix}_${Math.random().toString(36).substr(2, 9)}_${Date.now().toString(36)}`;
    },

    /**
     * Capitalize first letter
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Truncate string with ellipsis
     * @param {string} str - String to truncate
     * @param {number} length - Maximum length
     * @param {string} suffix - Suffix to add
     * @returns {string} Truncated string
     */
    truncate(str, length, suffix = '...') {
        if (str.length <= length) return str;
        return str.substring(0, length - suffix.length) + suffix;
    },

    /**
     * Convert string to slug
     * @param {string} str - String to convert
     * @returns {string} Slug string
     */
    slugify(str) {
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    /**
     * Parse template string with data
     * @param {string} template - Template string
     * @param {Object} data - Data object
     * @returns {string} Parsed string
     */
    parseTemplate(template, data) {
        return template.replace(/\${(\w+)}/g, (match, key) => {
            return data.hasOwnProperty(key) ? data[key] : match;
        });
    }
};

/**
 * Date and time utilities
 */
export const DateUtils = {
    /**
     * Format date
     * @param {Date|string} date - Date to format
     * @param {string} locale - Locale string
     * @param {Object} options - Intl options
     * @returns {string} Formatted date
     */
    formatDate(date, locale = 'uk-UA', options = {}) {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return new Intl.DateTimeFormat(locale, options).format(dateObj);
    },

    /**
     * Get relative time
     * @param {Date|string} date - Date to compare
     * @param {string} locale - Locale string
     * @returns {string} Relative time string
     */
    getRelativeTime(date, locale = 'uk-UA') {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const now = new Date();
        const diff = now - dateObj;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days}д`;
        if (hours > 0) return `${hours}г`;
        if (minutes > 0) return `${minutes}хв`;
        return 'зараз';
    },

    /**
     * Check if date is today
     * @param {Date|string} date - Date to check
     * @returns {boolean} Is today
     */
    isToday(date) {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const today = new Date();
        return dateObj.toDateString() === today.toDateString();
    },

    /**
     * Add days to date
     * @param {Date|string} date - Base date
     * @param {number} days - Days to add
     * @returns {Date} New date
     */
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
};

/**
 * Number formatting utilities
 */
export const NumberUtils = {
    /**
     * Format number with locale
     * @param {number} num - Number to format
     * @param {string} locale - Locale string
     * @param {Object} options - Intl options
     * @returns {string} Formatted number
     */
    formatNumber(num, locale = 'uk-UA', options = {}) {
        return new Intl.NumberFormat(locale, options).format(num);
    },

    /**
     * Format currency
     * @param {number} amount - Amount to format
     * @param {string} currency - Currency code
     * @param {string} locale - Locale string
     * @returns {string} Formatted currency
     */
    formatCurrency(amount, currency = 'UAH', locale = 'uk-UA') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },

    /**
     * Format percentage
     * @param {number} value - Value to format (0-1)
     * @param {number} decimals - Number of decimals
     * @returns {string} Formatted percentage
     */
    formatPercentage(value, decimals = 0) {
        return `${(value * 100).toFixed(decimals)}%`;
    }
};

/**
 * Device and browser detection
 */
export const Device = {
    /**
     * Check if mobile device
     * @returns {boolean} Is mobile
     */
    isMobile() {
        return window.innerWidth <= 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    /**
     * Check if touch device
     * @returns {boolean} Has touch
     */
    isTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    /**
     * Check if Safari browser
     * @returns {boolean} Is Safari
     */
    isSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    },

    /**
     * Check if iOS device
     * @returns {boolean} Is iOS
     */
    isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    },

    /**
     * Get browser info
     * @returns {Object} Browser information
     */
    getBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        let version = '0';

        if (ua.indexOf('Firefox') > -1) {
            browser = 'Firefox';
            version = ua.match(/Firefox\/([0-9]+)/)[1];
        } else if (ua.indexOf('Chrome') > -1) {
            browser = 'Chrome';
            version = ua.match(/Chrome\/([0-9]+)/)[1];
        } else if (ua.indexOf('Safari') > -1) {
            browser = 'Safari';
            version = ua.match(/Version\/([0-9]+)/)[1];
        }

        return { browser, version: parseInt(version), userAgent: ua };
    }
};

/**
 * Storage utilities with error handling
 */
export const Storage = {
    /**
     * Get item from localStorage
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if not found
     * @returns {*} Stored value or default
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    },

    /**
     * Set item in localStorage
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     * @returns {boolean} Success status
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage set error:', error);
            return false;
        }
    },

    /**
     * Remove item from localStorage
     * @param {string} key - Storage key
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Storage remove error:', error);
        }
    },

    /**
     * Clear all localStorage
     */
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Storage clear error:', error);
        }
    }
};

/**
 * Animation utilities
 */
export const Animation = {
    /**
     * Animate value with RAF
     * @param {number} from - Start value
     * @param {number} to - End value
     * @param {number} duration - Duration in ms
     * @param {Function} callback - Value update callback
     * @param {Function} easing - Easing function
     * @returns {Function} Cancel function
     */
    animate(from, to, duration, callback, easing = Easing.easeInOutCubic) {
        const startTime = performance.now();
        let cancelled = false;

        const update = (currentTime) => {
            if (cancelled) return;

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easing(progress);
            const currentValue = from + (to - from) * easedProgress;

            callback(currentValue, progress);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);

        return () => { cancelled = true; };
    },

    /**
     * Create spring animation
     * @param {Object} options - Spring options
     * @returns {Object} Spring animator
     */
    spring(options = {}) {
        const {
            stiffness = 100,
            damping = 10,
            mass = 1,
            initialVelocity = 0
        } = options;

        return {
            stiffness,
            damping,
            mass,
            initialVelocity,
            
            animate(from, to, callback) {
                let position = from;
                let velocity = this.initialVelocity;
                let lastTime = performance.now();
                let cancelled = false;

                const update = (currentTime) => {
                    if (cancelled) return;

                    const deltaTime = (currentTime - lastTime) / 1000;
                    lastTime = currentTime;

                    const springForce = -this.stiffness * (position - to);
                    const dampingForce = -this.damping * velocity;
                    const acceleration = (springForce + dampingForce) / this.mass;

                    velocity += acceleration * deltaTime;
                    position += velocity * deltaTime;

                    callback(position, velocity);

                    if (Math.abs(velocity) > 0.01 || Math.abs(position - to) > 0.01) {
                        requestAnimationFrame(update);
                    } else {
                        callback(to, 0);
                    }
                };

                requestAnimationFrame(update);

                return () => { cancelled = true; };
            }
        };
    }
};

/**
 * URL utilities
 */
export const URL = {
    /**
     * Get URL parameters
     * @returns {Object} URL parameters
     */
    getParams() {
        const params = {};
        const searchParams = new URLSearchParams(window.location.search);
        for (const [key, value] of searchParams) {
            params[key] = value;
        }
        return params;
    },

    /**
     * Update URL parameter
     * @param {string} key - Parameter key
     * @param {string} value - Parameter value
     */
    updateParam(key, value) {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    },

    /**
     * Remove URL parameter
     * @param {string} key - Parameter key
     */
    removeParam(key) {
        const url = new URL(window.location);
        url.searchParams.delete(key);
        window.history.pushState({}, '', url);
    }
};

/**
 * Validation utilities
 */
export const Validation = {
    /**
     * Validate email
     * @param {string} email - Email to validate
     * @returns {boolean} Is valid
     */
    isEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Validate phone number
     * @param {string} phone - Phone to validate
     * @returns {boolean} Is valid
     */
    isPhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    },

    /**
     * Validate URL
     * @param {string} url - URL to validate
     * @returns {boolean} Is valid
     */
    isURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
};

/**
 * Image utilities
 */
export const ImageUtils = {
    /**
     * Preload images
     * @param {Array<string>} urls - Image URLs
     * @returns {Promise} Load promise
     */
    preload(urls) {
        const promises = urls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = url;
            });
        });
        return Promise.all(promises);
    },

    /**
     * Lazy load images
     * @param {string} selector - Image selector
     * @param {Object} options - Intersection observer options
     */
    lazyLoad(selector = 'img[data-src]', options = {}) {
        const images = document.querySelectorAll(selector);
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01,
            ...options
        });

        images.forEach(img => imageObserver.observe(img));
    }
};

// Export all utilities as default
export default {
    Performance,
    MathUtils,
    Easing,
    DOM,
    StringUtils,
    DateUtils,
    NumberUtils,
    Device,
    Storage,
    Animation,
    URL,
    Validation,
    ImageUtils
};