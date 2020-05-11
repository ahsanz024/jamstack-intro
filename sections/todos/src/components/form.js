import React, { useState } from "react";
import axios from "axios";
import styles from "./form.module.css";

const From = ({ reloadTodos }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (event) => {
    console.log("handleSUbmit");
    event.preventDefault();

    if (text === "") return;

    await axios.post("/api/create-todo", { text });

    setText("");
    reloadTodos();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Add a Todo
        <input
          type="text"
          className={styles.input}
          onChange={(event) => setText(event.target.value)}
        />
      </label>
      <button className={styles.button}>Save Todo</button>
    </form>
  );
};

export default From;
