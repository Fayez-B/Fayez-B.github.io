// portfolio js

document.addEventListener('DOMContentLoaded', () => {
    // mobile nav
    const navToggle = document.getElementById('navToggle');
    const siteNav = document.getElementById('siteNav');

    if (navToggle && siteNav) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            siteNav.classList.toggle('active');
        });

        siteNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                siteNav.classList.remove('active');
            });
        });

        // close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !siteNav.contains(e.target)) {
                navToggle.classList.remove('active');
                siteNav.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navToggle.classList.remove('active');
                siteNav.classList.remove('active');
            }
        });
    }

    // project filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // project expand/collapse
    const projectToggles = document.querySelectorAll('.project-toggle');

    projectToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const projectItem = toggle.closest('.project-item');
            const details = projectItem.querySelector('.project-details');

            if (details) {
                const isHidden = details.hidden;
                details.hidden = !isHidden;
                toggle.textContent = isHidden ? 'Close' : 'Details';
                toggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
            }
        });
    });

    // contact form
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const sendAnother = document.getElementById('sendAnother');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactForm.hidden = true;
                    formSuccess.hidden = false;
                    contactForm.reset();
                } else {
                    throw new Error('failed');
                }
            } catch (error) {
                alert('Sorry, there was an error sending your message. Please try again or email me directly.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });

        if (sendAnother) {
            sendAnother.addEventListener('click', () => {
                formSuccess.hidden = true;
                contactForm.hidden = false;
            });
        }
    }
});
