import React from 'react';
import styles from './form.module.css';


const form = () => {

  const handleSubmit = event => {
    event.preventDefault();
    // TODO: actually send form
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <input className={styles.input} name="name" type="text"/>
      </label>
      <label className={styles.label}>
        Email
        <input className={styles.input} name="email" type="email"/>
      </label>
      <label className={styles.label}>
        Subject
        <input className={styles.input} name="subject" type="text"/>
      </label>
      <label className={styles.label}>
        Body
        <textarea className={styles.input} name="subject"/>
      </label>
      <button className={styles.button}>Send</button>
    </form>
  )
}

export default form;