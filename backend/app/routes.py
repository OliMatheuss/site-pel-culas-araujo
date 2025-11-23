from flask import Blueprint, request, jsonify
from pathlib import Path
import json
from datetime import datetime

api_bp = Blueprint('api', __name__)


@api_bp.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})


@api_bp.route('/api/orcamento', methods=['POST'])
def orcamento():
    if not request.is_json:
        return jsonify({'status': 'error', 'message': 'Esperado JSON'}), 400

    payload = request.get_json()
    nome = payload.get('nome')
    telefone = payload.get('telefone')
    tipo = payload.get('tipo')
    mensagem = payload.get('mensagem')

    # Validação simples
    if not nome or not telefone:
        return jsonify({'status': 'error', 'message': 'Campos "nome" e "telefone" são obrigatórios.'}), 400

    # Persistir em data/orcamentos.json
    repo_root = Path(__file__).resolve().parents[2]
    data_dir = repo_root / 'data'
    data_dir.mkdir(parents=True, exist_ok=True)
    file_path = data_dir / 'orcamentos.json'

    if not file_path.exists():
        file_path.write_text('[]', encoding='utf-8')

    try:
        with file_path.open('r+', encoding='utf-8') as f:
            try:
                items = json.load(f)
            except json.JSONDecodeError:
                items = []

            next_id = 1
            if items:
                try:
                    next_id = max((it.get('id', 0) for it in items)) + 1
                except Exception:
                    next_id = len(items) + 1

            new_item = {
                'id': next_id,
                'nome': nome,
                'telefone': telefone,
                'tipo': tipo,
                'mensagem': mensagem,
                'created_at': datetime.utcnow().isoformat() + 'Z'
            }

            items.append(new_item)
            f.seek(0)
            json.dump(items, f, ensure_ascii=False, indent=2)
            f.truncate()

    except Exception as e:
        return jsonify({'status': 'error', 'message': f'Erro ao gravar orçamento: {e}'}), 500

    return jsonify({'status': 'success', 'message': 'Orçamento recebido', 'data': new_item}), 201


@api_bp.route('/api/orcamentos', methods=['GET'])
def listar_orcamentos():
    """Retorna a lista de orçamentos gravados em data/orcamentos.json"""
    repo_root = Path(__file__).resolve().parents[2]
    file_path = repo_root / 'data' / 'orcamentos.json'

    if not file_path.exists():
        return jsonify({'status': 'success', 'data': []}), 200

    try:
        with file_path.open('r', encoding='utf-8') as f:
            try:
                items = json.load(f)
            except json.JSONDecodeError:
                items = []
    except Exception as e:
        return jsonify({'status': 'error', 'message': f'Erro ao ler orçamentos: {e}'}), 500

    return jsonify({'status': 'success', 'data': items}), 200
