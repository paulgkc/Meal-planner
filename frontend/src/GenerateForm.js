frontend/src/GenerateForm.js Contents: import React, { useState } from "react";
export default function GenerateForm({ onGenerate }) {
const [kidsAges, setKidsAges] = useState("8,5,3");
const [disliked, setDisliked] = useState("");
const [maxTime, setMaxTime] = useState(45);

const submit = (e) => {
e.preventDefault();
const ages = kidsAges.split(",").map(s => parseInt(s.trim())).filter(n=>!isNaN(n));
const dislikes = disliked.split(",").map(s => s.trim()).filter(s=>s);
onGenerate({ kids_ages: ages, disliked_ingredients: dislikes, max_time_mins: parseInt(maxTime) });
};

return (
<form onSubmit={submit} className="form">
<div>
<label>Kids' ages (comma separated)</label><br/>
<input value={kidsAges} onChange={e=>setKidsAges(e.target.value)} />
</div>
<div>
<label>Disliked ingredients (comma separated)</label><br/>
<input value={disliked} onChange={e=>setDisliked(e.target.value)} placeholder="e.g. mushrooms, cilantro"/>
</div>
<div>
<label>Max time per meal (minutes)</label><br/>
<input value={maxTime} onChange={e=>setMaxTime(e.target.value)} />
</div>
<div style={{marginTop:10}}>
<button type="submit">Generate 7-day plan</button>
</div>
</form>
);
}
