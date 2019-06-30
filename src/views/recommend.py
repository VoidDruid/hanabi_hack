from app import app
from flask import jsonify, request
from github_api import api
from recommender import get_neighbours_by_login, get_neighbours_by_row, default_row


@app.route('/get_neighbours/login/<string:login>')
def recommend_neighbours_by_login(login):
    return jsonify(get_neighbours_by_login(login))


@app.route('/get_neighbours/by_description', methods=['POST'])
def recommend_employees():
    params = request.get_json(force=True)
    print(params)
    langs = list(map(lambda l: l.strip(), params.get('languages', '').split(',')))
    params.pop('languages')
    klasses = {
        'backend': 0,
        'frontend': 0,
        'embedded': 0,
        'science': 0,
        'scripting': 0,
        'mobile': 0,
        'hardware': 0,
        'other': 0,
        **{key: 7 for key in params.keys()}
    }
    langs = {lang: 5 for lang in langs}
    return jsonify(get_neighbours_by_row({
        **default_row,
        **langs
    }, klasses))
