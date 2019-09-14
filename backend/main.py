from flask import Flask, request, jsonify
from flask_cors import CORS
from db_funcs import *
from db_structure import app

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


@app.route('/product', methods=['GET'])
def get_product():
    fields = request.json
    return jsonify(get_specific_product(fields['product'], fields['category'], fields['subCategory'], fields['color']))


@app.route('/products', methods=['GET'])
def get_products():
    fields = request.json
    return jsonify(get_some_products(fields['category'], fields['subCategory']))


@app.route('/colors', methods=['GET'])
def get_colors():
    fields = request.json
    return jsonify(get_some_colors(fields['product'], fields['category'], fields['subCategory']))


@app.route('/categories', methods=['GET'])
def get_categories():
    return jsonify(get_all_categories())


@app.route('/subCategories', methods=['GET'])
def get_sub_categories():
    return jsonify(get_all_sub_categories())


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

# serve(app, host='0.0.0.0', port=5000, url_scheme='https', ssl_context=('cert.pem', 'key.pem'))
