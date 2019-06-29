from flask import jsonify

from app import app
from github_api import api


@app.route('/prs/by_date/<string:user>')
def prs_by_date(user):
    return jsonify([issue.created_at for issue in api.get_user_prs(user)])


@app.route('/prs/by_lang/<string:user>')
def prs_by_lang(user):
    return jsonify(api.get_prs_by_language(user))
