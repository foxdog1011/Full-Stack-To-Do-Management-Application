
import React, { useState } from 'react';
import { loginUser } from '../api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(username, password);
      // 將 token 存儲在本地存儲或上下文中
      localStorage.setItem('token', token);
      // 重定向到儀表板或其他頁面
      window.location.href = '/dashboard';
    } catch (error) {
      alert('登入失敗，請檢查您的帳號和密碼。');
    }
  };
  
  return (
    <form onSubmit={handleLogin}>
      <input 
        type="text" 
        placeholder="用戶名" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="密碼" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">登入</button>
    </form>
  );
};

export default Login;
