/**
 * Скрипт для страницы исполнителей (performers.html)
 * Реализует функциональность поиска, фильтрации и пагинации
 */

// Данные исполнителей (в реальном проекте должны загружаться с сервера)
const performersData = [
    {
        id: 1,
        name: 'ООО "НетПро"',
        description: 'Профессиональная настройка и обслуживание корпоративных сетей любой сложности',
        services: ['Настройка сетевого оборудования', 'Монтаж СКС', 'Техническая поддержка'],
        experience: '5+ лет',
        rating: 4.5,
        location: 'Москва',
        category: 'Настройка сетей',
        price: 'От 15000 ₽',
        image: 'img/mast-1.jpg'
    },
    {
        id: 2,
        name: 'Иванов Алексей',
        description: 'Сертифицированный специалист по сетевым технологиям Cisco и Juniper',
        services: ['Проектирование сетей', 'Настройка маршрутизации', 'Аудит безопасности'],
        experience: '7 лет',
        rating: 5.0,
        location: 'Санкт-Петербург',
        category: 'Проектирование',
        price: '5000-15000 ₽',
        image: 'img/mast-2.jpg'
    },
    {
        id: 3,
        name: 'ИП "СетьМастер"',
        description: 'Быстрое решение проблем с сетевым оборудованием и кабельными системами',
        services: ['Диагностика неисправностей', 'Ремонт оборудования', 'Прокладка кабеля'],
        experience: '3 года',
        rating: 4.0,
        location: 'Казань',
        category: 'Монтаж оборудования',
        price: 'До 5000 ₽',
        image: 'img/mast-3.jpg'
    },
    {
        id: 4,
        name: 'ООО "ТехноСеть"',
        description: 'Комплексные решения для корпоративных клиентов в области сетевой инфраструктуры',
        services: ['Проектирование сетей', 'Внедрение SDN', 'Обслуживание ЦОД'],
        experience: '10 лет',
        rating: 4.8,
        location: 'Москва',
        category: 'Проектирование',
        price: 'От 15000 ₽',
        image: 'img/mast-1.jpg'
    },
    {
        id: 5,
        name: 'Петров Сергей',
        description: 'Специалист по беспроводным сетям и системам безопасности',
        services: ['Настройка Wi-Fi', 'Аудит безопасности', 'Монтаж видеонаблюдения'],
        experience: '4 года',
        rating: 4.2,
        location: 'Новосибирск',
        category: 'Настройка сетей',
        price: '5000-15000 ₽',
        image: 'img/mast-2.jpg'
    },
    {
        id: 6,
        name: 'ИП "КабельПро"',
        description: 'Профессиональная прокладка кабельных систем любой сложности',
        services: ['Монтаж СКС', 'Прокладка оптоволокна', 'Сертификация линий'],
        experience: '6 лет',
        rating: 4.6,
        location: 'Санкт-Петербург',
        category: 'Монтаж оборудования',
        price: '5000-15000 ₽',
        image: 'img/mast-3.jpg'
    },
    {
        id: 7,
        name: 'ООО "ИнфраСервис"',
        description: 'Комплексное обслуживание IT-инфраструктуры предприятий',
        services: ['Техническая поддержка', 'Мониторинг сетей', 'Обновление оборудования'],
        experience: '8 лет',
        rating: 4.7,
        location: 'Москва',
        category: 'Обслуживание',
        price: 'От 15000 ₽',
        image: 'img/mast-1.jpg'
    },
    {
        id: 8,
        name: 'Сидорова Анна',
        description: 'Консультант по оптимизации сетевой инфраструктуры',
        services: ['Аудит сетей', 'Оптимизация производительности', 'Консультации'],
        experience: '5 лет',
        rating: 4.3,
        location: 'Казань',
        category: 'Проектирование',
        price: '5000-15000 ₽',
        image: 'img/mast-2.jpg'
    },
    {
        id: 9,
        name: 'ИП "ЦОД-Мастер"',
        description: 'Специализация на построении и обслуживании центров обработки данных',
        services: ['Проектирование ЦОД', 'Монтаж серверного оборудования', 'Обслуживание'],
        experience: '9 лет',
        rating: 4.9,
        location: 'Новосибирск',
        category: 'Обслуживание',
        price: 'От 15000 ₽',
        image: 'img/mast-3.jpg'
    }
];

