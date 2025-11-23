Backend Flask básico

Instruções rápidas (PowerShell):

```powershell
# criar e ativar virtualenv
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# instalar dependências
pip install -r requirements.txt

# (opcional) exportar variáveis via .env ou manualmente
# Exemplo: $env:PORT = 5000

# rodar
python run.py
```

Endpoints:

- `GET /api/health` — verifica se o serviço está no ar.
- `POST /api/orcamento` — envia dados de orçamento (JSON).

Exemplo de JSON para `POST /api/orcamento`:

```json
{
  "nome": "João",
  "telefone": "(11) 99999-9999",
  "tipo": "automotiva",
  "mensagem": "Quero orçamento para insulfilm"
}
```
