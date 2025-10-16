import type { Todo } from "../types/todo";
const BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";
export async function listTodos(): Promise<Todo[]> {
  const r = await fetch(`${BASE}/api/todos`); if(!r.ok) throw new Error("load fail"); return r.json();
}
export async function createTodo(title: string): Promise<Todo> {
  const r = await fetch(`${BASE}/api/todos`, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ title }) });
  if(!r.ok) throw new Error("create fail"); return r.json();
}
export async function updateTodo(id:number, patch: Partial<Pick<Todo,"title"|"done">>): Promise<Todo> {
  const r = await fetch(`${BASE}/api/todos/${id}`, { method:"PATCH", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(patch) });
  if(!r.ok) throw new Error("update fail"); return r.json();
}
export async function deleteTodo(id:number): Promise<void> {
  const r = await fetch(`${BASE}/api/todos/${id}`, { method:"DELETE" }); if(!r.ok) throw new Error("delete fail");
}
