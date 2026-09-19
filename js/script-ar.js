/**
 * ==========================================================================
 * IDRIS HIBBI — CREATIVE STRATEGIST & COPYWRITER (ARABIC VERSION)
 * Vanilla JavaScript Interactivity, Lightbox, Modals & Arabic Dispatch
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
  const isDark = theme === 'dark';
  btn.setAttribute('aria-label', isDark ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي');
  btn.setAttribute('title', isDark ? 'الوضع الحالي: ليلي (اضغط للتبديل)' : 'الوضع الحالي: نهاري (اضغط للتبديل)');
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

  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
      closeNav();
    }
  });

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

/* ── 7. ARABIC INQUIRY FORM (DIRECT EMAIL DRAFT DISPATCH) ── */
function initInquiryForm() {
  const form = document.getElementById('inquiry-form');
  const formFeedback = document.getElementById('form-feedback');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const focusSelect = document.getElementById('strategic-focus');
    const brandNameInput = document.getElementById('brand-name');
    const brandUrlInput = document.getElementById('brand-url');
    const messageInput = document.getElementById('challenge-brief');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const focus = focusSelect ? focusSelect.value.trim() : '';
    const brandName = brandNameInput && brandNameInput.value.trim() ? brandNameInput.value.trim() : 'غير محدد';
    const brandUrl = brandUrlInput && brandUrlInput.value.trim() ? brandUrlInput.value.trim() : 'غير محدد';
    const challenge = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !focus || !challenge) {
      alert('يرجى ملء جميع الحقول الإلزامية المحددة بعلامة * (الاسم الكامل، البريد الإلكتروني، نوع الخدمة المطلوبة، وتفاصيل التحدي).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('يرجى إدخال بريد إلكتروني صالح للعمل.');
      if (emailInput) emailInput.focus();
      return;
    }

    const subject = `استفسار استراتيجية إبداعية — ${name} (${focus})`;
    const bodyLines = [
      `مرحباً إدريس،`,
      ``,
      `أتواصل معك بخصوص فرصة عمل في الاستراتيجية الإبداعية / كتابة الإعلانات:`,
      ``,
      `• الاسم الكامل: ${name}`,
      `• البريد الإلكتروني للعمل: ${email}`,
      `• الخدمة المطلوبة: ${focus}`,
      `• العلامة التجارية: ${brandName}`,
      `• رابط الموقع / المتجر: ${brandUrl}`,
      ``,
      `تفاصيل التحدي الإعلاني أو المشروع:`,
      challenge,
      ``,
      `مع خالص التحيات،`,
      name
    ];

    const customBody = bodyLines.join('\n');

    if (isMobilePhone()) {
      const mailtoUrl = `mailto:${TARGET_PORTFOLIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(customBody)}`;
      window.location.href = mailtoUrl;
      if (formFeedback) {
        formFeedback.classList.add('is-visible');
        formFeedback.innerHTML = `
          <strong>جاري فتح تطبيق البريد الإلكتروني على هاتفك...</strong><br>
          تم تجهيز رسالتك مع كافة التفاصيل، أرسلها مباشرة وسأرد عليك خلال 24 ساعة.
        `;
      }
      return;
    }

    if (typeof window.openEmailModal === 'function') {
      window.openEmailModal(subject, customBody);
    } else {
      const mailtoUrl = `mailto:${TARGET_PORTFOLIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(customBody)}`;
      window.location.href = mailtoUrl;
    }

    if (formFeedback) {
      formFeedback.classList.add('is-visible');
      formFeedback.innerHTML = `
        <strong>تم تجهيز مسودة رسالتك بنجاح!</strong><br>
        اختر وسيلة البريد المفضلة لديك لإرسال الاستفسار مباشرة إلى ${TARGET_PORTFOLIO_EMAIL}.
      `;
    }
  });
}

function isMobilePhone() {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
}

