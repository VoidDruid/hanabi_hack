from app import app
from flask import jsonify, request
from hh_api import hh_api
from redis_db import redis_db
import json

@app.route('/find/employees/')
def get_employees():
    data = request.data

@app.route('/find/job/<string:login>')
def get_jobs(login):
    res = json.loads(redis_db.hget(login, 'language_counts'))
    if res:
        list_d = list(res.items())
        list_d.sort(reverse=True, key=lambda i: i[1])
        key = list(map(lambda pair: pair[0], list_d[:1]))
        return jsonify(hh_api.get_jobs(str(key)))
    return {}
