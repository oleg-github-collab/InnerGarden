/**
 * preloader.js
 * Advanced preloader with language selection and loading animations
 */

import { CONFIG } from './config.js';
// Змінено імпорт SoundManager для отримання екземпляра (default export)
import SoundManager from './sound-manager.js';
import Utils from './utils.js'; // Цей імпорт вже був правильним для default export з utils.js

export class AdvancedPreloader {
    constructor() {
        console.log('AdvancedPreloader constructor entered'); // Ваш діагностичний лог
        this.container = null;
        this.stage = 'language'; // language -> loading -> welcome -> complete
        this.progress = 0;
        this.selectedLanguage = null;
        this.loadingSteps = [
            { progress: 20, message: 'preloader.preparing' },
            { progress: 40, message: 'preloader.loadingInteractive' },
            { progress: 60, message: 'preloader.loadingAssets' },
            { progress: 80, message: 'preloader.initializingExperience' },
            { progress: 100, message: 'preloader.ready' }
        ];
        this.currentStep = 0;
        this.init();
        console.log('AdvancedPreloader constructor finished'); // Ваш діагностичний лог
    }

    init() {
        console.log('AdvancedPreloader init() called'); // Ваш діагностичний лог
        this.createPreloader();
        this.showLanguageSelection();
        console.log('AdvancedPreloader init() finished'); // Ваш діагностичний лог
    }

    createPreloader() {
        console.log('AdvancedPreloader createPreloader() called'); // Ваш діагностичний лог
        this.container = document.createElement('div');
        this.container.id = 'advanced-preloader';
        this.container.innerHTML = `
            <div class="preloader-background">
                <div class="animated-bg">
                    <div class="floating-particles"></div>
                </div>
            </div>
            <div class="preloader-content">
                <div class="logo-container">
                    <div class="main-logo">INNER GARDEN</div>
                    <div class="logo-subtitle">Interactive Art Experience</div>
                </div>
                <div class="preloader-stage"></div>
            </div>
        `;

        // Зауваження: ін'єкція стилів тут може бути надлишковою,
        // якщо всі ці стилі вже є у вашому styles.css.
        // Розгляньте можливість прибрати injectPreloaderStyles(), якщо стилі дублюються.
        this.injectPreloaderStyles();
        document.body.appendChild(this.container);
        this.createFloatingParticles();
    }

