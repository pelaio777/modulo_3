import { useState } from "react";
import { Plus, Search, Phone, MapPin, History } from "lucide-react";


const beneficiarios = [
  {
    id: 1,
    name: "María González García",
    phone: "555-1234-5678",
    address: "Calle Principal #123, Col. Centro",
    totalLoans: 5,
    activeLoans: 1,
    lastLoan: "2026-03-01",
  },
  {
    id: 2,
    name: "José Luis Ramírez",
    phone: "555-2345-6789",
    address: "Av. Juárez #456, Col. Norte",
    totalLoans: 3,
    activeLoans: 1,
    lastLoan: "2026-03-05",
  },
  {
    id: 3,
    name: "Ana Patricia Flores",
    phone: "555-3456-7890",
    address: "Calle 5 de Mayo #789, Col. Sur",
    totalLoans: 8,
    activeLoans: 0,
    lastLoan: "2026-02-28",
  },
  {
    id: 4,
    name: "Carlos Méndez Pérez",
    phone: "555-4567-8901",
    address: "Blvd. Libertad #321, Col. Este",
    totalLoans: 2,
    activeLoans: 1,
    lastLoan: "2026-03-07",
  },
  {
    id: 5,
    name: "Rosa Elena Torres",
    phone: "555-5678-9012",
    address: "Calle Hidalgo #654, Col. Oeste",
    totalLoans: 4,
    activeLoans: 1,
    lastLoan: "2026-03-08",
  },
];

export function Beneficiarios() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<any>(null);

  const filteredBeneficiarios = beneficiarios.filter((beneficiary) =>
    beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Beneficiarios</h2>
          <p className="text-muted-foreground">Gestión de personas que reciben aparatos</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Nuevo Beneficiario
        </button>
      </div>

      {/* Search */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar beneficiario por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Beneficiaries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeneficiarios.map((beneficiary) => (
          <div
            key={beneficiary.id}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedBeneficiary(beneficiary)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-semibold text-primary">
                  {beneficiary.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
              </div>
              {beneficiary.activeLoans > 0 && (
                <span className="px-2 py-1 bg-health-green/10 text-health-green text-xs font-medium rounded-full border border-health-green/20">
                  {beneficiary.activeLoans} activo{beneficiary.activeLoans > 1 ? "s" : ""}
                </span>
              )}
            </div>

            <h3 className="font-semibold mb-3">{beneficiary.name}</h3>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{beneficiary.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="flex-1">{beneficiary.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <History className="w-4 h-4" />
                <span>{beneficiary.totalLoans} préstamos totales</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
              Último préstamo: {new Date(beneficiary.lastLoan).toLocaleDateString("es-MX")}
            </div>
          </div>
        ))}
      </div>

      {filteredBeneficiarios.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No se encontraron beneficiarios</p>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Nuevo Beneficiario</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">Nombre completo</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Nombre y apellidos"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Teléfono</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="555-1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Correo electrónico (opcional)</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">Dirección</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Calle, número, colonia, ciudad"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">Observaciones</label>
                  <textarea
                    className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    placeholder="Notas adicionales sobre el beneficiario..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Guardar Beneficiario
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Beneficiary Detail Modal */}
      {selectedBeneficiary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Detalles del Beneficiario</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-semibold text-primary">
                    {selectedBeneficiary.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{selectedBeneficiary.name}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{selectedBeneficiary.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{selectedBeneficiary.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Préstamos Totales</p>
                  <p className="text-2xl font-semibold">{selectedBeneficiary.totalLoans}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Préstamos Activos</p>
                  <p className="text-2xl font-semibold">{selectedBeneficiary.activeLoans}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Último Préstamo</p>
                  <p className="text-sm font-medium">
                    {new Date(selectedBeneficiary.lastLoan).toLocaleDateString("es-MX")}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Historial de Préstamos</h4>
                <div className="space-y-2">
                  <div className="bg-muted/20 rounded-lg p-3 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Silla de ruedas estándar</span>
                      <span className="text-xs text-health-green">Activo</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Préstamo: 01/03/2026 - Devolución: 01/04/2026</p>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-3 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Muletas de aluminio</span>
                      <span className="text-xs text-muted-foreground">Devuelto</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Préstamo: 15/02/2026 - Devolución: 28/02/2026</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end">
              <button
                onClick={() => setSelectedBeneficiary(null)}
                className="px-4 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Beneficiarios;