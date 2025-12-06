import React, { useState } from 'react';
import api from './services/api'; // sua instância do axios

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });

      // verifica se response e response.data existem
      if (response && response.data) {
        setMessage(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
      } else {
        setMessage('Login realizado (sem retorno do backend)');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data));
      } else {
        setMessage('Erro de conexão com o backend');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className={message.includes('Erro') ? 'error-message' : 'success-message'}>{message}</p>}
    </div>
  );
}

export default Login;
