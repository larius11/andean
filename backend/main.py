from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api', methods=['GET', 'POST'])
def api_endpoints():
    return "You've made a GET request... We only handle POST with correct data..."


@app.route('/insert', methods=['POST'])
def insert_product():
    return request.json


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

# serve(app, host='0.0.0.0', port=5000, url_scheme='https', ssl_context=('cert.pem', 'key.pem'))
