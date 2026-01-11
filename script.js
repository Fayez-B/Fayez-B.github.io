
//FAYEZ BEZREH - PORTFOLIO WEBSITE


const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initProjectFilters();
    initProjectModal();
    initContactForm();
    initSmoothScroll();
});

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        updateActiveNavLink();
    }

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;

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
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    handleScroll();
}


function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}


function initScrollReveal() {
    if (prefersReducedMotion) {
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('active');
        });
        return;
    }

    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // For skill categories, trigger chip animations
                if (entry.target.classList.contains('skill-category')) {
                    entry.target.classList.add('active');
                }

            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));
}


function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

           
            projectCards.forEach(card => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    
                    if (!prefersReducedMotion) {
                        card.style.animation = 'none';
                        card.offsetHeight; 
                        card.style.animation = '';
                    }
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}


function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const projectCards = document.querySelectorAll('.project-card');

    const projectData = {
        'dental-clinic': {
            icon: '🏥',
            title: 'Dental Clinic Management System',
            description: 'A clinic management application handling patient registration, appointment scheduling, and basic admin workflows.',
            challenges: [
                'Learned to design relational database schemas and manage foreign key relationships',
                'Struggled with appointment conflict detection logic, solved it with SQL time-range queries',
                'Gained experience separating UI code from business logic for cleaner architecture'
            ],
            tech: ['Java', 'SQL', 'JDBC', 'Swing UI']
        },
        'data-analysis': {
            icon: '📈',
            title: 'Customer Experience Data Analysis',
            description: 'Cleaned and analyzed customer survey data using Pandas and Jupyter to extract insights about user satisfaction trends.',
            challenges: [
                'Dealt with messy real-world data: missing values, inconsistent formats, and outliers',
                'Learned pivot tables and groupby operations for meaningful segmentation',
                'Improved my ability to tell a story with data through clear visualizations'
            ],
            tech: ['Python', 'Pandas', 'Jupyter', 'Matplotlib', 'Seaborn']
        },
        'data-pipeline': {
            icon: '🔄',
            title: 'Data Ingestion & Reporting Pipeline',
            description: 'Built an ETL-style pipeline that reads CSV files, transforms the data, and loads it into PostgreSQL for reporting.',
            challenges: [
                'Learned to handle encoding issues and malformed CSV rows gracefully',
                'Figured out batch inserts for better database performance',
                'Gained hands-on experience writing SQL aggregation queries for reports'
            ],
            tech: ['Python', 'SQL', 'PostgreSQL', 'psycopg2']
        },
        'log-analysis': {
            icon: '📋',
            title: 'Simulation Log Analysis Tool',
            description: 'A command-line tool that parses large simulation log files, extracts errors and warnings, and generates summary reports.',
            challenges: [
                'Learned regex patterns for parsing unstructured log formats',
                'Optimized file reading to handle large logs without memory issues',
                'Built a CLI interface with argparse for flexible usage'
            ],
            tech: ['Python', 'Linux', 'Regex', 'argparse']
        },
        'test-automation': {
            icon: '🔧',
            title: 'Build & Test Automation Scripts',
            description: 'Shell and Python scripts to automate repetitive testing tasks, improving consistency and reducing manual effort.',
            challenges: [
                'Learned to chain shell commands and handle exit codes properly',
                'Figured out how to capture and compare output for regression testing',
                'Gained experience with cron scheduling for automated runs'
            ],
            tech: ['Python', 'Bash', 'Linux', 'Shell Scripting']
        },
        'visualization': {
            icon: '📊',
            title: 'Performance Visualization Practice',
            description: 'Created various charts from benchmark data to identify trends, compare categories, and spot anomalies.',
            challenges: [
                'Learned matplotlib customization for clean, readable figures',
                'Practiced choosing the right chart type for different data stories',
                'Improved skills in making visualizations presentation-ready'
            ],
            tech: ['Python', 'Matplotlib', 'NumPy', 'Pandas']
        }
    };


    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const projectId = btn.dataset.project;
            const data = projectData[projectId];

            if (data) {
                openModal(data);
            }
        });
    });

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('button')) return;

            const projectId = card.dataset.project;
            const data = projectData[projectId];

            if (data) {
                openModal(data);
            }
        });
    });


    function openModal(data) {
        document.getElementById('modalIcon').textContent = data.icon;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalDescription').textContent = data.description;

        const featuresList = document.getElementById('modalFeatures');
        featuresList.innerHTML = data.challenges.map(c => `<li>${c}</li>`).join('');


        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = data.tech.map(t => `<span class="tech-chip">${t}</span>`).join('');


        modal.classList.add('active');
        document.body.style.overflow = 'hidden';


        modalClose.focus();
    }


    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }


    modalClose.addEventListener('click', closeModal);


    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}


function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const sendAnother = document.getElementById('sendAnother');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                form.style.display = 'none';
                formSuccess.classList.add('active');
                form.reset();
            } else {
                // Show the real error (Formspree often gives JSON)
                const data = await response.json().catch(() => null);
                const msg = data?.errors?.[0]?.message || "Failed to send. Please try again.";
                alert(msg);
            }
        } catch (err) {
            alert("Network error. If you're testing by opening the HTML file directly, use a local server or GitHub Pages.");
        }
    });

    sendAnother.addEventListener('click', () => {
        formSuccess.classList.remove('active');
        form.style.display = 'block';
    });
}




function initSmoothScroll() {

    if (prefersReducedMotion) return;

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                history.pushState(null, null, href);
            }
        });
    });
}

