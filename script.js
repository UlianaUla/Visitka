console.log('функция для загрузки скрипта перевода');

const texts = {
    ru: {
        name: "Рустам Беляев",
        contact: "Связаться",
        menu: "Меню",
        designer: "Дизайнер",
        signature1: "Минимализм форм",
        signature2: "и совершенство деталей",
        aboutTitle: "Про меня",
        aboutText: "Объединив пятилетнюю практику дизайна и действующий опыт в бизнесе, создаю сайты, айдентику и стратегии для компаний и частных лиц, помогая сделать их бренды заметнее, понятнее и дороже.",
        buttonMe: "Больше про меня",
        buttonServices: "Больше про услуги",
        projectsTitle: "Проекты",
        projectsDefault: "Наведите на проект слева, чтобы увидеть детали",
        project1: "Чистая кожа",
        project1Desc: "Брендинг и дизайн упаковки для косметического бренда, специализирующегося на натуральной продукции по уходу за кожей. Минималистичный дизайн с акцентом на чистоту и натуральность ингредиентов.",
        project2: "Off 3D",
        project2Desc: "Айдентика и веб-дизайн для студии 3D-визуализации. Современный логотип, отражающий трехмерность, и адаптивный сайт с портфолио работ. Цветовая палитра подчеркивает инновационный подход компании.",
        project3: "37 Tuto",
        project3Desc: "Дизайн образовательной платформы для онлайн-курсов. Простой и интуитивно понятный интерфейс, система прогресса обучения и адаптивная верстка для всех устройств. Акцент на удобстве пользователя.",
        label1: "Сайт<br>2025",
        label2: "Дизайн/Сайт<br>2025",
        label3: "Дизайн/Сайт<br>2025"
    },
    en: {
        name: "Rustam Belyaev",
        contact: "Contact",
        menu: "Menu",
        designer: "Designer",
        signature1: "Minimalism of forms",
        signature2: "and perfection of details",
        aboutTitle: "About me",
        aboutText: "Combining five years of design practice and current business experience, I create websites, identity and strategies for companies and individuals, helping to make their brands more noticeable, understandable and expensive.",
        buttonMe: "More about me",
        buttonServices: "More about services",
        projectsTitle: "Projects",
        projectsDefault: "Hover over the project on the left to see details",
        project1: "Clean Skin",
        project1Desc: "Branding and packaging design for a cosmetic brand specializing in natural skin care products. Minimalist design with an emphasis on purity and naturalness of ingredients.",
        project2: "Off 3D",
        project2Desc: "Identity and web design for a 3D visualization studio. A modern logo that reflects three-dimensionality, and an adaptive website with a portfolio of works. The color palette emphasizes the company's innovative approach.",
        project3: "37 Tuto",
        project3Desc: "Design of an educational platform for online courses. Simple and intuitive interface, learning progress system and adaptive layout for all devices. Focus on user convenience.",
        label1: "Website<br>2025",
        label2: "Design/Website<br>2025",
        label3: "Design/Website<br>2025"
    }
};

let currentLang = 'ru';

function switchLanguage(e) {
    e.preventDefault();
    console.log('Переход на другой язык');

    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    console.log('Новый язык:', currentLang);

    
    const elements = document.querySelectorAll('[data-i18n]');
    console.log('Найдено элементов:', elements.length);

    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = texts[currentLang][key];

        if (translation) {
            
            if (el.classList.contains('project-label')) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
            console.log(`✓ ${key}`);
        }
    });

    // Обновление кнопки
    const langBtn = document.getElementById('language-switcher');
    if (langBtn) {
        langBtn.textContent = currentLang === 'ru' ? 'Ru/Eng' : 'Eng/Ru';
    }

    console.log('Перевод успешно завершился');
}


document.addEventListener('DOMContentLoaded', function () {
    console.log('Загрузка DOM');

    // 1. 
    const langButton = document.getElementById('language-switcher');
    console.log('Кнопка найдена', !!langButton);

    if (langButton) {
        langButton.addEventListener('click', switchLanguage);
        console.log('🎯 Обработчик добавлен');
    }

    // 2. Анимация появления элементов
    const elements = document.querySelectorAll('.name-left, .nav-link, .designer-text, .main-title, .signature-under-title, .about-title, .about-description, .about-buttons, .projects-title, .projects-list, .projects-display');

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });

    setTimeout(() => {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);

    // 3. Взаимодействие с проектами
    const projectItems = document.querySelectorAll('.project-item');
    const projectDetails = document.querySelectorAll('.project-detail');
    const defaultDisplay = document.querySelector('.default-display');

    // При наведении на проект
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const projectId = this.getAttribute('data-project');

            // Скрывание сообщений по умолчанию
            if (defaultDisplay) {
                defaultDisplay.style.display = 'none';
            }

            // Скрывание всех деталей
            projectDetails.forEach(detail => {
                detail.classList.remove('active');
            });

            // Показ нужной детали
            const targetDetail = document.getElementById(`project-${projectId}`);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });
    });

    // При уходе мыши со всей секции проектов
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        projectsSection.addEventListener('mouseleave', function () {
            // Скрывание всех деталей
            projectDetails.forEach(detail => {
                detail.classList.remove('active');
            });

            // Показ сообщений по умолчанию
            if (defaultDisplay) {
                defaultDisplay.style.display = 'flex';
            }
        });
    }

    // 4. Обработка кликов на вторую секцию
    document.querySelectorAll('.about-button').forEach(button => {
        button.addEventListener('click', function () {
            alert(`В реальном проекте здесь будет открыт раздел: "${this.textContent}"`);
        });
    });

    // 5. Плавное перелистывание
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
