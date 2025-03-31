"use client";

import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { NavLink } from "../components/ui/navLink";
import { usePathname } from "next/navigation";
import { Todo, TodoCreateInput, todoService } from "@/services/todo.services";

interface TodoInputProps {
  input: string;
  setInput: (val: string) => void;
  onAdd: () => void;
}

function TodoInput({ input, setInput, onAdd }: TodoInputProps) {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="新しいタスクを入力..."
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button onClick={onAdd}>追加</Button>
    </div>
  );
}

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

function TodoItem({ todo, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.title);

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <Card>
      <CardContent className="p-4 flex justify-between items-center gap-2">
        {isEditing ? (
          <Input
            value={editText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        ) : (
          <span>{todo.title}</span>
        )}
        <div className="flex gap-2">
          {isEditing ? (
            <Button onClick={handleSave}>保存</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>編集</Button>
          )}
          <Button onClick={() => onDelete(todo.id)}>削除</Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

function TodoList({ todos, onDelete, onEdit }: TodoListProps) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const pathname = usePathname();

  // Fetch todos when component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await todoService.getAll();
        setTodos(data);
        setError("");
      } catch (err) {
        console.error("Error fetching todos:", err);
        setError("Todoの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (input.trim() === "") return;

    try {
      const todoData: TodoCreateInput = { title: input };
      const newTodo = await todoService.create(todoData);
      setTodos([...todos, newTodo]);
      setInput("");
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Todoの追加に失敗しました。");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await todoService.delete(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("Todoの削除に失敗しました。");
    }
  };

  const handleEdit = async (id: number, newTitle: string) => {
    try {
      const todoData: TodoCreateInput = { title: newTitle };
      const updatedTodo = await todoService.update(id, todoData);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      console.error("Error updating todo:", err);
      setError("Todoの更新に失敗しました。");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        {pathname === "/todo" && <NavLink href="/">Homeへ</NavLink>}
        <TodoInput input={input} setInput={setInput} onAdd={handleAdd} />

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        {loading ? (
          <div className="text-center py-4">読み込み中...</div>
        ) : (
          <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </div>
    </main>
  );
}
