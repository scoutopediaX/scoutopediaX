// تفعيل الهامبرغر مينيو
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');
const languageSelect = document.getElementById('language-select');

// Debug logging
console.log('Hamburger menu script loaded');
console.log('Hamburger element:', hamburger);
console.log('Nav links element:', navLinks);
console.log('Language selector element:', languageSelect);

// Enhanced hamburger menu with smooth animations
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Add smooth animation classes
    if (navLinks.classList.contains('active')) {
        hamburger.style.transform = 'rotate(90deg)';
        document.body.classList.add('menu-open');
        console.log('Mobile menu opened');
        
        // Ensure language selector is visible
        if (languageSelect) {
            languageSelect.style.display = 'block';
            languageSelect.style.visibility = 'visible';
            languageSelect.style.opacity = '1';
            console.log('Language selector should be visible');
        }
    } else {
        hamburger.style.transform = 'rotate(0deg)';
        document.body.classList.remove('menu-open');
        console.log('Mobile menu closed');
    }
});

// إغلاق القائمة عند الضغط على أي رابط (بدون منع الانتقال)
const navLinksList = document.querySelectorAll('.nav-links a');
navLinksList.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.style.transform = 'rotate(0deg)';
        document.body.classList.remove('menu-open');
    });
});

// Ensure language selector works in mobile menu
if (languageSelect) {
    languageSelect.addEventListener('change', function() {
        console.log('Language changed to:', this.value);
        // Don't close the menu when language is changed
        // This allows users to see the change before navigation
    });
}

// Enhanced scroll effects and animations
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.about-card, .mission-tags span, .camp-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Enhanced search functionality with debouncing
    const campSearch = document.getElementById('campSearch');
    const campsList = document.getElementById('campsList');
    
    if (campSearch && campsList) {
        let searchTimeout;
        
        campSearch.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                const value = this.value.trim().toLowerCase();
                const cards = campsList.querySelectorAll('.camp-card');
                let count = 0;
                
                cards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const city = card.querySelector('.camp-city').textContent.toLowerCase();
                    const details = Array.from(card.querySelectorAll('.camp-detail'))
                        .map(e => e.textContent.toLowerCase()).join(' ');
                    
                    if (title.includes(value) || city.includes(value) || details.includes(value)) {
                        card.style.display = '';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        count++;
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
                
                // Update search results count
                const searchResults = document.getElementById('searchResults');
                if (searchResults) {
                    searchResults.textContent = count;
                    searchResults.style.opacity = count > 0 ? '1' : '0.5';
                }
            }, 300);
        });
        
        // Add search focus effects
        campSearch.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        campSearch.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }

    // Enhanced hero slider with better transitions
    const slideContainer = document.querySelector('.hero-bg-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slideContainer && dots.length > 0) {
        const images = [
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1713981172271-3ac9d041ea1c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://wallpapercave.com/wp/wp9164576.jpg'
        ];

        let currentSlide = 0;
        let slideInterval;

        function setSlide(index) {
            if (!slideContainer) return;
            
            // Add fade transition
            slideContainer.style.opacity = '0';
            
            setTimeout(() => {
                slideContainer.style.backgroundImage = `url('${images[index]}')`;
                slideContainer.style.opacity = '1';
            }, 300);
            
            // Update dots with animation
            dots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                    dot.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        dot.style.transform = 'scale(1.3)';
                    }, 100);
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % images.length;
            setSlide(currentSlide);
        }

        // Initialize slider
        setSlide(0);
        slideInterval = setInterval(nextSlide, 7000);

        // Enhanced dot interactions
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                setSlide(currentSlide);
                
                // Reset interval
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 7000);
                
                // Add click animation
                dot.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    dot.style.transform = 'scale(1.3)';
                }, 200);
            });
            
            // Hover effects
            dot.addEventListener('mouseenter', () => {
                if (!dot.classList.contains('active')) {
                    dot.style.transform = 'scale(1.2)';
                }
            });
            
            dot.addEventListener('mouseleave', () => {
                if (!dot.classList.contains('active')) {
                    dot.style.transform = 'scale(1)';
                }
            });
        });
    }

    // Add loading states for buttons
    document.querySelectorAll('.camp-btn, .call-btn, .methodology-btn, .submit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.style.pointerEvents = 'none';
                
                // Simulate loading (remove in production)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.style.pointerEvents = 'auto';
                }, 2000);
            }
        });
    });

    // Enhanced card hover effects
    document.querySelectorAll('.camp-card, .about-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth reveal animations for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
});

// Enhanced language switching with smooth transitions
function setLanguageAndReload(lang) {
    localStorage.setItem("language", lang);
    document.body.className = lang === "ar" ? "arabic" : "english";
    
    // Add transition effect
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        if (lang === "ar") {
            window.location.href = "../ar/index.html";
        } else if (lang === "en") {
            window.location.href = "../en/index.html";
        }
    }, 300);
}

// Language selector functionality
document.addEventListener('DOMContentLoaded', function() {
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        let lang = localStorage.getItem('language');
        if (!lang) {
            const browserLang = navigator.language || navigator.userLanguage;
            lang = browserLang.startsWith('ar') ? 'ar' : 'en';
        }
        langSelect.value = lang;

        langSelect.addEventListener('change', function() {
            setLanguageAndReload(this.value);
        });
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.style.transform = 'rotate(0deg)';
        document.body.classList.remove('menu-open');
    }
    
    // Arrow keys for slider navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const dots = document.querySelectorAll('.dot');
        const activeDot = document.querySelector('.dot.active');
        if (activeDot && dots.length > 0) {
            const currentIndex = Array.from(dots).indexOf(activeDot);
            let newIndex;
            
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : dots.length - 1;
            } else {
                newIndex = currentIndex < dots.length - 1 ? currentIndex + 1 : 0;
            }
            
            dots[newIndex].click();
        }
    }
});

// Add touch gesture support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            const dots = document.querySelectorAll('.dot');
            const activeDot = document.querySelector('.dot.active');
            if (activeDot) {
                const currentIndex = Array.from(dots).indexOf(activeDot);
                const nextIndex = currentIndex < dots.length - 1 ? currentIndex + 1 : 0;
                dots[nextIndex].click();
            }
        } else {
            // Swipe right - previous slide
            const dots = document.querySelectorAll('.dot');
            const activeDot = document.querySelector('.dot.active');
            if (activeDot) {
                const currentIndex = Array.from(dots).indexOf(activeDot);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : dots.length - 1;
                dots[prevIndex].click();
            }
        }
    }
}

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Add scroll-based animations here if needed
    }, 100);
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



