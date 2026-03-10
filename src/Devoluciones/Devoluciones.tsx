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
  Search,
  Calendar,
  Package2,
  User,
  Hash,
  AlertCircle
} from 'lucide-react';

interface DevolucionesProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

const Devoluciones: React.FC<DevolucionesProps> = ({ onLogout, onNavigate }) => {
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [fechaDevolucion, setFechaDevolucion] = useState('09/03/2026');
  const [estadoAparato, setEstadoAparato] = useState('Bueno - Uso normal');
  const [requiereMantenimiento, setRequiereMantenimiento] = useState(false);
  const [observaciones, setObservaciones] = useState('');

  const activeLoans = [
    { id: 'PR-001', beneficiario: 'María González García', aparato: 'Silla de ruedas estándar', fechaPrestamo: '2026-03-01', fechaEsperada: '2026-04-01', cantidad: 1 },
    { id: 'PR-002', beneficiario: 'José Luis Ramírez', aparato: 'Muletas de aluminio', fechaPrestamo: '2026-03-02', fechaEsperada: '2026-04-02', cantidad: 1 },
    { id: 'PR-003', beneficiario: 'Carlos Méndez Pérez', aparato: 'Bastón de apoyo', fechaPrestamo: '2026-03-03', fechaEsperada: '2026-04-03', cantidad: 1 },
  ];

  const selectedLoan = activeLoans.find(loan => loan.id === selectedLoanId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const handleRegistrarDevolucion = () => {
    // Aquí iría la lógica para registrar la devolución
    console.log({
      prestamo: selectedLoanId,
      fechaDevolucion,
      estadoAparato,
      requiereMantenimiento,
      observaciones
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
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={() => onNavigate('dashboard')} />
          <NavItem icon={<Package size={20} />} label="Inventario" onClick={() => onNavigate('inventario')} />
          <NavItem icon={<ArrowLeftRight size={20} />} label="Préstamos" onClick={() => onNavigate('prestamos')} />
          <NavItem icon={<RotateCcw size={20} />} label="Devoluciones" active onClick={() => onNavigate('devoluciones')} />
          <NavItem icon={<Users size={20} />} label="Beneficiarios" onClick={() => {}} />
          <NavItem icon={<BarChart3 size={20} />} label="Reportes" onClick={() => {}} />
          <NavItem icon={<UserCircle size={20} />} label="Usuarios" onClick={() => {}} />
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
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Devoluciones de Aparatos</h2>
            <p className="text-slate-500 font-medium mt-1">Registrar devolución de aparatos prestados</p>
          </div>

          <div className="grid grid-cols-3 gap-8 items-start">
            {/* Loans List */}
            <div className="col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 px-2">Préstamos Activos</h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar préstamo..." 
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-3 h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 pr-2">
                {activeLoans.map(loan => (
                  <button 
                    key={loan.id}
                    onClick={() => setSelectedLoanId(loan.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      selectedLoanId === loan.id 
                        ? 'bg-blue-50 border-blue-200 shadow-sm' 
                        : 'bg-white hover:bg-slate-50/70 border-slate-100'
                    }`}>
                    <p className="font-bold text-sm text-slate-800">{loan.id}</p>
                    <p className="text-sm text-slate-600 font-medium">{loan.beneficiario}</p>
                    <p className="text-xs text-slate-400 font-medium">{loan.aparato}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Return Details */}
            {selectedLoan ? (
              <div className="col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                {/* Loan Information */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Información del Préstamo</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Hash className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">ID Préstamo</p>
                          <p className="text-base font-bold text-slate-800">{selectedLoan.id}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Package2 className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Aparato</p>
                          <p className="text-base font-bold text-slate-800">{selectedLoan.aparato}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Fecha de préstamo</p>
                          <p className="text-base font-bold text-slate-800">{formatDate(selectedLoan.fechaPrestamo)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Beneficiario</p>
                          <p className="text-base font-bold text-slate-800">{selectedLoan.beneficiario}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Package2 className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Cantidad</p>
                          <p className="text-base font-bold text-slate-800">{selectedLoan.cantidad}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Fecha esperada</p>
                          <p className="text-base font-bold text-slate-800">{formatDate(selectedLoan.fechaEsperada)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Return Form */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Registrar Devolución</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Fecha de devolución</label>
                      <input
                        type="text"
                        value={fechaDevolucion}
                        onChange={(e) => setFechaDevolucion(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Estado del aparato</label>
                      <select
                        value={estadoAparato}
                        onChange={(e) => setEstadoAparato(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                      >
                        <option>Bueno - Uso normal</option>
                        <option>Regular - Desgaste visible</option>
                        <option>Malo - Daños significativos</option>
                        <option>Inutilizable - No apto para préstamo</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={requiereMantenimiento}
                          onChange={(e) => setRequiereMantenimiento(e.target.checked)}
                          className="w-5 h-5 text-blue-600 rounded-lg focus:ring-blue-500/20 focus:ring-2 border-slate-300"
                        />
                        <span className="text-sm font-medium text-slate-700">Requiere mantenimiento o reparación</span>
                      </label>
                      {requiereMantenimiento && (
                        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-xl">
                          <AlertCircle size={18} />
                          <p className="text-xs font-medium">El aparato será marcado para revisión técnica</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Observaciones</label>
                      <textarea
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        placeholder="Notas sobre el estado del aparato, daños encontrados, o comentarios adicionales..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 min-h-[100px] resize-none"
                      />
                    </div>

                    <button
                      onClick={handleRegistrarDevolucion}
                      className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      Registrar Devolución
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Selecciona un préstamo</h3>
                  <p className="text-slate-500 font-medium mt-1">Selecciona un préstamo activo de la lista para registrar su devolución</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
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

export default Devoluciones;