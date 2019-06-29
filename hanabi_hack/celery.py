import os

from celery import Celery

from hanabi_hack import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hanabi_hack.settings')

app = Celery('celery')
app.config_from_object(settings, namespace='CELERY')
