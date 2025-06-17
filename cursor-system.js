/**
 * cursor-system.js
 * Advanced interactive cursor with particle effects
 */

import Utils from './utils.js'; // Utils тепер - це об'єкт, що містить Device, Performance, MathUtils і т.д.
import { CONFIG } from './config.js';
import SoundManager from './sound-manager.js'; // Імпортуємо екземпляр SoundManager

export class AdvancedCursor {
    constructor() {
        this.cursor = null;
        this.follower = null;
        this.trail = [];
        this.mouse = { x: 0, y: 0 };
        this.cursorPos = { x: 0, y: 0 };
        this.followerPos = { x: 0, y: 0 };
        this.targetScale = 1;
        this.currentScale = 1;
        this.magneticElements = [];
        this.isActive = false;
        this.animationId = null;
        this.init();
    }

    init() {
        // Виправлено: Використовуємо Utils.Device.isMobile()
        if (Utils.Device.isMobile()) return;

        this.createCursorElements();
        this.bindEvents();
        this.findMagneticElements();
        this.startAnimation();

        document.body.classList.add('custom-cursor-active');
        this.isActive = true;
    }

    createCursorElements() {
        // Main cursor dot
        this.cursor = document.createElement('div');
        this.cursor.className = 'advanced-cursor-dot';
        this.cursor.innerHTML = '<div class="cursor-inner"></div>';

        // Follower circle
        this.follower = document.createElement('div');
        this.follower.className = 'advanced-cursor-follower';

        // Add cursor styles
        this.injectStyles(); // Розгляньте можливість перенесення цих стилів у ваш основний CSS-файл

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.follower);

