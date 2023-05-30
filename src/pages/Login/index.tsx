import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
// import Logo from "../img/Logo.png"
// import Termo from "../Termo/index.tsx"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const history = useHistory();

  const handleClick = () => {
    history.push('../Termo/index.tsx');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
    setFormError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
    setFormError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === '') {
      setEmailError('Por favor, insira seu e-mail.');
    }

    if (password === '') {
      setPasswordError('Por favor, insira sua senha.');
    }

    if (email !== '' && password !== '') {
      // Lógica de validação do email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        setEmailError('Por favor, insira um e-mail válido.');
        return;
      }

      // Lógica de autenticação
    } else {
      setFormError('Por favor, insira todos os campos requisitados.');
    }
  };

  return (
    <div className="app-container">
      <div className="navbar">
        <img className="navbar-logo" alt="Logo Joinville Doa" />
        {/* src={Logo} */}
      </div>
      <div className="header">
        <p className="header-text">
          <b>Ainda não tem conta?</b>
        </p>
        <a
          className="signup-button"
          href="https://www.figma.com/file/7KwU7UoIU2iW4xSolD3h7f/Doa%C3%A7%C3%B5es---TCS?type=design&node-id=68-43&t=mpkc6DYF55IyaHKu-0"
        >
          <b>Cadastre-se</b>
        </a>
      </div>
      <div className="content-container">
        <div className="login-container">
          <h2 className="login-heading">Olá!</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                className={`login-input ${email !== '' ? 'filled' : ''}`}
                placeholder=" "
                value={email}
                onChange={handleEmailChange}
              />
              <label className={`login-label ${emailError ? 'error' : ''}`}>Seu e-mail</label>
              {emailError && <span className="error-message">{emailError}</span>}
            </div>
            <div className="input-container">
              <input
                type="password"
                className={`login-input ${password !== '' ? 'filled' : ''}`}
                placeholder=" "
                value={password}
                onChange={handlePasswordChange}
              />
              <label className={`login-label ${passwordError ? 'error' : ''}`}>Sua senha</label>
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>
            <button className="login-button" type="submit">
              Logar
            </button>
            {formError && <span className="form-error-message">{formError}</span>}
          </form>
        </div>
      </div>
      <div className="link-container">
        <Link to="/caminho-para-o-arquivo">
          <button className="external-link" onClick={handleClick}>
            Política de privacidade
          </button>
        </Link>
      </div>
      <div className="footer">
        <b>2023 ARShakir Inc. All rights reserved. -- Privacy Policy - Terms of Services</b>
      </div>
    </div>
  );
}

export default Login;