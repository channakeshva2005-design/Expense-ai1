let expenses = [];

function addExpense() {
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;

    if (!amount || !description) {
        alert("Please enter both fields");
        return;
    }

    expenses.push({ amount, description });

    updateTable(expenses);
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
}

function updateTable(data) {
    const table = document.getElementById("table");
    table.innerHTML = `
        <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Category (AI)</th>
        </tr>
    `;

    data.forEach(item => {
        table.innerHTML += `
            <tr>
                <td>${item.amount}</td>
                <td>${item.description}</td>
                <td>${item.category || "-"}</td>
            </tr>
        `;
    });
}

async function analyzeAI() {
    const response = await fetch("http://127.0.0.1:5000/categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenses)
    });

    const data = await response.json();
    updateTable(data);
    showCharts(data);
}

function showCharts(data) {
    let categoryTotals = {};

    data.forEach(item => {
        categoryTotals[item.category] = 
            (categoryTotals[item.category] || 0) + parseFloat(item.amount);
    });

    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    // Pie Chart
    new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{ data: values }]
        }
    });

    // Bar Chart
    new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{ data: values }]
        }
    });
}
