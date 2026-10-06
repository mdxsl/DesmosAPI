// Desmos Calculator
const elt = document.getElementById('calculator')
const calculator = Desmos.GraphingCalculator(elt);

// Default Expression
calculator.setExpression({id: 'expr1', latex: 'y=x^2'})

// Save Graph
async function saveGraph() {
    const title = document.getElementById('graphTitle').value || "Untitled graph";
    const graphState = calculator.getState();

    const response = await fetch('/api/graphs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: title,
            description: "Saved from FastAPI app",
            state: graphState
        })
    });

    const result = await response.json();
    if (response.ok) {
        alert('${result.message} Assigned ID: ${result.graph_id}');
    } else {
        alert("Failed to save graph.");
    }
}