import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Palabras de Esperanza</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active"><a href="#">Dashboard</a></li>
            <li><a href="#">Inventario</a></li>
            <li><a href="#">Préstamos</a></li>
            <li><a href="#">Devoluciones</a></li>
            <li><a href="#">Beneficiarios</a></li>
            <li><a href="#">Reportes</a></li>
            <li><a href="#">Usuarios</a></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <p>Juan Delgado</p>
            <span>Administrador</span>
          </div>
          <a href="#" className="logout-btn">Cerrar sesión</a>
        </div>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>Resumen General</h1>
          <p>Bienvenido al sistema de control de inventarios y préstamos</p>
        </header>
        <div className="summary-cards">
          <div className="card">
            <h3>42</h3>
            <p>Aparatos Disponibles</p>
          </div>
          <div className="card">
            <h3>28</h3>
            <p>Aparatos Prestados</p>
          </div>
          <div className="card">
            <h3>7</h3>
            <p>En Mantenimiento</p>
          </div>
          <div className="card">
            <h3>3</h3>
            <p>Préstamos Vencidos</p>
          </div>
        </div>
        <div className="charts">
          <div className="chart-container">
            <h3>Actividad Mensual</h3>
            {/* Insert chart component here */}
          </div>
          <div className="chart-container">
            <h3>Inventario por Categoría</h3>
            {/* Insert chart component here */}
          </div>
        </div>
        <div className="recent-activity">
          <h3>Actividad Reciente</h3>
          <ul>
            <li>Préstamo registrado - Silla de ruedas estándar</li>
            <li>Devolución completada - Muletas</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
