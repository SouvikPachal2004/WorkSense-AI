"""
WorkSense AI — Flask Backend API
Main application entry point
"""

from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import mongo, jwt
from routes.auth      import auth_bp
from routes.employees import employees_bp
from routes.analytics import analytics_bp
from routes.alerts    import alerts_bp
from routes.reports   import reports_bp
from routes.ai_feed   import ai_feed_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    mongo.init_app(app)
    jwt.init_app(app)

    # Blueprints
    app.register_blueprint(auth_bp,      url_prefix='/api/auth')
    app.register_blueprint(employees_bp, url_prefix='/api/employees')
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics')
    app.register_blueprint(alerts_bp,    url_prefix='/api/alerts')
    app.register_blueprint(reports_bp,   url_prefix='/api/reports')
    app.register_blueprint(ai_feed_bp,   url_prefix='/api/ai')

    @app.route('/api/health')
    def health():
        return {'status': 'ok', 'service': 'WorkSense AI Backend'}

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
