import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  return (
    <header style={styles.header}>
      <h1>待辦事項管理</h1>
      <nav>
        {user ? (
          <>
            <span>歡迎, {user.username}</span>
            <button onClick={onLogout} style={styles.button}>登出</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>登入</Link>
            <Link to="/register" style={styles.link}>註冊</Link>
          </>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    padding: '10px',
    backgroundColor: '#282c34',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    margin: '0 10px',
    color: 'white',
    textDecoration: 'none',
  },
  button: {
    marginLeft: '10px',
    padding: '5px 10px',
  },
};

export default Header;
