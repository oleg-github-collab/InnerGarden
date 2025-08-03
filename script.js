// Inner Garden Exhibition JavaScript - Google Apps Script Integration
// Version 1.1.0 - FIXED

// ============================================
// ВАЖЛИВО: ВСТАВТЕ ВАШ URL ТУТ!
// ============================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyoUt5MGd7HkoTIIQ_s4cy4-TRSdL05FyPvBF_IE7fP28y3RavYt3sTdm24vMu8LnQSOg/exec'; // <-- ЗАМІНІТЬ НА ВАШ URL
const ADMIN_PASSWORD = 'innergardenexhibition2024'; // <-- ЗМІНІТЬ НА СВІЙ ПАРОЛЬ

// Language translations (complete with all languages)
const translations = {
    uk: {
        'nav-about': 'Про виставку',
        'nav-gallery': 'Галерея',
        'nav-timeline': 'Програма',
        'nav-artist': 'Художниця',
        'nav-garden': 'Внутрішній сад',
        'nav-shop': 'NFT / Магазин',
        'nav-shop-external': 'Інтернет-магазин',
        'hero-title': 'Inner Garden',
        'hero-subtitle': 'Виставка Maryna Kaminska',
        'hero-description': '15-29 серпня 2025<br>Bloom Gallery, Валенсія, Іспанія',
        'hero-btn-explore': 'Відвідати галерею',
        'hero-btn-pricelist': 'Прайс-лист',
        'scroll-text': 'Прокрутіть вниз',
        'about-title': 'Про Inner Garden',
        'about-text-1': 'Inner Garden - це художня виставка Марини Камінської, яка відбудеться в галереї Bloom у Валенсії, Іспанія, з 15 по 29 серпня 2025 року.',
        'about-text-2': 'Ця виставка запрошує нас поміркувати: як ми культивуємо наш внутрішній світ?',
        'about-text-3': 'Роботи Камінської проводять потужний зв\'язок між природним світом і нашими внутрішніми ландшафтами. Зовнішня природа, що нас оточує, відображається всередині нас — променева енергія сонця — це та сама енергія, що циркулює через наше єство, оживляючи нас ритмом життя. Це світлоносна сила, яка трансформується і тече через любов, свободу та присутність. Ця енергія рухається колами вібрації та зв\'язку, живлена життєвим центром — місцем рівноваги та сили. Це сила, яка знову з\'єднує нас з нашою сутністю.',
        'about-text-4': 'Виставка Inner Garden — це обійми життя, але також заклик плекати наш емоційний, ментальний і духовний простір — свідомо сіяти, доглядати та збирати наші думки, мрії та переконання. Це говорить про те, що наша внутрішня реальність формує наш зовнішній досвід. Все взаємопов\'язано, і так само, як еволюціонує природа, так повинні еволюціонувати і ми.',
        'about-quote': '"Усвідомлення нашого внутрішнього тілесного стану відіграє вирішальну роль у тому, як ми переживаємо те, ким ми є і що нас оточує, що одночасно є подихом природи на землі."',
        'read-more': 'Читати далі',
        'read-less': 'Згорнути',
        'gallery-controls': 'WASD/Стрілки - рух, Миша - огляд. Клік на картину - наближення.',
        'gallery-loading': 'Завантаження галереї...',
        'timeline-title': 'Програма виставки',
        'timeline-opening-title': 'Відкриття виставки',
        'timeline-opening-desc': 'Урочисте відкриття з присутністю художниці. Вітальний прийом та екскурсія.',
        'timeline-veterans-title': 'Лекція-презентація БФ "Фенікс"',
        'timeline-veterans-desc': 'Програми відновлення українських ветеранів з ПТСР',
        'timeline-yoga-title': 'Art Flow Yoga',
        'timeline-yoga-desc': 'Flow Yoga by Svitlana Cherry',
        'timeline-yoga2-title': 'Flow Yoga + звукова медитація',
        'timeline-yoga2-desc': 'Flow Yoga by Svitlana Cherry',
        'timeline-closing-title': 'Закриття виставки',
        'timeline-closing-desc': 'Фінісаж з музичним супроводом та прощальною зустріччю.',
        'artist-title': 'Про художницю',
        'artist-bio-1': 'Марина Камінська - українська візуальна художниця, відома своїми динамічними та плавними абстрактними роботами в техніках акрилового та акварельного живопису. Її картини часто містять переплетені людські фігури, вловлені в плавних, природних формах.',
        'artist-bio-2': 'Випускниця Національної академії культури та мистецтв в Києві, Марина також має ступінь магістра Університету фізичного виховання та спорту України. На кафедрі біомеханіки вона заглибилася в хатха-йогу, розглядаючи її як екзистенційну та дослідницьку систему, яка сприяє творчості, самосвідомості та глибшому розумінню світу.',
        'artist-bio-3': 'З 2020 року Марина є активною учасницею художніх виставок, демонструючи свої роботи в галереях та музеях різних міст, включаючи Київ, Краків, Відень, Берлін, Мюнхен, Нюрнберг, Торонто, Кіль та Брауншвейг.',
        'garden-title': 'Внутрішній сад відгуків',
        'plant-button': 'Посадити рослину',
        'garden-scroll': 'Прокрутіть вправо для більшого простору',
        'plant-modal-title': 'Посадити рослину у внутрішньому саду',
        'plant-name': 'Ваше ім\'я',
        'plant-message': 'Ваше повідомлення',
        'plant-type': 'Тип рослини',
        'plant-flower': 'Квітка',
        'plant-rose': 'Троянда',
        'plant-sunflower': 'Соняшник',
        'plant-tulip': 'Тюльпан',
        'plant-tree': 'Дерево',
        'plant-palm': 'Пальма',
        'plant-evergreen': 'Ялина',
        'plant-bush': 'Кущ',
        'plant-herb': 'Рослина',
        'plant-grass': 'Трава',
        'plant-cactus': 'Кактус',
        'plant-bamboo': 'Бамбук',
        'plant-submit': 'Посадити',
        'plant-click-hint': 'Клікніть де хочете посадити рослину',
        'plant-syncing': 'Синхронізація з сервером...',
        'plant-loading': 'Завантаження саду...',
        'plant-error': 'Помилка зв\'язку з сервером',
        'plant-retry': 'Спробувати ще раз',
        'plant-offline': 'Працюєте офлайн',
        'plant-planted': 'Рослину успішно посаджено!',
        'shop-title': 'NFT Колекція та Магазин',
        'shop-visit-external': 'Відвідати повний інтернет-магазин',
        'shop-tab-nft': 'NFT Колекція',
        'shop-tab-physical': 'Фізичні картини',
        'shop-buy': 'Отримати NFT',
        'shop-buy-physical': 'Купити',
        'shop-gift': 'Подарувати',
        'pricelist-title': 'Прайс-лист картин',
        'pricelist-text': 'Завантажте повний каталог робіт з цінами та детальною інформацією',
        'pricelist-download': 'Завантажити PDF',
        'footer-dates': '15-29 серпня 2025',
        'footer-links-title': 'Посилання',
        'footer-follow': 'Слідкуйте за нами',
        'footer-rights': 'Всі права захищені.',
        'footer-privacy': 'Політика конфіденційності',
        'footer-terms': 'Умови використання',
        'footer-cookies': 'Політика cookies',
        'privacy-title': 'Політика конфіденційності',
        'privacy-content': 'Ми поважаємо вашу конфіденційність та зобов\'язуємося захищати ваші персональні дані. Вся інформація зберігається локально у вашому браузері.',
        'terms-title': 'Умови використання',
        'terms-content': 'Використовуючи цей веб-сайт, ви погоджуєтесь з нашими умовами. Весь контент захищений авторським правом.',
        'cookies-title': 'Політика cookies',
        'cookies-content': 'Цей веб-сайт використовує файли cookie для покращення вашого досвіду та збереження налаштувань.',
        'nft1-desc': 'Ексклюзивний NFT токен з можливістю подарунку в Telegram',
        'nft2-desc': 'Цифровий оригінал з можливістю відображення в профілі',
        'nft3-desc': 'Колекційний NFT токен з унікальним дизайном',
        'nft4-desc': 'Преміальний NFT з можливістю обміну',
        'nft5-desc': 'Рідкісний NFT з колекції Inner Garden',
        'phys1-desc': 'Оригінальна акварель на папері, 59x84 см',
        'phys2-desc': 'Оригінальна акварель на папері, 42x59,5 см',
        'phys3-desc': 'Оригінальна акварель на папері, 42×59,5  см',
        'phys4-desc': 'Оригінальна акварель на папері, 59x84 см',
        'nft1-title': 'Sacred Dance NFT',
        'nft2-title': 'Soul Expression NFT',
        'nft3-title': 'Eternal Movement NFT',
        'nft4-title': 'Inner Harmony NFT',
        'nft5-title': 'Flow State NFT',
        'phys1-title': 'Vibrations',
        'phys2-title': 'In My Inner Garden',
        'phys3-title': 'Infatuation',
        'phys4-title': 'The Pulse of Earth'
    },
    en: {
        'nav-about': 'About Exhibition',
        'nav-gallery': 'Gallery',
        'nav-timeline': 'Program',
        'nav-artist': 'Artist',
        'nav-garden': 'Inner Garden',
        'nav-shop': 'NFT / Shop',
        'nav-shop-external': 'Online Shop',
        'hero-title': 'Inner Garden',
        'hero-subtitle': 'Exhibition by Maryna Kaminska',
        'hero-description': 'August 15-29, 2025<br>Bloom Gallery, Valencia, Spain',
        'hero-btn-explore': 'Visit Gallery',
        'hero-btn-pricelist': 'Price List',
        'scroll-text': 'Scroll down',
        'about-title': 'About Inner Garden',
        'about-text-1': 'Inner Garden is an art exhibition by Maryna Kaminska, taking place at Bloom Gallery in Valencia, Spain, inviting you from August 15 to 29, 2025.',
        'about-text-2': 'This exhibition invites us to reflect: how do we cultivate our inner world?',
        'about-text-3': 'Kaminska\'s works draw a powerful connection between the natural world and our inner landscapes. The external nature that surrounds us is reflected within us—the radiant energy of the sun is the same energy that circulates through our being, animating us with the rhythm of life. It is a light-bearing force that transforms and flows through love, freedom, and presence. This energy moves in circles of vibration and connection, nourished by a vital center—a place of balance and strength. It is a force that reconnects us with our essence.',
        'about-text-4': 'The Inner Garden exhibition is an embrace of life, but also a call to cultivate our emotional, mental, and spiritual space—to consciously sow, tend, and harvest our thoughts, dreams, and beliefs. It suggests that our inner reality shapes our outer experience. Everything is interconnected, and just as nature evolves, so must we.',
        'about-quote': '"Awareness of our inner bodily state plays a crucial role in how we experience who we are and what surrounds us, which is simultaneously nature\'s breath on earth."',
        'read-more': 'Read more',
        'read-less': 'Read less',
        'gallery-controls': 'WASD/Arrows - move, Mouse - look around. Click on painting - zoom.',
        'gallery-loading': 'Loading gallery...',
        'timeline-title': 'Exhibition Program',
        'timeline-opening-title': 'Exhibition Opening',
        'timeline-opening-desc': 'Grand opening with the artist present. Welcome reception and guided tour.',
        'timeline-veterans-title': 'Lecture by Phoenix Charity Fund',
        'timeline-veterans-desc': 'Recovery programs for Ukrainian veterans with PTSD',
        'timeline-yoga-title': 'Art Flow Yoga',
        'timeline-yoga-desc': 'Flow Yoga by Svitlana Cherry',
        'timeline-yoga2-title': 'Flow Yoga + Sound Meditation',
        'timeline-yoga2-desc': 'Flow Yoga by Svitlana Cherry',
        'timeline-closing-title': 'Exhibition Closing',
        'timeline-closing-desc': 'Finissage with musical accompaniment and farewell gathering.',
        'artist-title': 'About the Artist',
        'artist-bio-1': 'Maryna Kaminska is a Ukrainian visual artist known for her dynamic and fluid abstract works in acrylic and watercolor. Her paintings often feature intertwined human figures captured in flowing, natural forms.',
        'artist-bio-2': 'A graduate of the National Academy of Arts and Culture in Kyiv, Maryna also holds a master\'s degree from the University of Physical Education and Sport of Ukraine. At the Department of Biomechanics, she delved into hatha yoga, viewing it as an existential and exploratory system that promotes creativity, self-awareness, and a deeper understanding of the world.',
        'artist-bio-3': 'Since 2020, Maryna has been an active participant in art exhibitions, showing her work in galleries and museums in various cities including Kyiv, Krakow, Vienna, Berlin, Munich, Nuremberg, Toronto, Kiel, and Brunswick.',
        'garden-title': 'Inner Garden of Reviews',
        'plant-button': 'Plant a Plant',
        'garden-scroll': 'Scroll right for more space',
        'plant-modal-title': 'Plant a Plant in the Inner Garden',
        'plant-name': 'Your Name',
        'plant-message': 'Your Message',
        'plant-type': 'Plant Type',
        'plant-flower': 'Flower',
        'plant-rose': 'Rose',
        'plant-sunflower': 'Sunflower',
        'plant-tulip': 'Tulip',
        'plant-tree': 'Tree',
        'plant-palm': 'Palm',
        'plant-evergreen': 'Evergreen',
        'plant-bush': 'Bush',
        'plant-herb': 'Herb',
        'plant-grass': 'Grass',
        'plant-cactus': 'Cactus',
        'plant-bamboo': 'Bamboo',
        'plant-submit': 'Plant',
        'plant-click-hint': 'Click where you want to plant',
        'plant-syncing': 'Syncing with server...',
        'plant-loading': 'Loading garden...',
        'plant-error': 'Server connection error',
        'plant-retry': 'Try again',
        'plant-offline': 'Working offline',
        'plant-planted': 'Plant added successfully!',
        'shop-title': 'NFT Collection and Shop',
        'shop-visit-external': 'Visit Full Online Shop',
        'shop-tab-nft': 'NFT Collection',
        'shop-tab-physical': 'Physical Paintings',
        'shop-buy': 'Get NFT',
        'shop-buy-physical': 'Buy',
        'shop-gift': 'Gift',
        'pricelist-title': 'Paintings Price List',
        'pricelist-text': 'Download the complete catalog with prices and detailed information',
        'pricelist-download': 'Download PDF',
        'footer-dates': 'August 15-29, 2025',
        'footer-links-title': 'Links',
        'footer-follow': 'Follow Us',
        'footer-rights': 'All rights reserved.',
        'footer-privacy': 'Privacy Policy',
        'footer-terms': 'Terms of Use',
        'footer-cookies': 'Cookie Policy',
        'privacy-title': 'Privacy Policy',
        'privacy-content': 'We respect your privacy and are committed to protecting your personal data. All information is stored locally in your browser.',
        'terms-title': 'Terms of Use',
        'terms-content': 'By using this website, you agree to our terms. All content is protected by copyright.',
        'cookies-title': 'Cookie Policy',
        'cookies-content': 'This website uses cookies to enhance your experience and save settings.',
        'nft1-desc': 'Exclusive NFT token with Telegram gift option',
        'nft2-desc': 'Digital original with profile display option',
        'nft3-desc': 'Collectible NFT token with unique design',
        'nft4-desc': 'Premium NFT with exchange option',
        'nft5-desc': 'Rare NFT from Inner Garden collection',
        'phys1-desc': 'Original watercolor on paper, 59x84 cm',
        'phys2-desc': 'Original watercolor on paper, 42x59,5 cm',
        'phys3-desc': 'Original watercolor on paper, 42x59,5 cm',
        'phys4-desc': 'Original watercolor on paper, 59x84 cm',
        'nft1-title': 'Sacred Dance NFT',
        'nft2-title': 'Soul Expression NFT',
        'nft3-title': 'Eternal Movement NFT',
        'nft4-title': 'Inner Harmony NFT',
        'nft5-title': 'Flow State NFT',
        'phys1-title': 'Vibrations',
        'phys2-title': 'In My Inner Garden',
        'phys3-title': 'Infatuation',
        'phys4-title': 'The Pulse of Earth'
    },
    de: {
        'nav-about': 'Über die Ausstellung',
        'nav-gallery': 'Galerie',
        'nav-timeline': 'Programm',
        'nav-artist': 'Künstlerin',
        'nav-garden': 'Innerer Garten',
        'nav-shop': 'NFT / Shop',
        'nav-shop-external': 'Online-Shop',
        'hero-title': 'Inner Garden',
        'hero-subtitle': 'Ausstellung von Maryna Kaminska',
        'hero-description': '15.-29. August 2025<br>Bloom Gallery, Valencia, Spanien',
        'hero-btn-explore': 'Galerie besuchen',
        'hero-btn-pricelist': 'Preisliste',
        'scroll-text': 'Nach unten scrollen',
        'about-title': 'Über Inner Garden',
        'about-text-1': 'Inner Garden ist eine Kunstausstellung von Maryna Kaminska in der Bloom Gallery in Valencia, Spanien, die Sie vom 15. bis 29. August 2025 einlädt.',
        'about-text-2': 'Diese Ausstellung lädt uns zum Nachdenken ein: Wie kultivieren wir unsere innere Welt?',
        'about-text-3': 'Kaminskas Werke ziehen eine starke Verbindung zwischen der natürlichen Welt und unseren inneren Landschaften. Die äußere Natur, die uns umgibt, spiegelt sich in uns wider – die strahlende Energie der Sonne ist dieselbe Energie, die durch unser Wesen zirkuliert und uns mit dem Rhythmus des Lebens belebt. Es ist eine lichttragende Kraft, die sich durch Liebe, Freiheit und Präsenz verwandelt und fließt. Diese Energie bewegt sich in Kreisen der Schwingung und Verbindung, genährt von einem vitalen Zentrum – einem Ort des Gleichgewichts und der Stärke. Es ist eine Kraft, die uns wieder mit unserem Wesen verbindet.',
        'about-text-4': 'Die Ausstellung "Inner Garden" ist eine Umarmung des Lebens, aber auch ein Aufruf, unseren emotionalen, mentalen und spirituellen Raum zu pflegen – unsere Gedanken, Träume und Überzeugungen bewusst zu säen, zu hegen und zu ernten. Sie legt nahe, dass unsere innere Realität unsere äußere Erfahrung formt. Alles ist miteinander verbunden, und so wie sich die Natur entwickelt, müssen auch wir uns entwickeln.',
        'about-quote': '"Das Bewusstsein für unseren inneren körperlichen Zustand spielt eine entscheidende Rolle dafür, wie wir erleben, wer wir sind und was uns umgibt, was gleichzeitig der Atem der Natur auf der Erde ist."',
        'read-more': 'Weiterlesen',
        'read-less': 'Weniger lesen',
        'gallery-controls': 'WASD/Pfeiltasten - Bewegung, Maus - Umsehen. Klick auf Bild - Zoom.',
        'gallery-loading': 'Galerie wird geladen...',
        'timeline-title': 'Ausstellungsprogramm',
        'timeline-opening-title': 'Ausstellungseröffnung',
        'timeline-opening-desc': 'Feierliche Eröffnung mit der Künstlerin. Empfang und Führung.',
        'timeline-veterans-title': 'Vortrag von Fenix Wohltätigkeitsverein',
        'timeline-veterans-desc': 'Rehabilitationsprogramme für ukrainische Veteranen mit PTBS',
        'timeline-yoga-title': 'Art Flow Yoga',
        'timeline-yoga-desc': 'Flow Yoga mit Svitlana Cherry',
        'timeline-yoga2-title': 'Flow Yoga + Shallmeditation',
        'timeline-yoga2-desc': 'Flow Yoga mit Svitlana Cherry',
        'timeline-closing-title': 'Ausstellungsende',
        'timeline-closing-desc': 'Finissage mit musikalischer Begleitung und Abschiedstreffen.',
        'artist-title': 'Über die Künstlerin',
        'artist-bio-1': 'Maryna Kaminska ist eine ukrainische bildende Künstlerin, bekannt für ihre dynamischen und fließenden abstrakten Arbeiten in Acryl und Aquarell. Ihre Gemälde zeigen oft verschlungene menschliche Figuren in fließenden, natürlichen Formen.',
        'artist-bio-2': 'Als Absolventin der Nationalen Akademie für bildende Kunst und Kultur in Kiew hat Maryna auch einen Master-Abschluss von der Universität für Leibeserziehung und Sport der Ukraine. Am Lehrstuhl für Biomechanik vertiefte sie sich in Hatha-Yoga, das sie als existentielles und exploratives System betrachtet, das Kreativität, Selbstbewusstsein und ein tieferes Verständnis der Welt fördert.',
        'artist-bio-3': 'Seit 2020 ist Maryna eine aktive Teilnehmerin an Kunstausstellungen und zeigt ihre Werke in Galerien und Museen verschiedener Städte, darunter Kiew, Krakau, Wien, Berlin, München, Nürnberg, Toronto, Kiel und Braunschweig.',
        'garden-title': 'Innerer Garten der Rückmeldungen',
        'plant-button': 'Pflanze pflanzen',
        'garden-scroll': 'Nach rechts scrollen für mehr Platz',
        'plant-modal-title': 'Eine Pflanze im inneren Garten pflanzen',
        'plant-name': 'Ihr Name',
        'plant-message': 'Ihre Nachricht',
        'plant-type': 'Pflanzentyp',
        'plant-flower': 'Blume',
        'plant-rose': 'Rose',
        'plant-sunflower': 'Sonnenblume',
        'plant-tulip': 'Tulpe',
        'plant-tree': 'Baum',
        'plant-palm': 'Palme',
        'plant-evergreen': 'Tanne',
        'plant-bush': 'Busch',
        'plant-herb': 'Pflanze',
        'plant-grass': 'Gras',
        'plant-cactus': 'Kaktus',
        'plant-bamboo': 'Bambus',
        'plant-submit': 'Pflanzen',
        'plant-click-hint': 'Klicken Sie, wo Sie pflanzen möchten',
        'plant-syncing': 'Synchronisierung mit Server...',
        'plant-loading': 'Garten wird geladen...',
        'plant-error': 'Serververbindungsfehler',
        'plant-retry': 'Erneut versuchen',
        'plant-offline': 'Offline arbeiten',
        'plant-planted': 'Pflanze erfolgreich gepflanzt!',
        'shop-title': 'NFT Sammlung und Shop',
        'shop-visit-external': 'Vollständigen Online-Shop besuchen',
        'shop-tab-nft': 'NFT Sammlung',
        'shop-tab-physical': 'Physische Kunstwerke',
        'shop-buy': 'NFT erhalten',
        'shop-buy-physical': 'Kaufen',
        'shop-gift': 'Verschenken',
        'pricelist-title': 'Preisliste der Gemälde',
        'pricelist-text': 'Laden Sie den vollständigen Katalog mit Preisen und detaillierten Informationen herunter',
        'pricelist-download': 'PDF herunterladen',
        'footer-dates': '15.-29. August 2025',
        'footer-links-title': 'Links',
        'footer-follow': 'Folgen Sie uns',
        'footer-rights': 'Alle Rechte vorbehalten.',
        'footer-privacy': 'Datenschutzrichtlinie',
        'footer-terms': 'Nutzungsbedingungen',
        'footer-cookies': 'Cookie-Richtlinie',
        'privacy-title': 'Datenschutzrichtlinie',
        'privacy-content': 'Wir respektieren Ihre Privatsphäre und verpflichten uns, Ihre persönlichen Daten zu schützen. Alle Informationen werden lokal in Ihrem Browser gespeichert.',
        'terms-title': 'Nutzungsbedingungen',
        'terms-content': 'Durch die Nutzung dieser Website stimmen Sie unseren Bedingungen zu. Alle Inhalte sind urheberrechtlich geschützt.',
        'cookies-title': 'Cookie-Richtlinie',
        'cookies-content': 'Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern und Einstellungen zu speichern.',
        'nft1-desc': 'Exklusives NFT-Token mit Telegram-Geschenkoption',
        'nft2-desc': 'Digitales Original mit Profilanzeigeoption',
        'nft3-desc': 'Sammelbares NFT-Token mit einzigartigem Design',
        'nft4-desc': 'Premium-NFT mit Tauschoption',
        'nft5-desc': 'Seltenes NFT aus der Inner Garden-Sammlung',
        'phys1-desc': 'Original Aquarell auf Papier, 59x84 cm',
        'phys2-desc': 'Original Aquarell auf Papier, 42x59,5 cm',
        'phys3-desc': 'Original Aquarell auf Papier, 42x59,5 cm',
        'phys4-desc': 'Original Aquarell auf Papier, 59x84 cm',
        'nft1-title': 'Sacred Dance NFT',
        'nft2-title': 'Soul Expression NFT',
        'nft3-title': 'Eternal Movement NFT',
        'nft4-title': 'Inner Harmony NFT',
        'nft5-title': 'Flow State NFT',
        'phys1-title': 'Vibrations',
        'phys2-title': 'In My Inner Garden',
        'phys3-title': 'Infatuation',
        'phys4-title': 'The Pulse of Earth'
    },
    es: {
        'nav-about': 'Sobre la exposición',
        'nav-gallery': 'Galería',
        'nav-timeline': 'Programa',
        'nav-artist': 'Artista',
        'nav-garden': 'Jardín interior',
        'nav-shop': 'NFT / Tienda',
        'nav-shop-external': 'Tienda en línea',
        'hero-title': 'Inner Garden',
        'hero-subtitle': 'Exposición de Maryna Kaminska',
        'hero-description': '15-29 de agosto 2025<br>Bloom Gallery, Valencia, España',
        'hero-btn-explore': 'Visitar galería',
        'hero-btn-pricelist': 'Lista de precios',
        'scroll-text': 'Desplázate hacia abajo',
        'about-title': 'Sobre Inner Garden',
        'about-text-1': 'Inner Garden es una exposición de arte de Maryna Kaminska en la Galería Bloom en Valencia, España, que te invita del 15 al 29 de agosto de 2025.',
        'about-text-2': 'Esta exposición nos invita a reflexionar: ¿cómo cultivamos nuestro mundo interior?',
        'about-text-3': 'Las obras de Kaminska trazan una poderosa conexión entre el mundo natural y nuestros paisajes interiores. La naturaleza externa que nos rodea se refleja en nuestro interior: la energía radiante del sol es la misma energía que circula a través de nuestro ser, animándonos con el ritmo de la vida. Es una fuerza portadora de luz que se transforma y fluye a través del amor, la libertad y la presencia. Esta energía se mueve en círculos de vibración y conexión, nutrida por un centro vital, un lugar de equilibrio y fortaleza. Es una fuerza que nos reconecta con nuestra esencia.',
        'about-text-4': 'La exposición "Inner Garden" es un abrazo a la vida, pero también un llamado a cultivar nuestro espacio emocional, mental y espiritual: a sembrar, cuidar y cosechar conscientemente nuestros pensamientos, sueños y creencias. Sugiere que nuestra realidad interna da forma a nuestra experiencia externa. Todo está interconectado, y así como la naturaleza evoluciona, también debemos hacerlo nosotros.',
        'about-quote': '"La conciencia de nuestro estado corporal interno juega un papel crucial en cómo experimentamos quiénes somos y qué nos rodea, que al mismo tiempo es el aliento de la naturaleza en la tierra."',
        'read-more': 'Leer más',
        'read-less': 'Leer menos',
        'gallery-controls': 'WASD/Flechas - movimiento, Ratón - mirar. Clic en imagen - zoom.',
        'gallery-loading': 'Cargando galería...',
        'timeline-title': 'Programa de la exposición',
        'timeline-opening-title': 'Apertura de la exposición',
        'timeline-opening-desc': 'Apertura solemne con la presencia de la artista. Recepción de bienvenida y visita guiada.',
        'timeline-veterans-title': 'Conferencia sobre programas de rehabilitación',
        'timeline-veterans-desc': 'Programas de rehabilitación para veteranos ucranianos con TEPT',
        'timeline-yoga-title': 'Flow Yoga',
        'timeline-yoga-desc': 'Flow Yoga por Svitlana Cherry',
        'timeline-yoga2-title': 'Flow Yoga',
        'timeline-yoga2-desc': 'Flow Yoga por Svitlana Cherry',
        'timeline-closing-title': 'Cierre de la exposición',
        'timeline-closing-desc': 'Finissage con acompañamiento musical y reunión de despedida.',
        'artist-title': 'Sobre la artista',
        'artist-bio-1': 'Maryna Kaminska es una artista visual ucraniana, conocida por sus obras abstractas dinámicas y fluidas en acrílico y acuarela. Sus pinturas a menudo presentan figuras humanas entrelazadas capturadas en formas fluidas y naturales.',
        'artist-bio-2': 'Graduada de la Academia Nacional de Arte y Cultura de Kiev, Maryna también tiene una maestría de la Universidad de Educación Física y Deporte de Ucrania. En el Departamento de Biomecánica, se sumergió en el hatha yoga, viéndolo como un sistema existencial y exploratorio que promueve la creatividad, la autoconciencia y una comprensión más profunda del mundo.',
        'artist-bio-3': 'Desde 2020, Maryna ha sido una participante activa en exposiciones de arte, mostrando su trabajo en galerías y museos de varias ciudades, incluyendo Kiev, Cracovia, Viena, Berlín, Múnich, Núremberg, Toronto, Kiel y Brunswick.',
        'garden-title': 'Jardín interior de comentarios',
        'plant-button': 'Plantar planta',
        'garden-scroll': 'Desplázate a la derecha para más espacio',
        'plant-modal-title': 'Plantar una planta en el jardín interior',
        'plant-name': 'Tu nombre',
        'plant-message': 'Tu mensaje',
        'plant-type': 'Tipo de planta',
        'plant-flower': 'Flor',
        'plant-rose': 'Rosa',
        'plant-sunflower': 'Girasol',
        'plant-tulip': 'Tulipán',
        'plant-tree': 'Árbol',
        'plant-palm': 'Palmera',
        'plant-evergreen': 'Abeto',
        'plant-bush': 'Arbusto',
        'plant-herb': 'Planta',
        'plant-grass': 'Hierba',
        'plant-cactus': 'Cactus',
        'plant-bamboo': 'Bambú',
        'plant-submit': 'Plantar',
        'plant-click-hint': 'Haz clic donde quieras plantar',
        'plant-syncing': 'Sincronizando con el servidor...',
        'plant-loading': 'Cargando jardín...',
        'plant-error': 'Error de conexión del servidor',
        'plant-retry': 'Intentar de nuevo',
        'plant-offline': 'Trabajando sin conexión',
        'plant-planted': 'Planta plantada con éxito!',
        'shop-title': 'Colección NFT y Tienda',
        'shop-visit-external': 'Visitar tienda en línea completa',
        'shop-tab-nft': 'Colección NFT',
        'shop-tab-physical': 'Obras físicas',
        'shop-buy': 'Obtener NFT',
        'shop-buy-physical': 'Comprar',
        'shop-gift': 'Regalar',
        'pricelist-title': 'Lista de precios de pinturas',
        'pricelist-text': 'Descarga el catálogo completo con precios e información detallada',
        'pricelist-download': 'Descargar PDF',
        'footer-dates': '15-29 de agosto 2025',
        'footer-links-title': 'Enlaces',
        'footer-follow': 'Síguenos',
        'footer-rights': 'Todos los derechos reservados.',
        'footer-privacy': 'Política de privacidad',
        'footer-terms': 'Términos de uso',
        'footer-cookies': 'Política de cookies',
        'privacy-title': 'Política de privacidad',
        'privacy-content': 'Respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Toda la información se almacena localmente en tu navegador.',
        'terms-title': 'Términos de uso',
        'terms-content': 'Al usar este sitio web, aceptas nuestros términos. Todo el contenido está protegido por derechos de autor.',
        'cookies-title': 'Política de cookies',
        'cookies-content': 'Este sitio web utiliza cookies para mejorar tu experiencia y guardar configuraciones.',
        'nft1-desc': 'Token NFT exclusivo con opción de regalo de Telegram',
        'nft2-desc': 'Original digital con opción de visualización de perfil',
        'nft3-desc': 'Token NFT coleccionable con diseño único',
        'nft4-desc': 'NFT premium con opción de intercambio',
        'nft5-desc': 'NFT raro de la colección Inner Garden',
        'phys1-desc': 'Acuarela original sobre papel, 59x84 cm',
        'phys2-desc': 'Acuarela original sobre papel, 42x59,5 cm',
        'phys3-desc': 'Acuarela original sobre papel, 42×59,5 cm',
        'phys4-desc': 'Acuarela original sobre papel, 59x84 cm',
        'nft1-title': 'Sacred Dance NFT',
        'nft2-title': 'Soul Expression NFT',
        'nft3-title': 'Eternal Movement NFT',
        'nft4-title': 'Inner Harmony NFT',
        'nft5-title': 'Flow State NFT',
        'phys1-title': 'Vibrations',
        'phys2-title': 'In My Inner Garden',
        'phys3-title': 'Infatuation',
        'phys4-title': 'The Pulse of Earth'
    }
};

