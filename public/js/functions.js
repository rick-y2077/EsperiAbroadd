/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // Add show-menu class to nav menu
            nav.classList.toggle('show-menu');

            // Add show-icon to show and hide the menu icon
            toggle.classList.toggle('show-icon');
        });
    }
};

showMenu('nav-toggle', 'nav-menu');

const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['<', '>'];
const galleryItems = document.querySelectorAll('.gallery-item');
const eventDetailsElement = document.querySelector('#event-details');

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
        });

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
        });
    }

    setCurrentState(direction) {
        if (direction.className === 'gallery-controls-<') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
        const activeItem = this.carouselArray[2];
        const eventDate = activeItem.dataset.eventDate;
        const eventLocation = activeItem.dataset.eventLocation;
        eventDetailsElement.textContent = eventDate ? `${eventDate} - ${eventLocation}` : `${eventLocation}`;
    }

    setControls() {
        this.carouselControls.forEach(control => {
            let button = document.createElement('button');
            button.className = `gallery-controls-${control}`;
            button.innerText = control;
            galleryControlsContainer.appendChild(button);
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }

    useGalleryItems() {
        this.carouselArray.forEach(item => {
            item.addEventListener('click', e => {
                const eventDate = item.dataset.eventDate;
                const eventLocation = item.dataset.eventLocation;
                eventDetailsElement.textContent = eventDate ? `${eventDate} - ${eventLocation}` : `${eventLocation}`;
            });
        });
    }
}

// Imposta lo stato iniziale
const initialActiveItem = galleryItems[2];
const initialEventDate = initialActiveItem.dataset.eventDate;
const initialEventLocation = initialActiveItem.dataset.eventLocation;
eventDetailsElement.textContent = initialEventDate ? `${initialEventDate} - ${initialEventLocation}` : `${initialEventLocation}`;

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
exampleCarousel.setControls();
exampleCarousel.useControls();
exampleCarousel.useGalleryItems();

// Add click event to open URLs in new tab
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const href = item.getAttribute('data-href');
        if (href) {
            window.open(href, '_blank');
        }
    });
});
