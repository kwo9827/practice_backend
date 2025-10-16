import { useEffect, useState } from "react";
import { createTodo, deleteTodo, listTodos, updateTodo } from "../api/todos";
import type { Todo } from "../types/todo";

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const load = async () => setTodos(await listTodos());
  useEffect(() => { load(); }, []);
  const add = async () => { if(!text.trim()) return; await createTodo(text.trim()); setText(""); await load(); };
  const toggle = async (t: Todo) => { await updateTodo(t.id, { done: !t.done }); await load(); };
  const remove = async (id: number) => { await deleteTodo(id); await load(); };
  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Todos</h1>
      <div>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="새 할 일..." />
        <button onClick={add}>추가</button>
      </div>
      <ul>
        {todos.map(t=>(
          <li key={t.id}>
            <label>
              <input type="checkbox" checked={t.done} onChange={()=>toggle(t)} />
              <span style={{ textDecoration: t.done ? "line-through" : "none", marginLeft: 8 }}>{t.title}</span>
            </label>
            <button onClick={()=>remove(t.id)} style={{ marginLeft: 8 }}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
