# Projeto Kanté - Consultoria Profissional

Site de consultoria profissional para atletas de futebol com foco em treinamentos de alta performance.

## 🚀 Como Testar Localmente

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, mas recomendado)

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

## 📁 Estrutura do Projeto

```
projeto-kante/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos principais
├── js/
│   └── main.js         # JavaScript principal
├── videos/
│   └── Salto.mp4       # Vídeo demonstrativo
├── perfil.jpg          # Foto do mentor
├── valor1.png          # Imagem preço presencial
├── valor2.png          # Imagem preço online
├── carro.jpg           # Imagem da seção potencial
└── README.md           # Este arquivo
```

## ✨ Funcionalidades Implementadas

### 🎨 Tema Dark/Light
- **Botão de alternância** no header
- **Persistência** da preferência no localStorage
- **Respeita** preferência do sistema (prefers-color-scheme)
- **Transições suaves** entre temas
- **Paleta de cores**:
  - Tema escuro: Fundo #0B0B0D, Superfícies #121214/#1A1A1D
  - Tema claro: Fundo #FFFFFF, Superfícies #F8F9FA/#E9ECEF
  - Cor marcante: #0A66C2 (azul)

### 📱 Design Responsivo
- **Mobile-first** approach
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1023px
  - Desktop: ≥ 1024px
- **Menu hamburger** em dispositivos móveis
- **Grid responsivo** para cards e seções

### 🎯 Interações JavaScript

#### Menu Mobile
- Menu hamburger acessível
- Fecha com ESC ou clique fora
- Navegação suave entre seções

#### Validação de Formulário
- **Validação em tempo real** para campos obrigatórios
- **Máscara automática** para telefone brasileiro: (00) 00000-0000
- **Validação de e-mail** com regex
- **Mensagens de erro** acessíveis
- **Envio via fetch()** com fallback para formulário normal

#### Modal de Vídeo
- **Clique no vídeo** abre modal
- **Controles de acessibilidade** (ESC, foco)
- **Lazy loading** do vídeo
- **Fallback** se vídeo não carregar

#### Botão Voltar ao Topo
- **Aparece** após rolar 300px
- **Scroll suave** para o topo
- **Posicionamento responsivo**

### ♿ Acessibilidade
- **ARIA labels** e roles apropriados
- **Navegação por teclado** completa
- **Contraste** adequado (AA)
- **Foco visível** em elementos interativos
- **Respeita** prefers-reduced-motion
- **Screen reader** friendly

### 🎭 Animações e Micro-interações
- **Hover effects** suaves em cards
- **Animações de entrada** (fade-in-up)
- **Transições** em botões e links
- **Loading states** para formulários

## 🧪 Testes de Aceitação

### ✅ Checklist de Funcionalidades

#### Tema Dark/Light
- [ ] Botão alterna entre temas
- [ ] Preferência persiste após reload
- [ ] Respeita preferência do sistema
- [ ] Transições suaves sem piscar

#### Responsividade
- [ ] Layout funciona em 375px (mobile)
- [ ] Layout funciona em 768px (tablet)
- [ ] Layout funciona em 1024px (desktop)
- [ ] Menu hamburger funciona em mobile
- [ ] Imagens são responsivas

#### Formulário
- [ ] Validação de campos obrigatórios
- [ ] Máscara de telefone funciona
- [ ] Validação de e-mail funciona
- [ ] Mensagens de erro aparecem
- [ ] Envio mostra confirmação

#### Vídeo
- [ ] Vídeo carrega corretamente
- [ ] Modal abre ao clicar
- [ ] Modal fecha com ESC
- [ ] Controles de acessibilidade funcionam

#### Navegação
- [ ] Links internos funcionam
- [ ] Botão voltar ao topo aparece
- [ ] Scroll suave funciona
- [ ] Menu mobile navega corretamente

### 🎨 Teste de Contraste
- [ ] Títulos azuis (#0A66C2) legíveis sobre fundo escuro
- [ ] Texto secundário legível
- [ ] Botões com contraste adequado
- [ ] Links visíveis e distinguíveis

## 🛠️ Personalização

### Cores
Para alterar as cores, edite as variáveis CSS em `css/styles.css`:

```css
:root {
  --bg-primary: #0B0B0D;        /* Fundo principal */
  --accent-primary: #0A66C2;    /* Cor marcante */
  --text-primary: #FFFFFF;      /* Texto principal */
  /* ... outras variáveis */
}
```

### Tipografia
Para alterar a fonte, modifique:

```css
:root {
  --font-family: 'Poppins', sans-serif;
}
```

E atualize o link no HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=NovaFonte:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Conteúdo
- **Textos**: Edite diretamente no `index.html`
- **Imagens**: Substitua os arquivos mantendo os nomes
- **Vídeo**: Substitua `videos/Salto.mp4`
- **Links**: Atualize URLs nos links do footer

## 🐛 Solução de Problemas

### Vídeo não carrega
- Verifique se o arquivo `videos/Salto.mp4` existe
- Teste em servidor local (não funciona com file://)
- Verifique formato do vídeo (MP4 recomendado)

### Tema não persiste
- Verifique se localStorage está habilitado
- Teste em modo privado/incógnito
- Limpe cache do navegador

### Menu mobile não funciona
- Verifique se JavaScript está habilitado
- Teste em dispositivo real, não apenas DevTools
- Verifique console para erros

### Formulário não valida
- Verifique se todos os campos têm atributo `required`
- Teste validação de e-mail com formato correto
- Verifique console para erros JavaScript

## 📞 Suporte

Para dúvidas ou problemas:
- **WhatsApp**: [11 94571-0976](https://wa.me/5511945710976)
- **Instagram**: [@ferr4riyt](https://www.instagram.com/ferr4riyt/)
- **YouTube**: [@Ferr4riyt](https://www.youtube.com/@Ferr4riyt)

## 📄 Licença

© 2025 Projeto Kanté. Todos os direitos reservados.
Desenvolvido por André Tres.

---

**Versão**: 1.0.0  
**Última atualização**: Janeiro 2025  
**Compatibilidade**: Navegadores modernos (ES6+)
