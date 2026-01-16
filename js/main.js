/* ========================================
   PROJETO KANTÉ - CONSULTORIA PROFISSIONAL
   JavaScript Principal
   ======================================== */

(function() {
  'use strict';

  /* ========================================
     CONFIGURAÇÕES E CONSTANTES
     ======================================== */
  const STORAGE_KEYS = {
    THEME: 'site-theme',
    FORM_DATA: 'form-data'
  };

  const SELECTORS = {
    // Tema
    themeToggle: '.theme-toggle',
    html: 'html',
    
    // Menu mobile
    menuToggle: '.menu-toggle',
    menu: '.menu',
    
    // Formulário
    form: 'form',
    formInputs: 'input, textarea, select',
    
    // Botão voltar ao topo
    backToTop: '.back-to-top',
    
    // Vídeo
    video: '.video-container',
    videoModal: '.video-modal',
    
    // WhatsApp float
    whatsappFloat: '.whatsapp-float'
  };

  const CLASSES = {
    active: 'active',
    show: 'show',
    loading: 'loading',
    themeTransition: 'theme-transition'
  };

  /* ========================================
     GERENCIAMENTO DE TEMA
     ======================================== */
  class ThemeManager {
    constructor() {
      this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
      this.init();
    }

    init() {
      this.applyTheme(this.currentTheme);
      this.bindEvents();
    }

    getStoredTheme() {
      return localStorage.getItem(STORAGE_KEYS.THEME);
    }

    getSystemTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    applyTheme(theme) {
      const html = document.querySelector(SELECTORS.html);
      const themeToggle = document.querySelector(SELECTORS.themeToggle);
      const icon = themeToggle?.querySelector('i');

      // Aplicar tema
      html.setAttribute('data-theme', theme);
      
      // Atualizar ícone
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }

      // Atualizar aria-pressed
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', theme === 'light');
      }

      // Salvar preferência
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      this.currentTheme = theme;
    }

    toggleTheme() {
      const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      
      // Adicionar classe de transição temporariamente
      const html = document.querySelector(SELECTORS.html);
      html.classList.add(CLASSES.themeTransition);
      
      this.applyTheme(newTheme);
      
      // Remover classe de transição após a transição
      setTimeout(() => {
        html.classList.remove(CLASSES.themeTransition);
      }, 300);
    }

    bindEvents() {
      const themeToggle = document.querySelector(SELECTORS.themeToggle);
      if (themeToggle) {
        themeToggle.addEventListener('click', () => this.toggleTheme());
      }

      // Escutar mudanças no sistema
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!this.getStoredTheme()) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  /* ========================================
     MENU MOBILE
     ======================================== */
  class MobileMenu {
    constructor() {
      this.menuToggle = document.querySelector(SELECTORS.menuToggle);
      this.menu = document.querySelector(SELECTORS.menu);
      this.isOpen = false;
      this.init();
    }

    init() {
      this.bindEvents();
    }

    toggle() {
      this.isOpen = !this.isOpen;
      
      this.menu.classList.toggle(CLASSES.active, this.isOpen);
      this.menuToggle.setAttribute('aria-expanded', this.isOpen);
      
      // Atualizar ícone
      const icon = this.menuToggle.querySelector('i');
      if (icon) {
        icon.className = this.isOpen ? 'fas fa-times' : 'fas fa-bars';
      }

      // Prevenir scroll do body quando menu estiver aberto
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }

    close() {
      if (this.isOpen) {
        this.toggle();
      }
    }

    bindEvents() {
      if (this.menuToggle) {
        this.menuToggle.addEventListener('click', () => this.toggle());
      }

      // Fechar menu ao clicar em links
      const menuLinks = this.menu?.querySelectorAll('a');
      menuLinks?.forEach(link => {
        link.addEventListener('click', () => this.close());
      });

      // Fechar menu ao clicar fora
      document.addEventListener('click', (e) => {
        if (this.isOpen && !this.menu.contains(e.target) && !this.menuToggle.contains(e.target)) {
          this.close();
        }
      });

      // Fechar menu com ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }
  }

  /* ========================================
     VALIDAÇÃO DE FORMULÁRIO
     ======================================== */
  class FormValidator {
    constructor() {
      this.form = document.querySelector(SELECTORS.form);
      this.init();
    }

    init() {
      if (this.form) {
        this.bindEvents();
        this.setupPhoneMask();
      }
    }

    setupPhoneMask() {
      const phoneInputs = this.form?.querySelectorAll('input[type="tel"]');
      phoneInputs?.forEach(input => {
        input.addEventListener('input', (e) => this.formatPhone(e.target));
      });
    }

    formatPhone(input) {
      let value = input.value.replace(/\D/g, '');
      
      if (value.length <= 11) {
        if (value.length <= 2) {
          value = value;
        } else if (value.length <= 7) {
          value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
          value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        }
      }
      
      input.value = value;
    }

    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    validatePhone(phone) {
      const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
      return phoneRegex.test(phone);
    }

    validateField(field) {
      const value = field.value.trim();
      const type = field.type;
      const required = field.hasAttribute('required');
      
      let isValid = true;
      let message = '';

      if (required && !value) {
        isValid = false;
        message = 'Este campo é obrigatório.';
      } else if (value) {
        switch (type) {
          case 'email':
            if (!this.validateEmail(value)) {
              isValid = false;
              message = 'Por favor, insira um e-mail válido.';
            }
            break;
          case 'tel':
            if (!this.validatePhone(value)) {
              isValid = false;
              message = 'Por favor, insira um telefone válido.';
            }
            break;
        }
      }

      this.showFieldError(field, isValid, message);
      return isValid;
    }

    showFieldError(field, isValid, message) {
      const errorElement = field.parentNode.querySelector('.field-error');
      
      if (errorElement) {
        errorElement.remove();
      }

      if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        field.parentNode.appendChild(errorDiv);
      } else {
        field.classList.remove('error');
      }
    }

    validateForm() {
      const fields = this.form.querySelectorAll('input[required], textarea[required]');
      let isFormValid = true;

      fields.forEach(field => {
        if (!this.validateField(field)) {
          isFormValid = false;
        }
      });

      return isFormValid;
    }

    async submitForm(formData) {
      try {
        // Simular envio para backend
        const response = await fetch('/backend/processa_contato.php', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          this.showSuccessMessage();
          this.form.reset();
        } else {
          throw new Error('Erro no servidor');
        }
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        this.showErrorMessage();
      }
    }

    showSuccessMessage() {
      this.showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    }

    showErrorMessage() {
      this.showMessage('Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.', 'error');
    }

    showMessage(text, type) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `form-message form-message--${type}`;
      messageDiv.textContent = text;
      messageDiv.setAttribute('role', 'alert');
      messageDiv.setAttribute('aria-live', 'polite');

      // Inserir mensagem após o formulário
      this.form.parentNode.insertBefore(messageDiv, this.form.nextSibling);

      // Remover mensagem após 5 segundos
      setTimeout(() => {
        messageDiv.remove();
      }, 5000);
    }

    bindEvents() {
      // Validação em tempo real
      const fields = this.form.querySelectorAll('input, textarea');
      fields.forEach(field => {
        field.addEventListener('blur', () => this.validateField(field));
        field.addEventListener('input', () => {
          if (field.classList.contains('error')) {
            this.validateField(field);
          }
        });
      });

      // Submissão do formulário
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (this.validateForm()) {
          const formData = new FormData(this.form);
          this.submitForm(formData);
        }
      });
    }
  }

  /* ========================================
     BOTÃO VOLTAR AO TOPO
     ======================================== */
  class BackToTop {
    constructor() {
      this.button = document.querySelector(SELECTORS.backToTop);
      this.init();
    }

    init() {
      if (this.button) {
        this.bindEvents();
        this.handleScroll();
      }
    }

    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const shouldShow = scrollTop > 300;

      if (shouldShow) {
        this.button.style.display = 'flex';
        this.button.classList.add(CLASSES.show);
      } else {
        this.button.style.display = 'none';
        this.button.classList.remove(CLASSES.show);
      }
    }

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    bindEvents() {
      this.button.addEventListener('click', () => this.scrollToTop());
      
      // Debounce scroll event
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => this.handleScroll(), 10);
      });
    }
  }

  /* ========================================
     MODAL DE VÍDEO
     ======================================== */
  class VideoModal {
    constructor() {
      this.video = document.querySelector(SELECTORS.video);
      this.modal = null;
      this.init();
    }

    init() {
      if (this.video) {
        this.createModal();
        this.bindEvents();
      }
    }

    createModal() {
      this.modal = document.createElement('div');
      this.modal.className = 'video-modal';
      this.modal.innerHTML = `
        <div class="video-modal__overlay">
          <div class="video-modal__content">
            <button class="video-modal__close" aria-label="Fechar vídeo">
              <i class="fas fa-times"></i>
            </button>
            <div class="video-modal__video">
              ${this.video.outerHTML}
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(this.modal);
    }

    open() {
      this.modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Focar no botão de fechar
      const closeButton = this.modal.querySelector('.video-modal__close');
      closeButton.focus();
      
      // Reproduzir vídeo
      const video = this.modal.querySelector('video');
      if (video) {
        video.play();
      }
    }

    close() {
      this.modal.style.display = 'none';
      document.body.style.overflow = '';
      
      // Pausar vídeo
      const video = this.modal.querySelector('video');
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }

    bindEvents() {
      // Abrir modal ao clicar no vídeo
      this.video.addEventListener('click', () => this.open());
      
      // Fechar modal
      const closeButton = this.modal.querySelector('.video-modal__close');
      const overlay = this.modal.querySelector('.video-modal__overlay');
      
      closeButton.addEventListener('click', () => this.close());
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.close();
        }
      });
      
      // Fechar com ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.style.display === 'flex') {
          this.close();
        }
      });
    }
  }

  /* ========================================
     ANIMAÇÕES E INTERAÇÕES
     ======================================== */
  class Animations {
    constructor() {
      this.init();
    }

    init() {
      this.setupScrollAnimations();
      this.setupHoverEffects();
    }

    setupScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
          }
        });
      }, observerOptions);

      // Observar elementos para animação
      const elementsToAnimate = document.querySelectorAll('.bloco, .valor, .faq-item');
      elementsToAnimate.forEach(el => observer.observe(el));
    }

    setupHoverEffects() {
      // Efeito de hover agora é gerenciado via CSS para consistência
      // Mantido vazio para compatibilidade futura se necessário
    }
  }

  /* ========================================
     LAZY LOADING
     ======================================== */
  class LazyLoader {
    constructor() {
      this.init();
    }

    init() {
      if ('IntersectionObserver' in window) {
        this.setupLazyLoading();
      } else {
        // Fallback para navegadores sem suporte
        this.loadAllImages();
      }
    }

    setupLazyLoading() {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      lazyImages.forEach(img => imageObserver.observe(img));
    }

    loadAllImages() {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.src = img.dataset.src || img.src;
      });
    }
  }

  /* ========================================
     INICIALIZAÇÃO PRINCIPAL
     ======================================== */
  class App {
    constructor() {
      this.init();
    }

    init() {
      // Aguardar DOM estar pronto
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initializeModules());
      } else {
        this.initializeModules();
      }
    }

    initializeModules() {
      try {
        // Inicializar módulos
        new ThemeManager();
        new MobileMenu();
        new FormValidator();
        new BackToTop();
        new VideoModal();
        new Animations();
        new LazyLoader();
        
        console.log('✅ Projeto Kanté - Todos os módulos inicializados com sucesso!');
      } catch (error) {
        console.error('❌ Erro ao inicializar módulos:', error);
      }
    }
  }

  /* ========================================
     ESTILOS CSS PARA MODAL E MENSAGENS
     ======================================== */
  const additionalStyles = `
    /* Modal de vídeo */
    .video-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2000;
      align-items: center;
      justify-content: center;
    }

    .video-modal__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(5px);
    }

    .video-modal__content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      background-color: var(--bg-card);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }

    .video-modal__close {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: background-color var(--transition-fast);
    }

    .video-modal__close:hover {
      background-color: rgba(0, 0, 0, 0.9);
    }

    .video-modal__video {
      width: 100%;
      height: auto;
    }

    .video-modal__video video {
      width: 100%;
      height: auto;
      display: block;
    }

    /* Mensagens de formulário */
    .form-message {
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      margin: var(--spacing-md) 0;
      font-weight: 500;
    }

    .form-message--success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .form-message--error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    /* Erros de campo */
    .field-error {
      color: #dc3545;
      font-size: var(--font-size-sm);
      margin-top: var(--spacing-xs);
      display: block;
    }

    input.error,
    textarea.error {
      border-color: #dc3545;
      box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
    }

    /* Responsividade do modal */
    @media (max-width: 768px) {
      .video-modal__content {
        max-width: 95vw;
        max-height: 95vh;
        margin: var(--spacing-sm);
      }
      
      .video-modal__close {
        top: 5px;
        right: 5px;
        width: 35px;
        height: 35px;
      }
    }
  `;

  // Injetar estilos adicionais
  const styleSheet = document.createElement('style');
  styleSheet.textContent = additionalStyles;
  document.head.appendChild(styleSheet);

  // Inicializar aplicação
  new App();

})();
