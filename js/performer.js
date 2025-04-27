/**
 * Скрипт для страницы исполнителя (performer.html)
 * Включает функциональность для обработки формы связи с исполнителем,
 * модальное окно для заказа услуги и другие интерактивные элементы
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация компонентов страницы
    initContactForm();
    initOrderServiceButton();
    initPortfolioGallery();
    loadPerformerData();
});

/**
 * Инициализация формы обратной связи
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Получение данных формы
            const nameInput = contactForm.querySelector('input[placeholder="Ваше имя"]');
            const emailInput = contactForm.querySelector('input[placeholder="Email"]');
            const messageInput = contactForm.querySelector('textarea');
            
            // Валидация формы
            if (!validateForm(nameInput, emailInput, messageInput)) {
                return;
            }
            
            // Сбор данных для отправки
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            };
            
            // Имитация отправки данных на сервер
            sendContactFormData(formData);
        });
    }
}

/**
 * Валидация полей формы
 * @param {HTMLElement} nameInput - Поле ввода имени
 * @param {HTMLElement} emailInput - Поле ввода email
 * @param {HTMLElement} messageInput - Поле ввода сообщения
 * @returns {boolean} - Результат валидации
 */
function validateForm(nameInput, emailInput, messageInput) {
    let isValid = true;
    
    // Очистка предыдущих ошибок
    clearValidationErrors();
    
    // Проверка имени
    if (!nameInput.value.trim()) {
        showValidationError(nameInput, 'Пожалуйста, введите ваше имя');
        isValid = false;
    }
    
    // Проверка email
    if (!emailInput.value.trim()) {
        showValidationError(emailInput, 'Пожалуйста, введите ваш email');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showValidationError(emailInput, 'Пожалуйста, введите корректный email');
        isValid = false;
    }
    
    // Проверка сообщения
    if (!messageInput.value.trim()) {
        showValidationError(messageInput, 'Пожалуйста, введите ваше сообщение');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Проверка корректности email
 * @param {string} email - Email для проверки
 * @returns {boolean} - Результат проверки
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Отображение ошибки валидации
 * @param {HTMLElement} inputElement - Поле ввода с ошибкой
 * @param {string} errorMessage - Сообщение об ошибке
 */
function showValidationError(inputElement, errorMessage) {
    const errorElement = document.createElement('div');
    errorElement.className = 'validation-error';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = errorMessage;
    
    inputElement.parentNode.appendChild(errorElement);
    inputElement.style.borderColor = 'red';
}

/**
 * Очистка ошибок валидации
 */
function clearValidationErrors() {
    const errorElements = document.querySelectorAll('.validation-error');
    errorElements.forEach(element => element.remove());
    
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => input.style.borderColor = '');
}

/**
 * Отправка данных формы обратной связи
 * @param {Object} formData - Данные формы
 */
function sendContactFormData(formData) {
    // Имитация отправки данных на сервер
    console.log('Отправка данных формы:', formData);
    
    // Показ индикатора загрузки
    const submitButton = document.querySelector('.contact-form .site-btn');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    
    // Имитация задержки сервера
    setTimeout(() => {
        // Сброс формы и показ сообщения об успешной отправке
        document.querySelector('.contact-form form').reset();
        showSuccessMessage('Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
        
        // Восстановление кнопки
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

/**
 * Отображение сообщения об успешной отправке
 * @param {string} message - Текст сообщения
 */
function showSuccessMessage(message) {
    // Создание элемента сообщения
    const messageElement = document.createElement('div');
    messageElement.className = 'alert alert-success mt-3';
    messageElement.textContent = message;
    
    // Добавление сообщения после формы
    const contactForm = document.querySelector('.contact-form');
    contactForm.appendChild(messageElement);
    
    // Удаление сообщения через 5 секунд
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

/**
 * Инициализация кнопки заказа услуги
 */
function initOrderServiceButton() {
    const orderButton = document.querySelector('.service-price-item .primary-btn');
    
    if (orderButton) {
        orderButton.addEventListener('click', function(event) {
            event.preventDefault();
            showOrderModal();
        });
    }
}

/**
 * Отображение модального окна для заказа услуги
 */
function showOrderModal() {
    // Создание модального окна
    const modalHTML = `
        <div class="modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
            <div class="modal-content" style="background-color: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 100%;">
                <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h4>Заказ услуги</h4>
                    <span class="modal-close" style="cursor: pointer; font-size: 24px;">&times;</span>
                </div>
                <form id="order-service-form">
                    <div class="form-group">
                        <label for="service-type">Выберите услугу</label>
                        <select class="form-control" id="service-type">
                            <option value="website">Разработка веб-сайта</option>
                            <option value="mobile-app">Мобильное приложение</option>
                            <option value="seo">SEO-оптимизация</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="client-name">Ваше имя</label>
                        <input type="text" class="form-control" id="client-name" placeholder="Введите ваше имя">
                    </div>
                    <div class="form-group">
                        <label for="client-email">Email</label>
                        <input type="email" class="form-control" id="client-email" placeholder="Введите ваш email">
                    </div>
                    <div class="form-group">
                        <label for="client-phone">Телефон</label>
                        <input type="tel" class="form-control" id="client-phone" placeholder="Введите ваш телефон">
                    </div>
                    <div class="form-group">
                        <label for="client-requirements">Требования к проекту</label>
                        <textarea class="form-control" id="client-requirements" rows="4" placeholder="Опишите ваши требования"></textarea>
                    </div>
                    <button type="submit" class="site-btn" style="display: block; margin: 0 auto;">Отправить заявку</button>
                </form>
            </div>
        </div>
    `;
    
    // Добавление модального окна на страницу
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Обработчик закрытия модального окна
    const closeButton = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    closeButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Обработчик отправки формы заказа
    const orderForm = document.getElementById('order-service-form');
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Получение данных формы
        const serviceType = document.getElementById('service-type').value;
        const clientName = document.getElementById('client-name').value;
        const clientEmail = document.getElementById('client-email').value;
        const clientPhone = document.getElementById('client-phone').value;
        const clientRequirements = document.getElementById('client-requirements').value;
        
        // Валидация формы заказа
        if (!validateOrderForm(clientName, clientEmail, clientPhone)) {
            return;
        }
        
        // Сбор данных для отправки
        const orderData = {
            serviceType,
            clientName,
            clientEmail,
            clientPhone,
            clientRequirements
        };
        
        // Имитация отправки данных на сервер
        sendOrderData(orderData);
    });
}

/**
 * Валидация формы заказа услуги
 * @param {string} name - Имя клиента
 * @param {string} email - Email клиента
 * @param {string} phone - Телефон клиента
 * @returns {boolean} - Результат валидации
 */
function validateOrderForm(name, email, phone) {
    let isValid = true;
    
    // Очистка предыдущих ошибок
    clearValidationErrors();
    
    // Проверка имени
    if (!name.trim()) {
        showValidationError(document.getElementById('client-name'), 'Пожалуйста, введите ваше имя');
        isValid = false;
    }
    
    // Проверка email
    if (!email.trim()) {
        showValidationError(document.getElementById('client-email'), 'Пожалуйста, введите ваш email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showValidationError(document.getElementById('client-email'), 'Пожалуйста, введите корректный email');
        isValid = false;
    }
    
    // Проверка телефона
    if (!phone.trim()) {
        showValidationError(document.getElementById('client-phone'), 'Пожалуйста, введите ваш телефон');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Отправка данных заказа услуги
 * @param {Object} orderData - Данные заказа
 */
function sendOrderData(orderData) {
    // Имитация отправки данных на сервер
    console.log('Отправка данных заказа:', orderData);
    
    // Показ индикатора загрузки
    const submitButton = document.querySelector('#order-service-form .site-btn');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    
    // Имитация задержки сервера
    setTimeout(() => {
        // Закрытие модального окна
        closeModal();
        
        // Показ сообщения об успешной отправке
        showOrderSuccessMessage();
    }, 1500);
}

/**
 * Закрытие модального окна
 */
function closeModal() {
    const modalContainer = document.querySelector('.modal-overlay').parentNode;
    document.body.removeChild(modalContainer);
}

/**
 * Отображение сообщения об успешном заказе
 */
function showOrderSuccessMessage() {
    // Создание модального окна с сообщением
    const successModalHTML = `
        <div class="modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
            <div class="modal-content" style="background-color: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 100%; text-align: center;">
                <div class="modal-header" style="margin-bottom: 20px;">
                    <h4>Заявка отправлена</h4>
                </div>
                <div class="modal-body">
                    <p>Ваша заявка успешно отправлена! Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.</p>
                </div>
                <button class="site-btn success-close-btn" style="margin-top: 20px;">Закрыть</button>
            </div>
        </div>
    `;
    
    // Добавление модального окна на страницу
    const successModalContainer = document.createElement('div');
    successModalContainer.innerHTML = successModalHTML;
    document.body.appendChild(successModalContainer);
    
    // Обработчик закрытия модального окна
    const closeButton = document.querySelector('.success-close-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    closeButton.addEventListener('click', function() {
        document.body.removeChild(successModalContainer);
    });
    
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            document.body.removeChild(successModalContainer);
        }
    });
}

/**
 * Инициализация галереи портфолио
 */
function initPortfolioGallery() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('h5').textContent;
            const description = this.querySelector('p').textContent;
            
            showPortfolioModal(imgSrc, title, description);
        });
    });
}

