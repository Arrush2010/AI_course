const form=document.querySelector("#form"), input=document.querySelector("#task"), list=document.querySelector("#list"), count=document.querySelector("#count"), msg=document.querySelector("#msg");
let tasks=[], filter="all";
try{const saved=JSON.parse(localStorage.getItem("studyTasks")||"[]");if(Array.isArray(saved))tasks=saved.filter(t=>t&&typeof t.text==="string"&&typeof t.done==="boolean")}catch{msg.textContent="Saved data could not be read; starting empty."}
function save(){localStorage.setItem("studyTasks",JSON.stringify(tasks))}
function render(){list.replaceChildren();const visible=tasks.filter(t=>filter==="all"||(filter==="active"&&!t.done)||(filter==="done"&&t.done));
for(const t of visible){const li=document.createElement("li"), check=document.createElement("input"), span=document.createElement("span"), edit=document.createElement("button"), del=document.createElement("button");
check.type="checkbox";check.checked=t.done;check.setAttribute("aria-label","Complete "+t.text);check.onchange=()=>{t.done=check.checked;save();render()};
span.textContent=t.text;if(t.done)span.className="done";edit.textContent="Edit";edit.onclick=()=>{const v=prompt("Edit task",t.text);if(v===null)return;if(!v.trim()){msg.textContent="Task cannot be empty.";return}t.text=v.trim().slice(0,160);save();render()};
del.textContent="Delete";del.onclick=()=>{tasks=tasks.filter(x=>x.id!==t.id);save();render()};li.append(check,span,edit,del);list.append(li)}
const done=tasks.filter(t=>t.done).length;count.textContent=`${tasks.length-done} active · ${done} completed`}
form.onsubmit=e=>{e.preventDefault();const text=input.value.trim();if(!text){msg.textContent="Enter a task.";return}tasks.push({id:Date.now()+"-"+Math.random(),text:text.slice(0,160),done:false});input.value="";msg.textContent="";save();render()};
document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{filter=b.dataset.filter;render()});render();