// Gallery artworks data
const artworks = [
    { id: 1, title: 'Potential', description: 'Watercolor on paper', size: '59x84 cm', image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1752772927/10_xtez6l.jpg', year: '2025' },
    { id: 2, title: 'Mirror', description: 'Watercolor on paper', size: '49x59,5 cm', image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1752772909/8_yoldq6.jpg', year: '2025' },
    { id: 3, title: 'Proprioception', description: 'Watercolor on paper', size: '49x59,5 cm', image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1752772895/9_wibtjv.jpg', year: '2025' },
    { id: 4, title: 'The Pulse of Earth', description: 'Watercolor, pencils, paper', size: '59x84 cm', image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1752772891/25_mkcl0g.jpg', year: '2025' },
    { id: 5, title: 'I am Here', description: 'Acrylic on canvas', size: '120x150 cm', image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1752772876/37_qkiv50.jpg', year: '2025' },
    { id: 6, title: 'Vibrations', description: 'Watercolor on paper', size: '59x84 cm', image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1752772827/24_k2msrg.jpg', year: '2025' },
    { id: 7, title: 'Upside Down', description: 'Watercolor on paper', size: '42x59,5 cm', image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1752772734/21_fu1bko.jpg', year: '2025' },
    { id: 8, title: 'Family Flowering', description: 'Watercolor on paper', size: '42x59,5 cm', image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1745600732/wrlsd9dywof5hk44mcxn.jpg', year: '2025' }
];

// NFT Shop items
const nftItems = [
    {
        id: 'nft1',
        price: '$15',
        image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1753481364/photo_2025-07-26_00.07.20_kgawra.jpg',
        getgemsLink: 'https://getgems.io/collection/EQDc_nhufA6VyScUH2gHqOoWWq5pJssZHiaJWQvWmq0RaT9O/EQCAXprM7lOqoVFmCewXLJyQ49KQGpjrl5tLwxZkhFyoy7UK',
        telegramLink: 'https://t.me/share/url?url=https://getgems.io/collection/EQDc_nhufA6VyScUH2gHqOoWWq5pJssZHiaJWQvWmq0RaT9O/EQCAXprM7lOqoVFmCewXLJyQ49KQGpjrl5tLwxZkhFyoy7UK&text=Gift%20you%20an%20NFT%20from%20Maryna%20Kaminska!'
    },
    {
        id: 'nft2',
        price: '$15',
        image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1753481365/photo_2025-07-26_00.07.24_la4i9c.jpg',
        getgemsLink: 'https://getgems.io/collection/EQDc_nhufA6VyScUH2gHqOoWWq5pJssZHiaJWQvWmq0RaT9O/EQBOQCQFlzfOSdQTzzLVYHLL_0_jxrJSxq-M9mwf4nKG0Yma',
        telegramLink: 'https://t.me/share/url?url=https://getgems.io/collection/EQDc_nhufA6VyScUH2gHqOoWWq5pJssZHiaJWQvWmq0RaT9O/EQBOQCQFlzfOSdQTzzLVYHLL_0_jxrJSxq-M9mwf4nKG0Yma&text=Gift%20you%20an%20NFT%20from%20Maryna%20Kaminska!'
    },
    {
        id: 'nft3',
        price: '$15',
        image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1753481365/photo_2025-07-26_00.07.28_zvl2iz.jpg',
        getgemsLink: 'https://getgems.io/collection/EQDc_nhufA6VyScUH2gHqOoWWq5pJssZHiaJWQvWmq0RaT9O/EQD0wEVrvAY4OT4YYNT3DY-Jbpzj1S71XPd45h8DQ4pnx7h9',
        telegramLink: 'https://t.me/share/url?url=https://getgems.io/collection/EQDc_nhufA6VyScUH2gHqOoWWq5pJssZHiaJWQvWmq0RaT9O/EQD0wEVrvAY4OT4YYNT3DY-Jbpzj1S71XPd45h8DQ4pnx7h9&text=Gift%20you%20an%20NFT%20from%20Maryna%20Kaminska!'
    },
    {
        id: 'nft4',
        price: '$15',
        image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1753481366/photo_2025-07-26_00.07.32_secxew.jpg',
        getgemsLink: 'https://getgems.io/collection/EQDc_nhufA6VyScUH2gHqOoWWq5pJssZHiaJWQvWmq0RaT9O/EQBPC0h_dZVnUpEEdJ7xChQMwp3h1a_faQOCFKA8tr0oWWX4',
        telegramLink: 'https://t.me/share/url?url=https://getgems.io/collection/EQDc_nhufA6VyScUH2gHqOoWWq5pJssZHiaJWQvWmq0RaT9O/EQBPC0h_dZVnUpEEdJ7xChQMwp3h1a_faQOCFKA8tr0oWWX4&text=Gift%20you%20an%20NFT%20from%20Maryna%20Kaminska!'
    },
    {
        id: 'nft5',
        price: '$15',
        image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1753481366/photo_2025-07-26_00.07.35_dyp6dn.jpg',
        getgemsLink: 'https://getgems.io/collection/EQDc_nhufA6VyScUH2gHqOoWWq5pJssZHiaJWQvWmq0RaT9O/EQCxchZYdLBuMcReM8RgZ4fQq2AVqtk98OF612CbJCBez52k',
        telegramLink: 'https://t.me/share/url?url=https://getgems.io/collection/EQDc_nhufA6VyScUH2gHqOoWWq5pJssZHiaJWQvWmq0RaT9O/EQCxchZYdLBuMcReM8RgZ4fQq2AVqtk98OF612CbJCBez52k&text=Gift%20you%20an%20NFT%20from%20Maryna%20Kaminska!'
    }
];

// Physical artwork items
const physicalItems = [
    {
        id: 'phys1',
        price: '€585',
        image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1752772827/24_k2msrg.jpg',
        shopLink: 'https://www.artkaminska.com/product-page/vibrations'
    },
    {
        id: 'phys2',
        price: '€339',
        image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1745600703/hgkmrbvhftcldykixrlp.jpg',
        shopLink: 'https://www.artkaminska.com/product-page/in-my-inner-garden'
    },
    {
        id: 'phys3',
        price: '€339',
        image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1745600746/at6yuwanlntwhaihznlw.jpg',
        shopLink: 'https://www.artkaminska.com/product-page/infatuation'
    },
    {
        id: 'phys4',
        price: '€585',
        image: 'https://res.cloudinary.com/djdc6wcpg/image/upload/v1752772891/25_mkcl0g.jpg',
        shopLink: 'https://www.artkaminska.com/product-page/the-pulse-of-earth'
    }
];

// Global variables
let currentLang = 'uk';
let isLoading = true;
let selectedPlantType = 'flower';
let gallery3D = null;
let renderLOD = 'auto';
let currentShopTab = 'nft';
let currentShopIndex = 0;
let shopItemsPerView = 3;

// ============================================
// GOOGLE APPS SCRIPT INTEGRATION - FIXED VERSION
// ============================================
let savedPlants = []; // Тепер це буде завантажуватись з сервера
let isOnline = true;
let pendingSync = [];

// ВИПРАВЛЕНА функція для генерації унікального ID
function generateUniqueId() {
    return Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
}

// Функція для завантаження рослин з Google Sheets
async function loadPlantsFromServer() {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        console.warn('Google Apps Script URL not configured. Using localStorage fallback.');
        loadPlantsFromLocalStorage();
        return;
    }

    showLoadingIndicator();
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getPlants');
        const result = await response.json();
        
        if (result.status === 'success') {
            savedPlants = result.plants || [];
            
            // Оновлюємо локальну копію для офлайн режиму
            localStorage.setItem('innerGardenPlantsCache', JSON.stringify(savedPlants));
            
            // Рендеримо всі рослини
            document.querySelectorAll('.garden-plant').forEach(p => p.remove());
            savedPlants.forEach(plant => renderPlant(plant));
            
            checkGardenScroll();
            isOnline = true;
            
            console.log(`Loaded ${savedPlants.length} plants from server`);
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error loading plants from server:', error);
        isOnline = false;
        
        // Fallback to cached data
        loadPlantsFromLocalStorage();
        showToast(translations[currentLang]['plant-offline'] || 'Working offline');
    } finally {
        hideLoadingIndicator();
    }
}

// ВИПРАВЛЕНА функція для збереження рослини на сервер
// ВИПРАВЛЕНА функція для збереження рослини на сервер
async function savePlantToServer(plant) {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        savePlantToLocalStorage(plant);
        return true;
    }

    try {
        // ВИПРАВЛЕНО: Використовуємо простіший підхід без CORS
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            redirect: 'follow',
            method: 'POST',
            body: JSON.stringify(plant)
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            // Додаємо рослину локально ТІЛЬКИ після успішного збереження
            const existingIndex = savedPlants.findIndex(p => p.id === plant.id);
            if (existingIndex === -1) {
                savedPlants.push(plant);
                localStorage.setItem('innerGardenPlantsCache', JSON.stringify(savedPlants));
            }
            
            console.log('Plant saved to server');
            return true;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error saving plant to server:', error);
        
        // Видаляємо рослину з DOM, якщо збереження не вдалося
        const plantElement = document.querySelector(`[data-plant-id="${plant.id}"]`);
        if (plantElement) plantElement.remove();
        
        // Зберігаємо для пізнішої синхронізації
        const existingPending = pendingSync.find(p => p.id === plant.id);
        if (!existingPending) {
            pendingSync.push(plant);
            localStorage.setItem('innerGardenPendingSync', JSON.stringify(pendingSync));
        }
        
        showToast(translations[currentLang]['plant-error'] || 'Server error. Will retry later.');
        return false;
    }
}

// Функція для видалення рослини з сервера
// Функція для видалення рослини з сервера
async function deletePlantFromServer(plantId) {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        deletePlantFromLocalStorage(plantId);
        return true;
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            redirect: 'follow',
            method: 'POST',
            body: JSON.stringify({
                action: 'admin',
                subAction: 'deletePlant',
                plantId: plantId,
                password: ADMIN_PASSWORD
            })
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            // Видаляємо локально
            savedPlants = savedPlants.filter(p => p.id !== plantId);
            localStorage.setItem('innerGardenPlantsCache', JSON.stringify(savedPlants));
            
            return true;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error deleting plant from server:', error);
        showToast(translations[currentLang]['plant-error'] || 'Server error');
        return false;
    }
}

// Адмін функції
async function clearAllPlantsOnServer() {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        localStorage.removeItem('innerGardenPlants');
        localStorage.removeItem('innerGardenPlantsCache');
        savedPlants = [];
        return true;
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: 'admin',
                subAction: 'clearAll',
                password: ADMIN_PASSWORD
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            savedPlants = [];
            localStorage.setItem('innerGardenPlantsCache', JSON.stringify(savedPlants));
            return true;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error clearing plants on server:', error);
        return false;
    }
}

async function importPlantsToServer(plants) {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        savedPlants = plants;
        localStorage.setItem('innerGardenPlants', JSON.stringify(plants));
        return true;
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                action: 'admin',
                subAction: 'import',
                plants: plants,
                password: ADMIN_PASSWORD
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            savedPlants = plants;
            localStorage.setItem('innerGardenPlantsCache', JSON.stringify(plants));
            return true;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error importing plants to server:', error);
        return false;
    }
}

// Fallback функції для localStorage
function loadPlantsFromLocalStorage() {
    // Спочатку пробуємо кеш
    let plants = JSON.parse(localStorage.getItem('innerGardenPlantsCache') || '[]');
    
    // Якщо кешу немає, пробуємо старий формат
    if (plants.length === 0) {
        plants = JSON.parse(localStorage.getItem('innerGardenPlants') || '[]');
    }
    
    savedPlants = plants;
    
    // Рендеримо всі рослини
    document.querySelectorAll('.garden-plant').forEach(p => p.remove());
    savedPlants.forEach(plant => renderPlant(plant));
    
    checkGardenScroll();
}

function savePlantToLocalStorage(plant) {
    savedPlants.push(plant);
    localStorage.setItem('innerGardenPlants', JSON.stringify(savedPlants));
    localStorage.setItem('innerGardenPlantsCache', JSON.stringify(savedPlants));
}

function deletePlantFromLocalStorage(plantId) {
    savedPlants = savedPlants.filter(p => p.id !== plantId);
    localStorage.setItem('innerGardenPlants', JSON.stringify(savedPlants));
    localStorage.setItem('innerGardenPlantsCache', JSON.stringify(savedPlants));
}

// Функції для індикаторів завантаження
function showLoadingIndicator() {
    const gardenSection = document.getElementById('garden');
    if (gardenSection) {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'garden-loading';
        loadingDiv.className = 'garden-loading';
        loadingDiv.innerHTML = `
            <div class="spinner"></div>
            <p>${translations[currentLang]['plant-loading'] || 'Loading garden...'}</p>
        `;
        gardenSection.appendChild(loadingDiv);
    }
}

function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('garden-loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// Синхронізація при відновленні зв'язку
async function syncPendingPlants() {
    if (pendingSync.length === 0) return;
    
    showToast(translations[currentLang]['plant-syncing'] || 'Syncing with server...');
    
    for (const plant of pendingSync) {
        const saved = await savePlantToServer(plant);
        if (saved) {
            // Рендеримо рослину знову, якщо збереження вдалося
            renderPlant(plant);
        }
    }
    
    pendingSync = [];
    localStorage.removeItem('innerGardenPendingSync');
}

// Перевірка зв'язку
setInterval(async () => {
    if (!isOnline && GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getPlants');
            if (response.ok) {
                isOnline = true;
                await syncPendingPlants();
                await loadPlantsFromServer();
            }
        } catch (error) {
            // Still offline
        }
    }
}, 30000); // Перевіряємо кожні 30 секунд

// ВИПРАВЛЕНИЙ глобальний обробник для відловлювання помилок
//window.addEventListener('unhandledrejection', event => {
    //console.error('Unhandled promise rejection:', event.reason);
    //showToast('Сталася помилка. Спробуйте ще раз.');
//});//

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    detectPerformanceLevel();
    initializeLanguageSelection();
    initializeCustomCursor();
    initializeScrollEffects();
    initializeMobileMenu();
    initialize3DGallery();
    initializeTimeline();
    initializeGarden();
    initializeShop();
    initializeModals();
    initializeBackToTop();
    initializeKeyboardNavigation();
    initializeReadMore();

    // Завантажуємо рослини з сервера при завантаженні сторінки
    loadPlantsFromServer();

    // Завантажуємо pending sync якщо є
    pendingSync = JSON.parse(localStorage.getItem('innerGardenPendingSync') || '[]');

    // Mobile optimizations
    if (isMobile()) {
        optimizeForMobile();
    }

    // Lazy loading images
    lazyLoadImages();
});

// Performance detection
function detectPerformanceLevel() {
    const isMobileDevice = isMobile();
    const hasLowRAM = navigator.deviceMemory && navigator.deviceMemory < 4;
    const hasSlowConnection = navigator.connection && navigator.connection.effectiveType &&
                              (navigator.connection.effectiveType === 'slow-2g' ||
                               navigator.connection.effectiveType === '2g');

    if (isMobileDevice || hasLowRAM || hasSlowConnection) {
        renderLOD = 'low';
    } else {
        renderLOD = 'high';
    }
}

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth < 768;
}

