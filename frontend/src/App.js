frontend/src/App.js Contents: import React, { useState } from "react"; import GenerateForm from "./GenerateForm"; import PlanView from "./PlanView"; import { generatePlan, savePlan, loadPlan } from "./api";
export default function App() {
const [planData, setPlanData] = useState(null);
const [status, setStatus] = useState("");

const handleGenerate = async (prefs) => {
setStatus("Generating...");
try {
const data = await generatePlan(prefs);
setPlanData(data);
setStatus("Plan generated.");
} catch (e) {
console.error(e);
setStatus("Error generating plan.");
}
};

const handleSave = async (data) => {
setStatus("Saving...");
const r = await savePlan(data);
setStatus(JSON.stringify(r));
};

const handleLoad = async () => {
setStatus("Loading...");
const r = await loadPlan();
if (r.plan) {
setPlanData(r.plan);
setStatus("Loaded saved plan.");
} else {
setStatus("No saved plan.");
}
};

return (
<div style={{maxWidth:800, margin:"0 auto", padding:20}}>
<h1>Family Meal Planner</h1>
<div style={{marginBottom:20}}>
<button onClick={handleLoad}>Load last saved plan</button>
</div>
<GenerateForm onGenerate={handleGenerate} />
<div style={{marginTop:20}}>
{status && <div><em>{status}</em></div>}
</div>
<PlanView planData={planData} onSave={handleSave} />
</div>
);
}
