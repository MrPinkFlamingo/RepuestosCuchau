import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BarraNavegacion from "../componentes/BarraNavegacion";
import PiePagina from "../componentes/PiePagina";
import { obtenerOrdenes, obtenerUsuarioActual, type OrdenCompra } from "../datos/db";

function GestionOrdenes() {
  const [ordenes] = useState<OrdenCompra[]>(() => obtenerOrdenes());
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<OrdenCompra | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = obtenerUsuarioActual();
    if (!usuario || (usuario.rol !== "admin" && usuario.rol !== "vendedor")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <BarraNavegacion />

      <main className="container mb-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center my-4 gap-2">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <Link to="/admin">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Registro de Órdenes</li>
              </ol>
            </nav>
            <h2 className="custom-title mb-0">Gestión de Órdenes y Boletas</h2>
          </div>
          <Link to="/admin" className="btn btn-outline-dark">
            <i className="bi bi-arrow-left"></i> Volver al Dashboard
          </Link>
        </div>

        {/* MODAL / DETALLE DE ORDEN SELECCIONADA */}
        {ordenSeleccionada && (
          <div className="card shadow border-warning mb-4 bg-white p-4">
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
              <h5 className="fw-bold mb-0 text-primary">
                <i className="bi bi-file-earmark-text me-2"></i>
                Detalle Boleta: {ordenSeleccionada.codigoOrden}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setOrdenSeleccionada(null)}
              ></button>
            </div>

            <div className="row g-3 mb-3 small">
              <div className="col-md-6">
                <strong>Cliente:</strong> {ordenSeleccionada.cliente.nombre}{" "}
                {ordenSeleccionada.cliente.apellidos}
                <br />
                <strong>Correo:</strong> {ordenSeleccionada.cliente.correo}
              </div>
              <div className="col-md-6">
                <strong>Despacho:</strong> {ordenSeleccionada.cliente.calle},{" "}
                {ordenSeleccionada.cliente.comuna}
                <br />
                <strong>Fecha:</strong> {ordenSeleccionada.fecha}
              </div>
            </div>

            <h6 className="fw-bold mb-2">Ítems comprados:</h6>
            <div className="table-responsive mb-3">
              <table className="table table-sm table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenSeleccionada.items.map((it) => (
                    <tr key={it.producto.id}>
                      <td>{it.producto.nombre}</td>
                      <td>${it.producto.precio.toLocaleString("es-CL")}</td>
                      <td>{it.cantidad}</td>
                      <td className="fw-bold">
                        ${(it.producto.precio * it.cantidad).toLocaleString("es-CL")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center pt-2 border-top">
              <span className="badge bg-success fs-6">Estado: {ordenSeleccionada.estado}</span>
              <h4 className="fw-bold mb-0 text-dark">
                Total Pagado: ${ordenSeleccionada.total.toLocaleString("es-CL")}
              </h4>
            </div>
          </div>
        )}

        {/* TABLA PRINCIPAL DE ÓRDENES */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-dark text-white fw-semibold py-3">
            Historial de Compras ({ordenes.length})
          </div>
          <div className="card-body p-0">
            {ordenes.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Código</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Comuna</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordenes.map((orden) => (
                      <tr key={orden.id}>
                        <td className="fw-bold text-primary">{orden.codigoOrden}</td>
                        <td className="small text-muted">{orden.fecha}</td>
                        <td>
                          <strong>{orden.cliente.nombre} {orden.cliente.apellidos}</strong>
                          <small className="d-block text-muted">{orden.cliente.correo}</small>
                        </td>
                        <td>{orden.cliente.comuna}</td>
                        <td className="fw-bold text-dark">
                          ${orden.total.toLocaleString("es-CL")}
                        </td>
                        <td>
                          <span className="badge bg-success">{orden.estado}</span>
                        </td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setOrdenSeleccionada(orden)}
                          >
                            <i className="bi bi-eye me-1"></i> Ver Boleta
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
                <h5 className="text-muted">Aún no se han registrado compras</h5>
                <p className="text-muted small">
                  Cuando los clientes completen compras desde el Carrito aparecerán aquí en tiempo real.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <PiePagina />
    </div>
  );
}

export default GestionOrdenes;
