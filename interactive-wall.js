/**
 * interactive-wall.js
 * Interactive wall with messages and particle effects
 */

import Utils from './utils.js'; // Utils - це об'єкт, що містить Performance, MathUtils, DOM і т.д.
import { CONFIG } from './config.js';
import SoundManager from './sound-manager.js'; // Імпортуємо екземпляр SoundManager

export class AdvancedInteractiveWall {
    constructor(container) {
        this.container = container; // Контейнер для стіни, передається ззовні
        this.messages = [];
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.floatAnimationRefs = []; // Для зберігання requestAnimationFrame ID для float анімацій
        this.interactions = [];
        this.filters = {
            current: 'all',
            available: CONFIG.wall?.filtersAvailable || ['all', 'joyful', 'peaceful', 'inspired', 'contemplative', 'energetic', 'romantic']
        };
        this.animations = {
            current: 'float',
            available: CONFIG.wall?.animationsAvailable || ['float', 'scatter', 'cluster', /*'flow', 'spiral', 'wave',*/ 'explode'] // Flow, spiral, wave потребують доопрацювання для зупинки
        };
        this.isAnimatingSpecial = false; // Прапорець для спеціальних анімацій (не float)
        this.soundEnabled = SoundManager ? SoundManager.isEnabled() : true; // Синхронізація з SoundManager
        this.init();
    }

    init() {
        if (!this.container) {
            console.error('InteractiveWall: Container element not provided or not found.');
            return;
        }
        this.createCanvas();
        this.createUI();
        // ВИПРАВЛЕНО: викликаємо конкретні методи прив'язки подій
        this.bindControlEvents();
        this.bindFormEvents();
        this.generateSampleMessages();
        this.startAnimationLoops(); // Перейменовано для ясності
        this.createAmbientParticles();
    }

    createCanvas() {
        this.canvas = Utils.DOM.createElement('canvas', { className: 'wall-canvas' });
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();

        window.addEventListener('resize', Utils.Performance.debounce(() => {
            this.resizeCanvas();
        }, 250));
    }

