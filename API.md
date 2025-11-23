# 📡 Documentação da API - Películas Araujo

> Guia completo de endpoints e uso da API REST do Películas Araujo

## 📋 Índice

- [Base URL](#base-url)
- [Autenticação](#autenticação)
- [Endpoints](#endpoints)
- [Códigos de Status](#códigos-de-status)
- [Exemplos](#exemplos)
- [Tratamento de Erros](#tratamento-de-erros)

---

## 🌐 Base URL

```
Desenvolvimento: http://localhost:5000
Produção: https://api.peliculasaraujo.com
```

## 🔐 Autenticação

Atualmente, a API **não requer autenticação** para endpoints públicos.

**Nota**: Em implementações futuras, será adicionada autenticação via tokens JWT.

---

## 📍 Endpoints

### 1. Health Check (Verificar Status)

Verifica se a API está operacional.

```http
GET /api/health
```

#### Resposta (200 OK)

```json
{
  "status": "ok"
}
```

#### Exemplo com cURL

```bash
curl -X GET http://localhost:5000/api/health
```

#### Exemplo com JavaScript

```javascript
fetch('http://localhost:5000/api/health')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```

---

### 2. Criar Orçamento

Cria um novo orçamento com dados do cliente.

```http
POST /api/orcamento
Content-Type: application/json
```

#### Parâmetros do Request

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `nome` | string | ✅ Sim | Nome completo do cliente |
| `telefone` | string | ✅ Sim | Telefone do cliente |
| `tipo` | string | ❌ Não | Tipo de serviço (automotivo/predial) |
| `mensagem` | string | ❌ Não | Mensagem adicional do cliente |

#### Request Body

```json
{
  "nome": "João Silva",
  "telefone": "(11) 99999-9999",
  "tipo": "automotivo",
  "mensagem": "Gostaria de um orçamento para insulfilm no meu veículo"
}
```

#### Resposta (201 Created)

```json
{
  "status": "success",
  "message": "Orçamento recebido",
  "data": {
    "id": 1,
    "nome": "João Silva",
    "telefone": "(11) 99999-9999",
    "tipo": "automotivo",
    "mensagem": "Gostaria de um orçamento para insulfilm no meu veículo",
    "created_at": "2025-11-23T10:30:45.123456Z"
  }
}
```

#### Exemplo com cURL

```bash
curl -X POST http://localhost:5000/api/orcamento \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "telefone": "(11) 99999-9999",
    "tipo": "automotivo",
    "mensagem": "Gostaria de um orçamento"
  }'
```

#### Exemplo com JavaScript

```javascript
const dadosOrcamento = {
  nome: "João Silva",
  telefone: "(11) 99999-9999",
  tipo: "automotivo",
  mensagem: "Gostaria de um orçamento"
};

fetch('http://localhost:5000/api/orcamento', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dadosOrcamento)
})
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      console.log('Orçamento criado:', data.data);
    } else {
      console.error('Erro:', data.message);
    }
  })
  .catch(error => console.error('Erro:', error));
```

#### Erros Possíveis

**400 Bad Request** - Campos obrigatórios faltando

```json
{
  "status": "error",
  "message": "Campos \"nome\" e \"telefone\" são obrigatórios."
}
```

**400 Bad Request** - Content-Type inválido

```json
{
  "status": "error",
  "message": "Esperado JSON"
}
```

**500 Internal Server Error** - Erro ao gravar

```json
{
  "status": "error",
  "message": "Erro ao gravar orçamento: <detalhes do erro>"
}
```

---

### 3. Listar Orçamentos

Retorna lista de todos os orçamentos registrados.

```http
GET /api/orcamentos
```

#### Resposta (200 OK)

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
    },
    {
      "id": 2,
      "nome": "Maria Santos",
      "telefone": "(11) 98888-8888",
      "tipo": "predial",
      "mensagem": "Interesse em películas prediais",
      "created_at": "2025-11-23T11:45:30.654321Z"
    }
  ]
}
```

#### Resposta (200 OK) - Lista Vazia

```json
{
  "status": "success",
  "data": []
}
```

#### Exemplo com cURL

```bash
curl -X GET http://localhost:5000/api/orcamentos
```

#### Exemplo com JavaScript

```javascript
fetch('http://localhost:5000/api/orcamentos')
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      console.log('Orçamentos:', data.data);
      console.log(`Total: ${data.data.length} orçamentos`);
    }
  })
  .catch(error => console.error('Erro:', error));
