from views import *
from flask_cors import CORS

CORS(app)
app.run(host='0.0.0.0', port=8080, threaded=True)
