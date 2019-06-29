from flask import jsonify

from app import app
from github_api import api


@app.route('/stars/<string:user>')
def get_stars(user):
    return jsonify({'count': api.get_stars(user)})
