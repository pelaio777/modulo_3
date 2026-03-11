import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ArrowLeftRight, 
  RotateCcw, 
  Users, 
  BarChart3, 
  UserCircle, 
  LogOut, 
  Bell,
  HeartPulse,
  User,
  Calendar,
  Clock,
  UserPlus,
  Box,
  History,
  X
} from 'lucide-react';

interface PrestamosProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

const Prestamos: React.FC<PrestamosProps> = ({ onLogout, onNavigate }) => {
  const [isRecentLoansModalOpen, setIsRecentLoansModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    beneficiario: '',
    aparato: '',
    cantidad: 1,
    fechaPrestamo: '2026-03-09',
    fechaDevolucion: '',
    observaciones: ''
  });

  const handleClear = () => {
    setFormData({
      beneficiario: '',
      aparato: '',
      cantidad: 1,
      fechaPrestamo: '2026-03-09',
      fechaDevolucion: '',
      observaciones: ''
    });
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-blue-600 p-2 rounded-xl">
            <HeartPulse className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">Palabras de Esperanza</h2>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Control de Inventarios</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
                  <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard"  onClick={() => onNavigate('dashboard')} />
                  <NavItem icon={<Package size={20} />} label="Inventario" onClick={() => onNavigate('inventario')} />
                  <NavItem icon={<ArrowLeftRight size={20} />} label="Préstamos" active onClick={() => onNavigate('prestamos')} />
                  <NavItem icon={<RotateCcw size={20} />} label="Devoluciones" onClick={() => onNavigate('devoluciones')} />
                  <NavItem icon={<Users size={20} />} label="Beneficiarios" onClick={() => onNavigate('beneficiarios')} />
                  <NavItem icon={<BarChart3 size={20} />} label="Reportes" onClick={() => onNavigate('reportes')} />
                  <NavItem icon={<UserCircle size={20} />} label="Usuarios" onClick={() => onNavigate('usuarios')} />
                </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
              JD
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Juan Delgado</p>
              <p className="text-xs text-slate-500 font-medium">Administrador</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-rose-500 text-sm font-bold px-2 hover:translate-x-1 transition-transform w-full text-left"
          >
            <LogOut size={18} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10">
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Sistema de Control de Inventarios</h1>
          <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </header>

        <div className="p-10 space-y-8">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Préstamos de Aparatos</h2>
              <p className="text-slate-500 font-medium mt-1">Registrar y consultar préstamos activos</p>
            </div>
            <button 
              onClick={() => setIsRecentLoansModalOpen(true)}
              className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 py-2.5 px-5 rounded-2xl transition-all"
            >
              <History size={18} />
              <span>Préstamos Recientes</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 items-start">
            {/* Form Section */}
            <div className="col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-lg font-bold text-slate-900 px-1">Registrar Nuevo Préstamo</h3>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Beneficiario */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                    <User size={16} className="text-slate-400" /> Beneficiario
                  </label>
                  <select 
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer text-slate-600 font-medium"
                    value={formData.beneficiario}
                    onChange={(e) => setFormData({...formData, beneficiario: e.target.value})}
                  >
                    <option value="">Seleccionar beneficiario</option>
                    <option value="1">María González</option>
                    <option value="2">José Ramírez</option>
                  </select>
                </div>

                {/* Aparato */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                    <Package size={16} className="text-slate-400" /> Aparato a prestar
                  </label>
                  <select 
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer text-slate-600 font-medium"
                    value={formData.aparato}
                    onChange={(e) => setFormData({...formData, aparato: e.target.value})}
                  >
                    <option value="">Seleccionar aparato</option>
                    <option value="1">Silla de ruedas estándar</option>
                    <option value="2">Muletas de aluminio</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Cantidad */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Cantidad</label>
                    <input 
                      type="number" 
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-600 font-medium"
                      value={formData.cantidad}
                      min="1"
                      onChange={(e) => setFormData({...formData, cantidad: parseInt(e.target.value)})}
                    />
                  </div>
                  {/* Fecha Prestamo */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                      <Calendar size={16} className="text-slate-400" /> Fecha de préstamo
                    </label>
                    <input 
                      type="date" 
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-600 font-medium"
                      value={formData.fechaPrestamo}
                      onChange={(e) => setFormData({...formData, fechaPrestamo: e.target.value})}
                    />
                  </div>
                </div>

                {/* Fecha Devolución */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                    <Calendar size={16} className="text-slate-400" /> Fecha estimada de devolución
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-600 font-medium placeholder:text-slate-300"
                    placeholder="dd/mm/aaaa"
                    value={formData.fechaDevolucion}
                    onChange={(e) => setFormData({...formData, fechaDevolucion: e.target.value})}
                  />
                </div>

                {/* Observaciones */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Observaciones</label>
                  <textarea 
                    rows={4}
                    placeholder="Notas adicionales sobre el préstamo..." 
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-400 resize-none text-slate-600 font-medium"
                    value={formData.observaciones}
                    onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={handleClear}
                    className="px-8 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-2xl transition-all border border-transparent hover:border-slate-200"
                  >
                    Limpiar
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
                  >
                    Registrar Préstamo
                  </button>
                </div>
              </form>
            </div>

            {/* Stats Section */}
            <div className="space-y-6">
              <StatMiniCard 
                icon={<Box size={20} />} 
                iconColor="bg-blue-50 text-blue-600"
                title="Préstamos Activos"
                value="15"
                subtitle="28 aparatos en préstamo"
              />
              <StatMiniCard 
                icon={<Clock size={20} />} 
                iconColor="bg-rose-50 text-rose-600"
                title="Vencidos"
                value="3"
                subtitle="Requieren seguimiento"
              />
              <StatMiniCard 
                icon={<UserPlus size={20} />} 
                iconColor="bg-emerald-50 text-emerald-600"
                title="Este Mes"
                value="12"
                subtitle="Nuevos préstamos"
              />
            </div>
          </div>


        </div>
      </main>

      {/* Modal Préstamos Recientes */}
      {isRecentLoansModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsRecentLoansModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[80vh]">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2.5 rounded-2xl">
                  <History className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Préstamos Recientes</h3>
                  <p className="text-sm text-slate-500 font-medium">Últimos préstamos registrados en el sistema</p>
                </div>
              </div>
              <button onClick={() => setIsRecentLoansModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Beneficiario</th>
                    <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Aparato</th>
                    <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha</th>
                    <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Devolución</th>
                    <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-4 font-bold text-slate-900 text-sm">María González</td>
                      <td className="px-4 py-4 text-sm text-slate-500 font-medium">Silla de ruedas estándar</td>
                      <td className="px-4 py-4 text-sm text-slate-500 font-medium">09/03/2026</td>
                      <td className="px-4 py-4 text-sm text-slate-500 font-medium">20/03/2026</td>
                      <td className="px-4 py-4">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-100">Activo</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button onClick={() => setIsRecentLoansModalOpen(false)} className="px-8 py-3 text-sm font-bold text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl transition-all">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm text-left ${
      active 
        ? 'bg-blue-50 text-blue-600 shadow-sm' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const StatMiniCard = ({ icon, iconColor, title, value, subtitle }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
    <div className="space-y-1">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
      <h4 className="text-2xl font-extrabold text-slate-900">{value}</h4>
      <p className="text-[10px] font-medium text-slate-500">{subtitle}</p>
    </div>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconColor} shadow-sm`}>
      {icon}
    </div>
  </div>
);

export default Prestamos;
