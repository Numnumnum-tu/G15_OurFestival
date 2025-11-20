document.addEventListener('DOMContentLoaded', function() {

    // --- แฮมเบอร์เกอร์ ---
    const hamburgerButton = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerButton && navMenu) {
        hamburgerButton.addEventListener('click', function() {
            hamburgerButton.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
        });
    }
document.addEventListener('click', function(event) {
    const menu = document.querySelector('.navigation-menu');
    const hamburger = document.querySelector('.hamburger-icon');

    if (!menu || !hamburger) return;

    if (menu.classList.contains('is-active')) {
        
        if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
            
            menu.classList.remove('is-active');
            hamburger.classList.remove('is-active');
            
       }
    }
});

    // รูปเลื่อนๆ
    
    const AUTORUN_INTERVAL = 4000; // 4000ms = 4 วินาที

    const track = document.querySelector('.slider-track');

    if (!track) {
        console.error('ไม่พบ Element ".slider-track" ในหน้า HTML');
    } else {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        const sliderNav = document.querySelector('.slider-nav');
        const textContentElement = document.querySelector('.slider-text-content'); 

        const slideTexts = slides.map(slide => slide.dataset.text || '');
        const slideLinks = slides.map(slide => slide.dataset.link || ''); 

        
        const dotsArray = []; 
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            
            dot.addEventListener('click', () => {
                moveToSlide(index);
                resetInterval(); 
            });
            
            if(sliderNav) {
                sliderNav.appendChild(dot);
                dotsArray.push(dot);
            } else {
                console.error('ไม่พบ Element ".slider-nav" สำหรับสร้างปุ่มจุด');
            }
        });

        let slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;
        let currentIndex = 0;
        let slideInterval; 


        function updateDots(targetIndex) {
            dotsArray.forEach((dot, index) => {
                dot.classList.toggle('active', index === targetIndex);
            });
        }

        function updateText(targetIndex) {
            if (textContentElement) {
                
                const currentText = slideTexts[targetIndex];
                const currentLink = slideLinks[targetIndex];
        
                let contentHTML = `<p>${currentText}</p>`; 
        
                if (currentLink) {
                    contentHTML += `<a href="${currentLink}" class="jump-button">click here</a>`;
                }
        
                textContentElement.innerHTML = contentHTML;
            } else {
                console.error('ไม่พบ Element ".slider-text-content" สำหรับแสดงข้อความ');
            }
        }

        function moveToSlide(targetIndex) {
            if (slides.length === 0) return; 

            const amountToMove = targetIndex * slideWidth;
            track.style.transform = 'translateX(-' + amountToMove + 'px)';
            currentIndex = targetIndex;
            
            updateDots(targetIndex); 
            updateText(targetIndex); 
        }

        function autoAdvance() {
            if (slides.length === 0) return;
            const nextIndex = (currentIndex + 1) % slides.length;
            moveToSlide(nextIndex);
        }

        function startInterval() {
            clearInterval(slideInterval); 
            slideInterval = setInterval(autoAdvance, AUTORUN_INTERVAL);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (slides.length === 0) return;
                const nextIndex = (currentIndex + 1) % slides.length;
                moveToSlide(nextIndex);
                resetInterval();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (slides.length === 0) return;
                let prevIndex = currentIndex - 1;
                if (prevIndex < 0) {
                    prevIndex = slides.length - 1; 
                }
                moveToSlide(prevIndex);
                resetInterval();
            });
        }

        window.addEventListener('resize', () => {
            if (slides.length > 0) {
                slideWidth = slides[0].getBoundingClientRect().width;
                
                track.style.transition = 'none'; 
                moveToSlide(currentIndex);
                
                track.offsetHeight; 
                
                track.style.transition = 'transform 0.5s ease-in-out'; 
            }
        });

        if (slides.length > 0) {
            moveToSlide(0);
            startInterval(); 
        }
    }

});

//ซ่อนลูกศรจากเมนู
const hamburgerBtn = document.querySelector('.hamburger-icon');
const sliderArrows = document.querySelectorAll('.slider-btn');

function toggleArrows(hide) {
    sliderArrows.forEach(arrow => {
        arrow.style.display = hide ? 'none' : 'block';
    });
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function() {
        const isOpening = !this.classList.contains('is-active'); 
        
        if (isOpening) {
            toggleArrows(true);
        } else {
            setTimeout(() => toggleArrows(false), 300);
        }
    });
}

const navMenu = document.querySelector('.navigation-menu');
if(navMenu){
    navMenu.addEventListener('click', (e) => {
    });
}