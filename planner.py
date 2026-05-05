backend/planner.py
Contents:
import json
import random
from typing import List, Dict

def load_recipes(path: str) -> List[Dict]:
with open(path, "r", encoding="utf-8") as f:
return json.load(f)

def filter_recipes(recipes: List[Dict], max_time: int, disliked_ingredients: List[str]) -> List[Dict]:
disliked = set(i.lower() for i in disliked_ingredients)
def ok(r):
if r.get("total_time_mins", 999) > max_time:
return False
for ing in r.get("ingredients", []):
if any(d in ing.lower() for d in disliked):
return False
return True
return [r for r in recipes if ok(r)]

def generate_plan(recipes: List[Dict], targets: Dict[str,int]) -> List[Dict]:
# recipes: already filtered
# targets: desired counts per protein, e.g. {"chicken":2, "ground_beef":2, "fish":2, "vegetarian":1}
chosen = []
pool = recipes.copy()
random.shuffle(pool)

python

Copy code
# helper: pick N best for a protein by kid_friendly_score
def pick_n_for(protein, n):
    candidates = [r for r in pool if r.get("main_protein") == protein]
    candidates.sort(key=lambda x: x.get("kid_friendly_score", 0), reverse=True)
    picked = []
    for c in candidates:
        if len(picked) >= n:
            break
        if c not in chosen:
            picked.append(c)
    for p in picked:
        chosen.append(p)
        if p in pool:
            pool.remove(p)

for prot, cnt in targets.items():
    pick_n_for(prot, cnt)

# fill remaining days up to 7 with best kid-friendly remaining recipes
remaining_slots = 7 - len(chosen)
pool.sort(key=lambda x: x.get("kid_friendly_score", 0), reverse=True)
for r in pool:
    if remaining_slots <= 0:
        break
    if r not in chosen:
        chosen.append(r)
        remaining_slots -= 1

# if still <7 (not enough variety), allow repeats by reusing top recipes
if len(chosen) < 7:
    all_sorted = sorted(recipes, key=lambda x: x.get("kid_friendly_score",0), reverse=True)
    i = 0
    while len(chosen) < 7 and i < len(all_sorted):
        if all_sorted[i] not in chosen:
            chosen.append(all_sorted[i])
        i += 1

# final shuffle for ordering
random.shuffle(chosen)
return chosen[:7]

def aggregate_shopping_list(plan: List[Dict]) -> Dict[str,int]:
# naive ingredient counting: returns map ingredient -> occurrences
counts = {}
for meal in plan:
for ing in meal.get("ingredients", []):
k = ing.lower()
counts[k] = counts.get(k, 0) + 1
return counts
