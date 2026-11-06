import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import CartItem from "../componentes/CartItem";
import { PRODUCTOS } from "../datos/Productos";
import {
  obtenerCarrito,
  actualizarCantidadCarrito,
  eliminarDelCarrito,
  vaciarCarrito,
  calcularTotalCarrito,
  agregarAlCarrito,
  obtenerUsuarioActual,
  type ItemCarrito as ItemCarritoType,
} from "../datos/db";

function Carrito() {
  const [items, setItems] = useState<ItemCarritoType[]>(() => obtenerCarrito());
  const [totales, setTotales] = useState(() => calcularTotalCarrito());
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActual = obtenerUsuarioActual();
    if (!usuarioActual) {
      navigate("/registro", { replace: true });
      return;
    }

    const cargarCarrito = () => {
      setItems(obtenerCarrito());
      setTotales(calcularTotalCarrito());
    };

    window.addEventListener("cuchau-storage-change", cargarCarrito);
    return () => window.removeEventListener("cuchau-storage-change", cargarCarrito);
  }, [navigate]);

  const handleCambiarCantidad = (id: string | number, cant: number) => {
    actualizarCantidadCarrito(id, cant);
  };

  const handleEliminar = (id: string | number) => {
    eliminarDelCarrito(id);
  };

  const handleProcederPago = () => {
    const usuario = obtenerUsuarioActual();
    if (!usuario) {
      navigate("/registro");
    } else {
      navigate("/pago");
    }
  };

  const handleVaciar = () => {
    if (window.confirm("¿Seguro que deseas vaciar todos los productos del carrito?")) {
      vaciarCarrito();
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mb-5">
        <h2 className="custom-title mb-4">
          <i className="bi bi-cart3 me-2"></i>Carrito de Compras
        </h2>

        {/* DISTRIBUCIÓN EN 2 COLUMNAS */}
        <div className="row g-4">
          {/* COLUMNA IZQUIERDA: LISTA RÁPIDA DE PRODUCTOS DISPONIBLES */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-dark text-white fw-bold py-3">
                <i className="bi bi-grid me-2"></i> Lista de productos
              </div>
              <div className="card-body p-3" style={{ maxHeight: "600px", overflowY: "auto" }}>
                <div className="d-flex flex-column gap-3">
                  {PRODUCTOS.slice(0, 8).map((p) => (
                    <div
                      key={p.id}
                      className="d-flex align-items-center justify-content-between p-2 border rounded bg-white shadow-sm"
                    >
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        style={{ width: "45px", height: "45px", objectFit: "contain" }}
                      />
                      <div className="flex-grow-1 px-2 text-truncate">
                        <small className="fw-bold d-block text-truncate">{p.nombre}</small>
                        <span className="text-primary fw-semibold small">
                          ${p.precio.toLocaleString("es-CL")}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-warning btn-sm fw-bold px-2"
                        onClick={() => agregarAlCarrito(p, 1)}
                        title="Añadir 1 al carrito"
                      >
                        + Añadir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: TABLA DEL CARRITO DE COMPRAS */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-warning text-dark fw-bold py-3 d-flex justify-content-between align-items-center">
                <span>
                  <i className="bi bi-cart3 me-2"></i> Carrito de Compras ({totales.totalCantidad} ítems)
                </span>
                {items.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm"
                    onClick={handleVaciar}
                  >
                    <i className="bi bi-trash me-1"></i> Limpiar Carrito
                  </button>
                )}
              </div>

              <div className="card-body p-0">
                {items.length > 0 ? (
                  <>
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th className="text-end">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => (
                            <CartItem
                              key={item.producto.id}
                              item={item}
                              onCambiarCantidad={handleCambiarCantidad}
                              onEliminar={handleEliminar}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* PIE DEL CARRITO CON TOTAL Y BOTÓN DE COMPRA */}
                    <div className="p-4 bg-light border-top d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                      <div>
                        <span className="text-muted d-block small">Total acumulado:</span>
                        <h3 className="fw-bold text-dark mb-0">
                          Total: ${totales.total.toLocaleString("es-CL")}
                        </h3>
                      </div>

                      <div className="d-flex gap-2 w-100 w-md-auto">
                        <Link to="/productos" className="btn btn-outline-secondary">
                          Seguir Comprando
                        </Link>
                        <button
                          type="button"
                          className="btn btn-warning fw-bold px-4"
                          onClick={handleProcederPago}
                        >
                          <i className="bi bi-credit-card me-1"></i> Comprar ahora
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-5 my-4">
                    <i className="bi bi-cart-x fs-1 text-muted d-block mb-3"></i>
                    <h5>Tu carrito de compras está vacío</h5>
                    <p className="text-muted small">
                      Agrega productos desde la lista de la izquierda o explora el catálogo.
                    </p>
                    <Link to="/productos" className="btn btn-warning fw-bold mt-2">
                      Ir al Catálogo de Repuestos
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Carrito;
