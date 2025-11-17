document.addEventListener('DOMContentLoaded', () => {

const links=document.querySelectorAll('a[href^="#"]');
links.forEach(link=>{link.addEventListener('click',function(e){const target=document.querySelector(this.getAttribute('href'));if(target){e.preventDefault();window.scrollTo({top:target.offsetTop-20,behavior:'smooth'});}});});

/* Carousel + GTM Tracking */
const track=document.querySelector('.carousel-track');
if(track){
    const slides=Array.from(track.children);
    const nextBtn=document.querySelector('.carousel-btn.next');
    const prevBtn=document.querySelector('.carousel-btn.prev');
    let currentIndex=0;

    function updateCarousel(){
        const width=slides[0].getBoundingClientRect().width;
        track.style.transform=`translateX(-${currentIndex*width}px)`;
    }

    nextBtn.addEventListener('click', ()=>{
        currentIndex=(currentIndex+1)%slides.length;
        updateCarousel();
        window.dataLayer=window.dataLayer||[];
        window.dataLayer.push({event:'carousel_click',event_category:'Gallery',event_label:'Next'});
    });

    prevBtn.addEventListener('click', ()=>{
        currentIndex=(currentIndex-1+slides.length)%slides.length;
        updateCarousel();
        window.dataLayer=window.dataLayer||[];
        window.dataLayer.push({event:'carousel_click',event_category:'Gallery',event_label:'Prev'});
    });

    window.addEventListener('resize',updateCarousel);
    updateCarousel();
}

/* CTA & Buy Button Tracking */
document.querySelectorAll('.cta-btn,.buy-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
        window.dataLayer=window.dataLayer||[];
        window.dataLayer.push({event:'cta_click',event_category:'CTA',event_label:btn.textContent});
    });
});

/* Scroll Depth Tracking */
let scrollTracked={50:false,90:false};
window.addEventListener('scroll',()=>{
    const scrollPercent=(window.scrollY+window.innerHeight)/document.body.scrollHeight*100;
    if(scrollPercent>=50&&!scrollTracked[50]){scrollTracked[50]=true;window.dataLayer.push({event:'scroll_depth',scroll_percent:'50'});}
    if(scrollPercent>=90&&!scrollTracked[90]){scrollTracked[90]=true;window.dataLayer.push({event:'scroll_depth',scroll_percent:'90'});}
});

/* Time on Page Tracking */
setTimeout(()=>{window.dataLayer.push({event:'time_on_page',time:10});},10000);
setTimeout(()=>{window.dataLayer.push({event:'time_on_page',time:30});},30000);

/* Gallery Lightbox */
document.querySelectorAll('.carousel-slide img').forEach(img=>{
    img.addEventListener('click',()=>{
        const modal=document.createElement('div');
        modal.style.position='fixed';modal.style.top='0';modal.style.left='0';
        modal.style.width='100%';modal.style.height='100%';
        modal.style.backgroundColor='rgba(0,0,0,0.85)';
        modal.style.display='flex';modal.style.alignItems='center';
        modal.style.justifyContent='center';modal.style.zIndex='1000';
        const modalImg=document.createElement('img');
        modalImg.src=img.src;modalImg.style.maxWidth='90%';
        modalImg.style.maxHeight='90%';
        modalImg.style.borderRadius='12px';
        modal.appendChild(modalImg);document.body.appendChild(modal);
        modal.addEventListener('click',()=>document.body.removeChild(modal));
    });
});

});
