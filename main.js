/**
 * INNER GARDEN - Advanced Interactive Exhibition System
 * Інтерактивна виставка Марини Каминської
 * 
 * Модульна архітектура з повною багатомовністю та потужними 3D ефектами
 * Підтримка: Українська, Англійська, Німецька, Іспанська
 * 
 * @version 3.0.0
 * @author INNER GARDEN Team
 */

(function() {
    'use strict';

    /************************************
     * CORE CONFIGURATION
     ************************************/
    
    const CONFIG = {
        version: '3.0.0',
        defaultLanguage: 'uk',
        supportedLanguages: ['uk', 'en', 'de', 'es'],
        animationSpeed: {
            fast: 200,
            medium: 400,
            slow: 800,
            interactive: 1200
        },
        cursor: {
            trailLength: 12,
            magneticDistance: 80,
            parallaxStrength: 0.1
        },
        wall: {
            maxMessages: 50,
            particleDensity: 0.3,
            interactionRadius: 100
        },
        sound: {
            enabled: true,
            volume: 0.6,
            ambientEnabled: false
        }
    };

    /************************************
     * COMPREHENSIVE TRANSLATIONS
     ************************************/
    
    const TRANSLATIONS = {
        uk: {
            // Preloader & Navigation
            chooseLang: 'Оберіть мову',
            continue: 'Продовжити',
            loading: 'Завантаження...',
            preparing: 'Підготовка галереї...',
            loadingInteractive: 'Завантаження інтерактивних елементів...',
            loadingAssets: 'Завантаження ресурсів...',
            initializingExperience: 'Ініціалізація досвіду...',
            welcome: 'Ласкаво просимо',
            welcomeMessage: 'до магічного світу INNER GARDEN',
            enterExhibition: 'Увійти до виставки',
            
            // Navigation
            gallery: 'Галерея',
            interactiveWall: 'Інтерактивна стіна',
            virtualTour: '3D Екскурсія',
            events: 'Події',
            tickets: 'Квитки',
            support: 'Підтримка',
            about: 'Про виставку',
            contact: 'Контакти',
            
            // Gallery
            allArtworks: 'Усі роботи',
            nature: 'Природа',
            emotions: 'Емоції',
            dreams: 'Сни',
            memories: 'Спогади',
            abstract: 'Абстракція',
            portraits: 'Портрети',
            viewDetails: 'Переглянути деталі',
            closeup: 'Наблизити',
            fullscreen: 'На весь екран',
            
            // Interactive Wall
            allMessages: 'Усі повідомлення',
            joyful: 'Радісні',
            peaceful: 'Спокійні',
            inspired: 'Натхненні',
            contemplative: 'Задумливі',
            energetic: 'Енергійні',
            romantic: 'Романтичні',
            
            // Wall Actions
            scatter: 'Розсіяти',
            cluster: 'Кластер',
            flow: 'Потік',
            spiral: 'Спіраль',
            wave: 'Хвиля',
            explode: 'Вибух',
            
            // Message Form
            leaveMessage: 'Залишити повідомлення',
            yourName: 'Ваше ім\'я',
            optional: '(необов\'язково)',
            yourFeedback: 'Ваші враження',
            shareFeelings: 'Поділіться своїми відчуттями від виставки...',
            yourMood: 'Ваш настрій',
            selectMood: 'Оберіть настрій',
            joy: 'Радість',
            peace: 'Спокій',
            inspiration: 'Натхнення',
            contemplation: 'Роздуми',
            energy: 'Енергія',
            love: 'Любов',
            addToWall: 'Додати на стіну',
            preview: 'Попередній перегляд',
            messageAdded: 'Ваше повідомлення додано до стіни!',
            charactersLeft: 'символів залишилось',
            tooShort: 'Повідомлення занадто коротке',
            
            // 3D Tour
            start3DTour: 'Почати 3D екскурсію',
            virtualExperience: 'Віртуальний досвід',
            roomNavigation: 'Навігація по кімнатах',
            room1: 'Кімната природи',
            room2: 'Емоційний простір',
            room3: 'Зал спогадів',
            room4: 'Інтерактивна зона',
            enterVR: 'Увійти в VR режим',
            exitVR: 'Вийти з VR',
            moveInstructions: 'Використовуйте WASD або стрілки для руху',
            clickToInteract: 'Клікніть для взаємодії',
            
            // Events
            eventSchedule: 'Розклад подій',
            upcomingEvents: 'Майбутні події',
            pastEvents: 'Минулі події',
            grandOpening: 'Урочисте відкриття',
            artistTalk: 'Зустріч з художницею',
            workshop: 'Майстер-клас',
            familyDay: 'Сімейний день',
            closingCeremony: 'Церемонія закриття',
            specialExhibition: 'Спеціальна виставка',
            moreDetails: 'Детальніше',
            register: 'Зареєструватися',
            eventFull: 'Місця закінчились',
            eventCancelled: 'Захід скасовано',
            
            // Tickets
            ticketsAndVisiting: 'Квитки та відвідування',
            chooseExperience: 'Оберіть ваш досвід',
            ticketTypes: 'Типи квитків',
            standard: 'Стандартний',
            premium: 'Преміум',
            vip: 'VIP',
            family: 'Сімейний',
            student: 'Студентський',
            group: 'Груповий',
            buyTicket: 'Придбати квиток',
            addToCart: 'Додати в кошик',
            cart: 'Кошик',
            checkout: 'Оформити замовлення',
            
            // Payment
            paymentDetails: 'Деталі оплати',
            personalInfo: 'Особиста інформація',
            fullName: 'Повне ім\'я',
            email: 'Email адреса',
            phone: 'Номер телефона',
            address: 'Адреса',
            paymentMethod: 'Спосіб оплати',
            creditCard: 'Банківська картка',
            paypal: 'PayPal',
            bankTransfer: 'Банківський переказ',
            cardNumber: 'Номер картки',
            expiryDate: 'Термін дії',
            cvv: 'CVV код',
            processing: 'Обробка платежу...',
            paymentSuccess: 'Платіж успішний!',
            paymentError: 'Помилка платежу',
            
            // Support
            supportProject: 'Підтримайте проект',
            supportDescription: 'Ваша підтримка допомагає розвивати мистецтво',
            supportTiers: 'Рівні підтримки',
            friend: 'Друг галереї',
            supporter: 'Підтримувач',
            patron: 'Меценат',
            benefactor: 'Благодійник',
            donate: 'Пожертвувати',
            monthlySupport: 'Щомісячна підтримка',
            oneTimeSupport: 'Разова підтримка',
            customAmount: 'Довільна сума',
            
            // Documents & Legal
            termsOfService: 'Умови використання',
            privacyPolicy: 'Політика конфіденційності',
            cookiePolicy: 'Політика cookies',
            refundPolicy: 'Політика повернення',
            accessibility: 'Доступність',
            contactInfo: 'Контактна інформація',
            
            // Accessibility
            accessibilityOptions: 'Налаштування доступності',
            increaseFontSize: 'Збільшити шрифт',
            highContrast: 'Високий контраст',
            reduceMotion: 'Зменшити анімації',
            screenReader: 'Режим читання з екрану',
            keyboardNavigation: 'Навігація клавіатурою',
            
            // General UI
            close: 'Закрити',
            back: 'Назад',
            next: 'Далі',
            previous: 'Попередній',
            submit: 'Відправити',
            cancel: 'Скасувати',
            confirm: 'Підтвердити',
            save: 'Зберегти',
            edit: 'Редагувати',
            delete: 'Видалити',
            search: 'Пошук',
            filter: 'Фільтр',
            sort: 'Сортування',
            share: 'Поділитися',
            download: 'Завантажити',
            print: 'Друкувати',
            
            // Notifications
            success: 'Успішно!',
            error: 'Помилка!',
            warning: 'Увага!',
            info: 'Інформація',
            loading: 'Завантаження...',
            saved: 'Збережено',
            deleted: 'Видалено',
            updated: 'Оновлено',
            copied: 'Скопійовано',
            
            // Time & Dates
            today: 'Сьогодні',
            tomorrow: 'Завтра',
            yesterday: 'Вчора',
            thisWeek: 'Цього тижня',
            nextWeek: 'Наступного тижня',
            thisMonth: 'Цього місяця',
            nextMonth: 'Наступного місяця'
        },
        
        en: {
            // Preloader & Navigation
            chooseLang: 'Choose Language',
            continue: 'Continue',
            loading: 'Loading...',
            preparing: 'Preparing gallery...',
            loadingInteractive: 'Loading interactive elements...',
            loadingAssets: 'Loading assets...',
            initializingExperience: 'Initializing experience...',
            welcome: 'Welcome',
            welcomeMessage: 'to the magical world of INNER GARDEN',
            enterExhibition: 'Enter Exhibition',
            
            // Navigation
            gallery: 'Gallery',
            interactiveWall: 'Interactive Wall',
            virtualTour: '3D Tour',
            events: 'Events',
            tickets: 'Tickets',
            support: 'Support',
            about: 'About',
            contact: 'Contact',
            
            // Gallery
            allArtworks: 'All Artworks',
            nature: 'Nature',
            emotions: 'Emotions',
            dreams: 'Dreams',
            memories: 'Memories',
            abstract: 'Abstract',
            portraits: 'Portraits',
            viewDetails: 'View Details',
            closeup: 'Close Up',
            fullscreen: 'Fullscreen',
            
            // Interactive Wall
            allMessages: 'All Messages',
            joyful: 'Joyful',
            peaceful: 'Peaceful',
            inspired: 'Inspired',
            contemplative: 'Contemplative',
            energetic: 'Energetic',
            romantic: 'Romantic',
            
            // Wall Actions
            scatter: 'Scatter',
            cluster: 'Cluster',
            flow: 'Flow',
            spiral: 'Spiral',
            wave: 'Wave',
            explode: 'Explode',
            
            // Message Form
            leaveMessage: 'Leave Message',
            yourName: 'Your Name',
            optional: '(optional)',
            yourFeedback: 'Your Feedback',
            shareFeelings: 'Share your feelings about the exhibition...',
            yourMood: 'Your Mood',
            selectMood: 'Select Mood',
            joy: 'Joy',
            peace: 'Peace',
            inspiration: 'Inspiration',
            contemplation: 'Contemplation',
            energy: 'Energy',
            love: 'Love',
            addToWall: 'Add to Wall',
            preview: 'Preview',
            messageAdded: 'Your message has been added to the wall!',
            charactersLeft: 'characters left',
            tooShort: 'Message too short',
            
            // 3D Tour
            start3DTour: 'Start 3D Tour',
            virtualExperience: 'Virtual Experience',
            roomNavigation: 'Room Navigation',
            room1: 'Nature Room',
            room2: 'Emotional Space',
            room3: 'Memory Hall',
            room4: 'Interactive Zone',
            enterVR: 'Enter VR Mode',
            exitVR: 'Exit VR',
            moveInstructions: 'Use WASD or arrow keys to move',
            clickToInteract: 'Click to interact',
            
            // Events
            eventSchedule: 'Event Schedule',
            upcomingEvents: 'Upcoming Events',
            pastEvents: 'Past Events',
            grandOpening: 'Grand Opening',
            artistTalk: 'Artist Talk',
            workshop: 'Workshop',
            familyDay: 'Family Day',
            closingCeremony: 'Closing Ceremony',
            specialExhibition: 'Special Exhibition',
            moreDetails: 'More Details',
            register: 'Register',
            eventFull: 'Event Full',
            eventCancelled: 'Event Cancelled',
            
            // Tickets
            ticketsAndVisiting: 'Tickets & Visiting',
            chooseExperience: 'Choose Your Experience',
            ticketTypes: 'Ticket Types',
            standard: 'Standard',
            premium: 'Premium',
            vip: 'VIP',
            family: 'Family',
            student: 'Student',
            group: 'Group',
            buyTicket: 'Buy Ticket',
            addToCart: 'Add to Cart',
            cart: 'Cart',
            checkout: 'Checkout',
            
            // Payment
            paymentDetails: 'Payment Details',
            personalInfo: 'Personal Information',
            fullName: 'Full Name',
            email: 'Email Address',
            phone: 'Phone Number',
            address: 'Address',
            paymentMethod: 'Payment Method',
            creditCard: 'Credit Card',
            paypal: 'PayPal',
            bankTransfer: 'Bank Transfer',
            cardNumber: 'Card Number',
            expiryDate: 'Expiry Date',
            cvv: 'CVV Code',
            processing: 'Processing payment...',
            paymentSuccess: 'Payment successful!',
            paymentError: 'Payment error',
            
            // Support
            supportProject: 'Support the Project',
            supportDescription: 'Your support helps develop art',
            supportTiers: 'Support Levels',
            friend: 'Gallery Friend',
            supporter: 'Supporter',
            patron: 'Patron',
            benefactor: 'Benefactor',
            donate: 'Donate',
            monthlySupport: 'Monthly Support',
            oneTimeSupport: 'One-time Support',
            customAmount: 'Custom Amount',
            
            // Documents & Legal
            termsOfService: 'Terms of Service',
            privacyPolicy: 'Privacy Policy',
            cookiePolicy: 'Cookie Policy',
            refundPolicy: 'Refund Policy',
            accessibility: 'Accessibility',
            contactInfo: 'Contact Information',
            
            // Accessibility
            accessibilityOptions: 'Accessibility Options',
            increaseFontSize: 'Increase Font Size',
            highContrast: 'High Contrast',
            reduceMotion: 'Reduce Motion',
            screenReader: 'Screen Reader Mode',
            keyboardNavigation: 'Keyboard Navigation',
            
            // General UI
            close: 'Close',
            back: 'Back',
            next: 'Next',
            previous: 'Previous',
            submit: 'Submit',
            cancel: 'Cancel',
            confirm: 'Confirm',
            save: 'Save',
            edit: 'Edit',
            delete: 'Delete',
            search: 'Search',
            filter: 'Filter',
            sort: 'Sort',
            share: 'Share',
            download: 'Download',
            print: 'Print',
            
            // Notifications
            success: 'Success!',
            error: 'Error!',
            warning: 'Warning!',
            info: 'Information',
            loading: 'Loading...',
            saved: 'Saved',
            deleted: 'Deleted',
            updated: 'Updated',
            copied: 'Copied',
            
            // Time & Dates
            today: 'Today',
            tomorrow: 'Tomorrow',
            yesterday: 'Yesterday',
            thisWeek: 'This Week',
            nextWeek: 'Next Week',
            thisMonth: 'This Month',
            nextMonth: 'Next Month'
        },
        
        de: {
            // Preloader & Navigation
            chooseLang: 'Sprache wählen',
            continue: 'Fortfahren',
            loading: 'Laden...',
            preparing: 'Galerie wird vorbereitet...',
            loadingInteractive: 'Interaktive Elemente werden geladen...',
            loadingAssets: 'Ressourcen werden geladen...',
            initializingExperience: 'Erfahrung wird initialisiert...',
            welcome: 'Willkommen',
            welcomeMessage: 'in der magischen Welt von INNER GARDEN',
            enterExhibition: 'Ausstellung betreten',
            
            // Navigation
            gallery: 'Galerie',
            interactiveWall: 'Interaktive Wand',
            virtualTour: '3D-Tour',
            events: 'Veranstaltungen',
            tickets: 'Tickets',
            support: 'Unterstützung',
            about: 'Über uns',
            contact: 'Kontakt',
            
            // Gallery
            allArtworks: 'Alle Kunstwerke',
            nature: 'Natur',
            emotions: 'Emotionen',
            dreams: 'Träume',
            memories: 'Erinnerungen',
            abstract: 'Abstrakt',
            portraits: 'Porträts',
            viewDetails: 'Details ansehen',
            closeup: 'Nahaufnahme',
            fullscreen: 'Vollbild',
            
            // Interactive Wall
            allMessages: 'Alle Nachrichten',
            joyful: 'Fröhlich',
            peaceful: 'Friedlich',
            inspired: 'Inspiriert',
            contemplative: 'Nachdenklich',
            energetic: 'Energisch',
            romantic: 'Romantisch',
            
            // Wall Actions
            scatter: 'Verstreuen',
            cluster: 'Cluster',
            flow: 'Fließen',
            spiral: 'Spirale',
            wave: 'Welle',
            explode: 'Explodieren',
            
            // Message Form
            leaveMessage: 'Nachricht hinterlassen',
            yourName: 'Ihr Name',
            optional: '(optional)',
            yourFeedback: 'Ihr Feedback',
            shareFeelings: 'Teilen Sie Ihre Gefühle zur Ausstellung...',
            yourMood: 'Ihre Stimmung',
            selectMood: 'Stimmung wählen',
            joy: 'Freude',
            peace: 'Frieden',
            inspiration: 'Inspiration',
            contemplation: 'Besinnung',
            energy: 'Energie',
            love: 'Liebe',
            addToWall: 'Zur Wand hinzufügen',
            preview: 'Vorschau',
            messageAdded: 'Ihre Nachricht wurde zur Wand hinzugefügt!',
            charactersLeft: 'Zeichen übrig',
            tooShort: 'Nachricht zu kurz',
            
            // 3D Tour
            start3DTour: '3D-Tour starten',
            virtualExperience: 'Virtuelle Erfahrung',
            roomNavigation: 'Raumnavigation',
            room1: 'Naturraum',
            room2: 'Emotionaler Raum',
            room3: 'Erinnerungshalle',
            room4: 'Interaktive Zone',
            enterVR: 'VR-Modus betreten',
            exitVR: 'VR verlassen',
            moveInstructions: 'Verwenden Sie WASD oder Pfeiltasten zum Bewegen',
            clickToInteract: 'Klicken zum Interagieren',
            
            // Events
            eventSchedule: 'Veranstaltungskalender',
            upcomingEvents: 'Kommende Veranstaltungen',
            pastEvents: 'Vergangene Veranstaltungen',
            grandOpening: 'Große Eröffnung',
            artistTalk: 'Künstlergespräch',
            workshop: 'Workshop',
            familyDay: 'Familientag',
            closingCeremony: 'Abschlusszeremonie',
            specialExhibition: 'Sonderausstellung',
            moreDetails: 'Weitere Details',
            register: 'Registrieren',
            eventFull: 'Veranstaltung ausgebucht',
            eventCancelled: 'Veranstaltung abgesagt',
            
            // Tickets
            ticketsAndVisiting: 'Tickets & Besuch',
            chooseExperience: 'Wählen Sie Ihr Erlebnis',
            ticketTypes: 'Ticket-Arten',
            standard: 'Standard',
            premium: 'Premium',
            vip: 'VIP',
            family: 'Familie',
            student: 'Student',
            group: 'Gruppe',
            buyTicket: 'Ticket kaufen',
            addToCart: 'In den Warenkorb',
            cart: 'Warenkorb',
            checkout: 'Zur Kasse',
            
            // Payment
            paymentDetails: 'Zahlungsdetails',
            personalInfo: 'Persönliche Informationen',
            fullName: 'Vollständiger Name',
            email: 'E-Mail-Adresse',
            phone: 'Telefonnummer',
            address: 'Adresse',
            paymentMethod: 'Zahlungsmethode',
            creditCard: 'Kreditkarte',
            paypal: 'PayPal',
            bankTransfer: 'Banküberweisung',
            cardNumber: 'Kartennummer',
            expiryDate: 'Ablaufdatum',
            cvv: 'CVV-Code',
            processing: 'Zahlung wird verarbeitet...',
            paymentSuccess: 'Zahlung erfolgreich!',
            paymentError: 'Zahlungsfehler',
            
            // Support
            supportProject: 'Projekt unterstützen',
            supportDescription: 'Ihre Unterstützung hilft bei der Kunstentwicklung',
            supportTiers: 'Unterstützungsebenen',
            friend: 'Galerie-Freund',
            supporter: 'Unterstützer',
            patron: 'Förderer',
            benefactor: 'Wohltäter',
            donate: 'Spenden',
            monthlySupport: 'Monatliche Unterstützung',
            oneTimeSupport: 'Einmalige Unterstützung',
            customAmount: 'Benutzerdefinierter Betrag',
            
            // Documents & Legal
            termsOfService: 'Nutzungsbedingungen',
            privacyPolicy: 'Datenschutzrichtlinie',
            cookiePolicy: 'Cookie-Richtlinie',
            refundPolicy: 'Rückerstattungsrichtlinie',
            accessibility: 'Barrierefreiheit',
            contactInfo: 'Kontaktinformationen',
            
            // Accessibility
            accessibilityOptions: 'Barrierefreiheits-Optionen',
            increaseFontSize: 'Schriftgröße erhöhen',
            highContrast: 'Hoher Kontrast',
            reduceMotion: 'Bewegungen reduzieren',
            screenReader: 'Bildschirmleser-Modus',
            keyboardNavigation: 'Tastaturnavigation',
            
            // General UI
            close: 'Schließen',
            back: 'Zurück',
            next: 'Weiter',
            previous: 'Vorherige',
            submit: 'Senden',
            cancel: 'Abbrechen',
            confirm: 'Bestätigen',
            save: 'Speichern',
            edit: 'Bearbeiten',
            delete: 'Löschen',
            search: 'Suchen',
            filter: 'Filter',
            sort: 'Sortieren',
            share: 'Teilen',
            download: 'Herunterladen',
            print: 'Drucken',
            
            // Notifications
            success: 'Erfolgreich!',
            error: 'Fehler!',
            warning: 'Warnung!',
            info: 'Information',
            loading: 'Laden...',
            saved: 'Gespeichert',
            deleted: 'Gelöscht',
            updated: 'Aktualisiert',
            copied: 'Kopiert',
            
            // Time & Dates
            today: 'Heute',
            tomorrow: 'Morgen',
            yesterday: 'Gestern',
            thisWeek: 'Diese Woche',
            nextWeek: 'Nächste Woche',
            thisMonth: 'Diesen Monat',
            nextMonth: 'Nächsten Monat'
        },
        
        es: {
            // Preloader & Navigation
            chooseLang: 'Elegir idioma',
            continue: 'Continuar',
            loading: 'Cargando...',
            preparing: 'Preparando galería...',
            loadingInteractive: 'Cargando elementos interactivos...',
            loadingAssets: 'Cargando recursos...',
            initializingExperience: 'Inicializando experiencia...',
            welcome: 'Bienvenido',
            welcomeMessage: 'al mundo mágico de INNER GARDEN',
            enterExhibition: 'Entrar a la Exhibición',
            
            // Navigation
            gallery: 'Galería',
            interactiveWall: 'Muro Interactivo',
            virtualTour: 'Tour 3D',
            events: 'Eventos',
            tickets: 'Entradas',
            support: 'Apoyo',
            about: 'Acerca de',
            contact: 'Contacto',
            
            // Gallery
            allArtworks: 'Todas las Obras',
            nature: 'Naturaleza',
            emotions: 'Emociones',
            dreams: 'Sueños',
            memories: 'Recuerdos',
            abstract: 'Abstracto',
            portraits: 'Retratos',
            viewDetails: 'Ver Detalles',
            closeup: 'Acercar',
            fullscreen: 'Pantalla Completa',
            
            // Interactive Wall
            allMessages: 'Todos los Mensajes',
            joyful: 'Alegres',
            peaceful: 'Pacíficos',
            inspired: 'Inspirados',
            contemplative: 'Contemplativos',
            energetic: 'Enérgicos',
            romantic: 'Románticos',
            
            // Wall Actions
            scatter: 'Dispersar',
            cluster: 'Agrupar',
            flow: 'Fluir',
            spiral: 'Espiral',
            wave: 'Onda',
            explode: 'Explotar',
            
            // Message Form
            leaveMessage: 'Dejar Mensaje',
            yourName: 'Su Nombre',
            optional: '(opcional)',
            yourFeedback: 'Su Opinión',
            shareFeelings: 'Comparta sus sentimientos sobre la exhibición...',
            yourMood: 'Su Estado de Ánimo',
            selectMood: 'Seleccionar Estado de Ánimo',
            joy: 'Alegría',
            peace: 'Paz',
            inspiration: 'Inspiración',
            contemplation: 'Contemplación',
            energy: 'Energía',
            love: 'Amor',
            addToWall: 'Añadir al Muro',
            preview: 'Vista Previa',
            messageAdded: '¡Su mensaje ha sido añadido al muro!',
            charactersLeft: 'caracteres restantes',
            tooShort: 'Mensaje muy corto',
            
            // 3D Tour
            start3DTour: 'Iniciar Tour 3D',
            virtualExperience: 'Experiencia Virtual',
            roomNavigation: 'Navegación de Salas',
            room1: 'Sala de la Naturaleza',
            room2: 'Espacio Emocional',
            room3: 'Sala de Recuerdos',
            room4: 'Zona Interactiva',
            enterVR: 'Entrar en Modo VR',
            exitVR: 'Salir de VR',
            moveInstructions: 'Use WASD o las teclas de flecha para moverse',
            clickToInteract: 'Haga clic para interactuar',
            
            // Events
            eventSchedule: 'Calendario de Eventos',
            upcomingEvents: 'Próximos Eventos',
            pastEvents: 'Eventos Pasados',
            grandOpening: 'Gran Inauguración',
            artistTalk: 'Charla del Artista',
            workshop: 'Taller',
            familyDay: 'Día Familiar',
            closingCeremony: 'Ceremonia de Clausura',
            specialExhibition: 'Exhibición Especial',
            moreDetails: 'Más Detalles',
            register: 'Registrarse',
            eventFull: 'Evento Completo',
            eventCancelled: 'Evento Cancelado',
            
            // Tickets
            ticketsAndVisiting: 'Entradas y Visitas',
            chooseExperience: 'Elija Su Experiencia',
            ticketTypes: 'Tipos de Entradas',
            standard: 'Estándar',
            premium: 'Premium',
            vip: 'VIP',
            family: 'Familiar',
            student: 'Estudiante',
            group: 'Grupo',
            buyTicket: 'Comprar Entrada',
            addToCart: 'Añadir al Carrito',
            cart: 'Carrito',
            checkout: 'Finalizar Compra',
            
            // Payment
            paymentDetails: 'Detalles de Pago',
            personalInfo: 'Información Personal',
            fullName: 'Nombre Completo',
            email: 'Dirección de Email',
            phone: 'Número de Teléfono',
            address: 'Dirección',
            paymentMethod: 'Método de Pago',
            creditCard: 'Tarjeta de Crédito',
            paypal: 'PayPal',
            bankTransfer: 'Transferencia Bancaria',
            cardNumber: 'Número de Tarjeta',
            expiryDate: 'Fecha de Vencimiento',
            cvv: 'Código CVV',
            processing: 'Procesando pago...',
            paymentSuccess: '¡Pago exitoso!',
            paymentError: 'Error de pago',
            
            // Support
            supportProject: 'Apoyar el Proyecto',
            supportDescription: 'Su apoyo ayuda a desarrollar el arte',
            supportTiers: 'Niveles de Apoyo',
            friend: 'Amigo de la Galería',
            supporter: 'Partidario',
            patron: 'Mecenas',
            benefactor: 'Benefactor',
            donate: 'Donar',
            monthlySupport: 'Apoyo Mensual',
            oneTimeSupport: 'Apoyo Único',
            customAmount: 'Cantidad Personalizada',
            
            // Documents & Legal
            termsOfService: 'Términos de Servicio',
            privacyPolicy: 'Política de Privacidad',
            cookiePolicy: 'Política de Cookies',
            refundPolicy: 'Política de Reembolso',
            accessibility: 'Accesibilidad',
            contactInfo: 'Información de Contacto',
            
            // Accessibility
            accessibilityOptions: 'Opciones de Accesibilidad',
            increaseFontSize: 'Aumentar Tamaño de Fuente',
            highContrast: 'Alto Contraste',
            reduceMotion: 'Reducir Movimiento',
            screenReader: 'Modo de Lector de Pantalla',
            keyboardNavigation: 'Navegación por Teclado',
            
            // General UI
            close: 'Cerrar',
            back: 'Atrás',
            next: 'Siguiente',
            previous: 'Anterior',
            submit: 'Enviar',
            cancel: 'Cancelar',
            confirm: 'Confirmar',
            save: 'Guardar',
            edit: 'Editar',
            delete: 'Eliminar',
            search: 'Buscar',
            filter: 'Filtrar',
            sort: 'Ordenar',
            share: 'Compartir',
            download: 'Descargar',
            print: 'Imprimir',
            
            // Notifications
            success: '¡Éxito!',
            error: '¡Error!',
            warning: '¡Advertencia!',
            info: 'Información',
            loading: 'Cargando...',
            saved: 'Guardado',
            deleted: 'Eliminado',
            updated: 'Actualizado',
            copied: 'Copiado',
            
            // Time & Dates
            today: 'Hoy',
            tomorrow: 'Mañana',
            yesterday: 'Ayer',
            thisWeek: 'Esta Semana',
            nextWeek: 'Próxima Semana',
            thisMonth: 'Este Mes',
            nextMonth: 'Próximo Mes'
        }
    };

    /************************************
     * UTILITY FUNCTIONS
     ************************************/
    
    const Utils = {
        throttle: (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        debounce: (func, delay) => {
            let debounceTimer;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => func.apply(context, args), delay);
            };
        },

        getRandomFloat: (min, max) => Math.random() * (max - min) + min,
        getRandomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
        
        generateId: () => 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36),
        
        lerp: (start, end, factor) => start + (end - start) * factor,
        
        clamp: (value, min, max) => Math.min(Math.max(value, min), max),
        
        distance: (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),
        
        easeOutCubic: t => 1 - Math.pow(1 - t, 3),
        easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        
        createMatrix: (rows, cols, defaultValue = 0) => {
            return Array(rows).fill().map(() => Array(cols).fill(defaultValue));
        },

        isMobile: () => window.innerWidth <= 768 || 'ontouchstart' in window,
        
        isInViewport: (element) => {
            if (!element) return false;
            const rect = element.getBoundingClientRect();
            return rect.top <= window.innerHeight && rect.bottom >= 0;
        },

        formatNumber: (num, locale = 'uk-UA') => {
            return new Intl.NumberFormat(locale).format(num);
        },

        formatCurrency: (amount, currency = 'UAH', locale = 'uk-UA') => {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency
            }).format(amount);
        }
    };

    /************************************
     * LANGUAGE MANAGER
     ************************************/
    
    class LanguageManager {
        constructor() {
            this.currentLang = this.getStoredLanguage() || CONFIG.defaultLanguage;
            this.observers = [];
            this.init();
        }

        init() {
            this.updateDocumentLanguage();
        }

        getStoredLanguage() {
            return localStorage.getItem('innerGarden_language');
        }

        setLanguage(lang) {
            if (!CONFIG.supportedLanguages.includes(lang)) return false;
            
            this.currentLang = lang;
            localStorage.setItem('innerGarden_language', lang);
            this.updateDocumentLanguage();
            this.notifyObservers();
            this.updateAllElements();
            
            return true;
        }

        updateDocumentLanguage() {
            document.documentElement.lang = this.currentLang;
            document.documentElement.setAttribute('data-lang', this.currentLang);
        }

        t(key, fallback = null) {
            const translation = TRANSLATIONS[this.currentLang]?.[key] || 
                              TRANSLATIONS[CONFIG.defaultLanguage]?.[key] || 
                              fallback || 
                              key;
            return translation;
        }

        updateAllElements() {
            const elements = document.querySelectorAll('[data-translate]');
            elements.forEach(el => this.updateElement(el));
        }

        updateElement(element) {
            const key = element.getAttribute('data-translate');
            if (!key) return;

            const translation = this.t(key);
            
            if (element.tagName === 'INPUT') {
                if (element.type === 'submit' || element.type === 'button') {
                    element.value = translation;
                } else {
                    element.placeholder = translation;
                }
            } else if (element.tagName === 'TEXTAREA') {
                const placeholderKey = element.getAttribute('data-translate-placeholder');
                if (placeholderKey) {
                    element.placeholder = this.t(placeholderKey);
                } else {
                    element.placeholder = translation;
                }
            } else {
                element.textContent = translation;
            }
        }

        addObserver(callback) {
            this.observers.push(callback);
        }

        removeObserver(callback) {
            this.observers = this.observers.filter(obs => obs !== callback);
        }

        notifyObservers() {
            this.observers.forEach(callback => callback(this.currentLang));
        }

        getCurrentLanguage() {
            return this.currentLang;
        }

        getSupportedLanguages() {
            return CONFIG.supportedLanguages;
        }
    }

    /************************************
     * SOUND MANAGER
     ************************************/
    
    class SoundManager {
        constructor() {
            this.context = null;
            this.sounds = {};
            this.enabled = this.getStoredSetting();
            this.volume = CONFIG.sound.volume;
            this.init();
        }

        init() {
            this.initAudioContext();
            this.createSounds();
        }

        getStoredSetting() {
            const stored = localStorage.getItem('innerGarden_sound');
            return stored !== null ? stored === 'true' : CONFIG.sound.enabled;
        }

        initAudioContext() {
            try {
                this.context = new (window.AudioContext || window.webkitAudioContext)();
            } catch (error) {
                console.warn('Web Audio API not supported:', error);
            }
        }

        createSounds() {
            if (!this.context) return;

            this.sounds = {
                click: () => this.playTone(800, 0.1, 'square', 0.3),
                hover: () => this.playTone(600, 0.05, 'sine', 0.2),
                success: () => this.playChord([523.25, 659.25, 783.99], 0.4, 'sine', 0.3),
                error: () => this.playTone(200, 0.3, 'sawtooth', 0.4),
                notification: () => this.playChord([440, 554.37], 0.3, 'sine', 0.25),
                whoosh: () => this.playNoise(0.2, 'highpass', 1000),
                ambient: () => this.playAmbient(),
                magic: () => this.playMagicalSound(),
                transition: () => this.playTransition()
            };
        }

        playTone(frequency, duration, type = 'sine', volume = 0.3) {
            if (!this.enabled || !this.context) return;

            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            const filterNode = this.context.createBiquadFilter();

            oscillator.connect(filterNode);
            filterNode.connect(gainNode);
            gainNode.connect(this.context.destination);

            oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
            oscillator.type = type;

            filterNode.type = 'lowpass';
            filterNode.frequency.setValueAtTime(frequency * 2, this.context.currentTime);

            const finalVolume = volume * this.volume;
            gainNode.gain.setValueAtTime(0, this.context.currentTime);
            gainNode.gain.linearRampToValueAtTime(finalVolume, this.context.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

            oscillator.start(this.context.currentTime);
            oscillator.stop(this.context.currentTime + duration);
        }

        playChord(frequencies, duration, type = 'sine', volume = 0.3) {
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    this.playTone(freq, duration, type, volume / frequencies.length);
                }, index * 100);
            });
        }

        playNoise(duration, filterType = 'lowpass', filterFreq = 1000) {
            if (!this.enabled || !this.context) return;

            const noise = this.context.createBufferSource();
            const buffer = this.context.createBuffer(1, this.context.sampleRate * duration, this.context.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < data.length; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
            }

            noise.buffer = buffer;

            const filter = this.context.createBiquadFilter();
            filter.type = filterType;
            filter.frequency.setValueAtTime(filterFreq, this.context.currentTime);

            const gain = this.context.createGain();
            gain.gain.setValueAtTime(0.2 * this.volume, this.context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.context.destination);

            noise.start();
        }

        playMagicalSound() {
            const frequencies = [261.63, 329.63, 392.00, 523.25, 659.25];
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    this.playTone(freq, 0.3, 'sine', 0.15);
                }, index * 150);
            });
        }

        playTransition() {
            const startFreq = 200;
            const endFreq = 800;
            const duration = 0.5;
            
            if (!this.enabled || !this.context) return;

            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.context.destination);

            oscillator.frequency.setValueAtTime(startFreq, this.context.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(endFreq, this.context.currentTime + duration);

            gainNode.gain.setValueAtTime(0, this.context.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3 * this.volume, this.context.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

            oscillator.start(this.context.currentTime);
            oscillator.stop(this.context.currentTime + duration);
        }

        play(soundName) {
            if (!this.enabled || !this.sounds[soundName]) return;

            try {
                if (this.context && this.context.state === 'suspended') {
                    this.context.resume();
                }
                this.sounds[soundName]();
            } catch (error) {
                console.warn(`Error playing sound "${soundName}":`, error);
            }
        }

        toggle() {
            this.enabled = !this.enabled;
            localStorage.setItem('innerGarden_sound', this.enabled.toString());
            return this.enabled;
        }

        setVolume(volume) {
            this.volume = Utils.clamp(volume, 0, 1);
        }

        isEnabled() {
            return this.enabled;
        }
    }

    /************************************
     * ADVANCED CURSOR SYSTEM
     ************************************/
    
    class AdvancedCursor {
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
            this.injectStyles();
            
            document.body.appendChild(this.cursor);
            document.body.appendChild(this.follower);
            
            // Initialize trail
            for (let i = 0; i < CONFIG.cursor.trailLength; i++) {
                const trailElement = document.createElement('div');
                trailElement.className = 'cursor-trail';
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
                    background: #e67e22;
                    border-radius: 50%;
                    transform: scale(1);
                    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                
                .advanced-cursor-follower {
                    position: fixed;
                    width: 40px;
                    height: 40px;
                    border: 2px solid rgba(230, 126, 34, 0.6);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                
                .advanced-cursor-dot.hover .cursor-inner {
                    background: #3498db;
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
                    background: #e74c3c;
                }
                
                .advanced-cursor-follower.active {
                    transform: scale(0.9);
                }
                
                .advanced-cursor-dot.magnetic .cursor-inner {
                    background: #9b59b6;
                    transform: scale(1.3);
                    box-shadow: 0 0 15px rgba(155, 89, 182, 0.5);
                }
                
                .advanced-cursor-follower.magnetic {
                    border-color: rgba(155, 89, 182, 0.7);
                    transform: scale(1.2);
                }
                
                .advanced-cursor-dot.text .cursor-inner {
                    background: #27ae60;
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
            document.addEventListener('mousemove', Utils.throttle((e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
                this.updateCursorState(e.target);
                this.checkMagneticElements(e);
            }, 16));

            document.addEventListener('mousedown', () => {
                this.cursor.classList.add('active');
                this.follower.classList.add('active');
                SoundManager.play?.('click');
            });

            document.addEventListener('mouseup', () => {
                this.cursor.classList.remove('active');
                this.follower.classList.remove('active');
            });

            document.addEventListener('mouseleave', () => {
                this.cursor.style.opacity = '0';
                this.follower.style.opacity = '0';
                this.trail.forEach(t => t.element.style.opacity = '0');
            });

            document.addEventListener('mouseenter', () => {
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
            const states = ['hover', 'magnetic', 'text'];
            states.forEach(state => {
                this.cursor.classList.remove(state);
                this.follower.classList.remove(state);
            });

            if (target.matches('a, button, .hover-trigger, [role="button"]')) {
                this.cursor.classList.add('hover');
                this.follower.classList.add('hover');
                SoundManager.play?.('hover');
            } else if (target.matches('input[type="text"], input[type="email"], textarea')) {
                this.cursor.classList.add('text');
                this.follower.classList.add('text');
            }
        }

        findMagneticElements() {
            this.magneticElements = Array.from(document.querySelectorAll('.magnetic, .artwork-item, .ticket-card, .support-card'));
        }

        checkMagneticElements(e) {
            let isMagnetic = false;
            
            this.magneticElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Utils.distance(e.clientX, e.clientY, centerX, centerY);
                
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
                if (!this.isActive) return;

                // Update cursor position with easing
                this.cursorPos.x = Utils.lerp(this.cursorPos.x, this.mouse.x, 0.8);
                this.cursorPos.y = Utils.lerp(this.cursorPos.y, this.mouse.y, 0.8);

                // Update follower position with different easing
                this.followerPos.x = Utils.lerp(this.followerPos.x, this.mouse.x, 0.15);
                this.followerPos.y = Utils.lerp(this.followerPos.y, this.mouse.y, 0.15);

                // Apply positions
                this.cursor.style.transform = `translate3d(${this.cursorPos.x - 6}px, ${this.cursorPos.y - 6}px, 0)`;
                this.follower.style.transform = `translate3d(${this.followerPos.x - 20}px, ${this.followerPos.y - 20}px, 0)`;

                // Update trail
                this.updateTrail();

                this.animationId = requestAnimationFrame(animate);
            };

            animate();
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
            this.trail.forEach((trailPoint, index) => {
                const opacity = Math.max(0, 1 - (trailPoint.age / 30));
                trailPoint.element.style.opacity = opacity;
                trailPoint.element.style.transform = `translate3d(${trailPoint.x - 4}px, ${trailPoint.y - 4}px, 0)`;
            });
        }

        destroy() {
            this.isActive = false;
            
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }

            document.body.classList.remove('custom-cursor-active');
            
            [this.cursor, this.follower, ...this.trail.map(t => t.element)].forEach(el => {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            });
        }
    }

    /************************************
     * ADVANCED PRELOADER SYSTEM
     ************************************/
    
    class AdvancedPreloader {
        constructor() {
            this.container = null;
            this.stage = 'language'; // language -> loading -> welcome -> complete
            this.progress = 0;
            this.selectedLanguage = null;
            this.loadingSteps = [
                { progress: 20, message: 'preparing' },
                { progress: 40, message: 'loadingInteractive' },
                { progress: 60, message: 'loadingAssets' },
                { progress: 80, message: 'initializingExperience' },
                { progress: 100, message: 'ready' }
            ];
            this.currentStep = 0;
            this.init();
        }

        init() {
            this.createPreloader();
            this.showLanguageSelection();
        }

        createPreloader() {
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

            this.injectPreloaderStyles();
            document.body.appendChild(this.container);
            this.createFloatingParticles();
        }

        injectPreloaderStyles() {
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
            const stageContainer = this.container.querySelector('.preloader-stage');
            stageContainer.innerHTML = `
                <div class="language-selection">
                    <h2 class="language-title" data-translate="chooseLang">Choose Language</h2>
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
                    <button class="continue-btn" data-translate="continue">Continue</button>
                </div>
            `;

            this.bindLanguageSelection();
        }

        bindLanguageSelection() {
            const langButtons = this.container.querySelectorAll('.language-btn');
            const continueBtn = this.container.querySelector('.continue-btn');

            langButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    langButtons.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    this.selectedLanguage = btn.getAttribute('data-lang');
                    continueBtn.classList.add('enabled');
                    SoundManager.play?.('click');

                    // Update language immediately for better UX
                    if (window.languageManager) {
                        window.languageManager.setLanguage(this.selectedLanguage);
                    }
                });
            });

            continueBtn.addEventListener('click', () => {
                if (this.selectedLanguage) {
                    SoundManager.play?.('transition');
                    this.startLoading();
                }
            });

            // Auto-select stored language or default
            const storedLang = localStorage.getItem('innerGarden_language') || CONFIG.defaultLanguage;
            const defaultBtn = this.container.querySelector(`[data-lang="${storedLang}"]`);
            if (defaultBtn) {
                defaultBtn.click();
            }
        }

        startLoading() {
            this.stage = 'loading';
            const stageContainer = this.container.querySelector('.preloader-stage');
            
            stageContainer.innerHTML = `
                <div class="loading-stage">
                    <div class="loading-percentage">0%</div>
                    <div class="loading-progress">
                        <div class="progress-bar"></div>
                    </div>
                    <div class="loading-text" data-translate="loading">Loading...</div>
                </div>
            `;

            setTimeout(() => {
                stageContainer.querySelector('.loading-stage').classList.add('active');
                this.runLoadingSequence();
            }, 100);
        }

        runLoadingSequence() {
            const progressBar = this.container.querySelector('.progress-bar');
            const percentageEl = this.container.querySelector('.loading-percentage');
            const textEl = this.container.querySelector('.loading-text');

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
                    
                    if (window.languageManager) {
                        textEl.textContent = window.languageManager.t(step.message);
                    }

                    if (Math.abs(this.progress - targetProgress) > 0.5) {
                        requestAnimationFrame(animate);
                    } else {
                        this.progress = targetProgress;
                        progressBar.style.width = this.progress + '%';
                        percentageEl.textContent = this.progress + '%';
                        
                        this.currentStep++;
                        setTimeout(updateProgress, 800);
                    }
                };

                animate();
            };

            updateProgress();
        }

        showWelcome() {
            this.stage = 'welcome';
            const stageContainer = this.container.querySelector('.preloader-stage');
            
            stageContainer.innerHTML = `
                <div class="welcome-stage">
                    <h1 class="welcome-title" data-translate="welcome">Welcome</h1>
                    <p class="welcome-message" data-translate="welcomeMessage">to the magical world of INNER GARDEN</p>
                    <button class="enter-btn" data-translate="enterExhibition">Enter Exhibition</button>
                </div>
            `;

            // Update translations if language manager is available
            if (window.languageManager) {
                window.languageManager.updateAllElements();
            }

            setTimeout(() => {
                stageContainer.querySelector('.welcome-stage').classList.add('active');
                this.bindEnterButton();
            }, 500);
        }

        bindEnterButton() {
            const enterBtn = this.container.querySelector('.enter-btn');
            enterBtn.addEventListener('click', () => {
                SoundManager.play?.('magic');
                this.completePreloader();
            });
        }

        completePreloader() {
            this.stage = 'complete';
            this.container.style.opacity = '0';
            this.container.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                this.container.style.display = 'none';
                document.body.classList.add('preloader-complete');
                
                // Initialize main application
                if (window.initMainApplication) {
                    window.initMainApplication();
                }
                
                // Dispatch custom event
                window.dispatchEvent(new CustomEvent('preloaderComplete', {
                    detail: { selectedLanguage: this.selectedLanguage }
                }));
                
            }, 800);
        }

        destroy() {
            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }
        }
    }

    /************************************
     * ADVANCED INTERACTIVE WALL
     ************************************/
    
    class AdvancedInteractiveWall {
        constructor(container) {
            this.container = container;
            this.messages = [];
            this.particles = [];
            this.canvas = null;
            this.ctx = null;
            this.animationId = null;
            this.interactions = [];
            this.filters = {
                current: 'all',
                available: ['all', 'joyful', 'peaceful', 'inspired', 'contemplative', 'energetic', 'romantic']
            };
            this.animations = {
                current: 'float',
                available: ['float', 'scatter', 'cluster', 'flow', 'spiral', 'wave', 'explode']
            };
            this.isAnimating = false;
            this.soundEnabled = true;
            this.init();
        }

        init() {
            this.createCanvas();
            this.createUI();
            this.bindEvents();
            this.generateSampleMessages();
            this.startAnimation();
            this.createAmbientParticles();
        }

        createCanvas() {
            this.canvas = document.createElement('canvas');
            this.canvas.className = 'wall-canvas';
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
            
            window.addEventListener('resize', Utils.debounce(() => {
                this.resizeCanvas();
            }, 250));
        }

        resizeCanvas() {
            const rect = this.container.getBoundingClientRect();
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        }

        createUI() {
            const controls = this.container.querySelector('.wall-controls') || this.createControls();
            const messageForm = this.container.querySelector('.message-form') || this.createMessageForm();
            
            this.bindControlEvents();
            this.bindFormEvents();
        }

        createControls() {
            const controls = document.createElement('div');
            controls.className = 'wall-controls';
            controls.innerHTML = `
                <div class="wall-filters">
                    ${this.filters.available.map(filter => `
                        <button class="wall-filter ${filter === 'all' ? 'active' : ''}" 
                                data-filter="${filter}" 
                                data-translate="${filter === 'all' ? 'allMessages' : filter}">
                            ${filter}
                        </button>
                    `).join('')}
                </div>
                <div class="wall-animations">
                    ${this.animations.available.map(anim => `
                        <button class="wall-anim-btn" 
                                data-animation="${anim}" 
                                data-translate="${anim}">
                            ${anim}
                        </button>
                    `).join('')}
                </div>
                <div class="wall-settings">
                    <button class="sound-toggle" data-translate="sound">Sound</button>
                    <button class="clear-wall" data-translate="clear">Clear</button>
                </div>
            `;
            
            this.container.appendChild(controls);
            return controls;
        }

        createMessageForm() {
            const formContainer = document.createElement('div');
            formContainer.className = 'advanced-message-form';
            formContainer.innerHTML = `
                <form class="message-form">
                    <h3 data-translate="leaveMessage">Leave Message</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" 
                                   id="message-name" 
                                   placeholder="Your Name" 
                                   data-translate="yourName">
                        </div>
                        <div class="form-group">
                            <select id="message-mood" data-translate="selectMood">
                                <option value="">Select Mood</option>
                                <option value="joyful" data-translate="joy">Joy</option>
                                <option value="peaceful" data-translate="peace">Peace</option>
                                <option value="inspired" data-translate="inspiration">Inspiration</option>
                                <option value="contemplative" data-translate="contemplation">Contemplation</option>
                                <option value="energetic" data-translate="energy">Energy</option>
                                <option value="romantic" data-translate="love">Love</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <textarea id="message-text" 
                                  rows="3" 
                                  maxlength="200" 
                                  placeholder="Share your feelings..."
                                  data-translate="shareFeelings"></textarea>
                        <div class="char-counter">200 <span data-translate="charactersLeft">characters left</span></div>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="preview-btn" data-translate="preview">Preview</button>
                        <button type="submit" class="submit-btn" data-translate="addToWall">Add to Wall</button>
                    </div>
                </form>
                <div class="message-preview hidden">
                    <div class="preview-message"></div>
                    <div class="preview-actions">
                        <button class="edit-btn" data-translate="edit">Edit</button>
                        <button class="confirm-btn" data-translate="confirm">Confirm</button>
                    </div>
                </div>
            `;
            
            this.container.appendChild(formContainer);
            return formContainer;
        }

        bindControlEvents() {
            // Filter buttons
            this.container.querySelectorAll('.wall-filter').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.setFilter(btn.getAttribute('data-filter'));
                    this.updateActiveFilter(btn);
                    SoundManager.play?.('click');
                });
            });

            // Animation buttons
            this.container.querySelectorAll('.wall-anim-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.playAnimation(btn.getAttribute('data-animation'));
                    SoundManager.play?.('whoosh');
                });
            });

            // Settings buttons
            const soundToggle = this.container.querySelector('.sound-toggle');
            if (soundToggle) {
                soundToggle.addEventListener('click', () => {
                    this.soundEnabled = !this.soundEnabled;
                    soundToggle.classList.toggle('disabled', !this.soundEnabled);
                });
            }

            const clearBtn = this.container.querySelector('.clear-wall');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    this.clearWall();
                });
            }
        }

        bindFormEvents() {
            const form = this.container.querySelector('.message-form');
            const textarea = this.container.querySelector('#message-text');
            const charCounter = this.container.querySelector('.char-counter');
            const previewBtn = this.container.querySelector('.preview-btn');
            const submitBtn = this.container.querySelector('.submit-btn');

            // Character counter
            if (textarea && charCounter) {
                textarea.addEventListener('input', () => {
                    const remaining = 200 - textarea.value.length;
                    charCounter.textContent = `${remaining} ${window.languageManager?.t('charactersLeft') || 'characters left'}`;
                    charCounter.style.color = remaining < 20 ? '#e74c3c' : '';
                });
            }

            // Preview functionality
            if (previewBtn) {
                previewBtn.addEventListener('click', () => {
                    this.showPreview();
                });
            }

            // Form submission
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleFormSubmit();
                });
            }

            // Preview actions
            const editBtn = this.container.querySelector('.edit-btn');
            const confirmBtn = this.container.querySelector('.confirm-btn');

            if (editBtn) {
                editBtn.addEventListener('click', () => {
                    this.hidePreview();
                });
            }

            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    this.addMessageToWall();
                });
            }
        }

        showPreview() {
            const formData = this.getFormData();
            if (!this.validateForm(formData)) return;

            const preview = this.container.querySelector('.message-preview');
            const previewMessage = preview.querySelector('.preview-message');
            
            previewMessage.innerHTML = this.createMessageHTML(formData, true);
            preview.classList.remove('hidden');
            
            // Hide form
            this.container.querySelector('.message-form').style.display = 'none';
        }

        hidePreview() {
            const preview = this.container.querySelector('.message-preview');
            const form = this.container.querySelector('.message-form');
            
            preview.classList.add('hidden');
            form.style.display = 'block';
        }

        getFormData() {
            return {
                name: this.container.querySelector('#message-name')?.value || 'Anonymous',
                mood: this.container.querySelector('#message-mood')?.value || 'joyful',
                text: this.container.querySelector('#message-text')?.value || '',
                timestamp: Date.now(),
                id: Utils.StringUtils.generateId()
            };
        }

        validateForm(data) {
            if (!data.text.trim()) {
                this.showNotification(window.languageManager?.t('tooShort') || 'Message too short', 'error');
                return false;
            }
            
            if (data.text.length > 200) {
                this.showNotification('Message too long', 'error');
                return false;
            }
            
            if (!data.mood) {
                this.showNotification(window.languageManager?.t('selectMood') || 'Please select mood', 'error');
                return false;
            }
            
            return true;
        }

        handleFormSubmit() {
            const formData = this.getFormData();
            if (this.validateForm(formData)) {
                this.showPreview();
            }
        }

        addMessageToWall() {
            const formData = this.getFormData();
            this.createMessage(formData);
            this.resetForm();
            this.hidePreview();
            
            SoundManager.play?.('success');
            this.showNotification(
                window.languageManager?.t('messageAdded') || 'Message added to wall!', 
                'success'
            );
        }

        createMessage(data) {
            const message = {
                ...data,
                x: Utils.getRandomFloat(10, 90),
                y: Utils.getRandomFloat(20, 80),
                vx: Utils.getRandomFloat(-0.5, 0.5),
                vy: Utils.getRandomFloat(-0.5, 0.5),
                scale: 1,
                rotation: 0,
                opacity: 0,
                element: null
            };

            message.element = this.createMessageElement(message);
            this.container.appendChild(message.element);
            this.messages.push(message);

            // Animate in
            this.animateMessageIn(message);

            // Clean up old messages if too many
            if (this.messages.length > CONFIG.wall.maxMessages) {
                this.removeOldestMessage();
            }
        }

        createMessageElement(message) {
            const element = document.createElement('div');
            element.className = `wall-message ${message.mood}`;
            element.innerHTML = this.createMessageHTML(message);
            element.style.cssText = `
                position: absolute;
                left: ${message.x}%;
                top: ${message.y}%;
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
                cursor: pointer;
                z-index: 10;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            `;

            // Bind interaction events
            element.addEventListener('click', () => {
                this.interactWithMessage(message);
            });

            element.addEventListener('mouseenter', () => {
                this.highlightMessage(message);
                SoundManager.play?.('hover');
            });

            element.addEventListener('mouseleave', () => {
                this.unhighlightMessage(message);
            });

            return element;
        }

        createMessageHTML(message, isPreview = false) {
            const moodEmojis = {
                joyful: '😊',
                peaceful: '😌',
                inspired: '✨',
                contemplative: '🤔',
                energetic: '⚡',
                romantic: '❤️'
            };

            return `
                <div class="message-content ${isPreview ? 'preview' : ''}">
                    <div class="message-mood-icon">${moodEmojis[message.mood] || '😊'}</div>
                    <p class="message-text">"${message.text}"</p>
                    <span class="message-author">— ${message.name}</span>
                    ${!isPreview ? `<div class="message-time">${this.formatTime(message.timestamp)}</div>` : ''}
                </div>
            `;
        }

        formatTime(timestamp) {
            const now = Date.now();
            const diff = now - timestamp;
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);

            if (minutes < 1) return 'now';
            if (minutes < 60) return `${minutes}m`;
            if (hours < 24) return `${hours}h`;
            return `${days}d`;
        }

        animateMessageIn(message) {
            setTimeout(() => {
                message.element.style.opacity = '1';
                message.element.style.transform = 'translate(-50%, -50%) scale(1)';
                message.opacity = 1;
                message.scale = 1;
            }, 100);
        }

        interactWithMessage(message) {
            this.createInteractionEffect(message);
            this.createParticleBurst(message.x, message.y, message.mood);
            SoundManager.play?.('magic');
        }

        highlightMessage(message) {
            message.element.style.transform = 'translate(-50%, -50%) scale(1.1)';
            message.element.style.zIndex = '20';
        }

        unhighlightMessage(message) {
            message.element.style.transform = 'translate(-50%, -50%) scale(1)';
            message.element.style.zIndex = '10';
        }

        createInteractionEffect(message) {
            const effect = {
                x: message.x,
                y: message.y,
                radius: 0,
                maxRadius: 50,
                opacity: 1,
                color: this.getMoodColor(message.mood)
            };

            this.interactions.push(effect);

            const animate = () => {
                effect.radius += 2;
                effect.opacity -= 0.02;

                if (effect.radius < effect.maxRadius && effect.opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    const index = this.interactions.indexOf(effect);
                    if (index > -1) this.interactions.splice(index, 1);
                }
            };

            animate();
        }

        getMoodColor(mood) {
            const colors = {
                joyful: '#f39c12',
                peaceful: '#3498db',
                inspired: '#e74c3c',
                contemplative: '#9b59b6',
                energetic: '#e67e22',
                romantic: '#e91e63'
            };
            return colors[mood] || '#95a5a6';
        }

        createParticleBurst(x, y, mood) {
            const particleCount = 12;
            const color = this.getMoodColor(mood);

            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 * i) / particleCount;
                const velocity = Utils.getRandomFloat(2, 5);
                
                const particle = {
                    x: (x / 100) * this.canvas.width,
                    y: (y / 100) * this.canvas.height,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity,
                    life: 1,
                    decay: Utils.getRandomFloat(0.02, 0.04),
                    size: Utils.getRandomFloat(2, 4),
                    color: color
                };

                this.particles.push(particle);
            }
        }

        setFilter(filter) {
            this.filters.current = filter;
            this.applyFilter();
        }

        applyFilter() {
            this.messages.forEach(message => {
                const shouldShow = this.filters.current === 'all' || message.mood === this.filters.current;
                message.element.style.opacity = shouldShow ? '1' : '0.3';
                message.element.style.transform = shouldShow ? 
                    'translate(-50%, -50%) scale(1)' : 
                    'translate(-50%, -50%) scale(0.8)';
            });
        }

        updateActiveFilter(activeBtn) {
            this.container.querySelectorAll('.wall-filter').forEach(btn => {
                btn.classList.remove('active');
            });
            activeBtn.classList.add('active');
        }

        playAnimation(animationType) {
            if (this.isAnimating) return;
            
            this.isAnimating = true;
            this.animations.current = animationType;

            switch (animationType) {
                case 'scatter':
                    this.scatterAnimation();
                    break;
                case 'cluster':
                    this.clusterAnimation();
                    break;
                case 'flow':
                    this.flowAnimation();
                    break;
                case 'spiral':
                    this.spiralAnimation();
                    break;
                case 'wave':
                    this.waveAnimation();
                    break;
                case 'explode':
                    this.explodeAnimation();
                    break;
                default:
                    this.floatAnimation();
            }

            setTimeout(() => {
                this.isAnimating = false;
            }, 3000);
        }

        scatterAnimation() {
            this.messages.forEach((message, index) => {
                setTimeout(() => {
                    const newX = Utils.getRandomFloat(5, 95);
                    const newY = Utils.getRandomFloat(15, 85);
                    const rotation = Utils.getRandomFloat(-15, 15);
                    
                    message.element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    message.element.style.left = newX + '%';
                    message.element.style.top = newY + '%';
                    message.element.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
                    
                    message.x = newX;
                    message.y = newY;
                    message.rotation = rotation;
                }, index * 100);
            });
        }

        clusterAnimation() {
            const centerX = 50;
            const centerY = 50;
            const radius = 20;

            this.messages.forEach((message, index) => {
                const angle = (Math.PI * 2 * index) / this.messages.length;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                setTimeout(() => {
                    message.element.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    message.element.style.left = x + '%';
                    message.element.style.top = y + '%';
                    message.element.style.transform = 'translate(-50%, -50%) scale(0.9)';
                    
                    message.x = x;
                    message.y = y;
                }, index * 150);
            });
        }

        flowAnimation() {
            this.messages.forEach((message, index) => {
                const amplitude = 10;
                const frequency = 0.02;
                const baseY = message.y;

                const animate = (time) => {
                    const offset = Math.sin(time * frequency + index) * amplitude;
                    message.element.style.top = (baseY + offset) + '%';
                    
                    if (this.isAnimating && this.animations.current === 'flow') {
                        requestAnimationFrame(animate);
                    }
                };

                requestAnimationFrame(animate);
            });
        }

        spiralAnimation() {
            const centerX = 50;
            const centerY = 50;
            let angle = 0;

            this.messages.forEach((message, index) => {
                const radius = 5 + index * 3;
                
                const animate = () => {
                    const x = centerX + Math.cos(angle + index * 0.5) * radius;
                    const y = centerY + Math.sin(angle + index * 0.5) * radius;
                    
                    message.element.style.left = x + '%';
                    message.element.style.top = y + '%';
                    message.element.style.transform = `translate(-50%, -50%) rotate(${angle * 10}deg)`;
                    
                    message.x = x;
                    message.y = y;
                    message.rotation = angle * 10;
                };

                const spiralLoop = () => {
                    animate();
                    angle += 0.05;
                    
                    if (this.isAnimating && this.animations.current === 'spiral') {
                        requestAnimationFrame(spiralLoop);
                    }
                };

                spiralLoop();
            });
        }

        waveAnimation() {
            const startTime = Date.now();
            
            const animate = () => {
                const elapsed = (Date.now() - startTime) / 1000;
                
                this.messages.forEach((message, index) => {
                    const waveOffset = Math.sin(elapsed * 2 + index * 0.5) * 15;
                    const x = 10 + (index / this.messages.length) * 80;
                    const y = 50 + waveOffset;
                    
                    message.element.style.left = x + '%';
                    message.element.style.top = y + '%';
                    message.element.style.transform = `translate(-50%, -50%) rotate(${waveOffset}deg)`;
                    
                    message.x = x;
                    message.y = y;
                });
                
                if (this.isAnimating && this.animations.current === 'wave') {
                    requestAnimationFrame(animate);
                }
            };

            animate();
        }

        explodeAnimation() {
            const centerX = 50;
            const centerY = 50;

            this.messages.forEach((message, index) => {
                const angle = (Math.PI * 2 * index) / this.messages.length;
                const distance = Utils.getRandomFloat(30, 60);
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;

                // First, bring all messages to center
                message.element.style.transition = 'all 0.5s ease-in';
                message.element.style.left = centerX + '%';
                message.element.style.top = centerY + '%';
                message.element.style.transform = 'translate(-50%, -50%) scale(0.5)';

                // Then explode outward
                setTimeout(() => {
                    message.element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    message.element.style.left = x + '%';
                    message.element.style.top = y + '%';
                    message.element.style.transform = `translate(-50%, -50%) scale(1.2) rotate(${Utils.getRandomFloat(-180, 180)}deg)`;
                    
                    message.x = x;
                    message.y = y;
                }, 500);

                // Return to normal
                setTimeout(() => {
                    message.element.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
                }, 1300);
            });
        }

        floatAnimation() {
            this.messages.forEach((message) => {
                const animate = () => {
                    message.vx += Utils.getRandomFloat(-0.01, 0.01);
                    message.vy += Utils.getRandomFloat(-0.01, 0.01);
                    
                    // Apply velocity damping
                    message.vx *= 0.99;
                    message.vy *= 0.99;
                    
                    // Update position
                    message.x += message.vx;
                    message.y += message.vy;
                    
                    // Boundary bounce
                    if (message.x < 5 || message.x > 95) message.vx *= -0.8;
                    if (message.y < 10 || message.y > 90) message.vy *= -0.8;
                    
                    // Clamp position
                    message.x = Utils.clamp(message.x, 5, 95);
                    message.y = Utils.clamp(message.y, 10, 90);
                    
                    // Apply to element
                    message.element.style.left = message.x + '%';
                    message.element.style.top = message.y + '%';
                };

                // Random float intervals for organic movement
                setInterval(animate, 16 + Math.random() * 32);
            });
        }

        startAnimation() {
            const animate = () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                // Draw interaction effects
                this.interactions.forEach(interaction => {
                    this.ctx.beginPath();
                    this.ctx.arc(
                        (interaction.x / 100) * this.canvas.width,
                        (interaction.y / 100) * this.canvas.height,
                        interaction.radius,
                        0,
                        Math.PI * 2
                    );
                    this.ctx.strokeStyle = interaction.color + Math.floor(interaction.opacity * 255).toString(16).padStart(2, '0');
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                });

                // Update and draw particles
                this.particles = this.particles.filter(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.life -= particle.decay;
                    particle.vy += 0.1; // gravity

                    if (particle.life > 0) {
                        this.ctx.beginPath();
                        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                        this.ctx.fillStyle = particle.color + Math.floor(particle.life * 255).toString(16).padStart(2, '0');
                        this.ctx.fill();
                        return true;
                    }
                    return false;
                });

                this.animationId = requestAnimationFrame(animate);
            };

            animate();
        }

        createAmbientParticles() {
            setInterval(() => {
                if (Math.random() < CONFIG.wall.particleDensity) {
                    const particle = {
                        x: Math.random() * this.canvas.width,
                        y: this.canvas.height + 10,
                        vx: Utils.getRandomFloat(-0.5, 0.5),
                        vy: Utils.getRandomFloat(-2, -0.5),
                        life: 1,
                        decay: 0.005,
                        size: Utils.getRandomFloat(1, 3),
                        color: '#ffffff'
                    };
                    
                    this.particles.push(particle);
                }
            }, 2000);
        }

        generateSampleMessages() {
            const sampleMessages = [
                { name: 'Марія', text: 'Цей простір наповнює мене спокоєм і натхненням', mood: 'peaceful' },
                { name: 'Олексій', text: 'Неймовірна енергетика! Відчуваю прилив творчих сил', mood: 'energetic' },
                { name: 'Софія', text: 'Кожна робота розповідає свою унікальну історію', mood: 'contemplative' },
                { name: 'Андрій', text: 'Мистецтво, що торкається душі та розкриває серце', mood: 'romantic' },
                { name: 'Катерина', text: 'Відчуваю глибокий зв\'язок з природою через ці образи', mood: 'inspired' },
                { name: 'Anonymous', text: 'Дякую за цей дивовижний досвід!', mood: 'joyful' }
            ];

            sampleMessages.forEach((msg, index) => {
                setTimeout(() => {
                    this.createMessage({
                        ...msg,
                        timestamp: Date.now() - Math.random() * 3600000,
                        id: Utils.StringUtils.generateId()
                    });
                }, index * 1000);
            });
        }

        clearWall() {
            if (!confirm('Are you sure you want to clear all messages?')) return;
            
            this.messages.forEach(message => {
                message.element.style.transition = 'all 0.5s ease-in';
                message.element.style.opacity = '0';
                message.element.style.transform = 'translate(-50%, -50%) scale(0)';
                
                setTimeout(() => {
                    if (message.element.parentNode) {
                        message.element.parentNode.removeChild(message.element);
                    }
                }, 500);
            });

            this.messages = [];
            this.particles = [];
            this.interactions = [];
        }

        removeOldestMessage() {
            if (this.messages.length === 0) return;
            
            const oldest = this.messages[0];
            oldest.element.style.transition = 'all 0.5s ease-in';
            oldest.element.style.opacity = '0';
            oldest.element.style.transform = 'translate(-50%, -50%) scale(0)';
            
            setTimeout(() => {
                if (oldest.element.parentNode) {
                    oldest.element.parentNode.removeChild(oldest.element);
                }
            }, 500);

            this.messages.shift();
        }

        resetForm() {
            const form = this.container.querySelector('.message-form');
            if (form) {
                form.reset();
                const charCounter = this.container.querySelector('.char-counter');
                if (charCounter) {
                    charCounter.textContent = '200 characters left';
                    charCounter.style.color = '';
                }
            }
        }

        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `wall-notification ${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                transform: translateX(100%);
                animation: slideIn 0.3s ease forwards;
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
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }

        destroy() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            
            this.messages.forEach(message => {
                if (message.element.parentNode) {
                    message.element.parentNode.removeChild(message.element);
                }
            });

            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
        }
    }

    /************************************
     * 3D VIRTUAL TOUR SYSTEM
     ************************************/
    
    class Virtual3DTour {
        constructor(container) {
            this.container = container;
            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.controls = null;
            this.currentRoom = 0;
            this.rooms = [];
            this.artworks = [];
            this.isVR = false;
            this.loadingManager = null;
            this.raycaster = null;
            this.mouse = new THREE.Vector2();
            this.intersects = [];
            this.init();
        }

        init() {
            this.createUI();
            this.initThreeJS();
            this.createRooms();
            this.createLighting();
            this.bindEvents();
            this.startAnimation();
        }

        createUI() {
            const ui = document.createElement('div');
            ui.className = 'tour-ui';
            ui.innerHTML = `
                <div class="tour-controls">
                    <button class="tour-btn" id="start-tour" data-translate="start3DTour">Start 3D Tour</button>
                    <button class="tour-btn" id="toggle-vr" data-translate="enterVR">Enter VR</button>
                    <div class="room-selector">
                        <button class="room-btn active" data-room="0" data-translate="room1">Nature Room</button>
                        <button class="room-btn" data-room="1" data-translate="room2">Emotional Space</button>
                        <button class="room-btn" data-room="2" data-translate="room3">Memory Hall</button>
                        <button class="room-btn" data-room="3" data-translate="room4">Interactive Zone</button>
                    </div>
                    <div class="tour-info">
                        <div class="controls-help" data-translate="moveInstructions">Use WASD or arrow keys to move</div>
                        <div class="interaction-help" data-translate="clickToInteract">Click to interact</div>
                    </div>
                </div>
                <div class="tour-viewer">
                    <div class="loading-overlay">
                        <div class="loading-spinner"></div>
                        <div class="loading-text">Loading 3D Environment...</div>
                    </div>
                </div>
            `;
            
            this.container.appendChild(ui);
            this.viewer = ui.querySelector('.tour-viewer');
        }

        initThreeJS() {
            // Scene
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x000000);

            // Camera
            this.camera = new THREE.PerspectiveCamera(
                75,
                this.viewer.clientWidth / this.viewer.clientHeight,
                0.1,
                1000
            );
            this.camera.position.set(0, 1.6, 5);

            // Renderer
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(this.viewer.clientWidth, this.viewer.clientHeight);
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.viewer.appendChild(this.renderer.domElement);

            // Controls
            this.controls = new THREE.PointerLockControls(this.camera, this.renderer.domElement);
            
            // Raycaster for interactions
            this.raycaster = new THREE.Raycaster();

            // Loading manager
            this.loadingManager = new THREE.LoadingManager();
            this.loadingManager.onLoad = () => {
                this.hideLoading();
            };

            // Handle window resize
            window.addEventListener('resize', () => {
                this.handleResize();
            });
        }

        createRooms() {
            // Room geometries and materials
            const roomGeometry = new THREE.BoxGeometry(20, 10, 20);
            const roomMaterials = [
                new THREE.MeshLambertMaterial({ color: 0x8fbc8f }), // Nature - Green
                new THREE.MeshLambertMaterial({ color: 0x4682b4 }), // Emotional - Blue
                new THREE.MeshLambertMaterial({ color: 0xdda0dd }), // Memory - Purple
                new THREE.MeshLambertMaterial({ color: 0xf0e68c })  // Interactive - Yellow
            ];

            const roomData = [
                { name: 'Nature Room', color: 0x8fbc8f, artworks: this.createNatureArtworks() },
                { name: 'Emotional Space', color: 0x4682b4, artworks: this.createEmotionalArtworks() },
                { name: 'Memory Hall', color: 0xdda0dd, artworks: this.createMemoryArtworks() },
                { name: 'Interactive Zone', color: 0xf0e68c, artworks: this.createInteractiveArtworks() }
            ];

            roomData.forEach((data, index) => {
                const room = new THREE.Group();
                room.name = data.name;

                // Floor
                const floorGeometry = new THREE.PlaneGeometry(20, 20);
                const floorMaterial = new THREE.MeshLambertMaterial({ 
                    color: new THREE.Color(data.color).multiplyScalar(0.3) 
                });
                const floor = new THREE.Mesh(floorGeometry, floorMaterial);
                floor.rotation.x = -Math.PI / 2;
                floor.receiveShadow = true;
                room.add(floor);

                // Walls
                this.createWalls(room, data.color);

                // Artworks
                data.artworks.forEach(artwork => {
                    room.add(artwork);
                });

                // Position rooms
                room.position.x = index * 25;
                this.scene.add(room);
                this.rooms.push(room);
            });
        }

        createWalls(room, color) {
            const wallGeometry = new THREE.PlaneGeometry(20, 10);
            const wallMaterial = new THREE.MeshLambertMaterial({ 
                color: new THREE.Color(color).multiplyScalar(0.8) 
            });

            // North wall
            const northWall = new THREE.Mesh(wallGeometry, wallMaterial);
            northWall.position.set(0, 5, -10);
            northWall.castShadow = true;
            room.add(northWall);

            // South wall
            const southWall = new THREE.Mesh(wallGeometry, wallMaterial);
            southWall.position.set(0, 5, 10);
            southWall.rotation.y = Math.PI;
            southWall.castShadow = true;
            room.add(southWall);

            // East wall
            const eastWall = new THREE.Mesh(wallGeometry, wallMaterial);
            eastWall.position.set(10, 5, 0);
            eastWall.rotation.y = -Math.PI / 2;
            eastWall.castShadow = true;
            room.add(eastWall);

            // West wall
            const westWall = new THREE.Mesh(wallGeometry, wallMaterial);
            westWall.position.set(-10, 5, 0);
            westWall.rotation.y = Math.PI / 2;
            westWall.castShadow = true;
            room.add(westWall);
        }

        createNatureArtworks() {
            const artworks = [];
            
            // Create nature-themed artwork representations
            for (let i = 0; i < 6; i++) {
                const artwork = this.createArtworkFrame();
                artwork.position.set(
                    -8 + (i % 3) * 8,
                    3,
                    -9.5 + Math.floor(i / 3) * 19
                );
                artwork.userData = {
                    title: `Nature Artwork ${i + 1}`,
                    description: 'A beautiful representation of nature\'s harmony',
                    type: 'nature'
                };
                artworks.push(artwork);
            }

            return artworks;
        }

        createEmotionalArtworks() {
            const artworks = [];
            
            for (let i = 0; i < 8; i++) {
                const artwork = this.createArtworkFrame();
                const angle = (i / 8) * Math.PI * 2;
                artwork.position.set(
                    Math.cos(angle) * 7,
                    2 + Math.sin(i) * 2,
                    Math.sin(angle) * 7
                );
                artwork.lookAt(0, artwork.position.y, 0);
                artwork.userData = {
                    title: `Emotional Piece ${i + 1}`,
                    description: 'An exploration of human emotions',
                    type: 'emotional'
                };
                artworks.push(artwork);
            }

            return artworks;
        }

        createMemoryArtworks() {
            const artworks = [];
            
            for (let i = 0; i < 10; i++) {
                const artwork = this.createArtworkFrame();
                artwork.position.set(
                    -9 + (i % 5) * 4.5,
                    1.5 + Math.random() * 3,
                    -8 + Math.floor(i / 5) * 16
                );
                artwork.rotation.y = (Math.random() - 0.5) * 0.5;
                artwork.userData = {
                    title: `Memory Fragment ${i + 1}`,
                    description: 'Capturing moments in time',
                    type: 'memory'
                };
                artworks.push(artwork);
            }

            return artworks;
        }

        createInteractiveArtworks() {
            const artworks = [];
            
            // Create interactive installations
            for (let i = 0; i < 4; i++) {
                const installation = new THREE.Group();
                
                // Base
                const baseGeometry = new THREE.CylinderGeometry(1, 1, 0.2);
                const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
                const base = new THREE.Mesh(baseGeometry, baseMaterial);
                installation.add(base);

                // Interactive element
                const elementGeometry = new THREE.SphereGeometry(0.5);
                const elementMaterial = new THREE.MeshLambertMaterial({ 
                    color: new THREE.Color().setHSL(i * 0.25, 0.7, 0.5),
                    emissive: new THREE.Color().setHSL(i * 0.25, 0.3, 0.1)
                });
                const element = new THREE.Mesh(elementGeometry, elementMaterial);
                element.position.y = 1;
                installation.add(element);

                installation.position.set(
                    -6 + (i % 2) * 12,
                    0.1,
                    -6 + Math.floor(i / 2) * 12
                );

                installation.userData = {
                    title: `Interactive Installation ${i + 1}`,
                    description: 'Touch to activate',
                    type: 'interactive',
                    interactive: true
                };

                artworks.push(installation);
            }

            return artworks;
        }

        createArtworkFrame() {
            const frame = new THREE.Group();
            
            // Frame
            const frameGeometry = new THREE.BoxGeometry(3, 2, 0.1);
            const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
            const frameModel = new THREE.Mesh(frameGeometry, frameMaterial);
            frameModel.castShadow = true;
            frame.add(frameModel);

            // Canvas
            const canvasGeometry = new THREE.PlaneGeometry(2.6, 1.6);
            const canvasMaterial = new THREE.MeshLambertMaterial({ 
                color: new THREE.Color().setHSL(Math.random(), 0.7, 0.8) 
            });
            const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
            canvas.position.z = 0.051;
            frame.add(canvas);

            return frame;
        }

        createLighting() {
            // Ambient light
            const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
            this.scene.add(ambientLight);

            // Directional light
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(10, 10, 5);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 2048;
            directionalLight.shadow.mapSize.height = 2048;
            this.scene.add(directionalLight);

            // Point lights in each room
            this.rooms.forEach((room, index) => {
                const pointLight = new THREE.PointLight(0xffffff, 0.8, 20);
                pointLight.position.set(index * 25, 8, 0);
                pointLight.castShadow = true;
                this.scene.add(pointLight);
            });
        }

        bindEvents() {
            // Start tour button
            const startBtn = this.container.querySelector('#start-tour');
            startBtn.addEventListener('click', () => {
                this.startTour();
            });

            // VR toggle
            const vrBtn = this.container.querySelector('#toggle-vr');
            vrBtn.addEventListener('click', () => {
                this.toggleVR();
            });

            // Room navigation
            const roomButtons = this.container.querySelectorAll('.room-btn');
            roomButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const roomIndex = parseInt(btn.getAttribute('data-room'));
                    this.goToRoom(roomIndex);
                    this.updateActiveRoom(btn);
                });
            });

            // Mouse interactions
            this.renderer.domElement.addEventListener('click', (event) => {
                this.handleClick(event);
            });

            this.renderer.domElement.addEventListener('mousemove', (event) => {
                this.handleMouseMove(event);
            });

            // Keyboard controls
            document.addEventListener('keydown', (event) => {
                this.handleKeyDown(event);
            });

            document.addEventListener('keyup', (event) => {
                this.handleKeyUp(event);
            });
        }

        startTour() {
            this.controls.lock();
            this.container.querySelector('.tour-controls').style.display = 'block';
            SoundManager.play?.('transition');
        }

        toggleVR() {
            if (!this.isVR) {
                // Enter VR mode
                if (navigator.xr) {
                    navigator.xr.requestSession('immersive-vr').then(session => {
                        this.renderer.xr.setSession(session);
                        this.isVR = true;
                        this.container.querySelector('#toggle-vr').textContent = 
                            window.languageManager?.t('exitVR') || 'Exit VR';
                    }).catch(err => {
                        console.warn('VR not available:', err);
                        this.showVRFallback();
                    });
                } else {
                    this.showVRFallback();
                }
            } else {
                // Exit VR mode
                this.renderer.xr.getSession()?.end();
                this.isVR = false;
                this.container.querySelector('#toggle-vr').textContent = 
                    window.languageManager?.t('enterVR') || 'Enter VR';
            }
        }

        showVRFallback() {
            // Create fullscreen stereoscopic view as VR fallback
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(this.renderer.domElement);
            this.renderer.domElement.style.position = 'fixed';
            this.renderer.domElement.style.top = '0';
            this.renderer.domElement.style.left = '0';
            this.renderer.domElement.style.zIndex = '999999';
            
            // Add exit button
            const exitBtn = document.createElement('button');
            exitBtn.textContent = 'Exit Fullscreen VR';
            exitBtn.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000000;
                padding: 10px 20px;
                background: rgba(0,0,0,0.8);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            `;
            
            exitBtn.addEventListener('click', () => {
                document.body.removeChild(this.renderer.domElement);
                document.body.removeChild(exitBtn);
                this.viewer.appendChild(this.renderer.domElement);
                this.handleResize();
            });
            
            document.body.appendChild(exitBtn);
        }

        goToRoom(roomIndex) {
            if (roomIndex < 0 || roomIndex >= this.rooms.length) return;
            
            this.currentRoom = roomIndex;
            
            // Animate camera to new room
            const targetPosition = new THREE.Vector3(roomIndex * 25, 1.6, 5);
            const startPosition = this.camera.position.clone();
            const duration = 2000;
            const startTime = Date.now();

            const animateTransition = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = Utils.Easing.easeInOutCubic(progress);

                this.camera.position.lerpVectors(startPosition, targetPosition, easedProgress);

                if (progress < 1) {
                    requestAnimationFrame(animateTransition);
                } else {
                    SoundManager.play?.('success');
                }
            };

            animateTransition();
        }

        updateActiveRoom(activeBtn) {
            this.container.querySelectorAll('.room-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            activeBtn.classList.add('active');
        }

        handleClick(event) {
            const rect = this.renderer.domElement.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.scene.children, true);

            if (intersects.length > 0) {
                const object = intersects[0].object;
                const artwork = this.findArtworkParent(object);
                
                if (artwork && artwork.userData) {
                    this.showArtworkInfo(artwork.userData);
                    SoundManager.play?.('click');
                    
                    if (artwork.userData.interactive) {
                        this.triggerInteractiveEffect(artwork);
                    }
                }
            }
        }

        handleMouseMove(event) {
            const rect = this.renderer.domElement.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.scene.children, true);

            // Update cursor style
            if (intersects.length > 0) {
                const object = intersects[0].object;
                const artwork = this.findArtworkParent(object);
                
                if (artwork && artwork.userData) {
                    this.renderer.domElement.style.cursor = 'pointer';
                } else {
                    this.renderer.domElement.style.cursor = 'default';
                }
            } else {
                this.renderer.domElement.style.cursor = 'default';
            }
        }

        findArtworkParent(object) {
            let parent = object;
            while (parent) {
                if (parent.userData && (parent.userData.title || parent.userData.interactive)) {
                    return parent;
                }
                parent = parent.parent;
            }
            return null;
        }

        showArtworkInfo(userData) {
            // Create info panel
            const infoPanel = document.createElement('div');
            infoPanel.className = 'artwork-info-panel';
            infoPanel.innerHTML = `
                <div class="info-content">
                    <h3>${userData.title}</h3>
                    <p>${userData.description}</p>
                    <button class="close-info">×</button>
                </div>
            `;

            infoPanel.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 2rem;
                border-radius: 10px;
                z-index: 10000;
                max-width: 400px;
                animation: fadeIn 0.3s ease;
            `;

            document.body.appendChild(infoPanel);

            // Close button
            infoPanel.querySelector('.close-info').addEventListener('click', () => {
                document.body.removeChild(infoPanel);
            });

            // Auto close after 5 seconds
            setTimeout(() => {
                if (document.body.contains(infoPanel)) {
                    document.body.removeChild(infoPanel);
                }
            }, 5000);
        }

        triggerInteractiveEffect(artwork) {
            // Create particle effect
            const particleCount = 20;
            const particles = new THREE.Group();

            for (let i = 0; i < particleCount; i++) {
                const particle = new THREE.Mesh(
                    new THREE.SphereGeometry(0.02),
                    new THREE.MeshBasicMaterial({ 
                        color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6) 
                    })
                );

                particle.position.copy(artwork.position);
                particle.position.add(new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                ));

                particle.userData = {
                    velocity: new THREE.Vector3(
                        (Math.random() - 0.5) * 0.1,
                        Math.random() * 0.1,
                        (Math.random() - 0.5) * 0.1
                    ),
                    life: 1.0
                };

                particles.add(particle);
            }

            this.scene.add(particles);

            // Animate particles
            const animateParticles = () => {
                let activeParticles = 0;

                particles.children.forEach(particle => {
                    if (particle.userData.life > 0) {
                        particle.position.add(particle.userData.velocity);
                        particle.userData.velocity.y -= 0.002; // gravity
                        particle.userData.life -= 0.02;
                        particle.material.opacity = particle.userData.life;
                        activeParticles++;
                    }
                });

                if (activeParticles > 0) {
                    requestAnimationFrame(animateParticles);
                } else {
                    this.scene.remove(particles);
                }
            };

            animateParticles();
        }

        handleKeyDown(event) {
            // Handle WASD movement when controls are locked
            if (this.controls.isLocked) {
                switch (event.code) {
                    case 'KeyW':
                    case 'ArrowUp':
                        this.moveForward = true;
                        break;
                    case 'KeyS':
                    case 'ArrowDown':
                        this.moveBackward = true;
                        break;
                    case 'KeyA':
                    case 'ArrowLeft':
                        this.moveLeft = true;
                        break;
                    case 'KeyD':
                    case 'ArrowRight':
                        this.moveRight = true;
                        break;
                }
            }
        }

        handleKeyUp(event) {
            switch (event.code) {
                case 'KeyW':
                case 'ArrowUp':
                    this.moveForward = false;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.moveBackward = false;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.moveLeft = false;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.moveRight = false;
                    break;
            }
        }

        updateMovement() {
            const direction = new THREE.Vector3();
            const rotation = new THREE.Euler(0, 0, 0, 'YXZ');
            
            if (this.controls.isLocked) {
                rotation.setFromQuaternion(this.camera.quaternion);
                
                if (this.moveForward) direction.z -= 1;
                if (this.moveBackward) direction.z += 1;
                if (this.moveLeft) direction.x -= 1;
                if (this.moveRight) direction.x += 1;
                
                direction.normalize();
                direction.applyEuler(rotation);
                direction.y = 0; // Prevent flying
                
                const speed = 0.1;
                this.camera.position.add(direction.multiplyScalar(speed));
                
                // Keep camera at reasonable height
                this.camera.position.y = Math.max(1.6, this.camera.position.y);
            }
        }

        startAnimation() {
            const animate = () => {
                requestAnimationFrame(animate);
                
                this.updateMovement();
                
                // Animate interactive installations
                this.rooms[3]?.children.forEach(child => {
                    if (child.userData && child.userData.interactive) {
                        child.rotation.y += 0.01;
                        const element = child.children[1]; // The sphere
                        if (element) {
                            element.position.y = 1 + Math.sin(Date.now() * 0.003) * 0.2;
                        }
                    }
                });
                
                this.renderer.render(this.scene, this.camera);
            };
            
            animate();
        }

        handleResize() {
            const width = this.viewer.clientWidth;
            const height = this.viewer.clientHeight;
            
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }

        hideLoading() {
            const overlay = this.container.querySelector('.loading-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 500);
            }
        }

        destroy() {
            if (this.renderer) {
                this.renderer.dispose();
            }
            
            if (this.scene) {
                this.scene.traverse((object) => {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(material => material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                });
            }
        }
    }

    /************************************
     * POPUP SYSTEM
     ************************************/
    
    class PopupSystem {
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

            SoundManager.play?.('transition');
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

            SoundManager.play?.('click');
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

    /************************************
     * MAIN APPLICATION MANAGER
     ************************************/
    
    class InnerGardenApp {
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

            // Initialize other systems
            this.initNavigation();
            this.initGallery();
            this.initEvents();
            this.initTickets();
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
                });
            }

            // Sound toggle
            const soundToggle = document.getElementById('sound-toggle');
            if (soundToggle) {
                soundToggle.addEventListener('click', () => {
                    const isEnabled = this.modules.soundManager.toggle();
                    soundToggle.querySelector('span').textContent = isEnabled ? '🎧' : '🔇';
                    
                    this.showNotification(
                        isEnabled ? 
                        this.modules.languageManager.t('soundOn') : 
                        this.modules.languageManager.t('soundOff')
                    );
                });
            }
        }

        initGallery() {
            const galleryFilters = document.querySelectorAll('.gallery-filter');
            const galleryItems = document.querySelectorAll('.artwork-item');

            galleryFilters.forEach(filter => {
                filter.addEventListener('click', () => {
                    const category = filter.getAttribute('data-filter');
                    
                    // Update active filter
                    galleryFilters.forEach(f => f.classList.remove('active'));
                    filter.classList.add('active');
                    
                    // Filter items
                    galleryItems.forEach(item => {
                        const categories = item.getAttribute('data-categories')?.split(' ') || [];
                        const shouldShow = category === 'all' || categories.includes(category);
                        
                        item.style.opacity = shouldShow ? '1' : '0.3';
                        item.style.transform = shouldShow ? 'scale(1)' : 'scale(0.95)';
                    });
                    
                    this.modules.soundManager.play('click');
                });
            });

            // Artwork interactions
            galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    this.showArtworkDetails(item);
                });
            });
        }

        showArtworkDetails(item) {
            const title = item.querySelector('.artwork-title')?.textContent || 'Artwork';
            const medium = item.querySelector('.artwork-medium')?.textContent || 'Mixed Media';
            
            this.modules.popupSystem.show({
                title: title,
                subtitle: medium,
                content: `
                    <div class="artwork-details">
                        <div class="artwork-image-large" style="width: 100%; height: 300px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; margin-bottom: 2rem;">🎨</div>
                        <p>This artwork explores the intersection of emotion and nature, creating a dialogue between inner feelings and outer expressions. The artist uses a unique technique that combines traditional methods with modern digital elements.</p>
                        <p>Created as part of the INNER GARDEN collection, this piece invites viewers to reflect on their own emotional landscapes and find connections with the natural world.</p>
                        <div class="artwork-metadata" style="margin-top: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                            <p><strong>Year:</strong> 2024</p>
                            <p><strong>Dimensions:</strong> 120 × 90 cm</p>
                            <p><strong>Technique:</strong> Mixed media on canvas</p>
                            <p><strong>Collection:</strong> INNER GARDEN Series</p>
                        </div>
                    </div>
                `,
                maxWidth: '700px',
                buttons: [
                    { text: 'Close', class: 'popup-btn-primary' }
                ]
            });
            
            this.modules.soundManager.play('magic');
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
                        <div class="event-info" style="margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 10px;">
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

        initTickets() {
            const ticketButtons = document.querySelectorAll('.ticket-btn');
            
            ticketButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const ticketType = btn.getAttribute('data-ticket') || 'standard';
                    this.showTicketPurchase(ticketType);
                });
            });
        }

        showTicketPurchase(ticketType) {
            const ticketTypes = {
                standard: { name: 'Standard', price: 150 },
                premium: { name: 'Premium', price: 250 },
                vip: { name: 'VIP', price: 450 },
                family: { name: 'Family Pack', price: 500 },
                student: { name: 'Student', price: 100 }
            };
            
            const ticket = ticketTypes[ticketType] || ticketTypes.standard;
            
            this.modules.popupSystem.show({
                title: `Purchase ${ticket.name} Ticket`,
                subtitle: `${ticket.price} UAH`,
                content: `
                    <div class="ticket-purchase">
                        <div class="ticket-summary" style="margin-bottom: 2rem; padding: 1.5rem; background: #f8f9fa; border-radius: 10px;">
                            <h3>${ticket.name} Ticket</h3>
                            <p class="price" style="font-size: 2rem; color: #e67e22; font-weight: bold;">${ticket.price} UAH</p>
                            <div class="ticket-features">
                                <p>✓ Access to all exhibitions</p>
                                <p>✓ Interactive wall access</p>
                                <p>✓ Audio guide included</p>
                                ${ticket.name !== 'Standard' ? '<p>✓ Priority booking for events</p>' : ''}
                                ${ticket.name === 'VIP' ? '<p>✓ Private tour with curator</p>' : ''}
                            </div>
                        </div>
                        
                        <form class="purchase-form">
                            <h3>Personal Information</h3>
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
                            
                            <h3 style="margin-top: 2rem;">Payment Method</h3>
                            <div class="payment-methods">
                                <div class="payment-method selected" data-method="card">
                                    <strong>💳 Credit Card</strong>
                                    <p>Visa, MasterCard, American Express</p>
                                </div>
                                <div class="payment-method" data-method="paypal">
                                    <strong>🅿️ PayPal</strong>
                                    <p>Pay securely with PayPal</p>
                                </div>
                            </div>
                            
                            <div class="card-details" style="margin-top: 1rem;">
                                <div class="form-group">
                                    <label class="form-label">Card Number *</label>
                                    <input type="text" class="form-input" name="cardNumber" placeholder="1234 5678 9012 3456" required>
                                </div>
                                <div style="display: flex; gap: 1rem;">
                                    <div class="form-group" style="flex: 1;">
                                        <label class="form-label">Expiry Date *</label>
                                        <input type="text" class="form-input" name="expiry" placeholder="MM/YY" required>
                                    </div>
                                    <div class="form-group" style="flex: 1;">
                                        <label class="form-label">CVV *</label>
                                        <input type="text" class="form-input" name="cvv" placeholder="123" required>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                `,
                maxWidth: '700px',
                buttons: [
                    { text: 'Cancel', class: 'popup-btn-secondary' },
                    { 
                        text: `Pay ${ticket.price} UAH`, 
                        class: 'popup-btn-primary',
                        callback: (popup) => {
                            this.processTicketPayment(popup, ticket);
                        }
                    }
                ]
            });
            
            // Bind payment method selection
            setTimeout(() => {
                const paymentMethods = document.querySelectorAll('.payment-method');
                const cardDetails = document.querySelector('.card-details');
                
                paymentMethods.forEach(method => {
                    method.addEventListener('click', () => {
                        paymentMethods.forEach(m => m.classList.remove('selected'));
                        method.classList.add('selected');
                        
                        const methodType = method.getAttribute('data-method');
                        cardDetails.style.display = methodType === 'card' ? 'block' : 'none';
                    });
                });
                
                // Format card inputs
                const cardInput = document.querySelector('input[name="cardNumber"]');
                const expiryInput = document.querySelector('input[name="expiry"]');
                const cvvInput = document.querySelector('input[name="cvv"]');
                
                if (cardInput) {
                    cardInput.addEventListener('input', (e) => {
                        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
                        let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                        if (formatted.length > 19) formatted = formatted.substring(0, 19);
                        e.target.value = formatted;
                    });
                }
                
                if (expiryInput) {
                    expiryInput.addEventListener('input', (e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                            value = value.substring(0, 2) + '/' + value.substring(2, 4);
                        }
                        e.target.value = value;
                    });
                }
                
                if (cvvInput) {
                    cvvInput.addEventListener('input', (e) => {
                        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
                    });
                }
            }, 100);
            
            this.modules.soundManager.play('click');
        }

        processTicketPayment(popup, ticket) {
            const form = popup.element.querySelector('.purchase-form');
            const formData = new FormData(form);
            
            // Validate form
            const requiredFields = ['fullName', 'email'];
            const selectedMethod = popup.element.querySelector('.payment-method.selected').getAttribute('data-method');
            
            if (selectedMethod === 'card') {
                requiredFields.push('cardNumber', 'expiry', 'cvv');
            }
            
            for (const field of requiredFields) {
                if (!formData.get(field)) {
                    this.showNotification('Please fill in all required fields', 'error');
                    return;
                }
            }
            
            // Show processing
            const submitBtn = popup.element.querySelector('.popup-btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            // Simulate payment processing
            setTimeout(() => {
                this.modules.popupSystem.close(popup);
                this.showTicketSuccess(ticket, formData);
                this.modules.soundManager.play('success');
            }, 2500);
        }

        showTicketSuccess(ticket, formData) {
            const ticketId = Utils.StringUtils.generateId().toUpperCase();
            
            this.modules.popupSystem.show({
                title: 'Payment Successful!',
                subtitle: 'Your ticket has been confirmed',
                content: `
                    <div class="success-content" style="text-align: center;">
                        <div class="success-icon" style="font-size: 4rem; color: #27ae60; margin-bottom: 2rem;">✓</div>
                        <div class="ticket-confirmation" style="background: #f8f9fa; padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                            <h3>${ticket.name} Ticket</h3>
                            <p class="ticket-id" style="font-family: monospace; font-size: 1.2rem; font-weight: bold; color: #e67e22;">
                                Ticket ID: ${ticketId}
                            </p>
                            <p><strong>Name:</strong> ${formData.get('fullName')}</p>
                            <p><strong>Email:</strong> ${formData.get('email')}</p>
                            <p><strong>Price:</strong> ${ticket.price} UAH</p>
                            <p><strong>Valid:</strong> May 15 - June 30, 2025</p>
                        </div>
                        <p>Your ticket confirmation has been sent to your email. Please present this ticket ID at the entrance.</p>
                    </div>
                `,
                buttons: [
                    { 
                        text: 'Download Ticket', 
                        class: 'popup-btn-secondary',
                        callback: () => this.downloadTicket(ticketId, ticket, formData),
                        close: false
                    },
                    { text: 'Close', class: 'popup-btn-primary' }
                ]
            });
        }

        downloadTicket(ticketId, ticket, formData) {
            const ticketHtml = `
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
                            background: linear-gradient(135deg, #667eea, #764ba2); 
                            color: white; 
                            border-radius: 20px; 
                            padding: 40px; 
                            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                            position: relative;
                            overflow: hidden;
                        }
                        .ticket::before {
                            content: '';
                            position: absolute;
                            top: -50%;
                            left: -50%;
                            width: 200%;
                            height: 200%;
                            background: radial-gradient(circle, rgba(255,255,255,0.1) 20%, transparent 70%);
                            animation: rotate 20s linear infinite;
                        }
                        @keyframes rotate {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        .ticket-content { position: relative; z-index: 2; }
                        .header { text-align: center; margin-bottom: 3rem; }
                        .logo { font-size: 3rem; font-weight: 900; margin-bottom: 1rem; }
                        .subtitle { font-size: 1.2rem; opacity: 0.9; }
                        .ticket-info { margin: 2rem 0; }
                        .ticket-row { 
                            display: flex; 
                            justify-content: space-between; 
                            margin: 1rem 0; 
                            padding: 1rem 0;
                            border-bottom: 1px solid rgba(255,255,255,0.2);
                        }
                        .ticket-id { 
                            font-size: 2rem; 
                            font-weight: bold; 
                            text-align: center; 
                            margin: 2rem 0;
                            padding: 1rem;
                            background: rgba(255,255,255,0.1);
                            border-radius: 10px;
                            letter-spacing: 2px;
                        }
                        .qr-placeholder { 
                            width: 150px; 
                            height: 150px; 
                            background: white; 
                            margin: 2rem auto; 
                            border-radius: 10px; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            color: #333; 
                            font-weight: bold;
                        }
                        .footer { 
                            text-align: center; 
                            margin-top: 3rem; 
                            opacity: 0.8; 
                        }
                    </style>
                </head>
                <body>
                    <div class="ticket">
                        <div class="ticket-content">
                            <div class="header">
                                <div class="logo">INNER GARDEN</div>
                                <div class="subtitle">Interactive Art Experience</div>
                            </div>
                            
                            <div class="ticket-id">ID: ${ticketId}</div>
                            
                            <div class="ticket-info">
                                <div class="ticket-row">
                                    <span>Type:</span>
                                    <span>${ticket.name}</span>
                                </div>
                                <div class="ticket-row">
                                    <span>Name:</span>
                                    <span>${formData.get('fullName')}</span>
                                </div>
                                <div class="ticket-row">
                                    <span>Email:</span>
                                    <span>${formData.get('email')}</span>
                                </div>
                                <div class="ticket-row">
                                    <span>Price:</span>
                                    <span>${ticket.price} UAH</span>
                                </div>
                                <div class="ticket-row">
                                    <span>Valid Period:</span>
                                    <span>May 15 - June 30, 2025</span>
                                </div>
                            </div>
                            
                            <div class="qr-placeholder">QR CODE</div>
                            
                            <div class="footer">
                                <p>Present this ticket at the entrance</p>
                                <p>Marina Kaminska's Interactive Exhibition</p>
                                <p>Thank you for visiting INNER GARDEN!</p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `;
            
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
                        <div class="support-benefits" style="background: #f8f9fa; padding: 2rem; border-radius: 10px; margin-bottom: 2rem;">
                            <h3>Your Support Includes:</h3>
                            <ul style="margin: 1rem 0;">
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
                                <label class="form-label">Organization (Optional)</label>
                                <input type="text" class="form-input" name="organization">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Support Message (Optional)</label>
                                <textarea class="form-input form-textarea" name="message" placeholder="Share why you're supporting INNER GARDEN..."></textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Support Type</label>
                                <select class="form-select" name="supportType">
                                    <option value="one-time">One-time Support</option>
                                    <option value="monthly">Monthly Support</option>
                                    <option value="yearly">Yearly Support</option>
                                </select>
                            </div>
                            
                            <h3 style="margin-top: 2rem;">Payment Information</h3>
                            <div class="payment-methods">
                                <div class="payment-method selected" data-method="card">
                                    <strong>💳 Credit Card</strong>
                                </div>
                                <div class="payment-method" data-method="paypal">
                                    <strong>🅿️ PayPal</strong>
                                </div>
                            </div>
                            
                            <div class="card-details">
                                <div class="form-group">
                                    <label class="form-label">Card Number *</label>
                                    <input type="text" class="form-input" name="cardNumber" required>
                                </div>
                                <div style="display: flex; gap: 1rem;">
                                    <div class="form-group" style="flex: 1;">
                                        <label class="form-label">Expiry *</label>
                                        <input type="text" class="form-input" name="expiry" placeholder="MM/YY" required>
                                    </div>
                                    <div class="form-group" style="flex: 1;">
                                        <label class="form-label">CVV *</label>
                                        <input type="text" class="form-input" name="cvv" required>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                `,
                maxWidth: '700px',
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
            
            // Bind payment method selection (similar to tickets)
            setTimeout(() => {
                const paymentMethods = document.querySelectorAll('.payment-method');
                const cardDetails = document.querySelector('.card-details');
                
                paymentMethods.forEach(method => {
                    method.addEventListener('click', () => {
                        paymentMethods.forEach(m => m.classList.remove('selected'));
                        method.classList.add('selected');
                        
                        const methodType = method.getAttribute('data-method');
                        cardDetails.style.display = methodType === 'card' ? 'block' : 'none';
                    });
                });
            }, 100);
            
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
                    <div class="success-content" style="text-align: center;">
                        <div class="success-icon" style="font-size: 4rem; margin-bottom: 2rem;">❤️</div>
                        <p style="font-size: 1.2rem; margin-bottom: 2rem;">
                            Your generous support helps us continue creating amazing interactive art experiences.
                        </p>
                        <div class="support-confirmation" style="background: #f8f9fa; padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                            <h3>Support Confirmation</h3>
                            <p><strong>Supporter:</strong> ${formData.get('fullName')}</p>
                            <p><strong>Level:</strong> ${support.name}</p>
                            <p><strong>Amount:</strong> ${support.amount} UAH</p>
                            <p><strong>Type:</strong> ${formData.get('supportType') || 'One-time'}</p>
                            ${formData.get('organization') ? `<p><strong>Organization:</strong> ${formData.get('organization')}</p>` : ''}
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

    // Export for ES6 modules (if needed)
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { InnerGardenApp, CONFIG, TRANSLATIONS, Utils };
    }

})();

// Final console message
console.log(`
🎨 INNER GARDEN - Interactive Art Experience
Version: ${CONFIG?.version || '3.0.0'}
🌟 System loaded successfully!

Features:
✓ Advanced Custom Cursor
✓ Interactive Wall with Particles
✓ 3D Virtual Tour (Three.js)
✓ Multilingual Support (UK/EN/DE/ES)
✓ Advanced Sound System
✓ Popup Management
✓ Accessibility Features
✓ Responsive Design

Marina Kaminska's Exhibition System
Ready for an amazing art experience!
`);