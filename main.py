import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

load_dotenv()

DESMOS_API_KEY = os.getenv("DESMOS_API_KEY")

app = FastAPI(title="Desmos + FastAPI Integration")

app.mount("/static", StaticFiles(directory="static"), name="static")

SAVED_GRAPHS: Dict[int, Dict[str, Any]] = {}
graph_id_counter = 1

class SaveGraphRequest(BaseModel):
    title: str
    description: str = ""
    state: Dict[str, Any]

class GenerateExpressionRequest(BaseModel):
    function_type: str
    terms: int = 3

@app.get("/", response_class=HTMLResponse)
def get_home_page():
    with open("templates/index.html", "r", encoding="utf-8") as f:
        html_content = f.read()

    html_content = html_content.replace("{{ DESMOS_API_KEY }}", DESMOS_API_KEY or "")
    return HTMLResponse(content=html_content)

@app.post("/api/graphs", status_code=201)
def save_graph(payload: SaveGraphRequest):
    global graph_id_counter

    new_id = graph_id_counter
    SAVED_GRAPHS[new_id] = {
        "id": new_id,
        "title": payload.title,
        "description": payload.description,
        "state": payload.state
    }
    graph_id_counter += 1

    return {
        "status": "success",
        "message": "Graph saved successfully.",
        "graph_id": new_id
    }

@app.get("/api/graphs/{graph_id}")
def get_graph(graph_id: int):
    if graph_id not in SAVED_GRAPHS:
        raise HTTPException(status_code=404, detail="Graph not found")

    return {
        "status": "success",
        "graph": SAVED_GRAPHS[graph_id]
    }

@app.post("/api/generate-expression")
def generate_expression(payload: GenerateExpressionRequest):
    if payload.function_type == "fourier_series":
        terms = [f"\\frac{{1}}{{{2*i+1}}}\\sin({2*i+1}x)" for i in range(payload.terms)]
        latex_str = "y=" + "+".join(terms)
        return {"status": "success", "latex": latex_str}
    ## add more expressions here
    
    raise HTTPException(status_code=400, detail="Unknown function type")