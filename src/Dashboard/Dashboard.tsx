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
  Box,
  Wrench,
  AlertTriangle,
  TrendingUp,
  HeartPulse,
  X,
  History
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, onNavigate }) => {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const activities = [
    { icon: <ArrowLeftRight size={18} />, title: "Préstamo registrado", subtitle: "Silla de ruedas estándar", user: "María González", time: "Hace 2 horas", iconColor: "bg-blue-50 text-blue-600" },
    { icon: <RotateCcw size={18} />, title: "Devolución completada", subtitle: "Muletas de aluminio", user: "José Ramírez", time: "Hace 5 horas", iconColor: "bg-emerald-50 text-emerald-600" },
    { icon: <Package size={18} />, title: "Nuevo aparato", subtitle: "Andadera con ruedas", user: "Admin", time: "Hace 1 día", iconColor: "bg-purple-50 text-purple-600" },
    { icon: <Wrench size={18} />, title: "Mantenimiento", subtitle: "Silla eléctrica", user: "Taller", time: "Hace 2 días", iconColor: "bg-amber-50 text-amber-600" },
    { icon: <ArrowLeftRight size={18} />, title: "Préstamo registrado", subtitle: "Bastón de apoyo", user: "Ana López", time: "Hace 3 días", iconColor: "bg-blue-50 text-blue-600" },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans relative overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col p-6 h-full">
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
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active onClick={() => onNavigate('dashboard')} />
          <NavItem icon={<Package size={20} />} label="Inventario" onClick={() => onNavigate('inventario')} />
          <NavItem icon={<ArrowLeftRight size={20} />} label="Préstamos" onClick={() => onNavigate('prestamos')} />
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
      <main className="flex-1 overflow-y-auto h-full scroll-smooth">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-20">
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Sistema de Control de Inventarios</h1>
          <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </header>

        <div className="p-10 space-y-8 pb-20">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Resumen General</h2>
              <p className="text-slate-500 font-medium mt-1">Bienvenido al sistema de control de inventarios y préstamos</p>
            </div>
            <button 
              onClick={() => setIsActivityModalOpen(true)}
              className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 py-2.5 px-5 rounded-2xl transition-all"
            >
              <History size={18} />
              <span>Actividad Reciente</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6">
            <StatCard icon={<Box size={24} />} iconColor="bg-emerald-500" value="42" label="Aparatos Disponibles" trend="+5 este mes" trendColor="text-emerald-500" />
            <StatCard icon={<ArrowLeftRight size={24} />} iconColor="bg-blue-500" value="28" label="Aparatos Prestados" trend="15 activos" trendColor="text-blue-500" />
            <StatCard icon={<Wrench size={24} />} iconColor="bg-amber-500" value="7" label="En Mantenimiento" trend="3 por reparar" trendColor="text-amber-500" />
            <StatCard icon={<AlertTriangle size={24} />} iconColor="bg-rose-500" value="3" label="Préstamos Vencidos" trend="Requiere atención" trendColor="text-rose-500" />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">Actividad Mensual</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Préstamos vs Devoluciones</p>
                </div>
                <TrendingUp size={20} className="text-emerald-500" />
              </div>
              <div className="h-64 flex items-end justify-between gap-4 px-2">
                {[12, 15, 18, 14, 21, 17].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                    <div className="w-full bg-blue-50 group-hover:bg-blue-100 transition-colors rounded-t-lg relative flex items-end justify-center" style={{ height: `${h * 4}px` }}>
                      <div className="w-1.5 h-full bg-blue-500/20 group-hover:bg-blue-500/40 rounded-full mb-1"></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">Inventario por Categoría</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Distribución actual</p>
                </div>
                <Package size={20} className="text-blue-500" />
              </div>
              <div className="h-64 flex items-end justify-between gap-3 px-2">
                {[15, 22, 18, 30, 12].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3">
                    <div className="w-full bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20" style={{ height: `${h * 6}px` }}></div>
                    <span className="text-[10px] font-bold text-slate-400 text-center leading-tight">{['Sillas', 'Muletas', 'Andaderas', 'Bastones', 'Otros'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>
      </main>

      {/* Modal de Historial de Actividad */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsActivityModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[80vh]">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2.5 rounded-2xl">
                  <History className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Historial de Actividad</h3>
                  <p className="text-sm text-slate-500 font-medium">Todos los movimientos del sistema</p>
                </div>
              </div>
              <button onClick={() => setIsActivityModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              <div className="space-y-2">
                {activities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
                {activities.map((activity, index) => (
                  <ActivityItem key={`extra-${index}`} {...activity} time={`${parseInt(activity.time.split(' ')[1]) + 1} días`} />
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button onClick={() => setIsActivityModalOpen(false)} className="px-8 py-3 text-sm font-bold text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl transition-all">
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
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm text-left ${active ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
    {icon}
    <span>{label}</span>
  </button>
);

const StatCard = ({ icon, iconColor, value, label, trend, trendColor }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
    <div className={`${iconColor} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-current/20`}>{icon}</div>
    <div>
      <h3 className="text-3xl font-extrabold text-slate-900">{value}</h3>
      <p className="text-sm font-medium text-slate-500 mt-1">{label}</p>
      <p className={`text-[10px] font-bold mt-2 uppercase tracking-wider ${trendColor}`}>{trend}</p>
    </div>
  </div>
);

const ActivityItem = ({ icon, title, subtitle, user, time, iconColor }: any) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColor}`}>{icon}</div>
      <div>
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-slate-900">{user}</p>
      <p className="text-xs text-slate-500 font-medium">{time}</p>
    </div>
  </div>
);

export default Dashboard;
