import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  id?: string;
  clase?: string;
  claseTitulo?: string;
  claseTexto?: string;
  titulo: string;
  texto: string;
  children?: ReactNode;
}

function TarjetaCuerpo({
  id,
  clase = "card-body d-flex flex-column",
  claseTitulo = "card-title text-truncate",
  claseTexto = "card-text text-muted small mb-2",
  titulo,
  texto,
  children,
}: Props) {
  return (
    <div className={clase}>
      {id ? (
        <Link to={`/producto/${id}`} className="text-decoration-none text-dark">
          <h6 className={claseTitulo}>{titulo}</h6>
        </Link>
      ) : (
        <h6 className={claseTitulo}>{titulo}</h6>
      )}
      <p className={claseTexto}>{texto}</p>
      {children}
    </div>
  );
}

export default TarjetaCuerpo;
