from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.db_funcs import *
from backend.db_structure import app

CORS(app)


@app.route('/api', methods=['GET'])
def api_endpoints():
    return "You've made a GET request... We only handle POST with correct data..."


@app.route('/insert', methods=['POST'])
def insert_product_api():
    fields = request.json
    response = insert_product(fields['category'], fields['subCategory'], fields['color'], fields['name'], fields['price'], fields['details'], fields['image'])
    if response[0]:
        print(get_all_products())
    else:
        print(response)
    return jsonify(request.json)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

# serve(app, host='0.0.0.0', port=5000, url_scheme='https', ssl_context=('cert.pem', 'key.pem'))