        // Initialize trail
        for (let i = 0; i < CONFIG.cursor.trailLength; i++) {
            const trailElement = document.createElement('div');
            trailElement.className = 'cursor-trail';
            // Стилі для частинок хвоста можна також винести в CSS
            trailElement.style.cssText = `
                position: fixed;
                width: ${8 - i * 0.5}px;
                height: ${8 - i * 0.5}px;
                background: rgba(230, 126, 34, ${0.8 - i * 0.06});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9997;
                opacity: 0;
                transition: opacity 0.1s ease;
            `;
            document.body.appendChild(trailElement);
            this.trail.push({
                element: trailElement,
                x: 0,
                y: 0,
                age: 0
            });
        }
    }

    injectStyles() {
        // Зауваження: Якщо ці стилі статичні, краще їх тримати у вашому основному CSS-файлі (styles.css),
        // щоб уникнути ін'єкції стилів через JS, що може ускладнити управління стилями
        // та трохи вплинути на продуктивність початкового рендерингу.
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor-active {
                cursor: none !important;
            }

            .custom-cursor-active * {
                cursor: none !important;
            }

            .advanced-cursor-dot {
                position: fixed;
                width: 12px;
                height: 12px;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
                transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .cursor-inner {
                width: 100%;
                height: 100%;
                background: #e67e22; /* var(--color-accent) з вашого CSS */
                border-radius: 50%;
                transform: scale(1);
                transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .advanced-cursor-follower {
                position: fixed;
                width: 40px;
                height: 40px;
                border: 2px solid rgba(230, 126, 34, 0.6); /* var(--color-accent) з альфа-каналом */
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .advanced-cursor-dot.hover .cursor-inner {
                background: #3498db; /* Колір для hover стану */
                transform: scale(1.5);
                box-shadow: 0 0 20px rgba(52, 152, 219, 0.6);
            }

            .advanced-cursor-follower.hover {
                width: 60px;
                height: 60px;
                border-color: rgba(52, 152, 219, 0.8);
                border-width: 3px;
            }

            .advanced-cursor-dot.active .cursor-inner {
                transform: scale(0.8);
                background: #e74c3c; /* Колір для active стану */
            }

            .advanced-cursor-follower.active {
                transform: scale(0.9);
            }

            .advanced-cursor-dot.magnetic .cursor-inner {
                background: #9b59b6; /* Колір для magnetic стану */
                transform: scale(1.3);
                box-shadow: 0 0 15px rgba(155, 89, 182, 0.5);
            }

            .advanced-cursor-follower.magnetic {
                border-color: rgba(155, 89, 182, 0.7);
                transform: scale(1.2);
            }

            .advanced-cursor-dot.text .cursor-inner {
                background: #27ae60; /* Колір для text стану */
            }

            .advanced-cursor-follower.text {
                border-color: rgba(39, 174, 96, 0.6);
            }

            @media (max-width: 768px) {
                .advanced-cursor-dot,
                .advanced-cursor-follower,
                .cursor-trail {
                    display: none !important;
                }

                .custom-cursor-active,
                .custom-cursor-active * {
                    cursor: auto !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        // Виправлено: Використовуємо Utils.Performance.throttle()
        document.addEventListener('mousemove', Utils.Performance.throttle((e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.updateCursorState(e.target);
            this.checkMagneticElements(e);
        }, 16)); // 16ms ~ 60fps

        document.addEventListener('mousedown', () => {
            if (!this.cursor || !this.follower) return; // Додано перевірку
            this.cursor.classList.add('active');
            this.follower.classList.add('active');
            if (SoundManager && typeof SoundManager.play === 'function') {
                SoundManager.play('click');
            }
        });

        document.addEventListener('mouseup', () => {
            if (!this.cursor || !this.follower) return; // Додано перевірку
            this.cursor.classList.remove('active');
            this.follower.classList.remove('active');
        });

        document.addEventListener('mouseleave', () => {
            if (!this.cursor || !this.follower) return; // Додано перевірку
            this.cursor.style.opacity = '0';
            this.follower.style.opacity = '0';
            this.trail.forEach(t => t.element.style.opacity = '0');
        });

        document.addEventListener('mouseenter', () => {
            if (!this.cursor || !this.follower) return; // Додано перевірку
            this.cursor.style.opacity = '1';
            this.follower.style.opacity = '1';
        });

        // Update magnetic elements on DOM changes
        const observer = new MutationObserver(() => {
            this.findMagneticElements();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    updateCursorState(target) {
        if (!this.cursor || !this.follower || !target) return; // Додано перевірку

        const states = ['hover', 'magnetic', 'text'];
        states.forEach(state => {
            this.cursor.classList.remove(state);
            this.follower.classList.remove(state);
        });

        if (target.matches('a, button, .hover-trigger, [role="button"]')) {
            this.cursor.classList.add('hover');
            this.follower.classList.add('hover');
            if (SoundManager && typeof SoundManager.play === 'function') {
                SoundManager.play('hover');
            }
        } else if (target.matches('input[type="text"], input[type="email"], textarea')) {
            this.cursor.classList.add('text');
            this.follower.classList.add('text');
        }
    }

    findMagneticElements() {
        this.magneticElements = Array.from(document.querySelectorAll('.magnetic, .artwork-item, .ticket-card, .support-card'));
    }

    checkMagneticElements(e) {
        if (!this.cursor || !this.follower) return; // Додано перевірку
        let isMagnetic = false;

        this.magneticElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            // Виправлено: Використовуємо Utils.MathUtils.distance()
            const distance = Utils.MathUtils.distance(e.clientX, e.clientY, centerX, centerY);

            if (distance < CONFIG.cursor.magneticDistance) {
                isMagnetic = true;
                const attraction = 1 - (distance / CONFIG.cursor.magneticDistance);
                const pullX = (centerX - e.clientX) * attraction * 0.3;
                const pullY = (centerY - e.clientY) * attraction * 0.3;

                this.mouse.x += pullX;
                this.mouse.y += pullY;
            }
        });

        if (isMagnetic) {
            this.cursor.classList.add('magnetic');
            this.follower.classList.add('magnetic');
        } else {
            this.cursor.classList.remove('magnetic');
            this.follower.classList.remove('magnetic');
        }
    }

    startAnimation() {
        const animate = () => {
            if (!this.isActive || !this.cursor || !this.follower) { // Додано перевірку
                if (this.animationId) cancelAnimationFrame(this.animationId); // Зупинити анімацію, якщо курсор неактивний або елементи відсутні
                return;
            }

            // Update cursor position with easing
            // Виправлено: Використовуємо Utils.MathUtils.lerp()
            this.cursorPos.x = Utils.MathUtils.lerp(this.cursorPos.x, this.mouse.x, 0.8);
            this.cursorPos.y = Utils.MathUtils.lerp(this.cursorPos.y, this.mouse.y, 0.8);

            // Update follower position with different easing
            // Виправлено: Використовуємо Utils.MathUtils.lerp()
            this.followerPos.x = Utils.MathUtils.lerp(this.followerPos.x, this.mouse.x, 0.15);
            this.followerPos.y = Utils.MathUtils.lerp(this.followerPos.y, this.mouse.y, 0.15);

            // Apply positions
            // Віднімаємо половину розміру елемента для центрування
            this.cursor.style.transform = `translate3d(${this.cursorPos.x - (this.cursor.offsetWidth / 2)}px, ${this.cursorPos.y - (this.cursor.offsetHeight / 2)}px, 0)`;
            this.follower.style.transform = `translate3d(${this.followerPos.x - (this.follower.offsetWidth / 2)}px, ${this.followerPos.y - (this.follower.offsetHeight / 2)}px, 0)`;

            // Update trail
            this.updateTrail();

            this.animationId = requestAnimationFrame(animate);
        };

        // Запускати анімацію тільки якщо курсор активний і елементи створені
        if (this.isActive && this.cursor && this.follower) {
            this.animationId = requestAnimationFrame(animate);
        }
    }

    updateTrail() {
        // Update trail positions
        for (let i = this.trail.length - 1; i > 0; i--) {
            this.trail[i].x = this.trail[i - 1].x;
            this.trail[i].y = this.trail[i - 1].y;
            this.trail[i].age++;
        }

        if (this.trail.length > 0) {
            this.trail[0].x = this.cursorPos.x;
            this.trail[0].y = this.cursorPos.y;
            this.trail[0].age = 0;
        }

        // Render trail
        this.trail.forEach((trailPoint) => {
            const opacity = Math.max(0, 1 - (trailPoint.age / 30)); // 30 - приблизна тривалість життя частинки хвоста
            trailPoint.element.style.opacity = opacity.toString();
            // Віднімаємо половину розміру елемента для центрування
            trailPoint.element.style.transform = `translate3d(${trailPoint.x - (trailPoint.element.offsetWidth / 2)}px, ${trailPoint.y - (trailPoint.element.offsetHeight / 2)}px, 0)`;
        });
    }

    destroy() {
        this.isActive = false;

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        document.body.classList.remove('custom-cursor-active');

        [this.cursor, this.follower, ...this.trail.map(t => t.element)].forEach(el => {
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
        this.cursor = null;
        this.follower = null;
        this.trail = [];
    }
}