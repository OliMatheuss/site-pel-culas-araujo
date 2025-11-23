#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Módulo de rotas (endpoints) da API

Este módulo define todos os endpoints disponíveis para a aplicação.
Inclui rotas para validação de saúde e gerenciamento de orçamentos.

Endpoints disponíveis:
    GET  /api/health          - Verifica se a API está funcionando
    POST /api/orcamento       - Cria um novo orçamento
    GET  /api/orcamentos      - Lista todos os orçamentos

Autor: Equipe Películas Araujo
Data: 2025
"""

from flask import Blueprint, request, jsonify
from pathlib import Path
import json
from datetime import datetime

# Cria um Blueprint para organizar as rotas de forma modular
api_bp = Blueprint('api', __name__)


@api_bp.route('/api/health', methods=['GET'])
def health():
    """
    Endpoint de verificação de saúde da API
    
    Retorna um status simples para verificar se o servidor está respondendo.
    Útil para monitoramento e testes.
    
    Returns:
        dict: {'status': 'ok'}
    """
    return jsonify({'status': 'ok'})


@api_bp.route('/api/orcamento', methods=['POST'])
def orcamento():
    """
    Endpoint para criar um novo orçamento
    
    Recebe dados do formulário de orçamento via JSON e armazena
    no arquivo data/orcamentos.json com um ID único.
    
    Campos esperados (JSON):
        nome (str): Nome do cliente (obrigatório)
        telefone (str): Telefone do cliente (obrigatório)
        tipo (str): Tipo de película/serviço
        mensagem (str): Mensagem adicional do cliente
    
    Returns:
        tuple: (response_dict, status_code)
            - 201: Orçamento criado com sucesso
            - 400: Dados inválidos ou campos obrigatórios faltando
            - 500: Erro ao gravar os dados
    """
    # Verifica se a requisição contém JSON
    if not request.is_json:
        return jsonify({'status': 'error', 'message': 'Esperado JSON'}), 400

    # Extrai dados do corpo da requisição
    payload = request.get_json()
    nome = payload.get('nome')
    telefone = payload.get('telefone')
    tipo = payload.get('tipo')
    mensagem = payload.get('mensagem')

    # Validação simples - verifica campos obrigatórios
    if not nome or not telefone:
        return jsonify({
            'status': 'error',
            'message': 'Campos "nome" e "telefone" são obrigatórios.'
        }), 400

    # Define o caminho para armazenar os orçamentos
    repo_root = Path(__file__).resolve().parents[2]
    data_dir = repo_root / 'data'
    data_dir.mkdir(parents=True, exist_ok=True)
    file_path = data_dir / 'orcamentos.json'

    # Cria arquivo vazio se não existir
    if not file_path.exists():
        file_path.write_text('[]', encoding='utf-8')

    try:
        # Abre o arquivo para leitura e escrita
        with file_path.open('r+', encoding='utf-8') as f:
            try:
                # Tenta carregar os orçamentos existentes
                items = json.load(f)
            except json.JSONDecodeError:
                # Se o arquivo estiver vazio ou corrompido, inicializa lista vazia
                items = []

            # Calcula o próximo ID disponível
            next_id = 1
            if items:
                try:
                    next_id = max((it.get('id', 0) for it in items)) + 1
                except Exception:
                    next_id = len(items) + 1

            # Cria o novo orçamento com timestamp
            new_item = {
                'id': next_id,
                'nome': nome,
                'telefone': telefone,
                'tipo': tipo,
                'mensagem': mensagem,
                'created_at': datetime.utcnow().isoformat() + 'Z'
            }

            # Adiciona o novo orçamento à lista
            items.append(new_item)
            
            # Escreve os dados de volta ao arquivo
            f.seek(0)
            json.dump(items, f, ensure_ascii=False, indent=2)
            f.truncate()

    except Exception as e:
        # Retorna erro se houver problema ao gravar
        return jsonify({
            'status': 'error',
            'message': f'Erro ao gravar orçamento: {e}'
        }), 500

    # Retorna sucesso com os dados do novo orçamento
    return jsonify({
        'status': 'success',
        'message': 'Orçamento recebido',
        'data': new_item
    }), 201


@api_bp.route('/api/orcamentos', methods=['GET'])
def listar_orcamentos():
    """
    Endpoint para listar todos os orçamentos
    
    Retorna uma lista com todos os orçamentos armazenados
    no arquivo data/orcamentos.json.
    
    Returns:
        tuple: (response_dict, status_code)
            - 200: Sucesso (pode retornar lista vazia)
            - 500: Erro ao ler os dados
    """
    # Define o caminho do arquivo de dados
    repo_root = Path(__file__).resolve().parents[2]
    file_path = repo_root / 'data' / 'orcamentos.json'

    # Se o arquivo não existe, retorna lista vazia
    if not file_path.exists():
        return jsonify({'status': 'success', 'data': []}), 200

    try:
        # Lê o arquivo e carrega os dados JSON
        with file_path.open('r', encoding='utf-8') as f:
            try:
                items = json.load(f)
            except json.JSONDecodeError:
                # Se o arquivo estiver corrompido, retorna lista vazia
                items = []
    except Exception as e:
        # Retorna erro se não conseguir ler o arquivo
        return jsonify({
            'status': 'error',
            'message': f'Erro ao ler orçamentos: {e}'
        }), 500

    # Retorna os dados dos orçamentos
    return jsonify({'status': 'success', 'data': items}), 200
