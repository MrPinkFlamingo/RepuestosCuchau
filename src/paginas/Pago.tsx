import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import BarraNavegacion from "../componentes/BarraNavegacion";
import PiePagina from "../componentes/PiePagina";
import Alerta from "../componentes/Alerta";
import {
  obtenerCarrito,
  calcularTotalCarrito,
  obtenerUsuarioActual,
  crearOrden,
  type ItemCarrito,
} from "../datos/db";

function Pago() {
  const [items] = useState<ItemCarrito[]>(() => obtenerCarrito());
  const [totales] = useState(() => calcularTotalCarrito());

  // REQUISITO DE LA RÚBRICA (PÁG 6):
  // "Nota: Si el usuario ha iniciado sesión toda esta información se añadirá de forma automática."
  const [nombre, setNombre] = useState(() => obtenerUsuarioActual()?.nombre || "");
  const [apellidos, setApellidos] = useState(() => obtenerUsuarioActual()?.apellidos || "Cliente");
  const [correo, setCorreo] = useState(() => obtenerUsuarioActual()?.correo || "");

  // Dirección de entrega
  const [calle, setCalle] = useState(() => obtenerUsuarioActual()?.direccion || "");
  const [depto, setDepto] = useState("");
  const [region, setRegion] = useState(() => obtenerUsuarioActual()?.region || "Región Metropolitana de Santiago");
  const [comuna, setComuna] = useState(() => obtenerUsuarioActual()?.comuna || "Cerrillos");
  const [indicaciones, setIndicaciones] = useState("");

  const [simularFallo, setSimularFallo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
      navigate("/carrito");
    }
  }, [navigate]);

  const handlePagar = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim() || !apellidos.trim() || !correo.trim() || !calle.trim()) {
      setError("Por favor, completa los campos obligatorios de contacto y despacho.");
      return;
    }

    if (simularFallo) {
      // Navegar a la pantalla de fallo de pago (Figura 8 de la rúbrica)
      navigate("/compra-error", {
        state: {
          cliente: { nombre, apellidos, correo, calle, depto, region, comuna, indicaciones },
          items,
          total: totales.total,
        },
      });
      return;
    }

    // Compra exitosa: guardar en base de datos de órdenes (Figura 7 de la rúbrica)
    const orden = crearOrden(
      { nombre, apellidos, correo, calle, depto, region, comuna, indicaciones },
      items,
      totales.total
    );

    navigate("/compra-exitosa", { state: { orden } });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion />

      <main className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card shadow-sm border-0 p-4 p-md-5">
              {/* ENCABEZADO Y RESUMEN DEL PEDIDO (FIGURA 6 DE LA RÚBRICA) */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="custom-title mb-0">Carrito de compra</h3>
                  <small className="text-muted">Completa la siguiente información para el despacho</small>
                </div>
                <span className="badge bg-primary fs-5 px-3 py-2">
                  Total a pagar: ${totales.total.toLocaleString("es-CL")}
                </span>
              </div>

              {/* TABLA DE PRODUCTOS EN EL CHECKOUT */}
              <div className="table-responsive mb-4">
                <table className="table table-sm table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.producto.id}>
                        <td style={{ width: "50px" }}>
                          <img
                            src={item.producto.imagen}
                            alt={item.producto.nombre}
                            style={{ width: "40px", height: "40px", objectFit: "contain" }}
                          />
                        </td>
                        <td>{item.producto.nombre}</td>
                        <td>${item.producto.precio.toLocaleString("es-CL")}</td>
                        <td>{item.cantidad}</td>
                        <td className="fw-bold">
                          ${(item.producto.precio * item.cantidad).toLocaleString("es-CL")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {error && <Alerta tipo="danger" mensaje={error} onCerrar={() => setError(null)} />}

              <form onSubmit={handlePagar}>
                {/* 1. INFORMACIÓN DEL CLIENTE */}
                <h5 className="fw-bold mb-3 border-bottom pb-2">Información del cliente</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Nombre*</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Apellidos*</label>
                    <input
                      type="text"
                      className="form-control"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small">Correo*</label>
                    <input
                      type="email"
                      className="form-control"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* 2. DIRECCIÓN DE ENTREGA */}
                <h5 className="fw-bold mb-3 border-bottom pb-2">
                  Dirección de entrega de los productos
                </h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-8">
                    <label className="form-label fw-semibold small">Calle y Número*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej: Los Crisantemos 450, Edificio Norte"
                      value={calle}
                      onChange={(e) => setCalle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">
                      Departamento (opcional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej: 603"
                      value={depto}
                      onChange={(e) => setDepto(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Región*</label>
                    <input
                      type="text"
                      className="form-control"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Comuna*</label>
                    <input
                      type="text"
                      className="form-control"
                      value={comuna}
                      onChange={(e) => setComuna(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small">
                      Indicaciones para la entrega (opcional)
                    </label>
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder="Ej: Entre calles, color del portón, timbre sin sonido..."
                      value={indicaciones}
                      onChange={(e) => setIndicaciones(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                {/* OPCIÓN DE SIMULACIÓN PARA EVALUACIÓN */}
                <div className="form-check form-switch mb-4 p-3 bg-light rounded border">
                  <input
                    className="form-check-input ms-0 me-2"
                    type="checkbox"
                    id="simularFalloCheck"
                    checked={simularFallo}
                    onChange={(e) => setSimularFallo(e.target.checked)}
                  />
                  <label className="form-check-label fw-semibold text-danger small" htmlFor="simularFalloCheck">
                    <i className="bi bi-bug me-1"></i> Simular fallo de pago (para probar la vista de Error de la rúbrica Fig. 8)
                  </label>
                </div>

                {/* BOTÓN DE PAGO */}
                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <Link to="/carrito" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-1"></i> Volver al Carrito
                  </Link>

                  <button type="submit" className="btn btn-success fw-bold px-4 py-2 fs-5">
                    Pagar ahora ${totales.total.toLocaleString("es-CL")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <PiePagina />
    </div>
  );
}

export default Pago;
