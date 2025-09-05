
const API_URL = process.env.REACT_APP_API_URL;

// 用戶註冊
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST', // 確保是 POST 請求
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '註冊失敗');
    }

    const data = await response.json();
    return data.message; // 假設返回的是成功消息
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// 用戶登入
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST', // 確保是 POST 請求
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '登入失敗');
    }

    const data = await response.json();
    return data.token; // 假設返回的是 token
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
