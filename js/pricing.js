document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('orderModal');
    const closeBtn = document.querySelector('.close');
    const planNameInput = document.getElementById('planName');
    const orderForm = document.getElementById('orderForm');

    // Обработчик для всех кнопок "Выбрать план"
    document.querySelectorAll('.pricing__item .primary-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const planTitle = this.closest('.pricing__item').querySelector('h4').textContent;
            planNameInput.value = planTitle;
        });
    });

    // Закрытие модального окна при клике на крестик
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Закрытие модального окна при клике вне его области
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Обработка отправки формы
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        
        // Здесь можно добавить код для отправки данных на сервер
        console.log('Отправка формы:', Object.fromEntries(formData));
        
        // Очистка формы и закрытие модального окна
        this.reset();
        modal.style.display = 'none';
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    });
});