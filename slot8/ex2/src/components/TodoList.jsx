import { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK": return [...state, action.task];
    case "DELETE_TASK": return state.filter(t => t.id !== action.id);
    default: return state;
  }
}

export default function TodoList() {
  const [tasks, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState("");

  const addTask = () => {
    if (!text.trim()) return;
    dispatch({ type: "ADD_TASK", task: { id: Date.now(), text } });
    setText("");
  };

  return (
    <div style={{ display:"flex", gap:"50px", padding:"40px", background:"#f4f5f7ff", minHeight:"300px" }}>

      <div>
        <input value={text} placeholder="Please input a Task" onChange={e=>setText(e.target.value)}
          style={{ padding:"8px", width:"250px", borderRadius:"4px", border:"none" }} />

        <button onClick={addTask}
          style={{ marginLeft:"10px", padding:"8px 15px", background:"#d63031", color:"white", border:"none", borderRadius:"4px" }}>
          Add Todo
        </button>
      </div>

      <div style={{ background:"#f5f5f5", color:"black", padding:"20px", borderRadius:"8px", minWidth:"250px" }}>
        <h3 style={{ textAlign:"center", marginTop:0 }}>Todo List</h3>

        {tasks.map(t => (
          <div key={t.id} style={{ display:"flex", justifyContent:"space-between", background:"white", padding:"8px", marginBottom:"5px", borderRadius:"4px" }}>
            <span>{t.text}</span>
            <button onClick={()=>dispatch({ type:"DELETE_TASK", id:t.id })}
              style={{ background:"#d63031", color:"white", border:"none", padding:"4px 8px", borderRadius:"4px" }}>
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
