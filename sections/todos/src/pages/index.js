import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import axios from "axios";
import Todo from "../components/todo";

export default () => {
  const [status, setStatus] = useState("loading");
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    let cancelled = false;

    if (status !== "loading") return;

    axios("/api/get-all-todos").then((result) => {
      if (cancelled === true) return;

      if (result.status !== 200) {
        console.error("Error loading todos!");
        console.error(result.error);
        return;
      }

      setTodos(result.data.todos);
      setStatus("loaded");
    });

    return () => {
      cancelled = true;
    };
  }, [status]);

  return (
    <main>
      <h1 className={style.heading}>JAMStack Todos</h1>
      {todos ? (
        <ul className={style.todos}>
          {todos.map((todo) => (
            <li key={todo.key} className={style.todo}>
              <Todo todo={todo} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={style.todos}>loading</p>
      )}
    </main>
  );
};
