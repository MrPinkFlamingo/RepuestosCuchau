import { useLocation, Link } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import type { OrdenCompra } from "../datos/db";

function CompraExitosa() {
  const location = useLocation();
  const orden: OrdenCompra | undefined = location.state?.orden;

  const ordenAMostrar: OrdenCompra = orden || {
    id: "ord-demo",
    codigoOrden: "#20240705",
    fecha: new Date().toLocaleDateString("es-CL"),
    cliente: {
      nombre: "Pedro",
      apellidos: "Hacker",
      correo: "pedro.hacker20@example.com",
      calle: "Los Crisantemos, Edificio Norte",
      depto: "Depto 603",
      region: "Región Metropolitana de Santiago",
      comuna: "Cerrillos",
      indicaciones: "El martes no estaremos en el depto, pero puede dejárselo con el conserje.",
    },
    items: [],
    total: 28775,
    estado: "Completada",
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card shadow-sm border-0 p-4 p-md-5">
              {/* ENCABEZADO EXITOSO (FIGURA 7 DE LA RÚBRICA) */}
              <div className="alert alert-success d-flex align-items-center justify-content-between p-3 mb-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill fs-3 text-success"></i>
                  <div>
                    <h4 className="alert-heading fw-bold mb-0">
                      Se ha realizado la compra. nro {ordenAMostrar.codigoOrden}
                    </h4>
                    <small className="text-muted">¡Muchas gracias por tu compra en Repuestos Cuchau!</small>
                  </div>
                </div>
                <span className="badge bg-success fs-6">Pagada</span>
              </div>

              {/* INFORMACIÓN DEL CLIENTE */}
              <div className="bg-light p-3 rounded mb-4">
                <h6 className="fw-bold mb-2">Información del cliente:</h6>
                <div className="row g-2 text-muted small">
                  <div className="col-sm-4">
                    <strong>Nombre:</strong> {ordenAMostrar.cliente.nombre}
                  </div>
                  <div className="col-sm-4">
                    <strong>Apellidos:</strong> {ordenAMostrar.cliente.apellidos}
                  </div>
                  <div className="col-sm-4">
                    <strong>Correo:</strong> {ordenAMostrar.cliente.correo}
                  </div>
                </div>
              </div>

              {/* DIRECCIÓN DE ENTREGA */}
              <div className="bg-light p-3 rounded mb-4">
                <h6 className="fw-bold mb-2">Dirección de entrega de los productos:</h6>
                <div className="row g-2 text-muted small">
                  <div className="col-sm-6">
                    <strong>Calle:</strong> {ordenAMostrar.cliente.calle}{" "}
                    {ordenAMostrar.cliente.depto && `(${ordenAMostrar.cliente.depto})`}
                  </div>
                  <div className="col-sm-3">
                    <strong>Comuna:</strong> {ordenAMostrar.cliente.comuna}
                  </div>
                  <div className="col-sm-3">
                    <strong>Región:</strong> {ordenAMostrar.cliente.region}
                  </div>
                  {ordenAMostrar.cliente.indicaciones && (
                    <div className="col-12 mt-2">
                      <strong>Indicaciones:</strong> {ordenAMostrar.cliente.indicaciones}
                    </div>
                  )}
                </div>
              </div>

              {/* DETALLE DE PRODUCTOS */}
              <h6 className="fw-bold mb-3">Productos comprados:</h6>
              {ordenAMostrar.items.length > 0 ? (
                <div className="table-responsive mb-4">
                  <table className="table table-bordered table-sm align-middle">
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
                      {ordenAMostrar.items.map((it) => (
                        <tr key={it.producto.id}>
                          <td style={{ width: "50px" }}>
                            <img
                              src={it.producto.imagen}
                              alt={it.producto.nombre}
                              style={{ width: "40px", height: "40px", objectFit: "contain" }}
                            />
                          </td>
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
              ) : (
                <p className="text-muted small">Orden registrada con éxito.</p>
              )}

              {/* TOTAL PAGADO */}
              <div className="text-end mb-4 p-3 bg-light rounded border">
                <h4 className="fw-bold mb-0">
                  Total pagado: ${ordenAMostrar.total.toLocaleString("es-CL")}
                </h4>
              </div>

              {/* BOTONES DE ACCIÓN */}
              <div className="d-flex justify-content-center pt-3 border-top">
                <Link to="/" className="btn btn-outline-dark">
                  <i className="bi bi-house me-1"></i> Volver a la Tienda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CompraExitosa;
