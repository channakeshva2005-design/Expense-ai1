from flask import Flask, request, jsonify
from flask_cors import CORS
from ai import categorize_expense

app = Flask(__name__)
CORS(app)

@app.route("/categorize", methods=["POST"])
def categorize():
    data = request.get_json()

    results = []
    for item in data:
        amount = item.get("amount")
        description = item.get("description")
        category = categorize_expense(description)

        results.append({
            "amount": amount,
            "description": description,
            "category": category
        })

    return jsonify(results)

@app.route("/", methods=["GET"])
def home():
    return {"message": "Expense Tracker AI Backend is working!"}

if __name__ == "__main__":
    app.run(debug=True)