```

#### Erros Possíveis

**500 Internal Server Error** - Erro ao ler dados

```json
{
  "status": "error",
  "message": "Erro ao ler orçamentos: <detalhes do erro>"
}
```

---

## 📊 Códigos de Status HTTP

| Código | Significado | Descrição |
|--------|------------|-----------|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados inválidos ou incompletos |
| 405 | Method Not Allowed | Método HTTP não permitido |
| 500 | Server Error | Erro no servidor |

---

## 💡 Exemplos Práticos

### Exemplo 1: Formulário HTML com Envio via JavaScript

```html
<form id="orcamentoForm">
  <input type="text" name="nome" placeholder="Nome" required>
  <input type="tel" name="telefone" placeholder="Telefone" required>
  <select name="tipo">
    <option value="">Selecione o tipo</option>
    <option value="automotivo">Películas Automotivas</option>
    <option value="predial">Películas Prediais</option>
  </select>
  <textarea name="mensagem" placeholder="Mensagem (opcional)"></textarea>
  <button type="submit">Enviar Orçamento</button>
</form>

<script>
document.getElementById('orcamentoForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const dados = Object.fromEntries(formData);
  
  try {
    const response = await fetch('http://localhost:5000/api/orcamento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      alert('Orçamento enviado com sucesso!');
      e.target.reset();
    } else {
      alert(`Erro: ${result.message}`);
    }
  } catch (error) {
    alert(`Erro na comunicação: ${error.message}`);
  }
});
</script>
```

### Exemplo 2: Listar e Exibir Orçamentos

```javascript
async function carregarOrcamentos() {
  try {
    const response = await fetch('http://localhost:5000/api/orcamentos');
    const result = await response.json();
    
    if (result.status === 'success') {
      const orcamentos = result.data;
      
      // Criar tabela
      const tabela = document.createElement('table');
      tabela.innerHTML = `
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Tipo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          ${orcamentos.map(o => `
            <tr>
              <td>${o.id}</td>
              <td>${o.nome}</td>
              <td>${o.telefone}</td>
              <td>${o.tipo || 'N/A'}</td>
              <td>${new Date(o.created_at).toLocaleString('pt-BR')}</td>
            </tr>
          `).join('')}
        </tbody>
      `;
      
      document.body.appendChild(tabela);
    }
  } catch (error) {
    console.error('Erro ao carregar orçamentos:', error);
  }
}

carregarOrcamentos();
```

---

## ⚠️ Tratamento de Erros

### Boas Práticas

```javascript
async function enviarOrcamento(dados) {
  try {
    // Validar dados localmente primeiro
    if (!dados.nome || !dados.nome.trim()) {
      throw new Error('Nome é obrigatório');
    }
    if (!dados.telefone || !dados.telefone.trim()) {
      throw new Error('Telefone é obrigatório');
    }
    
    // Fazer a requisição
    const response = await fetch('http://localhost:5000/api/orcamento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    
    // Verificar status HTTP
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    // Analisar resposta JSON
    const resultado = await response.json();
    
    // Verificar status da aplicação
    if (resultado.status !== 'success') {
      throw new Error(resultado.message || 'Erro desconhecido');
    }
    
    return resultado.data;
    
  } catch (erro) {
    console.error('Erro ao enviar orçamento:', erro.message);
    // Exibir erro para o usuário
    alert(`Erro: ${erro.message}`);
    return null;
  }
}
```

---

## 🔄 Fluxo de Requisição/Resposta

```
Client                         Server
   |                              |
   |------- POST /api/orcamento --|
   |     (dados em JSON)          |
   |                       Processa dados
   |                     Valida campos
   |                     Gera novo ID
   |                    Escreve em JSON
   |------ 201 Created ----------|
   |   (dados + ID)              |
   |                              |
```

---

## 🚀 Próximas Funcionalidades (Roadmap)

- [ ] GET /api/orcamentos/:id - Buscar um orçamento específico
- [ ] PUT /api/orcamentos/:id - Atualizar orçamento
- [ ] DELETE /api/orcamentos/:id - Deletar orçamento
- [ ] GET /api/catalogo - Listar catálogo de películas
- [ ] POST /api/contato - Enviar mensagem de contato
- [ ] Autenticação via JWT
- [ ] Paginação de resultados
- [ ] Filtros de busca

---

**Última atualização:** 23 de novembro de 2025
