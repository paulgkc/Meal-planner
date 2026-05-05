frontend/src/PlanView.js Contents: import React from "react";
export default function PlanView({ planData, onSave }) {
if (!planData) return null;
const { plan, shopping } = planData;

const downloadShopping = () => {
const lines = Object.keys(shopping).map(k => ${k} x ${shopping[k]});
const blob = new Blob([lines.join("\n")], { type: "text/plain" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "shopping_list.txt";
a.click();
};

return (
<div>
<h2>Your 7-day plan</h2>
<ol>
{plan.map((m, idx) => (
<li key={idx}>
<strong>{m.title}</strong> — {m.main_protein} — {m.total_time_mins} mins
<div style={{fontSize: "0.9em"}}>Ingredients: {m.ingredients.join(", ")}</div>
</li>
))}
</ol>
<h3>Shopping list (aggregated)</h3>
<ul>
{Object.keys(shopping).map(k => <li key={k}>{k} x {shopping[k]}</li>)}
</ul>
<button onClick={downloadShopping}>Download shopping list</button>
<button onClick={() => onSave(planData)} style={{marginLeft:10}}>Save plan</button>
</div>
);
}
