#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Arquivo principal para execução da aplicação Flask

Este módulo é o ponto de entrada da aplicação backend.
Responsável por inicializar a aplicação Flask e iniciar o servidor de desenvolvimento.

Variáveis de ambiente:
    PORT: Porta na qual o servidor irá escutar (padrão: 5000)

Autor: Equipe Películas Araujo
Data: 2025
"""

from app import create_app
import os

# Cria a instância da aplicação Flask com configurações padrão
app = create_app()

if __name__ == '__main__':
    # Obtém a porta das variáveis de ambiente ou usa a porta padrão 5000
    port = int(os.environ.get('PORT', 5000))
    
    # Inicia o servidor Flask
    # host='0.0.0.0' permite que a aplicação seja acessada externamente
    # debug=True habilita o modo de desenvolvimento com auto-reload
    app.run(host='0.0.0.0', port=port, debug=True)
