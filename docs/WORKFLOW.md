# Workflow de Desenvolvimento - Projeto Kanté

Este documento descreve o workflow de desenvolvimento utilizando branches para manter uma organização eficiente do projeto.

## 🌿 Estrutura de Branches

### Branches Principais

#### `main`
- **Propósito**: Branch de produção
- **Status**: Sempre estável e pronto para deploy
- **Proteção**: Não deve receber commits diretos
- **Merge**: Apenas via Pull Request de `develop`

#### `develop`
- **Propósito**: Branch de desenvolvimento principal
- **Status**: Integração de features antes de produção
- **Merge**: Recebe merges de `feature/*` branches
- **Deploy**: Pode ser usado para ambiente de staging

#### `feature/*`
- **Propósito**: Desenvolvimento de novas funcionalidades
- **Nomenclatura**: `feature/nome-da-funcionalidade`
- **Exemplos**: 
  - `feature/dark-mode`
  - `feature/form-validation`
  - `feature/video-modal`
- **Merge**: Deve ser mergeado em `develop`

## 📋 Fluxo de Trabalho

### 1. Criando uma Nova Feature

```bash
# 1. Certifique-se de estar na branch develop e atualizada
git checkout develop
git pull origin develop

# 2. Crie uma nova branch feature
git checkout -b feature/nome-da-funcionalidade

# 3. Desenvolva sua funcionalidade
# ... faça suas alterações ...

# 4. Commit suas mudanças
git add .
git commit -m "feat: adiciona nova funcionalidade X"

# 5. Push da branch
git push origin feature/nome-da-funcionalidade
```

### 2. Finalizando uma Feature

```bash
# 1. Certifique-se de que todos os commits estão feitos
git status

# 2. Atualize a branch develop localmente
git checkout develop
git pull origin develop

# 3. Merge sua feature em develop
git merge feature/nome-da-funcionalidade

# 4. Resolva conflitos se houver
# ... resolva conflitos ...

# 5. Push para develop
git push origin develop

# 6. Delete a branch feature local (opcional)
git branch -d feature/nome-da-funcionalidade

# 7. Delete a branch feature remota (opcional)
git push origin --delete feature/nome-da-funcionalidade
```

### 3. Deploy para Produção

```bash
# 1. Certifique-se de que develop está estável
git checkout develop
git pull origin develop

# 2. Merge develop em main
git checkout main
git pull origin main
git merge develop

# 3. Push para produção
git push origin main

# 4. Crie uma tag de versão (opcional)
git tag -a v2.0.0 -m "Versão 2.0.0 - Nova estrutura organizada"
git push origin v2.0.0
```

## 📝 Convenções de Commits

Utilize mensagens de commit descritivas seguindo o padrão:

```
tipo: descrição curta

Descrição mais detalhada (opcional)
```

### Tipos de Commit

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, espaços, etc (não afeta código)
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Tarefas de manutenção, build, etc

### Exemplos

```bash
git commit -m "feat: adiciona validação de formulário em tempo real"
git commit -m "fix: corrige menu mobile não fechando ao clicar em link"
git commit -m "docs: atualiza README com instruções de instalação"
git commit -m "refactor: reorganiza estrutura de pastas do projeto"
```

## 🔄 Resolvendo Conflitos

### Quando Ocorrem Conflitos

Conflitos podem ocorrer quando:
- Múltiplas pessoas trabalham no mesmo arquivo
- Uma branch feature está desatualizada em relação a develop

### Como Resolver

```bash
# 1. Atualize sua branch feature com develop
git checkout feature/nome-da-funcionalidade
git fetch origin
git merge origin/develop

# 2. Resolva os conflitos manualmente nos arquivos
# ... edite os arquivos com conflitos ...

# 3. Adicione os arquivos resolvidos
git add arquivo-resolvido.html

# 4. Complete o merge
git commit -m "merge: resolve conflitos com develop"
```

## 🚨 Boas Práticas

### ✅ Faça

- Sempre crie uma branch feature a partir de `develop`
- Mantenha suas branches atualizadas com `develop`
- Faça commits frequentes e descritivos
- Teste suas alterações antes de fazer merge
- Delete branches feature após merge (quando não precisar mais)
- Use Pull Requests para revisão de código (recomendado)

### ❌ Evite

- Commits diretos em `main` ou `develop`
- Branches feature muito grandes (divida em features menores)
- Commits com mensagens genéricas como "fix" ou "update"
- Merge de branches desatualizadas sem atualizar primeiro
- Deixar branches feature órfãs no repositório

## 📊 Exemplo de Fluxo Completo

```bash
# Cenário: Adicionar nova seção de depoimentos

# 1. Atualizar develop
git checkout develop
git pull origin develop

# 2. Criar branch feature
git checkout -b feature/depoimentos

# 3. Desenvolver
# ... criar HTML, CSS, JS para depoimentos ...

# 4. Commits
git add index.html css/styles.css js/main.js
git commit -m "feat: adiciona seção de depoimentos no HTML"
git commit -m "style: adiciona estilos para cards de depoimentos"
git commit -m "feat: implementa carrossel de depoimentos em JS"

# 5. Push
git push origin feature/depoimentos

# 6. Merge em develop (após revisão/testes)
git checkout develop
git merge feature/depoimentos
git push origin develop

# 7. Limpeza
git branch -d feature/depoimentos
git push origin --delete feature/depoimentos
```

## 🔍 Comandos Úteis

```bash
# Ver todas as branches
git branch -a

# Ver branches remotas
git branch -r

# Verificar status
git status

# Ver histórico de commits
git log --oneline --graph --all

# Ver diferenças entre branches
git diff develop..feature/nome-da-funcionalidade

# Renomear branch atual
git branch -m novo-nome

# Verificar qual branch está rastreando
git branch -vv
```

## 📚 Recursos Adicionais

- [Git Branching Strategies](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

---

**Última atualização**: Janeiro 2025

