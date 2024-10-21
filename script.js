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


document.addEventListener('DOMContentLoaded', function() {
    // some explanation for myself
    const filterButtons = document.querySelectorAll('.filter-btn'); // get the buttons state
    const productItems = document.querySelectorAll('#product-list .col-lg-4'); // get the items

    filterButtons.forEach(button => {// for each button in buttons
        button.addEventListener('click', () => { // adding eventListener
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
