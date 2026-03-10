import React from 'react';
import './Login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo">
          <img src="/path/to/logo.png" alt="Palabras de Esperanza" />
          <h1>Palabras de Esperanza</h1>
          <p>Centro Comunitario</p>
        </div>
        <h2>Sistema de Control de Inventarios</h2>
        <p>Gestión profesional de préstamos de aparatos ortopédicos para nuestra comunidad</p>
        <div className="login-features">
          <div className="login-feature">
            <span className="feature-icon">❤️</span>
            <h3>Control Eficiente</h3>
            <p>Gestión completa de inventario y préstamos</p>
          </div>
          <div className="login-feature">
            <span className="feature-icon">🤝</span>
            <h3>Ayuda Comunitaria</h3>
            <p>Servicio digno para quienes lo necesitan</p>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form-container">
          <h3>Iniciar Sesión</h3>
          <p>Ingresa tus credenciales para acceder al sistema</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" id="email" placeholder="usuario@ejemplo.com" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" placeholder="********" />
            </div>
            <div className="form-options">
              <div className="form-check">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Recordarme</label>
              </div>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <button type="submit" className="login-button">Iniciar sesión</button>
          </form>
          <p className="login-exclusive">Sistema exclusivo para personal autorizado del Centro Comunitario</p>
        </div>
        <div className="login-help">
          <p>¿Necesitas ayuda? <a href="#">Contacta al administrador del sistema</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
