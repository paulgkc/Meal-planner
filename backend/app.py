backend/app.py Contents: from fastapi import FastAPI from fastapi.middleware.cors import CORSMiddleware from pydantic import BaseModel from typing import List, Dict import os from planner import load_recipes, filter_recipes, generate_plan, aggregate_shopping_list
BASE_DIR = os.path.dirname(os.path.abspath(file))
RECIPES_PATH = os.path.join(BASE_DIR, "recipes_seed.json")
RECIPES = load_recipes(RECIPES_PATH)

app = FastAPI(title="Family Meal Planner API")

app.add_middleware(
CORSMiddleware,
allow_origins=[""],
allow_methods=[""],
allow_headers=["*"],
)

class Preferences(BaseModel):
kids_ages: List[int] = []
disliked_ingredients: List[str] = []
max_time_mins: int = 45
targets: Dict[str,int] = {"chicken":2, "ground_beef":2, "fish":2, "vegetarian":1}

@app.get("/recipes")
def get_recipes():
return RECIPES

@app.post("/generate")
def generate(pref: Preferences):
# filter recipes
filtered = filter_recipes(RECIPES, pref.max_time_mins, pref.disliked_ingredients)
plan = generate_plan(filtered, pref.targets)
shopping = aggregate_shopping_list(plan)
return {"plan": plan, "shopping": shopping}

simple persistence: save last plan to file
@app.post("/save_plan")
def save_plan(data: Dict):
out_path = os.path.join(BASE_DIR, "last_plan.json")
with open(out_path, "w", encoding="utf-8") as f:
import json
json.dump(data, f, indent=2)
return {"status":"saved", "path": out_path}

@app.get("/load_plan")
def load_plan():
out_path = os.path.join(BASE_DIR, "last_plan.json")
if not os.path.exists(out_path):
return {"plan": None}
import json
with open(out_path, "r", encoding="utf-8") as f:
data = json.load(f)
return {"plan": data}
