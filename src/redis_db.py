import os

from redis import Redis

if not os.getenv('DOCKERED', False):
    redis_db = Redis(host='localhost', port=6379, db='13')
else:
    redis_db = Redis(host='red', port=6379, db='13')
