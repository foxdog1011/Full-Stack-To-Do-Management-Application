import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="新增待辦事項"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>新增</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    marginLeft: '10px',
    fontSize: '16px',
  },
};

export default TodoForm;
