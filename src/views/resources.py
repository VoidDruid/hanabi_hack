from app import app
from flask import jsonify, request
from github_api import api
from cloud import create_wordcloud


@app.route('/resources/wordcloud/<string:user>')
def get_lang_wordcloud(user):
    d = api.get_languages_counts(user)
    w = create_wordcloud(d)
    return jsonify({'img': w.decode()})