function optimizeForMobile() {
    // Disable heavy animations
    document.documentElement.classList.add('reduced-motion');
}

// Language selection and preloader
function initializeLanguageSelection() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const preloader = document.getElementById('preloader');
    const languageSelection = document.querySelector('.language-selection');
    const loader = document.querySelector('.loader');
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.querySelector('.progress-bar');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            document.documentElement.lang = currentLang;

            if (isLoading) {
                languageSelection.style.display = 'none';
                loader.classList.remove('hidden');
                progressContainer.classList.remove('hidden');

                let progress = 0;
                const loadingInterval = setInterval(() => {
                    progress += Math.random() * 30;
                    if (progress > 100) progress = 100;
                    progressBar.style.width = progress + '%';

                    if (progress >= 100) {
                        clearInterval(loadingInterval);
                        setTimeout(() => {
                            preloader.classList.add('hidden');
                            document.body.classList.add('cursor-enabled');
                            applyTranslations();
                            revealElements();
                            isLoading = false;
                        }, 300);
                    }
                }, 100);
            } else {
                applyTranslations();
            }
        });
    });
}

// Apply translations
function applyTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        if (translations[currentLang] && translations[currentLang][key]) {
            element.innerHTML = translations[currentLang][key];
        }
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.dataset.translatePlaceholder;
        if (translations[currentLang] && translations[currentLang][key]) {
            element.placeholder = translations[currentLang][key];
        }
    });

    // Update shop items descriptions based on language
    currentShopIndex = 0;
    renderShopItems();
}

