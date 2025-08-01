// تفعيل الهامبرغر مينيو
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// إغلاق القائمة عند الضغط على أي رابط (بدون منع الانتقال)
const navLinksList = document.querySelectorAll('.nav-links a');
navLinksList.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        // لا يوجد منع افتراضي هنا، الانتقال يتم فوراً
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Removed redundant event listener to avoid conflicts

    // Hero slider logic
    const slideContainer = document.querySelector('.hero-bg-slide');
    const dots = document.querySelectorAll('.dot');
    
    // =================================================================
    // ==   لتغيير الصور، قم بتعديل الروابط في المصفوفة التالية فقط:    ==
    // =================================================================
    const images = [
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1470&q=80', // الصورة الأولى
        'https://images.unsplash.com/photo-1713981172271-3ac9d041ea1c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // الصورة الثانية
        'https://wallpapercave.com/wp/wp9164576.jpg'  // الصورة الثالثة
    ];
    // =================================================================

    let currentSlide = 0;

    function setSlide(index) {
        if (!slideContainer) return;
        slideContainer.style.backgroundImage = `url('${images[index]}')`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        const activeDot = document.querySelector(`.dot[data-index='${index}']`);
        if (activeDot) {
            activeDot.classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % images.length;
        setSlide(currentSlide);
    }

    if (slideContainer && dots.length > 0) {
        // Set initial slide
        setSlide(0);

        // Auto-play the slider
        let slideInterval = setInterval(nextSlide, 7000); // 7 seconds per slide

        // Handle dot clicks
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                currentSlide = index;
                setSlide(currentSlide);
                // Reset interval on manual navigation
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 7000);
            });
        });
    }
    
    function getSlideImage(index) {
        const images = [
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://wallpapercave.com/wp/wp9164576.jpg'
        ];
        return images[index];
    }

// فلترة بطاقات المخيمات حسب البحث
const campSearch = document.getElementById('campSearch');
const campsList = document.getElementById('campsList');

if (campSearch && campsList) {
    campSearch.addEventListener('input', function() {
        const value = this.value.trim().toLowerCase();
        const cards = campsList.querySelectorAll('.camp-card');
        let count = 0;
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const city = card.querySelector('.camp-city').textContent.toLowerCase();
            // نجمع كل نصوص camp-detail
            const details = Array.from(card.querySelectorAll('.camp-detail')).map(e => e.textContent.toLowerCase()).join(' ');
            if (title.includes(value) || city.includes(value) || details.includes(value)) {
                card.style.display = '';
                count++;
            } else {
                card.style.display = 'none';
            }
        });
        // تحديث عدد نتائج البحث إذا كان هناك عنصر يحمل id="searchResults"
        const searchResults = document.getElementById('searchResults');
        if (searchResults) searchResults.textContent = count;
    });
    }
});
// . Detect browser language on first visit
if (!localStorage.getItem("language")) {
  const browserLang = navigator.language || navigator.userLanguage;
  const detectedLang = browserLang.startsWith("ar") ? "ar" : "en";
  localStorage.setItem("language", detectedLang);
}

 //  2. Run on every page load
window.onload = function () {
  const lang = localStorage.getItem("language") || "ar";
  document.body.className = lang === "ar" ? "arabic" : "english";
  // Removed call to setLanguage(lang);
};

//  3. Language switch buttons call this
function setLanguageAndReload(lang) {
  localStorage.setItem("language", lang);
  document.body.className = lang === "ar" ? "arabic" : "english";
  // Navigate to the corresponding language home page
  if (lang === "ar") {
    window.location.href = "../ar/index.html";
  } else if (lang === "en") {
    window.location.href = "../en/index.html";
  }
}

// Removed setLanguage function since content blocks do not exist on the same page



