import React, { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
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
  Download,
  CalendarDays,
  TrendingUp,
  ClipboardList,
  Wrench,
  FileText,
} from 'lucide-react';

interface ReportesProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

const Reportes: React.FC<ReportesProps> = ({ onLogout, onNavigate }) => {
  const [fechaInicio, setFechaInicio] = useState('2026-01-01');
  const [fechaFin, setFechaFin] = useState('2026-03-09');
  const [tipoReporte, setTipoReporte] = useState('General');
  const [categoria, setCategoria] = useState('Todas');

  const monthlyData = [
    { mes: 'Sep', prestamos: 12, devoluciones: 10 },
    { mes: 'Oct', prestamos: 15, devoluciones: 13 },
    { mes: 'Nov', prestamos: 18, devoluciones: 16 },
    { mes: 'Dic', prestamos: 14, devoluciones: 12 },
    { mes: 'Ene', prestamos: 20, devoluciones: 18 },
    { mes: 'Feb', prestamos: 17, devoluciones: 15 },
    { mes: 'Mar', prestamos: 22, devoluciones: 19 },
  ];

  const categoryData = [
    { name: 'Sillas de ruedas', value: 35, color: '#1d6fe9' },
    { name: 'Muletas', value: 28, color: '#10b981' },
    { name: 'Andaderas', value: 22, color: '#8b5cf6' },
    { name: 'Bastones', value: 15, color: '#f59e0b' },
  ];

  const utilizationData = [
    { name: 'Silla ruedas estándar', value: 85 },
    { name: 'Muletas aluminio', value: 72 },
    { name: 'Andadera ruedas', value: 68 },
    { name: 'Bastón apoyo', value: 45 },
    { name: 'Silla eléctrica', value: 30 },
  ];

  const beneficiariesData = [
    { rank: 1, name: 'María González', detail: '8 préstamos, 12 aparatos', value: 100 },
    { rank: 2, name: 'José Ramírez', detail: '6 préstamos, 8 aparatos', value: 74 },
    { rank: 3, name: 'Ana Flores', detail: '5 préstamos, 7 aparatos', value: 62 },
    { rank: 4, name: 'Carlos Méndez', detail: '4 préstamos, 5 aparatos', value: 48 },
    { rank: 5, name: 'Rosa Torres', detail: '4 préstamos, 5 aparatos', value: 48 },
  ];

  const inventorySummary = [
    {
      aparato: 'Silla de ruedas estándar',
      total: 10,
      disponible: 8,
      prestamo: 2,
      mantenimiento: 0,
      utilizacion: 85,
    },
    {
      aparato: 'Muletas de aluminio',
      total: 15,
      disponible: 10,
      prestamo: 5,
      mantenimiento: 0,
      utilizacion: 72,
    },
    {
      aparato: 'Andadera con ruedas',
      total: 8,
      disponible: 5,
      prestamo: 3,
      mantenimiento: 0,
      utilizacion: 68,
    },
  ];

  const totalPrestamos = 124;
  const totalDevoluciones = 112;
  const mantenimientos = 18;
  const duracionPromedio = 22;

  const maxValue = Math.max(...monthlyData.map((d) => Math.max(d.prestamos, d.devoluciones)));

  const linePointsPrestamos = monthlyData
    .map((d, i) => {
      const x = (i / (monthlyData.length - 1)) * 100;
      const y = 100 - (d.prestamos / maxValue) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  const linePointsDevoluciones = monthlyData
    .map((d, i) => {
      const x = (i / (monthlyData.length - 1)) * 100;
      const y = 100 - (d.devoluciones / maxValue) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  const pieStyle = useMemo(() => {
    const total = categoryData.reduce((acc, item) => acc + item.value, 0);
    let current = 0;

    const segments = categoryData.map((item) => {
      const start = (current / total) * 360;
      current += item.value;
      const end = (current / total) * 360;
      return `${item.color} ${start}deg ${end}deg`;
    });

    return {
      background: `conic-gradient(${segments.join(', ')})`,
    };
  }, [categoryData]);

 const handleExport = () => {
  const resumenGeneral = [
    { Métrica: 'Total Préstamos', Valor: totalPrestamos },
    { Métrica: 'Devoluciones', Valor: totalDevoluciones },
    { Métrica: 'Mantenimientos', Valor: mantenimientos },
    { Métrica: 'Duración Promedio', Valor: `${duracionPromedio} días` },
    { Métrica: 'Fecha inicio', Valor: fechaInicio },
    { Métrica: 'Fecha fin', Valor: fechaFin },
    { Métrica: 'Tipo de reporte', Valor: tipoReporte },
    { Métrica: 'Categoría', Valor: categoria },
  ];

  const actividadMensual = monthlyData.map((item) => ({
    Mes: item.mes,
    Préstamos: item.prestamos,
    Devoluciones: item.devoluciones,
  }));

  const distribucionCategorias = categoryData.map((item) => ({
    Categoría: item.name,
    Porcentaje: `${item.value}%`,
  }));

  const utilizacionAparatos = utilizationData.map((item) => ({
    Aparato: item.name,
    Utilización: `${item.value}%`,
  }));

  const principalesBeneficiarios = beneficiariesData.map((item) => ({
    Ranking: item.rank,
    Beneficiario: item.name,
    Detalle: item.detail,
    Nivel: `${item.value}%`,
  }));

  const resumenInventario = inventorySummary.map((item) => ({
    Aparato: item.aparato,
    Total: item.total,
    Disponible: item.disponible,
    'En Préstamo': item.prestamo,
    Mantenimiento: item.mantenimiento,
    Utilización: `${item.utilizacion}%`,
  }));

  const workbook = XLSX.utils.book_new();

  const wsResumen = XLSX.utils.json_to_sheet(resumenGeneral);
  const wsActividad = XLSX.utils.json_to_sheet(actividadMensual);
  const wsCategorias = XLSX.utils.json_to_sheet(distribucionCategorias);
  const wsUtilizacion = XLSX.utils.json_to_sheet(utilizacionAparatos);
  const wsBeneficiarios = XLSX.utils.json_to_sheet(principalesBeneficiarios);
  const wsInventario = XLSX.utils.json_to_sheet(resumenInventario);

  XLSX.utils.book_append_sheet(workbook, wsResumen, 'Resumen');
  XLSX.utils.book_append_sheet(workbook, wsActividad, 'Actividad Mensual');
  XLSX.utils.book_append_sheet(workbook, wsCategorias, 'Categorías');
  XLSX.utils.book_append_sheet(workbook, wsUtilizacion, 'Utilización');
  XLSX.utils.book_append_sheet(workbook, wsBeneficiarios, 'Beneficiarios');
  XLSX.utils.book_append_sheet(workbook, wsInventario, 'Inventario');

  XLSX.writeFile(workbook, 'Reporte_Inventario.xlsx');
};

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-blue-600 p-2 rounded-xl">
            <HeartPulse className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">Palabras de Esperanza</h2>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
              Control de Inventarios
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
                  <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard"  onClick={() => onNavigate('dashboard')} />
                  <NavItem icon={<Package size={20} />} label="Inventario" onClick={() => onNavigate('inventario')} />
                  <NavItem icon={<ArrowLeftRight size={20} />} label="Préstamos" onClick={() => onNavigate('prestamos')} />
                  <NavItem icon={<RotateCcw size={20} />} label="Devoluciones" onClick={() => onNavigate('devoluciones')} />
                  <NavItem icon={<Users size={20} />} label="Beneficiarios" onClick={() => onNavigate('beneficiarios')} />
                  <NavItem icon={<BarChart3 size={20} />} label="Reportes" active onClick={() => onNavigate('reportes')} />
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

      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10">
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">
            Sistema de Control de Inventarios
          </h1>
          <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </header>

        <div className="p-10 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Reportes y Estadísticas</h2>
              <p className="text-slate-500 font-medium mt-1">
                Análisis de inventario, préstamos y actividad
              </p>
            </div>

            <button
              onClick={handleExport}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
            >
              <Download size={18} />
              <span>Exportar Reporte</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <FilterField
              label="Fecha inicio"
              icon={<CalendarDays size={16} />}
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
            <FilterField
              label="Fecha fin"
              icon={<CalendarDays size={16} />}
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
            <SelectField
              label="Tipo de reporte"
              value={tipoReporte}
              onChange={(e) => setTipoReporte(e.target.value)}
              options={['General', 'Inventario', 'Préstamos', 'Mantenimiento']}
            />
            <SelectField
              label="Categoría"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              options={['Todas', 'Sillas de ruedas', 'Muletas', 'Andaderas', 'Bastones']}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
            <MetricCard
              icon={<TrendingUp size={20} />}
              iconWrap="bg-blue-50 text-blue-600"
              value="124"
              title="Total Préstamos"
              subtitle="↑ 15% vs mes anterior"
              subtitleColor="text-emerald-500"
            />
            <MetricCard
              icon={<BarChart3 size={20} />}
              iconWrap="bg-emerald-50 text-emerald-600"
              value="112"
              title="Devoluciones"
              subtitle="90% tasa de retorno"
              subtitleColor="text-emerald-500"
            />
            <MetricCard
              icon={<FileText size={20} />}
              iconWrap="bg-amber-50 text-amber-600"
              value="18"
              title="Mantenimientos"
              subtitle="6 preventivos, 12 correctivos"
              subtitleColor="text-slate-500"
            />
            <MetricCard
              icon={<CalendarDays size={20} />}
              iconWrap="bg-blue-50 text-blue-600"
              value="22 días"
              title="Duración Promedio"
              subtitle="Por préstamo"
              subtitleColor="text-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Actividad Mensual</h3>

              <div className="relative h-64 w-full">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  {[0, 25, 50, 75, 100].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="100"
                      y2={y}
                      stroke="#e2e8f0"
                      strokeDasharray="2 2"
                      strokeWidth="0.4"
                    />
                  ))}

                  {monthlyData.map((_, i) => {
                    const x = (i / (monthlyData.length - 1)) * 100;
                    return (
                      <line
                        key={i}
                        x1={x}
                        y1="0"
                        x2={x}
                        y2="100"
                        stroke="#e2e8f0"
                        strokeDasharray="2 2"
                        strokeWidth="0.3"
                      />
                    );
                  })}

                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="0.7"
                    points={linePointsPrestamos}
                  />
                  <polyline
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="0.7"
                    points={linePointsDevoluciones}
                  />

                  {monthlyData.map((d, i) => {
                    const x = (i / (monthlyData.length - 1)) * 100;
                    const yPrest = 100 - (d.prestamos / maxValue) * 100;
                    const yDev = 100 - (d.devoluciones / maxValue) * 100;

                    return (
                      <g key={i}>
                        <circle cx={x} cy={yPrest} r="1" fill="#2563eb" />
                        <circle cx={x} cy={yDev} r="1" fill="#14b8a6" />
                      </g>
                    );
                  })}
                </svg>

                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-500 px-1">
                  {monthlyData.map((d) => (
                    <span key={d.mes}>{d.mes}</span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-6 text-sm font-medium">
                <div className="flex items-center gap-2 text-blue-600">
                  <span className="w-3 h-1 bg-blue-600 rounded-full"></span>
                  <span>Préstamos</span>
                </div>
                <div className="flex items-center gap-2 text-teal-500">
                  <span className="w-3 h-1 bg-teal-500 rounded-full"></span>
                  <span>Devoluciones</span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Distribución por Categoría</h3>

              <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-4">
                <div
                  className="w-44 h-44 rounded-full shadow-sm"
                  style={pieStyle}
                ></div>

                <div className="space-y-4">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3 text-sm font-medium">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span style={{ color: item.color }}>
                        {item.name}: {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-xl font-bold text-slate-900 mb-5">Tasa de Utilización por Aparato</h3>

              <div className="space-y-5">
                {utilizationData.map((item) => (
                  <div key={item.name} className="grid grid-cols-[180px_1fr_40px] items-center gap-4">
                    <span className="text-sm text-slate-600 font-medium">{item.name}</span>
                    <div className="w-full h-8 bg-slate-100 rounded-md overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-md"
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-xl font-bold text-slate-900 mb-5">Principales Beneficiarios</h3>

              <div className="space-y-5">
                {beneficiariesData.map((item) => (
                  <div key={item.rank} className="grid grid-cols-[48px_220px_1fr] items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center">
                      {item.rank}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500 font-medium">{item.detail}</p>
                    </div>

                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Resumen Detallado de Inventario</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Aparato</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Disponible</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">En Préstamo</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Mantenimiento</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Utilización</th>
                  </tr>
                </thead>
                <tbody>
                  {inventorySummary.map((item, index) => (
                    <tr key={index} className="border-b border-slate-100 last:border-b-0">
                      <td className="px-6 py-5 text-sm font-medium text-slate-900">{item.aparato}</td>
                      <td className="px-6 py-5 text-sm text-slate-700">{item.total}</td>
                      <td className="px-6 py-5 text-sm text-emerald-500 font-medium">{item.disponible}</td>
                      <td className="px-6 py-5 text-sm text-blue-600 font-medium">{item.prestamo}</td>
                      <td className="px-6 py-5 text-sm text-amber-500 font-medium">{item.mantenimiento}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${item.utilizacion}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-700 font-medium">{item.utilizacion}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) => (
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

const FilterField = ({
  label,
  icon,
  type,
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
      {icon}
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
    />
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
}) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </div>
);

const MetricCard = ({
  icon,
  iconWrap,
  value,
  title,
  subtitle,
  subtitleColor,
}: {
  icon: React.ReactNode;
  iconWrap: string;
  value: string;
  title: string;
  subtitle: string;
  subtitleColor: string;
}) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconWrap}`}>
      {icon}
    </div>
    <div className="mt-5">
      <h4 className="text-4xl font-extrabold text-slate-900 leading-none">{value}</h4>
      <p className="mt-2 text-slate-600 font-medium">{title}</p>
      <p className={`mt-2 text-xs font-medium ${subtitleColor}`}>{subtitle}</p>
    </div>
  </div>
);

export default Reportes;