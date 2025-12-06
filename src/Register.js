import React, { useState } from 'react';
import api from './services/api'; // sua instância do axios

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Faz o registro no backend
      await api.post('/auth/register', { username, password });

      // Mensagem fixa sem mostrar dados do backend
      setMessage('Usuário registrado com sucesso!');
      
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(
          typeof err.response.data === 'string'
            ? err.response.data
            : 'Erro ao registrar usuário'
        );
      } else {
        setMessage('Erro de conexão com o backend');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar</h2>
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
      </form>

      {message && (
        <p className={message.includes('Erro') ? 'error-message' : 'success-message'}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Register;
