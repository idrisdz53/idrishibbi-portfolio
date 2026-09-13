/**
 * ==========================================================================
 * IDRIS HIBBI — PERFORMANCE CREATIVE STRATEGIST
 * Vanilla JavaScript Interactivity & Direct Email Guidance
 * ==========================================================================
 */

const TARGET_PORTFOLIO_EMAIL = "idris.hibbi16@gmail.com";

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollProgress();
  initHeaderScroll();
  initMobileNavigation();
  initIntersectionObserver();
  initScrollSpy();
  initEmailGuidance();
  initInquiryForm();
  initCreativeLibrary();
  initClientProofModal();
});

/* ── 1. THEME TOGGLE (DARK MODE DEFAULT WITH PERSISTENCE) ── */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('ih_theme');
  const currentTheme = savedTheme || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeButtonAria(themeToggleBtn, currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('ih_theme', nextTheme);
    updateThemeButtonAria(themeToggleBtn, nextTheme);
  });
}

function updateThemeButtonAria(btn, theme) {
  btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  btn.setAttribute('title', `Current: ${theme.toUpperCase()} mode (Click to toggle)`);
}

/* ── 2. SCROLL PROGRESS BAR ── */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ── 3. HEADER BACKGROUND BLUR & SHADOW ON SCROLL ── */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ── 4. MOBILE NAVIGATION DRAWER ── */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggleBtn || !navLinks) return;

  const toggleNav = () => {
    const isOpen = navLinks.classList.toggle('is-open');
    toggleBtn.classList.toggle('is-active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
  };

  const closeNav = () => {
    navLinks.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', toggleNav);

  // Close when clicking nav anchor links
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
      closeNav();
    }
  });

  // Close if clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('is-open') &&
      !navLinks.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      closeNav();
    }
  });
}

