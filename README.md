# Documentação Técnica – Site Portfólio de Películas Automotivas e Prediais

## 1. Visão Geral do Projeto

O objetivo deste projeto é desenvolver um site portfólio profissional para apresentação de serviços de instalação de películas automotivas e prediais. O sistema deve destacar a qualidade dos serviços, o catálogo de películas disponíveis, depoimentos de clientes, informações de contato e permitir solicitações de orçamento.

O front-end será desenvolvido em **React**, garantindo responsividade, performance e uma experiência moderna ao usuário. O back-end será implementado em **Flask (Python)**, servindo para gerenciamento de formulários, API e integração futura com banco de dados.

---

## 2. Objetivos do Sistema

* Exibir portfólio profissional de serviços de películas automotivas e prediais.
* Permitir que clientes solicitem orçamento online.
* Apresentar catálogo de películas (insulfilm), incluindo categorias e especificações.
* Permitir expansão futura para sistema administrativo.
* Melhorar presença digital e conversão de clientes.

---

## 3. Público-Alvo

* Proprietários de veículos interessados em películas automotivas.
* Empresas e condomínios que necessitam de películas prediais.
* Arquitetos e engenheiros buscando soluções profissionais.

---

## 4. Arquitetura do Sistema

A arquitetura será dividida em duas camadas principais:

### **Front-end (React)**

* Componentes reutilizáveis.
* Integração HTTP com API Flask.
* Rotas internas (React Router).
* Layout responsivo (Mobile First).

### **Back-end (Flask)**

* API REST para envio de formulários.
* Middleware para validação de dados.
* Organização modular via Blueprints.
* Suporte para expansão futura com banco de dados.
 # site-películas-araujo — Base do projeto

 Este repositório contém a estrutura base (scaffold) para o site "Películas Araujo" — um ponto de partida leve para construir o catálogo/portfólio.

 Arquivos e pastas criadas nesta base:

 - `public/` — conteúdo estático público (HTML, CSS, JS).
   - `public/index.html` — página inicial básica.
   - `public/assets/css/main.css` — estilos básicos.
   - `public/assets/js/main.js` — script inicial.
 - `src/` — fontes / origem do código (styles, scripts, components).
   - `src/components/.gitkeep`
   - `src/styles/main.css`
   - `src/scripts/main.js`
 - `data/movies.json` — exemplo de dados do catálogo.
 - `tests/` — pasta para futuros testes (README presente).
 - `package.json` — meta para facilitar comandos dev (ex.: `npm start` usando `npx serve`).
 - `.gitignore`

 Como usar localmente (rápido):

 1. Instale dependências opcionais (se necessário) ou apenas abra `public/index.html` no navegador.
 2. Para servir localmente com um servidor estático simples (requer Node.js):

 ```powershell
 npx serve public
 ```

 Estrutura sugerida para desenvolvimento posterior:

 ```
 site-peliculas-araujo/
 ├── public/                 # Arquivos estáticos que serão servidos
 │   ├── assets/
 │   │   ├── css/
 │   │   └── js/
 │   └── index.html
 ├── src/                    # Fonte do front-end (componentes, estilos, scripts)
 ├── data/                   # JSONs de dados (ex.: movies.json)
 ├── tests/                  # Testes automatizados
 ├── package.json
 └── README.md
 ```

 Próximos passos recomendados (opcionais):

 - Migrar para framework (React/Vite, Next.js) se quiser SPA/rotas.
 - Adicionar bundler (Vite, Webpack) e pipeline de build.
 - Configurar testes (Jest, Vitest) em `tests/`.
 - Criar API backend (Flask, Express) se precisar de formulários/armazenamento.

 Se quiser, posso:

 - Inicializar um projeto React/Vite com esse scaffold.
 - Adicionar um script de build/serve mais robusto.
 - Configurar GitHub Actions para deploy automático.

 Diga qual próximo passo prefere e eu continuo.
project/

