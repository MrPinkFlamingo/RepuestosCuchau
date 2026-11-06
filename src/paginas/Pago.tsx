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
  type Usuario,
} from "../datos/db";

function Pago() {
  const [items] = useState<ItemCarrito[]>(() => obtenerCarrito());
  const [totales] = useState(() => calcularTotalCarrito());
  const [usuario] = useState<Usuario | null>(() => obtenerUsuarioActual());

  const [indicaciones, setIndicaciones] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActual = obtenerUsuarioActual();
    if (!usuarioActual) {
      navigate("/login", {
        state: {
          redirigirA: "/pago",
          mensaje: "Debes iniciar sesión para realizar la compra.",
        },
        replace: true,
      });
      return;
    }
    // El usuario ya se inicializa en el useState superior

    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
      navigate("/carrito");
    }
  }, [navigate]);

  const handlePagar = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!usuario) {
      navigate("/login", {
        state: {
          redirigirA: "/pago",
          mensaje: "Debes iniciar sesión para realizar la compra.",
        },
      });
      return;
    }

    const cliente = {
      nombre: usuario.nombre,
      apellidos: usuario.apellidos || "",
      correo: usuario.correo,
      calle: usuario.direccion || "Despacho a domicilio registrado",
      depto: "",
      region: usuario.region || "Región Metropolitana de Santiago",
      comuna: usuario.comuna || "Santiago",
      indicaciones: indicaciones.trim(),
    };

    // Compra exitosa: guardar en base de datos de órdenes
    const orden = crearOrden(cliente, items, totales.total);
    navigate("/compra-exitosa", { state: { orden } });
  };

  if (!usuario) {
    return null;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion />

      <main className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card shadow-sm border-0 p-4 p-md-5">
              {/* ENCABEZADO Y RESUMEN DEL PEDIDO */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="custom-title mb-0">Confirmación de Compra</h3>
                  <small className="text-muted">Revisa tus datos y el detalle de tu pedido</small>
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
                {/* DATOS DEL COMPRADOR Y DESPACHO */}
                <div className="card border-0 bg-light p-3 p-md-4 mb-4 shadow-sm">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0 text-dark">
                      <i className="bi bi-person-check-fill text-success me-2"></i>
                      Datos del Comprador y Despacho
                    </h5>
                    <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                      <i className="bi bi-shield-check me-1"></i> Sesión Iniciada
                    </span>
                  </div>

                  <div className="row g-3">
                    <div className="col-sm-6">
                      <small className="text-muted d-block">Comprador</small>
                      <strong className="fs-6">{usuario.nombre} {usuario.apellidos || ""}</strong>
                    </div>
                    <div className="col-sm-6">
                      <small className="text-muted d-block">Correo de contacto</small>
                      <strong className="fs-6">{usuario.correo}</strong>
                    </div>
                    <div className="col-12 border-top pt-2 mt-2">
                      <small className="text-muted d-block">Dirección registrada para la entrega</small>
                      <strong className="fs-6">
                        {usuario.direccion || "Dirección principal registrada"}, {usuario.comuna || "Santiago"} ({usuario.region || "Región Metropolitana"})
                      </strong>
                    </div>
                  </div>
                </div>

                {/* INDICACIONES OPCIONALES */}
                <div className="mb-4">
                  <label className="form-label fw-semibold small">
                    Indicaciones para la entrega (opcional)
                  </label>
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="Ej: Dejar en conserjería, timbre 2, portón negro..."
                    value={indicaciones}
                    onChange={(e) => setIndicaciones(e.target.value)}
                  ></textarea>
                </div>

                {/* BOTÓN DE PAGO */}
                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <Link to="/carrito" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-1"></i> Volver al Carrito
                  </Link>

                  <button type="submit" className="btn btn-warning fw-bold px-4 py-2 fs-5">
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