/**
 * Отображение модального окна с проектом из портфолио
 * @param {string} imgSrc - Путь к изображению проекта
 * @param {string} title - Название проекта
 * @param {string} description - Описание проекта
 */
function showPortfolioModal(imgSrc, title, description) {
    // Создание модального окна
    const modalHTML = `
        <div class="modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
            <div class="modal-content" style="background-color: white; padding: 30px; border-radius: 10px; max-width: 800px; width: 100%;">
                <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h4>${title}</h4>
                    <span class="modal-close" style="cursor: pointer; font-size: 24px;">&times;</span>
                </div>
                <div class="modal-body">
                    <img src="${imgSrc}" alt="${title}" style="width: 100%; height: auto; margin-bottom: 20px;">
                    <p>${description}</p>
                </div>
            </div>
        </div>
    `;
    
    // Добавление модального окна на страницу
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Обработчик закрытия модального окна
    const closeButton = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    closeButton.addEventListener('click', function() {
        document.body.removeChild(modalContainer);
    });
    
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            document.body.removeChild(modalContainer);
        }
    });
}

/**
 * Загрузка данных исполнителя из URL-параметров
 */
function loadPerformerData() {
    // Получение ID исполнителя из URL-параметров
    const urlParams = new URLSearchParams(window.location.search);
    const performerId = urlParams.get('id');
    
    if (performerId) {
        // В реальном проекте здесь был бы AJAX-запрос к серверу для получения данных исполнителя
        console.log('Загрузка данных исполнителя с ID:', performerId);
        
        // Имитация загрузки данных
        // В реальном проекте эти данные пришли бы с сервера
        const performerData = {
            id: performerId,
            name: 'ООО "ТехноСервис"',
            description: 'Команда профессионалов с более чем 10-летним опытом работы в сфере разработки и внедрения IT-решений.',
            rating: 4.8,
            reviewsCount: 150,
            portfolio: [
                {
                    title: 'Корпоративный портал',
                    description: 'Разработка и внедрение корпоративного портала для крупной компании',
                    image: 'img/work-1.png'
                },
                {
                    title: 'Мобильное приложение',
                    description: 'Создание мобильного приложения для службы доставки',
                    image: 'img/work-2.jpg'
                }
            ],
            services: [
                {
                    title: 'Разработка веб-сайта',
                    price: 'от 50,000 ₽'
                },
                {
                    title: 'Мобильное приложение',
                    price: 'от 100,000 ₽'
                },
                {
                    title: 'SEO-оптимизация',
                    price: 'от 30,000 ₽/мес'
                }
            ],
            reviews: [
                {
                    author: 'Иван Петров, ООО "Технологии"',
                    text: 'Отличная команда профессионалов! Проект был выполнен в срок и с высоким качеством.',
                    rating: 5
                },
                {
                    author: 'Мария Сидорова, ИП',
                    text: 'Профессиональный подход к работе и отличное качество исполнения.',
                    rating: 4.5
                }
            ]
        };
        
        // Обновление заголовка страницы
        updatePageTitle(performerData.name);
    }
}

/**
 * Обновление заголовка страницы
 * @param {string} performerName - Название компании-исполнителя
 */
function updatePageTitle(performerName) {
    document.title = `${performerName} - Подробная информация`;
}