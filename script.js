function updateDateTime() {
    const now = new Date();
    const currentDateTime = now.toLocaleString("ru-RU");
    document.querySelector('#time').textContent = currentDateTime;
  }

setInterval(updateDateTime, 1000);


document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.accordion-button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const body = this.parentElement.nextElementSibling;
            body.classList.toggle('show');
        });
    });
    const subscribeBtn = document.getElementById('subscribeBtn');
    const subscribeModal = document.getElementById('subscribeModal');
    const closeModal = document.querySelector('.close');

    if (subscribeBtn && subscribeModal && closeModal) {
        subscribeBtn.addEventListener('click', function () {
            subscribeModal.style.display = 'block';
        });

        closeModal.addEventListener('click', function () {
            subscribeModal.style.display = 'none';
        });

        window.addEventListener('click', function (event) {
            if (event.target === subscribeModal) {
                subscribeModal.style.display = 'none';
            }
        });
    }
});

function toggleTheme() {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
window.addEventListener('load', applySavedTheme);


document.addEventListener('DOMContentLoaded', function() {
    // some explanation for myself
    const filterButtons = document.querySelectorAll('.filter-btn'); // get the buttons state
    const productItems = document.querySelectorAll('#product-list .col-lg-4'); // get the items

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter'); // getting the state of the attribute

            productItems.forEach(item => { // for each product item  in list
                if (filterValue === 'all') { // if the filter value is all then we get everything, adn display each element
                    item.style.display = 'block';
                } else if (item.classList.contains(filterValue)) { // otherwise check if the item class is the filter value
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            filterButtons.forEach(btn => btn.classList.remove('active')); // mark all buttons as inactive
            button.classList.add('active'); // mark the only clicked button as active.
        });
    });
});
function playSound() {
    const audio = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
    audio.play();
}

const formHandler = {
    formElement: document.getElementById('contactForm'),
    successMessage: document.getElementById('successMessage'),
    resetButton: document.getElementById('resetButton'),
    apiResult: document.getElementById('apiResult'),

    init() {
        this.addEventListeners();
        this.setupKeyboardNavigation();
    },

    addEventListeners() {
            this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleSubmit();
        });

        if (this.resetButton) {
            this.resetButton.addEventListener('click', () => {
                this.resetForm();
            });
        }
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
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        document.body.style.backgroundColor = randomColor;

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

