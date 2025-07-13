
        // Initialize AOS
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out'
        });

        // Loading Screen
        window.addEventListener('load', function() {
            const loadingScreen = document.getElementById('loadingScreen');
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 1000);
        });

        // Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll Progress Bar
        window.addEventListener('scroll', function() {
            const scrollProgress = document.getElementById('scrollProgress');
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });

        // Smooth Scrolling
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

        // Counter Animation
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const observerOptions = {
                threshold: 0.5,
                rootMargin: '0px 0px -100px 0px'
            };

            const counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.getAttribute('data-target'));
                        const increment = target / 100;
                        let current = 0;

                        const updateCounter = () => {
                            if (current < target) {
                                current += increment;
                                counter.textContent = Math.ceil(current);
                                setTimeout(updateCounter, 20);
                            } else {
                                counter.textContent = target;
                            }
                        };

                        updateCounter();
                        counterObserver.unobserve(counter);
                    }
                });
            }, observerOptions);

            counters.forEach(counter => {
                counterObserver.observe(counter);
            });
        }

        // Scroll Animations
        function initScrollAnimations() {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(el => {
                observer.observe(el);
            });
        }





        // Typewriter Effect
        function initTypewriter() {
            const subtitle = document.querySelector('.hero-subtitle');
            if (subtitle) {
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 4000);
            }
        }

        // Initialize all functions
        document.addEventListener('DOMContentLoaded', function() {
            animateCounters();
            initScrollAnimations();
            initTypewriter();
        });

        // Console welcome message
        console.log('%c🚀 Portfolio de Yassin Rmichi', 'color: #000; font-size: 20px; font-weight: bold;');
        console.log('%c💼 Développeur Full Stack passionné', 'color: #666; font-size: 14px;');
        console.log('%c📧 Contact: yassin.rmichi@email.com', 'color: #333; font-size: 12px;');


// avatar image switcher

    const img1 = document.getElementById('heroImg1');
    const img2 = document.getElementById('heroImg2');
    let flipped = false;

    setInterval(() => {
        if (flipped) {
            img1.classList.add('active-img');
            img1.classList.remove('hidden-img');
            img2.classList.remove('active-img');
            img2.classList.add('hidden-img');
        } else {
            img2.classList.add('active-img');
            img2.classList.remove('hidden-img');
            img1.classList.remove('active-img');
            img1.classList.add('hidden-img');
        }
        flipped = !flipped;
    }, 7000);


    const carousels = {};

    function nextSlide(id) {
        const track = document.querySelector(`#carousel-${id} .carousel-track`);
        const slides = track.children.length;
        if (!carousels[id]) carousels[id] = 0;
        carousels[id] = (carousels[id] + 1) % slides;
        track.style.transform = `translateX(-${carousels[id] * 100}%)`;
    }

    function prevSlide(id) {
        const track = document.querySelector(`#carousel-${id} .carousel-track`);
        const slides = track.children.length;
        if (!carousels[id]) carousels[id] = 0;
        carousels[id] = (carousels[id] - 1 + slides) % slides;
        track.style.transform = `translateX(-${carousels[id] * 100}%)`;
    }

