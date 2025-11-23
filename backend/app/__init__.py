#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Módulo de inicialização da aplicação Flask

Este módulo configura a aplicação Flask, ativa CORS (Cross-Origin Resource Sharing)
e registra os blueprints de rotas.

Autor: Equipe Películas Araujo
Data: 2025
"""

from flask import Flask
from flask_cors import CORS


def create_app(test_config=None):
    """
    Factory function para criar e configurar a aplicação Flask
    
    Args:
        test_config (dict, optional): Configurações de teste. Padrão: None
    
    Returns:
        Flask: Instância da aplicação Flask configurada
    """
    # Cria a instância Flask
    app = Flask(__name__, instance_relative_config=False)
    
    # Define configurações da aplicação
    # SECRET_KEY é usado para sessões e tokens (deve ser alterado em produção)
    app.config.from_mapping(
        SECRET_KEY='dev'
    )

    # Habilita CORS (Cross-Origin Resource Sharing) para permitir requisições de outros domínios
    CORS(app)

    # Importa e registra o blueprint de rotas da API
    # Blueprints permitem organizar rotas de forma modular
    from .routes import api_bp
    app.register_blueprint(api_bp)

    return app
