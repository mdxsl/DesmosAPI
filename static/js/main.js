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
        alert(`${result.message} Assigned ID: ${result.graph_id}`);
    } else {
        alert("Failed to save graph.");
    }
}

// Load Graph
async function loadGraph() {
    const graphID = document.getElementById('loadID').value;
    if (!graphID) {
        alert("Please enter a valid graph ID.");
        return;
    }

    const response = await fetch(`/api/graphs/${graphID}`);
    const result = await response.json();

    if (response.ok) {
        calculator.setState(result.graph.state);
        alert(`Loaded graph: "${result.graph.title}"`);
    } else {
        alert(result.detail || "Error loading graph.");
    }
}

// Generate expressions
async function generateExpression() {
    const response = await fetch('/api/generate-expression', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            function_type: "fourier_series",
            terms: 4
        })
    })

    const result = await response.json();
    if (response.ok) {
        calculator.setExpression({ id: 'fourier1', latex: result.latex });
    } else {
        alert("Failed to generate expression.");
    }
}