import os

from celery.schedules import crontab

TRUE_ENV_VALUES = (True, 'true', 'True', '1')


def getenv_bool(name, default=None):
    value = os.getenv(name, default)
    if value in TRUE_ENV_VALUES:
        return True
    else:
        return False


class Level:
    LOCAL = 'local'
    DEV = 'dev'
    PROD = 'prod'


RUN_LEVEL = os.getenv('RUN_LEVEL', Level.LOCAL)

if RUN_LEVEL == Level.PROD:
    from conf.levels.prod import *
elif RUN_LEVEL == Level.DEV:
    from conf.levels.dev import *
else:
    from conf.levels.local import *

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '4sd-r*rg_s1!&!nz6lchg%&p*jzx@p_@0s5xz$aj)mn0npaiob'

DEBUG = getenv_bool('DEBUG', (RUN_LEVEL != Level.PROD))


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'candidate_support_web',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'conf.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'conf.wsgi.application'


# Main database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', DATABASE_NAME),
        'USER': os.getenv('DB_USER', DATABASE_USER),
        'PASSWORD': os.getenv('DB_PASSWORD', DATABASE_PASSWORD),
        'HOST': os.getenv('DB_HOST', DATABASE_HOST),
        'PORT': os.getenv('DB_PORT', DATABASE_PORT)
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
LANGUAGE_CODE = 'ru-RU'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/candidate-support/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# Celery config
CELERY_TIMEZONE = TIME_ZONE

CELERY_BROKER_URL = os.environ.get("BROKER_URL", BROKER_URL)
CELERY_RESULT_BACKEND = os.environ.get("CELERY_RESULT_BACKEND", CELERY_RESULT_BACKEND)

CELERY_IMPORTS = [
    "candidate_support_bot.tasks"
]

CELERY_BEAT_SCHEDULE = {
    'send-stats': {
        'task': 'candidate_support_bot.tasks.report_stats',
        'schedule': crontab(day_of_week=5, hour=18, minute=1)
    }
}

RUN_CELERY_TASKS = getenv_bool('RUN_CELERY_TASKS', True)
if not RUN_CELERY_TASKS:
    CELERY_BEAT_SCHEDULE = {}

# BOT settings
TELEGRAM_TOKEN = os.getenv('TELEGRAM_TOKEN', DEFAULT_TELEGRAM_TOKEN)
MAIN_URL = os.getenv("MAIN_URL", 'testbot.tinkoff.ru')
WEBHOOK = getenv_bool('WEBHOOK', True)

TG_REDIS_EXPIRATION = int(os.getenv('REDIS_EXPIRATION', DEFAULT_TG_REDIS_EXPIRATION))
TG_REDIS_HOST = os.getenv('REDIS_HOST', DEFAULT_TG_REDIS_HOST)
TG_REDIS_PORT = int(os.getenv('REDIS_PORT', DEFAULT_TG_REDIS_PORT))
TG_REDIS_DB = int(os.getenv('REDIS_DB', DEFAULT_TG_REDIS_DB))
STATS_REDIS_DB = int(os.getenv('STATS_REDIS_DB', DEFAULT_STATS_REDIS_DB))
MAIN_ADMIN = int(os.getenv('MAIN_ADMIN', 224613065))

EWS_EMAIL = os.getenv('EWS_MAIL', 'candidate_support_bot@tinkoff.ru')
EWS_PASSWORD = os.getenv('EWS_PASSWORD')
EWS_USERNAME = os.getenv('EWS_USERNAME', 'TCSBANK\svc_candidate_sbot')
