from app import app
from flask import jsonify, request
from hh_api import hh_api
from redis_db import redis_db
import json
from github_api import api


@app.route('/find/job/<string:login>')
def get_jobs(login):
    try:
        res = json.loads(redis_db.hget(login, 'lang_dict_prs'))
    except:
        res = api.get_languages_counts(login)
    if res:
        list_d = list(res.items())
        list_d.sort(reverse=True, key=lambda i: i[1])
        key = list(map(lambda pair: pair[0], list_d[:1]))
        return jsonify(hh_api.get_jobs(str(key)))
    return jsonify([])
