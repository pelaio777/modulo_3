import React from 'react';
import { Mail, Lock, ArrowRight, HeartPulse, HeartHandshake, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Columna Izquierda */}
        <div className="flex flex-col space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-[#0066FF] p-3.5 rounded-2xl shadow-lg shadow-blue-500/20">
              <HeartPulse className="text-white w-8 h-8" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Palabras de Esperanza</h1>
              <p className="text-slate-500 text-sm font-medium">Centro Comunitario</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
              Sistema de Control de Inventarios
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-md">
              Gestión profesional de préstamos de aparatos ortopédicos para nuestra comunidad
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <ShieldCheck className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Control Eficiente</h3>
              <p className="text-slate-500 text-sm leading-snug">Gestión completa de inventario y préstamos</p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <HeartHandshake className="text-emerald-600 w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Ayuda Comunitaria</h3>
              <p className="text-slate-500 text-sm leading-snug">Servicio digno para quienes lo necesitan</p>
            </div>
          </div>
        </div>

        {/* Columna Derecha - Formulario */}
        <div className="flex flex-col space-y-6">
          <div className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-md mx-auto">
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900">Iniciar Sesión</h3>
              <p className="text-slate-500 mt-2 text-sm">Ingresa tus credenciales para acceder al sistema</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 group">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    placeholder="usuario@ejemplo.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700 ml-1">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center group cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white checked:bg-blue-600 checked:border-blue-600 transition-all"
                    />
                    <svg
                      className="absolute left-1 top-1 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="ml-3 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Recordarme</span>
                </label>
                <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline decoration-2 underline-offset-4 transition-all">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all"
              >
                <span>Iniciar sesión</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-100">
              <p className="text-[11px] text-center text-slate-400 font-medium leading-relaxed uppercase tracking-wider">
                Sistema exclusivo para personal autorizado <br /> del Centro Comunitario
              </p>
            </div>
          </div>

          <div className="bg-[#EBF5FF] border border-blue-100/50 py-4 px-6 rounded-2xl flex items-center justify-center group cursor-pointer hover:bg-blue-100 transition-all">
            <p className="text-sm font-semibold text-blue-700">
              ¿Necesitas ayuda? <span className="text-blue-600 font-bold ml-1 group-hover:underline">Contacta al administrador del sistema</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
