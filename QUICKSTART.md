# 🚀 Quick Start - Películas Araujo

Comece em **5 minutos**!

## Opção 1: Frontend Rápido (Sem Node.js)

### Windows PowerShell
```powershell
# Apenas abra no navegador
Invoke-Item public/index.html
```

### Linux/macOS
```bash
# Apenas abra no navegador
open public/index.html
```

---

## Opção 2: Frontend + Servidor Local

### Windows PowerShell
```powershell
# Instalar dependências (primeira vez)
npm install

# Iniciar servidor
npm start

# Acessar: http://localhost:3000
```

### Linux/macOS
```bash
npm install
npm start
```

---

## Opção 3: Backend Flask

### Windows PowerShell
```powershell
# Criar ambiente virtual
python -m venv backend\.venv

# Ativar ambiente
backend\.venv\Scripts\Activate.ps1

# Instalar dependências
pip install -r backend/requirements.txt

# Iniciar servidor
python backend/run.py

# Acessar: http://localhost:5000/api/health
```

### Linux/macOS
```bash
python -m venv backend/venv
source backend/venv/bin/activate
pip install -r backend/requirements.txt
python backend/run.py
```

---

## Opção 4: Full Stack (Frontend + Backend)

### Terminal 1 - Backend
```powershell
# Windows
backend\.venv\Scripts\Activate.ps1
python backend/run.py
```

### Terminal 2 - Frontend
```powershell
npm start
```

✅ Pronto! Acesse `http://localhost:3000`

---

## Testar API

### cURL
```bash
# Health check
curl http://localhost:5000/api/health

# Criar orçamento
curl -X POST http://localhost:5000/api/orcamento \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","telefone":"11999999999","tipo":"automotivo"}'

# Listar orçamentos
curl http://localhost:5000/api/orcamentos
```

### PowerShell
```powershell
# Health check
Invoke-RestMethod -Uri http://localhost:5000/api/health

# Criar orçamento
$body = @{
  nome = "João"
  telefone = "11999999999"
  tipo = "automotivo"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/orcamento `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

---

## Próximos Passos

1. Ler [README.md](README.md)
2. Explorar [API.md](API.md)
3. Ver [CONTRIBUTING.md](CONTRIBUTING.md)
4. Iniciar desenvolvimento

---

## Dúvidas?

- 📖 Veja [README.md](README.md)
- 🔌 Veja [API.md](API.md)
- 🤝 Veja [CONTRIBUTING.md](CONTRIBUTING.md)
- 📧 Contato: contato@peliculasaraujo.com

---

**Happy coding! 🎉**
