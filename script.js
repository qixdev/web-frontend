document.addEventListener('DOMContentLoaded', function () {
    // Функция обновления времени
    function updateDateTime() {
        const now = new Date();
        const currentDateTime = now.toLocaleString("ru-RU");
        document.querySelector('#time').textContent = currentDateTime;
    }
    setInterval(updateDateTime, 1000);

    // Аккордеон
    const buttons = document.querySelectorAll('.accordion-button');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const body = this.parentElement.nextElementSibling;
            body.classList.toggle('show');
        });
    });

    // Модальное окно подписки
    const subscribeBtn = document.getElementById('subscribeBtn');
    const subscribeModal = document.getElementById('subscribeModal');
    const subscribeCloseBtn = document.querySelector('.close');
    if (subscribeBtn && subscribeModal && subscribeCloseBtn) {
        subscribeBtn.addEventListener('click', () => subscribeModal.style.display = 'block');
        subscribeCloseBtn.addEventListener('click', () => subscribeModal.style.display = 'none');
        window.addEventListener('click', (event) => {
            if (event.target === subscribeModal) subscribeModal.style.display = 'none';
        });
    }

    // Тема
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    }
    function applySavedTheme() {
        if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-theme');
    }
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    applySavedTheme();

    // Фильтр продуктов
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('#product-list .col-lg-4');
    function applyFilter(filterValue) {
        productItems.forEach(item => {
            item.style.display = filterValue === 'all' || item.classList.contains(filterValue) ? 'block' : 'none';
        });
        filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filterValue));
    }
    const savedFilter = localStorage.getItem('selectedFilter') || 'all';
    applyFilter(savedFilter);
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            localStorage.setItem('selectedFilter', filterValue);
            applyFilter(filterValue);
        });
    });

    // Авторизация
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('loginModal');
    const loginCloseBtn = loginModal?.querySelector('.close');
    const loginForm = document.getElementById('loginForm');
    function checkLoginStatus() {
        const isLoggedIn = !!localStorage.getItem('userEmail');
        loginBtn.classList.toggle('d-none', isLoggedIn);
        logoutBtn.classList.toggle('d-none', !isLoggedIn);
    }
    loginBtn?.addEventListener('click', () => loginModal.style.display = 'block');
    loginCloseBtn?.addEventListener('click', () => loginModal.style.display = 'none');
    loginForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        localStorage.setItem('userEmail', document.getElementById('loginEmail').value);
        localStorage.setItem('userPassword', document.getElementById('loginPassword').value);
        alert('Успешный вход в систему');
        loginModal.style.display = 'none';
        checkLoginStatus();
    });
    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
        alert('Вы вышли из системы');
        checkLoginStatus();
    });
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) loginModal.style.display = 'none';
    });
    checkLoginStatus();

    // Звук
    function playSound() {
        const audio = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
        audio.play();
    }

    // Форма контакта
    const formHandler = {
        formElement: document.getElementById('contactForm'),
        successMessage: document.getElementById('successMessage'),
        resetButton: document.getElementById('resetButton'),
        apiResult: document.getElementById('apiResult'),

        init() {
            if (this.formElement) {
                this.addEventListeners();
                this.setupKeyboardNavigation();
            }
        },

        addEventListeners() {
            this.formElement.addEventListener('submit', (event) => {
                event.preventDefault();
                this.handleSubmit();
            });
            this.resetButton?.addEventListener('click', () => this.resetForm());
        },

        setupKeyboardNavigation() {
            const inputs = Array.from(this.formElement.querySelectorAll('input'));
            inputs.forEach((input, index) => {
                input.addEventListener('keydown', (event) => {
                    if (event.key === 'ArrowDown' && index < inputs.length - 1) {
                        event.preventDefault();
                        inputs[index + 1].focus();
                    } else if (event.key === 'ArrowUp' && index > 0) {
                        event.preventDefault();
                        inputs[index - 1].focus();
                    }
                });
            });
        },

        handleSubmit() {
            document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            this.successMessage.classList.remove('d-none');
            playSound();
            fetch('https://jsonplaceholder.typicode.com/posts/1')
                .then(response => response.json())
                .then(data => this.showApiResult(data))
                .catch(error => console.error('Error fetching data:', error));
        },

        resetForm() {
            this.formElement.reset();
            this.successMessage.classList.add('d-none');
            this.apiResult.classList.add('d-none');
            document.body.style.backgroundColor = '';
        },

        showApiResult(data) {
            this.apiResult.innerHTML = `Fetched Data: <strong>${data.title}</strong>`;
            this.apiResult.classList.remove('d-none');
        }
    };

    formHandler.init();
});