// Количество исполнителей на странице
const PERFORMERS_PER_PAGE = 3;

// Текущие фильтры
let currentFilters = {
    keyword: '',
    category: '',
    location: '',
    rating: '',
    experience: '',
    price: '',
    page: 1
};

// DOM-элементы
let searchForm;
let keywordInput;
let categorySelect;
let locationSelect;
let ratingSelect;
let experienceSelect;
let priceSelect;
let performersContainer;
let paginationContainer;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Получение DOM-элементов
    searchForm = document.querySelector('.search-form');
    keywordInput = searchForm.querySelector('input[type="text"]');
    const selects = searchForm.querySelectorAll('select');
    categorySelect = selects[0];
    locationSelect = selects[1];
    ratingSelect = selects[2];
    experienceSelect = selects[3];
    priceSelect = selects[4];
    
    performersContainer = document.querySelector('.performers-section .row:first-child');
    paginationContainer = document.querySelector('.pagination');
    
    // Загрузка параметров из URL
    loadFiltersFromUrl();
    
    // Установка значений фильтров из текущих фильтров
    keywordInput.value = currentFilters.keyword;
    setSelectValue(categorySelect, currentFilters.category);
    setSelectValue(locationSelect, currentFilters.location);
    setSelectValue(ratingSelect, currentFilters.rating);
    setSelectValue(experienceSelect, currentFilters.experience);
    setSelectValue(priceSelect, currentFilters.price);
    
    // Добавление обработчиков событий
    searchForm.addEventListener('submit', handleSearch);
    
    // Обработчики изменения селектов
    categorySelect.addEventListener('change', handleFilterChange);
    locationSelect.addEventListener('change', handleFilterChange);
    ratingSelect.addEventListener('change', handleFilterChange);
    experienceSelect.addEventListener('change', handleFilterChange);
    priceSelect.addEventListener('change', handleFilterChange);
    
    // Отображение исполнителей
    displayPerformers();
});

/**
 * Загрузка фильтров из URL
 */
function loadFiltersFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    
    currentFilters.keyword = urlParams.get('keyword') || '';
    currentFilters.category = urlParams.get('category') || '';
    currentFilters.location = urlParams.get('location') || '';
    currentFilters.rating = urlParams.get('rating') || '';
    currentFilters.experience = urlParams.get('experience') || '';
    currentFilters.price = urlParams.get('price') || '';
    currentFilters.page = parseInt(urlParams.get('page')) || 1;
}

/**
 * Сохранение фильтров в URL
 */
function saveFiltersToUrl() {
    const urlParams = new URLSearchParams();
    
    if (currentFilters.keyword) urlParams.set('keyword', currentFilters.keyword);
    if (currentFilters.category) urlParams.set('category', currentFilters.category);
    if (currentFilters.location) urlParams.set('location', currentFilters.location);
    if (currentFilters.rating) urlParams.set('rating', currentFilters.rating);
    if (currentFilters.experience) urlParams.set('experience', currentFilters.experience);
    if (currentFilters.price) urlParams.set('price', currentFilters.price);
    if (currentFilters.page > 1) urlParams.set('page', currentFilters.page.toString());
    
    // Обновление URL без перезагрузки страницы
    const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
    window.history.pushState({ path: newUrl }, '', newUrl);
}

/**
 * Установка значения для select
 */
function setSelectValue(selectElement, value) {
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].textContent === value) {
            selectElement.selectedIndex = i;
            break;
        }
    }
}