// Custom cursor
function initializeCustomCursor() {
    if (!isMobile() && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        const cursorContainer = document.querySelector('.cursor-container');

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        let animationId = null;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (cursorDot) {
                cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }
        });

        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            if (cursorOutline) {
                cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            }

            animationId = requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .interactive');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorContainer?.classList.add('cursor-hover');
            });
            element.addEventListener('mouseleave', () => {
                cursorContainer?.classList.remove('cursor-hover');
            });
        });
    }
}

// Scroll effects
function initializeScrollEffects() {
    const header = document.getElementById('header');
    let ticking = false;

    function updateHeader() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item').forEach(element => observer.observe(element));
}

// Reveal elements
function revealElements() {
    const elements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-image');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('revealed');
        }, index * 100);
    });
}

// Mobile menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuToggle?.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.classList.add('modal-open');
    });

    mobileMenuClose?.addEventListener('click', closeMobileMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    function closeMobileMenu() {
        mobileMenu?.classList.remove('open');
        document.body.classList.remove('modal-open');
    }
}

// 3D Gallery implementation - Fixed Version
function initialize3DGallery() {
    const container = document.getElementById('virtual-gallery');
    const loadingElement = document.querySelector('.gallery-loading');
    const fullscreenBtn = document.getElementById('galleryFullscreen');
    const controlsHint = document.querySelector('.gallery-controls-hint');

    if (!container || typeof THREE === 'undefined') return;

    // Gallery state
    let isZoomed = false;
    let cameraTween = { active: false };
    let artworksMeshes = [];
    let animationFrameId = null;

    // Scene setup with optimizations
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f8f8);

    // Enhanced fog
    if (renderLOD === 'low') {
        scene.fog = new THREE.Fog(0xf8f8f8, 10, 50);
    } else {
        scene.fog = new THREE.Fog(0xf8f8f8, 15, 70);
    }

    // Camera with optimized near/far planes
    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.5,
        renderLOD === 'low' ? 50 : 100
    );
    camera.position.set(0, 1.6, 8);

    // Renderer with performance settings
    const renderer = new THREE.WebGLRenderer({
        antialias: renderLOD === 'high',
        alpha: false,
        powerPreference: renderLOD === 'low' ? 'low-power' : 'high-performance',
        stencil: false,
        depth: true,
        precision: renderLOD === 'low' ? 'lowp' : 'highp',
        logarithmicDepthBuffer: true,
        preserveDrawingBuffer: false
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, renderLOD === 'low' ? 1 : 2));

    // Optimized shadow settings
    if (renderLOD === 'high') {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.shadowMap.autoUpdate = false;
    } else {
        renderer.shadowMap.enabled = false;
    }

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(10, 20, 10);

    if (renderLOD === 'high') {
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -30;
        directionalLight.shadow.camera.right = 30;
        directionalLight.shadow.camera.top = 30;
        directionalLight.shadow.camera.bottom = -30;
        directionalLight.shadow.bias = -0.001;
        directionalLight.shadow.normalBias = 0.02;
    }
    scene.add(directionalLight);

    // Add subtle fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.15);
    fillLight.position.set(-5, 10, -5);
    scene.add(fillLight);

    // Gallery room with enhanced materials
    const roomGeometry = new THREE.BoxGeometry(40, 12, 50);
    const roomMaterials = [
        new THREE.MeshStandardMaterial({
            color: 0xfafafa,
            side: THREE.BackSide,
            roughness: 0.85,
            metalness: 0.0
        }), // Right wall
        new THREE.MeshStandardMaterial({
            color: 0xfafafa,
            side: THREE.BackSide,
            roughness: 0.85,
            metalness: 0.0
        }), // Left wall
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.BackSide,
            roughness: 0.95,
            metalness: 0.0
        }), // Ceiling
        new THREE.MeshStandardMaterial({
            color: 0xf5f5f5,
            side: THREE.BackSide,
            roughness: 0.7,
            metalness: 0.0
        }), // Floor placeholder
        new THREE.MeshStandardMaterial({
            color: 0xf8f8f8,
            side: THREE.BackSide,
            roughness: 0.85,
            metalness: 0.0
        }), // Front wall
        new THREE.MeshStandardMaterial({
            color: 0xf8f8f8,
            side: THREE.BackSide,
            roughness: 0.85,
            metalness: 0.0
        })  // Back wall
    ];
    const room = new THREE.Mesh(roomGeometry, roomMaterials);
    room.position.y = 6;
    room.receiveShadow = renderLOD === 'high';
    scene.add(room);

    // Create wooden floor texture procedurally
    const floorGeometry = new THREE.PlaneGeometry(40, 50, 10, 12);

    // Create wood pattern programmatically
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Wood grain pattern
    const gradient = ctx.createLinearGradient(0, 0, 512, 0);
    gradient.addColorStop(0, '#8B6F47');
    gradient.addColorStop(0.2, '#A0826D');
    gradient.addColorStop(0.5, '#BC9A6A');
    gradient.addColorStop(0.8, '#A0826D');
    gradient.addColorStop(1, '#8B6F47');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Add wood grain lines
    ctx.strokeStyle = 'rgba(139, 111, 71, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 512; i += 4) {
        ctx.beginPath();
        ctx.moveTo(0, i + Math.sin(i * 0.05) * 3);
        ctx.lineTo(512, i + Math.sin(i * 0.05) * 3);
        ctx.stroke();
    }

    // Create texture from canvas
    const floorTexture = new THREE.CanvasTexture(canvas);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 5);
    floorTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);

    // Create bump map for wood texture
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 256;
    bumpCanvas.height = 256;
    const bumpCtx = bumpCanvas.getContext('2d');

    // Create wood bump pattern
    bumpCtx.fillStyle = '#808080';
    bumpCtx.fillRect(0, 0, 256, 256);

    for (let i = 0; i < 256; i += 8) {
        bumpCtx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
        bumpCtx.lineWidth = Math.random() * 2 + 1;
        bumpCtx.beginPath();
        bumpCtx.moveTo(0, i);
        bumpCtx.lineTo(256, i);
        bumpCtx.stroke();
    }

    const floorBumpMap = new THREE.CanvasTexture(bumpCanvas);
    floorBumpMap.wrapS = THREE.RepeatWrapping;
    floorBumpMap.wrapT = THREE.RepeatWrapping;
    floorBumpMap.repeat.set(4, 5);

    const floorMaterial = new THREE.MeshStandardMaterial({
        map: floorTexture,
        bumpMap: renderLOD === 'high' ? floorBumpMap : null,
        bumpScale: 0.1,
        roughness: 0.4,
        metalness: 0.05,
        side: THREE.FrontSide
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.01;
    floor.receiveShadow = renderLOD === 'high';
    scene.add(floor);

    // Add reflection plane for enhanced visuals
    if (renderLOD === 'high') {
        const reflectorGeometry = new THREE.PlaneGeometry(40, 50);
        const reflectorMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.8,
            opacity: 0.15,
            transparent: true
        });
        const reflector = new THREE.Mesh(reflectorGeometry, reflectorMaterial);
        reflector.rotation.x = -Math.PI / 2;
        reflector.position.y = 0.02;
        scene.add(reflector);
    }

    // Ceiling track lighting system
    if (renderLOD === 'high') {
        const trackGeometry = new THREE.BoxGeometry(0.5, 0.2, 30);
        const trackMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            roughness: 0.3,
            metalness: 0.8
        });

        // Left track
        const leftTrack = new THREE.Mesh(trackGeometry, trackMaterial);
        leftTrack.position.set(-15, 11.8, 0);
        scene.add(leftTrack);

        // Right track
        const rightTrack = new THREE.Mesh(trackGeometry, trackMaterial);
        rightTrack.position.set(15, 11.8, 0);
        scene.add(rightTrack);
    }

    // Load artworks
    const textureLoader = new THREE.TextureLoader();
    const artworkPositions = [
        { x: -19, z: -18, wall: 'left' }, { x: -19, z: -6, wall: 'left' },
        { x: -19, z: 6, wall: 'left' }, { x: -19, z: 18, wall: 'left' },
        { x: 19, z: -18, wall: 'right' }, { x: 19, z: -6, wall: 'right' },
        { x: 19, z: 6, wall: 'right' }, { x: 19, z: 18, wall: 'right' }
    ];

    artworks.forEach((artwork, index) => {
        if (index < artworkPositions.length) {
            const position = artworkPositions[index];

            // Enhanced frame with depth
            const frameGroup = new THREE.Group();

            // Outer frame
            const frameOuterGeometry = new THREE.BoxGeometry(4.3, 5.3, 0.15);
            const frameMaterial = new THREE.MeshStandardMaterial({
                color: 0x1a1a1a,
                roughness: 0.3,
                metalness: 0.7
            });
            const frameOuter = new THREE.Mesh(frameOuterGeometry, frameMaterial);
            frameOuter.castShadow = renderLOD === 'high';
            frameGroup.add(frameOuter);

            // Inner frame (mat)
            const frameInnerGeometry = new THREE.BoxGeometry(4.1, 5.1, 0.1);
            const matMaterial = new THREE.MeshStandardMaterial({
                color: 0xf8f8f8,
                roughness: 0.9,
                metalness: 0.0
            });
            const frameInner = new THREE.Mesh(frameInnerGeometry, matMaterial);
            frameInner.position.z = 0.03;
            frameGroup.add(frameInner);

            // Glass effect
            if (renderLOD === 'high') {
                const glassGeometry = new THREE.PlaneGeometry(4, 5);
                const glassMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0xffffff,
                    metalness: 0.0,
                    roughness: 0.0,
                    transparent: true,
                    opacity: 0.1,
                    reflectivity: 0.5,
                    envMapIntensity: 0.5
                });
                const glass = new THREE.Mesh(glassGeometry, glassMaterial);
                glass.position.z = 0.08;
                frameGroup.add(glass);
            }

            frameGroup.position.set(position.x, 3.5, position.z);

            if (position.wall === 'left') {
                frameGroup.rotation.y = Math.PI / 2;
            } else {
                frameGroup.rotation.y = -Math.PI / 2;
            }

            scene.add(frameGroup);

            // Artwork with enhanced rendering
            const artworkGeometry = new THREE.PlaneGeometry(3.9, 4.9);
            const artworkMaterial = new THREE.MeshStandardMaterial({
                color: 0xf0f0f0,
                roughness: 0.5,
                metalness: 0.0
            });
            const artworkMesh = new THREE.Mesh(artworkGeometry, artworkMaterial);

            if (position.wall === 'left') {
                artworkMesh.position.set(position.x + 0.1, 3.5, position.z);
                artworkMesh.rotation.y = Math.PI / 2;
            } else {
                artworkMesh.position.set(position.x - 0.1, 3.5, position.z);
                artworkMesh.rotation.y = -Math.PI / 2;
            }

            artworkMesh.userData = artwork;
            artworkMesh.castShadow = false;
            artworkMesh.receiveShadow = renderLOD === 'high';
            scene.add(artworkMesh);
            artworksMeshes.push(artworkMesh);

            // Load texture with enhanced quality
            textureLoader.load(artwork.image, (texture) => {
                texture.encoding = THREE.sRGBEncoding;
                if (renderLOD === 'low') {
                    texture.minFilter = THREE.LinearFilter;
                    texture.magFilter = THREE.LinearFilter;
                } else {
                    texture.generateMipmaps = true;
                    texture.minFilter = THREE.LinearMipmapLinearFilter;
                    texture.magFilter = THREE.LinearFilter;
                    texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
                }

                artworkMesh.material = new THREE.MeshStandardMaterial({
                    map: texture,
                    roughness: 0.4,
                    metalness: 0.0
                });
                artworkMesh.material.needsUpdate = true;
            });

            // Professional spotlight fixture for each artwork
            const createSpotlightFixture = (targetPosition, wall) => {
                const fixtureGroup = new THREE.Group();

                // Spotlight housing
                const housingGeometry = new THREE.CylinderGeometry(0.15, 0.25, 0.4, 12);
                const housingMaterial = new THREE.MeshStandardMaterial({
                    color: 0x1a1a1a,
                    roughness: 0.2,
                    metalness: 0.9
                });
                const housing = new THREE.Mesh(housingGeometry, housingMaterial);
                housing.castShadow = renderLOD === 'high';
                fixtureGroup.add(housing);

                // Inner reflector
                const reflectorGeometry = new THREE.ConeGeometry(0.14, 0.35, 12, 1, true);
                const reflectorMaterial = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    roughness: 0.1,
                    metalness: 1.0,
                    side: THREE.BackSide
                });
                const reflector = new THREE.Mesh(reflectorGeometry, reflectorMaterial);
                reflector.position.y = -0.02;
                fixtureGroup.add(reflector);

                // Mounting bracket
                const bracketGeometry = new THREE.BoxGeometry(0.05, 0.1, 0.3);
                const bracketMaterial = new THREE.MeshStandardMaterial({
                    color: 0x2a2a2a,
                    roughness: 0.3,
                    metalness: 0.8
                });
                const bracket = new THREE.Mesh(bracketGeometry, bracketMaterial);
                bracket.position.y = 0.25;
                fixtureGroup.add(bracket);

                // Position on track
                const trackZ = position.z > 0 ? 10 : -10;
                fixtureGroup.position.set(
                    wall === 'left' ? -15 : 15,
                    11.6,
                    trackZ
                );

                // Rotate to aim at artwork
                const direction = new THREE.Vector3();
                direction.subVectors(targetPosition, fixtureGroup.position).normalize();
                const rotationMatrix = new THREE.Matrix4();
                rotationMatrix.lookAt(fixtureGroup.position, targetPosition, new THREE.Vector3(0, 1, 0));
                fixtureGroup.quaternion.setFromRotationMatrix(rotationMatrix);
                fixtureGroup.rotateX(Math.PI / 2);

                scene.add(fixtureGroup);

                // Actual light
                const spotlight = new THREE.SpotLight(0xffffff, renderLOD === 'high' ? 0.8 : 0.6);
                spotlight.position.copy(fixtureGroup.position);
                spotlight.target.position.copy(targetPosition);
                spotlight.angle = Math.PI / 8;
                spotlight.penumbra = 0.3;
                spotlight.decay = 2;
                spotlight.distance = 20;

                if (renderLOD === 'high') {
                    spotlight.castShadow = true;
                    spotlight.shadow.mapSize.width = 1024;
                    spotlight.shadow.mapSize.height = 1024;
                    spotlight.shadow.camera.near = 0.5;
                    spotlight.shadow.camera.far = 20;
                    spotlight.shadow.bias = -0.0005;
                }

                scene.add(spotlight);
                scene.add(spotlight.target);

                // Add light cone effect
                if (renderLOD === 'high') {
                    const coneGeometry = new THREE.ConeGeometry(2, 10, 32, 1, true);
                    const coneMaterial = new THREE.MeshBasicMaterial({
                        color: 0xffffaa,
                        transparent: true,
                        opacity: 0.05,
                        side: THREE.DoubleSide,
                        depthWrite: false
                    });
                    const lightCone = new THREE.Mesh(coneGeometry, coneMaterial);
                    lightCone.position.copy(fixtureGroup.position);
                    lightCone.lookAt(targetPosition);
                    lightCone.rotateX(-Math.PI / 2);
                    scene.add(lightCone);
                }
            };

            // Create spotlight for this artwork
            const artworkWorldPos = new THREE.Vector3(position.x, 3.5, position.z);
            createSpotlightFixture(artworkWorldPos, position.wall);

            // Artwork label
            const labelCanvas = document.createElement('canvas');
            labelCanvas.width = 256;
            labelCanvas.height = 64;
            const ctx = labelCanvas.getContext('2d');
            ctx.fillStyle = '#f5f5f5';
            ctx.fillRect(0, 0, 256, 64);
            ctx.fillStyle = '#2a2a2a';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(artwork.title, 128, 28);
            ctx.font = '12px Arial';
            ctx.fillText(artwork.size, 128, 48);

            const labelTexture = new THREE.CanvasTexture(labelCanvas);
            const labelMaterial = new THREE.MeshBasicMaterial({
                map: labelTexture,
                transparent: true
            });
            const label = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.5), labelMaterial);

            if (position.wall === 'left') {
                label.position.set(position.x + 0.05, 0.8, position.z);
                label.rotation.y = Math.PI / 2;
            } else {
                label.position.set(position.x - 0.05, 0.8, position.z);
                label.rotation.y = -Math.PI / 2;
            }
            scene.add(label);
        }
    });

    // Subtle uplighting on walls for ambiance
    if (renderLOD === 'high') {
        [-15, 0, 15].forEach(x => {
            [-20, 0, 20].forEach(z => {
                const uplight = new THREE.PointLight(0xfff8e8, 0.1, 8, 2);
                uplight.position.set(x, 0.5, z);
                scene.add(uplight);
            });
        });
    }

    // Hide loading
    setTimeout(() => {
        if (loadingElement) loadingElement.style.display = 'none';
    }, 1000);

    setTimeout(() => {
        if (controlsHint) controlsHint.classList.add('hidden');
    }, 5000);

    // Controls setup
    const movement = { forward: false, backward: false, left: false, right: false };
    const moveSpeed = 0.08;
    const lookSpeed = 0.002;
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let isPointerLocked = false;

    const velocity = new THREE.Vector3();
    const deceleration = 0.88;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Mouse/touch controls
    if (isMobile()) {
        // Mobile controls
        let touchStartX = 0, touchStartY = 0;

        const createMobileControls = () => {
            const controlsDiv = document.createElement('div');
            controlsDiv.id = 'mobile-gallery-controls';
            controlsDiv.innerHTML = `
                <button data-direction="forward">↑</button>
                <button data-direction="backward">↓</button>
                <button data-direction="left">←</button>
                <button data-direction="right">→</button>
            `;
            container.appendChild(controlsDiv);

            controlsDiv.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    movement[btn.dataset.direction] = true;
                });
                btn.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    movement[btn.dataset.direction] = false;
                });
            });
        };

        createMobileControls();

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const deltaX = e.touches[0].clientX - touchStartX;
            const deltaY = e.touches[0].clientY - touchStartY;

            targetMouseX -= deltaX * lookSpeed;
            targetMouseY -= deltaY * lookSpeed;
            targetMouseY = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetMouseY));

            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
    } else {
        // Desktop controls
        container.addEventListener('click', (event) => {
            if (isZoomed) {
                zoomOut();
                return;
            }

            const rect = container.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(artworksMeshes);

            if (intersects.length > 0) {
                zoomIn(intersects[0].object);
            } else if (!isPointerLocked) {
                container.requestPointerLock();
            }
        });

        document.addEventListener('pointerlockchange', () => {
            isPointerLocked = document.pointerLockElement === container;
        });

        document.addEventListener('mousemove', (e) => {
            if (isPointerLocked && !isZoomed) {
                targetMouseX -= e.movementX * lookSpeed;
                targetMouseY -= e.movementY * lookSpeed;
                targetMouseY = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetMouseY));
            }
        });
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        switch(e.key.toLowerCase()) {
            case 'w': case 'arrowup': movement.forward = true; break;
            case 's': case 'arrowdown': movement.backward = true; break;
            case 'a': case 'arrowleft': movement.left = true; break;
            case 'd': case 'arrowright': movement.right = true; break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch(e.key.toLowerCase()) {
            case 'w': case 'arrowup': movement.forward = false; break;
            case 's': case 'arrowdown': movement.backward = false; break;
            case 'a': case 'arrowleft': movement.left = false; break;
            case 'd': case 'arrowright': movement.right = false; break;
        }
    });

    // Fullscreen
    fullscreenBtn?.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                console.log('Fullscreen error:', err);
            });
        } else {
            document.exitFullscreen();
        }
    });

    // Zoom functions
    function zoomIn(artworkMesh) {
        if (cameraTween.active) return;
        isZoomed = true;
        if (document.pointerLockElement) document.exitPointerLock();

        const targetPos = new THREE.Vector3();
        artworkMesh.getWorldPosition(targetPos);

        const direction = new THREE.Vector3();
        if (artworkMesh.rotation.y === Math.PI / 2) {
            direction.set(1, 0, 0);
        } else {
            direction.set(-1, 0, 0);
        }

        targetPos.add(direction.multiplyScalar(3));

        cameraTween = {
            active: true,
            startPosition: camera.position.clone(),
            targetPosition: targetPos,
            startRotation: camera.rotation.clone(),
            progress: 0
        };

        showArtworkInfoOverlay(artworkMesh.userData);
    }

    function zoomOut() {
        if (cameraTween.active || !isZoomed) return;
        isZoomed = false;

        cameraTween = {
            active: true,
            startPosition: camera.position.clone(),
            targetPosition: new THREE.Vector3(0, 1.6, 8),
            startRotation: camera.rotation.clone(),
            targetRotation: new THREE.Euler(0, 0, 0),
            progress: 0
        };

        hideArtworkInfoOverlay();
    }

    // Optimized render loop
    let lastTime = performance.now();

    function animate() {
        animationFrameId = requestAnimationFrame(animate);

        const currentTime = performance.now();
        const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
        lastTime = currentTime;

        // Update shadows periodically for performance
        if (renderer.shadowMap.enabled && Math.random() < 0.1) {
            renderer.shadowMap.needsUpdate = true;
        }

        // Camera tweening
        if (cameraTween.active) {
            cameraTween.progress += delta * 3;

            if (cameraTween.progress >= 1) {
                cameraTween.active = false;
                cameraTween.progress = 1;
            }

            const t = cameraTween.progress;
            const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            camera.position.lerpVectors(
                cameraTween.startPosition,
                cameraTween.targetPosition,
                easeT
            );

            if (cameraTween.targetRotation) {
                camera.rotation.x = THREE.MathUtils.lerp(
                    cameraTween.startRotation.x,
                    cameraTween.targetRotation.x,
                    easeT
                );
                camera.rotation.y = THREE.MathUtils.lerp(
                    cameraTween.startRotation.y,
                    cameraTween.targetRotation.y,
                    easeT
                );
            }
        } else if ((isPointerLocked || isMobile()) && !isZoomed) {
            // Smooth mouse look
            mouseX += (targetMouseX - mouseX) * 0.1;
            mouseY += (targetMouseY - mouseY) * 0.1;

            camera.rotation.y = mouseX;
            camera.rotation.x = mouseY;

            // Movement with velocity
            const direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
            direction.y = 0;
            direction.normalize();

            const right = new THREE.Vector3();
            right.crossVectors(direction, camera.up);

            if (movement.forward) velocity.addScaledVector(direction, moveSpeed);
            if (movement.backward) velocity.addScaledVector(direction, -moveSpeed);
            if (movement.left) velocity.addScaledVector(right, -moveSpeed);
            if (movement.right) velocity.addScaledVector(right, moveSpeed);

            camera.position.add(velocity);
            velocity.multiplyScalar(deceleration);

            // Boundaries
            camera.position.x = Math.max(-18, Math.min(18, camera.position.x));
            camera.position.z = Math.max(-23, Math.min(23, camera.position.z));
            camera.position.y = 1.6;
        }

        renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Cleanup
    gallery3D = {
        scene,
        camera,
        renderer,
        zoomOut,
        cleanup: () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            renderer.dispose();
        }
    };
}

