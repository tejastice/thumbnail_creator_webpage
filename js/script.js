// ===========================
// Mobile Navigation Toggle
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');

      // Toggle aria-expanded for accessibility
      const isExpanded = navLinks.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking a link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);

      if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#" (no target)
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        // Get header height for offset
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;

        // Calculate target position
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// ===========================
// FAQ Accordion
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains('active');

      // Close all other FAQs (optional: remove this if you want multiple open at once)
      faqQuestions.forEach(q => {
        if (q !== this) {
          q.classList.remove('active');
          q.nextElementSibling.classList.remove('active');
          q.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current FAQ
      this.classList.toggle('active');
      answer.classList.toggle('active');

      // Update aria-expanded for accessibility
      this.setAttribute('aria-expanded', !isActive);
    });

    // Initialize aria-expanded
    question.setAttribute('aria-expanded', 'false');
  });
});

// ===========================
// Gallery Image Modal (if gallery exists)
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item img');

  if (galleryItems.length > 0) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
      <span class="gallery-modal-close">&times;</span>
      <img class="gallery-modal-content" alt="拡大表示">
      <div class="gallery-modal-caption"></div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.gallery-modal-content');
    const modalCaption = modal.querySelector('.gallery-modal-caption');
    const closeBtn = modal.querySelector('.gallery-modal-close');

    // Open modal on image click
    galleryItems.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        modal.style.display = 'flex';
        modalImg.src = this.src;
        modalCaption.textContent = this.alt || '';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    // Close modal
    const closeModal = function() {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // Restore scrolling
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on clicking outside the image
    modal.addEventListener('click', function(e) {
      if (e.target === modal || e.target === closeBtn) {
        closeModal();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });
  }
});

// ===========================
// Scroll-based Header Shadow
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');

  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
    });
  }
});

// ===========================
// Character Count (if textarea exists)
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const textarea = document.querySelector('#pageContent');
  const charCount = document.querySelector('#charCount');

  if (textarea && charCount) {
    textarea.addEventListener('input', function() {
      const count = this.value.length;
      charCount.textContent = count.toLocaleString();
    });
  }
});

// ===========================
// Download Button Click Tracking (Optional)
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const downloadButtons = document.querySelectorAll('[href*=".zip"]');

  downloadButtons.forEach(button => {
    button.addEventListener('click', function() {
      const fileName = this.getAttribute('href').split('/').pop();
      console.log('ダウンロード開始:', fileName);

      // Here you could add analytics tracking if needed
      // Example: gtag('event', 'download', { file_name: fileName });
    });
  });
});

// ===========================
// Form Validation (if contact form exists)
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('#contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = this.querySelector('[name="name"]').value.trim();
      const email = this.querySelector('[name="email"]').value.trim();
      const message = this.querySelector('[name="message"]').value.trim();

      // Simple validation
      if (!name || !email || !message) {
        alert('すべての項目を入力してください。');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('有効なメールアドレスを入力してください。');
        return;
      }

      // If validation passes, submit form
      alert('お問い合わせありがとうございます。送信しました。');
      this.reset();
    });
  }
});

// ===========================
// Lazy Loading Images (Optional Enhancement)
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
});

// ===========================
// Back to Top Button (Optional)
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
