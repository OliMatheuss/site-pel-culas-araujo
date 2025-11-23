from flask import Flask
from flask_cors import CORS


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_mapping(
        SECRET_KEY='dev'
    )

    CORS(app)

    # Register routes
    from .routes import api_bp
    app.register_blueprint(api_bp)

    return app
