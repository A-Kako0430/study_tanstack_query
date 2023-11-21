"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetchTodos = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos/');
  return response.data;
}

export function TodoList() {
  const { isLoading, error, data } = useQuery<boolean, Error, Todo[]>({ queryKey: ['todos'], queryFn: fetchTodos});

  if (isLoading) {
    return <div>読み込み中・・・</div>;
  }

  if (error) {
    return <div>エラーが発生しました： {error.message}</div>;
  }

  return (
    <ul>
      {data?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