/**
 * Обработчик отправки формы поиска
 */
function handleSearch(event) {
    event.preventDefault();
    
    currentFilters.keyword = keywordInput.value.trim();
    currentFilters.page = 1; // Сброс на первую страницу при новом поиске
    
    saveFiltersToUrl();
    displayPerformers();
}

/**
 * Обработчик изменения фильтров
 */
function handleFilterChange() {
    currentFilters.category = categorySelect.options[categorySelect.selectedIndex].textContent;
    if (currentFilters.category === 'Категория услуг') currentFilters.category = '';
    
    currentFilters.location = locationSelect.options[locationSelect.selectedIndex].textContent;
    if (currentFilters.location === 'Местоположение') currentFilters.location = '';
    
    currentFilters.rating = ratingSelect.options[ratingSelect.selectedIndex].textContent;
    if (currentFilters.rating === 'Рейтинг') currentFilters.rating = '';
    
    currentFilters.experience = experienceSelect.options[experienceSelect.selectedIndex].textContent;
    if (currentFilters.experience === 'Опыт работы') currentFilters.experience = '';
    
    currentFilters.price = priceSelect.options[priceSelect.selectedIndex].textContent;
    if (currentFilters.price === 'Цена') currentFilters.price = '';
    
    currentFilters.page = 1; // Сброс на первую страницу при изменении фильтров
    
    saveFiltersToUrl();
    displayPerformers();
}

/**
 * Фильтрация исполнителей по текущим фильтрам
 */
function filterPerformers() {
    return performersData.filter(performer => {
        // Фильтр по ключевому слову
        if (currentFilters.keyword && !(
            performer.name.toLowerCase().includes(currentFilters.keyword.toLowerCase()) ||
            performer.description.toLowerCase().includes(currentFilters.keyword.toLowerCase()) ||
            performer.services.some(service => service.toLowerCase().includes(currentFilters.keyword.toLowerCase()))
        )) {
            return false;
        }
        
        // Фильтр по категории
        if (currentFilters.category && performer.category !== currentFilters.category) {
            return false;
        }
        
        // Фильтр по местоположению
        if (currentFilters.location && performer.location !== currentFilters.location) {
            return false;
        }
        
        // Фильтр по рейтингу
        if (currentFilters.rating) {
            const ratingValue = parseFloat(currentFilters.rating);
            if (currentFilters.rating === '5 звезд' && performer.rating < 5) {
                return false;
            } else if (currentFilters.rating === '4+ звезды' && performer.rating < 4) {
                return false;
            } else if (currentFilters.rating === '3+ звезды' && performer.rating < 3) {
                return false;
            }
        }
        
        // Фильтр по опыту
        if (currentFilters.experience) {
            const experienceYears = parseInt(performer.experience);
            if (currentFilters.experience === 'Более 5 лет' && experienceYears < 5) {
                return false;
            } else if (currentFilters.experience === '3-5 лет' && (experienceYears < 3 || experienceYears > 5)) {
                return false;
            } else if (currentFilters.experience === '1-3 года' && (experienceYears < 1 || experienceYears > 3)) {
                return false;
            }
        }
        
        // Фильтр по цене
        if (currentFilters.price && performer.price !== currentFilters.price) {
            return false;
        }
        
        return true;
    });
}

/**
 * Отображение исполнителей с учетом пагинации
 */
