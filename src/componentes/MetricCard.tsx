interface MetricCardProps {
  titulo: string;
  valor: string | number;
  subtitulo?: string;
  icono: string;
  colorFondo?: string;
  colorTexto?: string;
}

function MetricCard({
  titulo,
  valor,
  subtitulo,
  icono,
  colorFondo = "bg-primary",
  colorTexto = "text-white",
}: MetricCardProps) {
  return (
    <div className={`card ${colorFondo} ${colorTexto} shadow-sm border-0 h-100`}>
      <div className="card-body d-flex align-items-center justify-content-between p-4">
        <div>
          <h6 className="card-title text-uppercase mb-1 opacity-75">{titulo}</h6>
          <h2 className="display-6 fw-bold mb-0">{valor}</h2>
          {subtitulo && <small className="opacity-75">{subtitulo}</small>}
        </div>
        <div className="fs-1 opacity-50">
          <i className={`bi ${icono}`}></i>
        </div>
      </div>
    </div>
  );
}

export default MetricCard;
