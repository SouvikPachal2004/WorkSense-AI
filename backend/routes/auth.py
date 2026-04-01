"""
WorkSense AI — Auth Routes
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from extensions import mongo
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    required = ['email', 'password', 'name']
    if not all(k in data for k in required):
        return jsonify({'error': 'Missing required fields'}), 400

    if mongo.db.users.find_one({'email': data['email']}):
        return jsonify({'error': 'Email already registered'}), 409

    user = {
        'name':       data['name'],
        'email':      data['email'],
        'password':   generate_password_hash(data['password']),
        'company':    data.get('company', ''),
        'role':       data.get('role', 'admin'),
        'created_at': datetime.utcnow()
    }
    mongo.db.users.insert_one(user)
    token = create_access_token(identity=data['email'])
    return jsonify({'token': token, 'user': {'name': user['name'], 'email': user['email']}}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = mongo.db.users.find_one({'email': data.get('email')})
    if not user or not check_password_hash(user['password'], data.get('password', '')):
        return jsonify({'error': 'Invalid credentials'}), 401

    token = create_access_token(identity=user['email'])
    return jsonify({
        'token': token,
        'user': {'name': user['name'], 'email': user['email'], 'role': user.get('role', 'admin')}
    })


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    email = get_jwt_identity()
    user  = mongo.db.users.find_one({'email': email}, {'password': 0, '_id': 0})
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user)
