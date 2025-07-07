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
            if (title.includes(value) || city.includes(value)) {
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



