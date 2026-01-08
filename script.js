/**
 * FAYEZ BEZREH - PORTFOLIO WEBSITE
 * JavaScript for animations, interactions, and functionality
 *
 * Features:
 * - Smooth scroll navigation
 * - Navbar scroll effects
 * - Mobile menu toggle
 * - Scroll reveal animations (IntersectionObserver)
 * - Project filtering
 * - Project modal
 * - Contact form handling
 * - Respects prefers-reduced-motion
 */

// ============================================
// UTILITY: Check for reduced motion preference
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================
// DOM CONTENT LOADED - Initialize everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initProjectFilters();
    initProjectModal();
    initContactForm();
    initSmoothScroll();
});

// ============================================
// NAVBAR - Scroll effects and active states
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Add scrolled class when page is scrolled
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    }

    // Determine which section is currently in view
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

    // Throttle scroll handler for performance
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

    // Initial check
    handleScroll();
}

// ============================================
// MOBILE MENU - Toggle functionality
// ============================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu on hamburger click
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// SCROLL REVEAL - Animate elements on scroll
// ============================================
function initScrollReveal() {
    // Skip if user prefers reduced motion
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

                // Optionally unobserve after animation (one-time)
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // Also observe skill categories
    document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));
}

// ============================================
// PROJECT FILTERS - Filter cards by category
// ============================================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter cards with animation
            projectCards.forEach(card => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    // Trigger re-animation if not reduced motion
                    if (!prefersReducedMotion) {
                        card.style.animation = 'none';
                        card.offsetHeight; // Trigger reflow
                        card.style.animation = '';
                    }
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// PROJECT MODAL - Show project details
// ============================================
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const projectCards = document.querySelectorAll('.project-card');

    // Project data for modal content
    const projectData = {
        'dental-clinic': {
            icon: '🏥',
            title: 'Dental Clinic Management System',
            description: 'A comprehensive clinic management application built as a course project. It handles patient registration, appointment scheduling, and basic administrative tasks.',
            features: [
                'Patient CRUD operations with form validation',
                'Appointment scheduling with conflict detection',
                'Basic admin dashboard with statistics',
                'Data persistence using SQL database',
                'Clean separation of UI and business logic'
            ],
            tech: ['Java', 'SQL', 'JDBC', 'Swing UI']
        },
        'data-analysis': {
            icon: '📈',
            title: 'Customer Experience Data Analysis',
            description: 'A Jupyter notebook project focused on cleaning and analyzing customer survey data to extract meaningful insights about user satisfaction.',
            features: [
                'Handled missing values and outliers',
                'Created pivot tables for segmentation',
                'Visualized trends with seaborn/matplotlib',
                'Documented analysis steps with markdown',
                'Exported clean dataset for further use'
            ],
            tech: ['Python', 'Pandas', 'Jupyter', 'Matplotlib', 'Seaborn']
        },
        'data-pipeline': {
            icon: '🔄',
            title: 'Data Ingestion & Reporting Pipeline',
            description: 'Built a simple ETL-style pipeline that reads CSV files, transforms the data, and loads it into PostgreSQL for querying and reporting.',
            features: [
                'CSV parsing with error handling',
                'Data transformation and normalization',
                'Batch inserts into PostgreSQL',
                'SQL queries for aggregated reports',
                'Basic logging for troubleshooting'
            ],
            tech: ['Python', 'SQL', 'PostgreSQL', 'psycopg2']
        },
        'log-analysis': {
            icon: '📋',
            title: 'Simulation Log Analysis Tool',
            description: 'A command-line tool that parses large simulation log files, extracts errors and warnings, and generates summary reports.',
            features: [
                'Regex-based log parsing',
                'Error/warning classification',
                'Summary statistics generation',
                'Output to CSV and text reports',
                'Handles large files efficiently'
            ],
            tech: ['Python', 'Linux', 'Regex', 'argparse']
        },
        'test-automation': {
            icon: '🔧',
            title: 'Build & Test Automation Scripts',
            description: 'A collection of shell and Python scripts to automate repetitive testing tasks, improving consistency and saving manual effort.',
            features: [
                'Automated test execution with Bash',
                'Output capture and diff comparison',
                'Pass/fail reporting with exit codes',
                'Integration with cron for scheduling',
                'Configuration via environment variables'
            ],
            tech: ['Python', 'Bash', 'Linux', 'Shell Scripting']
        },
        'visualization': {
            icon: '📊',
            title: 'Performance Visualization Practice',
            description: 'Practice project creating various visualizations from performance benchmark data to identify trends and anomalies.',
            features: [
                'Line charts for time-series data',
                'Bar charts for category comparisons',
                'Scatter plots for correlation analysis',
                'Basic anomaly highlighting',
                'Clean, presentation-ready figures'
            ],
            tech: ['Python', 'Matplotlib', 'NumPy', 'Pandas']
        }
    };

    // Open modal on card click (but not on button clicks)
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking on a link/button
            if (e.target.closest('a')) return;

            const projectId = card.dataset.project;
            const data = projectData[projectId];

            if (data) {
                openModal(data);
            }
        });
    });

    // Open modal with data
    function openModal(data) {
        document.getElementById('modalIcon').textContent = data.icon;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalDescription').textContent = data.description;

        // Populate features list
        const featuresList = document.getElementById('modalFeatures');
        featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

        // Populate tech chips
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = data.tech.map(t => `<span class="tech-chip">${t}</span>`).join('');

        // Populate footer with GitHub button only
        const footer = document.getElementById('modalFooter');
        footer.innerHTML = `
            <a href="#" class="project-btn project-btn-single" target="_blank" rel="noopener">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                View on GitHub
            </a>
        `;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus trap for accessibility
        modalClose.focus();
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close button click
    modalClose.addEventListener('click', closeModal);

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ============================================
// CONTACT FORM - Handle submission
// ============================================
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



// ============================================
// SMOOTH SCROLL - Enhanced smooth scrolling
// ============================================
function initSmoothScroll() {
    // Skip enhanced smooth scroll if user prefers reduced motion
    // (CSS handles basic smooth scroll, but we can enhance it)
    if (prefersReducedMotion) return;

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
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

                // Update URL without triggering scroll
                history.pushState(null, null, href);
            }
        });
    });
}

// ============================================
// BONUS: Typing effect for hero (optional)
// ============================================
// Uncomment to enable typing animation for tagline
/*
function initTypingEffect() {
    if (prefersReducedMotion) return;

    const tagline = document.querySelector('.hero-tagline');
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.visibility = 'visible';

    let i = 0;
    const speed = 30;

    function typeWriter() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // Start after hero animation
    setTimeout(typeWriter, 1000);
}
*/

// ============================================
// BONUS: Parallax effect for blobs (optional)
// ============================================
// Uncomment to enable subtle parallax on background blobs
/*
function initParallax() {
    if (prefersReducedMotion) return;

    const blobs = document.querySelectorAll('.blob');

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;

            blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}
*/
