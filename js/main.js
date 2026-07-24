/**
 * Ganemos.net - Main Interactive JavaScript (BetF4 Layout Adaptation)
 * Handles Header Scroll, Mobile Menu, Games Category Filter, FAQ Accordion, Download Modal & QR
 */

// ==========================================
// CONFIGURACIÓN DE URLS Y ARCHIVOS
// ==========================================
const CONFIG = {
  // Enlace al Panel Administrativo
  ADMIN_URL: 'http://admin.ganemos.net',

  // Enlace a Taquilla / POS Web
  TAQUILLA_URL: 'http://taquilla.ganemos.net',

  // Enlace de Contacto WhatsApp para Solicitud de Demos
  DEMO_WHATSAPP: 'https://wa.me/584120000000?text=Hola,%20deseo%20solicitar%20una%20demo%20de%20Ganemos.net',

  // Rutas relativas o URLs directas a los ejecutables
  WINDOWS_EXE_PATH: 'downloads/GanemosDesktop_Installer.exe',
  ANDROID_APK_PATH: 'downloads/GanemosMobile_App.apk'
};

document.addEventListener('DOMContentLoaded', () => {
  initConfigLinks();
  initHeaderScroll();
  initMobileMenu();
  initGamesFilter();
  initFaqAccordion();
  initDownloadModal();
  generateApkQRCode();
});

/* Configurar Enlaces de la Aplicación */
function initConfigLinks() {
  // Enlaces de Acceso Administrativo
  document.querySelectorAll('.admin-link-target').forEach(el => {
    el.setAttribute('href', CONFIG.ADMIN_URL);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // Enlaces de Ir a Taquilla
  document.querySelectorAll('.taquilla-link-target').forEach(el => {
    el.setAttribute('href', CONFIG.TAQUILLA_URL);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // Enlaces de Solicitud de Demo / WhatsApp
  document.querySelectorAll('.demo-link-target').forEach(el => {
    el.setAttribute('href', CONFIG.DEMO_WHATSAPP);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

/* Header Scroll Effect */
function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* Mobile Dropdown Menu Toggle */
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');

    const icon = mobileToggle.querySelector('i');
    if (icon) {
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  function closeMobileMenu() {
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
    const icon = mobileToggle.querySelector('i');
    if (icon) {
      icon.className = 'fa-solid fa-bars';
    }
  }
}

/* Games / Lotteries Category Filter */
function initGamesFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const gameCards = document.querySelectorAll('.game-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      gameCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || category === cardCat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* FAQ Accordion Toggle */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Cerrar otros abiertos
      faqItems.forEach(i => i.classList.remove('active'));

      // Abrir el actual si no estaba abierto
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* Download Modal Logic */
function initDownloadModal() {
  const modalOverlay = document.getElementById('downloadModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const progressBar = document.getElementById('modalProgressBar');
  const downloadBtns = document.querySelectorAll('[data-download-type]');

  if (!modalOverlay) return;

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-download-type'); // 'windows' or 'android'
      openModal(type);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  function openModal(type) {
    modalOverlay.classList.add('active');
    progressBar.style.width = '0%';

    if (type === 'windows') {
      modalTitle.textContent = 'Iniciando descarga para Windows';
      modalText.textContent = 'Tu instalador de Ganemos Desktop (.exe) se está descargando. Abre el ejecutable una vez completado.';
    } else {
      modalTitle.textContent = 'Iniciando descarga APK Android';
      modalText.textContent = 'Descargando la aplicación (.apk) para celulares Android. Recuerda permitir instalaciones de fuentes desconocidas si tu dispositivo lo requiere.';
    }

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 25) + 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          triggerActualDownload(type);
        }, 350);
      }
      progressBar.style.width = `${progress}%`;
    }, 180);
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
  }

  function triggerActualDownload(type) {
    const fileUrl = type === 'windows' ? CONFIG.WINDOWS_EXE_PATH : CONFIG.ANDROID_APK_PATH;
    const fileName = type === 'windows' ? 'GanemosDesktop_Installer.exe' : 'GanemosMobile_App.apk';

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/* Lightweight Vector QR Code Generator for APK */
function generateApkQRCode() {
  const qrContainer = document.getElementById('qrCodeBox');
  if (!qrContainer) return;

  const svgQR = `
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#ffffff" />
      <path d="M 5 5 h 30 v 30 h -30 z M 10 10 v 20 h 20 v -20 z" fill="#08080b"/>
      <rect x="15" y="15" width="10" height="10" fill="#ff6a00"/>

      <path d="M 65 5 h 30 v 30 h -30 z M 70 10 v 20 h 20 v -20 z" fill="#08080b"/>
      <rect x="75" y="15" width="10" height="10" fill="#ff6a00"/>

      <path d="M 5 65 h 30 v 30 h -30 z M 10 70 v 20 h 20 v -20 z" fill="#08080b"/>
      <rect x="15" y="75" width="10" height="10" fill="#ff6a00"/>

      <rect x="40" y="8" width="6" height="6" fill="#08080b"/>
      <rect x="50" y="8" width="6" height="6" fill="#08080b"/>
      <rect x="45" y="18" width="6" height="6" fill="#ff2a2a"/>
      <rect x="55" y="24" width="6" height="6" fill="#08080b"/>
      <rect x="40" y="30" width="6" height="6" fill="#08080b"/>
      <rect x="10" y="42" width="6" height="6" fill="#08080b"/>
      <rect x="22" y="42" width="6" height="6" fill="#08080b"/>
      <rect x="34" y="42" width="6" height="6" fill="#ff2a2a"/>
      <rect x="46" y="42" width="6" height="6" fill="#08080b"/>
      <rect x="58" y="42" width="6" height="6" fill="#08080b"/>
      <rect x="70" y="42" width="6" height="6" fill="#ff2a2a"/>
      <rect x="82" y="42" width="6" height="6" fill="#08080b"/>

      <rect x="10" y="54" width="6" height="6" fill="#ff6a00"/>
      <rect x="25" y="54" width="6" height="6" fill="#08080b"/>
      <rect x="40" y="54" width="6" height="6" fill="#08080b"/>
      <rect x="55" y="54" width="6" height="6" fill="#08080b"/>
      <rect x="70" y="54" width="6" height="6" fill="#08080b"/>
      <rect x="85" y="54" width="6" height="6" fill="#ff6a00"/>

      <rect x="45" y="65" width="6" height="6" fill="#08080b"/>
      <rect x="55" y="65" width="6" height="6" fill="#ff2a2a"/>
      <rect x="65" y="65" width="6" height="6" fill="#08080b"/>
      <rect x="80" y="65" width="6" height="6" fill="#08080b"/>

      <rect x="45" y="78" width="6" height="6" fill="#08080b"/>
      <rect x="60" y="78" width="6" height="6" fill="#08080b"/>
      <rect x="75" y="78" width="6" height="6" fill="#ff6a00"/>
      <rect x="85" y="85" width="6" height="6" fill="#08080b"/>
    </svg>
  `;
  qrContainer.innerHTML = svgQR;
}
