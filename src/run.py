from views import *
from flask_cors import CORS

CORS(app)
app.run(host='localhost', port=8080, threaded=True)
