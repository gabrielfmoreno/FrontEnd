import axios from 'axios';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });
      setMessage(response.data); // aqui pega a resposta do backend
    } catch (error) {
      if (error.response) {
        // Erro retornado pelo backend (ex: 401)
        setMessage(error.response.data || 'Erro no login');
      } else {
        // Erro de rede ou outro
        setMessage('Erro de conexão');
      }
    }
  };

  return (
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
      {message && <p className={message.includes('Erro') ? 'error-message' : ''}>{message}</p>}
    </form>
  );
}

export default Login;
