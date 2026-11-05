import type { ItemCarrito as ItemCarritoType } from "../datos/db";

interface Props {
  item: ItemCarritoType;
  onCambiarCantidad: (id: string | number, nuevaCantidad: number) => void;
  onEliminar: (id: string | number) => void;
}

function ElementoCarrito({ item, onCambiarCantidad, onEliminar }: Props) {
  const { producto, cantidad } = item;
  const subtotal = producto.precio * cantidad;

  return (
    <tr>
      {/* Imagen */}
      <td style={{ width: "70px" }}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{ width: "55px", height: "55px", objectFit: "contain" }}
          className="border rounded p-1 bg-white"
        />
      </td>

      {/* Nombre y categoría */}
      <td>
        <h6 className="mb-0 text-dark small fw-bold">{producto.nombre}</h6>
        <small className="text-muted">{producto.categoria}</small>
      </td>

      {/* Precio unitario */}
      <td className="align-middle text-nowrap">
        ${producto.precio.toLocaleString("es-CL")}
      </td>

      {/* Controles de cantidad */}
      <td className="align-middle" style={{ width: "120px" }}>
        <div className="input-group input-group-sm">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => onCambiarCantidad(producto.id, cantidad - 1)}
            disabled={cantidad <= 1}
            title="Restar 1"
          >
            -
          </button>
          <span className="input-group-text bg-white px-2 fw-semibold">
            {cantidad}
          </span>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => onCambiarCantidad(producto.id, cantidad + 1)}
            disabled={cantidad >= producto.stock}
            title="Sumar 1"
          >
            +
          </button>
        </div>
      </td>

      {/* Subtotal */}
      <td className="align-middle fw-bold text-nowrap">
        ${subtotal.toLocaleString("es-CL")}
      </td>

      {/* Acciones */}
      <td className="align-middle text-end" style={{ width: "50px" }}>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => onEliminar(producto.id)}
          title="Eliminar producto"
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default ElementoCarrito;
