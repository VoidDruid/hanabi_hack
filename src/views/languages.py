from app import app
from flask import jsonify
from github_api import api


@app.route('/langs/counts/<string:user>')
def get_language_counts(user):
    return jsonify(api.get_languages_counts(user))


@app.route('/langs/prs/<string:user>')
def get_prs_by_language(user):
    return jsonify(api.count_prs(user))
