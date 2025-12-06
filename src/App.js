import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import './App.css';
import axios from 'axios';

function App() {
  const [step, setStep] = useState('choice'); // 'choice', 'login', 'register'

  const handleChoice = (choice) => {
    setStep(choice); // 'login' ou 'register'
  };

  const handleBack = () => {
    setStep('choice'); // voltar para a tela de escolha
  };

  return (
    <div>
      <h1>Final Frame App</h1>

      {step === 'choice' && (
        <div className="choice-container">
          <p>Você quer fazer Login ou Registrar?</p>
          <button onClick={() => handleChoice('login')}>Login</button>
          <button onClick={() => handleChoice('register')}>Registrar</button>
        </div>
      )}

      {step === 'login' && (
        <div>
          <Login />
          <button className="back-button" onClick={handleBack}>Voltar</button>
        </div>
      )}

      {step === 'register' && (
        <div>
          <Register />
          <button className="back-button" onClick={handleBack}>Voltar</button>
        </div>
      )}
    </div>
  );
}

export default App;
