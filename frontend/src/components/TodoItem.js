// frontend/src/components/TodoItem.js
import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div style={styles.container}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
      />
      <span style={{ 
        ...styles.title, 
        textDecoration: todo.completed ? 'line-through' : 'none' 
      }}>
        {todo.title}
      </span>
      <button onClick={() => onDelete(todo._id)} style={styles.button}>刪除</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  title: {
    flex: 1,
    marginLeft: '10px',
  },
  button: {
    marginLeft: '10px',
    padding: '5px 10px',
  },
};

export default TodoItem;
