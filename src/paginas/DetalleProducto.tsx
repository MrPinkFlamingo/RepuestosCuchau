import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import Alerta from "../componentes/Alerta";
import { PRODUCTOS } from "../datos/Productos";
import { agregarAlCarrito, obtenerProductosInventario, obtenerUsuarioActual } from "../datos/db";

function DetalleProducto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState(1);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [errorStock, setErrorStock] = useState<string | null>(null);

  // Buscar el producto por ID en el inventario activo (o respaldo estático)
  const inventario = obtenerProductosInventario();
  const producto = inventario.find((p) => String(p.id) === String(id)) || PRODUCTOS.find((p) => String(p.id) === String(id)) || PRODUCTOS[0];

  const handleAgregar = () => {
    const usuario = obtenerUsuarioActual();
    if (!usuario) {
      navigate("/registro");
      return;
    }
    const res = agregarAlCarrito(producto, cantidad);
    if (!res.ok) {
      setErrorStock(res.mensaje || `No puedes agregar más: solo hay ${producto.stock} unidades disponibles.`);
      setTimeout(() => setErrorStock(null), 3000);
      return;
    }
    setMensajeExito(true);
    setTimeout(() => setMensajeExito(false), 2500);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mb-5">
        {/* MIGAS DE PAN (BREADCRUMB) */}
        <nav aria-label="breadcrumb" className="my-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/productos">Productos</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {producto.nombre}
            </li>
          </ol>
        </nav>

        {mensajeExito && (
          <Alerta
            tipo="success"
            mensaje={`¡Se agregaron ${cantidad} unidad(es) de "${producto.nombre}" al carrito de compras!`}
            onCerrar={() => setMensajeExito(false)}
          />
        )}

        {errorStock && (
          <Alerta
            tipo="danger"
            mensaje={errorStock}
            onCerrar={() => setErrorStock(null)}
          />
        )}

        <div className="row g-5 align-items-start mt-1">
          {/* FOTO DEL REPUESTO */}
          <div className="col-md-6 text-center">
            <div className="border rounded-3 p-4 bg-white shadow-sm position-relative">
              {producto.enOferta && producto.descuento && (
                <span className="badge bg-danger position-absolute top-0 start-0 m-3 fs-6 px-3 py-2">
                  <i className="bi bi-tag-fill me-1"></i> {producto.descuento}% DE DESCUENTO
                </span>
              )}
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid"
                style={{ maxHeight: "380px", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* INFORMACIÓN Y ACCIONES */}
          <div className="col-md-6">
            <span className="badge bg-secondary-subtle text-secondary mb-2 fs-6">
              {producto.categoria}
            </span>
            <h2 className="fw-bold custom-title mb-2">{producto.nombre}</h2>
            <p className="text-muted fs-5">{producto.descripcion}</p>

            <hr />

            {/* PRECIOS Y STOCK */}
            <div className="d-flex align-items-baseline gap-3 mb-3">
              <span className="display-6 fw-bold text-dark">
                ${producto.precio.toLocaleString("es-CL")}
              </span>
              {producto.enOferta && producto.descuento && (
                <span className="text-muted text-decoration-line-through fs-5">
                  ${Math.round(producto.precio * (1 + producto.descuento / 100)).toLocaleString("es-CL")}
                </span>
              )}
              <span className="badge bg-success-subtle text-success ms-auto fs-6">
                <i className="bi bi-check-circle me-1"></i> En Stock ({producto.stock} disponibles)
              </span>
            </div>

            {/* CONTROLES DE COMPRA */}
            <div className="d-flex align-items-center gap-3 my-4">
              <label className="fw-bold">Cantidad:</label>
              <div className="input-group" style={{ width: "130px" }}>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  disabled={cantidad <= 1}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control text-center bg-white fw-bold"
                  value={cantidad}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                  disabled={cantidad >= producto.stock}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAgregar}
                className="btn btn-warning flex-grow-1 fw-bold py-2 d-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-cart-plus-fill fs-5"></i> Añadir al Carrito
              </button>
            </div>

            {/* ESPECIFICACIONES TÉCNICAS */}
            {producto.especificaciones && (
              <div className="mt-4">
                <h5 className="fw-bold mb-3">Ficha Técnica:</h5>
                <table className="table table-bordered table-sm bg-white">
                  <tbody>
                    {Object.entries(producto.especificaciones).map(([clave, valor]) => (
                      <tr key={clave}>
                        <th className="w-50 bg-light text-muted">{clave}</th>
                        <td>{valor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DetalleProducto;
