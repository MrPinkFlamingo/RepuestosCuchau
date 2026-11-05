interface AlertaProps {
  tipo?: "success" | "danger" | "warning" | "info";
  mensaje: string;
  icono?: string;
  onCerrar?: () => void;
}

function Alerta({
  tipo = "info",
  mensaje,
  icono,
  onCerrar,
}: AlertaProps) {
  if (!mensaje) return null;

  const defaultIcon = {
    success: "bi-check-circle-fill",
    danger: "bi-exclamation-triangle-fill",
    warning: "bi-exclamation-circle-fill",
    info: "bi-info-circle-fill",
  }[tipo];

  return (
    <div
      className={`alert alert-${tipo} alert-dismissible fade show d-flex align-items-center gap-2`}
      role="alert"
    >
      <i className={`bi ${icono || defaultIcon} fs-5`}></i>
      <div className="flex-grow-1">{mensaje}</div>
      {onCerrar && (
        <button
          type="button"
          className="btn-close"
          aria-label="Cerrar"
          onClick={onCerrar}
        ></button>
      )}
    </div>
  );
}

export default Alerta;
