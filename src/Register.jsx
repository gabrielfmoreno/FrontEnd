import axios from 'axios';
import { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/auth/register', {
        username,
        password,
      });

      // Mensagem fixa SEM usar response.data
      setMessage('Usuário registrado com sucesso!');
      
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(
          typeof error.response.data === 'string'
            ? error.response.data
            : 'Erro ao registrar usuário'
        );
      } else {
        setMessage('Erro de conexão com o backend');
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
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
      <button type="submit">Registrar</button>
      {message && (
        <p className={message.includes('Erro') ? 'error-message' : ''}>
          {message}
        </p>
      )}
    </form>
  );
}

export default Register;
