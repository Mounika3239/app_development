from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

try:
    with open('xgboost_sklearn', 'rb') as model_file:
        xgboost_model = pickle.load(model_file)
except FileNotFoundError:
    raise FileNotFoundError("Model file 'xgboost_sklearn' not found.")

@app.route('/predict', methods=['POST'])
def predict():
    """Handle prediction requests."""
    try:
        input_data = request.get_json(force=True)
        input_array = []
        for key, value in input_data.items():
            value = 0 if value == '' else float(value)
            input_array.append(value)
        input_array = np.array(input_array).reshape(1, -1)
        prediction = xgboost_model.predict(input_array)
        return jsonify({'predictions': prediction.tolist()})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
