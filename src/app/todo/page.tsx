"use client";

import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { NavLink } from "../components/ui/navLink";
import { usePathname } from "next/navigation";

function TodoInput({
  input,
  setInput,
  onAdd,
}: {
  input: string;
  setInput: (val: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="新しいタスクを入力..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={onAdd}>追加</Button>
    </div>
  );
}

function TodoItem({
  todo,
  index,
  onDelete,
  onEdit,
}: {
  todo: string;
  index: number;
  onDelete: (index: number) => void;
  onEdit: (index: number, newTodo: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo);

  const handleSave = () => {
    onEdit(index, editText);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent className="p-4 flex justify-between items-center gap-2">
        {isEditing ? (
          <Input value={editText} onChange={(e) => setEditText(e.target.value)} />
        ) : (
          <span>{todo}</span>
        )}
        <div className="flex gap-2">
          {isEditing ? (
            <Button color="green" onClick={handleSave}>
              保存
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>編集</Button>
          )}
          <Button color="red" onClick={() => onDelete(index)}>
            削除
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TodoList({
  todos,
  onDelete,
  onEdit,
}: {
  todos: string[];
  onDelete: (index: number) => void;
  onEdit: (index: number, newTodo: string) => void;
}) {
  return (
    <div className="space-y-2">
      {todos.map((todo, index) => (
        <TodoItem key={index} index={index} todo={todo} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default function TodoApp() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const pathname = usePathname();

  const handleAdd = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInput("");
  };

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number, newTodo: string) => {
    const updated = [...todos];
    updated[index] = newTodo;
    setTodos(updated);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        {pathname === "/todo" && <NavLink href="/">Homeへ</NavLink>}
        <TodoInput input={input} setInput={setInput} onAdd={handleAdd} />
        <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </main>
  );
}
