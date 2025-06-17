/**
 * INNER GARDEN - Language Manager
 * @module languageManager
 */

import CONFIG from './config.js';
import TRANSLATIONS from './translations.js';
import { Storage } from './utils.js';

/**
 * Language Manager Class
 * Handles all language-related functionality
 */
export class LanguageManager {
    constructor() {
        this.currentLang = this.getStoredLanguage() || CONFIG.language.default;
        this.observers = new Set();
        this.initialized = false;
        this.init();
    }

    /**
     * Initialize language manager
     */
    init() {
        // Auto-detect language if enabled
        if (CONFIG.language.autoDetect && !this.getStoredLanguage()) {
            this.currentLang = this.detectBrowserLanguage();
        }

        // Update document language
        this.updateDocumentLanguage();

        // Bind language selector events
        this.bindLanguageSelectors();

        // Mark as initialized
        this.initialized = true;

        // Notify observers
        this.notifyObservers('init', this.currentLang);
    }

    /**
     * Get stored language from localStorage
     * @returns {string|null} Stored language code
     */
    getStoredLanguage() {
        return Storage.get(CONFIG.language.storageKey);
    }

    /**
     * Detect browser language
     * @returns {string} Detected language code
     */
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();

        // Check if browser language is supported
        if (CONFIG.language.supported.includes(langCode)) {
            return langCode;
        }

        // Check for language variants (e.g., en-US -> en)
        for (const supportedLang of CONFIG.language.supported) {
            if (browserLang.toLowerCase().startsWith(supportedLang)) {
                return supportedLang;
            }
        }

