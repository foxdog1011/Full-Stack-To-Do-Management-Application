import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: payload.id, username: payload.username || 'User' });
      fetchTodos();
    }
  }, [token]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (title) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/todos`,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([...todos, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/todos/${id}`,
        { completed: !todo.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>你的待辦事項</h2>
      <TodoForm onAdd={addTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
  },
};

export default Dashboard;
