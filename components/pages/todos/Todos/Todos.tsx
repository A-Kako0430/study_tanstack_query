import { AddTodo } from '@/components/todos/addTodo/addTodo';
import { TodoList } from '@/components/todos/todo/todo';
import classes from "./Todos.module.scss";

export default function Todos() {
  return (
    <main className={classes.main}>
      <TodoList />
      <AddTodo />
    </main>
  )
}
