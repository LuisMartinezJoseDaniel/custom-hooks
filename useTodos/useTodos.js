import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

//* Recuperar los todos
//* init -> inicializa el initalState
const init = () => {
  const todos = localStorage.getItem("todos");
  return JSON.parse(todos) || [];
};

export const useTodos = (initialState = []) => {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    //* Crear la accion
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };
    //* Mandar a llamar al reducer para despachar la
    dispatch(action);
  };

  const handleRemoveTodo = (id) => {
    const action = {
      type: "[TODO] Remove Todo",
      payload: id,
    };
    dispatch(action);
  };
  const handleToggleTodo = (id) => {
    const action = {
      type: "[TODO] Toggle Todo",
      payload: id,
    };
    dispatch(action);
  };


  return {
    todos,
    handleNewTodo,
    handleRemoveTodo,
    handleToggleTodo,
    todosCount: todos.length,
    pendingTodosCount: todos.filter((todo) => !todo.done).length,
  };
};
