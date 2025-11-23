# Arquivo de configuração para o projeto
# Este arquivo contém padrões de configuração para diferentes ambientes

"""
Exemplo de uso em backend/app/__init__.py:

from config.settings import DevelopmentConfig, ProductionConfig
import os

env = os.getenv('FLASK_ENV', 'development')
config = DevelopmentConfig if env == 'development' else ProductionConfig
app.config.from_object(config)
"""
