// 1. Fade-in Animation ao entrar na tela
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

fadeElements.forEach(el => observer.observe(el));

// 2. Menu Responsivo (abre e fecha no mobile)
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  const isExpanded = menu.classList.contains('active');
  menu.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', !isExpanded);
});

// 3. Fechar o menu ao clicar em um link (mobile UX)
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// 4. Tema Claro/Escuro com memória em localStorage
const themeToggle = document.querySelector('.theme-toggle');
const icon = themeToggle.querySelector('i');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (localStorage.getItem('theme') === 'light' || (!localStorage.getItem('theme') && !prefersDark)) {
  document.body.classList.add('light-mode');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
  themeToggle.setAttribute('aria-pressed', 'true');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  icon.classList.toggle('fa-sun', isLight);
  icon.classList.toggle('fa-moon', !isLight);
  themeToggle.setAttribute('aria-pressed', isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// 5. Scroll otimizado com debounce: ativa menu e esconde/mostra header
const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.menu a');
const header = document.querySelector('header');

let lastScrollY = window.scrollY;
let scrollTimeout;

function handleScroll() {
  const scrollY = window.pageYOffset;

  // 5.1 Atualiza link ativo no menu
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // 5.2 Esconde header ao descer e mostra ao subir
  if (scrollY > lastScrollY && scrollY > 150) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScrollY = scrollY;
}

// 5.3 Listener com debounce para rolagem
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(handleScroll, 100);
});