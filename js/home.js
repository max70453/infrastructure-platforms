document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для кнопок в тарифных планах
    const planButtons = document.querySelectorAll('.pricing__item .primary-btn');
    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });
    
    // Обработчики для кнопок "Оставить заявку" в верхней части страницы
    const requestBtns = document.querySelectorAll('.request-btn');
    requestBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });

    // Закрытие при клике вне модального окна
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('requestModal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Добавляем обработчик для кнопки закрытия модального окна
    const closeBtn = document.querySelector('#requestModal .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
});

// Функция открытия модального окна
function openModal() {
    const modal = document.getElementById('requestModal');
    const modalContent = document.querySelector('#requestModal .modal-content');
    modal.style.display = 'block';
    setTimeout(() => {
        modalContent.classList.add('active');
    }, 10);
}

// Функция закрытия модального окна
function closeModal() {
    const modal = document.getElementById('requestModal');
    const modalContent = document.querySelector('#requestModal .modal-content');
    modalContent.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Функция отправки формы
function submitForm() {
    const form = document.getElementById('requestForm');
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    
    // Валидация формы
    let isValid = true;
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    if (!isValid) return;
    
    // Здесь можно добавить код для отправки данных на сервер
    console.log('Отправка формы:', { name, phone, email });
    
    // Показываем сообщение об успешной отправке
    alert('Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.');
    
    // Закрываем модальное окно
    closeModal();
    
    // Очищаем форму
    form.reset();
}