# ai.py

import re

def categorize_expense(description):
    desc = description.lower()

    # Simple AI-like rule-based categorization
    if any(word in desc for word in ["food", "zomato", "swiggy", "hotel", "restaurant", "lunch", "dinner"]):
        return "Food"
    if any(word in desc for word in ["uber", "ola", "bus", "flight", "train", "petrol", "fuel"]):
        return "Travel"
    if any(word in desc for word in ["electricity", "water bill", "rent", "gas", "maintenance"]):
        return "Bills"
    if any(word in desc for word in ["movie", "netflix", "games", "entertainment"]):
        return "Entertainment"
    if any(word in desc for word in ["amazon", "shopping", "clothes", "flipkart"]):
        return "Shopping"

    return "Others"