    resizeCanvas() {
        if (!this.container || !this.canvas) return;
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    createUI() {
        const controlsContainer = Utils.DOM.$('.wall-controls-container', this.container) || this.container;

        if (!Utils.DOM.$('.wall-controls', controlsContainer)) {
            controlsContainer.appendChild(this.createControlsElement());
        }
        if (!Utils.DOM.$('.advanced-message-form', controlsContainer)) {
            controlsContainer.appendChild(this.createMessageFormElement());
        }
    }

    createControlsElement() {
        const lm = window.languageManager;
        const controls = Utils.DOM.createElement('div', { className: 'wall-controls' });
        const filtersHTML = this.filters.available.map(filter => `
            <button class="wall-filter ${filter === 'all' ? 'active' : ''}"
                    data-filter="${filter}"
                    data-translate="wall.filter.${filter}">
                ${lm ? lm.t(`wall.filter.${filter}`, filter.charAt(0).toUpperCase() + filter.slice(1)) : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
        `).join('');

        const animationsHTML = this.animations.available.map(anim => `
            <button class="wall-anim-btn"
                    data-animation="${anim}"
                    data-translate="wall.anim.${anim}">
                ${lm ? lm.t(`wall.anim.${anim}`, anim.charAt(0).toUpperCase() + anim.slice(1)) : anim.charAt(0).toUpperCase() + anim.slice(1)}
            </button>
        `).join('');

        controls.innerHTML = `
            <div class="wall-filters">${filtersHTML}</div>
            <div class="wall-animations">${animationsHTML}</div>
            <div class="wall-settings">
                <button class="sound-toggle" data-translate="wall.settings.sound">${lm ? lm.t('wall.settings.sound', 'Sound') : 'Sound'}</button>
                <button class="clear-wall" data-translate="wall.settings.clear">${lm ? lm.t('wall.settings.clear', 'Clear') : 'Clear'}</button>
            </div>
        `;
        return controls;
    }

    createMessageFormElement() {
        const lm = window.languageManager;
        const formContainer = Utils.DOM.createElement('div', { className: 'advanced-message-form' });
        formContainer.innerHTML = `
            <form class="message-form">
                <h3 data-translate="wall.form.leaveMessage">${lm ? lm.t('wall.form.leaveMessage', 'Leave Your Message') : 'Leave Your Message'}</h3>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text"
                               id="wall-message-name"
                               name="wall-message-name"
                               placeholder="${lm ? lm.t('wall.form.yourNamePlaceholder', 'Your Name (Optional)') : 'Your Name (Optional)'}"
                               data-translate-placeholder="wall.form.yourNamePlaceholder">
                    </div>
                    <div class="form-group">
                        <select id="wall-message-mood" name="wall-message-mood">
                            <option value="" data-translate="wall.form.selectMoodPlaceholder">${lm ? lm.t('wall.form.selectMoodPlaceholder', 'Select Mood') : 'Select Mood'}</option>
                            ${this.filters.available.filter(f => f !== 'all').map(mood => `
                                <option value="${mood}" data-translate="wall.filter.${mood}">
                                    ${lm ? lm.t(`wall.filter.${mood}`, mood.charAt(0).toUpperCase() + mood.slice(1)) : mood.charAt(0).toUpperCase() + mood.slice(1)}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <textarea id="wall-message-text"
                              name="wall-message-text"
                              rows="3"
                              maxlength="200"
                              placeholder="${lm ? lm.t('wall.form.shareFeelingsPlaceholder', 'Share your feelings, thoughts, or dreams...') : 'Share your feelings, thoughts, or dreams...'}"
                              data-translate-placeholder="wall.form.shareFeelingsPlaceholder"></textarea>
                    <div class="char-counter">200 <span data-translate="wall.form.charsLeft">${lm ? lm.t('wall.form.charsLeft', 'characters left') : 'characters left'}</span></div>
                </div>
                <div class="form-actions">
                    <button type="button" class="preview-btn" data-translate="wall.form.preview">${lm ? lm.t('wall.form.preview', 'Preview') : 'Preview'}</button>
                    <button type="submit" class="submit-btn" data-translate="wall.form.addToWall">${lm ? lm.t('wall.form.addToWall', 'Add to Wall') : 'Add to Wall'}</button>
                </div>
            </form>
            <div class="message-preview hidden">
                <div class="preview-message-content"></div>
                <div class="preview-actions">
                    <button class="edit-btn" data-translate="wall.form.edit">${lm ? lm.t('wall.form.edit', 'Edit') : 'Edit'}</button>
                    <button class="confirm-btn" data-translate="wall.form.confirm">${lm ? lm.t('wall.form.confirm', 'Confirm & Add') : 'Confirm & Add'}</button>
                </div>
            </div>
        `;
        return formContainer;
    }


    bindControlEvents() {
        if (!this.container) return;
        Utils.DOM.on(this.container, 'click', '.wall-filter', (e) => {
            const filter = e.target.dataset.filter;
            if (filter) {
                this.setFilter(filter);
                this.updateActiveFilter(e.target);
                if (SoundManager && typeof SoundManager.play === 'function') SoundManager.play('click');
            }
        });

        Utils.DOM.on(this.container, 'click', '.wall-anim-btn', (e) => {
            const animation = e.target.dataset.animation;
            if (animation) {
                this.playAnimation(animation);
                if (SoundManager && typeof SoundManager.play === 'function') SoundManager.play('whoosh');
            }
        });

        const soundToggle = Utils.DOM.$('.sound-toggle', this.container);
        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                this.soundEnabled = SoundManager ? SoundManager.toggle() : !this.soundEnabled;
                soundToggle.classList.toggle('disabled', !this.soundEnabled);
                soundToggle.setAttribute('aria-pressed', this.soundEnabled.toString());
                if (SoundManager && typeof SoundManager.play === 'function' && this.soundEnabled) SoundManager.play('click');
            });
            soundToggle.classList.toggle('disabled', !this.soundEnabled);
            soundToggle.setAttribute('aria-pressed', this.soundEnabled.toString());
        }

        const clearBtn = Utils.DOM.$('.clear-wall', this.container);
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearWall();
                if (SoundManager && typeof SoundManager.play === 'function') SoundManager.play('error');
            });
        }
    }

    bindFormEvents() {
        if (!this.container) return;
        const form = Utils.DOM.$('.message-form', this.container);
        const textarea = Utils.DOM.$('#wall-message-text', this.container);
        const charCounter = Utils.DOM.$('.char-counter', this.container);
        const previewBtn = Utils.DOM.$('.preview-btn', this.container);
        const editBtn = Utils.DOM.$('.edit-btn', this.container);
        const confirmBtn = Utils.DOM.$('.confirm-btn', this.container);

        if (textarea && charCounter) {
            textarea.addEventListener('input', () => {
                const maxLength = parseInt(textarea.getAttribute('maxlength') || '200');
                const remaining = maxLength - textarea.value.length;
                const lm = window.languageManager;
                charCounter.innerHTML = `${remaining} <span data-translate="wall.form.charsLeft">${lm ? lm.t('wall.form.charsLeft', 'characters left') : 'characters left'}</span>`;
                charCounter.style.color = remaining < 20 ? (CONFIG.colors?.error || '#e74c3c') : '';
            });
        }

        if (previewBtn) {
            previewBtn.addEventListener('click', () => {
                if (SoundManager && typeof SoundManager.play === 'function') SoundManager.play('click');
                const formData = this.getFormData();
                if (this.validateForm(formData)) {
                    this.previewData = formData; // Зберігаємо дані для підтвердження
                    this.showPreview(formData);
                }
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = this.getFormData();
                if (this.validateForm(formData)) {
                    this.previewData = formData;
                    this.showPreview(formData);
                }
            });
        }

        if (editBtn) {
            editBtn.addEventListener('click', () => {
                if (SoundManager && typeof SoundManager.play === 'function') SoundManager.play('click');
                this.hidePreview();
            });
        }

        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                if (this.previewData) { // Використовуємо збережені дані з прев'ю
                    this.addMessageToWall(this.previewData);
                    this.previewData = null; // Очищуємо після використання
                } else {
                    // Якщо previewData немає, можна спробувати взяти з форми, але це нештатна ситуація
                    console.warn("No preview data to confirm. Please preview first.");
                    this.addMessageToWall(this.getFormData()); // Як fallback
                }
            });
        }
    }

    showPreview(formData) { // formData передається для відображення
        const previewContainer = Utils.DOM.$('.message-preview', this.container);
        const previewMessageEl = Utils.DOM.$('.preview-message-content', previewContainer); // Змінено селектор
        const formEl = Utils.DOM.$('.message-form', this.container);

        if (!previewContainer || !previewMessageEl || !formEl) {
            console.error('Preview elements or form not found');
            return;
        }

        previewMessageEl.innerHTML = this.createMessageHTML(formData, true);
        previewContainer.classList.remove('hidden');
        formEl.classList.add('hidden'); // Ховаємо форму
    }

    hidePreview() {
        const previewContainer = Utils.DOM.$('.message-preview', this.container);
        const formEl = Utils.DOM.$('.message-form', this.container);

        if (previewContainer) previewContainer.classList.add('hidden');
        if (formEl) formEl.classList.remove('hidden'); // Показуємо форму
    }

    getFormData() {
        const nameInput = Utils.DOM.$('#wall-message-name', this.container);
        const moodSelect = Utils.DOM.$('#wall-message-mood', this.container);
        const textTextarea = Utils.DOM.$('#wall-message-text', this.container);
        const lm = window.languageManager;

        return {
            name: nameInput ? nameInput.value.trim() || (lm?.t('anonymous', 'Anonymous') || 'Anonymous') : (lm?.t('anonymous', 'Anonymous') || 'Anonymous'),
            mood: moodSelect ? moodSelect.value || 'joyful' : 'joyful', // joyful як дефолтний настрій
            text: textTextarea ? textTextarea.value.trim() : '',
            timestamp: Date.now(),
            id: Utils.StringUtils.generateId('msg')
        };
    }

    validateForm(data) {
        const lm = window.languageManager;
        if (!data.text) {
            this.showNotification(lm ? lm.t('wall.validation.textRequired', 'Message text cannot be empty.') : 'Message text cannot be empty.', 'error');
            return false;
        }
        const maxLength = Utils.DOM.$('#wall-message-text', this.container)?.maxLength || 200;
        if (data.text.length > maxLength) {
            this.showNotification(lm ? lm.t('wall.validation.textTooLong', `Message is too long (max ${maxLength} characters).`) : `Message is too long (max ${maxLength} characters).`, 'error');
            return false;
        }
        if (!data.mood) { // moodSelect.value може бути порожнім рядком, якщо не обрано
            this.showNotification(lm ? lm.t('wall.validation.moodRequired', 'Please select a mood for your message.') : 'Please select a mood for yourmessage.', 'error');
            return false;
        }
        return true;
    }

    addMessageToWall(formData) {
        this.createMessage(formData);
        this.resetForm();
        this.hidePreview();

        if (SoundManager && typeof SoundManager.play === 'function') SoundManager.play('success');
        const lm = window.languageManager;
        this.showNotification(
            lm ? lm.t('wall.notify.messageAdded', 'Your message has been added to the wall!') : 'Your message has been added to the wall!',
            'success'
        );
    }

    createMessage(data) {
        const message = {
            ...data,
            x: Utils.MathUtils.getRandomFloat(10, 90),
            y: Utils.MathUtils.getRandomFloat(20, 80),
            vx: Utils.MathUtils.getRandomFloat(-0.15, 0.15), // Зменшено для плавності
            vy: Utils.MathUtils.getRandomFloat(-0.15, 0.15),
            targetX: Utils.MathUtils.getRandomFloat(10, 90), // Для більш складного руху
            targetY: Utils.MathUtils.getRandomFloat(20, 80),
            scale: 1,
            rotation: 0,
            opacity: 0,
            element: null,
            updateCount: 0 // Лічильник для зміни цілі
        };

        message.element = this.createMessageElement(message);
        // Додаємо в спеціальний контейнер для повідомлень, якщо він є, або в головний
        const messagesContainer = Utils.DOM.$('.wall-messages-area', this.container) || this.container;
        messagesContainer.appendChild(message.element);
        this.messages.push(message);

        this.animateMessageIn(message);

        if (this.messages.length > (CONFIG.wall?.maxMessages || 30)) {
            this.removeOldestMessage();
        }
    }

    createMessageElement(message) {
        const element = Utils.DOM.createElement('div', {
            className: `wall-message ${message.mood}`, // Клас для стилізації настрою
            style: {
                position: 'absolute',
                left: `${message.x}%`,
                top: `${message.y}%`,
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: '0',
                cursor: 'pointer',
                zIndex: '10',
                transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            },
            dataset: { messageId: message.id }
        });
        element.innerHTML = this.createMessageHTML(message);

        Utils.DOM.on(element, 'click', () => this.interactWithMessage(message));
        Utils.DOM.on(element, 'mouseenter', () => {
            this.highlightMessage(message);
            if (SoundManager && typeof SoundManager.play === 'function') SoundManager.play('hover');
        });
        Utils.DOM.on(element, 'mouseleave', () => this.unhighlightMessage(message));
        return element;
    }

    createMessageHTML(message, isPreview = false) {
        const moodEmojis = CONFIG.wall?.moodEmojis || {
            joyful: '😊', peaceful: '😌', inspired: '✨', contemplative: '🤔',
            energetic: '⚡', romantic: '❤️', default: '💬'
        };
        const lm = window.languageManager;
        // Припускаємо, що Utils.DOM.escapeHTML існує
        const escape = Utils.DOM.escapeHTML || (str => str); // Fallback

        return `
            <div class="message-content ${isPreview ? 'preview-mode' : ''}">
                <div class="message-mood-icon">${moodEmojis[message.mood] || moodEmojis.default}</div>
                <p class="message-text">"${escape(message.text)}"</p>
                <span class="message-author">— ${escape(message.name)}</span>
                ${!isPreview ? `<div class="message-time">${this.formatTime(message.timestamp)}</div>` : ''}
            </div>
        `;
    }

    formatTime(timestamp) {
        return Utils.DateUtils.getRelativeTime(timestamp, window.languageManager?.getCurrentLanguage() || 'en-US');
    }

    animateMessageIn(message) {
        if (!message.element) return;
        requestAnimationFrame(() => { // Забезпечує, що елемент вже в DOM
            requestAnimationFrame(() => { // Забезпечує, що браузер готовий до transition
                message.element.style.opacity = '1';
                message.element.style.transform = 'translate(-50%, -50%) scale(1)';
                message.opacity = 1;
                message.scale = 1;
            });
        });
    }

    interactWithMessage(message) {
        this.createInteractionEffect(message);
        this.createParticleBurst(message.x, message.y, message.mood);
        if (SoundManager && typeof SoundManager.play === 'function') SoundManager.play('magic');
    }

    highlightMessage(message) {
        if (!message.element) return;
        message.element.style.transform = 'translate(-50%, -50%) scale(1.1)';
        message.element.style.zIndex = '20'; // Вище за інші
    }

    unhighlightMessage(message) {
        if (!message.element) return;
        message.element.style.transform = 'translate(-50%, -50%) scale(1)';
        message.element.style.zIndex = '10';
    }

    createInteractionEffect(message) {
        this.interactions.push({
            x: message.x, y: message.y, radius: 0,
            maxRadius: CONFIG.wall?.interactionEffectMaxRadius || 50,
            opacity: 1, color: this.getMoodColor(message.mood)
        });
    }

    getMoodColor(mood) {
        const colors = CONFIG.wall?.moodColors || {
            joyful: '#f1c40f', peaceful: '#3498db', inspired: '#9b59b6',
            contemplative: '#1abc9c', energetic: '#e67e22', romantic: '#e91e63', default: '#7f8c8d'
        };
        return colors[mood] || colors.default;
    }

    createParticleBurst(xPercent, yPercent, mood) {
        if (!this.canvas) return;
        const count = CONFIG.wall?.particleBurstCount || 15;
        const color = this.getMoodColor(mood);
        const burstX = (xPercent / 100) * this.canvas.width;
        const burstY = (yPercent / 100) * this.canvas.height;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Utils.MathUtils.getRandomFloat(1, 4);
            this.particles.push({
                x: burstX, y: burstY,
                vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
                life: 1, decay: Utils.MathUtils.getRandomFloat(0.015, 0.03),
                size: Utils.MathUtils.getRandomFloat(1.5, 3.5), color
            });
        }
    }

    setFilter(filter) {
        this.filters.current = filter;
        this.applyFilter();
    }

    applyFilter() {
        this.messages.forEach(message => {
            if (!message.element) return;
            const show = this.filters.current === 'all' || message.mood === this.filters.current;
            message.element.style.opacity = show ? '1' : '0.2';
            message.element.style.pointerEvents = show ? 'auto' : 'none';
            // Можна додати анімацію зміни масштабу для відфільтрованих
            message.element.style.transform = `translate(-50%, -50%) scale(${show ? 1 : 0.8})`;
        });
    }

    updateActiveFilter(activeBtn) {
        if (!this.container) return;
        Utils.DOM.$$('.wall-filter', this.container).forEach(btn => btn.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
    }

    playAnimation(animationType) {
        if (this.isAnimatingSpecial && animationType !== 'float') return;

        this.isAnimatingSpecial = (animationType !== 'float');
        this.animations.current = animationType;
        this.clearMessageAnimationTimeouts(); // Зупинити таймаути попередніх анімацій

        switch (animationType) {
            case 'scatter': this.scatterAnimation(); break;
            case 'cluster': this.clusterAnimation(); break;
            case 'explode': this.explodeAnimation(); break;
            // 'flow', 'spiral', 'wave' потребують більш ретельного управління циклами requestAnimationFrame
            default:
                this.isAnimatingSpecial = false; // Float не є "спеціальною" анімацією
                this.startFloatAnimationForAllMessages(); // Перезапускаємо float
                break;
        }

        if (this.isAnimatingSpecial) {
            this.animationTimeoutId = setTimeout(() => {
                this.isAnimatingSpecial = false;
                this.animations.current = 'float';
                this.startFloatAnimationForAllMessages();
            }, CONFIG.wall?.animationDuration || 3000);
        }
    }
    
    clearMessageAnimationTimeouts() {
        if (this.animationTimeoutId) {
            clearTimeout(this.animationTimeoutId);
            this.animationTimeoutId = null;
        }
        // Також потрібно зупиняти активні requestAnimationFrame цикли, якщо вони є
        // для flow, spiral, wave. Це складніше і потребує зберігання їх ID.
        // Для float анімації, ми зупиняємо їх індивідуально.
        this.stopAllMessageFloatAnimations();
    }
    
    stopAllMessageFloatAnimations() {
        this.floatAnimationRefs.forEach(cancelAnimationFrame);
        this.floatAnimationRefs = [];
    }

    startFloatAnimationForAllMessages() {
        this.stopAllMessageFloatAnimations(); // Зупинити попередні float, якщо є
        this.animations.current = 'float'; // Переконатися, що поточна анімація - float
        this.messages.forEach(message => this.animateMessageFloat(message));
    }


    scatterAnimation() {
        this.messages.forEach((message, index) => {
            if (!message.element) return;
            this.animationTimeoutId = setTimeout(() => { // Зберігаємо ID таймаута
                const newX = Utils.MathUtils.getRandomFloat(5, 95);
                const newY = Utils.MathUtils.getRandomFloat(15, 85);
                const rotation = Utils.MathUtils.getRandomFloat(-15, 15);
                message.element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                message.element.style.left = `${newX}%`;
                message.element.style.top = `${newY}%`;
                message.element.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
                message.x = newX; message.y = newY; message.rotation = rotation;
                message.targetX = newX; message.targetY = newY; // Оновлюємо ціль для float
            }, index * (CONFIG.wall?.staggerDelay || 80));
        });
    }

    clusterAnimation() {
        if (!this.canvas) return;
        const centerX = 50;
        const centerY = 50;
        const baseRadius = Math.min(this.canvas.width, this.canvas.height) * 0.15;

        this.messages.forEach((message, index) => {
            if (!message.element) return;
            const angle = (Utils.MathUtils.getRandomFloat(0, Math.PI * 2)); // Випадковий кут для природності
            const radius = baseRadius + Utils.MathUtils.getRandomFloat(-5, 5) * (this.messages.length / 10); // Змінюємо радіус
            const x = centerX + Math.cos(angle) * (radius / this.canvas.width * 100);
            const y = centerY + Math.sin(angle) * (radius / this.canvas.height * 100);

            this.animationTimeoutId = setTimeout(() => {
                message.element.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                message.element.style.left = `${x}%`;
                message.element.style.top = `${y}%`;
                message.element.style.transform = 'translate(-50%, -50%) scale(0.9)';
                message.x = x; message.y = y;
                message.targetX = x; message.targetY = y;
            }, index * (CONFIG.wall?.staggerDelay || 120));
        });
    }
    
    explodeAnimation() {
        const centerX = 50; const centerY = 50;
        this.messages.forEach((message) => {
            if (!message.element) return;
            message.element.style.transition = 'all 0.4s ease-in';
            message.element.style.left = `${centerX}%`; message.element.style.top = `${centerY}%`;
            message.element.style.transform = 'translate(-50%, -50%) scale(0.05)';
            message.element.style.opacity = '0.3';

            this.animationTimeoutId = setTimeout(() => {
                if (!message.element) return;
                const angle = Math.random() * Math.PI * 2;
                const distance = Utils.MathUtils.getRandomFloat(25, 55); // %
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                const rotation = Utils.MathUtils.getRandomFloat(-270, 270);
                message.element.style.transition = 'all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                message.element.style.left = `${x}%`; message.element.style.top = `${y}%`;
                message.element.style.transform = `translate(-50%, -50%) scale(1) rotate(${rotation}deg)`;
                message.element.style.opacity = '1';
                message.x = x; message.y = y; message.rotation = rotation;
                message.targetX = x; message.targetY = y;
            }, 400 + Math.random() * 150);
        });
    }

    animateMessageFloat(message) { // Цей метод тепер анімує ОДНЕ повідомлення
        if (!message.element || this.animations.current !== 'float' || this.isAnimatingSpecial) {
            // Зупиняємо анімацію для цього повідомлення, якщо умови не виконуються
            const index = this.floatAnimationRefs.findIndex(ref => ref.messageId === message.id);
            if (index > -1) {
                cancelAnimationFrame(this.floatAnimationRefs[index].id);
                this.floatAnimationRefs.splice(index, 1);
            }
            return;
        }
        
        // Оновлення цілі руху час від часу
        message.updateCount = (message.updateCount || 0) + 1;
        if (message.updateCount > (CONFIG.wall?.floatTargetUpdateInterval || 200)) { // кожні ~3-4 секунди
            message.targetX = Utils.MathUtils.getRandomFloat(10, 90);
            message.targetY = Utils.MathUtils.getRandomFloat(20, 80);
            message.updateCount = 0;
        }

        // Рух до цілі
        const dx = message.targetX - message.x;
        const dy = message.targetY - message.y;
        const angleToTarget = Math.atan2(dy, dx);
        const speed = CONFIG.wall?.floatSpeed || 0.05;

        message.vx += Math.cos(angleToTarget) * speed;
        message.vy += Math.sin(angleToTarget) * speed;
        
        // Демпфірування та випадковість
        message.vx = Utils.MathUtils.clamp(message.vx * (CONFIG.wall?.floatDamping || 0.96), -0.3, 0.3);
        message.vy = Utils.MathUtils.clamp(message.vy * (CONFIG.wall?.floatDamping || 0.96), -0.3, 0.3);
        message.vx += Utils.MathUtils.getRandomFloat(-0.01, 0.01);
        message.vy += Utils.MathUtils.getRandomFloat(-0.01, 0.01);

        message.x += message.vx;
        message.y += message.vy;

        // Обережне відбиття від меж, щоб не застрягали
        if (message.x < 5 && message.vx < 0) { message.vx *= -0.5; message.x = 5; }
        if (message.x > 95 && message.vx > 0) { message.vx *= -0.5; message.x = 95; }
        if (message.y < 10 && message.vy < 0) { message.vy *= -0.5; message.y = 10; }
        if (message.y > 90 && message.vy > 0) { message.vy *= -0.5; message.y = 90; }
        
        message.element.style.left = `${message.x}%`;
        message.element.style.top = `${message.y}%`;

        const animId = requestAnimationFrame(() => this.animateMessageFloat(message));
        // Зберігаємо посилання на анімацію, щоб її можна було зупинити
        const existingRefIndex = this.floatAnimationRefs.findIndex(ref => ref.messageId === message.id);
        if (existingRefIndex > -1) {
            this.floatAnimationRefs[existingRefIndex].id = animId;
        } else {
            this.floatAnimationRefs.push({ messageId: message.id, id: animId });
        }
    }

    startAnimationLoops() { // Головний цикл для canvas та float-анімації повідомлень
        if (!this.ctx || !this.canvas) return;
        let lastTimestamp = 0;

        const mainLoop = (timestamp) => {
            if (!this.ctx || !this.canvas) {
                 if (this.animationId) cancelAnimationFrame(this.animationId);
                 this.animationId = null;
                 return;
            }
            const deltaTime = (timestamp - lastTimestamp) || 16.67; // fallback для першого кадру
            lastTimestamp = timestamp;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Малюємо ефекти взаємодії
            this.interactions.forEach((interaction, index) => {
                interaction.radius += (CONFIG.wall?.interactionEffectSpeed || 2) * (deltaTime / 16.67);
                interaction.opacity -= (CONFIG.wall?.interactionEffectFade || 0.02) * (deltaTime / 16.67);
                if (interaction.opacity <= 0) {
                    this.interactions.splice(index, 1);
                } else {
                    this.ctx.beginPath();
                    this.ctx.arc((interaction.x / 100) * this.canvas.width, (interaction.y / 100) * this.canvas.height, interaction.radius, 0, Math.PI * 2);
                    const alpha = Math.floor(Math.max(0, interaction.opacity) * 255).toString(16).padStart(2, '0');
                    this.ctx.strokeStyle = `${interaction.color}${alpha}`;
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                }
            });

            // Малюємо частинки
            this.particles = this.particles.filter(p => {
                p.x += p.vx * (deltaTime / 16.67);
                p.y += p.vy * (deltaTime / 16.67);
                p.vy += (CONFIG.wall?.particleGravity || 0.05) * (deltaTime / 16.67); // Менша гравітація
                p.life -= p.decay * (deltaTime / 16.67);
                if (p.life > 0) {
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    const alpha = Math.floor(Math.max(0, p.life) * 255).toString(16).padStart(2, '0');
                    this.ctx.fillStyle = `${p.color}${alpha}`;
                    this.ctx.fill();
                    return true;
                }
                return false;
            });
            this.animationId = requestAnimationFrame(mainLoop);
        };
        this.animationId = requestAnimationFrame(mainLoop);
        this.startFloatAnimationForAllMessages(); // Запускаємо float для всіх повідомлень
    }


    createAmbientParticles() {
        if (this.ambientParticleInterval) clearInterval(this.ambientParticleInterval); // Очистити попередній інтервал
        this.ambientParticleInterval = setInterval(() => {
            if (!this.canvas || !this.ctx) return;
            if (Math.random() < (CONFIG.wall?.particleDensity || 0.05)) { // Зменшено щільність
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: this.canvas.height + Utils.MathUtils.getRandomFloat(5, 20), // З'являються трохи нижче
                    vx: Utils.MathUtils.getRandomFloat(-0.1, 0.1),
                    vy: Utils.MathUtils.getRandomFloat(-0.8, -0.1), // Повільніше піднімаються
                    life: Utils.MathUtils.getRandomFloat(0.8, 1.5), // Трохи довше життя
                    decay: Utils.MathUtils.getRandomFloat(0.002, 0.005),
                    size: Utils.MathUtils.getRandomFloat(1, 2.5),
                    color: CONFIG.wall?.ambientParticleColor || '#cccccc' // Світліший колір
                });
            }
        }, CONFIG.wall?.ambientParticleInterval || 1500);
    }

    generateSampleMessages() {
        const lm = window.languageManager;
        const sampleData = CONFIG.wall?.sampleMessages || [
            { nameKey: 'wall.sample.maria', defaultName: 'Maria', textKey: 'wall.sample.textMaria', defaultText: 'This space fills me with peace and inspiration.', mood: 'peaceful' },
            { nameKey: 'wall.sample.oleksiy', defaultName: 'Oleksiy', textKey: 'wall.sample.textOleksiy', defaultText: 'Incredible energy! I feel a surge of creative power.', mood: 'energetic' },
            { nameKey: 'wall.sample.sophia', defaultName: 'Sophia', textKey: 'wall.sample.textSophia', defaultText: 'Every artwork tells its own unique story.', mood: 'contemplative' }
        ];

        sampleData.forEach((data, index) => {
            this.animationTimeoutId = setTimeout(() => { // Зберігаємо ID таймаута
                this.createMessage({
                    name: lm ? lm.t(data.nameKey, data.defaultName) : data.defaultName,
                    text: lm ? lm.t(data.textKey, data.defaultText) : data.defaultText,
                    mood: data.mood,
                    timestamp: Date.now() - Math.random() * 3600000 * (index + 1),
                    id: Utils.StringUtils.generateId('sample')
                });
            }, index * (CONFIG.wall?.sampleMessageDelay || 1500));
        });
    }

    clearWall() {
        const lm = window.languageManager;
        if (!confirm(lm ? lm.t('wall.confirmClear', 'Are you sure you want to clear all messages from the wall?') : 'Are you sure you want to clear all messages from the wall?')) return;

        this.messages.forEach(message => {
            if (!message.element) return;
            message.element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            message.element.style.opacity = '0';
            message.element.style.transform = 'translate(-50%, -50%) scale(0.1)';
            setTimeout(() => Utils.DOM.remove(message.element), 500);
        });
        this.messages = [];
        this.particles = [];
        this.interactions = [];
        if (SoundManager && typeof SoundManager.play === 'function') SoundManager.play('error'); // Звук очищення
    }

    removeOldestMessage() {
        if (this.messages.length === 0) return;
        const oldest = this.messages.shift();
        if (oldest && oldest.element) {
            oldest.element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            oldest.element.style.opacity = '0';
            oldest.element.style.transform = 'translate(-50%, -50%) scale(0.1)';
            setTimeout(() => Utils.DOM.remove(oldest.element), 500);
        }
    }

    resetForm() {
        const form = Utils.DOM.$('.message-form', this.container);
        if (form) form.reset(); // Очищує всі поля форми

        const textarea = Utils.DOM.$('#wall-message-text', this.container);
        const charCounter = Utils.DOM.$('.char-counter', this.container);
        if (textarea && charCounter) {
            const lm = window.languageManager;
            const maxLength = parseInt(textarea.getAttribute('maxlength') || '200');
            charCounter.innerHTML = `${maxLength} <span data-translate="wall.form.charsLeft">${lm ? lm.t('wall.form.charsLeft', 'characters left') : 'characters left'}</span>`;
            charCounter.style.color = '';
        }
        // Також варто очистити this.previewData, якщо воно використовується
        this.previewData = null;
    }

    showNotification(message, type = 'info') {
        const notificationArea = Utils.DOM.$('#app-notifications') || document.body; // Визначте контейнер для сповіщень
        const notification = Utils.DOM.createElement('div', {
            className: `app-notification notification-${type}`, // Використовуйте CSS класи для стилізації
            textContent: message,
            role: 'alert',
            'aria-live': 'assertive'
        });
        // Стилі для анімації краще задати в CSS через класи
        notificationArea.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out'); // Клас для анімації зникнення
            setTimeout(() => Utils.DOM.remove(notification), 500); // Час на анімацію
        }, CONFIG.notifications?.duration || 3000);
    }

    destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.animationId = null;
        
        if (this.ambientParticleInterval) clearInterval(this.ambientParticleInterval);
        this.ambientParticleInterval = null;

        this.stopAllMessageFloatAnimations(); // Зупинити всі float-анімації
        if (this.animationTimeoutId) clearTimeout(this.animationTimeoutId); // Очистити таймаут спеціальних анімацій

        this.messages.forEach(message => {
            if (message.element) Utils.DOM.remove(message.element);
        });
        this.messages = [];
        this.particles = [];
        this.interactions = [];

        if (this.canvas) Utils.DOM.remove(this.canvas);
        this.canvas = null;
        this.ctx = null;

        // Потрібно видалити глобальні обробники подій, якщо вони додавалися (наприклад, 'resize')
        // window.removeEventListener('resize', ...);
        // Однак, якщо ви використовували Utils.Performance.debounce, то обгортка може бути іншою.
        // Це важливий аспект для запобігання витокам пам'яті.
        // Найпростіше - не додавати глобальні обробники в цьому класі або мати метод для їх явного видалення.
        console.log('InteractiveWall instance destroyed.');
    }
}