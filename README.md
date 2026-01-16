# Projeto Kanté - Consultoria Profissional

Site de consultoria profissional para atletas de futebol com foco em treinamentos de alta performance.

## 📁 Estrutura do Projeto

```
HighPerformance/
├── assets/              # Recursos estáticos
│   ├── images/         # Imagens do projeto
│   └── videos/          # Vídeos do projeto
├── css/                 # Estilos CSS
│   └── styles.css       # Arquivo principal de estilos
├── js/                  # Scripts JavaScript
│   └── main.js          # JavaScript principal
├── docs/                # Documentação
│   └── WORKFLOW.md      # Guia de workflow com branches
├── index.html           # Página principal
├── .gitignore          # Arquivos ignorados pelo Git
└── README.md           # Este arquivo
```

## 🚀 Como Executar Localmente

### Pré-requisitos

* Navegador web moderno (Chrome, Firefox, Safari, Edge)
* Servidor web local (opcional, mas recomendado)

### Opção 1: Abrir Diretamente

1. Navegue até a pasta do projeto
2. Abra o arquivo `index.html` diretamente no navegador
3. O site funcionará, mas algumas funcionalidades podem ter limitações

### Opção 2: Servidor Local (Recomendado)

#### Python (se instalado):

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Node.js (se instalado):

```bash
# Instalar servidor globalmente
npm install -g http-server

# Executar servidor
http-server -p 8000
```

#### PHP (se instalado):

```bash
php -S localhost:8000
```

#### Live Server (VS Code):

1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito no `index.html`
3. Selecione "Open with Live Server"

### Acessar o Site

Após iniciar o servidor, acesse: `http://localhost:8000`

## 🌿 Sistema de Branches

Este projeto utiliza um workflow baseado em branches para manter a organização. Consulte o arquivo [docs/WORKFLOW.md](docs/WORKFLOW.md) para detalhes completos sobre como trabalhar com branches.

### Branches Principais

- **main**: Branch de produção, sempre estável
- **develop**: Branch de desenvolvimento, onde as features são integradas
- **feature/***: Branches para novas funcionalidades

## ✨ Funcionalidades

### 🎨 Tema Dark/Light

* Botão de alternância no header
* Persistência da preferência no localStorage
* Respeita preferência do sistema (prefers-color-scheme)
* Transições suaves entre temas

### 📱 Design Responsivo

* Mobile-first approach
* Breakpoints: Mobile (< 768px), Tablet (768px - 1023px), Desktop (≥ 1024px)
* Menu hamburger em dispositivos móveis

### 🎯 Interações JavaScript

* Menu mobile acessível
* Validação de formulário em tempo real
* Modal de vídeo
* Botão voltar ao topo
* Animações suaves

### ♿ Acessibilidade

* ARIA labels e roles apropriados
* Navegação por teclado completa
* Contraste adequado (AA)
* Foco visível em elementos interativos

## 🛠️ Tecnologias Utilizadas

* HTML5
* CSS3 (com variáveis CSS)
* JavaScript (ES6+)
* Font Awesome (ícones)
* Google Fonts (Poppins)

## 📝 Convenções de Código

* **HTML**: Semântico e acessível
* **CSS**: BEM-like naming, variáveis CSS para temas
* **JavaScript**: ES6+, classes, módulos organizados
* **Commits**: Mensagens descritivas em português

## 📞 Contato

* **WhatsApp**: 11 94571-0976
* **Instagram**: @ferr4ritrainer
* **YouTube**: @Ferr4riyt
* **TikTok**: @ferraritr4ining

## 📄 Licença

© 2025 Projeto Kanté. Todos os direitos reservados. Desenvolvido por André Tres.

---

**Versão**: 2.0.0  
**Última atualização**: Janeiro 2025  
**Compatibilidade**: Navegadores modernos (ES6+)

