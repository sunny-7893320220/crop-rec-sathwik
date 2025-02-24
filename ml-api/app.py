from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load("crop_model.joblib")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        features = [
            data["N"],
            data["P"],
            data["K"],
            data["temperature"],
            data["humidity"],
            data["ph"],
            data["rainfall"],
        ]
        input_data = np.array(features).reshape(1, -1)
        prediction = model.predict(input_data)[0]
        return jsonify({"crop": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)