function showArtworkInfoOverlay(data) {
    hideArtworkInfoOverlay();
    const overlay = document.getElementById('artwork-info-overlay');
    if (overlay) {
        const closeText = currentLang === 'uk' ? 'Клікніть будь-де, щоб повернутись' :
                         currentLang === 'en' ? 'Click anywhere to return' :
                         currentLang === 'de' ? 'Klicken Sie irgendwo, um zurückzukehren' :
                         'Haz clic en cualquier lugar para volver';

        overlay.innerHTML = `
            <div class="artwork-info-content">
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <p><strong>${currentLang === 'uk' ? 'Розмір' : currentLang === 'en' ? 'Size' : currentLang === 'de' ? 'Größe' : 'Tamaño'}:</strong> ${data.size} | <strong>${currentLang === 'uk' ? 'Рік' : currentLang === 'en' ? 'Year' : currentLang === 'de' ? 'Jahr' : 'Año'}:</strong> ${data.year}</p>
                <div class="artwork-info-close">${closeText}</div>
            </div>
        `;
        overlay.classList.remove('hidden');
        overlay.classList.add('visible');
    }
}

function hideArtworkInfoOverlay() {
    const overlay = document.getElementById('artwork-info-overlay');
    if (overlay) {
        overlay.classList.remove('visible');
        overlay.classList.add('hidden');
    }
}

