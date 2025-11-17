// script.js

document.addEventListener('DOMContentLoaded', () => {

    /* ================================
       Smooth Scroll for Internal Links
    ================================= */
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 20, behavior: 'smooth' });
            }
        });
    });

    /* ================================
       Google Analytics CTA Event Tracking
    ================================= */
    const ctaButtons = document.querySelectorAll('.cta-btn, .buy-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if(typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'CTA',
                    'event_label': btn.textContent
                });
            }
        });
    });

    /* ================================
       Carousel Functionality
    ================================= */
    const track = document.querySelector('.carousel-track');
    if(track) {
        const slides = Array.from(track.children);
        const nextBtn = document.querySelector('.carousel-btn.next');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        let currentIndex = 0;

        function updateCarousel() {
            const width = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * width}px)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
        updateCarousel();
    }

    /* ================================
       Gallery Lightbox for Clickable Images
       (Optional: for non-carousel images)
    ================================= */
    const galleryImages = document.querySelectorAll('.gallery-images img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '1000';

            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.style.maxWidth = '90%';
            modalImg.style.maxHeight = '90%';
            modalImg.style.borderRadius = '12px';

            modal.appendChild(modalImg);
            document.body.appendChild(modal);

            modal.addEventListener('click', () => document.body.removeChild(modal));
        });
    });
});

window.dataLayer.push({
    event: 'carousel_click',
    event_category: 'Gallery',
    event_label: 'Next' // or 'Prev'
});

