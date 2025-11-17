document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if(target){
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 20, behavior: 'smooth' });
            }
        });
    });

    // FAQ - Only one open at a time
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('strong');
        const answer = item.querySelector('p');

        question.addEventListener('click', () => {
            faqItems.forEach(i => { if(i !== item) i.querySelector('p').style.display='none'; });
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Main carousel
    const track = document.querySelector('.carousel-track');
    if(track){
        const slides = Array.from(track.children);
        const nextBtn = document.querySelector('.carousel-btn.next');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        let currentIndex = 0;

        function updateCarousel(){
            const width = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * width}px)`;
        }

        nextBtn.addEventListener('click', () => { currentIndex=(currentIndex+1)%slides.length; updateCarousel(); });
        prevBtn.addEventListener('click', () => { currentIndex=(currentIndex-1+slides.length)%slides.length; updateCarousel(); });

        // Touch support
        let startX=0;
        track.addEventListener('touchstart', e=>{startX=e.touches[0].clientX;});
        track.addEventListener('touchend', e=>{
            const endX = e.changedTouches[0].clientX;
            if(startX - endX > 30) nextBtn.click();
            else if(endX - startX > 30) prevBtn.click();
        });

        window.addEventListener('resize', updateCarousel);
        updateCarousel();
    }

    // Lightbox
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    slides.forEach((slide,index)=>{
        slide.addEventListener('click', ()=>{
            let current = index;
            const modal = document.createElement('div');
            modal.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:1000;";
            
            const modalImg = document.createElement('img');
            modalImg.src = slides[current].querySelector('img').src;
            modalImg.style.maxWidth='90%'; modalImg.style.maxHeight='80%'; modalImg.style.borderRadius='12px';

            const caption = document.createElement('div');
            caption.innerText = slides[current].querySelector('.caption')?.innerText || '';
            caption.style.cssText="color:#FFD700;margin-top:10px;font-weight:bold;text-align:center;";

            const prevBtn = document.createElement('button');
            prevBtn.innerHTML='&#10094;'; 
            prevBtn.style.cssText="position:absolute;left:20px;top:50%;transform:translateY(-50%);font-size:40px;color:#fff;background:none;border:none;cursor:pointer;";
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML='&#10095;'; 
            nextBtn.style.cssText="position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:40px;color:#fff;background:none;border:none;cursor:pointer;";

            function updateModal(){ 
                modalImg.src = slides[current].querySelector('img').src;
                caption.innerText = slides[current].querySelector('.caption')?.innerText || '';
            }

            prevBtn.addEventListener('click', e=>{ e.stopPropagation(); current=(current-1+slides.length)%slides.length; updateModal(); });
            nextBtn.addEventListener('click', e=>{ e.stopPropagation(); current=(current+1)%slides.length; updateModal(); });

            function keyNav(e){
                if(e.key==='ArrowLeft') prevBtn.click();
                else if(e.key==='ArrowRight') nextBtn.click();
                else if(e.key==='Escape') { document.body.removeChild(modal); document.removeEventListener('keydown', keyNav); }
            }
            document.addEventListener('keydown', keyNav);

            modal.addEventListener('click', ()=>{
                document.body.removeChild(modal); 
                document.removeEventListener('keydown', keyNav);
            });

            modal.appendChild(modalImg);
            modal.appendChild(caption);
            modal.appendChild(prevBtn);
            modal.appendChild(nextBtn);
            document.body.appendChild(modal);
        });
    });

});
