document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Language Toggle & Translation Support
    // ----------------------------------------------------
    const langBtn = document.getElementById('lang-btn');
    const htmlElement = document.documentElement;
    
    // Set default language to Tamil ('ta') if not stored
    let currentLang = localStorage.getItem('site-lang') || 'ta';
    htmlElement.setAttribute('lang', currentLang);
    
    const translatePage = (lang) => {
        const translatableElements = document.querySelectorAll('.trn');
        translatableElements.forEach(el => {
            const enText = el.getAttribute('data-en');
            const taText = el.getAttribute('data-ta');
            
            if (lang === 'en' && enText) {
                el.innerHTML = enText;
            } else if (lang === 'ta' && taText) {
                el.innerHTML = taText;
            }
        });
        
        // Update input placeholders
        const nameInput = document.getElementById('form-name');
        const phoneInput = document.getElementById('form-phone');
        const emailInput = document.getElementById('form-email');
        const msgInput = document.getElementById('form-message');
        
        if (lang === 'en') {
            if (nameInput) nameInput.placeholder = "e.g., Rajesh";
            if (phoneInput) phoneInput.placeholder = "e.g., 9080461699";
            if (emailInput) emailInput.placeholder = "e.g., muthuvelraj2818@gmail.com";
            if (msgInput) msgInput.placeholder = "Type your message here...";
            langBtn.textContent = 'தமிழ்';
        } else {
            if (nameInput) nameInput.placeholder = "உதாரணம்: ராஜேஷ்";
            if (phoneInput) phoneInput.placeholder = "உதாரணம்: 9080461699";
            if (emailInput) emailInput.placeholder = "உதாரணம்: muthuvelraj2818@gmail.com";
            if (msgInput) msgInput.placeholder = "உங்கள் செய்தியை இங்கே உள்ளிடவும்...";
            langBtn.textContent = 'EN';
        }
    };
    
    // Initialize translation on load
    translatePage(currentLang);
    
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ta' ? 'en' : 'ta';
        htmlElement.setAttribute('lang', currentLang);
        localStorage.setItem('site-lang', currentLang);
        translatePage(currentLang);
        
        // Refresh active tab layout content if necessary
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) activeTab.click();
    });

    // ----------------------------------------------------
    // 2. Theme Toggle (Dark / Light)
    // ----------------------------------------------------
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = themeBtn.querySelector('i');
    
    // Retrieve theme from storage, default to dark
    let currentTheme = localStorage.getItem('site-theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('site-theme', currentTheme);
        updateThemeIcon(currentTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    // ----------------------------------------------------
    // 3. Mobile Navigation Drawer
    // ----------------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('active');
        
        // Animate hamburger toggle
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('active');
            menuToggle.querySelectorAll('span').forEach(span => span.style.transform = 'none');
            menuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
        });
    });

    // ----------------------------------------------------
    // 4. Header Scroll Shrink Effect
    // ----------------------------------------------------
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ----------------------------------------------------
    // 5. Active Section Scroll Highlighting
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ----------------------------------------------------
    // 6. Kamarajar Legacy Tabs System
    // ----------------------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // ----------------------------------------------------
    // 7. Social Activities Grid Filter
    // ----------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activityCards = document.querySelectorAll('.activity-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activityCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Add fade/scale effect
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.85)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // match transition speed
                }
            });
        });
    });

    // ----------------------------------------------------
    // 8. Photo Gallery Lightbox popup
    // ----------------------------------------------------
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlayTitle = item.querySelector('.gallery-overlay h4');
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = overlayTitle.textContent;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop body scrolling
        });
    });
    
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    };
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Escape key closes lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ----------------------------------------------------
    // 9. Intersection Observer (Reveal on Scroll)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // triggers slightly before entering
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ----------------------------------------------------
    // 10. Form Submission & Custom Toast Banner
    // ----------------------------------------------------
    const contactForm = document.getElementById('iyakkam-form');
    const toast = document.getElementById('toast-msg');
    const toastTitle = document.getElementById('toast-title');
    const toastBody = document.getElementById('toast-body');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Form Values (Mock submission)
            const name = document.getElementById('form-name').value;
            const phone = document.getElementById('form-phone').value;
            const email = document.getElementById('form-email').value;
            const purpose = document.getElementById('form-purpose').value;
            const message = document.getElementById('form-message').value;
            
            console.log("Form Submitted:", { name, phone, email, purpose, message });
            
            // Set Toast Content based on language
            if (currentLang === 'ta') {
                toastTitle.textContent = "வாழ்த்துகள்!";
                toastBody.textContent = "தங்கள் விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது. விரைவில் உங்களைத் தொடர்பு கொள்கிறோம்.";
            } else {
                toastTitle.textContent = "Success!";
                toastBody.textContent = "Your details have been submitted. We will contact you soon.";
            }
            
            // Show toast message
            toast.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Hide toast after 4 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        });
    }
});
