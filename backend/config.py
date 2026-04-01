"""
WorkSense AI — Backend Configuration
"""
import os
from datetime import timedelta


class Config:
    # Flask
    SECRET_KEY = os.environ.get('SECRET_KEY', 'worksense-ai-secret-key-change-in-production')
    DEBUG = os.environ.get('DEBUG', 'True') == 'True'

    # MongoDB
    MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/worksense_ai')

    # JWT
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'worksense-jwt-secret')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=8)

    # AI / ML
    MODEL_PATH = os.environ.get('MODEL_PATH', '../ml/models')
    YOLO_MODEL = os.environ.get('YOLO_MODEL', 'yolov8n.pt')

    # Camera
    CAMERA_SOURCE = int(os.environ.get('CAMERA_SOURCE', 0))
    FRAME_RATE    = int(os.environ.get('FRAME_RATE', 30))
