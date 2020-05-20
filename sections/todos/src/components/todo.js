import React from "react";
import axios from "axios";
import styles from "./todo.module.css";

const Todo = ({ todo, reloadTodos }) => {
  const toggleCompleted = () => {
    axios
      .post("/api/toggle-completed", {
        id: todo._id,
        text: todo.text,
        completed: !todo.completed,
      })
      .then(reloadTodos);
  };

  const handleDelete = () => {
    axios
      .post("/api/delete-todo", {
        id: todo._id,
      })
      .then(reloadTodos);
  };

  return (
    <>
      <label htmlFor={`todo-toggle-${todo._id}`} className={styles.label}>
        Mark completed
      </label>
      <input
        id={`todo-toggle-${todo._id}`}
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
        className={styles.toggle}
      ></input>
      <p className={`${styles.text} ${todo.completed && styles.completed}`}>
        {todo.text}
      </p>
      <label htmlFor={`todo-delete-${todo._id}`} className={styles.label}>
        delete
      </label>
      <button className={styles.delete} onClick={handleDelete}>
        <span role="img" aria-label="delete" title="delete">
          ❌
        </span>
      </button>
    </>
  );
};

export default Todo;
