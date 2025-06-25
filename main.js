// Animasi scroll, skill bar, smooth scroll, dark mode, dan modal party member

document.addEventListener('DOMContentLoaded', function() {
    // Scroll effect
    const scrollElements = document.querySelectorAll('.scroll-effect');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
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
});