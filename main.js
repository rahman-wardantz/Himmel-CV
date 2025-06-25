// Animasi scroll, skill bar, smooth scroll, dark mode, dan modal party member

document.addEventListener('DOMContentLoaded', function() {
    // Scroll effect
    const scrollElements = document.querySelectorAll('.scroll-effect');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('bounce-in');
            }
        });
    }, { threshold: 0.1 });
    scrollElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });

    // Skill bar animation on scroll into view
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || bar.style.width;
                bar.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => {
        bar.setAttribute('data-width', bar.style.width);
        bar.style.width = '0';
        skillObserver.observe(bar);
    });

    // Smooth scroll for scroll-link
    document.querySelectorAll('.scroll-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.getBoundingClientRect().top + window.scrollY - 40,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Dark mode toggle
    const darkToggle = document.getElementById('darkModeToggle');
    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('darkMode', document.body.classList.contains('dark'));
    });
    // Load dark mode from storage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
    }

    // Auto dark mode by time (if user never set manually)
    if (localStorage.getItem('darkMode') === null) {
        const hour = new Date().getHours();
        if (hour >= 18 || hour < 6) {
            document.body.classList.add('dark');
        }
    }

    // Party member modal
    const partyMembers = document.querySelectorAll('.party-member');
    const partyModal = document.getElementById('partyModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');

    // Data detail party member
    const partyData = {
        "Frieren": {
            img: "https://cdn.myanimelist.net/images/characters/7/525105.jpg",
            role: "Elven Mage",
            desc: "An immortal elven mage, Frieren specializes in ancient magic and has vast knowledge of spells. Calm and wise, she supported the party with powerful magic."
        },
        "Eisen": {
            img: "https://cdn.myanimelist.net/images/characters/13/523293.jpg",
            role: "Dwarven Warrior",
            desc: "A legendary dwarven warrior and master of the sword. Eisen is known for his strength, resilience, and loyalty to his friends."
        },
        "Heiter": {
            img: "https://cdn.myanimelist.net/images/characters/16/523294.jpg",
            role: "Human Priest",
            desc: "A kind-hearted priest who provided healing and support magic. Despite his cheerful demeanor, he is deeply insightful and reliable."
        },
        "Himmel": {
            img: "https://cdn.myanimelist.net/images/characters/9/523295.jpg",
            role: "Human Hero",
            desc: "The charismatic leader of the Hero Party. Himmel is renowned for his swordsmanship, leadership, and unwavering sense of justice."
        }
    };

    partyMembers.forEach(member => {
        member.addEventListener('click', () => {
            const name = member.querySelector('h4').innerText.trim();
            const data = partyData[name];
            if (data) {
                modalContent.innerHTML = `
                    <div class="flex flex-col items-center">
                        <img src="${data.img}" alt="${name}" class="w-20 h-20 rounded-full mb-3 border-2 border-blue-400 shadow">
                        <h3 class="font-bold text-lg text-blue-800 dark:text-blue-200 mb-1">${name}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">${data.role}</p>
                        <p class="text-gray-700 dark:text-gray-200 text-center">${data.desc}</p>
                    </div>
                `;
                partyModal.classList.remove('hidden');
            }
        });
    });
    closeModal.addEventListener('click', () => {
        partyModal.classList.add('hidden');
    });
    partyModal.addEventListener('click', (e) => {
        if (e.target === partyModal) partyModal.classList.add('hidden');
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && !partyModal.classList.contains('hidden')) {
            partyModal.classList.add('hidden');
        }
    });

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.remove('hidden');
        } else {
            scrollTopBtn.classList.add('hidden');
        }
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Modal fade-in effect
    const modalBg = partyModal.querySelector('.bg-white, .dark\\:bg-gray-900');
    partyModal.addEventListener('transitionstart', () => {
        if (!partyModal.classList.contains('hidden')) {
            modalBg && (modalBg.style.opacity = '1');
        }
    });

    // Copy email to clipboard with notification
    const emailBtn = document.querySelector('a[aria-label="Email"]');
    emailBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const email = "himmel.hero@legend.com";
        navigator.clipboard.writeText(email).then(() => {
            showToast("Email copied to clipboard!");
        });
    });

    // Simple toast notification
    function showToast(msg) {
        let toast = document.createElement('div');
        toast.innerText = msg;
        toast.className = "fixed bottom-24 right-8 z-50 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade";
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 500);
        }, 1800);
    }

    // Highlight sidebar section on scroll
    const sections = [
        {id: 'about', selector: '.bg-white:has(.fa-info-circle)'},
        {id: 'skills', selector: '.bg-white:has(.fa-swords)'},
        {id: 'languages', selector: '.bg-white:has(.fa-language)'}
    ];
    function highlightSidebar() {
        let scrollPos = window.scrollY + 120;
        sections.forEach(sec => {
            const el = document.querySelector(sec.selector);
            if (!el) return;
            if (el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
                el.classList.add('ring-2', 'ring-blue-400');
            } else {
                el.classList.remove('ring-2', 'ring-blue-400');
            }
        });
    }
    window.addEventListener('scroll', highlightSidebar);
    highlightSidebar();

    // Accent color switcher
    function setAccent(accent) {
        document.body.classList.remove('accent-blue', 'accent-green', 'accent-purple', 'accent-red');
        document.body.classList.add('accent-' + accent);
        localStorage.setItem('accent', accent);
    }
    ['Blue','Green','Purple','Red'].forEach(color => {
        const btn = document.getElementById('accent'+color);
        if (btn) {
            btn.addEventListener('click', () => setAccent(color.toLowerCase()));
        }
    });
    // Load accent from storage
    const savedAccent = localStorage.getItem('accent');
    if (savedAccent) setAccent(savedAccent);

    document.getElementById('printBtn').addEventListener('click', () => {
        window.print();
    });
});