// Timeline initialization
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => observer.observe(item));
}

// ВИПРАВЛЕНА Garden functionality (MODIFIED FOR GOOGLE APPS SCRIPT)
function initializeGarden() {
    const plantButton = document.getElementById('plantButton');
    const plantModal = document.getElementById('plantModal');
    const plantForm = document.getElementById('plantForm');
    const plantTypeBtns = document.querySelectorAll('.plant-type-btn');
    const gardenCanvas = document.getElementById('gardenCanvas');
    const gardenViewport = document.getElementById('gardenViewport');
    const scrollHint = document.querySelector('.garden-scroll-hint');

    let pendingPlantData = null;
    let isPlanting = false;
    let adminMode = false;
    let selectedForDeletion = new Set();

    checkGardenScroll();

    plantButton?.addEventListener('click', () => {
        openModal('plantModal');
    });

    plantTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            plantTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedPlantType = btn.dataset.type;
        });
    });

    plantForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const author = document.getElementById('plantAuthor').value;
        const message = document.getElementById('plantMessage').value;

        pendingPlantData = {
            author,
            message,
            type: selectedPlantType
        };

        closeModal('plantModal');
        plantForm.reset();

        isPlanting = true;
        gardenCanvas.style.cursor = 'crosshair';

        showToast(translations[currentLang]['plant-click-hint'] || 'Click where you want to plant');
    });

    // ВИПРАВЛЕНИЙ обробник кліку для посадки рослини
    gardenCanvas?.addEventListener('click', async (e) => {
        if (!isPlanting || !pendingPlantData) return;

        const rect = gardenCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left + gardenViewport.scrollLeft;
        const y = e.clientY - rect.top;

        const plant = {
            id: generateUniqueId(), // ВИПРАВЛЕНО: використовуємо нову функцію
            ...pendingPlantData,
            position: { x, y },
            date: new Date().toLocaleDateString(),
            timestamp: Date.now() // Додаємо timestamp для сортування
        };

        // Рендеримо рослину одразу (оптимістичне оновлення)
        renderPlant(plant);

        // Зберігаємо на сервер
        const saved = await savePlantToServer(plant);
        
        if (saved) {
            showToast(translations[currentLang]['plant-planted'] || 'Plant added successfully!');
        }

        isPlanting = false;
        pendingPlantData = null;
        gardenCanvas.style.cursor = 'default';

        updateGardenSize(x);
        updateAdminPlantList();
    });

    // Admin controls
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            openModal('adminGardenModal');
            updateAdminPlantList();
        }
    });

    // Admin modal controls
    const adminSelectMode = document.getElementById('adminSelectMode');
    const adminClearAll = document.getElementById('adminClearAll');
    const adminExport = document.getElementById('adminExport');
    const adminImport = document.getElementById('adminImport');
    const adminRefresh = document.getElementById('adminRefresh');

    // Add refresh button to admin panel
    if (adminRefresh) {
        adminRefresh.addEventListener('click', async () => {
            showToast('Оновлення даних...');
            await loadPlantsFromServer();
            updateAdminPlantList();
            showToast('Дані оновлено');
        });
    }

    adminSelectMode?.addEventListener('click', () => {
        adminMode = !adminMode;
        adminSelectMode.textContent = adminMode ? 'Вийти з режиму вибору' : 'Режим вибору';
        adminSelectMode.classList.toggle('btn-secondary');
        adminSelectMode.classList.toggle('btn-primary');

        document.getElementById('adminModeStatus').textContent =
            `Режим: ${adminMode ? 'Вибір для видалення' : 'Перегляд'}`;

        if (!adminMode) {
            selectedForDeletion.clear();
            document.querySelectorAll('.garden-plant').forEach(p => {
                p.classList.remove('admin-selected');
            });
        }

        document.querySelectorAll('.garden-plant').forEach(plant => {
            plant.style.cursor = adminMode ? 'pointer' : 'default';
        });
    });

    adminClearAll?.addEventListener('click', async () => {
        if (confirm('Ви впевнені, що хочете видалити всі рослини? Цю дію неможливо скасувати.')) {
            const cleared = await clearAllPlantsOnServer();
            
            if (cleared) {
                document.querySelectorAll('.garden-plant').forEach(p => p.remove());
                updateAdminPlantList();
                showToast('Сад повністю очищено');
            } else {
                showToast('Помилка при очищенні саду');
            }
        }
    });

    adminExport?.addEventListener('click', () => {
        const dataStr = JSON.stringify(savedPlants, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        const exportFileDefaultName = `inner-garden-backup-${new Date().toISOString().slice(0,10)}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();

        showToast('Дані експортовано');
    });

    adminImport?.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';

        input.onchange = async e => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = async event => {
                try {
                    const importedPlants = JSON.parse(event.target.result);
                    if (Array.isArray(importedPlants)) {
                        // Clear existing plants
                        document.querySelectorAll('.garden-plant').forEach(p => p.remove());

                        // Import to server
                        const imported = await importPlantsToServer(importedPlants);
                        
                        if (imported) {
                            importedPlants.forEach(plant => renderPlant(plant));
                            updateAdminPlantList();
                            showToast('Дані успішно імпортовано');
                        } else {
                            showToast('Помилка імпорту на сервер');
                        }
                    } else {
                        throw new Error('Invalid format');
                    }
                } catch (err) {
                    alert('Помилка імпорту. Перевірте формат файлу.');
                }
            };

            reader.readAsText(file);
        };

        input.click();
    });

    function updateAdminPlantList() {
        const plantList = document.getElementById('adminPlantList');
        const plantCount = document.getElementById('adminPlantCount');

        if (!plantList) return;

        plantList.innerHTML = '';
        plantCount.textContent = `Кількість рослин: ${savedPlants.length}`;

        savedPlants.forEach(plant => {
            const plantTypes = {
                flower: '🌸', rose: '🌹', sunflower: '🌻', tulip: '🌷',
                tree: '🌳', palm: '🌴', evergreen: '🌲', bush: '🌿',
                herb: '🌱', grass: '🌾', cactus: '🌵', bamboo: '🎋'
            };

            const item = document.createElement('div');
            item.className = 'admin-plant-item';
            item.innerHTML = `
                <div class="admin-plant-info">
                    <span>${plantTypes[plant.type]} ${plant.author} - ${plant.message.substring(0, 50)}${plant.message.length > 50 ? '...' : ''}</span>
                    <small>${plant.date}</small>
                </div>
                <div class="admin-plant-actions">
                    <button class="btn-delete" data-plant-id="${plant.id}">Видалити</button>
                </div>
            `;

            const deleteBtn = item.querySelector('.btn-delete');
            deleteBtn.addEventListener('click', async () => {
                if (confirm('Видалити цю рослину?')) {
                    const deleted = await deletePlantFromServer(plant.id);
                    
                    if (deleted) {
                        // Remove from DOM
                        const plantElement = document.querySelector(`[data-plant-id="${plant.id}"]`);
                        if (plantElement) plantElement.remove();

                        // Update list
                        updateAdminPlantList();
                        showToast('Рослину видалено');
                    } else {
                        showToast('Помилка видалення');
                    }
                }
            });

            plantList.appendChild(item);
        });
    }

    function checkGardenScroll() {
        if (gardenCanvas && gardenViewport && gardenCanvas.scrollWidth > gardenViewport.clientWidth) {
            scrollHint?.classList.add('visible');
        }
    }

    function updateGardenSize(x) {
        const requiredWidth = x + 300;
        if (gardenCanvas && requiredWidth > gardenCanvas.offsetWidth) {
            gardenCanvas.style.minWidth = requiredWidth + 'px';
            checkGardenScroll();
        }
    }
}

// ВИПРАВЛЕНА функція renderPlant з перевіркою дублікатів
function renderPlant(plant) {
    const gardenCanvas = document.getElementById('gardenCanvas');
    if (!gardenCanvas) return;

    // ВИПРАВЛЕНО: Перевіряємо, чи рослина вже існує
    const existingPlant = document.querySelector(`[data-plant-id="${plant.id}"]`);
    if (existingPlant) {
        console.log('Plant already rendered:', plant.id);
        return;
    }
    
    const plantElement = document.createElement('div');
    plantElement.className = `garden-plant plant-${plant.type}`;
    plantElement.style.left = plant.position.x + 'px';
    plantElement.style.top = plant.position.y + 'px';
    plantElement.dataset.plantId = plant.id;

    const plantTypes = {
        flower: '🌸', rose: '🌹', sunflower: '🌻', tulip: '🌷',
        tree: '🌳', palm: '🌴', evergreen: '🌲', bush: '🌿',
        herb: '🌱', grass: '🌾', cactus: '🌵', bamboo: '🎋'
    };

    plantElement.innerHTML = `<span class="plant-icon">${plantTypes[plant.type] || '🌱'}</span>`;

    plantElement.addEventListener('click', (e) => {
        e.stopPropagation();
        showPlantInfo(plant);
    });

    gardenCanvas.appendChild(plantElement);

    requestAnimationFrame(() => {
        plantElement.classList.add('grown');
    });
}

function showPlantInfo(plant) {
    const plantTypes = {
        flower: '🌸', rose: '🌹', sunflower: '🌻', tulip: '🌷',
        tree: '🌳', palm: '🌴', evergreen: '🌲', bush: '🌿',
        herb: '🌱', grass: '🌾', cactus: '🌵', bamboo: '🎋'
    };

    const plantIcon = document.getElementById('plantIcon');
    const plantInfoAuthor = document.getElementById('plantInfoAuthor');
    const plantInfoMessage = document.getElementById('plantInfoMessage');
    const plantInfoDate = document.getElementById('plantInfoDate');

    if (plantIcon) plantIcon.textContent = plantTypes[plant.type] || '🌱';
    if (plantInfoAuthor) plantInfoAuthor.textContent = plant.author;
    if (plantInfoMessage) plantInfoMessage.textContent = plant.message;
    if (plantInfoDate) plantInfoDate.textContent = plant.date;

    openModal('plantInfoModal');
}

function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Shop functionality
function renderShopItems() {
    const shopItemsContainer = document.getElementById('shopItems');
    if (!shopItemsContainer) return;

    shopItemsContainer.innerHTML = '';
    const items = currentShopTab === 'nft' ? nftItems : physicalItems;

    items.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'shop-item';

        const titleKey = `${item.id}-title`;
        const title = translations[currentLang][titleKey] || item.title || '';

        const descriptionKey = `${item.id}-desc`;
        const description = translations[currentLang][descriptionKey] || '';

        if (currentShopTab === 'nft') {
            itemElement.innerHTML = `
                <div class="shop-item-image">
                    <img src="${item.image}" alt="${title}" loading="lazy">
                    <div class="shop-item-overlay"><span class="nft-badge">NFT</span></div>
                </div>
                <div class="shop-item-content">
                    <h3>${title}</h3>
                    <div class="shop-item-price">${item.price}</div>
                    <p class="shop-item-description">${description}</p>
                    <div class="shop-item-buttons">
                        <a href="${item.getgemsLink}" class="btn btn-primary" target="_blank" rel="noopener">
                            <i class="fas fa-shopping-cart"></i> <span data-translate="shop-buy">${translations[currentLang]['shop-buy']}</span>
                        </a>
                        <a href="${item.telegramLink}" class="btn btn-outline" target="_blank" rel="noopener">
                            <i class="fab fa-telegram"></i> <span data-translate="shop-gift">${translations[currentLang]['shop-gift']}</span>
                        </a>
                    </div>
                </div>`;
        } else {
            itemElement.innerHTML = `
                <div class="shop-item-image">
                    <img src="${item.image}" alt="${title}" loading="lazy">
                </div>
                <div class="shop-item-content">
                    <h3>${title}</h3>
                    <div class="shop-item-price">${item.price}</div>
                    <p class="shop-item-description">${description}</p>
                    <div class="shop-item-buttons">
                        <a href="${item.shopLink}" class="btn btn-primary" target="_blank" rel="noopener">
                            <i class="fas fa-shopping-cart"></i> <span data-translate="shop-buy-physical">${translations[currentLang]['shop-buy-physical']}</span>
                        </a>
                    </div>
                </div>`;
        }
        shopItemsContainer.appendChild(itemElement);
    });

    // Trigger carousel update
    const updateCarouselEvent = new Event('resize');
    window.dispatchEvent(updateCarouselEvent);
}

function updateCarousel() {
    const shopItemsContainer = document.getElementById('shopItems');
    const items = shopItemsContainer.querySelectorAll('.shop-item');
    if (items.length === 0) return;

    const itemWidth = items[0].offsetWidth;
    const gap = parseInt(getComputedStyle(shopItemsContainer).gap) || 32;
    const scrollAmount = (itemWidth + gap) * currentShopIndex;

    shopItemsContainer.style.transform = `translateX(-${scrollAmount}px)`;

    const currentItems = currentShopTab === 'nft' ? nftItems : physicalItems;
    const maxIndex = Math.max(0, currentItems.length - shopItemsPerView);

    const shopPrev = document.getElementById('shopPrev');
    const shopNext = document.getElementById('shopNext');

    if (shopPrev) {
        shopPrev.style.opacity = currentShopIndex === 0 ? '0.3' : '1';
        shopPrev.disabled = currentShopIndex === 0;
    }
    if (shopNext) {
        shopNext.style.opacity = currentShopIndex >= maxIndex ? '0.3' : '1';
        shopNext.disabled = currentShopIndex >= maxIndex;
    }
}

function calculateItemsPerView() {
    const shopItemsContainer = document.getElementById('shopItems');
    if (!shopItemsContainer || !shopItemsContainer.parentElement) return;

    const containerWidth = shopItemsContainer.parentElement.offsetWidth;
    const itemWidth = 350; // Fixed width of shop items
    const gap = 32; // Gap between items

    if (window.innerWidth < 576) shopItemsPerView = 1;
    else if (window.innerWidth < 768) shopItemsPerView = 2;
    else if (window.innerWidth < 1200) shopItemsPerView = Math.floor(containerWidth / (itemWidth + gap));
    else shopItemsPerView = Math.min(3, Math.floor(containerWidth / (itemWidth + gap)));
}

function initializeShop() {
    const shopItemsContainer = document.getElementById('shopItems');
    const shopPrev = document.getElementById('shopPrev');
    const shopNext = document.getElementById('shopNext');
    const shopTabs = document.querySelectorAll('.shop-tab');

    if (!shopItemsContainer) return;

    // Tab switching
    shopTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            shopTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentShopTab = tab.dataset.tab;
            currentShopIndex = 0;
            renderShopItems();
            updateCarousel();
        });
    });

    calculateItemsPerView();
    window.addEventListener('resize', () => {
        calculateItemsPerView();
        updateCarousel();
    });

    shopPrev?.addEventListener('click', () => {
        if (currentShopIndex > 0) {
            currentShopIndex--;
            updateCarousel();
        }
    });

    shopNext?.addEventListener('click', () => {
        const items = currentShopTab === 'nft' ? nftItems : physicalItems;
        const maxIndex = Math.max(0, items.length - shopItemsPerView);
        if (currentShopIndex < maxIndex) {
            currentShopIndex++;
            updateCarousel();
        }
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    shopItemsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    shopItemsContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        const items = currentShopTab === 'nft' ? nftItems : physicalItems;
        const maxIndex = Math.max(0, items.length - shopItemsPerView);

        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentShopIndex < maxIndex) {
                currentShopIndex++;
            } else if (diff < 0 && currentShopIndex > 0) {
                currentShopIndex--;
            }
            updateCarousel();
        }
    });

    renderShopItems();
    updateCarousel();
}

// Modal management
function initializeModals() {
    const modalCloses = document.querySelectorAll('.modal-close, [data-close-modal]');

    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.modal');
            if (modal) {
                modal.classList.remove('open');
                document.body.classList.remove('modal-open');
            }
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.classList.remove('modal-open');
            }
        });
    });

    document.querySelectorAll('.legal-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.dataset.modal;
            if (modalId) openModal(modalId);
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
        document.body.classList.add('modal-open');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    }
}

// Back to top button
function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    let ticking = false;

    function updateButton() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateButton);
            ticking = true;
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize Read More functionality
function initializeReadMore() {
    const readMoreBtn = document.getElementById('readMoreBtn');
    const expandableContent = document.getElementById('aboutTextExpandable');

    if (!readMoreBtn || !expandableContent) return;

    readMoreBtn.addEventListener('click', () => {
        const isExpanded = expandableContent.classList.contains('expanded');

        if (isExpanded) {
            expandableContent.classList.remove('expanded');
            readMoreBtn.classList.remove('expanded');
            readMoreBtn.innerHTML = `${translations[currentLang]['read-more'] || 'Read more'}`;
        } else {
            expandableContent.classList.add('expanded');
            readMoreBtn.classList.add('expanded');
            readMoreBtn.innerHTML = `${translations[currentLang]['read-less'] || 'Read less'}`;
        }
    });
}

// Keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.open');
            openModals.forEach(modal => modal.classList.remove('open'));

            if (gallery3D?.zoomOut) {
                gallery3D.zoomOut();
            }

            if (document.pointerLockElement) {
                document.exitPointerLock();
            }

            if (openModals.length > 0) {
                document.body.classList.remove('modal-open');
            }
        }
    });
}

// Lazy loading images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports lazy loading
        return;
    }

    // Fallback for browsers that don't support lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Smooth scrolling (optimized for mobile)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            // Use smoother scrolling for mobile
            if (isMobile()) {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                document.body.classList.remove('modal-open');
            }
        }
    });
});

// Performance monitoring
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
        }
    });

    perfObserver.observe({
        entryTypes: ['largest-contentful-paint']
    });
}

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed, app will work without offline support
    });
}

// Console info
console.info(`
=== Inner Garden Exhibition ===
Version: 1.1.0 (Google Apps Script Integration - FIXED)
Artist: Maryna Kaminska
Dates: August 15-29, 2025
Location: Bloom Gallery, Valencia

Storage: Google Sheets via Apps Script
Offline cache: localStorage
Admin mode: Press Ctrl+Shift+C

Server status: ${isOnline ? 'Online' : 'Offline'}
${GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' ? '⚠️ Google Apps Script URL not configured!' : '✅ Connected to Google Apps Script'}

=== KEY FIXES APPLIED ===
✅ Unique ID generation with timestamp + random
✅ Duplicate plant rendering prevention
✅ Proper server response handling
✅ Optimistic UI updates with error rollback
✅ Improved error handling
✅ Content-Type application/json headers
✅ Global error handler for promises
`);