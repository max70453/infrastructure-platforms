document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы формы
    const contactForm = document.querySelector('.contact-form form');
    const nameInput = contactForm.querySelector('input[placeholder="Имя"]');
    const emailInput = contactForm.querySelector('input[placeholder="Email"]');
    const websiteInput = contactForm.querySelector('input[placeholder="Сайт"]');
    const messageInput = contactForm.querySelector('textarea');

    // Функция валидации email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email);
    }

    // Функция валидации URL
    // Упрощенная валидация URL
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    // Улучшенная функция отображения ошибки
    function showError(input, message) {
        let errorDiv = input.parentElement.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.parentElement.appendChild(errorDiv);
        }
        errorDiv.style.color = '#ff0000';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        input.style.borderColor = '#ff0000';
    }

    // Функция очистки ошибки
    function clearError(input) {
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = '';
    }

    // Обработчик отправки формы
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Валидация имени
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Имя должно содержать минимум 2 символа');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Валидация email
        if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Пожалуйста, введите корректный email');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Валидация сайта (если поле не пустое)
        if (websiteInput.value.trim() !== '' && !isValidUrl(websiteInput.value.trim())) {
            showError(websiteInput, 'Пожалуйста, введите корректный URL');
            isValid = false;
        } else {
            clearError(websiteInput);
        }

        // Валидация сообщения
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Пожалуйста, введите ваше сообщение');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        if (isValid) {
            // Создаем объект с данными формы
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                website: websiteInput.value.trim(),
                message: messageInput.value.trim()
            };

            // Имитация отправки данных на сервер
            setTimeout(() => {
                // Показываем уведомление об успешной отправке
                alert('Сообщение успешно отправлено!');
                // Очищаем форму
                contactForm.reset();
            }, 1000);
        }
    });

    // Добавляем обработчик для кнопки отправки
    const submitButton = contactForm.querySelector('.site-btn');
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            contactForm.dispatchEvent(new Event('submit'));
        });
    }

    // Добавляем анимацию для социальных иконок
    const socialIcons = document.querySelectorAll('.contact__social a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});