function displayPerformers() {
    // Фильтрация исполнителей
    const filteredPerformers = filterPerformers();
    
    // Расчет пагинации
    const totalPages = Math.ceil(filteredPerformers.length / PERFORMERS_PER_PAGE);
    
    // Проверка валидности текущей страницы
    if (currentFilters.page > totalPages) {
        currentFilters.page = totalPages > 0 ? totalPages : 1;
        saveFiltersToUrl();
    }
    
    // Получение исполнителей для текущей страницы
    const startIndex = (currentFilters.page - 1) * PERFORMERS_PER_PAGE;
    const performersToShow = filteredPerformers.slice(startIndex, startIndex + PERFORMERS_PER_PAGE);
    
    // Очистка контейнера исполнителей
    performersContainer.innerHTML = '';
    
    // Если нет исполнителей для отображения
    if (performersToShow.length === 0) {
        performersContainer.innerHTML = `
            <div class="col-lg-12">
                <div class="no-results">
                    <h4>Исполнители не найдены</h4>
                    <p>Попробуйте изменить параметры поиска</p>
                </div>
            </div>
        `;
    } else {
        // Отображение исполнителей
        performersToShow.forEach(performer => {
            const performerCard = createPerformerCard(performer);
            performersContainer.appendChild(performerCard);
        });
    }
    
    // Обновление пагинации
    updatePagination(totalPages);
    
    // Анимация появления карточек
    animateCards();
}

/**
 * Создание карточки исполнителя
 */
function createPerformerCard(performer) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'col-lg-4 col-md-6';
    cardDiv.innerHTML = `
        <div class="performer-card">
            <div class="performer-img">
                <img src="${performer.image}" alt="${performer.name}">
                <div class="rating">
                    ${generateRatingStars(performer.rating)}
                    <span>${performer.rating.toFixed(1)}</span>
                </div>
            </div>
            <div class="performer-info">
                <h5>${performer.name}</h5>
                <p>${performer.description}</p>
                <ul class="services-list">
                    ${performer.services.map(service => `<li>${service}</li>`).join('')}
                </ul>
                <div class="experience">Опыт: ${performer.experience}</div>
                <a href="performer.html?id=${performer.id}" class="site-btn" style="text-align: center;">Подробнее</a>
            </div>
        </div>
    `;
    return cardDiv;
}

/**
 * Генерация звезд рейтинга
 */
function generateRatingStars(rating) {
    let starsHtml = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<i class="fa fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            starsHtml += '<i class="fa fa-star-half-o"></i>';
        } else {
            starsHtml += '<i class="fa fa-star-o"></i>';
        }
    }
    
    return starsHtml;
}

/**
0 * Анимация появления карточек исполнителей
 */
function animateCards() {
    const cards = document.querySelectorAll('.performer-card');
    
    cards.forEach((card, index) => {
        // Сначала скрываем все карточки
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Затем показываем их с задержкой для эффекта появления
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index); // Задержка для каждой следующей карточки
    });
}

/**
 * Обновление пагинации
 */
function updatePagination(totalPages) {
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Создание элементов пагинации
    // Кнопка "Предыдущая"
    if (currentFilters.page > 1) {
        const prevLi = document.createElement('li');
        const prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.textContent = 'Предыдущая';
        prevLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentFilters.page--;
            saveFiltersToUrl();
            displayPerformers();
        });
        prevLi.appendChild(prevLink);
        paginationContainer.appendChild(prevLi);
    }
    
    // Номера страниц
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentFilters.page - 1);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Корректировка, чтобы всегда показывать maxPagesToShow страниц, если возможно
    if (endPage - startPage + 1 < maxPagesToShow && totalPages > maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageLi = document.createElement('li');
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i.toString();
        
        if (i === currentFilters.page) {
            pageLink.className = 'active';
        }
        
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentFilters.page = i;
            saveFiltersToUrl();
            displayPerformers();
        });
        
        pageLi.appendChild(pageLink);
        paginationContainer.appendChild(pageLi);
    }
    
    // Кнопка "Следующая"
    if (currentFilters.page < totalPages) {
        const nextLi = document.createElement('li');
        const nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.textContent = 'Следующая';
        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentFilters.page++;
            saveFiltersToUrl();
            displayPerformers();
        });
        nextLi.appendChild(nextLink);
        paginationContainer.appendChild(nextLi);
    }
}