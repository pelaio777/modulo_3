


import { useState } from 'react';
import Login from './Inicio de sesión/Login';
import Dashboard from './Dashboard/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      {isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />}
    </>
  )
}

export default App
