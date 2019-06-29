from app import app
from flask import jsonify, request
from github_api import api
from recommender import get_neighbours_by_login, get_neighbours_by_row, default_row


@app.route('/get_neighbours/login/<string:login>')
def recommend_neighbours_by_login(login):
    return jsonify(get_neighbours_by_login(login))


@app.route('/get_neighbours/by_description')
def recommend_employees():
    params = request.data
    return jsonify(get_neighbours_by_row({
        **default_row,
        **params
    }))