    injectPreloaderStyles() {
        // Ця функція додає стилі безпосередньо в HTML.
        // Якщо ці стилі вже є у вашому зовнішньому файлі styles.css,
        // цю функцію та її виклик можна прибрати, щоб уникнути дублювання
        // та потенційних конфліктів специфічності CSS.
        const style = document.createElement('style');
        style.textContent = `
            #advanced-preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 100000;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .preloader-background {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
                background-size: 200% 200%;
                animation: gradientShift 4s ease-in-out infinite;
            }
            
            @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            .animated-bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0.3;
            }
            
            .floating-particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            
            .particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                animation: floatUp 8s linear infinite;
            }
            
            @keyframes floatUp {
                0% {
                    opacity: 0;
                    transform: translateY(100vh) scale(0);
                }
                10% {
                    opacity: 1;
                    transform: translateY(90vh) scale(1);
                }
                90% {
                    opacity: 1;
                    transform: translateY(10vh) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(0) scale(0);
                }
            }
            
            .preloader-content {
                position: relative;
                z-index: 2;
                text-align: center;
                color: white;
                max-width: 600px;
                padding: 2rem;
            }
            
            .logo-container {
                margin-bottom: 3rem;
                animation: logoFadeIn 1.2s ease-out;
            }
            
            @keyframes logoFadeIn {
                0% {
                    opacity: 0;
                    transform: translateY(30px) scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .main-logo {
                font-size: 4rem;
                font-weight: 900;
                letter-spacing: 2px;
                margin-bottom: 0.5rem;
                background: linear-gradient(45deg, #fff, #f39c12, #fff);
                background-size: 200% 200%;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: textGlow 3s ease-in-out infinite;
            }
            
            @keyframes textGlow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            .logo-subtitle {
                font-size: 1.2rem;
                font-weight: 300;
                opacity: 0.9;
                letter-spacing: 1px;
            }
            
            .preloader-stage {
                min-height: 300px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            
            .language-selection {
                opacity: 0;
                transform: translateY(20px);
                animation: stageIn 0.8s ease-out 0.5s forwards;
            }
            
            @keyframes stageIn {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .language-title {
                font-size: 1.8rem;
                margin-bottom: 2rem;
                font-weight: 300;
            }
            
            .language-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
                margin-bottom: 2rem;
                max-width: 400px;
            }
            
            .language-btn {
                padding: 1rem 1.5rem;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 15px;
                color: white;
                font-size: 1rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                backdrop-filter: blur(10px);
                position: relative;
                overflow: hidden;
            }
            
            .language-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s;
            }
            
            .language-btn:hover::before {
                left: 100%;
            }
            
            .language-btn:hover {
                transform: translateY(-3px);
                background: rgba(255, 255, 255, 0.2);
                border-color: rgba(255, 255, 255, 0.6);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            }
            
            .language-btn.selected {
                background: rgba(52, 152, 219, 0.3);
                border-color: #3498db;
                transform: translateY(-3px);
                box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
            }
            
            .continue-btn {
                padding: 1rem 3rem;
                background: linear-gradient(45deg, #e67e22, #f39c12);
                border: none;
                border-radius: 50px;
                color: white;
                font-size: 1.2rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                box-shadow: 0 8px 20px rgba(230, 126, 34, 0.3);
                opacity: 0.5;
                transform: scale(0.95);
                pointer-events: none;
            }
            
            .continue-btn.enabled {
                opacity: 1;
                transform: scale(1);
                pointer-events: all;
            }
            
            .continue-btn:hover {
                transform: translateY(-3px) scale(1.05);
                box-shadow: 0 12px 30px rgba(230, 126, 34, 0.4);
            }
            
            .loading-stage {
                opacity: 0;
                transform: translateY(20px);
            }
            
            .loading-stage.active {
                opacity: 1;
                transform: translateY(0);
                transition: all 0.8s ease-out;
            }
            
            .loading-progress {
                width: 400px;
                height: 6px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 3px;
                overflow: hidden;
                margin: 2rem 0;
                position: relative;
            }
            
            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #3498db, #e67e22, #3498db);
                background-size: 200% 100%;
                border-radius: 3px;
                width: 0%;
                transition: width 0.5s ease-out;
                animation: progressGlow 2s linear infinite;
            }
            
            @keyframes progressGlow {
                0% { background-position: 0% 0%; }
                100% { background-position: 200% 0%; }
            }
            
            .loading-text {
                font-size: 1.3rem;
                margin-bottom: 1rem;
                min-height: 2rem;
                font-weight: 300;
            }
            
            .loading-percentage {
                font-size: 3rem;
                font-weight: 700;
                margin-bottom: 1rem;
                background: linear-gradient(45deg, #3498db, #e67e22);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .welcome-stage {
                opacity: 0;
                transform: scale(0.9);
            }
            
            .welcome-stage.active {
                opacity: 1;
                transform: scale(1);
                transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .welcome-title {
                font-size: 3rem;
                font-weight: 300;
                margin-bottom: 1rem;
                animation: welcomeGlow 2s ease-in-out infinite;
            }
            
            @keyframes welcomeGlow {
                0%, 100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
                50% { text-shadow: 0 0 40px rgba(255, 255, 255, 0.8), 0 0 60px rgba(52, 152, 219, 0.3); }
            }
            
            .welcome-message {
                font-size: 1.5rem;
                margin-bottom: 3rem;
                font-weight: 300;
                opacity: 0.9;
            }
            
            .enter-btn {
                padding: 1.2rem 4rem;
                background: linear-gradient(45deg, #27ae60, #2ecc71);
                border: none;
                border-radius: 50px;
                color: white;
                font-size: 1.3rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                box-shadow: 0 10px 30px rgba(39, 174, 96, 0.3);
                animation: enterPulse 2s ease-in-out infinite;
            }
            
            @keyframes enterPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .enter-btn:hover {
                transform: translateY(-5px) scale(1.1);
                box-shadow: 0 15px 40px rgba(39, 174, 96, 0.4);
            }
            
            @media (max-width: 768px) {
                .main-logo { font-size: 2.5rem; }
                .language-grid { grid-template-columns: 1fr; max-width: 280px; }
                .loading-progress { width: 280px; }
                .welcome-title { font-size: 2rem; }
                .welcome-message { font-size: 1.2rem; }
            }
        `;
        document.head.appendChild(style);
    }

