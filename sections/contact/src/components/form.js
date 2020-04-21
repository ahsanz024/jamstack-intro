import React, { useReducer } from 'react';
import styles from './form.module.css';

const INITIAL_STATE = {
  name: '',
  subject: '',
  email: '',
  body: '',
  status: 'IDLE'
};

/**
 * 
 * @param {*} state current state
 * @param {*} action { 'type': 'doStuff', name: 'Jason' /* could be anything we want it to be, e.g. `name` *\/ }
 * 
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'updateFieldValue':
      return {...state, [action.field]: [action.value] };
      
    case 'updateStatus':
      return {...state, 'status': action.status };
  
    case 'reset':
    default:
      return INITIAL_STATE;
  }
}

const Form = () => {
  // state: current state
  // dispatcher: di
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setStatus = status => dispatch({type: 'updateStatus', status})

  // CURRYING FUNCTION
  // takes in 1 param, then returns another function, with the second param.
  const updateFieldValue = field => event => {
    dispatch({
      type: 'updateFieldValue',
      field,
      value: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    // TODO: actually send form
    console.log(state)

    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(state)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      setStatus('SUCCESS');
    })
    .catch(e => {
      console.error(e);
      setStatus('ERROR');
    })
  }

  if (state.status === 'SUCCESS') {
    return (
      <p className={styles.success}>Message Sent!
        <button 
        className={`${styles.button} ${styles.centered}`}
        type='reset'
        onClick={() => dispatch({type: 'reset'})}
        >Reset</button>
      </p>
    )
  }

  return (
    <>
      {state.status === 'ERROR' && (
        <p className={styles.error}>Something Went Wrong!</p>
      )}
      <form className={`${styles.form} ${state.status === 'PENDING' && styles.pending}`} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Name
          <input className={styles.input} name="name" type="text" value={state.name} onChange={updateFieldValue('name')}/>
        </label>
        <label className={styles.label}>
          Email
          <input className={styles.input} name="email" type="email" value={state.email} onChange={updateFieldValue('email')}/>
        </label>
        <label className={styles.label}>
          Subject
          <input className={styles.input} name="subject" type="text" value={state.subject} onChange={updateFieldValue('subject')}/>
        </label>
        <label className={styles.label}>
          Body
          <textarea className={styles.input} name="subject" value={state.body} onChange={updateFieldValue('body')}/>
        </label>
        <button className={styles.button}>Send</button>
      </form>
    </>
  )
}

export default Form;