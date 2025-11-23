# 🚀 Guia de Deployment - Películas Araujo

> Instruções para colocar a aplicação em produção

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Deployment Local](#deployment-local)
- [Deployment em Servidor](#deployment-em-servidor)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [HTTPS/SSL](#httpssl)
- [Monitoramento](#monitoramento)
- [Troubleshooting](#troubleshooting)

---

## ✅ Pré-requisitos

### Ambiente Mínimo

- Sistema Operacional: Linux (Ubuntu 20.04+), macOS ou Windows Server
- Python 3.8+
- Node.js 16+ (opcional, para build do frontend)
- Git
- 512 MB RAM mínimo
- 1 GB disco disponível

### Ferramentas Recomendadas

- Docker (para containerização)
- Nginx (como reverse proxy)
- Supervisor/Systemd (para gerenciar processos)
- PostgreSQL (quando usar banco de dados)

---

## 🏠 Deployment Local

### 1. Clonar Repositório

```bash
git clone https://github.com/seu-usuario/site-peliculas-araujo.git
cd site-peliculas-araujo
```

### 2. Preparar Backend

```bash
# Criar ambiente virtual
python -m venv backend/.venv

# Ativar (Linux/macOS)
source backend/.venv/bin/activate

# Ou ativar (Windows PowerShell)
backend\.venv\Scripts\Activate.ps1

# Instalar dependências
pip install -r backend/requirements.txt

# Copiar arquivo de configuração
cp backend/.env.example backend/.env

# Editar .env com valores reais
nano backend/.env
```

### 3. Preparar Frontend

```bash
# Instalar dependências (opcional)
npm install

# Ou apenas servir o diretório public
# npx serve public
```

### 4. Executar Aplicação

#### Terminal 1 - Backend

```bash
# Com ambiente virtual ativado
python backend/run.py
```

Backend estará em: `http://localhost:5000`

#### Terminal 2 - Frontend

```bash
npm start
# ou
npx serve public
```

Frontend estará em: `http://localhost:3000` ou `http://localhost:5000`

---

## 🖥️ Deployment em Servidor

### Pré-requisitos no Servidor

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip python3-venv git nginx curl

# Verificar versões
python3 --version
pip3 --version
git --version
```

### 1. Clonar e Preparar

```bash
# Criar diretório de aplicação
sudo mkdir -p /var/www/peliculas-araujo
cd /var/www/peliculas-araujo

# Clonar repositório
sudo git clone https://github.com/seu-usuario/site-peliculas-araujo.git .

# Dar permissões
sudo chown -R $USER:$USER /var/www/peliculas-araujo
```

### 2. Instalar Dependências

```bash
# Backend
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
pip install gunicorn

# Frontend (se necessário)
npm install
npm run build
```

### 3. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp backend/.env.example backend/.env

# Editar com valores de produção
nano backend/.env
```

**Arquivo backend/.env (Produção):**

```env
FLASK_ENV=production
PORT=5000
SECRET_KEY=gerar-uma-chave-segura-aleatoria
HOST=127.0.0.1
```

Gerar chave segura:

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

### 4. Configurar Systemd (Para Autostart)

Criar arquivo `/etc/systemd/system/peliculas-araujo.service`:

```bash
sudo nano /etc/systemd/system/peliculas-araujo.service
```

Conteúdo:

```ini
[Unit]
Description=Películas Araujo Backend
After=network.target

[Service]
Type=notify
User=www-data
Group=www-data
WorkingDirectory=/var/www/peliculas-araujo
Environment="PATH=/var/www/peliculas-araujo/venv/bin"
ExecStart=/var/www/peliculas-araujo/venv/bin/gunicorn \
    --workers=4 \
    --worker-class=sync \
    --bind=127.0.0.1:5000 \
    --access-logfile=/var/log/peliculas-araujo/access.log \
    --error-logfile=/var/log/peliculas-araujo/error.log \
    backend.run:app
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

Habilitar e iniciar:

```bash
# Criar diretório de logs
sudo mkdir -p /var/log/peliculas-araujo
sudo chown www-data:www-data /var/log/peliculas-araujo

# Habilitar serviço
sudo systemctl daemon-reload
sudo systemctl enable peliculas-araujo
sudo systemctl start peliculas-araujo

# Verificar status
sudo systemctl status peliculas-araujo
```

### 5. Configurar Nginx (Reverse Proxy)

Criar arquivo `/etc/nginx/sites-available/peliculas-araujo`:

```bash
sudo nano /etc/nginx/sites-available/peliculas-araujo
```

Conteúdo:

```nginx
# Redirecionar HTTP para HTTPS
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS
server {
    listen 443 ssl http2;
    server_name seu-dominio.com www.seu-dominio.com;

    # SSL Certificates (usar Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;

    # Segurança SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # Root para arquivos estáticos
    root /var/www/peliculas-araujo/public;
    index index.html;

    # Servir arquivos estáticos
    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Proxy para backend API
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Fallback para index.html (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Bloquear acesso a arquivos sensíveis
    location ~ /\. {
        deny all;
    }
}
```

Ativar site:

```bash
sudo ln -s /etc/nginx/sites-available/peliculas-araujo /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### 6. Configurar SSL/TLS (Let's Encrypt)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Gerar certificado
sudo certbot certonly --nginx -d seu-dominio.com -d www.seu-dominio.com

# Auto-renovação
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## 🔐 Variáveis de Ambiente

### Produção - Arquivo backend/.env

```env
# Segurança
FLASK_ENV=production
DEBUG=False
SECRET_KEY=<gerar-com-secrets.token_hex(32)>

# Servidor
PORT=5000
HOST=127.0.0.1

# Banco de Dados (futuro)
# DATABASE_URL=postgresql://usuario:senha@localhost/peliculas_db

# Email (futuro)
# SMTP_SERVER=smtp.gmail.com
# SMTP_PORT=587
# EMAIL_USER=seu-email@gmail.com
# EMAIL_PASSWORD=sua-senha

# CORS
CORS_ORIGINS=https://seu-dominio.com,https://www.seu-dominio.com

# Logs
LOG_LEVEL=INFO
LOG_FILE=/var/log/peliculas-araujo/app.log
```

---

## 📊 Monitoramento

### Verificar Status do Serviço

```bash
# Status do serviço
sudo systemctl status peliculas-araujo

# Ver logs em tempo real
sudo journalctl -u peliculas-araujo -f

# Ver logs do Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Ver logs da aplicação
sudo tail -f /var/log/peliculas-araujo/error.log
```

### Monitoramento com Systemd

```bash
# Configurar notificações de falha
sudo systemctl status peliculas-araujo

# Reiniciar automático (já configurado no arquivo de serviço)
RestartSec=5s
```

---

## 🔄 Deployment Contínuo (CI/CD)

### GitHub Actions

Criar arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to server
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        SSH_HOST: ${{ secrets.SSH_HOST }}
        SSH_USER: ${{ secrets.SSH_USER }}
      run: |
        mkdir -p ~/.ssh
        echo "$SSH_PRIVATE_KEY" > ~/.ssh/deploy_key
        chmod 600 ~/.ssh/deploy_key
        ssh-keyscan -H $SSH_HOST >> ~/.ssh/known_hosts
        
        ssh -i ~/.ssh/deploy_key $SSH_USER@$SSH_HOST "cd /var/www/peliculas-araujo && git pull && sudo systemctl restart peliculas-araujo"
```

---

## ❓ Troubleshooting

### Problema: "Connection refused" ao acessar

**Solução:**
```bash
# Verificar se o serviço está rodando
sudo systemctl status peliculas-araujo

# Verificar porta
sudo netstat -tlnp | grep 5000

# Reiniciar serviço
sudo systemctl restart peliculas-araujo
```

### Problema: Erro 502 Bad Gateway

**Solução:**
```bash
# Verificar logs do backend
sudo journalctl -u peliculas-araujo -n 50

# Verificar permissões
sudo chown www-data:www-data /var/www/peliculas-araujo
sudo chmod 755 /var/www/peliculas-araujo
```

### Problema: Arquivos estáticos não carregam

**Solução:**
```bash
# Verificar permissões do diretório public
sudo chmod -R 755 /var/www/peliculas-araujo/public
ls -la /var/www/peliculas-araujo/public/assets/
```

### Problema: SSL/TLS não funciona

**Solução:**
```bash
# Verificar certificado
sudo certbot certificates

# Renovar manualmente
sudo certbot renew

# Testar auto-renovação
sudo certbot renew --dry-run
```

---

## 📈 Performance

### Otimizações Recomendadas

1. **Cache**: Configurar cache de arquivo estático no Nginx
2. **Compressão**: Gzip habilitado (veja config Nginx)
3. **Workers Gunicorn**: Aumentar para `--workers=4` ou mais
4. **Database**: Adicionar índices (quando usar banco de dados)
5. **CDN**: Usar CDN para arquivos estáticos

---

## 🔗 Referências Úteis

- [Gunicorn Documentation](https://gunicorn.org/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)
- [Flask Deployment](https://flask.palletsprojects.com/en/2.3.x/deploying/)

---

**Última atualização:** 23 de novembro de 2025
