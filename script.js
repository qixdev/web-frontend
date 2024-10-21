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
