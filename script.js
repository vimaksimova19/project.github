// Инициализация AOS (анимация при скролле)
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
});

// Инициализация Swiper (слайдер услуг)
const swiper = new Swiper('.services-slider', {
    loop: true,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    }
});

// Анимация счётчиков (цифры) при появлении секции
const statsSection = document.querySelector('.about');
const statNumbers = document.querySelectorAll('.stat-number');

function animateNumbers() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
}

if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// Отображение текущих значений ползунков
const amountRange = document.getElementById('amount');
const termRange = document.getElementById('term');
const rateRange = document.getElementById('rate');
const amountSpan = document.getElementById('amount-value');
const termSpan = document.getElementById('term-value');
const rateSpan = document.getElementById('rate-value');

function updateAmount() {
    amountSpan.textContent = Number(amountRange.value).toLocaleString('ru-RU');
}
function updateTerm() {
    termSpan.textContent = termRange.value;
}
function updateRate() {
    rateSpan.textContent = Number(rateRange.value).toFixed(1);
}

amountRange.addEventListener('input', updateAmount);
termRange.addEventListener('input', updateTerm);
rateRange.addEventListener('input', updateRate);

// Начальные значения
updateAmount();
updateTerm();
updateRate();

// Калькулятор лизинга
const calcBtn = document.getElementById('calc-btn');
if (calcBtn) {
    calcBtn.addEventListener('click', () => {
        const amount = parseFloat(amountRange.value) || 0;
        const term = parseInt(termRange.value) || 1;
        const rate = parseFloat(rateRange.value) || 0;

        const monthlyRate = rate / 100 / 12;
        if (monthlyRate === 0) {
            const payment = amount / term;
            document.getElementById('monthly-payment').textContent = payment.toFixed(2);
        } else {
            const payment = amount * monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1);
            document.getElementById('monthly-payment').textContent = payment.toFixed(2);
        }
    });
}

// FAQ аккордеон
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        faqItems.forEach(other => {
            if (other !== item && other.classList.contains('active')) {
                other.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});

// Плавный скролл при клике на навигационные ссылки
const navLinks = document.querySelectorAll('.nav-link, .footer-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        // для ссылок на другие страницы (login.html) ничего не делаем
    });
});