import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import React from "react";

const addTodo = async (newTodo: FormData) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/todos/', newTodo);
  return response.data;
}

export function AddTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    }
  });

  const hundleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);
    mutation.mutate(formdata);
  }

  return (
    <form onSubmit={hundleSubmit}>
      <input type="hidden" name="userId" value={1} />
      <input type="hidden" name="completed" value="false" />
      <input type="text" name="title" placeholder="新しいTodoを入力" required />
      <button type="submit">追加する</button>
    </form>
  )
}