    createFloatingParticles() {
        const particlesContainer = this.container.querySelector('.floating-particles');
        // Перевірка, чи particlesContainer існує, перед тим як додавати частинки
        if (!particlesContainer) {
            console.warn('Floating particles container not found in preloader HTML structure.');
            return;
        }
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (5 + Math.random() * 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    showLanguageSelection() {
        console.log('AdvancedPreloader showLanguageSelection() called'); // Ваш діагностичний лог
        const stageContainer = this.container.querySelector('.preloader-stage');
        // Перевірка, чи stageContainer існує
        if (!stageContainer) {
            console.error('Preloader stage container (.preloader-stage) not found!');
            return;
        }
        stageContainer.innerHTML = `
            <div class="language-selection">
                <h2 class="language-title" data-translate="preloader.selectLanguage">Choose Language</h2>
                <div class="language-grid">
                    <button class="language-btn" data-lang="uk">
                        <span class="flag">🇺🇦</span> Українська
                    </button>
                    <button class="language-btn" data-lang="en">
                        <span class="flag">🇺🇸</span> English
                    </button>
                    <button class="language-btn" data-lang="de">
                        <span class="flag">🇩🇪</span> Deutsch
                    </button>
                    <button class="language-btn" data-lang="es">
                        <span class="flag">🇪🇸</span> Español
                    </button>
                </div>
                <button class="continue-btn" data-translate="preloader.continue">Continue</button>
            </div>
        `;
        if (window.languageManager && typeof window.languageManager.updateAllElements === 'function') {
            window.languageManager.updateAllElements();
        }

        this.bindLanguageSelection();
    }

    bindLanguageSelection() {
        const langButtons = this.container.querySelectorAll('.language-btn');
        const continueBtn = this.container.querySelector('.continue-btn');

        // Перевірка, чи кнопки існують
        if (!langButtons.length || !continueBtn) {
            console.error('Language buttons or continue button not found in preloader stage!');
            return;
        }

        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                langButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedLanguage = btn.getAttribute('data-lang');
                continueBtn.classList.add('enabled');
                
                console.log('SoundManager object before play (click):', SoundManager); // Діагностичний лог
                if (SoundManager && typeof SoundManager.play === 'function') {
                    SoundManager.play('click');
                } else {
                    console.warn('SoundManager.play is not a function or SoundManager is not available for click sound.');
                }

                // Update language immediately for better UX
                if (window.languageManager) {
                    window.languageManager.setLanguage(this.selectedLanguage);
                }
            });
        });

        continueBtn.addEventListener('click', () => {
            if (this.selectedLanguage) {
                console.log('SoundManager object before play (transition):', SoundManager); // Діагностичний лог
                if (SoundManager && typeof SoundManager.play === 'function') {
                    SoundManager.play('transition');
                } else {
                    console.warn('SoundManager.play is not a function or SoundManager is not available for transition sound.');
                }
                this.startLoading();
            }
        });

        // Auto-select stored language or default
        const storedLang = localStorage.getItem('innerGarden_language') || (CONFIG && CONFIG.defaultLanguage);
        if (storedLang) {
            const defaultBtn = this.container.querySelector(`[data-lang="${storedLang}"]`);
            if (defaultBtn) {
                defaultBtn.click();
            } else {
                console.warn(`Default language button for lang "${storedLang}" not found.`);
            }
        } else {
            console.warn('Stored language or default language in CONFIG not found.');
        }
    }

    startLoading() {
        this.stage = 'loading';
        const stageContainer = this.container.querySelector('.preloader-stage');
        if (!stageContainer) {
            console.error('Preloader stage container (.preloader-stage) not found for loading stage!');
            return;
        }
        
        stageContainer.innerHTML = `
            <div class="loading-stage">
                <div class="loading-percentage">0%</div>
                <div class="loading-progress">
                    <div class="progress-bar"></div>
                </div>
                <div class="loading-text" data-translate="preloader.loading">Loading...</div>
            </div>
        `;

        if (window.languageManager && typeof window.languageManager.updateAllElements === 'function') {
            window.languageManager.updateAllElements();
        }

        setTimeout(() => {
            const loadingStageDiv = stageContainer.querySelector('.loading-stage');
            if (loadingStageDiv) {
                loadingStageDiv.classList.add('active');
            }
            this.runLoadingSequence();
        }, 100);
    }

    runLoadingSequence() {
        const progressBar = this.container.querySelector('.progress-bar');
        const percentageEl = this.container.querySelector('.loading-percentage');
        const textEl = this.container.querySelector('.loading-text');

        // Перевірка, чи елементи прогресу існують
        if (!progressBar || !percentageEl || !textEl) {
            console.error('Progress bar elements not found in loading stage!');
            return;
        }

        const updateProgress = () => {
            if (this.currentStep >= this.loadingSteps.length) {
                this.showWelcome();
                return;
            }

            const step = this.loadingSteps[this.currentStep];
            const targetProgress = step.progress;
            
            const animate = () => {
                this.progress += (targetProgress - this.progress) * 0.1;
                
                progressBar.style.width = this.progress + '%';
                percentageEl.textContent = Math.round(this.progress) + '%';
                
                if (window.languageManager && typeof window.languageManager.t === 'function') {
                    textEl.textContent = window.languageManager.t(step.message);
                } else if (typeof step.message === 'string') { // Fallback
                    textEl.textContent = step.message.charAt(0).toUpperCase() + step.message.slice(1).replace(/([A-Z])/g, ' $1');
                }


                if (Math.abs(this.progress - targetProgress) > 0.5) {
                    requestAnimationFrame(animate);
                } else {
                    this.progress = targetProgress;
                    progressBar.style.width = this.progress + '%';
                    percentageEl.textContent = this.progress + '%';
                    
                    this.currentStep++;
                    // Забезпечити, що updateProgress викликається лише якщо ще є кроки або не досягнуто кінця
                    if(this.currentStep < this.loadingSteps.length || this.progress < 100) {
                         setTimeout(updateProgress, 800); // Можливо, зменшити затримку для плавності
                    } else {
                        this.showWelcome(); // Переконатися, що welcome викликається, якщо це останній крок
                    }
                }
            };

            animate();
        };

        updateProgress();
    }

    showWelcome() {
        this.stage = 'welcome';
        const stageContainer = this.container.querySelector('.preloader-stage');
        if (!stageContainer) {
            console.error('Preloader stage container (.preloader-stage) not found for welcome stage!');
            return;
        }
        
        stageContainer.innerHTML = `
            <div class="welcome-stage">
                <h1 class="welcome-title" data-translate="preloader.welcome">Welcome</h1>
                <p class="welcome-message" data-translate="preloader.welcomeMessage">to the magical world of INNER GARDEN</p>
                <button class="enter-btn" data-translate="preloader.enterExhibition">Enter Exhibition</button>
            </div>
        `;

        // Update translations if language manager is available
        if (window.languageManager && typeof window.languageManager.updateAllElements === 'function') {
            window.languageManager.updateAllElements();
        }

        setTimeout(() => {
            const welcomeStageDiv = stageContainer.querySelector('.welcome-stage');
            if (welcomeStageDiv) {
                welcomeStageDiv.classList.add('active');
            }
            this.bindEnterButton();
        }, 500);
    }

    bindEnterButton() {
        const enterBtn = this.container.querySelector('.enter-btn');
        if (!enterBtn) {
            console.error('Enter button not found in welcome stage!');
            return;
        }
        enterBtn.addEventListener('click', () => {
            console.log('SoundManager object before play (magic):', SoundManager); // Діагностичний лог
            if (SoundManager && typeof SoundManager.play === 'function') {
                SoundManager.play('magic');
            } else {
                console.warn('SoundManager.play is not a function or SoundManager is not available for magic sound.');
            }
            this.completePreloader();
        });
    }

    completePreloader() {
        this.stage = 'complete';
        if (!this.container) {
             console.error('Preloader container is not available to complete.');
             return;
        }
        this.container.style.opacity = '0';
        this.container.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            if (this.container) { // Додаткова перевірка
                this.container.style.display = 'none';
            }
            document.body.classList.add('preloader-complete'); // Має відповідати CSS для показу основного контенту
            document.body.classList.add('app-loaded'); // Додатковий клас, якщо використовується в CSS
            
            // Initialize main application
            if (window.initMainApplication && typeof window.initMainApplication === 'function') {
                window.initMainApplication();
            } else {
                console.warn('window.initMainApplication is not defined or not a function.');
            }
            
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('preloaderComplete', {
                detail: { selectedLanguage: this.selectedLanguage }
            }));
            
            console.log('Preloader complete. Main content should be visible.');
        }, 800); // Час має відповідати transition в CSS для preloader
    }

    destroy() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
            this.container = null; // Очистити посилання
        }
    }
}