/* ── 8. EMAIL GUIDANCE MODAL & 1-CLICK CLIPBOARD COPY ── */
function initEmailGuidance() {
  const modal = document.getElementById('email-guide-modal');
  const modalBackdrop = modal ? modal.querySelector('.email-modal-backdrop') : null;
  const modalCloseBtn = modal ? modal.querySelector('.email-modal-close') : null;
  const optGmail = document.getElementById('email-opt-gmail');
  const optClient = document.getElementById('email-opt-client');
  const optOutlook = document.getElementById('email-opt-outlook');
  const copyButtons = document.querySelectorAll('.btn-copy-address, .btn-copy-email-direct');
  const emailTriggers = document.querySelectorAll('.guided-email-trigger');
  const mainEmailBtn = document.getElementById('btn-open-email-main');

  const defaultSubject = "استفسار استراتيجية إبداعية — إدريس هبي";
  const defaultBody = [
    "مرحباً إدريس،",
    "",
    "اطلعت على معرض أعمالك وأرغب في مناقشة فرصة استراتيجية إبداعية لعلامتي التجارية.",
    "",
    "• العلامة التجارية / الشركة:",
    "• التحدي الإعلاني الأساسي:",
    "",
    "أتطلع للتواصل معك قريباً!",
    "",
    "مع التحية،"
  ].join("\n");

  const openEmailModal = (subject = defaultSubject, body = defaultBody) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const mailtoUrl = `mailto:${TARGET_PORTFOLIO_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;

    if (isMobilePhone()) {
      window.location.href = mailtoUrl;
      return;
    }

    if (!modal) return;

    if (optGmail) {
      optGmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(TARGET_PORTFOLIO_EMAIL)}&su=${encodedSubject}&body=${encodedBody}`;
    }
    if (optClient) {
      optClient.href = mailtoUrl;
    }
    if (optOutlook) {
      optOutlook.href = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(TARGET_PORTFOLIO_EMAIL)}&subject=${encodedSubject}&body=${encodedBody}`;
    }

    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (modalCloseBtn) modalCloseBtn.focus();
  };

  window.openEmailModal = openEmailModal;

  const closeEmailModal = () => {
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (modalBackdrop) modalBackdrop.addEventListener('click', closeEmailModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeEmailModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
      closeEmailModal();
    }
  });

  emailTriggers.forEach(link => {
    link.addEventListener('click', (e) => {
      if (isMobilePhone()) return;
      e.preventDefault();
      openEmailModal();
    });
  });

  if (mainEmailBtn && isMobilePhone()) {
    const label = mainEmailBtn.querySelector('.btn-email-label');
    if (label) label.textContent = 'فتح تطبيق البريد الإلكتروني \u2190';
  }

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
    if (label) label.textContent = 'تم النسخ! ✓';

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
      alert(`البريد الإلكتروني: ${text}`);
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

  if (filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterButtons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

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

    const brandName = card.querySelector('.ad-brand-name')?.textContent.trim() || 'العلامة التجارية';
    const brandInitials = card.querySelector('.ad-brand-avatar span')?.textContent.trim() || 'AD';
    const adId = card.querySelector('.ad-id-badge')?.textContent.trim() || '';
    const sponsoredTag = card.querySelector('.ad-sponsored-tag')?.textContent.trim() || 'مشروع استراتيجي مستقل';
    const mediaImg = card.querySelector('.ad-media-img');
    const imgSrc = mediaImg ? mediaImg.getAttribute('src') : '';
    const imgAlt = mediaImg ? mediaImg.getAttribute('alt') : 'Creative Asset';
    const hookText = card.querySelector('.ad-hook-text')?.innerHTML.trim() || '';
    const attrVals = card.querySelectorAll('.ad-attr-val');
    const formatVal = attrVals[0]?.textContent.trim() || 'Static';
    const angleVal = attrVals[1]?.textContent.trim() || '';
    const strategyText = card.querySelector('.ad-strategy-text')?.innerHTML.trim() || '';
    const caseLink = card.querySelector('.ad-case-link')?.getAttribute('href') || '#';

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
    if (modalCaseLink) modalCaseLink.setAttribute('href', caseLink);

    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.creative-modal-close');
    if (closeBtn) closeBtn.focus();
  };

  const closeCreativeModal = () => {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  adCards.forEach(card => {
    const viewButtons = card.querySelectorAll('[data-action="view-creative"]');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCreativeModal(card);
      });
    });
  });

  const backdrop = modal.querySelector('.creative-modal-backdrop');
  const closeBtn = modal.querySelector('.creative-modal-close');

  if (backdrop) backdrop.addEventListener('click', closeCreativeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeCreativeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeCreativeModal();
    }
  });
}

/* ── 10. CLIENT PROOF DETAILED INSPECTOR MODAL ── */
function initClientProofModal() {
  const modal = document.getElementById('client-proof-modal');
  if (!modal) return;

  const openButtons = document.querySelectorAll('[data-action="open-client-proof-modal"]');
  const backdrop = modal.querySelector('.client-modal-backdrop');
  const closeBtn = modal.querySelector('.client-modal-close');

  const openModal = () => {
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}
