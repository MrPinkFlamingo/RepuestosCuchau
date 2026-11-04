import { Link, useParams } from "react-router-dom";
import Contenedor from "../components/Contenedor";
import { PRODUCTOS } from "../data/Producto";

interface ProductoParams {
  id: string;
  [key: string]: string | undefined;
}

function Producto2() {
  const { id } = useParams<ProductoParams>();

  const producto = PRODUCTOS.find((p) => p.id === id);

  if (!producto) {
    return (
      <Contenedor clase="container text-center my-5">
        <h2 className="text-center my-5">Producto no encontrado</h2>
        <Link className="btn btn-outline-secondary" to={"/"}>
          Volver al Inicio
        </Link>
      </Contenedor>
    );
  }

  return (
    <Contenedor>
      <div className="mb-4">
        <Link className="btn btn-outline-secondary btn-sm" to="/productos">
          ← Volver al Catálogo
        </Link>
      </div>

      <div className="row bg-white p-4 shadow-sm rounded-3 mb-5">
        {/* Imagen del Producto */}
        <div className="col-md-5 text-center mb-4 mb-md-0 d-flex align-items-center justify-content-center">
          <img
            src={producto.urlImagen.startsWith("/") ? producto.urlImagen : `/${producto.urlImagen}`}
            alt={producto.altImagen}
            className="img-fluid rounded"
            style={{ objectFit: "contain", maxHeight: "400px", padding: "15px" }}
          />
        </div>

        {/* Información y Botones */}
        <div className="col-md-7">
          <span className="badge bg-secondary mb-2">Repuestos Originales</span>
          <h2 className="fw-bold custom-title">{producto.nombre}</h2>
          <h3 className="fw-bold text-dark mt-3">${producto.precio}</h3>
          <p className="text-muted mt-3">{producto.descripcion}</p>

          <div className="d-flex align-items-center mt-4 flex-wrap gap-3">
            <button className="btn btn-custom-action px-4">
              <i className="bi bi-cart-plus me-1"></i> Añadir al Carrito
            </button>
            <span className="text-dark fw-bold">
              <i className="bi bi-check-circle-fill text-success me-1"></i> Stock Disponible: 12 unidades
            </span>
          </div>

          <hr className="mt-4" />

          {/* Especificaciones Técnicas */}
          <h5 className="fw-bold mt-4 mb-3">Especificaciones Técnicas</h5>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row" className="w-25 text-secondary">
                  Código SKU
                </th>
                <td>CUCH-00{producto.id}</td>
              </tr>
              <tr>
                <th scope="row" className="text-secondary">
                  Compatibilidad
                </th>
                <td>Universal / Motores Gasolina y Diésel</td>
              </tr>
              <tr>
                <th scope="row" className="text-secondary">
                  Garantía
                </th>
                <td>6 Meses del Fabricante</td>
              </tr>
              <tr>
                <th scope="row" className="text-secondary">
                  Estado
                </th>
                <td>Nuevo en empaque sellado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Contenedor>
  );
}

export default Producto2;
