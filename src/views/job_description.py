from app import app
from flask import jsonify, request
from hh_api import hh_api

@app.route('/find/employees/')
def get_language_counts():
    data = request.data

@app.route('/find/job/<string:search_string>')
def get_language_counts(search_string):
    return jsonify(hh_api.get_jobs(search_string))