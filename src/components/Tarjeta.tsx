import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import TarjetaCuerpo from "./TarjetaCuerpo";

interface Props {
  id?: string;
  urlImagen?: string;
  claseImagen?: string;
  altImagen?: string;
  titulo: string;
  texto: string;
  clase?: string;
  children?: ReactNode;
}

function Tarjeta({
  id,
  urlImagen,
  claseImagen = "card-img-top",
  altImagen,
  titulo,
  texto,
  clase = "card h-100 border-0 shadow-sm product-card-hover",
  children,
}: Props) {
  const imagenElem = urlImagen ? (
    <img
      src={urlImagen.startsWith("/") ? urlImagen : `/${urlImagen}`}
      className={claseImagen}
      alt={altImagen || titulo}
      style={{ objectFit: "contain", height: "200px", padding: "15px", backgroundColor: "#fff" }}
    />
  ) : null;

  return (
    <div className={clase}>
      {id && imagenElem ? (
        <Link to={`/producto/${id}`}>{imagenElem}</Link>
      ) : (
        imagenElem
      )}
      <TarjetaCuerpo id={id} titulo={titulo} texto={texto}>
        {children}
      </TarjetaCuerpo>
    </div>
  );
}

export default Tarjeta;
