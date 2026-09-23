// ==========================================================================
// Glenn Sheriff Portfolio - Interactive Functionality
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('nav-open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Email Copy Button & Feedback Toast
  const copyBtn = document.getElementById('copy-email-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const toast = document.getElementById('copy-toast');
  const emailToCopy = 'glenn.sheriff@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = emailToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        // Visual feedback on button
        if (copyBtnText) copyBtnText.textContent = 'Copied!';
        copyBtn.style.background = 'var(--accent-cyan)';
        copyBtn.style.color = '#080c15';

        // Show toast
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 3000);
        }

        // Reset button text after 2 seconds
        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Copy';
          copyBtn.style.background = '';
          copyBtn.style.color = '';
        }, 2500);

      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  }

  // 3. Active Nav Link on Scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link:not(.cta-link)');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
