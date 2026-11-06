import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Producto } from "../datos/Productos";
import { agregarAlCarrito, obtenerUsuarioActual } from "../datos/db";

interface Props {
  producto: Producto;
  onAgregar?: (prod: Producto) => void;
}

function TarjetaProducto({ producto, onAgregar }: Props) {
  const [agregado, setAgregado] = useState(false);
  const [topeStock, setTopeStock] = useState(false);
  const navigate = useNavigate();

  const handleAgregar = () => {
    const usuario = obtenerUsuarioActual();
    if (!usuario) {
      navigate("/registro");
      return;
    }

    const res = agregarAlCarrito(producto, 1);
    if (!res.ok) {
      setTopeStock(true);
      setTimeout(() => setTopeStock(false), 1600);
      return;
    }

    if (onAgregar) {
      onAgregar(producto);
    }
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  };

  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm product-card-hover position-relative">
        {/* Badge de Oferta si aplica */}
        {producto.enOferta && producto.descuento && (
          <span
            className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm"
            style={{ zIndex: 2 }}
          >
            <i className="bi bi-tag-fill me-1"></i> {producto.descuento}% OFF
          </span>
        )}

        {/* Imagen del repuesto */}
        <Link to={`/producto/${producto.id}`}>
          <img
            src={producto.imagen}
            className="card-img-top"
            alt={producto.nombre}
            style={{
              objectFit: "contain",
              height: "200px",
              padding: "15px",
              backgroundColor: "#fff",
            }}
          />
        </Link>

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-1">
            <span className="badge bg-secondary-subtle text-secondary small">
              {producto.categoria}
            </span>
            <small className="text-muted">Stock: {producto.stock}</small>
          </div>

          <Link
            to={`/producto/${producto.id}`}
            className="text-decoration-none text-dark"
          >
            <h6 className="card-title text-truncate" title={producto.nombre}>
              {producto.nombre}
            </h6>
          </Link>

          <p className="card-text text-muted small mb-3">
            {producto.descripcion}
          </p>

          <div className="mt-auto">
            <div className="d-flex align-items-baseline gap-2">
              <span className="fs-5 fw-bold text-dark">
                {producto.precioFormateado || `$${producto.precio.toLocaleString("es-CL")}`}
              </span>
              {producto.enOferta && producto.descuento && (
                <span className="text-muted text-decoration-line-through small">
                  ${Math.round(producto.precio * (1 + producto.descuento / 100)).toLocaleString("es-CL")}
                </span>
              )}
            </div>

            <div className="d-flex gap-2 mt-2">
              <Link
                to={`/producto/${producto.id}`}
                className="btn btn-outline-secondary btn-sm flex-fill"
              >
                Detalle
              </Link>
              <button
                type="button"
                onClick={handleAgregar}
                className={`btn btn-sm flex-fill fw-semibold d-flex align-items-center justify-content-center gap-1 ${
                  topeStock
                    ? "btn-dark text-warning"
                    : agregado
                    ? "btn-success"
                    : "btn-warning"
                }`}
                title={topeStock ? "Límite de stock alcanzado" : "Añadir al carrito"}
              >
                {topeStock ? (
                  <>
                    <i className="bi bi-exclamation-circle"></i> Máx. Stock
                  </>
                ) : agregado ? (
                  <>
                    <i className="bi bi-check-lg"></i> ¡Listo!
                  </>
                ) : (
                  <>
                    <i className="bi bi-cart-plus"></i> Añadir
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TarjetaProducto;