/* ── 5. SCROLL ANIMATIONS (INTERSECTION OBSERVER) ── */
function initIntersectionObserver() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ── 6. ACTIVE NAVIGATION SCROLLSPY ── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const updateActiveLink = () => {
    const scrollPosition = window.scrollY + 160;

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
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ── 7. PROFESSIONAL INQUIRY FORM (DIRECT EMAIL DRAFT DISPATCH) ── */
function initInquiryForm() {
  const form = document.getElementById('inquiry-form');
  const formFeedback = document.getElementById('form-feedback');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Required fields
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const focusSelect = document.getElementById('strategic-focus');
    const messageInput = document.getElementById('challenge-brief');

    // Optional fields
    const horizonSelect = document.getElementById('estimated-horizon');
    const brandUrlInput = document.getElementById('brand-url');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const focus = focusSelect ? focusSelect.value.trim() : '';
    const challenge = messageInput ? messageInput.value.trim() : '';
    const horizon = horizonSelect && horizonSelect.value ? horizonSelect.value.trim() : 'Exploring / No fixed timeline';
    const brandUrl = brandUrlInput && brandUrlInput.value.trim() ? brandUrlInput.value.trim() : 'Not provided';

    if (!name || !email || !focus || !challenge) {
      alert('Please fill in all required fields marked with * (Full Name, Work Email, Strategic Focus, and Challenge Brief).');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid work email address.');
      if (emailInput) emailInput.focus();
      return;
    }

    const subject = `Performance Creative Strategy Inquiry — ${name} (${focus})`;
    const bodyLines = [
      `Hi Idris,`,
      ``,
      `I am reaching out regarding a performance creative strategy opportunity. Here are the details:`,
      ``,
      `Full Name: ${name}`,
      `Work Email: ${email}`,
      `Strategic Focus: ${focus}`,
      `Estimated Horizon: ${horizon}`,
      `Website / Brand: ${brandUrl}`,
      ``,
      `Challenge Brief / Context:`,
      challenge,
      ``,
      `Best regards,`,
      name
    ];

    const customBody = bodyLines.join('\n');

    if (typeof window.openEmailModal === 'function') {
      window.openEmailModal(subject, customBody);
    }

    if (formFeedback) {
      formFeedback.classList.add('is-visible');
      formFeedback.innerHTML = `
        <strong>Inquiry draft prepared!</strong><br>
        Select Gmail Web or Default Mail App in the dialog to send your inquiry to Idris Hibbi.
      `;
      formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

/* ── 8. GUIDED DIRECT EMAIL EXPERIENCE ── */
function initEmailGuidance() {
  const modal = document.getElementById('email-guide-modal');
  const modalBackdrop = modal ? modal.querySelector('.email-modal-backdrop') : null;
  const modalCloseBtn = modal ? modal.querySelector('.email-modal-close') : null;
  const optGmail = document.getElementById('email-opt-gmail');
  const optClient = document.getElementById('email-opt-client');
  const optOutlook = document.getElementById('email-opt-outlook');
  const emailTriggers = document.querySelectorAll('.guided-email-trigger');
  const copyButtons = document.querySelectorAll('.btn-copy-address, .btn-copy-email-direct');

  const defaultSubject = "Performance Creative Strategy Inquiry — Idris Hibbi";
  const defaultBody = "Hi Idris,\n\nI'm reaching out from your portfolio regarding a performance creative strategy opportunity.\n\nBest regards,";

  // Function to build URLs and open modal
  const openEmailModal = (subject = defaultSubject, body = defaultBody) => {
    if (!modal) return;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    if (optGmail) {
      optGmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(TARGET_PORTFOLIO_EMAIL)}&su=${encodedSubject}&body=${encodedBody}`;
    }
    if (optClient) {
      optClient.href = `mailto:${TARGET_PORTFOLIO_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
    }
    if (optOutlook) {
      optOutlook.href = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(TARGET_PORTFOLIO_EMAIL)}&subject=${encodedSubject}&body=${encodedBody}`;
    }

    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for keyboard accessibility
    if (modalCloseBtn) modalCloseBtn.focus();
  };

  window.openEmailModal = openEmailModal;

  const closeEmailModal = () => {
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Close triggers
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeEmailModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeEmailModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
      closeEmailModal();
    }
  });

  // Intercept all guided email triggers across the page
  emailTriggers.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openEmailModal();
    });
  });

  // 1-Click Copy Email Address Action
  const copyEmailToClipboard = (buttonEl) => {
    const emailToCopy = buttonEl.getAttribute('data-email') || TARGET_PORTFOLIO_EMAIL;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailToCopy)
        .then(() => setCopiedFeedback(buttonEl))
        .catch(() => fallbackCopyText(emailToCopy, () => setCopiedFeedback(buttonEl)));
    } else {
      fallbackCopyText(emailToCopy, () => setCopiedFeedback(buttonEl));
    }
  };

  const setCopiedFeedback = (btn) => {
    btn.classList.add('is-copied');
    const label = btn.querySelector('.copy-btn-text, .copy-direct-label');
    const originalText = label ? label.textContent : '';
    if (label) label.textContent = 'Copied! ✓';

    setTimeout(() => {
      btn.classList.remove('is-copied');
      if (label) label.textContent = originalText;
    }, 2200);
  };

  const fallbackCopyText = (text, callback) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      if (callback) callback();
    } catch (err) {
      alert(`Email: ${text}`);
    }
    document.body.removeChild(textArea);
  };

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      copyEmailToClipboard(btn);
    });
  });
}

/* ── 9. CREATIVE LIBRARY (META AD LIBRARY SHOWCASE & LIGHTBOX VIEWER) ── */
function initCreativeLibrary() {
  const filterButtons = document.querySelectorAll('.ad-filter-btn');
  const adCards = document.querySelectorAll('.ad-library-card');
  const modal = document.getElementById('creative-lightbox-modal');
  if (!adCards.length) return;

  // 1. Filter Tabs Interactivity
  if (filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active tab styling and ARIA states
        filterButtons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        // Filter cards
        adCards.forEach(card => {
          const brand = card.getAttribute('data-brand');
          if (filter === 'all' || brand === filter) {
            card.classList.remove('is-hidden');
            card.classList.add('is-revealed');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // 2. Lightbox / Strategy Inspector Modal
  if (!modal) return;

  const modalImg = document.getElementById('modal-creative-img');
  const modalAdId = document.getElementById('modal-ad-id');
  const modalBrandAvatar = document.getElementById('modal-brand-avatar');
  const modalAvatarInitials = document.getElementById('modal-avatar-initials');
  const modalTitle = document.getElementById('creative-modal-title');
  const modalBadge = document.getElementById('modal-ad-badge');
  const modalHook = document.getElementById('modal-hook-text');
  const modalFormat = document.getElementById('modal-format-val');
  const modalAngle = document.getElementById('modal-angle-val');
  const modalStrategy = document.getElementById('modal-strategy-text');
  const modalCaseLink = document.getElementById('modal-case-study-link');

  const openCreativeModal = (card) => {
    if (!card) return;

    // Extract attributes from the card DOM
    const brandName = card.querySelector('.ad-brand-name')?.textContent.trim() || 'Brand';
    const brandInitials = card.querySelector('.ad-brand-avatar span')?.textContent.trim() || 'AD';
    const adId = card.querySelector('.ad-id-badge')?.textContent.trim() || '';
    const sponsoredTag = card.querySelector('.ad-sponsored-tag')?.textContent.trim() || 'Independent Creative Strategy';
    const mediaImg = card.querySelector('.ad-media-img');
    const imgSrc = mediaImg ? mediaImg.getAttribute('src') : '';
    const imgAlt = mediaImg ? mediaImg.getAttribute('alt') : 'Creative Asset';
    const hookText = card.querySelector('.ad-hook-text')?.innerHTML.trim() || '';
    const attrVals = card.querySelectorAll('.ad-attr-val');
    const formatVal = attrVals[0]?.textContent.trim() || 'Static';
    const angleVal = attrVals[1]?.textContent.trim() || '';
    const strategyText = card.querySelector('.ad-strategy-text')?.innerHTML.trim() || '';
    const caseLink = card.querySelector('.ad-case-link')?.getAttribute('href') || '#';

    // Populate modal
    if (modalAdId) modalAdId.textContent = adId;
    if (modalImg) {
      modalImg.setAttribute('src', imgSrc);
      modalImg.setAttribute('alt', imgAlt);
    }
    if (modalAvatarInitials) modalAvatarInitials.textContent = brandInitials;
    if (modalBrandAvatar) {
      modalBrandAvatar.className = 'ad-brand-avatar';
      if (card.getAttribute('data-brand') === 'gymshark') {
        modalBrandAvatar.classList.add('ad-avatar-gymshark');
      } else if (card.getAttribute('data-brand') === 'cloudnine') {
        modalBrandAvatar.classList.add('ad-avatar-cloudnine');
      }
    }
    if (modalTitle) modalTitle.textContent = brandName;
    if (modalBadge) modalBadge.textContent = sponsoredTag;
    if (modalHook) modalHook.innerHTML = hookText;
    if (modalFormat) modalFormat.textContent = formatVal;
    if (modalAngle) modalAngle.textContent = angleVal;
    if (modalStrategy) modalStrategy.innerHTML = strategyText;
    if (modalCaseLink) {
      modalCaseLink.setAttribute('href', caseLink);
      modalCaseLink.setAttribute('aria-label', `Read full ${brandName} case study breakdown on Google Docs`);
    }

    // Open modal
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    const closeBtn = modal.querySelector('.creative-modal-close');
    if (closeBtn) closeBtn.focus();
  };

  const closeCreativeModal = () => {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Wire up view triggers on cards
  adCards.forEach(card => {
    // Buttons with data-action="view-creative"
    const viewButtons = card.querySelectorAll('[data-action="view-creative"]');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openCreativeModal(card);
      });
    });

    // Clicking image area directly opens modal (skip for video cards to allow native playback)
    const mediaContainer = card.querySelector('.ad-media-container');
    if (mediaContainer && !card.querySelector('.ad-media-video')) {
      mediaContainer.addEventListener('click', (e) => {
        // Prevent double open if clicking the expand button directly
        if (!e.target.closest('[data-action="view-creative"]')) {
          openCreativeModal(card);
        }
      });
    }
  });

  // Modal close handlers (close button & backdrop click)
  const closeTriggers = modal.querySelectorAll('[data-action="close-creative-modal"]');
  closeTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeCreativeModal();
    });
  });

  // Keyboard navigation (Escape key to dismiss)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeCreativeModal();
    }
  });

  // Copy Library ID to clipboard on click with visual feedback
  const idBadges = document.querySelectorAll('.ad-id-badge');
  idBadges.forEach(badge => {
    badge.addEventListener('click', (e) => {
      e.stopPropagation();
      const rawText = badge.textContent.trim();
      const match = rawText.match(/\d+/);
      const textToCopy = match ? match[0] : rawText;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = badge.textContent;
          badge.textContent = 'Copied!';
          badge.style.color = '#22c55e';
          setTimeout(() => {
            badge.textContent = originalText;
            badge.style.color = '';
          }, 1400);
        }).catch(() => {});
      }
    });
  });
}

/* ── 10. CLIENT PROOF MODAL (UPWORK VERIFIED CONTRACT DETAILS) ── */
function initClientProofModal() {
  const modal = document.getElementById('client-proof-modal');
  if (!modal) return;

  const openTriggers = document.querySelectorAll('[data-action="open-client-proof-modal"]');
  const closeTriggers = modal.querySelectorAll('[data-action="close-client-proof-modal"]');
  const closeBtn = modal.querySelector('.client-modal-close');

  const openProofModal = () => {
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeProofModal = () => {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openProofModal();
    });
  });

  closeTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeProofModal();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeProofModal();
    }
  });
}