        return CONFIG.language.default;
    }

    /**
     * Set current language
     * @param {string} lang - Language code
     * @returns {boolean} Success status
     */
    setLanguage(lang) {
        if (!CONFIG.language.supported.includes(lang)) {
            console.warn(`Language "${lang}" is not supported`);
            return false;
        }

        if (lang === this.currentLang) {
            return true;
        }

        const previousLang = this.currentLang;
        this.currentLang = lang;

        // Store language preference
        Storage.set(CONFIG.language.storageKey, lang);

        // Update document
        this.updateDocumentLanguage();

        // Update all elements
        this.updateAllElements();

        // Update language selectors
        this.updateLanguageSelectors();

        // Notify observers
        this.notifyObservers('change', {
            from: previousLang,
            to: lang
        });

        return true;
    }

    /**
     * Get current language
     * @returns {string} Current language code
     */
    getCurrentLanguage() {
        return this.currentLang;
    }

    /**
     * Get supported languages
     * @returns {Array} Supported language codes
     */
    getSupportedLanguages() {
        return CONFIG.language.supported;
    }

    /**
     * Get translation by key
     * @param {string} key - Translation key
     * @param {Object} params - Parameters for interpolation
     * @param {string} fallback - Fallback text
     * @returns {string} Translated text
     */
    t(key, params = {}, fallback = null) {
        // Get translation from current language
        let translation = TRANSLATIONS[this.currentLang]?.[key];

        // Fallback to default language
        if (!translation && this.currentLang !== CONFIG.language.default) {
            translation = TRANSLATIONS[CONFIG.language.default]?.[key];
        }

        // Use fallback or key
        if (!translation) {
            translation = fallback || key;
        }

        // Interpolate parameters
        if (Object.keys(params).length > 0) {
            translation = this.interpolate(translation, params);
        }

        return translation;
    }

    /**
     * Interpolate parameters in translation
     * @param {string} text - Text with placeholders
     * @param {Object} params - Parameters
     * @returns {string} Interpolated text
     */
    interpolate(text, params) {
        return text.replace(/\{(\w+)\}/g, (match, key) => {
            return params.hasOwnProperty(key) ? params[key] : match;
        });
    }

    /**
     * Update document language attributes
     */
    updateDocumentLanguage() {
        document.documentElement.lang = this.currentLang;
        document.documentElement.setAttribute('data-lang', this.currentLang);
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = this.t('page.description');
        }

        // Update page title
        document.title = this.t('page.title');

        // Update direction for RTL languages
        const rtlLanguages = ['ar', 'he', 'fa'];
        document.documentElement.dir = rtlLanguages.includes(this.currentLang) ? 'rtl' : 'ltr';
    }

    /**
     * Update all translatable elements
     */
    updateAllElements() {
        // Update text content
        const textElements = document.querySelectorAll('[data-i18n]');
        textElements.forEach(element => this.updateElement(element));

        // Update attributes
        const attrElements = document.querySelectorAll('[data-i18n-attr]');
        attrElements.forEach(element => this.updateElementAttributes(element));

        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        // Update titles
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });

        // Update aria-labels
        const ariaElements = document.querySelectorAll('[data-i18n-aria-label]');
        ariaElements.forEach(element => {
            const key = element.getAttribute('data-i18n-aria-label');
            element.setAttribute('aria-label', this.t(key));
        });
    }

    /**
     * Update single element
     * @param {HTMLElement} element - Element to update
     */
    updateElement(element) {
        const key = element.getAttribute('data-i18n');
        if (!key) return;

        // Check for parameters
        const params = {};
        const paramElements = element.querySelectorAll('[data-i18n-param]');
        paramElements.forEach(paramEl => {
            const paramName = paramEl.getAttribute('data-i18n-param');
            params[paramName] = paramEl.textContent;
        });

        // Update content
        const translation = this.t(key, params);

        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.type === 'submit' || element.type === 'button') {
                element.value = translation;
            } else {
                element.placeholder = translation;
            }
        } else {
            // Preserve HTML structure if needed
            if (element.querySelector('[data-i18n-param]')) {
                // Update only text nodes
                const walker = document.createTreeWalker(
                    element,
                    NodeFilter.SHOW_TEXT,
                    {
                        acceptNode: (node) => {
                            return node.parentElement.hasAttribute('data-i18n-param')
                                ? NodeFilter.FILTER_REJECT
                                : NodeFilter.FILTER_ACCEPT;
                        }
                    }
                );

                let node;
                while (node = walker.nextNode()) {
                    if (node.nodeValue.trim()) {
                        node.nodeValue = translation;
                        break;
                    }
                }
            } else {
                element.textContent = translation;
            }
        }
    }

    /**
     * Update element attributes
     * @param {HTMLElement} element - Element to update
     */
    updateElementAttributes(element) {
        const attrData = element.getAttribute('data-i18n-attr');
        if (!attrData) return;

        // Parse attribute data (format: "attr1:key1,attr2:key2")
        const attrs = attrData.split(',');
        attrs.forEach(attrPair => {
            const [attr, key] = attrPair.split(':').map(s => s.trim());
            if (attr && key) {
                element.setAttribute(attr, this.t(key));
            }
        });
    }

    /**
     * Bind language selector events
     */
    bindLanguageSelectors() {
        const selectors = document.querySelectorAll('[data-language-selector]');
        selectors.forEach(selector => {
            // Remove existing listeners
            const newSelector = selector.cloneNode(true);
            selector.parentNode.replaceChild(newSelector, selector);

            // Add new listener
            newSelector.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = newSelector.getAttribute('data-lang');
                if (lang) {
                    this.setLanguage(lang);
                }
            });
        });

        // Update active states
        this.updateLanguageSelectors();
    }

    /**
     * Update language selector states
     */
    updateLanguageSelectors() {
        const selectors = document.querySelectorAll('[data-language-selector]');
        selectors.forEach(selector => {
            const lang = selector.getAttribute('data-lang');
            if (lang === this.currentLang) {
                selector.classList.add('active');
                selector.setAttribute('aria-current', 'true');
            } else {
                selector.classList.remove('active');
                selector.removeAttribute('aria-current');
            }
        });
    }

    /**
     * Add observer
     * @param {Function} callback - Observer callback
     * @returns {Function} Unsubscribe function
     */
    addObserver(callback) {
        this.observers.add(callback);
        
        // Return unsubscribe function
        return () => {
            this.observers.delete(callback);
        };
    }

    /**
     * Notify observers
     * @param {string} event - Event type
     * @param {*} data - Event data
     */
    notifyObservers(event, data) {
        this.observers.forEach(callback => {
            try {
                callback({ event, data, language: this.currentLang });
            } catch (error) {
                console.error('Language observer error:', error);
            }
        });
    }

    /**
     * Get language name in its own language
     * @param {string} langCode - Language code
     * @returns {string} Language name
     */
    getLanguageName(langCode) {
        const names = {
            uk: 'Українська',
            en: 'English',
            de: 'Deutsch',
            es: 'Español'
        };
        return names[langCode] || langCode.toUpperCase();
    }

    /**
     * Get language direction
     * @param {string} langCode - Language code
     * @returns {string} 'ltr' or 'rtl'
     */
    getLanguageDirection(langCode) {
        const rtlLanguages = ['ar', 'he', 'fa'];
        return rtlLanguages.includes(langCode) ? 'rtl' : 'ltr';
    }

    /**
     * Format number according to current language
     * @param {number} number - Number to format
     * @param {Object} options - Intl.NumberFormat options
     * @returns {string} Formatted number
     */
    formatNumber(number, options = {}) {
        const locale = this.getLocale();
        return new Intl.NumberFormat(locale, options).format(number);
    }

    /**
     * Format date according to current language
     * @param {Date|string} date - Date to format
     * @param {Object} options - Intl.DateTimeFormat options
     * @returns {string} Formatted date
     */
    formatDate(date, options = {}) {
        const locale = this.getLocale();
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return new Intl.DateTimeFormat(locale, options).format(dateObj);
    }

    /**
     * Format currency according to current language
     * @param {number} amount - Amount to format
     * @param {string} currency - Currency code
     * @returns {string} Formatted currency
     */
    formatCurrency(amount, currency = 'UAH') {
        const locale = this.getLocale();
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: currency === 'UAH' ? 0 : 2,
            maximumFractionDigits: currency === 'UAH' ? 0 : 2
        }).format(amount);
    }

    /**
     * Get locale for current language
     * @returns {string} Locale string
     */
    getLocale() {
        const locales = {
            uk: 'uk-UA',
            en: 'en-US',
            de: 'de-DE',
            es: 'es-ES'
        };
        return locales[this.currentLang] || 'en-US';
    }

    /**
     * Check if translation exists
     * @param {string} key - Translation key
     * @returns {boolean} Translation exists
     */
    hasTranslation(key) {
        return !!(TRANSLATIONS[this.currentLang]?.[key] || 
                  TRANSLATIONS[CONFIG.language.default]?.[key]);
    }

    /**
     * Get all translations for current language
     * @returns {Object} All translations
     */
    getAllTranslations() {
        return TRANSLATIONS[this.currentLang] || {};
    }

    /**
     * Create language switcher UI
     * @param {Object} options - Switcher options
     * @returns {HTMLElement} Language switcher element
     */
    createLanguageSwitcher(options = {}) {
        const {
            type = 'dropdown', // 'dropdown', 'buttons', 'flags'
            showFlags = true,
            showNames = true,
            className = 'language-switcher'
        } = options;

        const container = document.createElement('div');
        container.className = className;

        if (type === 'dropdown') {
            const select = document.createElement('select');
            select.className = 'language-select';
            select.setAttribute('aria-label', this.t('controls.changeLanguage'));

            CONFIG.language.supported.forEach(lang => {
                const option = document.createElement('option');
                option.value = lang;
                option.textContent = this.getLanguageName(lang);
                option.selected = lang === this.currentLang;
                select.appendChild(option);
            });

            select.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });

            container.appendChild(select);
        } else if (type === 'buttons' || type === 'flags') {
            const list = document.createElement('ul');
            list.className = 'language-list';

            CONFIG.language.supported.forEach(lang => {
                const item = document.createElement('li');
                const button = document.createElement('button');
                
                button.className = 'language-button';
                button.setAttribute('data-language-selector', '');
                button.setAttribute('data-lang', lang);
                button.setAttribute('aria-label', `Switch to ${this.getLanguageName(lang)}`);
                
                if (showFlags) {
                    const flag = document.createElement('span');
                    flag.className = 'language-flag';
                    flag.textContent = this.getLanguageFlag(lang);
                    button.appendChild(flag);
                }
                
                if (showNames) {
                    const name = document.createElement('span');
                    name.className = 'language-name';
                    name.textContent = this.getLanguageName(lang);
                    button.appendChild(name);
                }
                
                if (lang === this.currentLang) {
                    button.classList.add('active');
                    button.setAttribute('aria-current', 'true');
                }
                
                button.addEventListener('click', () => {
                    this.setLanguage(lang);
                });
                
                item.appendChild(button);
                list.appendChild(item);
            });

            container.appendChild(list);
        }

        return container;
    }

    /**
     * Get language flag emoji
     * @param {string} langCode - Language code
     * @returns {string} Flag emoji
     */
    getLanguageFlag(langCode) {
        const flags = {
            uk: '🇺🇦',
            en: '🇺🇸',
            de: '🇩🇪',
            es: '🇪🇸'
        };
        return flags[langCode] || '🌐';
    }
}

// Create and export singleton instance
const languageManager = new LanguageManager();

// Export both class and instance
export default languageManager;
export { languageManager };