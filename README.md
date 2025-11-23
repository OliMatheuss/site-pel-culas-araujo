# 🎬 Películas Araujo – Website Profissional

> Um site moderno e responsivo para apresentação de serviços de películas automotivas e prediais.

[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![Versão](https://img.shields.io/badge/Versão-0.1.0-green)](package.json)

---

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
- [API](#api)
- [Desenvolvimento](#desenvolvimento)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## 🎯 Visão Geral

**Películas Araujo** é um site profissional que apresenta serviços de instalação de:
- ✅ Películas automotivas (insulfilm)
- ✅ Películas prediais/comerciais
- ✅ Proteção solar e privacidade

### Principais Recursos

- 🌐 **Frontend Responsivo**: HTML5, CSS3, JavaScript vanilla
- 🔌 **API REST**: Backend em Flask com endpoints para orçamentos
- 📱 **Mobile First**: Design otimizado para todos os dispositivos
- 💾 **Armazenamento JSON**: Orçamentos persistidos localmente
- 🔄 **CORS Habilitado**: Comunicação frontend-backend facilitada

---

## 📁 Estrutura do Projeto

```
site-peliculas-araujo/
├── backend/                      # Aplicação Flask (Python)
│   ├── app/
│   │   ├── __init__.py          # Factory function da app
│   │   └── routes.py            # Endpoints da API
│   ├── run.py                   # Arquivo de entrada
│   ├── requirements.txt          # Dependências Python
│   └── .env.example             # Variáveis de ambiente
│
├── public/                       # Arquivos estáticos servidos
│   ├── index.html               # Página principal
│   └── assets/
│       ├── css/
│       │   └── main.css         # Estilos compilados
│       └── js/
│           └── main.js          # Scripts compilados
│
├── src/                         # Código fonte (para bundler)
│   ├── components/              # Componentes reutilizáveis
│   ├── scripts/
│   │   └── main.js              # Código fonte JS
│   └── styles/
│       └── main.css             # Código fonte CSS
│
├── data/                        # Arquivos de dados
│   ├── movies.json              # Catálogo de películas
│   └── orcamentos.json          # Orçamentos recebidos
│
├── tests/                       # Testes automatizados
│   └── README.md
│
├── package.json                 # Metadados e scripts npm
├── README.md                    # Este arquivo
└── .gitignore                   # Arquivos ignorados no Git
```

### Descrição das Pastas

| Pasta | Descrição |
|-------|-----------|
| `backend/` | Servidor Flask com API REST |
| `public/` | Arquivos estáticos finais (servidos ao cliente) |
| `src/` | Código fonte para processamento com bundler |
| `data/` | Arquivos JSON de dados (catálogo, orçamentos) |
| `tests/` | Testes e validações |

---

## 📦 Requisitos

### Frontend
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Node.js 16+ (opcional, apenas para servidor local)

### Backend
- Python 3.8+
- pip (gerenciador de pacotes Python)

### Dependências

**Python:**
```
Flask==3.0.1
Flask-Cors==4.0.0
python-dotenv==1.0.0
gunicorn==21.2.0
```

**Node.js (opcional):**
```json
"dependencies": {
  "npx serve": "para servir arquivos estáticos"
}
```

---

## ⚙️ Instalação

### 1️⃣ Clonar o Repositório

```powershell
git clone https://github.com/seu-usuario/site-peliculas-araujo.git
cd site-peliculas-araujo
```

### 2️⃣ Configurar Backend (Python)

#### Criar ambiente virtual
```powershell
# Windows PowerShell
python -m venv backend/.venv
backend\.venv\Scripts\Activate.ps1

# Ou usar npm script (se instalado)
npm run backend:install
```

#### Instalar dependências
```powershell
pip install -r backend/requirements.txt
```

#### Configurar variáveis de ambiente
```powershell
# Copiar arquivo de exemplo
Copy-Item backend/.env.example backend/.env

# Editar backend/.env conforme necessário
```

### 3️⃣ Instalar Frontend (Node.js - opcional)

```powershell
npm install
```

---

## 🚀 Uso

### Opção A: Servidor Frontend Local

```powershell
# Usando npm serve (requer Node.js)
npm start

# Ou manualmente
npx serve public
```

A aplicação estará disponível em `http://localhost:3000`

### Opção B: Abrir Frontend Localmente

Simplesmente abra o arquivo `public/index.html` em seu navegador.

### Opção C: Backend Flask

```powershell
# Com ambiente virtual ativado
python backend/run.py

# Ou usando npm
npm run backend:start
```

O backend estará disponível em `http://localhost:5000`

---

## 🔌 API

### Endpoints Disponíveis

#### Health Check
```
GET /api/health
```

**Resposta (200):**
```json
{
  "status": "ok"
}
```

---

#### Criar Orçamento
```
POST /api/orcamento
Content-Type: application/json
```

**Body:**
```json
{
  "nome": "João Silva",
  "telefone": "(11) 99999-9999",
  "tipo": "automotivo",
  "mensagem": "Gostaria de um orçamento para meu carro"
}
```

**Resposta (201):**
```json
{
  "status": "success",
  "message": "Orçamento recebido",
  "data": {
    "id": 1,
    "nome": "João Silva",
    "telefone": "(11) 99999-9999",
    "tipo": "automotivo",
    "mensagem": "Gostaria de um orçamento para meu carro",
    "created_at": "2025-11-23T10:30:45.123456Z"
  }
}
```

**Erros:**
- **400**: Campos obrigatórios faltando
- **500**: Erro ao gravar os dados

---

#### Listar Orçamentos
```
GET /api/orcamentos
```

**Resposta (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "nome": "João Silva",
      "telefone": "(11) 99999-9999",
      "tipo": "automotivo",
      "mensagem": "Gostaria de um orçamento",
      "created_at": "2025-11-23T10:30:45.123456Z"
    }
  ]
}
```

---

## 💻 Desenvolvimento

### Estrutura de Arquivos de Código

```
📄 src/
├── 📄 scripts/main.js      # Fonte JS (para bundler)
├── 📄 styles/main.css      # Fonte CSS (para bundler)
└── 📁 components/          # Componentes reutilizáveis

📄 public/
├── 📄 index.html           # Página HTML final
└── 📁 assets/
    ├── 📁 js/
    │   └── 📄 main.js      # JS compilado
    └── 📁 css/
        └── 📄 main.css     # CSS compilado
```

### Padrões de Código

#### Python (Backend)
- ✅ Docstrings em todas as funções
- ✅ Type hints quando possível
- ✅ Nomes descritivos em snake_case
- ✅ Comentários explicativos

#### JavaScript (Frontend)
- ✅ JSDoc comments
- ✅ Nomes em camelCase
- ✅ Comentários em português
- ✅ Funções puras quando possível

#### CSS
- ✅ Comentários descritivos
- ✅ Variáveis CSS para cores e dimensões
- ✅ Mobile-first approach
- ✅ BEM naming convention (quando aplicável)

### Comandos Úteis

```powershell
# Frontend - Iniciar servidor
npm start

# Frontend - Build (quando configurado)
npm run build

# Backend - Instalar dependências
npm run backend:install

# Backend - Iniciar servidor
npm run backend:start
```

### Próximas Melhorias

- [ ] Migrar para React + Vite
- [ ] Adicionar banco de dados (PostgreSQL/MongoDB)
- [ ] Configurar CI/CD com GitHub Actions
- [ ] Adicionar autenticação de admin
- [ ] Implementar envio de emails
- [ ] Testes automatizados (Jest, Pytest)
- [ ] Documentação com Swagger/OpenAPI
- [ ] Dashboard administrativo

---

## 👥 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes
- Mantenha o código comentado
- Siga os padrões de nomenclatura
- Escreva testes quando possível
- Atualize a documentação

---

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 📧 Contato

Para dúvidas ou sugestões sobre o projeto:

- **Email**: contato@peliculasaraujo.com
- **GitHub Issues**: [Abrir uma issue](https://github.com/seu-usuario/site-peliculas-araujo/issues)

---

## 🙏 Agradecimentos

Desenvolvido com ❤️ pela Equipe Películas Araujo

**Stack Tecnológico:**
- Flask (Backend)
- Vanilla JavaScript (Frontend)
- HTML5 & CSS3
- JSON (Armazenamento)

---

**Última atualização:** 23 de novembro de 2025
