import os

from celery.schedules import crontab

TRUE_ENV_VALUES = (True, 'true', 'True', '1')


def getenv_bool(name, default=None):
    value = os.getenv(name, default)
    if value in TRUE_ENV_VALUES:
        return True
    else:
        return False


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '4sd-r*rg_s1!&!nz6lchg%&p*jzx@p_@0s5xz$aj)mn0npaiob'

DEBUG = getenv_bool('DEBUG', True)


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'hanabi_hack'
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

ROOT_URLCONF = 'hanabi_hack.urls'

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

WSGI_APPLICATION = 'hanabi_hack.wsgi.application'


# Main database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'hanabi'),
        'USER': os.getenv('DB_USER', 'hanabi'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'password'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', 5432)
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
STATIC_URL = '/hanabi_hack/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# Celery config
CELERY_TIMEZONE = TIME_ZONE

CELERY_BROKER_URL = os.environ.get("BROKER_URL", 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = os.environ.get("CELERY_RESULT_BACKEND", 'redis://localhost:6379/1')

CELERY_IMPORTS = [
    "tasks"
]

CELERY_BEAT_SCHEDULE = {
}

RUN_CELERY_TASKS = getenv_bool('RUN_CELERY_TASKS', True)
if not RUN_CELERY_TASKS:
    CELERY_BEAT_SCHEDULE = {}
