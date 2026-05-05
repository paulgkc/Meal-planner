frontend/src/api.js Contents: const API_BASE = "http://127.0.0.1:8000";
export async function fetchRecipes() {
const r = await fetch(${API_BASE}/recipes);
return r.json();
}

export async function generatePlan(pref) {
const r = await fetch(${API_BASE}/generate, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(pref),
});
return r.json();
}

export async function savePlan(data) {
const r = await fetch(${API_BASE}/save_plan, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(data),
});
return r.json();
}

export async function loadPlan() {
const r = await fetch(${API_BASE}/load_plan);
return r.json();
}

